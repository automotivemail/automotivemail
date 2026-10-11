import React, { useState, useRef, useEffect } from 'react';
import { AutomotiveMailLogo } from './AutomotiveMailLogo';
import { useAutomotiveMail } from '../context/AutomotiveMailContext';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, User, ChevronDown, Check, Package, MapPin, ExternalLink, Menu, X, LogIn, LogOut, Loader2 } from 'lucide-react';

export const Header: React.FC = () => {
  const { cartCount, setIsCartOpen, setIsAccountOpen, setIsDropsModalOpen, userSubscription } =
    useAutomotiveMail();
  const { user, userProfile, loading: authLoading, openAuthModal, logOut } = useAuth();

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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#08080A]/92 backdrop-blur-md border-b border-[#242429]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Zone 1: Brand Wordmark with Official Postage Stamp Logo */}
          <a
            href="#"
            className="flex items-center gap-3 shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E5C158]"
            aria-label="Automotive Mail - Return to top"
          >
            <AutomotiveMailLogo variant="compact" />
          </a>

          {/* Zone 2: 6 Navigation Links (Desktop) */}
          <nav className="hidden xl:flex items-center gap-7 text-[13px] font-medium tracking-wide uppercase text-[#B5B3AD]">
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
          </nav>

          {/* Zone 3: Account dropdown / Auth buttons + Cart button + Mobile Menu Toggle */}
          <div className="flex items-center gap-3.5 shrink-0">
            {/* Loading state while checking Firebase authentication */}
            {authLoading ? (
              <div className="flex items-center gap-2 px-3 py-2 text-xs font-mono text-[#8E8C85] bg-[#141418] border border-[#2B2B33] rounded">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#E5C158]" />
                <span className="hidden sm:inline">Checking auth...</span>
              </div>
            ) : user ? (
              /* Authenticated Real Customer Account Menu */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsAccountDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2 px-3 py-2 text-xs font-medium tracking-wider uppercase text-[#E6E4DF] bg-[#141418] hover:bg-[#1D1D23] border border-[#2B2B33] hover:border-[#C5A059]/40 rounded transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E5C158]"
                  aria-expanded={isAccountDropdownOpen}
                  aria-label="Account options"
                >
                  <User className="w-3.5 h-3.5 text-[#E5C158]" />
                  <span className="hidden sm:inline truncate max-w-[120px]">
                    {userProfile?.displayName || user.displayName || user.email?.split('@')[0] || 'Collector'}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-[#8E8C85] transition-transform duration-200 ${
                      isAccountDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Account Dropdown Menu with real Firestore data */}
                {isAccountDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-[#121216] border border-[#2B2B33] rounded-lg shadow-2xl p-4 text-xs z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="pb-3 border-b border-[#23232A]">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[#8E8C85] text-[11px] uppercase tracking-wider">
                          Authenticated Collector
                        </span>
                        {userSubscription ? (
                          <span className="text-[#34D399] flex items-center gap-1 text-[11px] font-mono">
                            <Check className="w-3 h-3" /> ACTIVE
                          </span>
                        ) : (
                          <span className="text-[#8E8C85] text-[10px] font-mono">NO ACTIVE TIER</span>
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
                          {userSubscription ? (
                            <>
                              <div className="text-white font-medium">{userSubscription.planName}</div>
                              <div className="text-[11px] text-[#8E8C85]">
                                Next drop: {userSubscription.nextDispatchDate}
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="text-white font-medium">No Subscription Yet</div>
                              <div className="text-[11px] text-[#8E8C85]">Select a tier to begin dispatches</div>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5 text-[#B5B3AD]">
                        <MapPin className="w-4 h-4 text-[#E5C158] shrink-0 mt-0.5" />
                        <div>
                          {userProfile?.shippingAddress?.city ? (
                            <>
                              <div className="text-[#D8D6CE]">
                                {userProfile.shippingAddress.city}, {userProfile.shippingAddress.state}
                              </div>
                              <div className="text-[11px] text-[#8E8C85]">
                                PIN: {userProfile.shippingAddress.pincode}
                              </div>
                            </>
                          ) : (
                            <div className="text-[#8E8C85] text-[11px]">No postal address saved yet</div>
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
                        className="w-full text-left px-2.5 py-1.5 rounded hover:bg-[#1D1D24] text-[#E6E4DF] transition-colors flex items-center justify-between"
                      >
                        <span>Collector Dashboard & Orders</span>
                        <ExternalLink className="w-3 h-3 text-[#8E8C85]" />
                      </button>

                      <button
                        onClick={async () => {
                          setIsAccountDropdownOpen(false);
                          await logOut();
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded hover:bg-[#251216] text-[#EF4444] transition-colors flex items-center justify-between"
                      >
                        <span>Sign Out</span>
                        <LogOut className="w-3 h-3 text-[#EF4444]" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Logged-out Visitor: Clean Login / Create Account Button */
              <button
                onClick={() => openAuthModal('login')}
                className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-[#F4F1EA] bg-[#141418] hover:bg-[#1E1E26] border border-[#2B2B33] hover:border-[#C5A059]/40 rounded transition-colors"
              >
                <LogIn className="w-3.5 h-3.5 text-[#E5C158]" />
                <span>Sign In</span>
              </button>
            )}

            {/* Cart Icon with Working Badge Counter */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center justify-center w-10 h-10 rounded bg-[#141418] hover:bg-[#1D1D23] border border-[#2B2B33] hover:border-[#C5A059]/40 text-[#E6E4DF] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E5C158]"
              aria-label={`View shopping cart with ${cartCount} items`}
            >
              <ShoppingBag className="w-4 h-4 text-[#E6E4DF]" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#C52233] text-white font-mono font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#08080A] shadow-md animate-in zoom-in-50 duration-150">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Subscribe Now Direct CTA */}
            <a
              href="#plans"
              className="hidden sm:inline-flex items-center px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#0A0A0C] bg-gradient-to-r from-[#F4E3B2] via-[#E5C158] to-[#C5A059] hover:from-[#FFF1C5] hover:to-[#D4AF37] rounded transition-all shadow-[0_2px_12px_rgba(229,193,88,0.2)] hover:shadow-[0_4px_20px_rgba(229,193,88,0.35)] shrink-0"
            >
              Subscribe Now
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="xl:hidden p-2 text-[#E6E4DF] hover:text-white hover:bg-[#141418] rounded"
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

            {!user ? (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openAuthModal('login');
                }}
                className="w-full text-center py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#1A1A24] border border-[#333344] rounded mt-2"
              >
                Sign In / Create Account
              </button>
            ) : (
              <button
                onClick={async () => {
                  setIsMobileMenuOpen(false);
                  await logOut();
                }}
                className="w-full text-center py-2 text-xs font-bold uppercase tracking-wider text-[#EF4444] bg-[#221014] rounded mt-2"
              >
                Sign Out ({user.email})
              </button>
            )}

            <div className="pt-2">
              <a
                href="#plans"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full inline-block text-center py-2.5 text-xs font-bold uppercase tracking-wider text-[#0A0A0C] bg-gradient-to-r from-[#F4E3B2] via-[#E5C158] to-[#C5A059] rounded"
              >
                Subscribe Now
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
export default Header;
