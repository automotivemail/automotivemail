import React, { useState, useEffect } from 'react';
import { useAutomotiveMail, CustomerRequest, RequestType, RequestCategory } from '../context/AutomotiveMailContext';
import { useAuth, UserShippingAddress } from '../context/AuthContext';
import { AutomotiveMailLogo } from './AutomotiveMailLogo';
import { SUBSCRIPTION_PLANS, DROPS_CATALOG } from '../data/automotiveMailData';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Send,
  Lock,
  Loader2,
  AlertCircle,
  FileText,
  Package,
  Sparkles,
  ArrowRight,
  Compass,
} from 'lucide-react';

export const CustomerRequestModal: React.FC = () => {
  const {
    isRequestModalOpen,
    closeRequestModal,
    activeRequestPrefill,
    submitCustomerRequest,
    setIsAccountOpen,
  } = useAutomotiveMail();

  const { user, userProfile, openAuthModal, signInGoogle } = useAuth();

  // Form State
  const [requestType, setRequestType] = useState<RequestType>('subscription');
  const [category, setCategory] = useState<RequestCategory>('both');
  const [selectedPlanId, setSelectedPlanId] = useState<string>('both');
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [requirements, setRequirements] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  // Shipping Address Form State
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submittedRequest, setSubmittedRequest] = useState<CustomerRequest | null>(null);

  // Sync Prefill when modal opens
  useEffect(() => {
    if (activeRequestPrefill) {
      if (activeRequestPrefill.requestType) setRequestType(activeRequestPrefill.requestType);
      if (activeRequestPrefill.category) setCategory(activeRequestPrefill.category);
      if (activeRequestPrefill.planId) setSelectedPlanId(activeRequestPrefill.planId);
      if (activeRequestPrefill.productId) setSelectedProductId(activeRequestPrefill.productId);
      if (activeRequestPrefill.quantity) setQuantity(activeRequestPrefill.quantity);
      if (activeRequestPrefill.requirements) setRequirements(activeRequestPrefill.requirements);
      if (activeRequestPrefill.notes) setNotes(activeRequestPrefill.notes);
    }
  }, [activeRequestPrefill]);

  // Sync Address from User Profile
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

  if (!isRequestModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!user) {
      openAuthModal('login');
      return;
    }

    if (
      !addressForm.fullName.trim() ||
      !addressForm.phone.trim() ||
      !addressForm.streetAddress.trim() ||
      !addressForm.city.trim() ||
      !addressForm.state.trim() ||
      !addressForm.pincode.trim()
    ) {
      setErrorMsg('Please complete all required delivery address fields (Name, Phone, Street, City, State, PIN).');
      return;
    }

    setIsSubmitting(true);

    try {
      let planName: string | undefined;
      let productName: string | undefined;

      if (requestType === 'subscription') {
        const found = SUBSCRIPTION_PLANS.find((p) => p.id === selectedPlanId) || SUBSCRIPTION_PLANS[1];
        planName = `${found.name} Tier (₹${found.price}/mo)`;
      } else if (requestType === 'individual_print') {
        const foundDrop = DROPS_CATALOG.find((d) => d.id === selectedProductId) || DROPS_CATALOG[0];
        productName = `${foundDrop.title} (${foundDrop.specs})`;
      }

      const created = await submitCustomerRequest({
        customerName: addressForm.fullName.trim(),
        customerEmail: user.email || '',
        phone: addressForm.phone.trim(),
        shippingAddress: addressForm,
        requestType,
        category,
        planId: requestType === 'subscription' ? selectedPlanId : undefined,
        planName,
        productId: requestType === 'individual_print' ? selectedProductId : undefined,
        productName,
        quantity,
        requirements: requirements.trim(),
        notes: notes.trim(),
      });

      setSubmittedRequest(created);
    } catch (err: any) {
      console.error('Request submission error:', err);
      setErrorMsg(err.message || 'Failed to submit request to database. Please check your network and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSubmittedRequest(null);
    setErrorMsg(null);
    closeRequestModal();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0D0D12] border border-[#262634] text-[#E6E4DF] rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#1E1E28] flex items-center justify-between bg-[#111117] shrink-0">
          <div className="flex items-center gap-3">
            <AutomotiveMailLogo variant="stamp-only" />
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#C5A059] block">
                Automotive Mail · Collector Dispatch
              </span>
              <h3 className="font-serif-display font-bold text-base sm:text-lg text-white">
                {submittedRequest ? 'Request Receipt' : 'Submit Collector Request'}
              </h3>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-[#8E8C85] hover:text-white hover:bg-[#1E1E28] transition-colors cursor-pointer"
            aria-label="Close request dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {errorMsg && (
            <div className="p-3 rounded-lg bg-[#3F1118]/80 border border-[#991B1B]/70 flex items-start gap-2.5 text-xs text-[#FCA5A5] animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#EF4444]" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* STEP 1: SUCCESS CONFIRMATION VIEW */}
          {submittedRequest ? (
            <div className="text-center py-6 sm:py-8 space-y-6 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-[#064E3B]/30 border border-[#059669] flex items-center justify-center mx-auto text-[#34D399]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#E5C158] bg-[#1C180E] border border-[#C5A059]/40 px-3 py-1 rounded">
                  Reference: #{submittedRequest.id}
                </span>
                <h3 className="font-serif-display font-bold text-2xl text-white mt-3">
                  Request Received
                </h3>
                <p className="text-xs sm:text-sm text-[#D8D6CE] max-w-md mx-auto leading-relaxed pt-2">
                  “Your request has been received! The Automotive Mail team will review it and contact you about the next steps. No payment has been taken.”
                </p>
              </div>

              {/* Stored Request Summary Card */}
              <div className="p-4 sm:p-5 rounded-xl bg-[#121218] border border-[#242432] text-left text-xs space-y-2.5 font-mono max-w-lg mx-auto">
                <div className="flex justify-between border-b border-[#1E1E28] pb-2">
                  <span className="text-[#8E8C85]">Request Reference ID:</span>
                  <span className="text-white font-bold">{submittedRequest.id}</span>
                </div>
                <div className="flex justify-between border-b border-[#1E1E28] pb-2">
                  <span className="text-[#8E8C85]">Customer Name:</span>
                  <span className="text-white">{submittedRequest.customerName}</span>
                </div>
                <div className="flex justify-between border-b border-[#1E1E28] pb-2">
                  <span className="text-[#8E8C85]">Request Type:</span>
                  <span className="text-[#E5C158] capitalize">
                    {submittedRequest.requestType.replace('_', ' ')}
                  </span>
                </div>
                {submittedRequest.planName && (
                  <div className="flex justify-between border-b border-[#1E1E28] pb-2">
                    <span className="text-[#8E8C85]">Selected Tier:</span>
                    <span className="text-white">{submittedRequest.planName}</span>
                  </div>
                )}
                {submittedRequest.productName && (
                  <div className="flex justify-between border-b border-[#1E1E28] pb-2">
                    <span className="text-[#8E8C85]">Print Subject:</span>
                    <span className="text-white">{submittedRequest.productName}</span>
                  </div>
                )}
                <div className="flex justify-between border-b border-[#1E1E28] pb-2">
                  <span className="text-[#8E8C85]">Quantity:</span>
                  <span className="text-white">{submittedRequest.quantity}</span>
                </div>
                <div className="flex justify-between border-b border-[#1E1E28] pb-2">
                  <span className="text-[#8E8C85]">Status:</span>
                  <span className="text-[#FBBF24] font-bold uppercase">Pending review</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8E8C85]">Delivery City:</span>
                  <span className="text-white">
                    {submittedRequest.shippingAddress.city}, PIN {submittedRequest.shippingAddress.pincode}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    handleClose();
                    setIsAccountOpen(true);
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#F4E3B2] via-[#E5C158] to-[#C5A059] text-black shadow-lg hover:brightness-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Package className="w-4 h-4 text-black" />
                  <span>View My Requests & Order Tracking</span>
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full sm:w-auto px-6 py-3 rounded-lg text-xs font-mono uppercase tracking-wider bg-[#181822] hover:bg-[#222230] border border-[#2C2C3C] text-[#E6E4DF] transition-colors cursor-pointer"
                >
                  Return to Print Gallery
                </button>
              </div>
            </div>
          ) : !user ? (
            /* STEP 2: AUTH REQUIRED GATE */
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#181824] border border-[#C5A059]/40 flex items-center justify-center mx-auto text-[#E5C158]">
                <Lock className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif-display font-bold text-xl sm:text-2xl text-white">
                  Collector Sign In Required
                </h3>
                <p className="text-xs sm:text-sm text-[#8E8C85] max-w-sm mx-auto">
                  Please authenticate with Firebase to submit your collector request. Your request and delivery address will be preserved safely.
                </p>
              </div>

              <div className="max-w-xs mx-auto space-y-3 pt-2">
                <button
                  type="button"
                  onClick={() => signInGoogle()}
                  className="w-full py-3 px-4 rounded-xl bg-[#14141C] hover:bg-[#1C1C26] border border-[#2D2D3E] hover:border-[#C5A059]/40 text-xs font-semibold text-white transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-md"
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
                  <span>1-Click Sign In with Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => openAuthModal('login')}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#F4E3B2] via-[#E5C158] to-[#C5A059] text-black text-xs font-bold uppercase tracking-wider hover:brightness-105 transition-all cursor-pointer shadow-md"
                >
                  Sign In with Email
                </button>

                <button
                  type="button"
                  onClick={() => openAuthModal('register')}
                  className="w-full py-2.5 text-xs text-[#8E8C85] hover:text-[#E5C158] font-mono transition-colors"
                >
                  Create New Collector Account
                </button>
              </div>
            </div>
          ) : (
            /* STEP 3: MAIN COLLECTOR REQUEST FORM */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Authenticated user indicator banner */}
              <div className="p-3 rounded-xl bg-[#14141C] border border-[#242434] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-[#8E8C85]">
                  <ShieldCheck className="w-4 h-4 text-[#34D399]" />
                  <span>Authenticated Collector:</span>
                  <span className="text-white font-medium">{user.email}</span>
                </div>
                <span className="text-[10px] font-mono text-[#34D399] uppercase bg-[#064E3B]/30 border border-[#059669]/40 px-2 py-0.5 rounded">
                  No Payment Required
                </span>
              </div>

              {/* Section 1: Request Specifications */}
              <div className="space-y-4 p-4 rounded-xl bg-[#121218] border border-[#222230]">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#C5A059] border-b border-[#1E1E28] pb-2">
                  <Compass className="w-3.5 h-3.5" />
                  <span>1. Curation & Subject Selection</span>
                </div>

                {/* Request Type Selector */}
                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#8E8C85] mb-1.5">
                    Request Type
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setRequestType('subscription')}
                      className={`p-3 rounded-lg border text-left text-xs transition-all ${
                        requestType === 'subscription'
                          ? 'border-[#E5C158] bg-[#1E1A10] text-white font-semibold'
                          : 'border-[#262634] bg-[#0E0E14] text-[#8E8C85] hover:text-white'
                      }`}
                    >
                      <div className="font-serif-display text-sm text-[#F4F1EA]">Monthly Subscription</div>
                      <div className="text-[10px] text-[#A69E89] mt-0.5">Recurring physical art drop</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRequestType('individual_print')}
                      className={`p-3 rounded-lg border text-left text-xs transition-all ${
                        requestType === 'individual_print'
                          ? 'border-[#E5C158] bg-[#1E1A10] text-white font-semibold'
                          : 'border-[#262634] bg-[#0E0E14] text-[#8E8C85] hover:text-white'
                      }`}
                    >
                      <div className="font-serif-display text-sm text-[#F4F1EA]">Individual Print</div>
                      <div className="text-[10px] text-[#A69E89] mt-0.5">Single archival subject</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRequestType('custom_enquiry')}
                      className={`p-3 rounded-lg border text-left text-xs transition-all ${
                        requestType === 'custom_enquiry'
                          ? 'border-[#E5C158] bg-[#1E1A10] text-white font-semibold'
                          : 'border-[#262634] bg-[#0E0E14] text-[#8E8C85] hover:text-white'
                      }`}
                    >
                      <div className="font-serif-display text-sm text-[#F4F1EA]">Custom Enquiry</div>
                      <div className="text-[10px] text-[#A69E89] mt-0.5">Bespoke livery or framing</div>
                    </button>
                  </div>
                </div>

                {/* Category Selection */}
                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#8E8C85] mb-1.5">
                    Category Realm
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setCategory('automotive')}
                      className={`py-2 px-3 rounded border text-xs font-medium text-center transition-all ${
                        category === 'automotive'
                          ? 'border-[#E5C158] bg-[#1C180E] text-[#E5C158]'
                          : 'border-[#262634] bg-[#0E0E14] text-[#8E8C85] hover:text-white'
                      }`}
                    >
                      Automotive
                    </button>
                    <button
                      type="button"
                      onClick={() => setCategory('aviation')}
                      className={`py-2 px-3 rounded border text-xs font-medium text-center transition-all ${
                        category === 'aviation'
                          ? 'border-[#E5C158] bg-[#1C180E] text-[#E5C158]'
                          : 'border-[#262634] bg-[#0E0E14] text-[#8E8C85] hover:text-white'
                      }`}
                    >
                      Aviation
                    </button>
                    <button
                      type="button"
                      onClick={() => setCategory('both')}
                      className={`py-2 px-3 rounded border text-xs font-medium text-center transition-all ${
                        category === 'both'
                          ? 'border-[#E5C158] bg-[#1C180E] text-[#E5C158]'
                          : 'border-[#262634] bg-[#0E0E14] text-[#8E8C85] hover:text-white'
                      }`}
                    >
                      Both Worlds
                    </button>
                  </div>
                </div>

                {/* Subscription Tier or Print Selection */}
                {requestType === 'subscription' && (
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#8E8C85] mb-1.5">
                      Select Subscription Tier
                    </label>
                    <select
                      value={selectedPlanId}
                      onChange={(e) => setSelectedPlanId(e.target.value)}
                      className="w-full text-xs px-3 py-2.5 bg-[#0E0E14] border border-[#282838] rounded-lg text-white focus:outline-none focus:border-[#E5C158]"
                    >
                      {SUBSCRIPTION_PLANS.map((plan) => (
                        <option key={plan.id} value={plan.id}>
                          {plan.name} — ₹{plan.price}/month ({plan.tagline})
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {requestType === 'individual_print' && (
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#8E8C85] mb-1.5">
                      Select Archival Print Drop
                    </label>
                    <select
                      value={selectedProductId}
                      onChange={(e) => setSelectedProductId(e.target.value)}
                      className="w-full text-xs px-3 py-2.5 bg-[#0E0E14] border border-[#282838] rounded-lg text-white focus:outline-none focus:border-[#E5C158]"
                    >
                      <option value="">-- Choose from our current & upcoming drops --</option>
                      {DROPS_CATALOG.map((drop) => (
                        <option key={drop.id} value={drop.id}>
                          {drop.number}: {drop.title} ({drop.era})
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Quantity */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#8E8C85] mb-1.5">
                      Quantity
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full text-xs px-3 py-2 bg-[#0E0E14] border border-[#282838] rounded-lg text-white focus:outline-none focus:border-[#E5C158]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#8E8C85] mb-1.5">
                      Special Requirements / Gifting
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Gift wax seal, specific era"
                      value={requirements}
                      onChange={(e) => setRequirements(e.target.value)}
                      className="w-full text-xs px-3 py-2 bg-[#0E0E14] border border-[#282838] rounded-lg text-white focus:outline-none focus:border-[#E5C158]"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Indian Postal Delivery Address */}
              <div className="space-y-3.5 p-4 rounded-xl bg-[#121218] border border-[#222230]">
                <div className="flex items-center justify-between border-b border-[#1E1E28] pb-2">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#C5A059]">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>2. Delivery Address (India)</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#8E8C85]">
                    Saved to your profile
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                      className="w-full text-xs px-3 py-2.5 bg-[#0E0E14] border border-[#282838] rounded-lg text-white focus:outline-none focus:border-[#E5C158]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-[#8E8C85] mb-1">
                      Phone Number (Courier Tracking SMS) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98200 12345"
                      value={addressForm.phone}
                      onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                      className="w-full text-xs px-3 py-2.5 bg-[#0E0E14] border border-[#282838] rounded-lg text-white focus:outline-none focus:border-[#E5C158]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-[#8E8C85] mb-1">
                    House/Flat Number & Street *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Flat 402, Skyline Residency, 12th Cross Road"
                    value={addressForm.streetAddress}
                    onChange={(e) => setAddressForm({ ...addressForm, streetAddress: e.target.value })}
                    className="w-full text-xs px-3 py-2 bg-[#0E0E14] border border-[#282838] rounded-lg text-white focus:outline-none focus:border-[#E5C158]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-[#8E8C85] mb-1">
                      Apartment / Landmark (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Near Metro Station / Behind Taj Hotel"
                      value={addressForm.landmark || ''}
                      onChange={(e) => setAddressForm({ ...addressForm, landmark: e.target.value })}
                      className="w-full text-xs px-3 py-2 bg-[#0E0E14] border border-[#282838] rounded-lg text-white focus:outline-none focus:border-[#E5C158]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-[#8E8C85] mb-1">
                      Area / Locality
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Indiranagar / Bandra West"
                      value={addressForm.area || ''}
                      onChange={(e) => setAddressForm({ ...addressForm, area: e.target.value })}
                      className="w-full text-xs px-3 py-2 bg-[#0E0E14] border border-[#282838] rounded-lg text-white focus:outline-none focus:border-[#E5C158]"
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
                      placeholder="e.g. Bengaluru"
                      value={addressForm.city}
                      onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                      className="w-full text-xs px-3 py-2 bg-[#0E0E14] border border-[#282838] rounded-lg text-white focus:outline-none focus:border-[#E5C158]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-[#8E8C85] mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Karnataka"
                      value={addressForm.state}
                      onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                      className="w-full text-xs px-3 py-2 bg-[#0E0E14] border border-[#282838] rounded-lg text-white focus:outline-none focus:border-[#E5C158]"
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
                      placeholder="560038"
                      value={addressForm.pincode}
                      onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })}
                      className="w-full text-xs px-3 py-2 bg-[#0E0E14] border border-[#282838] rounded-lg text-white focus:outline-none focus:border-[#E5C158]"
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
                    className="w-full text-xs px-3 py-2 bg-[#0A0A0E] border border-[#20202A] rounded-lg text-[#8E8C85]"
                  />
                </div>
              </div>

              {/* Section 3: Optional Notes */}
              <div>
                <label className="block text-[11px] font-mono uppercase text-[#8E8C85] mb-1.5">
                  Optional Collector Notes / Instructions
                </label>
                <textarea
                  rows={2}
                  placeholder="Share any special instructions, inquiries about past archival drops, or delivery timing..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-[#0E0E14] border border-[#282838] rounded-lg text-white focus:outline-none focus:border-[#E5C158]"
                />
              </div>

              {/* Assurance Callout */}
              <div className="p-3.5 rounded-xl bg-[#14141C] border border-[#222230] text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-[#E5C158]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>No Upfront Payment Required</span>
                </div>
                <p className="text-[11px] text-[#A8A59E] leading-relaxed">
                  Your request is stored securely in our Firestore database. The Automotive Mail team will review available print allocations and reach out to confirm your dispatch schedule before finalizing any payment.
                </p>
              </div>

              {/* Responsive Action Button Bar - Guaranteed Visible with ample padding */}
              <div className="pt-2 pb-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-[0.16em] bg-gradient-to-r from-[#F4E3B2] via-[#E5C158] to-[#C5A059] text-black shadow-[0_4px_20px_rgba(229,193,88,0.3)] hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-black" />
                      <span>Saving Request in Firestore...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Collector Request</span>
                      <Send className="w-4 h-4 text-black" />
                    </>
                  )}
                </button>
                <p className="text-[10px] text-center text-[#6E6E78] font-mono mt-2.5">
                  Free Tracked Air Express · Wax-Sealed Protective Envelope
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
export default CustomerRequestModal;
