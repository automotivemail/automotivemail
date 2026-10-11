import React from 'react';
import { SUBSCRIPTION_PLANS, PlanTier } from '../data/automotiveMailData';
import { useAutomotiveMail } from '../context/AutomotiveMailContext';
import { Check, ShieldCheck, Sparkles, Image as ImageIcon, FileText, Compass, Camera, BookOpen } from 'lucide-react';

export const SubscriptionPlans: React.FC = () => {
  const { addToCart, subscribeNow, setIsDropsModalOpen } = useAutomotiveMail();

  const getIncludeIcon = (key: string) => {
    switch (key) {
      case 'heroPoster':
        return <ImageIcon className="w-4 h-4 text-[#E5C158] shrink-0 mt-0.5" />;
      case 'blueprint':
        return <Compass className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />;
      case 'magazineCover':
        return <BookOpen className="w-4 h-4 text-[#FB923C] shrink-0 mt-0.5" />;
      case 'storyLetter':
        return <FileText className="w-4 h-4 text-[#A78BFA] shrink-0 mt-0.5" />;
      case 'polaroids':
        return <Camera className="w-4 h-4 text-[#F472B6] shrink-0 mt-0.5" />;
      default:
        return <Check className="w-4 h-4 text-[#E5C158] shrink-0 mt-0.5" />;
    }
  };

  return (
    <section id="plans" className="relative py-24 bg-[#0A0A0E] border-t border-[#1C1C22]">
      {/* Background architectural aura */}
      <div className="absolute inset-0 archival-grain opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.24em] text-[#C5A059] block mb-3">
            Monthly Collector Dispatches
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-wider font-serif-display text-[#F5F2EB] mb-4">
            Subscription Plans
          </h2>
          <p className="text-[#A8A59E] font-editorial text-lg italic max-w-xl mx-auto">
            Choose your monthly payload. Every tier ships in our rigid wax-sealed mailer with free tracked delivery to every PIN code in India.
          </p>
        </div>

        {/* 3 Tiers Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {SUBSCRIPTION_PLANS.map((plan: PlanTier) => {
            const isHighlighted = plan.isPopular;

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between rounded-xl bg-[#101015] border transition-all duration-300 ${
                  isHighlighted
                    ? 'border-[#E5C158] shadow-[0_0_40px_-10px_rgba(229,193,88,0.25)] lg:-translate-y-2'
                    : 'border-[#22222A] hover:border-[#383844]'
                } p-6 sm:p-8`}
              >
                {/* Most Popular Badge on Top */}
                {isHighlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#F4E3B2] via-[#E5C158] to-[#C5A059] text-[#0A0A0C] text-[11px] font-bold uppercase tracking-widest shadow-md flex items-center gap-1.5 whitespace-nowrap">
                    <Sparkles className="w-3 h-3 fill-current" />
                    <span>Most Popular · Best Value</span>
                  </div>
                )}

                <div>
                  {/* Plan Name & Tagline */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-black tracking-wide uppercase font-serif-display text-[#F4F1EA]">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-[#8E8C85] mt-1 line-clamp-1">{plan.tagline}</p>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-2 pb-6 border-b border-[#202028]">
                    <span className="text-4xl sm:text-5xl font-mono-numbers font-black text-[#F4F1EA]">
                      ₹{plan.price}
                    </span>
                    <span className="text-xs font-mono text-[#8E8C85] uppercase tracking-wider">
                      {plan.period}
                    </span>
                  </div>

                  {plan.savingsNote && (
                    <div className="mb-4 text-xs font-mono text-[#34D399] bg-[#064E3B]/20 border border-[#059669]/30 rounded px-2.5 py-1 inline-block">
                      {plan.savingsNote}
                    </div>
                  )}

                  {/* What's Included */}
                  <div className="mt-6 mb-8">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#8E8C85] block mb-3.5">
                      What's Included Every Month:
                    </span>
                    <ul className="space-y-3.5 text-xs text-[#D8D6CE]">
                      <li className="flex items-start gap-3">
                        {getIncludeIcon('heroPoster')}
                        <div>
                          <span className="font-semibold text-white">Hero Poster:</span>{' '}
                          {plan.includes.heroPoster}
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        {getIncludeIcon('blueprint')}
                        <div>
                          <span className="font-semibold text-white">Blueprint:</span>{' '}
                          {plan.includes.blueprint}
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        {getIncludeIcon('magazineCover')}
                        <div>
                          <span className="font-semibold text-white">Magazine Cover:</span>{' '}
                          {plan.includes.magazineCover}
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        {getIncludeIcon('storyLetter')}
                        <div>
                          <span className="font-semibold text-white">Story Letter:</span>{' '}
                          {plan.includes.storyLetter}
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        {getIncludeIcon('polaroids')}
                        <div>
                          <span className="font-semibold text-white">Polaroid Prints:</span>{' '}
                          {plan.includes.polaroids}
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* Additional Perks */}
                  <div className="pt-4 border-t border-[#1C1C24] mb-8 space-y-2">
                    {plan.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[11px] text-[#8E8C85]">
                        <span className="w-1 h-1 rounded-full bg-[#C5A059]" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Action Button */}
                <div className="pt-2">
                  <button
                    onClick={() => subscribeNow(plan.id)}
                    className={`w-full py-3.5 px-4 rounded text-xs font-bold uppercase tracking-[0.16em] transition-all duration-200 cursor-pointer ${
                      isHighlighted
                        ? 'bg-gradient-to-r from-[#F4E3B2] via-[#E5C158] to-[#C5A059] hover:from-[#FFFFFF] hover:to-[#D4AF37] text-[#0A0A0C] shadow-[0_4px_16px_rgba(229,193,88,0.25)]'
                        : 'bg-[#181820] hover:bg-[#22222D] text-[#E6E4DF] border border-[#2F2F3D] hover:border-[#C5A059]/50'
                    }`}
                  >
                    Subscribe to {plan.name}
                  </button>
                  <p className="text-[10px] text-center text-[#66645E] mt-2 font-mono">
                    Cancel anytime · Free shipping across India
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Curation Guarantee Callout banner */}
        <div className="mt-14 p-6 rounded-lg bg-[#121217] border border-[#22222A] flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#1A1A22] border border-[#C5A059]/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-[#E5C158]" />
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider font-serif-display text-white">
                Gifting a collector in India?
              </h4>
              <p className="text-xs text-[#8E8C85] mt-0.5">
                Send a curated gift subscription with a custom wax-sealed dedication note.
              </p>
            </div>
          </div>
          <button
            onClick={() => subscribeNow('both', true)}
            className="px-5 py-2.5 rounded bg-[#1C1C24] hover:bg-[#252532] border border-[#3A3A48] text-xs font-semibold uppercase tracking-wider text-[#F4F1EA] transition-colors whitespace-nowrap cursor-pointer"
          >
            Gift This Subscription
          </button>
        </div>
      </div>
    </section>
  );
};
export default SubscriptionPlans;
