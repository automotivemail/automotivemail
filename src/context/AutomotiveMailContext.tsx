import React, { createContext, useContext, useState, useEffect } from 'react';
import { SUBSCRIPTION_PLANS, PlanTier } from '../data/automotiveMailData';
import { useAuth, UserShippingAddress } from './AuthContext';
import { collection, query, where, onSnapshot, doc, setDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType, auth } from '../firebase';

export interface CartItem {
  plan: PlanTier;
  quantity: number;
  isGift: boolean;
  giftRecipientName?: string;
  giftMessage?: string;
}

export interface FirestoreOrder {
  id: string;
  userId: string;
  userEmail: string;
  customerName: string;
  planId: 'cars' | 'planes' | 'both';
  planName: string;
  quantity: number;
  price: number;
  currency: 'INR';
  status: 'confirmed' | 'processing' | 'dispatched';
  shippingAddress: UserShippingAddress;
  isGift: boolean;
  giftDetails?: {
    recipient: string;
    note: string;
  };
  trackingNumber: string;
  estimatedDelivery: string;
  createdAt: string;
}

export interface FirestoreSubscription {
  id: string;
  userId: string;
  planId: 'cars' | 'planes' | 'both';
  planName: string;
  status: 'active' | 'paused' | 'cancelled';
  price: number;
  currency: 'INR';
  nextDispatchDate: string;
  createdAt: string;
  updatedAt: string;
}

