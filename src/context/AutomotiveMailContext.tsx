import React, { createContext, useContext, useState, useEffect } from 'react';
import { SUBSCRIPTION_PLANS, PlanTier } from '../data/automotiveMailData';

export interface CartItem {
  plan: PlanTier;
  quantity: number;
  isGift: boolean;
  giftRecipientName?: string;
  giftMessage?: string;
}

export interface UserAddress {
  fullName: string;
  phone: string;
  streetAddress: string;
  city: string;
  state: string;
  pincode: string;
}

export interface OrderConfirmation {
  orderId: string;
  date: string;
  tierName: string;
  totalAmount: number;
  recipientName: string;
  city: string;
  pincode: string;
  trackingNumber: string;
  estimatedDelivery: string;
}

interface AutomotiveMailContextType {
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (planId: 'cars' | 'planes' | 'both', isGift?: boolean) => void;
  removeFromCart: (planId: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isAccountOpen: boolean;
  setIsAccountOpen: (open: boolean) => void;
  isDropsModalOpen: boolean;
  setIsDropsModalOpen: (open: boolean) => void;
  userAddress: UserAddress;
  setUserAddress: React.Dispatch<React.SetStateAction<UserAddress>>;
  activeSubscription: {
    tierId: string;
    status: string;
    nextDispatchDate: string;
    memberId: string;
  } | null;
  lastOrder: OrderConfirmation | null;
  completeCheckout: (details: { address: UserAddress; paymentMethod: string; giftDetails?: { recipient: string; note: string } }) => OrderConfirmation;
}

const AutomotiveMailContext = createContext<AutomotiveMailContextType | undefined>(undefined);

export const AutomotiveMailProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([
    {
      plan: SUBSCRIPTION_PLANS.find((p) => p.id === 'both') || SUBSCRIPTION_PLANS[1],
      quantity: 1,
      isGift: false,
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isDropsModalOpen, setIsDropsModalOpen] = useState(false);

  const [userAddress, setUserAddress] = useState<UserAddress>({
    fullName: 'Arjun Mehta',
    phone: '+91 98201 54321',
    streetAddress: 'Flat 402, Sea Green Apartments, Worli Sea Face',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400018',
  });

  const [activeSubscription, setActiveSubscription] = useState<{
    tierId: string;
    status: string;
    nextDispatchDate: string;
    memberId: string;
  } | null>({
    tierId: 'both',
    status: 'Active · Dispatching Monthly',
    nextDispatchDate: '18 October 2026',
    memberId: 'IN-AM-7409',
  });

  const [lastOrder, setLastOrder] = useState<OrderConfirmation | null>(null);

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
    setIsCartOpen(true);
  };

  const removeFromCart = (planId: string) => {
    setCart((prev) => prev.filter((item) => item.plan.id !== planId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const completeCheckout = ({
    address,
    giftDetails,
  }: {
    address: UserAddress;
    paymentMethod: string;
    giftDetails?: { recipient: string; note: string };
  }): OrderConfirmation => {
    const planName = cart.length > 0 ? cart[0].plan.name : 'Both Worlds';
    const amount = cartTotal || 759;
    const trackingCode = `BLUEDART-AM-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: OrderConfirmation = {
      orderId: `AM-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      tierName: planName,
      totalAmount: amount,
      recipientName: giftDetails?.recipient || address.fullName,
      city: address.city,
      pincode: address.pincode,
      trackingNumber: trackingCode,
      estimatedDelivery: '3 to 5 business days (Tracked Air Express)',
    };

    setLastOrder(newOrder);
    setUserAddress(address);
    setActiveSubscription({
      tierId: cart[0]?.plan.id || 'both',
      status: 'Active · Express Dispatched',
      nextDispatchDate: '18 October 2026',
      memberId: `IN-AM-${Math.floor(1000 + Math.random() * 9000)}`,
    });
    setCart([]);
    return newOrder;
  };

  return (
    <AutomotiveMailContext.Provider
      value={{
        cart,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        isAccountOpen,
        setIsAccountOpen,
        isDropsModalOpen,
        setIsDropsModalOpen,
        userAddress,
        setUserAddress,
        activeSubscription,
        lastOrder,
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
