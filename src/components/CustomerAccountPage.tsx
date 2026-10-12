import React, { useState, useEffect } from 'react';
import { useAuth, UserShippingAddress } from '../context/AuthContext';
import { useAutomotiveMail, CustomerRequest } from '../context/AutomotiveMailContext';
import { AutomotiveMailLogo } from './AutomotiveMailLogo';
import {
  User,
  MapPin,
  Package,
  Phone,
  Mail,
  Save,
  Loader2,
  CheckCircle2,
  Clock,
  Truck,
  AlertCircle,
  ArrowLeft,
  LogOut,
  ExternalLink,
  ShieldCheck,
  PlusCircle,
  HelpCircle,
} from 'lucide-react';

interface CustomerAccountPageProps {
  onBackToHome?: () => void;
}

export const CustomerAccountPage: React.FC<CustomerAccountPageProps> = ({ onBackToHome }) => {
  const { user, userProfile, openAuthModal, logOut, saveShippingAddress, loading: authLoading } = useAuth();
  const { userRequests, requestsLoading, openRequestModal } = useAutomotiveMail();

  const [activeTab, setActiveTab] = useState<'requests' | 'address'>('requests');

  // Address form
  const [addressForm, setAddressForm] = useState<UserShippingAddress>({
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
  const [addressMsg, setAddressMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Sync address from profile
  useEffect(() => {
    if (userProfile?.shippingAddress) {
      setAddressForm({
        ...userProfile.shippingAddress,
        country: userProfile.shippingAddress.country || 'India',
      });
    } else if (user) {
      setAddressForm((prev) => ({
        ...prev,
        fullName: prev.fullName || userProfile?.displayName || user.displayName || '',
      }));
    }
  }, [userProfile, user]);

  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingAddress(true);
    setAddressMsg(null);

    try {
      await saveShippingAddress(addressForm);
      setAddressMsg({ type: 'success', text: 'Shipping address successfully saved to your Firestore profile.' });
      setTimeout(() => setAddressMsg(null), 4000);
    } catch (err: any) {
      console.error('Save address error:', err);
      setAddressMsg({ type: 'error', text: err.message || 'Failed to save address to Firestore.' });
    } finally {
      setIsSavingAddress(false);
    }
  };

  // Unauthenticated Protected View
  if (!user && !authLoading) {
    return (
      <div className="min-h-screen bg-[#08080A] text-[#E6E4DF] flex flex-col justify-between p-4 sm:p-6">
        <header className="border-b border-[#1A1A22] pb-4 flex items-center justify-between">
          <AutomotiveMailLogo />
          <button
            onClick={() => {
              if (onBackToHome) onBackToHome();
              else window.location.hash = '';
            }}
            className="text-xs font-mono text-[#8E8C85] hover:text-[#E5C158] flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Site</span>
          </button>
        </header>

        <main className="flex-1 flex items-center justify-center py-12">
          <div className="w-full max-w-md bg-[#0F0F14] border border-[#2B2B38] rounded-2xl p-6 sm:p-8 text-center space-y-5 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-[#181824] border border-[#C5A059]/40 flex items-center justify-center mx-auto text-[#E5C158]">
              <User className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#E5C158] bg-[#1F1C12] px-2.5 py-1 rounded border border-[#E5C158]/30">
                Collector Portal
              </span>
              <h2 className="font-serif-display font-bold text-2xl text-white mt-3">
                Sign In Required
              </h2>
              <p className="text-xs text-[#8E8C85] mt-2 max-w-xs mx-auto leading-relaxed">
                Sign in with your Firebase account to view your customer requests, track physical order dispatches, and manage your delivery address.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => openAuthModal('login')}
                className="w-full py-3 rounded-lg text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#F4E3B2] via-[#E5C158] to-[#C5A059] text-black shadow-md cursor-pointer"
              >
                Sign In to Account
              </button>

              <button
                onClick={() => openAuthModal('register')}
                className="w-full py-2.5 text-xs text-[#8E8C85] hover:text-[#E5C158] font-mono"
              >
                Create New Collector Account
              </button>
            </div>
          </div>
        </main>

        <footer className="border-t border-[#14141A] py-4 text-center text-xs font-mono text-[#66645E]">
          Automotive Mail · Fine Motoring & Aviation Ephemera
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08080A] text-[#E6E4DF] flex flex-col justify-between selection:bg-[#C5A059]/30">
      {/* Header */}
      <header className="border-b border-[#1E1E28] bg-[#0C0C10] px-4 sm:px-8 py-4 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AutomotiveMailLogo variant="compact" />
            <div className="hidden sm:block border-l border-[#262634] pl-3">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#C5A059] block">
                Collector Account
              </span>
              <h1 className="font-serif-display font-bold text-sm text-white">
                My Requests & Delivery Desk
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (onBackToHome) onBackToHome();
                else window.location.hash = '';
              }}
              className="px-3.5 py-1.5 rounded border border-[#2B2B3A] hover:border-[#E5C158] text-xs font-mono text-[#E6E4DF] hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Site</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-8 py-8 space-y-8">
        {/* Customer Identity Banner */}
        <div className="p-6 rounded-2xl bg-[#0F0F16] border border-[#222230] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#181822] border border-[#C5A059]/30 flex items-center justify-center text-[#E5C158] shrink-0 font-serif-display font-bold text-xl">
              {userProfile?.displayName ? userProfile.displayName.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif-display font-bold text-xl text-white">
                  {userProfile?.displayName || user?.displayName || user?.email?.split('@')[0]}
                </h2>
                <span className="text-[10px] font-mono uppercase bg-[#1A1A24] border border-[#2C2C3C] text-[#34D399] px-2 py-0.5 rounded">
                  Authenticated
                </span>
              </div>
              <div className="text-xs font-mono text-[#8E8C85] mt-0.5">{user?.email}</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => openRequestModal()}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#F4E3B2] via-[#E5C158] to-[#C5A059] text-black text-xs font-bold uppercase tracking-wider shadow-md hover:brightness-105 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-black" />
              <span>New Collector Request</span>
            </button>

            <button
              onClick={async () => {
                await logOut();
                if (onBackToHome) onBackToHome();
              }}
              className="p-2 rounded-lg bg-[#181822] hover:bg-[#221014] border border-[#2C2C3C] text-[#EF4444] transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#20202C] gap-6 text-xs font-mono uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('requests')}
            className={`pb-3 transition-colors relative flex items-center gap-2 ${
              activeTab === 'requests'
                ? 'text-[#E5C158] font-bold border-b-2 border-[#E5C158]'
                : 'text-[#8E8C85] hover:text-white'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>My Requests & Live Tracking ({userRequests.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('address')}
            className={`pb-3 transition-colors relative flex items-center gap-2 ${
              activeTab === 'address'
                ? 'text-[#E5C158] font-bold border-b-2 border-[#E5C158]'
                : 'text-[#8E8C85] hover:text-white'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Delivery Address & Profile</span>
          </button>
        </div>

        {/* TAB 1: MY REQUESTS & LIVE TRACKING */}
        {activeTab === 'requests' && (
          <div className="space-y-6">
            {requestsLoading ? (
              <div className="text-center py-12 flex items-center justify-center gap-2 font-mono text-xs text-[#8E8C85]">
                <Loader2 className="w-4 h-4 animate-spin text-[#E5C158]" />
                <span>Syncing your collector requests from Firestore...</span>
              </div>
            ) : userRequests.length === 0 ? (
              <div className="text-center py-16 bg-[#0E0E14] border border-[#20202C] rounded-2xl space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#181824] border border-[#2B2B38] flex items-center justify-center mx-auto text-[#8E8C85]">
                  <Package className="w-7 h-7 text-[#C5A059]" />
                </div>
                <div>
                  <h3 className="font-serif-display font-bold text-lg text-white">No Requests Placed Yet</h3>
                  <p className="text-xs text-[#8E8C85] max-w-sm mx-auto mt-1 leading-relaxed">
                    Select a monthly subscription plan or individual archival print drop to submit your request without upfront payment.
                  </p>
                </div>
                <button
                  onClick={() => openRequestModal()}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#F4E3B2] to-[#C5A059] text-black text-xs font-bold uppercase tracking-wider shadow-md hover:brightness-105 transition-all cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4 text-black" />
                  <span>Submit Your First Request</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {userRequests.map((req) => (
                  <div
                    key={req.id}
                    className="p-5 sm:p-6 rounded-2xl bg-[#0F0F16] border border-[#222230] hover:border-[#333344] transition-all space-y-4"
                  >
                    {/* Header Row */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1E1E28] pb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs font-bold text-[#E5C158]">
                          Ref #{req.id}
                        </span>
                        <span className="text-[11px] font-mono text-[#8E8C85]">
                          Submitted {new Date(req.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                      </div>

                      {/* Status Badge */}
                      <span
                        className={`text-xs font-mono uppercase px-3 py-1 rounded-full font-bold flex items-center gap-1.5 ${
                          req.status === 'pending'
                            ? 'bg-[#F59E0B]/20 text-[#FBBF24] border border-[#F59E0B]/40'
                            : req.status === 'accepted'
                            ? 'bg-[#10B981]/20 text-[#34D399] border border-[#10B981]/40'
                            : req.status === 'declined'
                            ? 'bg-[#EF4444]/20 text-[#F87171] border border-[#EF4444]/40'
                            : 'bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/40'
                        }`}
                      >
                        {req.status === 'pending' && <Clock className="w-3.5 h-3.5" />}
                        {req.status === 'accepted' && <CheckCircle2 className="w-3.5 h-3.5" />}
                        {req.status === 'declined' && <AlertCircle className="w-3.5 h-3.5" />}
                        {req.status === 'completed' && <Package className="w-3.5 h-3.5" />}

                        <span>
                          {req.status === 'pending' && 'Pending review'}
                          {req.status === 'accepted' && 'Accepted — awaiting payment arrangement'}
                          {req.status === 'declined' && 'Declined'}
                          {req.status === 'completed' && 'Completed'}
                        </span>
                      </span>
                    </div>

                    {/* Request Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div>
                        <div className="text-[10px] font-mono uppercase text-[#8E8C85]">Selected Item</div>
                        <div className="font-serif-display text-base font-bold text-white mt-0.5">
                          {req.planName || req.productName || req.requestType.replace('_', ' ')}
                        </div>
                        <div className="text-[11px] font-mono text-[#C5A059] capitalize mt-0.5">
                          {req.category} Realm · Qty: {req.quantity}
                        </div>
                      </div>

                      <div>
                        <div className="text-[10px] font-mono uppercase text-[#8E8C85]">Delivery Destination</div>
                        <div className="text-[#D8D6CE] mt-0.5">
                          {req.shippingAddress?.city}, {req.shippingAddress?.state}
                        </div>
                        <div className="text-[11px] font-mono text-[#8E8C85]">
                          PIN: {req.shippingAddress?.pincode}
                        </div>
                      </div>

                      <div>
                        <div className="text-[10px] font-mono uppercase text-[#8E8C85]">Billing Status</div>
                        <div className="text-[#34D399] font-mono text-xs mt-0.5">
                          No payment taken
                        </div>
                        <div className="text-[10px] text-[#8E8C85]">
                          Payment coordinated upon curation
                        </div>
                      </div>
                    </div>

                    {/* Explanatory Notice for Accepted Status */}
                    {req.status === 'accepted' && (
                      <div className="p-3.5 rounded-xl bg-[#064E3B]/20 border border-[#059669]/40 text-xs text-[#A7F3D0] leading-relaxed">
                        <strong>Curation Acceptance:</strong> Your request has been accepted by our curation team! An Automotive Mail representative will contact you via email or phone to arrange delivery details and payment. Acceptance does not charge your card.
                      </div>
                    )}

                    {/* Admin Response Note */}
                    {req.adminResponse && (
                      <div className="p-3.5 rounded-xl bg-[#14141C] border border-[#2B2B38] text-xs">
                        <div className="text-[10px] font-mono uppercase text-[#E5C158] font-bold mb-1">
                          Message from Curation Team:
                        </div>
                        <p className="text-[#E6E4DF] italic">"{req.adminResponse}"</p>
                      </div>
                    )}

                    {/* LIVE ORDER TRACKING PORTAL CARD */}
                    {req.trackingNumber ? (
                      <div className="p-4 rounded-xl bg-[#121822] border border-[#38BDF8]/40 space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1C2634] pb-2">
                          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#38BDF8]">
                            <Truck className="w-4 h-4" />
                            <span>Physical Consignment Tracking</span>
                          </div>
                          <span className="text-[10px] font-mono uppercase bg-[#1A2638] text-[#38BDF8] px-2.5 py-0.5 rounded border border-[#38BDF8]/30">
                            {req.trackingCarrier || 'Air Express'}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                          <div>
                            <span className="text-[10px] uppercase text-[#8E8C85] block">AWB Tracking Number</span>
                            <span className="text-white font-bold text-sm">{req.trackingNumber}</span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase text-[#8E8C85] block">Current Status</span>
                            <span className="text-[#38BDF8]">{req.trackingStatus || 'In Transit'}</span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase text-[#8E8C85] block">Dispatch Date</span>
                            <span className="text-white">{req.dispatchDate || 'Dispatched'}</span>
                          </div>
                        </div>

                        {req.estimatedDelivery && (
                          <div className="text-[11px] text-[#A6A49F] pt-1">
                            Estimated Delivery: <strong className="text-white">{req.estimatedDelivery}</strong>
                          </div>
                        )}
                      </div>
                    ) : req.status === 'accepted' ? (
                      <div className="p-3 rounded-lg bg-[#14141C] border border-[#242432] text-xs text-[#8E8C85] flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#C5A059]" />
                        <span>Artwork is being prepared in our workshop. Courier tracking code will be posted here once wax-sealed.</span>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: DELIVERY ADDRESS & PROFILE */}
        {activeTab === 'address' && (
          <div className="p-6 rounded-2xl bg-[#0F0F16] border border-[#222230] space-y-6">
            <div>
              <h3 className="font-serif-display font-bold text-lg text-white">Default Indian Postal Delivery Address</h3>
              <p className="text-xs text-[#8E8C85] mt-1">
                Save your verified shipping address to automatically prefill all future physical print requests.
              </p>
            </div>

            {addressMsg && (
              <div
                className={`p-3 rounded-lg text-xs flex items-start gap-2 animate-in fade-in ${
                  addressMsg.type === 'success'
                    ? 'bg-[#064E3B]/80 border border-[#059669]/70 text-[#A7F3D0]'
                    : 'bg-[#3F1118]/80 border border-[#991B1B]/70 text-[#FCA5A5]'
                }`}
              >
                {addressMsg.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-[#EF4444] shrink-0 mt-0.5" />
                )}
                <span>{addressMsg.text}</span>
              </div>
            )}

            <form onSubmit={handleSaveAddress} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-[#8E8C85] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Full Name"
                    value={addressForm.fullName}
                    onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#14141C] border border-[#282836] rounded-lg text-white focus:outline-none focus:border-[#E5C158]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-[#8E8C85] mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98200 12345"
                    value={addressForm.phone}
                    onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#14141C] border border-[#282836] rounded-lg text-white focus:outline-none focus:border-[#E5C158]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-[#8E8C85] mb-1">
                  Email Address (From Authenticated Account)
                </label>
                <input
                  type="email"
                  disabled
                  value={user?.email || ''}
                  className="w-full px-3 py-2 bg-[#0E0E14] border border-[#20202A] rounded-lg text-[#8E8C85]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-[#8E8C85] mb-1">
                  House/Flat Number & Street *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 14A, Windmere Court, 5th Main Road"
                  value={addressForm.streetAddress}
                  onChange={(e) => setAddressForm({ ...addressForm, streetAddress: e.target.value })}
                  className="w-full px-3 py-2 bg-[#14141C] border border-[#282836] rounded-lg text-white focus:outline-none focus:border-[#E5C158]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-[#8E8C85] mb-1">
                    Apartment / Building / Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Near St. Mary’s Church"
                    value={addressForm.landmark || ''}
                    onChange={(e) => setAddressForm({ ...addressForm, landmark: e.target.value })}
                    className="w-full px-3 py-2 bg-[#14141C] border border-[#282836] rounded-lg text-white focus:outline-none focus:border-[#E5C158]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-[#8E8C85] mb-1">
                    Area / Locality
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Koramangala 4th Block"
                    value={addressForm.area || ''}
                    onChange={(e) => setAddressForm({ ...addressForm, area: e.target.value })}
                    className="w-full px-3 py-2 bg-[#14141C] border border-[#282836] rounded-lg text-white focus:outline-none focus:border-[#E5C158]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-[#8E8C85] mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Bengaluru"
                    value={addressForm.city}
                    onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                    className="w-full px-3 py-2 bg-[#14141C] border border-[#282836] rounded-lg text-white focus:outline-none focus:border-[#E5C158]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-[#8E8C85] mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Karnataka"
                    value={addressForm.state}
                    onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                    className="w-full px-3 py-2 bg-[#14141C] border border-[#282836] rounded-lg text-white focus:outline-none focus:border-[#E5C158]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-[#8E8C85] mb-1">
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    required
                    pattern="[0-9]{6}"
                    maxLength={6}
                    placeholder="560034"
                    value={addressForm.pincode}
                    onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })}
                    className="w-full px-3 py-2 bg-[#14141C] border border-[#282836] rounded-lg text-white focus:outline-none focus:border-[#E5C158]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-[#8E8C85] mb-1">
                  Country
                </label>
                <input
                  type="text"
                  disabled
                  value="India"
                  className="w-full px-3 py-2 bg-[#0E0E14] border border-[#20202A] rounded-lg text-[#8E8C85]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSavingAddress}
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#F4E3B2] via-[#E5C158] to-[#C5A059] text-black text-xs font-bold uppercase tracking-wider shadow-md hover:brightness-105 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSavingAddress ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-black" />
                      <span>Saving Address to Firestore...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 text-black" />
                      <span>Save Address to Firestore</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#14141A] py-6 text-center text-xs font-mono text-[#66645E]">
        © {new Date().getFullYear()} Automotive Mail · Fine Motoring & Aviation Ephemera Dispatches across India.
      </footer>
    </div>
  );
};
export default CustomerAccountPage;
