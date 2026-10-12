import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User as FirebaseUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '../firebase';

export interface UserShippingAddress {
  fullName: string;
  phone: string;
  streetAddress: string;
  landmark?: string;
  area?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  phone?: string;
  shippingAddress?: UserShippingAddress;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  user: FirebaseUser | null;
  userProfile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'register' | 'forgot-password';
  openAuthModal: (mode?: 'login' | 'register' | 'forgot-password', onComplete?: () => void) => void;
  closeAuthModal: () => void;
  signInEmail: (email: string, pass: string) => Promise<void>;
  signUpEmail: (email: string, pass: string, name: string) => Promise<void>;
  signInGoogle: () => Promise<void>;
  sendResetEmail: (email: string) => Promise<void>;
  logOut: () => Promise<void>;
  saveShippingAddress: (address: UserShippingAddress) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register' | 'forgot-password'>('login');
  const [pendingCallback, setPendingCallback] = useState<(() => void) | null>(null);

  // Load user profile from Firestore
  const fetchUserProfile = async (uid: string, fallbackEmail: string, fallbackName?: string | null) => {
    try {
      const userDocRef = doc(db, 'users', uid);
      const snapshot = await getDoc(userDocRef);
      if (snapshot.exists()) {
        setUserProfile(snapshot.data() as UserProfile);
      } else {
        // Create initial user document if it doesn't exist
        const newProfile: UserProfile = {
          uid,
          email: fallbackEmail,
          displayName: fallbackName || fallbackEmail.split('@')[0],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        await setDoc(userDocRef, newProfile);
        setUserProfile(newProfile);
      }
    } catch (error) {
      console.error('Error fetching user profile from Firestore:', error);
      // Non-fatal fallback for UI
      setUserProfile({
        uid,
        email: fallbackEmail,
        displayName: fallbackName || fallbackEmail.split('@')[0],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser && currentUser.email) {
        await fetchUserProfile(currentUser.uid, currentUser.email, currentUser.displayName);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const openAuthModal = (
    mode: 'login' | 'register' | 'forgot-password' = 'login',
    onComplete?: () => void
  ) => {
    setAuthModalMode(mode);
    if (onComplete) {
      setPendingCallback(() => onComplete);
    } else {
      setPendingCallback(null);
    }
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const executePendingCallback = () => {
    if (pendingCallback) {
      const cb = pendingCallback;
      setPendingCallback(null);
      // Execute on next tick so modal can close smoothly
      setTimeout(() => cb(), 100);
    }
  };

  const signInEmail = async (email: string, pass: string) => {
    const cred = await signInWithEmailAndPassword(auth, email.trim(), pass);
    if (cred.user && cred.user.email) {
      await fetchUserProfile(cred.user.uid, cred.user.email, cred.user.displayName);
    }
    setIsAuthModalOpen(false);
    executePendingCallback();
  };

  const signUpEmail = async (email: string, pass: string, name: string) => {
    const cred = await createUserWithEmailAndPassword(auth, email.trim(), pass);
    if (name.trim()) {
      await updateProfile(cred.user, { displayName: name.trim() });
    }
    const userDocRef = doc(db, 'users', cred.user.uid);
    const newProfile: UserProfile = {
      uid: cred.user.uid,
      email: cred.user.email || email.trim(),
      displayName: name.trim() || email.trim().split('@')[0],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    try {
      await setDoc(userDocRef, newProfile);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `users/${cred.user.uid}`);
    }
    setUserProfile(newProfile);
    setIsAuthModalOpen(false);
    executePendingCallback();
  };

  const signInGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(auth, provider);
    if (cred.user && cred.user.email) {
      await fetchUserProfile(cred.user.uid, cred.user.email, cred.user.displayName);
    }
    setIsAuthModalOpen(false);
    executePendingCallback();
  };

  const sendResetEmail = async (email: string) => {
    await sendPasswordResetEmail(auth, email.trim());
  };

  const logOut = async () => {
    await signOut(auth);
    setUser(null);
    setUserProfile(null);
  };

  const saveShippingAddress = async (address: UserShippingAddress) => {
    if (!user) return;
    const userDocRef = doc(db, 'users', user.uid);
    const updated = {
      ...userProfile,
      shippingAddress: address,
      updatedAt: new Date().toISOString(),
    };
    try {
      await setDoc(userDocRef, updated, { merge: true });
      setUserProfile((prev) => (prev ? { ...prev, shippingAddress: address } : null));
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `users/${user.uid}`);
    }
  };

  const isAdmin = Boolean(
    user && (
      user.email?.toLowerCase() === 'ask.automotivemail@gmail.com' ||
      user.email?.toLowerCase() === 'admin@automotivemail.com'
    )
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        isAdmin,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        signInEmail,
        signUpEmail,
        signInGoogle,
        sendResetEmail,
        logOut,
        saveShippingAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
