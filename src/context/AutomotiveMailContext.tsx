import React, { createContext, useContext, useState, useEffect } from 'react';
import { SUBSCRIPTION_PLANS, PlanTier } from '../data/automotiveMailData';
import { useAuth, UserShippingAddress } from './AuthContext';
import { collection, query, where, onSnapshot, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType, auth } from '../firebase';

export type RequestType = 'subscription' | 'individual_print' | 'custom_enquiry';
export type RequestCategory = 'automotive' | 'aviation' | 'both';
export type RequestStatus = 'pending' | 'accepted' | 'declined' | 'completed';

export interface CustomerRequest {
  id: string; // Firestore document ID
  uid: string;
  customerName: string;
  customerEmail: string;
  phone: string;
  shippingAddress: UserShippingAddress;
  requestType: RequestType;
  category: RequestCategory;
  planId?: string;
  planName?: string;
  productId?: string;
  productName?: string;
  quantity: number;
  requirements?: string;
  notes?: string;
  status: RequestStatus;
  adminResponse?: string | null;
  trackingNumber?: string | null;
  trackingCarrier?: string | null;
  trackingStatus?: string | null;
  dispatchDate?: string | null;
  estimatedDelivery?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IntendedRequest {
  requestType: RequestType;
  category: RequestCategory;
  planId?: string;
  planName?: string;
  productId?: string;
  productName?: string;
  quantity?: number;
  requirements?: string;
  notes?: string;
}

interface AutomotiveMailContextType {
  // Requests
  userRequests: CustomerRequest[];
  allRequests: CustomerRequest[];
  requestsLoading: boolean;
  isRequestModalOpen: boolean;
  setIsRequestModalOpen: (open: boolean) => void;
  activeRequestPrefill: Partial<CustomerRequest> | null;
  openRequestModal: (prefill?: Partial<CustomerRequest>) => void;
  closeRequestModal: () => void;
  submitCustomerRequest: (
    data: Omit<CustomerRequest, 'id' | 'uid' | 'createdAt' | 'updatedAt' | 'status'>
  ) => Promise<CustomerRequest>;
  updateCustomerRequest: (
    requestId: string,
    updates: Partial<CustomerRequest>
  ) => Promise<void>;

  // Subscriptions & CTAs
  subscribeNow: (planId?: 'cars' | 'planes' | 'both', isGift?: boolean) => void;
  intendedRequest: IntendedRequest | null;
  setIntendedRequest: (req: IntendedRequest | null) => void;

  // Modals & Navigation
  isAccountOpen: boolean;
  setIsAccountOpen: (open: boolean) => void;
  isDropsModalOpen: boolean;
  setIsDropsModalOpen: (open: boolean) => void;
  isAdminPortalOpen: boolean;
  setIsAdminPortalOpen: (open: boolean) => void;

  // Backward compatibility aliases
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const AutomotiveMailContext = createContext<AutomotiveMailContextType | undefined>(undefined);

export const AutomotiveMailProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAdmin, openAuthModal, saveShippingAddress, userProfile } = useAuth();

