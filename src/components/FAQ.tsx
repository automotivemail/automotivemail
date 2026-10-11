import React, { useState } from 'react';
import { FAQ_ITEMS, FaqItem } from '../data/automotiveMailData';
import { ChevronDown, HelpCircle, Mail, MessageSquare } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default

  const toggleAccordion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="relative py-28 bg-[#0A0A0E] border-t border-[#1C1C22]">
      {/* Background grain */}
      <div className="absolute inset-0 archival-grain opacity-30 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.24em] text-[#C5A059] block mb-3">
            Questions & Collector Clarifications
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-wider font-serif-display text-[#F5F2EB] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-[#A8A59E] font-editorial text-lg italic max-w-xl mx-auto">
            Everything you need to know about our physical print dispatches, archival stock, and India-wide shipping.
          </p>
        </div>

        {/* Five Accordion Questions */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item: FaqItem, idx: number) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-[#121217] border-[#C5A059]/50 shadow-lg'
                    : 'bg-[#0E0E12] border-[#22222A] hover:border-[#33333E]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E5C158]"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="text-xs font-mono text-[#E5C158] shrink-0 font-bold">
                      0{idx + 1}.
                    </span>
                    <span className="text-base sm:text-lg font-serif-display font-bold text-[#F4F1EA] tracking-wide">
                      {item.question}
                    </span>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'rotate-180 bg-[#1F1F28] text-[#E5C158]'
                        : 'bg-[#141418] text-[#8E8C85]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-[#D8D6CE] font-editorial leading-relaxed border-t border-[#1C1C24] animate-in fade-in-50 duration-200">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Direct Contact Support Note */}
        <div className="mt-14 p-6 rounded-xl bg-[#0E0E12] border border-[#22222A] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-[#E5C158] shrink-0" />
            <div>
              <div className="text-sm font-semibold text-white">Have a specific question about an upcoming drop?</div>
              <div className="text-xs text-[#8E8C85]">Our editorial curators respond within 24 hours.</div>
            </div>
          </div>
          <a
            href="mailto:ask.automotivemail@gmail.com"
            className="px-4 py-2 rounded bg-[#181820] hover:bg-[#22222C] border border-[#2F2F3D] text-xs font-mono text-[#E5C158] uppercase tracking-wider transition-colors shrink-0"
          >
            ask.automotivemail@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
};
export default FAQ;
