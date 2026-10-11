import React from 'react';
import { TESTIMONIALS, Testimonial } from '../data/automotiveMailData';
import { Star, Quote, MapPin } from 'lucide-react';

export const EnthusiastVoices: React.FC = () => {
  return (
    <section className="relative py-24 bg-[#08080A] border-t border-[#1C1C22]">
      {/* Background subtle grain */}
      <div className="absolute inset-0 archival-grain opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.24em] text-[#C5A059] block mb-3">
            Collector Community
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-wider font-serif-display text-[#F5F2EB] mb-4">
            Enthusiast Voices
          </h2>
          <p className="text-[#A8A59E] font-editorial text-lg italic max-w-xl mx-auto">
            Dispatches delivered to desks, garages, and architectural studios across Mumbai, Bengaluru, and Delhi.
          </p>
        </div>

        {/* Three Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t: Testimonial) => (
            <div
              key={t.id}
              className="flex flex-col justify-between p-7 rounded-xl bg-[#0E0E12] border border-[#22222A] hover:border-[#C5A059]/40 transition-all duration-300 shadow-lg relative group"
            >
              {/* Top Quote Icon & 5 Gold Stars */}
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-1 text-[#E5C158]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-[#E5C158]" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-[#3E3E4A] group-hover:text-[#C5A059]/60 transition-colors" />
                </div>

                {/* Quote */}
                <p className="text-[#D8D6CE] text-sm leading-relaxed font-editorial italic mb-6">
                  "{t.quote}"
                </p>
              </div>

              {/* Collector Details */}
              <div className="pt-5 border-t border-[#1A1A22] flex items-center gap-3.5">
                <div className="relative">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover border border-[#C5A059]/40"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback avatar container
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="w-12 h-12 rounded-full bg-[#1A1A24] border border-[#C5A059]/40 flex items-center justify-center font-serif font-bold text-xs text-[#E5C158] -z-10 absolute inset-0">
                    {t.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold uppercase tracking-wide font-serif-display text-white truncate">
                    {t.name}
                  </h4>
                  <p className="text-[11px] text-[#8E8C85] truncate mt-0.5">{t.role}</p>
                  <div className="flex items-center gap-1.5 mt-1 text-[11px] font-mono text-[#C5A059]">
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span>{t.city}, India</span>
                    <span className="text-[#555] mx-1">·</span>
                    <span className="text-[#8E8C85] text-[10px]">{t.collectorSince}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default EnthusiastVoices;
