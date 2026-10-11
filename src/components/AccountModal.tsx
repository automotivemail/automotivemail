import React from 'react';
import { useAutomotiveMail } from '../context/AutomotiveMailContext';
import { AutomotiveMailLogo } from './AutomotiveMailLogo';
import { X, Check, MapPin, Package, Calendar, ShieldCheck, Mail, Phone } from 'lucide-react';

export const AccountModal: React.FC = () => {
  const { isAccountOpen, setIsAccountOpen, userAddress, activeSubscription } = useAutomotiveMail();

  if (!isAccountOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#0F0F14] border border-[#2B2B38] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#22222E] flex items-center justify-between bg-[#121218]">
          <div className="flex items-center gap-3">
            <AutomotiveMailLogo variant="stamp-only" />
            <div>
              <h3 className="font-serif-display font-bold text-base text-white">
                Collector Dashboard
              </h3>
              <div className="text-[11px] font-mono text-[#8E8C85]">
                Member #{activeSubscription?.memberId || 'IN-AM-7409'} · India
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
        <div className="p-6 space-y-6 text-xs">
          {/* Active Subscription status card */}
          <div className="p-4 rounded-xl bg-[#14141C] border border-[#262634] space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono uppercase tracking-wider text-[11px] text-[#8E8C85]">
                Current Active Subscription
              </span>
              <span className="text-[#34D399] font-mono text-[11px] flex items-center gap-1">
                <Check className="w-3 h-3" /> ACTIVE & RENEWING
              </span>
            </div>

            <div className="flex items-baseline justify-between">
              <div>
                <h4 className="text-lg font-bold font-serif-display text-white">
                  Both Worlds Collector Tier
                </h4>
                <p className="text-[11px] text-[#A6A49F]">
                  Cars & Supersonic Aircraft (Double monthly payload)
                </p>
              </div>
              <span className="text-xl font-mono text-[#E5C158] font-bold">₹759/mo</span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#1E1E28] text-[11px] font-mono">
              <div className="flex items-center gap-2 text-[#8E8C85]">
                <Calendar className="w-3.5 h-3.5 text-[#E5C158]" />
                <span>Next Dispatch: {activeSubscription?.nextDispatchDate || '18 Oct 2026'}</span>
              </div>
              <div className="flex items-center gap-2 text-[#8E8C85]">
                <Package className="w-3.5 h-3.5 text-[#E5C158]" />
                <span>Format: 300 GSM Cotton A3</span>
              </div>
            </div>
          </div>

          {/* Indian Shipping Address */}
          <div className="p-4 rounded-xl bg-[#14141C] border border-[#262634] space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-mono uppercase tracking-wider text-[11px] text-[#8E8C85] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#E5C158]" />
                <span>Registered Postal Address</span>
              </span>
              <span className="text-[11px] font-mono text-[#E5C158]">Speed Air Post</span>
            </div>

            <div className="text-white font-semibold">{userAddress.fullName}</div>
            <div className="text-[#B5B3AD] leading-relaxed">
              {userAddress.streetAddress}, {userAddress.city}, {userAddress.state} – {userAddress.pincode}
            </div>
            <div className="text-[#8E8C85] flex items-center gap-2 pt-1 font-mono text-[11px]">
              <Phone className="w-3 h-3" />
              <span>{userAddress.phone}</span>
            </div>
          </div>

          {/* Benefits summary */}
          <div className="p-4 rounded-xl bg-[#0E1712] border border-[#065F46]/40 flex items-center gap-3 text-[#34D399]">
            <ShieldCheck className="w-5 h-5 shrink-0" />
            <div>
              <div className="font-semibold text-white">Collector Protection Guaranteed</div>
              <div className="text-[11px] text-[#A6D8C0]">
                Rigid reinforced mailers with zero-cost transit damage replacement. Cancel or pause anytime.
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#121218] border-t border-[#22222E] flex justify-end">
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
