import React, { useState, useRef, useEffect } from 'react';
import { AutomotiveMailLogo } from './AutomotiveMailLogo';
import { useAutomotiveMail } from '../context/AutomotiveMailContext';
import { useAuth } from '../context/AuthContext';
import {
  User,
  ChevronDown,
  Package,
  MapPin,
  ExternalLink,
  Menu,
  X,
  LogIn,
  LogOut,
  Loader2,
  ShieldCheck,
  PlusCircle,
  Clock,
  Sparkles,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    openRequestModal,
    setIsAccountOpen,
    setIsDropsModalOpen,
    userRequests,
    subscribeNow,
  } = useAutomotiveMail();
  const { user, userProfile, isAdmin, loading: authLoading, openAuthModal, logOut } = useAuth();

  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsAccountDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: 'Drops', href: '#drops', onClick: () => setIsDropsModalOpen(true) },
    { label: 'Subscription Plans', href: '#plans' },
    { label: 'The Legendary Subject', href: '#subject' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'The Guarantee', href: '#guarantee' },
    { label: 'FAQ', href: '#faq' },
  ];

  const pendingCount = userRequests.filter((r) => r.status === 'pending').length;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#08080A]/92 backdrop-blur-md border-b border-[#242429]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-2 sm:gap-4">
          {/* Zone 1: Brand Wordmark with Official Postage Stamp Logo */}
          <a
            href="#"
            className="flex items-center gap-2 sm:gap-3 shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E5C158]"
            aria-label="Automotive Mail - Return to top"
          >
            <AutomotiveMailLogo variant="compact" />
          </a>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden xl:flex items-center gap-6 text-[13px] font-medium tracking-wide uppercase text-[#B5B3AD]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  if (link.onClick) {
                    e.preventDefault();
                    link.onClick();
                  }
                }}
                className="whitespace-nowrap hover:text-[#F3E5AB] transition-colors relative py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#E5C158] transition-all duration-200 group-hover:w-full" />
              </a>
            ))}

            {user && (
              <a
                href="#account"
                onClick={(e) => {
                  e.preventDefault();
                  setIsAccountOpen(true);
                }}
                className="whitespace-nowrap text-[#E5C158] hover:text-[#FFF1C5] transition-colors py-1 flex items-center gap-1 font-mono text-xs"
              >
                <span>My Requests</span>
                {userRequests.length > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-[#1F1C12] border border-[#E5C158]/50 text-[10px]">
                    {userRequests.length}
                  </span>
                )}
              </a>
            )}

            {isAdmin && (
              <a
                href="#admin"
                className="whitespace-nowrap text-[#34D399] hover:text-white transition-colors py-1 flex items-center gap-1 font-mono text-xs border-l border-[#262634] pl-4"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#34D399]" />
                <span>Admin Desk</span>
              </a>
            )}
          </nav>

          {/* Zone 3: Account dropdown / Auth buttons + Request CTA + Mobile Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Loading state while checking Firebase authentication */}
            {authLoading ? (
              <div className="flex items-center gap-2 px-2.5 py-1.5 text-xs font-mono text-[#8E8C85] bg-[#141418] border border-[#2B2B33] rounded">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#E5C158]" />
              </div>
            ) : user ? (
              /* Authenticated Real Customer Account Menu */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsAccountDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2 text-xs font-medium tracking-wider uppercase text-[#E6E4DF] bg-[#141418] hover:bg-[#1D1D23] border border-[#2B2B33] hover:border-[#C5A059]/40 rounded transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E5C158] cursor-pointer"
                  aria-expanded={isAccountDropdownOpen}
                  aria-label="Account options"
                >
                  <User className="w-3.5 h-3.5 text-[#E5C158]" />
                  <span className="hidden sm:inline truncate max-w-[110px]">
                    {userProfile?.displayName || user.displayName || user.email?.split('@')[0] || 'Collector'}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-[#8E8C85] transition-transform duration-200 ${
                      isAccountDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Account Dropdown Menu */}
                {isAccountDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-[#121218] border border-[#2B2B33] rounded-xl shadow-2xl p-4 text-xs z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="pb-3 border-b border-[#23232A]">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[#8E8C85] text-[10px] uppercase tracking-wider font-mono">
                          Verified Collector
                        </span>
                        {isAdmin && (
                          <span className="text-[#34D399] text-[10px] font-mono border border-[#059669]/40 px-1.5 py-0.2 rounded bg-[#064E3B]/30">
                            ADMIN
                          </span>
                        )}
                      </div>
                      <div className="font-serif-display font-semibold text-sm text-[#F4F1EA] truncate">
                        {userProfile?.displayName || user.displayName || 'Collector Member'}
                      </div>
                      <div className="text-[11px] text-[#A69E89] font-mono mt-0.5 truncate">
                        {user.email}
                      </div>
                    </div>

                    <div className="py-2.5 border-b border-[#23232A] space-y-2">
                      <div className="flex items-start gap-2.5 text-[#B5B3AD]">
                        <Package className="w-4 h-4 text-[#E5C158] shrink-0 mt-0.5" />
                        <div>
                          <div className="text-white font-medium">
                            {userRequests.length} Collector Request{userRequests.length === 1 ? '' : 's'}
                          </div>
                          <div className="text-[11px] text-[#8E8C85]">
                            {pendingCount > 0 ? `${pendingCount} pending review` : 'All requests up to date'}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5 text-[#B5B3AD]">
                        <MapPin className="w-4 h-4 text-[#E5C158] shrink-0 mt-0.5" />
                        <div>
                          {userProfile?.shippingAddress?.city ? (
                            <div className="text-[#D8D6CE]">
                              {userProfile.shippingAddress.city}, PIN {userProfile.shippingAddress.pincode}
                            </div>
                          ) : (
                            <div className="text-[#8E8C85] text-[11px]">No delivery address saved yet</div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 flex flex-col gap-1">
                      <button
                        onClick={() => {
                          setIsAccountDropdownOpen(false);
                          setIsAccountOpen(true);
                        }}
                        className="w-full text-left px-2.5 py-2 rounded hover:bg-[#1D1D24] text-[#E6E4DF] transition-colors flex items-center justify-between cursor-pointer"
                      >
                        <span>My Requests & Order Tracking</span>
                        <ExternalLink className="w-3 h-3 text-[#8E8C85]" />
                      </button>

                      {isAdmin && (
                        <a
                          href="#admin"
                          onClick={() => setIsAccountDropdownOpen(false)}
                          className="w-full text-left px-2.5 py-2 rounded hover:bg-[#18261E] text-[#34D399] transition-colors flex items-center justify-between"
                        >
                          <span className="font-semibold">Owner Admin Portal</span>
                          <ShieldCheck className="w-3.5 h-3.5 text-[#34D399]" />
                        </a>
                      )}

                      <button
                        onClick={async () => {
                          setIsAccountDropdownOpen(false);
                          await logOut();
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded hover:bg-[#251216] text-[#EF4444] transition-colors flex items-center justify-between cursor-pointer"
                      >
                        <span>Sign Out</span>
                        <LogOut className="w-3 h-3 text-[#EF4444]" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Visitor: Clean Login / Create Account options */
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={() => openAuthModal('login')}
                  className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#F4F1EA] bg-[#141418] hover:bg-[#1E1E26] border border-[#2B2B33] hover:border-[#C5A059]/40 rounded transition-colors cursor-pointer"
                >
                  <LogIn className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E5C158]" />
                  <span>Login</span>
                </button>
                <button
                  onClick={() => openAuthModal('register')}
                  className="hidden md:inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[#E5C158] hover:text-[#FFF1C5] hover:bg-[#1A1A22] border border-[#C5A059]/30 rounded transition-colors cursor-pointer"
                >
                  <span>Create Account</span>
                </button>
              </div>
            )}

            {/* My Requests Quick Desk Icon Button */}
            <button
              onClick={() => {
                if (user) setIsAccountOpen(true);
                else openRequestModal();
              }}
              className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded bg-[#141418] hover:bg-[#1D1D23] border border-[#2B2B33] hover:border-[#C5A059]/40 text-[#E6E4DF] transition-colors cursor-pointer"
              aria-label="View collector requests"
              title="Collector Desk & Requests"
            >
              <Package className="w-4 h-4 text-[#E5C158]" />
              {userRequests.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#C52233] text-white font-mono font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#08080A] shadow-md">
                  {userRequests.length}
                </span>
              )}
            </button>

            {/* ALWAYS VISIBLE SUBSCRIBE BUTTON (Responsive: Never hidden off-screen) */}
            <button
              type="button"
              onClick={() => subscribeNow('both')}
              className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#0A0A0C] bg-gradient-to-r from-[#F4E3B2] via-[#E5C158] to-[#C5A059] hover:from-[#FFF1C5] hover:to-[#D4AF37] rounded transition-all shadow-[0_2px_12px_rgba(229,193,88,0.25)] hover:shadow-[0_4px_20px_rgba(229,193,88,0.4)] shrink-0 cursor-pointer active:scale-95"
            >
              <span className="hidden xs:inline">Subscribe Now</span>
              <span className="xs:hidden">Subscribe</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="xl:hidden p-2 text-[#E6E4DF] hover:text-white hover:bg-[#141418] rounded cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-[#0D0D10] border-b border-[#2B2B33] px-6 py-5 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-3 text-sm font-medium uppercase tracking-wider text-[#B5B3AD]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  setIsMobileMenuOpen(false);
                  if (link.onClick) {
                    e.preventDefault();
                    link.onClick();
                  }
                }}
                className="py-2 hover:text-[#F3E5AB] border-b border-[#1A1A22] transition-colors"
              >
                {link.label}
              </a>
            ))}

            {user ? (
              <>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsAccountOpen(true);
                  }}
                  className="w-full text-left py-2.5 text-xs font-mono uppercase text-[#E5C158] flex items-center justify-between border-b border-[#1A1A22]"
                >
                  <span>My Requests & Live Tracking</span>
                  <Package className="w-4 h-4 text-[#E5C158]" />
                </button>

                {isAdmin && (
                  <a
                    href="#admin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full text-left py-2.5 text-xs font-mono uppercase text-[#34D399] flex items-center justify-between border-b border-[#1A1A22]"
                  >
                    <span>Owner Admin Desk</span>
                    <ShieldCheck className="w-4 h-4 text-[#34D399]" />
                  </a>
                )}

                <button
                  onClick={async () => {
                    setIsMobileMenuOpen(false);
                    await logOut();
                  }}
                  className="w-full text-center py-2 text-xs font-bold uppercase tracking-wider text-[#EF4444] bg-[#221014] rounded mt-2"
                >
                  Sign Out ({user.email})
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openAuthModal('login');
                }}
                className="w-full text-center py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#1A1A24] border border-[#333344] rounded mt-2"
              >
                Sign In / Create Account
              </button>
            )}

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  subscribeNow('both');
                }}
                className="w-full inline-block text-center py-3 text-xs font-bold uppercase tracking-wider text-[#0A0A0C] bg-gradient-to-r from-[#F4E3B2] via-[#E5C158] to-[#C5A059] rounded cursor-pointer shadow-lg"
              >
                Subscribe Now (No Payment Taken)
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
export default Header;
