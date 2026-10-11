import React, { useState } from 'react';
import { useAutomotiveMail } from '../context/AutomotiveMailContext';
import { useAuth, UserShippingAddress } from '../context/AuthContext';
import { AutomotiveMailLogo } from './AutomotiveMailLogo';
import {
  X,
  Check,
  MapPin,
  Package,
  Calendar,
  ShieldCheck,
  Mail,
  Phone,
  Clock,
  History,
  AlertCircle,
  LogOut,
  Save,
  Loader2,
  Lock,
} from 'lucide-react';

export const AccountModal: React.FC = () => {
  const { isAccountOpen, setIsAccountOpen, userOrders, ordersLoading, userSubscription, subscriptionLoading } =
    useAutomotiveMail();
  const { user, userProfile, openAuthModal, logOut, saveShippingAddress } = useAuth();

  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressInput, setAddressInput] = useState<UserShippingAddress>({
    fullName: '',
    phone: '',
    streetAddress: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [isSavingAddress, setIsSavingAddress] = useState(false);
  const [addressSaveSuccess, setAddressSaveSuccess] = useState(false);

  // Initialize editing state when userProfile loads
  React.useEffect(() => {
    if (userProfile?.shippingAddress) {
      setAddressInput(userProfile.shippingAddress);
    } else if (user) {
      setAddressInput({
        fullName: userProfile?.displayName || user.displayName || '',
        phone: '',
        streetAddress: '',
        city: '',
        state: '',
        pincode: '',
      });
    }
  }, [userProfile, user]);

  if (!isAccountOpen) return null;

  // Protected View: If not signed in, show authentic sign-in gate
  if (!user) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
        <div className="relative w-full max-w-md bg-[#0F0F14] border border-[#2B2B38] rounded-2xl shadow-2xl p-6 text-center space-y-5">
          <button
            onClick={() => setIsAccountOpen(false)}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-[#8E8C85] hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-14 h-14 rounded-full bg-[#181822] border border-[#2B2B38] flex items-center justify-center mx-auto text-[#E5C158]">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif-display font-bold text-xl text-white">Collector Sign In Required</h3>
            <p className="text-xs text-[#8E8C85] mt-1 max-w-xs mx-auto">
              Please sign in with your email to access your genuine orders, active subscriptions, and dispatch history.
            </p>
          </div>
          <button
            onClick={() => {
              setIsAccountOpen(false);
              openAuthModal('login');
            }}
            className="w-full py-3 rounded text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#F4E3B2] via-[#E5C158] to-[#C5A059] text-black"
          >
            Sign In / Create Account
          </button>
        </div>
      </div>
    );
  }

  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingAddress(true);
    setAddressSaveSuccess(false);
    try {
      await saveShippingAddress(addressInput);
      setIsEditingAddress(false);
      setAddressSaveSuccess(true);
      setTimeout(() => setAddressSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to save address:', err);
    } finally {
      setIsSavingAddress(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0F0F14] border border-[#2B2B38] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#22222E] flex items-center justify-between bg-[#121218]">
          <div className="flex items-center gap-3">
            <AutomotiveMailLogo variant="stamp-only" />
            <div>
              <h3 className="font-serif-display font-bold text-base text-white">
                Collector Dashboard
              </h3>
              <div className="text-[11px] font-mono text-[#8E8C85]">
                {user.email} · Authenticated via Firebase
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsAccountOpen(false)}
            className="p-1.5 rounded-lg text-[#8E8C85] hover:text-white hover:bg-[#1E1E28] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs flex-1">
          {/* Active Subscription Status from Firestore */}
          <div className="p-5 rounded-xl bg-[#14141C] border border-[#262634] space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono uppercase tracking-wider text-[11px] text-[#8E8C85]">
                Active Subscription
              </span>
              {subscriptionLoading ? (
                <span className="text-[#8E8C85] font-mono text-[11px] flex items-center gap-1">
                  <Loader2 className="w-3 h-3 animate-spin" /> Checking Firestore...
                </span>
              ) : userSubscription ? (
                <span className="text-[#34D399] font-mono text-[11px] flex items-center gap-1">
                  <Check className="w-3 h-3" /> ACTIVE & SUBSCRIBED
                </span>
              ) : (
                <span className="text-[#8E8C85] font-mono text-[11px]">No active subscription</span>
              )}
            </div>

            {userSubscription ? (
              <>
                <div className="flex items-baseline justify-between">
                  <div>
                    <h4 className="text-lg font-bold font-serif-display text-white">
                      {userSubscription.planName} Tier
                    </h4>
                    <p className="text-[11px] text-[#A6A49F]">
                      Physical print package scheduled for monthly delivery
                    </p>
                  </div>
                  <span className="text-xl font-mono text-[#E5C158] font-bold">
                    ₹{userSubscription.price}/mo
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#1E1E28] text-[11px] font-mono">
                  <div className="flex items-center gap-2 text-[#8E8C85]">
                    <Calendar className="w-3.5 h-3.5 text-[#E5C158]" />
                    <span>Next Dispatch: {userSubscription.nextDispatchDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#8E8C85]">
                    <Package className="w-3.5 h-3.5 text-[#E5C158]" />
                    <span>Status: {userSubscription.status.toUpperCase()}</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="py-2 text-[#8E8C85]">
                <p>You do not have an active monthly subscription yet.</p>
                <a
                  href="#plans"
                  onClick={() => setIsAccountOpen(false)}
                  className="inline-block mt-2 text-[#E5C158] hover:underline font-mono text-xs"
                >
                  Explore Subscription Plans →
                </a>
              </div>
            )}
          </div>

          {/* Postal Shipping Address (Real Firestore User Profile) */}
          <div className="p-5 rounded-xl bg-[#14141C] border border-[#262634] space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono uppercase tracking-wider text-[11px] text-[#8E8C85] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#E5C158]" />
                <span>Registered Delivery Address (India)</span>
              </span>

              {!isEditingAddress ? (
                <button
                  type="button"
                  onClick={() => setIsEditingAddress(true)}
                  className="text-[#E5C158] hover:underline font-mono text-[11px]"
                >
                  {userProfile?.shippingAddress?.streetAddress ? 'Edit Address' : 'Add Address'}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditingAddress(false)}
                  className="text-[#8E8C85] hover:text-white font-mono text-[11px]"
                >
                  Cancel
                </button>
              )}
            </div>

            {addressSaveSuccess && (
              <div className="p-2 rounded bg-[#064E3B]/80 text-[#34D399] font-mono text-[11px]">
                Shipping address saved to your Firebase profile.
              </div>
            )}

            {!isEditingAddress ? (
              userProfile?.shippingAddress?.streetAddress ? (
                <div className="space-y-1">
                  <div className="text-white font-semibold">{userProfile.shippingAddress.fullName}</div>
                  <div className="text-[#B5B3AD] leading-relaxed">
                    {userProfile.shippingAddress.streetAddress}, {userProfile.shippingAddress.city},{' '}
                    {userProfile.shippingAddress.state} – {userProfile.shippingAddress.pincode}
                  </div>
                  {userProfile.shippingAddress.phone && (
                    <div className="text-[#8E8C85] flex items-center gap-2 pt-1 font-mono text-[11px]">
                      <Phone className="w-3 h-3" />
                      <span>{userProfile.shippingAddress.phone}</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-[#8E8C85] text-xs py-1">
                  No default delivery address saved. You can add one now or enter it during checkout.
                </div>
              )
            ) : (
              <form onSubmit={handleSaveAddress} className="space-y-3 pt-1">
                <div>
                  <label className="text-[10px] font-mono text-[#8E8C85] block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={addressInput.fullName}
                    onChange={(e) => setAddressInput({ ...addressInput, fullName: e.target.value })}
                    className="w-full text-xs px-3 py-2 bg-[#0E0E14] border border-[#2A2A38] rounded text-white focus:outline-none focus:border-[#E5C158]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-[#8E8C85] block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={addressInput.phone}
                    onChange={(e) => setAddressInput({ ...addressInput, phone: e.target.value })}
                    className="w-full text-xs px-3 py-2 bg-[#0E0E14] border border-[#2A2A38] rounded text-white focus:outline-none focus:border-[#E5C158]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-[#8E8C85] block mb-1">Street Address</label>
                  <textarea
                    rows={2}
                    required
                    value={addressInput.streetAddress}
                    onChange={(e) => setAddressInput({ ...addressInput, streetAddress: e.target.value })}
                    className="w-full text-xs px-3 py-2 bg-[#0E0E14] border border-[#2A2A38] rounded text-white focus:outline-none focus:border-[#E5C158]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-mono text-[#8E8C85] block mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={addressInput.city}
                      onChange={(e) => setAddressInput({ ...addressInput, city: e.target.value })}
                      className="w-full text-xs px-3 py-2 bg-[#0E0E14] border border-[#2A2A38] rounded text-white focus:outline-none focus:border-[#E5C158]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-[#8E8C85] block mb-1">PIN Code</label>
                    <input
                      type="text"
                      required
                      pattern="[0-9]{6}"
                      maxLength={6}
                      value={addressInput.pincode}
                      onChange={(e) => setAddressInput({ ...addressInput, pincode: e.target.value })}
                      className="w-full text-xs px-3 py-2 bg-[#0E0E14] border border-[#2A2A38] rounded text-white focus:outline-none focus:border-[#E5C158]"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-mono text-[#8E8C85] block mb-1">State</label>
                  <input
                    type="text"
                    required
                    value={addressInput.state}
                    onChange={(e) => setAddressInput({ ...addressInput, state: e.target.value })}
                    className="w-full text-xs px-3 py-2 bg-[#0E0E14] border border-[#2A2A38] rounded text-white focus:outline-none focus:border-[#E5C158]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSavingAddress}
                  className="px-4 py-2 rounded bg-[#E5C158] text-black font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5"
                >
                  {isSavingAddress ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                  <span>Save to Firebase</span>
                </button>
              </form>
            )}
          </div>

          {/* Real Order History Stored in Firestore */}
          <div className="p-5 rounded-xl bg-[#14141C] border border-[#262634] space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono uppercase tracking-wider text-[11px] text-[#8E8C85] flex items-center gap-1.5">
                <History className="w-3.5 h-3.5 text-[#E5C158]" />
                <span>Real Order History (Firestore)</span>
              </span>
              <span className="text-[11px] font-mono text-[#8E8C85]">
                {userOrders.length} Order{userOrders.length === 1 ? '' : 's'}
              </span>
            </div>

            {ordersLoading ? (
              <div className="py-4 text-center text-[#8E8C85] flex items-center justify-center gap-2 font-mono">
                <Loader2 className="w-4 h-4 animate-spin text-[#E5C158]" />
                <span>Loading real order history...</span>
              </div>
            ) : userOrders.length === 0 ? (
              <div className="py-6 text-center text-[#8E8C85] space-y-1">
                <div className="font-semibold text-white">No orders yet</div>
                <p className="text-xs max-w-xs mx-auto">
                  When you subscribe or order dispatches, your official receipts and tracking codes will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {userOrders.map((order) => (
                  <div
                    key={order.id}
                    className="p-3.5 rounded-lg bg-[#0E0E14] border border-[#20202C] text-xs font-mono space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[#E5C158] font-bold">{order.id}</span>
                      <span className="text-[#34D399] uppercase text-[10px] px-2 py-0.5 bg-[#064E3B]/30 rounded border border-[#059669]/40">
                        {order.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-white font-sans font-medium">
                      <span>{order.planName} (Qty: {order.quantity})</span>
                      <span className="font-mono text-[#E5C158]">
                        ₹{order.price} {order.currency}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[#8E8C85] text-[11px] pt-1 border-t border-[#1C1C24]">
                      <span>
                        {new Date(order.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                      <span className="text-[#38BDF8]">{order.trackingNumber}</span>
                    </div>

                    <div className="text-[10px] text-[#6E6E78]">
                      Delivering to: {order.shippingAddress.city}, {order.shippingAddress.state} ({order.shippingAddress.pincode})
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#121218] border-t border-[#22222E] flex items-center justify-between">
          <button
            onClick={async () => {
              setIsAccountOpen(false);
              await logOut();
            }}
            className="px-3 py-1.5 rounded text-xs text-[#EF4444] hover:bg-[#201014] transition-colors flex items-center gap-1.5 font-mono"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>

          <button
            onClick={() => setIsAccountOpen(false)}
            className="px-5 py-2 rounded bg-[#1C1C26] hover:bg-[#252534] border border-[#3A3A4C] text-xs font-semibold uppercase tracking-wider text-white transition-colors"
          >
            Close Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
export default AccountModal;
