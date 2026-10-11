import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAutomotiveMail } from '../context/AutomotiveMailContext';
import { AutomotiveMailLogo } from './AutomotiveMailLogo';
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Loader2,
  CheckCircle2,
  ArrowLeft,
  Package,
  LogOut,
  Sparkles,
} from 'lucide-react';

interface LoginPageProps {
  onBackToHome?: () => void;
  defaultMode?: 'login' | 'register' | 'forgot-password';
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onBackToHome,
  defaultMode = 'login',
}) => {
  const {
    user,
    userProfile,
    signInEmail,
    signUpEmail,
    signInGoogle,
    sendResetEmail,
    logOut,
    loading: authLoading,
  } = useAuth();
  const { userSubscription, cartCount, setIsCartOpen, setCartDrawerStep } = useAutomotiveMail();

  const [mode, setMode] = useState<'login' | 'register' | 'forgot-password'>(defaultMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setError(null);
    setIsLoading(true);
    try {
      await signInGoogle();
      if (cartCount > 0) {
        setCartDrawerStep('checkout');
        setIsCartOpen(true);
      }
      if (onBackToHome) onBackToHome();
    } catch (err: any) {
      console.error('Google sign-in error:', err);
      setError(err.message || 'Failed to sign in with Google. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setIsLoading(true);

    try {
      if (mode === 'login') {
        await signInEmail(email, password);
        if (cartCount > 0) {
          setCartDrawerStep('checkout');
          setIsCartOpen(true);
        }
        if (onBackToHome) onBackToHome();
      } else if (mode === 'register') {
        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters.');
        }
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match.');
        }
        await signUpEmail(email, password, name);
        if (cartCount > 0) {
          setCartDrawerStep('checkout');
          setIsCartOpen(true);
        }
        if (onBackToHome) onBackToHome();
      } else if (mode === 'forgot-password') {
        await sendResetEmail(email);
        setSuccessMsg(`Password reset instructions sent to ${email}. Check your inbox.`);
      }
    } catch (err: any) {
      console.error('Auth action error:', err);
      let msg = err.message || 'Authentication failed. Please check your credentials.';
      if (msg.includes('auth/invalid-credential') || msg.includes('auth/user-not-found') || msg.includes('auth/wrong-password')) {
        msg = 'Invalid email or password. Please verify your credentials.';
      } else if (msg.includes('auth/email-already-in-use')) {
        msg = 'An account with this email address already exists. Please sign in.';
      } else if (msg.includes('auth/weak-password')) {
        msg = 'Password should be at least 6 characters.';
      }
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#08080A] text-[#E6E4DF] flex flex-col justify-between selection:bg-[#C5A059]/30 selection:text-[#F3E5AB]">
      {/* Top Header Bar */}
      <header className="border-b border-[#1A1A22] bg-[#0C0C0F]/90 backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (onBackToHome) {
                  onBackToHome();
                } else {
                  window.location.hash = '';
                }
              }}
              className="flex items-center gap-2 text-xs font-mono text-[#8E8C85] hover:text-[#E5C158] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Automotive Mail</span>
            </button>
          </div>
          <AutomotiveMailLogo />
          <div className="text-xs font-mono text-[#8E8C85]">
            Collector Portal
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-8">
        <div className="w-full max-w-md bg-[#0F0F14] border border-[#262633] rounded-2xl shadow-2xl p-6 sm:p-8 relative overflow-hidden">
          {/* Subtle gold accent border glow */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#E5C158] to-transparent opacity-60" />

          {/* If already authenticated, show logged-in account status card */}
          {user && !authLoading ? (
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-[#181824] border border-[#C5A059]/40 flex items-center justify-center mx-auto text-[#E5C158]">
                <ShieldCheck className="w-8 h-8" />
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#E5C158] bg-[#1F1C12] border border-[#E5C158]/30 px-2.5 py-1 rounded">
                  Authenticated Collector
                </span>
                <h2 className="font-serif-display font-bold text-2xl text-white mt-3">
                  {userProfile?.displayName || user.displayName || 'Welcome Back'}
                </h2>
                <p className="text-xs font-mono text-[#8E8C85] mt-1">{user.email}</p>
              </div>

              {/* Status card */}
              <div className="p-4 rounded-xl bg-[#14141C] border border-[#242432] text-left text-xs space-y-2">
                <div className="flex items-center justify-between text-[#8E8C85]">
                  <span>Subscription Status:</span>
                  {userSubscription ? (
                    <span className="text-[#34D399] font-mono font-medium">
                      Active · {userSubscription.planName}
                    </span>
                  ) : (
                    <span className="text-[#8E8C85] font-mono">No Active Plan</span>
                  )}
                </div>
                {userSubscription && (
                  <div className="flex items-center justify-between text-[#8E8C85]">
                    <span>Next Dispatch:</span>
                    <span className="text-white font-mono">{userSubscription.nextDispatchDate}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-[#8E8C85]">
                  <span>Shipping Address:</span>
                  <span className="text-white">
                    {userProfile?.shippingAddress?.city
                      ? `${userProfile.shippingAddress.city}, PIN ${userProfile.shippingAddress.pincode}`
                      : 'Not saved yet'}
                  </span>
                </div>
              </div>

              {cartCount > 0 && (
                <div className="p-3 rounded-lg bg-[#241B0E] border border-[#E5C158]/40 text-xs text-[#F4E3B2] flex items-center justify-between">
                  <span>Items waiting in mailbag ({cartCount})</span>
                  <button
                    onClick={() => {
                      setCartDrawerStep('checkout');
                      setIsCartOpen(true);
                      if (onBackToHome) onBackToHome();
                    }}
                    className="font-bold underline text-[#E5C158]"
                  >
                    Proceed to Checkout →
                  </button>
                </div>
              )}

              <div className="space-y-3 pt-2">
                <button
                  onClick={() => {
                    if (onBackToHome) onBackToHome();
                  }}
                  className="w-full py-3 rounded text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#F4E3B2] via-[#E5C158] to-[#C5A059] text-black shadow-lg hover:brightness-105 transition-all"
                >
                  Return to Print Gallery
                </button>
                <button
                  onClick={async () => {
                    await logOut();
                    setMode('login');
                  }}
                  className="w-full py-2.5 rounded text-xs font-mono uppercase tracking-wider bg-[#181822] text-[#EF4444] hover:bg-[#251216] border border-[#301B20] transition-colors flex items-center justify-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out of Collector Portal</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Heading */}
              <div className="text-center space-y-2 mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#1C180E] border border-[#C5A059]/30 text-[10px] font-mono text-[#E5C158] uppercase tracking-wider">
                  <Sparkles className="w-3 h-3" />
                  <span>Physical Art Dispatches · Pan India</span>
                </div>
                <h1 className="font-serif-display font-bold text-2xl text-white">
                  {mode === 'login' && 'Collector Sign In'}
                  {mode === 'register' && 'Join Automotive Mail'}
                  {mode === 'forgot-password' && 'Reset Password'}
                </h1>
                <p className="text-xs text-[#8E8C85] max-w-xs mx-auto">
                  {mode === 'login' &&
                    'Sign in to access monthly print drops, dispatch tracking, and subscription billing.'}
                  {mode === 'register' &&
                    'Create your collector profile to begin receiving limited-edition vintage prints across India.'}
                  {mode === 'forgot-password' &&
                    'Enter your registered email address to receive secure reset instructions.'}
                </p>
              </div>

              {/* Mode Switcher Tabs */}
              <div className="grid grid-cols-2 gap-1 bg-[#14141C] p-1 rounded-xl mb-6 border border-[#20202C]">
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setError(null);
                    setSuccessMsg(null);
                  }}
                  className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                    mode === 'login'
                      ? 'bg-[#22222E] text-white shadow-sm'
                      : 'text-[#8E8C85] hover:text-white'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode('register');
                    setError(null);
                    setSuccessMsg(null);
                  }}
                  className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                    mode === 'register'
                      ? 'bg-[#22222E] text-white shadow-sm'
                      : 'text-[#8E8C85] hover:text-white'
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* Error or Success notification */}
              {error && (
                <div className="p-3 rounded-lg bg-[#3F1118]/80 border border-[#991B1B]/70 flex items-start gap-2.5 text-xs text-[#FCA5A5] mb-5">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#EF4444]" />
                  <span>{error}</span>
                </div>
              )}

              {successMsg && (
                <div className="p-3 rounded-lg bg-[#0E2818]/80 border border-[#059669]/70 flex items-start gap-2.5 text-xs text-[#6EE7B7] mb-5">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#10B981]" />
                  <span>{successMsg}</span>
                </div>
              )}

              {/* Google 1-Click Button */}
              {mode !== 'forgot-password' && (
                <div className="space-y-4 mb-6">
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={handleGoogleSignIn}
                    className="w-full py-3 px-4 rounded-xl bg-[#14141C] hover:bg-[#1A1A24] border border-[#282838] hover:border-[#C5A059]/40 text-xs font-semibold text-white transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Continue with Google</span>
                  </button>

                  <div className="relative flex items-center justify-center">
                    <div className="border-t border-[#1F1F2C] w-full" />
                    <span className="bg-[#0F0F14] px-3 text-[10px] font-mono uppercase text-[#6B6B78] shrink-0">
                      Or with email
                    </span>
                    <div className="border-t border-[#1F1F2C] w-full" />
                  </div>
                </div>
              )}

              {/* Credential Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'register' && (
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-[#8E8C85] mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#6B6B78] absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Vikramaditya Sen"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full text-xs pl-9 pr-3 py-2.5 bg-[#14141C] border border-[#242432] rounded-lg text-white focus:outline-none focus:border-[#E5C158] transition-colors"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-[10px] font-mono uppercase text-[#8E8C85] mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#6B6B78] absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="collector@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs pl-9 pr-3 py-2.5 bg-[#14141C] border border-[#242432] rounded-lg text-white focus:outline-none focus:border-[#E5C158] transition-colors"
                    />
                  </div>
                </div>

                {mode !== 'forgot-password' && (
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[10px] font-mono uppercase text-[#8E8C85]">
                        Password
                      </label>
                      {mode === 'login' && (
                        <button
                          type="button"
                          onClick={() => {
                            setMode('forgot-password');
                            setError(null);
                          }}
                          className="text-[10px] text-[#C5A059] hover:underline"
                        >
                          Forgot password?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-[#6B6B78] absolute left-3 top-3" />
                      <input
                        type="password"
                        required
                        minLength={6}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full text-xs pl-9 pr-3 py-2.5 bg-[#14141C] border border-[#242432] rounded-lg text-white focus:outline-none focus:border-[#E5C158] transition-colors"
                      />
                    </div>
                  </div>
                )}

                {mode === 'register' && (
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-[#8E8C85] mb-1">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-[#6B6B78] absolute left-3 top-3" />
                      <input
                        type="password"
                        required
                        minLength={6}
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full text-xs pl-9 pr-3 py-2.5 bg-[#14141C] border border-[#242432] rounded-lg text-white focus:outline-none focus:border-[#E5C158] transition-colors"
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-lg text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#F4E3B2] via-[#E5C158] to-[#C5A059] text-black shadow-lg hover:brightness-105 transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-4 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-black" />
                      <span>Authenticating with Firebase...</span>
                    </>
                  ) : (
                    <>
                      <span>
                        {mode === 'login' && 'Sign In to Collector Account'}
                        {mode === 'register' && 'Register Collector Account'}
                        {mode === 'forgot-password' && 'Send Reset Link'}
                      </span>
                      <ArrowRight className="w-4 h-4 text-black" />
                    </>
                  )}
                </button>
              </form>

              {mode === 'forgot-password' && (
                <div className="mt-4 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setMode('login');
                      setError(null);
                    }}
                    className="text-xs text-[#8E8C85] hover:text-white transition-colors"
                  >
                    ← Back to Sign In
                  </button>
                </div>
              )}
            </>
          )}

          {/* Bottom Security Badge */}
          <div className="mt-6 pt-5 border-t border-[#1C1C26] flex items-center justify-center gap-2 text-[10px] font-mono text-[#6E6E7A]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#E5C158]" />
            <span>Secured by Firebase Authentication & Cloud Firestore</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#14141A] py-6 text-center text-[11px] font-mono text-[#6B6B78]">
        © {new Date().getFullYear()} Automotive Mail. Fine Motoring & Aviation Ephemera Dispatches across India.
      </footer>
    </div>
  );
};
