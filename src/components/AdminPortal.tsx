import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAutomotiveMail, CustomerRequest, RequestStatus, RequestType } from '../context/AutomotiveMailContext';
import { AutomotiveMailLogo } from './AutomotiveMailLogo';
import {
  ShieldCheck,
  ShieldAlert,
  Search,
  Filter,
  Package,
  Calendar,
  MapPin,
  Phone,
  Mail,
  User,
  CheckCircle2,
  XCircle,
  Clock,
  Truck,
  ArrowLeft,
  Loader2,
  Save,
  MessageSquare,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Eye,
  RefreshCw,
} from 'lucide-react';

interface AdminPortalProps {
  onBackToHome?: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onBackToHome }) => {
  const { user, isAdmin, openAuthModal, logOut } = useAuth();
  const { allRequests, updateCustomerRequest } = useAutomotiveMail();

  const [statusFilter, setStatusFilter] = useState<'all' | RequestStatus>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | RequestType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<CustomerRequest | null>(null);

  // Management Drawer Form State
  const [statusInput, setStatusInput] = useState<RequestStatus>('pending');
  const [adminResponseInput, setAdminResponseInput] = useState('');
  const [carrierInput, setCarrierInput] = useState('BlueDart Air Express');
  const [trackingNumberInput, setTrackingNumberInput] = useState('');
  const [trackingStatusInput, setTrackingStatusInput] = useState('Artwork Being Curated');
  const [dispatchDateInput, setDispatchDateInput] = useState('');
  const [estimatedDeliveryInput, setEstimatedDeliveryInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);
  const [saveErrorMsg, setSaveErrorMsg] = useState<string | null>(null);

  const openManageDrawer = (req: CustomerRequest) => {
    setSelectedRequest(req);
    setStatusInput(req.status);
    setAdminResponseInput(req.adminResponse || '');
    setCarrierInput(req.trackingCarrier || 'BlueDart Air Express');
    setTrackingNumberInput(req.trackingNumber || '');
    setTrackingStatusInput(req.trackingStatus || 'Artwork Being Curated');
    setDispatchDateInput(req.dispatchDate || '');
    setEstimatedDeliveryInput(req.estimatedDelivery || '');
    setSaveSuccessMsg(null);
    setSaveErrorMsg(null);
  };

  const handleSaveUpdates = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRequest) return;

    setIsSaving(true);
    setSaveSuccessMsg(null);
    setSaveErrorMsg(null);

    try {
      await updateCustomerRequest(selectedRequest.id, {
        status: statusInput,
        adminResponse: adminResponseInput.trim() || null,
        trackingCarrier: carrierInput.trim() || null,
        trackingNumber: trackingNumberInput.trim() || null,
        trackingStatus: trackingStatusInput.trim() || null,
        dispatchDate: dispatchDateInput.trim() || null,
        estimatedDelivery: estimatedDeliveryInput.trim() || null,
      });

      // Update local copy
      setSelectedRequest((prev) =>
        prev
          ? {
              ...prev,
              status: statusInput,
              adminResponse: adminResponseInput.trim() || null,
              trackingCarrier: carrierInput.trim() || null,
              trackingNumber: trackingNumberInput.trim() || null,
              trackingStatus: trackingStatusInput.trim() || null,
              dispatchDate: dispatchDateInput.trim() || null,
              estimatedDelivery: estimatedDeliveryInput.trim() || null,
            }
          : null
      );

      setSaveSuccessMsg('Request and tracking details successfully updated in Firestore.');
      setTimeout(() => setSaveSuccessMsg(null), 4000);
    } catch (err: any) {
      console.error('Failed to update request:', err);
      setSaveErrorMsg(err.message || 'Error updating Firestore document.');
    } finally {
      setIsSaving(false);
    }
  };

  // Filter & Search Logic
  const filteredRequests = allRequests.filter((req) => {
    if (statusFilter !== 'all' && req.status !== statusFilter) return false;
    if (typeFilter !== 'all' && req.requestType !== typeFilter) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = req.customerName?.toLowerCase().includes(q);
      const matchEmail = req.customerEmail?.toLowerCase().includes(q);
      const matchPhone = req.phone?.toLowerCase().includes(q);
      const matchId = req.id?.toLowerCase().includes(q);
      const matchCity = req.shippingAddress?.city?.toLowerCase().includes(q);
      if (!matchName && !matchEmail && !matchPhone && !matchId && !matchCity) return false;
    }

    return true;
  });

  const countPending = allRequests.filter((r) => r.status === 'pending').length;
  const countAccepted = allRequests.filter((r) => r.status === 'accepted').length;
  const countDeclined = allRequests.filter((r) => r.status === 'declined').length;
  const countCompleted = allRequests.filter((r) => r.status === 'completed').length;

  // Unauthorised Guard
  if (!user || !isAdmin) {
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
          <div className="w-full max-w-md bg-[#0F0F14] border border-[#301B20] rounded-2xl p-6 sm:p-8 text-center space-y-5 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-[#251014] border border-[#EF4444]/40 flex items-center justify-center mx-auto text-[#EF4444]">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#EF4444] bg-[#251014] px-2.5 py-1 rounded border border-[#EF4444]/30">
                Authorisation Required
              </span>
              <h2 className="font-serif-display font-bold text-2xl text-white mt-3">
                Owner Admin Portal
              </h2>
              <p className="text-xs text-[#8E8C85] mt-2 max-w-xs mx-auto leading-relaxed">
                This portal is strictly reserved for the authorized Automotive Mail owner (<code>ask.automotivemail@gmail.com</code>).
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-[#14141C] border border-[#22222E] text-xs font-mono text-[#8E8C85] text-left">
              <div>Current Account:</div>
              <div className="text-white font-medium truncate mt-0.5">
                {user ? user.email : 'Not signed in'}
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => openAuthModal('login')}
                className="w-full py-3 rounded-lg text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#F4E3B2] via-[#E5C158] to-[#C5A059] text-black shadow-md cursor-pointer"
              >
                Sign In as Owner
              </button>

              {user && (
                <button
                  onClick={() => logOut()}
                  className="w-full py-2.5 text-xs text-[#EF4444] hover:underline font-mono"
                >
                  Sign Out of Current Account
                </button>
              )}
            </div>
          </div>
        </main>

        <footer className="border-t border-[#14141A] py-4 text-center text-xs font-mono text-[#66645E]">
          Automotive Mail Secure Owner Desk
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08080A] text-[#E6E4DF] flex flex-col justify-between selection:bg-[#C5A059]/30">
      {/* Top Navbar */}
      <header className="border-b border-[#1E1E28] bg-[#0C0C10] px-4 sm:px-8 py-4 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AutomotiveMailLogo variant="compact" />
            <div className="hidden sm:block border-l border-[#262634] pl-3">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#C5A059] block">
                Owner Administration
              </span>
              <h1 className="font-serif-display font-bold text-sm text-white">
                Customer Requests & Dispatch Portal
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#14141C] border border-[#2B2B3A] text-xs font-mono text-[#34D399]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Owner: {user.email}</span>
            </div>

            <button
              onClick={() => {
                if (onBackToHome) onBackToHome();
                else window.location.hash = '';
              }}
              className="px-3.5 py-1.5 rounded border border-[#2B2B3A] hover:border-[#E5C158] text-xs font-mono text-[#E6E4DF] hover:text-white transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Back to Site</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 space-y-8">
        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          <div className="p-4 rounded-xl bg-[#101016] border border-[#222230]">
            <span className="text-[10px] font-mono uppercase text-[#8E8C85] block mb-1">
              Total Requests
            </span>
            <div className="font-mono-numbers text-2xl sm:text-3xl font-black text-white">
              {allRequests.length}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#101016] border border-[#F59E0B]/30">
            <span className="text-[10px] font-mono uppercase text-[#F59E0B] block mb-1">
              Pending Review
            </span>
            <div className="font-mono-numbers text-2xl sm:text-3xl font-black text-[#FBBF24]">
              {countPending}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#101016] border border-[#10B981]/30">
            <span className="text-[10px] font-mono uppercase text-[#10B981] block mb-1">
              Accepted (Arranging)
            </span>
            <div className="font-mono-numbers text-2xl sm:text-3xl font-black text-[#34D399]">
              {countAccepted}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#101016] border border-[#EF4444]/30">
            <span className="text-[10px] font-mono uppercase text-[#EF4444] block mb-1">
              Declined
            </span>
            <div className="font-mono-numbers text-2xl sm:text-3xl font-black text-[#F87171]">
              {countDeclined}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#101016] border border-[#38BDF8]/30">
            <span className="text-[10px] font-mono uppercase text-[#38BDF8] block mb-1">
              Completed
            </span>
            <div className="font-mono-numbers text-2xl sm:text-3xl font-black text-[#38BDF8]">
              {countCompleted}
            </div>
          </div>
        </div>

        {/* Filter and Search Controls */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-[#101016] p-4 rounded-xl border border-[#222230]">
          {/* Status Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 text-xs font-mono uppercase tracking-wider">
            {(['all', 'pending', 'accepted', 'declined', 'completed'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                  statusFilter === st
                    ? 'bg-[#E5C158] text-black font-bold'
                    : 'bg-[#181822] text-[#8E8C85] hover:text-white'
                }`}
              >
                {st === 'all' ? 'All Requests' : st}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-[#8E8C85] absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by name, email, phone, city, ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 bg-[#161620] border border-[#2B2B3A] rounded-lg text-white placeholder-[#66645E] focus:outline-none focus:border-[#E5C158]"
            />
          </div>
        </div>

        {/* Requests Table / Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-[#8E8C85]">
            <span>Showing {filteredRequests.length} request{filteredRequests.length === 1 ? '' : 's'}</span>
            <span>Real-time sync from Firestore /customerRequests</span>
          </div>

          {filteredRequests.length === 0 ? (
            <div className="text-center py-16 bg-[#0E0E14] border border-[#20202C] rounded-2xl space-y-3">
              <Package className="w-12 h-12 text-[#66645E] mx-auto" />
              <div className="font-serif-display text-lg text-white font-bold">No matching customer requests</div>
              <p className="text-xs text-[#8E8C85] max-w-sm mx-auto">
                {searchQuery || statusFilter !== 'all'
                  ? 'Try clearing your filters or search keywords.'
                  : 'Customer requests will appear here as soon as visitors click Subscribe or request fine art prints.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredRequests.map((req) => (
                <div
                  key={req.id}
                  className="p-5 rounded-xl bg-[#0F0F16] border border-[#222230] hover:border-[#38384A] transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#E5C158]">
                        #{req.id}
                      </span>
                      <span
                        className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded font-bold ${
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
                      <span className="text-[11px] font-mono text-[#8E8C85]">
                        {new Date(req.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-xs">
                      <div className="font-semibold text-white flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>{req.customerName}</span>
                      </div>
                      <div className="text-[#A8A59E] flex items-center gap-1.5 font-mono">
                        <Mail className="w-3.5 h-3.5 text-[#8E8C85]" />
                        <span>{req.customerEmail}</span>
                      </div>
                      <div className="text-[#A8A59E] flex items-center gap-1.5 font-mono">
                        <Phone className="w-3.5 h-3.5 text-[#8E8C85]" />
                        <span>{req.phone}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#D8D6CE]">
                      <div>
                        <span className="text-[#8E8C85]">Item:</span>{' '}
                        <span className="text-white font-medium">
                          {req.planName || req.productName || req.requestType}
                        </span>
                      </div>
                      <div>
                        <span className="text-[#8E8C85]">Qty:</span> {req.quantity}
                      </div>
                      <div>
                        <span className="text-[#8E8C85]">Destination:</span>{' '}
                        {req.shippingAddress?.city}, {req.shippingAddress?.state} ({req.shippingAddress?.pincode})
                      </div>
                    </div>

                    {req.trackingNumber && (
                      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#141A22] border border-[#38BDF8]/30 text-[11px] font-mono text-[#38BDF8]">
                        <Truck className="w-3.5 h-3.5" />
                        <span>
                          {req.trackingCarrier}: {req.trackingNumber} ({req.trackingStatus || 'Active'})
                        </span>
                      </div>
                    )}

                    {req.adminResponse && (
                      <div className="p-2.5 rounded bg-[#181822] border border-[#2B2B38] text-[11px] text-[#A69E89] italic">
                        <span className="font-semibold text-[#E5C158] not-italic">Admin Note: </span>
                        {req.adminResponse}
                      </div>
                    )}
                  </div>

                  {/* Actions Button */}
                  <button
                    onClick={() => openManageDrawer(req)}
                    className="px-4 py-2.5 rounded-lg bg-[#1C1C28] hover:bg-[#252536] border border-[#323246] hover:border-[#E5C158] text-xs font-mono font-medium text-white transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
                  >
                    <span>Manage Request & Tracking</span>
                    <ChevronRight className="w-4 h-4 text-[#E5C158]" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* DETAIL & MANAGEMENT MODAL / DRAWER */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#0D0D12] border border-[#2D2D3E] rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden text-[#E6E4DF]">
            {/* Drawer Header */}
            <div className="p-5 border-b border-[#20202E] flex items-center justify-between bg-[#111118]">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#C5A059] block">
                  Request Management & Order Fulfillment
                </span>
                <h3 className="font-serif-display font-bold text-lg text-white">
                  Ref #{selectedRequest.id}
                </h3>
              </div>

              <button
                onClick={() => setSelectedRequest(null)}
                className="p-1.5 rounded-lg text-[#8E8C85] hover:text-white hover:bg-[#1E1E28] transition-colors cursor-pointer"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 text-xs">
              {saveSuccessMsg && (
                <div className="p-3 rounded-lg bg-[#064E3B]/80 border border-[#059669]/70 text-[#A7F3D0] flex items-start gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <span>{saveSuccessMsg}</span>
                </div>
              )}

              {saveErrorMsg && (
                <div className="p-3 rounded-lg bg-[#3F1118]/80 border border-[#991B1B]/70 text-[#FCA5A5] flex items-start gap-2 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 text-[#EF4444] shrink-0 mt-0.5" />
                  <span>{saveErrorMsg}</span>
                </div>
              )}

              {/* Customer Contact & Delivery Details Card */}
              <div className="p-4 rounded-xl bg-[#121218] border border-[#222230] space-y-2.5">
                <div className="font-mono uppercase text-[#C5A059] text-[11px] font-bold border-b border-[#1E1E28] pb-1.5 flex items-center justify-between">
                  <span>Customer Profile & Delivery Address</span>
                  <span className="text-[#8E8C85] text-[10px]">UID: {selectedRequest.uid}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <div className="text-[#8E8C85] text-[10px] uppercase font-mono">Full Name</div>
                    <div className="text-white font-medium text-sm">{selectedRequest.customerName}</div>
                  </div>
                  <div>
                    <div className="text-[#8E8C85] text-[10px] uppercase font-mono">Email Address</div>
                    <div className="text-white font-mono">{selectedRequest.customerEmail}</div>
                  </div>
                  <div>
                    <div className="text-[#8E8C85] text-[10px] uppercase font-mono">Phone Number</div>
                    <div className="text-white font-mono">{selectedRequest.phone}</div>
                  </div>
                  <div>
                    <div className="text-[#8E8C85] text-[10px] uppercase font-mono">Submission Date</div>
                    <div className="text-white font-mono">
                      {new Date(selectedRequest.createdAt).toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#1C1C26]">
                  <div className="text-[#8E8C85] text-[10px] uppercase font-mono mb-1">Postal Delivery Address</div>
                  <div className="text-[#E6E4DF] leading-relaxed">
                    {selectedRequest.shippingAddress?.streetAddress}
                    {selectedRequest.shippingAddress?.landmark && `, ${selectedRequest.shippingAddress.landmark}`}
                    {selectedRequest.shippingAddress?.area && `, ${selectedRequest.shippingAddress.area}`}
                    <br />
                    {selectedRequest.shippingAddress?.city}, {selectedRequest.shippingAddress?.state} – PIN {selectedRequest.shippingAddress?.pincode}
                    <br />
                    {selectedRequest.shippingAddress?.country || 'India'}
                  </div>
                </div>

                {selectedRequest.requirements && (
                  <div className="pt-2 border-t border-[#1C1C26]">
                    <div className="text-[#E5C158] text-[10px] uppercase font-mono">Customer Special Requirements</div>
                    <div className="text-white mt-0.5">{selectedRequest.requirements}</div>
                  </div>
                )}

                {selectedRequest.notes && (
                  <div className="pt-2 border-t border-[#1C1C26]">
                    <div className="text-[#8E8C85] text-[10px] uppercase font-mono">Customer Notes</div>
                    <div className="text-[#C5C3BC] mt-0.5 italic">{selectedRequest.notes}</div>
                  </div>
                )}
              </div>

              {/* Form to Update Status & Order Tracking */}
              <form onSubmit={handleSaveUpdates} className="space-y-5">
                {/* Status Selection Buttons */}
                <div className="space-y-2">
                  <label className="block text-[11px] font-mono uppercase text-[#8E8C85]">
                    Request Curation Status
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      type="button"
                      onClick={() => setStatusInput('pending')}
                      className={`p-2.5 rounded-lg border text-xs font-mono font-medium transition-all ${
                        statusInput === 'pending'
                          ? 'border-[#F59E0B] bg-[#22180A] text-[#FBBF24]'
                          : 'border-[#262634] bg-[#121218] text-[#8E8C85]'
                      }`}
                    >
                      Pending review
                    </button>
                    <button
                      type="button"
                      onClick={() => setStatusInput('accepted')}
                      className={`p-2.5 rounded-lg border text-xs font-mono font-medium transition-all ${
                        statusInput === 'accepted'
                          ? 'border-[#10B981] bg-[#0E2018] text-[#34D399]'
                          : 'border-[#262634] bg-[#121218] text-[#8E8C85]'
                      }`}
                    >
                      Accept Request
                    </button>
                    <button
                      type="button"
                      onClick={() => setStatusInput('declined')}
                      className={`p-2.5 rounded-lg border text-xs font-mono font-medium transition-all ${
                        statusInput === 'declined'
                          ? 'border-[#EF4444] bg-[#221014] text-[#F87171]'
                          : 'border-[#262634] bg-[#121218] text-[#8E8C85]'
                      }`}
                    >
                      Decline Request
                    </button>
                    <button
                      type="button"
                      onClick={() => setStatusInput('completed')}
                      className={`p-2.5 rounded-lg border text-xs font-mono font-medium transition-all ${
                        statusInput === 'completed'
                          ? 'border-[#38BDF8] bg-[#0A1A24] text-[#38BDF8]'
                          : 'border-[#262634] bg-[#121218] text-[#8E8C85]'
                      }`}
                    >
                      Mark Completed
                    </button>
                  </div>

                  {statusInput === 'accepted' && (
                    <div className="p-3 rounded-lg bg-[#064E3B]/20 border border-[#059669]/30 text-[11px] text-[#A7F3D0] leading-relaxed">
                      <strong>Important Notice:</strong> Accepting a request is <em>not</em> payment confirmation. Payment and physical fulfillment are to be coordinated separately with the customer.
                    </div>
                  )}
                </div>

                {/* Customer-facing Response Note */}
                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#8E8C85] mb-1">
                    Customer Response Message (Visible on Customer's "My Requests" Page)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Allocation reserved for Drop 01. Payment link and invoice will be dispatched via email."
                    value={adminResponseInput}
                    onChange={(e) => setAdminResponseInput(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-[#121218] border border-[#282838] rounded-lg text-white focus:outline-none focus:border-[#E5C158]"
                  />
                </div>

                {/* Live Order Tracking & Fulfillment Section */}
                <div className="p-4 rounded-xl bg-[#121218] border border-[#282838] space-y-3.5">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#38BDF8] font-bold border-b border-[#1E1E28] pb-1.5">
                    <Truck className="w-4 h-4" />
                    <span>Live Order Fulfillment & Consignment Tracking</span>
                  </div>
                  <p className="text-[11px] text-[#8E8C85]">
                    Updating these details allows the customer to track their physical envelope live in the Customer Tracking Portal.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-[#8E8C85] mb-1">
                        Courier Carrier Service
                      </label>
                      <select
                        value={carrierInput}
                        onChange={(e) => setCarrierInput(e.target.value)}
                        className="w-full text-xs px-3 py-2 bg-[#0E0E14] border border-[#262634] rounded text-white focus:outline-none focus:border-[#E5C158]"
                      >
                        <option value="BlueDart Air Express">BlueDart Air Express</option>
                        <option value="India Post Speed Post">India Post Speed Post</option>
                        <option value="Delhivery Surface Express">Delhivery Surface Express</option>
                        <option value="DTDC Premium">DTDC Premium</option>
                        <option value="Hand Delivered">Hand Delivered (Local Special)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-[#8E8C85] mb-1">
                        Tracking / Consignment AWB Number
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. BD-8921938201"
                        value={trackingNumberInput}
                        onChange={(e) => setTrackingNumberInput(e.target.value)}
                        className="w-full text-xs px-3 py-2 bg-[#0E0E14] border border-[#262634] rounded text-white focus:outline-none focus:border-[#E5C158]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-[#8E8C85] mb-1">
                      Fulfillment Milestone Status
                    </label>
                    <select
                      value={trackingStatusInput}
                      onChange={(e) => setTrackingStatusInput(e.target.value)}
                      className="w-full text-xs px-3 py-2 bg-[#0E0E14] border border-[#262634] rounded text-white focus:outline-none focus:border-[#E5C158]"
                    >
                      <option value="Artwork Being Curated">Artwork Being Curated & Inspected</option>
                      <option value="Wax-Sealed in Heavy Mailer">Wax-Sealed in Heavy Rigid Mailer</option>
                      <option value="Dispatched to Courier Hub">Dispatched to Courier Hub</option>
                      <option value="In Transit with Air Express">In Transit with Air Express</option>
                      <option value="Out for Delivery">Out for Delivery to Doorstep</option>
                      <option value="Delivered & Verified">Delivered & Verified</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-[#8E8C85] mb-1">
                        Dispatch Date
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 15 October 2026"
                        value={dispatchDateInput}
                        onChange={(e) => setDispatchDateInput(e.target.value)}
                        className="w-full text-xs px-3 py-2 bg-[#0E0E14] border border-[#262634] rounded text-white focus:outline-none focus:border-[#E5C158]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-[#8E8C85] mb-1">
                        Estimated Delivery Window
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 2 to 3 Business Days"
                        value={estimatedDeliveryInput}
                        onChange={(e) => setEstimatedDeliveryInput(e.target.value)}
                        className="w-full text-xs px-3 py-2 bg-[#0E0E14] border border-[#262634] rounded text-white focus:outline-none focus:border-[#E5C158]"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setSelectedRequest(null)}
                    className="px-4 py-2.5 rounded-lg border border-[#2A2A38] text-xs font-mono text-[#8E8C85] hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#F4E3B2] via-[#E5C158] to-[#C5A059] text-black text-xs font-bold uppercase tracking-wider shadow-lg hover:brightness-105 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-black" />
                        <span>Saving to Firestore...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 text-black" />
                        <span>Save Status & Tracking</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdminPortal;