  const [userRequests, setUserRequests] = useState<CustomerRequest[]>([]);
  const [allRequests, setAllRequests] = useState<CustomerRequest[]>([]);
  const [requestsLoading, setRequestsLoading] = useState(false);

  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [activeRequestPrefill, setActiveRequestPrefill] = useState<Partial<CustomerRequest> | null>(null);
  const [intendedRequest, setIntendedRequest] = useState<IntendedRequest | null>(null);

  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isDropsModalOpen, setIsDropsModalOpen] = useState(false);
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);

  // 1. Sync Customer's Own Requests from Firestore
  useEffect(() => {
    if (!user) {
      setUserRequests([]);
      setRequestsLoading(false);
      return;
    }

    setRequestsLoading(true);
    const q = query(collection(db, 'customerRequests'), where('uid', '==', user.uid));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list: CustomerRequest[] = [];
        snapshot.forEach((docSnap) => {
          list.push({ id: docSnap.id, ...(docSnap.data() as Omit<CustomerRequest, 'id'>) });
        });
        // Sort newest first
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setUserRequests(list);
        setRequestsLoading(false);
      },
      (error) => {
        console.error('Error fetching customer requests:', error);
        setRequestsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  // 2. Sync All Requests for Authorized Admin
  useEffect(() => {
    if (!user || !isAdmin) {
      setAllRequests([]);
      return;
    }

    const q = query(collection(db, 'customerRequests'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list: CustomerRequest[] = [];
        snapshot.forEach((docSnap) => {
          list.push({ id: docSnap.id, ...(docSnap.data() as Omit<CustomerRequest, 'id'>) });
        });
        // Sort newest first
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setAllRequests(list);
      },
      (error) => {
        console.error('Error fetching all customer requests for admin:', error);
      }
    );

    return () => unsubscribe();
  }, [user, isAdmin]);

  // Open Request Modal with prefilled parameters
  const openRequestModal = (prefill?: Partial<CustomerRequest>) => {
    setActiveRequestPrefill(prefill || null);
    setIsRequestModalOpen(true);
  };

  const closeRequestModal = () => {
    setIsRequestModalOpen(false);
    setActiveRequestPrefill(null);
  };

  /**
   * Handle Subscribe / Subscribe Now clicks
   * - If not logged in: opens customer login/create-account, preserving choice.
   * - Once logged in: opens the request form directly with choice preserved.
   */
  const subscribeNow = (planId: 'cars' | 'planes' | 'both' = 'both', isGift = false) => {
    const selectedPlan = SUBSCRIPTION_PLANS.find((p) => p.id === planId) || SUBSCRIPTION_PLANS[1];
    const category: RequestCategory = planId === 'cars' ? 'automotive' : planId === 'planes' ? 'aviation' : 'both';

    const requestData: IntendedRequest = {
      requestType: 'subscription',
      category,
      planId: selectedPlan.id,
      planName: selectedPlan.name,
      quantity: 1,
      requirements: isGift ? 'Gift Subscription with wax-sealed dedication' : '',
    };

    if (!user) {
      // Remember choice and open auth modal
      setIntendedRequest(requestData);
      openAuthModal('login', () => {
        // Callback after successful authentication
        openRequestModal({
          requestType: 'subscription',
          category,
          planId: selectedPlan.id,
          planName: selectedPlan.name,
          quantity: 1,
          requirements: requestData.requirements,
        });
      });
    } else {
      // Already authenticated: directly launch request modal
      openRequestModal({
        requestType: 'subscription',
        category,
        planId: selectedPlan.id,
        planName: selectedPlan.name,
        quantity: 1,
        requirements: requestData.requirements,
      });
    }
  };

  /**
   * Submit customer request without payment
   */
  const submitCustomerRequest = async (
    data: Omit<CustomerRequest, 'id' | 'uid' | 'createdAt' | 'updatedAt' | 'status'>
  ): Promise<CustomerRequest> => {
    if (!auth.currentUser || !user) {
      throw new Error('Authentication required: Please sign in to submit your collector request.');
    }

    const docRef = doc(collection(db, 'customerRequests'));
    const requestId = docRef.id;
    const now = new Date().toISOString();

    const newRequest: CustomerRequest = {
      ...data,
      id: requestId,
      uid: user.uid,
      customerEmail: user.email || data.customerEmail,
      status: 'pending',
      adminResponse: null,
      trackingNumber: null,
      trackingCarrier: null,
      trackingStatus: null,
      dispatchDate: null,
      estimatedDelivery: null,
      createdAt: now,
      updatedAt: now,
    };

    try {
      await setDoc(docRef, newRequest);
      // Auto-save shipping address to customer profile if provided
      if (data.shippingAddress) {
        await saveShippingAddress(data.shippingAddress);
      }
      return newRequest;
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `customerRequests/${requestId}`);
      throw err;
    }
  };

  /**
   * Admin updates a request status, customer response, or tracking details
   */
  const updateCustomerRequest = async (
    requestId: string,
    updates: Partial<CustomerRequest>
  ): Promise<void> => {
    if (!user) throw new Error('Authentication required.');

    const docRef = doc(db, 'customerRequests', requestId);
    const updatedData = {
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    try {
      await updateDoc(docRef, updatedData);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `customerRequests/${requestId}`);
      throw err;
    }
  };

  return (
    <AutomotiveMailContext.Provider
      value={{
        userRequests,
        allRequests,
        requestsLoading,
        isRequestModalOpen,
        setIsRequestModalOpen,
        activeRequestPrefill,
        openRequestModal,
        closeRequestModal,
        submitCustomerRequest,
        updateCustomerRequest,
        subscribeNow,
        intendedRequest,
        setIntendedRequest,
        isAccountOpen,
        setIsAccountOpen,
        isDropsModalOpen,
        setIsDropsModalOpen,
        isAdminPortalOpen,
        setIsAdminPortalOpen,
        // Backward-compatibility aliases
        cartCount: userRequests.filter((r) => r.status === 'pending').length,
        isCartOpen: isRequestModalOpen,
        setIsCartOpen: setIsRequestModalOpen,
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
