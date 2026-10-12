import React, { useState, useEffect } from 'react';
import { useAutomotiveMail, CustomerRequest } from '../context/AutomotiveMailContext';
import { useAuth, UserShippingAddress } from '../context/AuthContext';
import { AutomotiveMailLogo } from './AutomotiveMailLogo';
import {
  X,
  MapPin,
  Package,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  AlertCircle,
  Truck,
  LogOut,
  Save,
  Loader2,
  Lock,
  PlusCircle,
  ExternalLink,
} from 'lucide-react';

export const AccountModal: React.FC = () => {
  const { isAccountOpen, setIsAccountOpen, userRequests, requestsLoading, openRequestModal } =
    useAutomotiveMail();
  const { user, userProfile, openAuthModal, logOut, saveShippingAddress } = useAuth();

  const [activeTab, setActiveTab] = useState<'requests' | 'address'>('requests');
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressInput, setAddressInput] = useState<UserShippingAddress>({
    fullName: '',
    phone: '',
    streetAddress: '',
    landmark: '',
    area: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
  });
  const [isSavingAddress, setIsSavingAddress] = useState(false);
  const [addressSaveSuccess, setAddressSaveSuccess] = useState(false);
  const [addressError, setAddressError] = useState<string | null>(null);

  useEffect(() => {
    if (userProfile?.shippingAddress) {
      setAddressInput({
        ...userProfile.shippingAddress,
        country: userProfile.shippingAddress.country || 'India',
      });
    } else if (user) {
      setAddressInput({
        fullName: userProfile?.displayName || user.displayName || '',
        phone: '',
        streetAddress: '',
        landmark: '',
        area: '',
        city: '',
        state: '',
        pincode: '',
        country: 'India',
      });
    }
  }, [userProfile, user]);

  if (!isAccountOpen) return null;

  // Unauthenticated Guard
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
              Please sign in with your Firebase account to view your customer requests, track physical order dispatches, and manage your delivery address.
            </p>
          </div>
          <button
            onClick={() => {
              setIsAccountOpen(false);
              openAuthModal('login');
            }}
            className="w-full py-3 rounded text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#F4E3B2] via-[#E5C158] to-[#C5A059] text-black cursor-pointer shadow-md"
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
    setAddressError(null);

    try {
      await saveShippingAddress(addressInput);
      setIsEditingAddress(false);
      setAddressSaveSuccess(true);
      setTimeout(() => setAddressSaveSuccess(false), 3000);
    } catch (err: any) {
      console.error('Failed to save address:', err);
      setAddressError(err.message || 'Failed to save address.');
    } finally {
      setIsSavingAddress(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0F0F14] border border-[#2B2B38] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-5 sm:px-6 py-4 border-b border-[#22222E] flex items-center justify-between bg-[#121218] shrink-0">
          <div className="flex items-center gap-3">
            <AutomotiveMailLogo variant="stamp-only" />
            <div>
              <h3 className="font-serif-display font-bold text-base text-white">
                Collector Dashboard
              </h3>
              <div className="text-[11px] font-mono text-[#8E8C85]">
                {user.email} · Verified
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsAccountOpen(false)}
            className="p-1.5 rounded-lg text-[#8E8C85] hover:text-white hover:bg-[#1E1E28] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Bar */}
        <div className="flex border-b border-[#1E1E28] bg-[#0E0E14] px-6 text-xs font-mono uppercase tracking-wider shrink-0">
          <button
            onClick={() => setActiveTab('requests')}
            className={`py-3 transition-colors relative flex items-center gap-2 ${
              activeTab === 'requests'
                ? 'text-[#E5C158] font-bold border-b-2 border-[#E5C158]'
                : 'text-[#8E8C85] hover:text-white'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>My Requests ({userRequests.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('address')}
            className={`py-3 transition-colors relative flex items-center gap-2 ml-6 ${
              activeTab === 'address'
                ? 'text-[#E5C158] font-bold border-b-2 border-[#E5C158]'
                : 'text-[#8E8C85] hover:text-white'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Delivery Address</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-xs flex-1">
          {/* TAB 1: REQUESTS & ORDER TRACKING */}
          {activeTab === 'requests' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono uppercase tracking-wider text-[11px] text-[#8E8C85]">
                  Collector Requests & Delivery Tracking
                </span>

                <button
                  onClick={() => {
                    setIsAccountOpen(false);
                    openRequestModal();
                  }}
                  className="text-[#E5C158] hover:underline font-mono text-[11px] flex items-center gap-1"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Submit New Request</span>
                </button>
              </div>

              {requestsLoading ? (
                <div className="py-8 text-center text-[#8E8C85] flex items-center justify-center gap-2 font-mono">
                  <Loader2 className="w-4 h-4 animate-spin text-[#E5C158]" />
                  <span>Loading requests from Firestore...</span>
                </div>
              ) : userRequests.length === 0 ? (
                <div className="py-8 text-center text-[#8E8C85] space-y-2 bg-[#121218] border border-[#20202C] rounded-xl p-4">
                  <Package className="w-8 h-8 mx-auto text-[#66645E]" />
                  <div className="font-semibold text-white">No requests submitted yet</div>
                  <p className="text-xs max-w-xs mx-auto text-[#A8A59E]">
                    You haven’t requested any subscription boxes or fine art prints yet. No upfront payment is required to submit a request.
                  </p>
                  <button
                    onClick={() => {
                      setIsAccountOpen(false);
                      openRequestModal();
                    }}
                    className="inline-block mt-2 px-4 py-2 rounded bg-gradient-to-r from-[#F4E3B2] to-[#C5A059] text-black text-xs font-bold uppercase tracking-wider"
                  >
                    Submit Collector Request
                  </button>
                </div>
              ) : (
                <div className="space-y-3.5">
                  {userRequests.map((req) => (
                    <div
                      key={req.id}
                      className="p-4 rounded-xl bg-[#121218] border border-[#222230] text-xs space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1E1E28] pb-2 font-mono">
                        <span className="text-[#E5C158] font-bold">Ref #{req.id}</span>
                        <span
                          className={`text-[10px] uppercase px-2.5 py-0.5 rounded font-bold ${
                            req.status === 'pending'
                              ? 'bg-[#F59E0B]/20 text-[#FBBF24] border border-[#F59E0B]/40'
                              : req.status === 'accepted'
                              ? 'bg-[#10B981]/20 text-[#34D399] border border-[#10B981]/40'
                              : req.status === 'declined'
                              ? 'bg-[#EF4444]/20 text-[#F87171] border border-[#EF4444]/40'
                              : 'bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/40'
                          }`}
                        >
                          {req.status === 'pending' && 'Pending review'}
                          {req.status === 'accepted' && 'Accepted — awaiting payment arrangement'}
                          {req.status === 'declined' && 'Declined'}
                          {req.status === 'completed' && 'Completed'}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-white font-medium">
                        <span className="font-serif-display text-sm">
                          {req.planName || req.productName || req.requestType.replace('_', ' ')}
                        </span>
                        <span className="text-[#8E8C85] font-mono text-[11px]">
                          Qty: {req.quantity}
                        </span>
                      </div>

                      <div className="text-[11px] text-[#A6A49F]">
                        Destination: {req.shippingAddress?.city}, {req.shippingAddress?.state} ({req.shippingAddress?.pincode})
                      </div>

                      {/* Admin Response Note */}
                      {req.adminResponse && (
                        <div className="p-2.5 rounded bg-[#181824] border border-[#2A2A3A] text-[11px] text-[#E6E4DF]">
                          <span className="text-[#E5C158] font-semibold font-mono block">Curation Note:</span>
                          <span className="italic">"{req.adminResponse}"</span>
                        </div>
                      )}

                      {/* LIVE ORDER TRACKING SECTION */}
                      {req.trackingNumber ? (
                        <div className="p-3 rounded-lg bg-[#0F1722] border border-[#38BDF8]/30 space-y-2">
                          <div className="flex items-center justify-between text-[11px] font-mono text-[#38BDF8]">
                            <span className="flex items-center gap-1.5 font-bold">
                              <Truck className="w-3.5 h-3.5" />
                              <span>{req.trackingCarrier || 'Air Express'}</span>
                            </span>
                            <span className="text-white">{req.trackingNumber}</span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] text-[#8E8C85] font-mono">
                            <span>Status: <strong className="text-[#38BDF8]">{req.trackingStatus || 'Dispatched'}</strong></span>
                            {req.dispatchDate && <span>Date: {req.dispatchDate}</span>}
                          </div>
                        </div>
                      ) : req.status === 'accepted' ? (
                        <div className="p-2.5 rounded bg-[#161620] border border-[#262634] text-[10px] text-[#8E8C85] flex items-center gap-1.5 font-mono">
                          <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                          <span>Dispatch tracking code will appear here once sealed in wax envelope.</span>
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: DELIVERY ADDRESS */}
          {activeTab === 'address' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono uppercase tracking-wider text-[11px] text-[#8E8C85]">
                  Indian Delivery Address (Firestore Profile)
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
                <div className="p-2.5 rounded bg-[#064E3B]/80 text-[#34D399] font-mono text-[11px] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Address saved successfully to your Firestore profile.</span>
                </div>
              )}

              {addressError && (
                <div className="p-2.5 rounded bg-[#3F1118]/80 text-[#FCA5A5] font-mono text-[11px] flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>{addressError}</span>
                </div>
              )}

              {!isEditingAddress ? (
                userProfile?.shippingAddress?.streetAddress ? (
                  <div className="p-4 rounded-xl bg-[#121218] border border-[#222230] space-y-2">
                    <div className="text-white font-semibold text-sm">
                      {userProfile.shippingAddress.fullName}
                    </div>
                    <div className="text-[#B5B3AD] leading-relaxed">
                      {userProfile.shippingAddress.streetAddress}
                      {userProfile.shippingAddress.landmark && `, ${userProfile.shippingAddress.landmark}`}
                      {userProfile.shippingAddress.area && `, ${userProfile.shippingAddress.area}`}
                      <br />
                      {userProfile.shippingAddress.city}, {userProfile.shippingAddress.state} – {userProfile.shippingAddress.pincode}
                      <br />
                      {userProfile.shippingAddress.country || 'India'}
                    </div>
                    {userProfile.shippingAddress.phone && (
                      <div className="text-[#8E8C85] flex items-center gap-2 pt-1 font-mono text-[11px]">
                        <Phone className="w-3 h-3 text-[#C5A059]" />
                        <span>{userProfile.shippingAddress.phone}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-[#121218] border border-[#20202C] text-[#8E8C85] text-xs">
                    No default postal address saved yet. Save an address to automatically prefill your print requests.
                  </div>
                )
              ) : (
                <form onSubmit={handleSaveAddress} className="space-y-3 p-4 rounded-xl bg-[#121218] border border-[#222230]">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-mono uppercase text-[#8E8C85] block mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={addressInput.fullName}
                        onChange={(e) => setAddressInput({ ...addressInput, fullName: e.target.value })}
                        className="w-full text-xs px-3 py-2 bg-[#0E0E14] border border-[#2A2A38] rounded text-white focus:outline-none focus:border-[#E5C158]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono uppercase text-[#8E8C85] block mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={addressInput.phone}
                        onChange={(e) => setAddressInput({ ...addressInput, phone: e.target.value })}
                        className="w-full text-xs px-3 py-2 bg-[#0E0E14] border border-[#2A2A38] rounded text-white focus:outline-none focus:border-[#E5C158]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase text-[#8E8C85] block mb-1">House / Flat No. & Street</label>
                    <input
                      type="text"
                      required
                      value={addressInput.streetAddress}
                      onChange={(e) => setAddressInput({ ...addressInput, streetAddress: e.target.value })}
                      className="w-full text-xs px-3 py-2 bg-[#0E0E14] border border-[#2A2A38] rounded text-white focus:outline-none focus:border-[#E5C158]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-mono uppercase text-[#8E8C85] block mb-1">Landmark (Optional)</label>
                      <input
                        type="text"
                        value={addressInput.landmark || ''}
                        onChange={(e) => setAddressInput({ ...addressInput, landmark: e.target.value })}
                        className="w-full text-xs px-3 py-2 bg-[#0E0E14] border border-[#2A2A38] rounded text-white focus:outline-none focus:border-[#E5C158]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono uppercase text-[#8E8C85] block mb-1">Area / Locality</label>
                      <input
                        type="text"
                        value={addressInput.area || ''}
                        onChange={(e) => setAddressInput({ ...addressInput, area: e.target.value })}
                        className="w-full text-xs px-3 py-2 bg-[#0E0E14] border border-[#2A2A38] rounded text-white focus:outline-none focus:border-[#E5C158]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-[10px] font-mono uppercase text-[#8E8C85] block mb-1">City</label>
                      <input
                        type="text"
                        required
                        value={addressInput.city}
                        onChange={(e) => setAddressInput({ ...addressInput, city: e.target.value })}
                        className="w-full text-xs px-3 py-2 bg-[#0E0E14] border border-[#2A2A38] rounded text-white focus:outline-none focus:border-[#E5C158]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono uppercase text-[#8E8C85] block mb-1">State</label>
                      <input
                        type="text"
                        required
                        value={addressInput.state}
                        onChange={(e) => setAddressInput({ ...addressInput, state: e.target.value })}
                        className="w-full text-xs px-3 py-2 bg-[#0E0E14] border border-[#2A2A38] rounded text-white focus:outline-none focus:border-[#E5C158]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono uppercase text-[#8E8C85] block mb-1">PIN Code</label>
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

                  <button
                    type="submit"
                    disabled={isSavingAddress}
                    className="px-5 py-2.5 rounded bg-gradient-to-r from-[#F4E3B2] via-[#E5C158] to-[#C5A059] text-black font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5 cursor-pointer shadow-md disabled:opacity-50"
                  >
                    {isSavingAddress ? <Loader2 className="w-3.5 h-3.5 animate-spin text-black" /> : <Save className="w-3.5 h-3.5 text-black" />}
                    <span>Save Address</span>
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#121218] border-t border-[#22222E] flex items-center justify-between shrink-0">
          <button
            onClick={async () => {
              setIsAccountOpen(false);
              await logOut();
            }}
            className="px-3 py-1.5 rounded text-xs text-[#EF4444] hover:bg-[#201014] transition-colors flex items-center gap-1.5 font-mono cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>

          <button
            onClick={() => setIsAccountOpen(false)}
            className="px-5 py-2 rounded bg-[#1C1C26] hover:bg-[#252534] border border-[#3A3A4C] text-xs font-semibold uppercase tracking-wider text-white transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
export default AccountModal;
