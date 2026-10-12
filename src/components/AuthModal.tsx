import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { AutomotiveMailLogo } from './AutomotiveMailLogo';
import { X, Mail, Lock, User, ArrowRight, AlertCircle, CheckCircle2, Loader2, Sparkles } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    authModalMode,
    openAuthModal,
    closeAuthModal,
    signInEmail,
    signUpEmail,
    signInGoogle,
    sendResetEmail,
  } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAuthModalOpen) return null;

  const resetFormState = () => {
    setErrorMsg(null);
    setSuccessMsg(null);
  };

  const handleSwitchMode = (mode: 'login' | 'register' | 'forgot-password') => {
    resetFormState();
    openAuthModal(mode);
  };

  const parseFirebaseError = (err: any): string => {
    const code = err?.code || '';
    const message = err?.message || '';

    if (code === 'auth/operation-not-allowed' || message.includes('operation-not-allowed')) {
      return 'Email/password authentication is not enabled on this Firebase project. Please use "Continue with Google (Firebase Authenticator)" above to sign in instantly.';
    }
    if (code === 'auth/user-not-found' || code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
      return 'Invalid email or password. Please verify your credentials.';
    }
    if (code === 'auth/email-already-in-use') {
      return 'An account already exists with this email address. Please sign in instead.';
    }
    if (code === 'auth/weak-password') {
      return 'Password should be at least 6 characters long.';
    }
    if (code === 'auth/invalid-email') {
      return 'Please enter a valid email address.';
    }
    if (code === 'auth/popup-closed-by-user') {
      return 'Sign-in popup was cancelled.';
    }
    return err?.message || 'Authentication failed. Please try again.';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsSubmitting(true);

    try {
      if (authModalMode === 'login') {
        if (!email || !password) {
          setErrorMsg('Please enter both email and password.');
          setIsSubmitting(false);
          return;
        }
        await signInEmail(email, password);
      } else if (authModalMode === 'register') {
        if (!email || !password || !displayName) {
          setErrorMsg('Please complete all registration fields.');
          setIsSubmitting(false);
          return;
        }
        if (password.length < 6) {
          setErrorMsg('Password must be at least 6 characters.');
          setIsSubmitting(false);
          return;
        }
        await signUpEmail(email, password, displayName);
      } else if (authModalMode === 'forgot-password') {
        if (!email) {
          setErrorMsg('Please enter your account email address.');
          setIsSubmitting(false);
          return;
        }
        await sendResetEmail(email);
        setSuccessMsg('Password reset instructions have been dispatched to your email.');
      }
    } catch (err: any) {
      setErrorMsg(parseFirebaseError(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsSubmitting(true);
    try {
      await signInGoogle();
    } catch (err: any) {
      setErrorMsg(parseFirebaseError(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#0F0F14] border border-[#2B2B38] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header with postage stamp & close button */}
        <div className="p-5 sm:p-6 pb-4 border-b border-[#22222E] flex items-center justify-between bg-[#121218]">
          <div className="flex items-center gap-3">
            <AutomotiveMailLogo variant="stamp-only" />
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#C5A059] block">
                Automotive Mail
              </span>
              <h3 className="font-serif-display font-bold text-lg text-white">
                {authModalMode === 'login' && 'Collector Sign In'}
                {authModalMode === 'register' && 'Join the Dispatch Circle'}
                {authModalMode === 'forgot-password' && 'Password Recovery'}
              </h3>
            </div>
          </div>

          <button
            onClick={closeAuthModal}
            className="p-1.5 rounded-lg text-[#8E8C85] hover:text-white hover:bg-[#1E1E28] transition-colors cursor-pointer"
            aria-label="Close authentication dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 sm:p-6 space-y-4">
          {/* Mode Switcher Tabs */}
          {authModalMode !== 'forgot-password' && (
            <div className="flex border-b border-[#20202A] pb-3 text-xs font-mono uppercase tracking-wider">
              <button
                type="button"
                onClick={() => handleSwitchMode('login')}
                className={`flex-1 pb-1 transition-colors cursor-pointer ${
                  authModalMode === 'login'
                    ? 'text-[#E5C158] border-b-2 border-[#E5C158] font-bold'
                    : 'text-[#8E8C85] hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => handleSwitchMode('register')}
                className={`flex-1 pb-1 transition-colors cursor-pointer ${
                  authModalMode === 'register'
                    ? 'text-[#E5C158] border-b-2 border-[#E5C158] font-bold'
                    : 'text-[#8E8C85] hover:text-white'
                }`}
              >
                Create Account
              </button>
            </div>
          )}

          {/* Feedback messages */}
          {errorMsg && (
            <div className="p-3 rounded-lg bg-[#3F1118]/80 border border-[#991B1B]/70 flex items-start gap-2.5 text-xs text-[#FCA5A5] animate-in fade-in leading-relaxed">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#EF4444]" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-lg bg-[#064E3B]/80 border border-[#059669]/70 flex items-start gap-2.5 text-xs text-[#A7F3D0] animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#10B981]" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* 1-Click Google Firebase Authenticator Button */}
          {authModalMode !== 'forgot-password' && (
            <div className="space-y-3 pt-1">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isSubmitting}
                className="w-full py-3 px-3.5 rounded-xl bg-[#14141C] hover:bg-[#1E1E28] border border-[#2B2B3A] hover:border-[#C5A059]/40 text-xs font-semibold text-white flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-md disabled:opacity-50"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.14z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.99 0 12s.45 3.83 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span>Continue with Google (Firebase Authenticator)</span>
              </button>

              <div className="relative flex items-center justify-center my-3">
                <div className="border-t border-[#20202A] w-full" />
                <span className="bg-[#0F0F14] px-3 text-[10px] font-mono uppercase text-[#66645E] absolute">
                  or with email
                </span>
              </div>
            </div>
          )}

          {/* Email / Password Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {authModalMode === 'register' && (
              <div>
                <label className="text-[10px] font-mono text-[#8E8C85] uppercase tracking-wider block mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#66645E] absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Full Name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full text-xs pl-9 pr-3 py-2.5 bg-[#121218] border border-[#282836] rounded-lg text-white focus:outline-none focus:border-[#E5C158]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-[10px] font-mono text-[#8E8C85] uppercase tracking-wider block mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#66645E] absolute left-3 top-3 pointer-events-none" />
                <input
                  type="email"
                  required
                  placeholder="collector@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2.5 bg-[#121218] border border-[#282836] rounded-lg text-white focus:outline-none focus:border-[#E5C158]"
                />
              </div>
            </div>

            {authModalMode !== 'forgot-password' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[10px] font-mono text-[#8E8C85] uppercase tracking-wider block">
                    Password
                  </label>
                  {authModalMode === 'login' && (
                    <button
                      type="button"
                      onClick={() => handleSwitchMode('forgot-password')}
                      className="text-[10px] font-mono text-[#C5A059] hover:text-[#E5C158] hover:underline cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#66645E] absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full text-xs pl-9 pr-3 py-2.5 bg-[#121218] border border-[#282836] rounded-lg text-white focus:outline-none focus:border-[#E5C158]"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-lg text-xs font-bold uppercase tracking-[0.16em] bg-gradient-to-r from-[#F4E3B2] via-[#E5C158] to-[#C5A059] hover:from-white hover:to-[#D4AF37] text-black shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer mt-3"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-black" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>
                    {authModalMode === 'login' && 'Sign In to Account'}
                    {authModalMode === 'register' && 'Create Collector Account'}
                    {authModalMode === 'forgot-password' && 'Send Reset Instructions'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {authModalMode === 'forgot-password' && (
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => handleSwitchMode('login')}
                className="text-xs text-[#C5A059] hover:underline font-mono cursor-pointer"
              >
                ← Return to Sign In
              </button>
            </div>
          )}
        </div>

        {/* Footer note */}
        <div className="p-3.5 bg-[#121218] border-t border-[#20202A] text-center text-[10px] text-[#6E6E78] font-mono">
          Physical dispatches across India · Secured by Cloud Firestore
        </div>
      </div>
    </div>
  );
};
export default AuthModal;