interface AutomotiveMailContextType {
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (planId: 'cars' | 'planes' | 'both', isGift?: boolean) => void;
  subscribeNow: (planId?: 'cars' | 'planes' | 'both', isGift?: boolean) => void;
  removeFromCart: (planId: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartDrawerStep: 'cart' | 'checkout' | 'success';
  setCartDrawerStep: (step: 'cart' | 'checkout' | 'success') => void;
  isAccountOpen: boolean;
  setIsAccountOpen: (open: boolean) => void;
  isDropsModalOpen: boolean;
  setIsDropsModalOpen: (open: boolean) => void;
  userOrders: FirestoreOrder[];
  ordersLoading: boolean;
  userSubscription: FirestoreSubscription | null;
  subscriptionLoading: boolean;
  lastOrder: FirestoreOrder | null;
  isSubmittingOrder: boolean;
  completeCheckout: (details: {
    address: UserShippingAddress;
    paymentMethod: string;
    giftDetails?: { recipient: string; note: string };
  }) => Promise<FirestoreOrder>;
}

const AutomotiveMailContext = createContext<AutomotiveMailContextType | undefined>(undefined);

export const AutomotiveMailProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, saveShippingAddress, openAuthModal } = useAuth();

  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartDrawerStep, setCartDrawerStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isDropsModalOpen, setIsDropsModalOpen] = useState(false);
  const [userOrders, setUserOrders] = useState<FirestoreOrder[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [userSubscription, setUserSubscription] = useState<FirestoreSubscription | null>(null);
  const [subscriptionLoading, setSubscriptionLoading] = useState(false);
  const [lastOrder, setLastOrder] = useState<FirestoreOrder | null>(null);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);

  // Sync real orders from Firestore when authenticated
  useEffect(() => {
    if (!user) {
      setUserOrders([]);
      setUserSubscription(null);
      setOrdersLoading(false);
      setSubscriptionLoading(false);
      return;
    }

    setOrdersLoading(true);
    setSubscriptionLoading(true);

    const ordersQuery = query(collection(db, 'orders'), where('userId', '==', user.uid));
    const unsubscribeOrders = onSnapshot(
      ordersQuery,
      (snapshot) => {
        const ordersData: FirestoreOrder[] = [];
        snapshot.forEach((docSnap) => {
          ordersData.push(docSnap.data() as FirestoreOrder);
        });
        // Sort newest first
        ordersData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setUserOrders(ordersData);
        setOrdersLoading(false);
      },
      (error) => {
        console.error('Error listening to user orders:', error);
        setOrdersLoading(false);
      }
    );

    const subscriptionsQuery = query(collection(db, 'subscriptions'), where('userId', '==', user.uid));
    const unsubscribeSubscriptions = onSnapshot(
      subscriptionsQuery,
      (snapshot) => {
        let activeSub: FirestoreSubscription | null = null;
        snapshot.forEach((docSnap) => {
          const sub = docSnap.data() as FirestoreSubscription;
          if (sub.status === 'active') {
            activeSub = sub;
          }
        });
        setUserSubscription(activeSub);
        setSubscriptionLoading(false);
      },
      (error) => {
        console.error('Error listening to user subscription:', error);
        setSubscriptionLoading(false);
      }
    );

    return () => {
      unsubscribeOrders();
      unsubscribeSubscriptions();
    };
  }, [user]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.plan.price * item.quantity, 0);

  const addToCart = (planId: 'cars' | 'planes' | 'both', isGift = false) => {
    const selectedPlan = SUBSCRIPTION_PLANS.find((p) => p.id === planId) || SUBSCRIPTION_PLANS[0];
    setCart((prev) => {
      const existing = prev.find((item) => item.plan.id === planId);
      if (existing) {
        return prev.map((item) =>
          item.plan.id === planId ? { ...item, quantity: item.quantity + 1, isGift } : item
        );
      }
      return [...prev, { plan: selectedPlan, quantity: 1, isGift }];
    });

    if (!user) {
      openAuthModal('login', () => {
        setCartDrawerStep('cart');
        setIsCartOpen(true);
      });
    } else {
      setCartDrawerStep('cart');
      setIsCartOpen(true);
    }
  };

  /**
   * Directly triggers subscription checkout flow linked to Firestore
   * Ensures only authenticated users can trigger the transaction.
   */
  const subscribeNow = (planId: 'cars' | 'planes' | 'both' = 'both', isGift = false) => {
    const selectedPlan = SUBSCRIPTION_PLANS.find((p) => p.id === planId) || SUBSCRIPTION_PLANS[1];
    // Set active item for checkout
    setCart([{ plan: selectedPlan, quantity: 1, isGift }]);

    if (!user) {
      // Require authentication first, then resume directly to checkout
      openAuthModal('login', () => {
        setCartDrawerStep('checkout');
        setIsCartOpen(true);
      });
    } else {
      // Authenticated user proceeds directly to checkout step
      setCartDrawerStep('checkout');
      setIsCartOpen(true);
    }
  };

  const removeFromCart = (planId: string) => {
    setCart((prev) => prev.filter((item) => item.plan.id !== planId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const completeCheckout = async ({
    address,
    giftDetails,
  }: {
    address: UserShippingAddress;
    paymentMethod: string;
    giftDetails?: { recipient: string; note: string };
  }): Promise<FirestoreOrder> => {
    // HARD ENFORCEMENT: Only authenticated users can write orders
    if (!auth.currentUser || !user) {
      throw new Error('Authentication required: You must be signed in with Firebase to place an order.');
    }
    if (isSubmittingOrder) {
      throw new Error('Order submission is already processing.');
    }

    setIsSubmittingOrder(true);
    try {
      const selectedPlan = cart.length > 0 ? cart[0].plan : SUBSCRIPTION_PLANS[1];
      const amount = cartTotal || selectedPlan.price;
      const orderId = `AM-${Date.now().toString().slice(-6)}`;

      // Calculate upcoming monthly dispatch date (15th of next month)
      const nextMonth = new Date();
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      nextMonth.setDate(15);
      const computedNextDispatch = nextMonth.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });

      const newOrder: FirestoreOrder = {
        id: orderId,
        userId: user.uid,
        userEmail: user.email || '',
        customerName: address.fullName,
        planId: selectedPlan.id,
        planName: selectedPlan.name,
        quantity: cart.length > 0 ? cart[0].quantity : 1,
        price: amount,
        currency: 'INR',
        status: 'confirmed',
        shippingAddress: address,
        isGift: Boolean(giftDetails?.recipient),
        giftDetails: giftDetails?.recipient ? giftDetails : undefined,
        trackingNumber: 'Pending dispatch',
        estimatedDelivery: '3 to 5 business days after monthly dispatch',
        createdAt: new Date().toISOString(),
      };

      // 1. Save order to Firestore 'orders' collection
      const orderDocRef = doc(db, 'orders', orderId);
      await setDoc(orderDocRef, newOrder);

      // 2. Save active subscription to Firestore 'subscriptions' collection
      const subscriptionId = `sub_${user.uid}_${selectedPlan.id}`;
      const newSubscription: FirestoreSubscription = {
        id: subscriptionId,
        userId: user.uid,
        planId: selectedPlan.id,
        planName: selectedPlan.name,
        status: 'active',
        price: selectedPlan.price,
        currency: 'INR',
        nextDispatchDate: computedNextDispatch,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const subDocRef = doc(db, 'subscriptions', subscriptionId);
      await setDoc(subDocRef, newSubscription);

      // 3. Save shipping address to user profile in Firestore
      await saveShippingAddress(address);

      setLastOrder(newOrder);
      setCart([]);
      return newOrder;
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'orders');
      throw err;
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  return (
    <AutomotiveMailContext.Provider
      value={{
        cart,
        cartCount,
        cartTotal,
        addToCart,
        subscribeNow,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartDrawerStep,
        setCartDrawerStep,
        isAccountOpen,
        setIsAccountOpen,
        isDropsModalOpen,
        setIsDropsModalOpen,
        userOrders,
        ordersLoading,
        userSubscription,
        subscriptionLoading,
        lastOrder,
        isSubmittingOrder,
        completeCheckout,
      }}
    >
      {children}
    </AutomotiveMailContext.Provider>
  );
};

export const useAutomotiveMail = () => {
  const context = useContext(AutomotiveMailContext);
  if (!context) {
    throw new Error('useAutomotiveMail must be used within an AutomotiveMailProvider');
  }
  return context;
};
