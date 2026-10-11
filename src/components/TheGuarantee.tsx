import React from 'react';
import { GUARANTEE_POINTS } from '../data/automotiveMailData';
import darkGarageBg from '../assets/images/guarantee_dark_garage_1791615892167.jpg';
import { ShieldCheck, Award, Box, RotateCcw } from 'lucide-react';

export const TheGuarantee: React.FC = () => {
  const getIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Award className="w-5 h-5 text-[#E5C158]" />;
      case 1:
        return <ShieldCheck className="w-5 h-5 text-[#E5C158]" />;
      case 2:
        return <Box className="w-5 h-5 text-[#E5C158]" />;
      case 3:
        return <RotateCcw className="w-5 h-5 text-[#E5C158]" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-[#E5C158]" />;
    }
  };

  return (
    <section id="guarantee" className="relative py-28 overflow-hidden bg-black border-t border-[#1C1C22]">
      {/* Dark garage photograph backdrop */}
      <div className="absolute inset-0 z-0">
        <img
          src={darkGarageBg}
          alt="Dark collector garage workshop with prints, classic car, and warm craft lighting"
          className="w-full h-full object-cover object-center filter brightness-[0.55] contrast-[1.12]"
          referrerPolicy="no-referrer"
        />
        {/* Scrims for depth and high contrast readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#08080A]/95 via-[#08080A]/85 to-[#08080A]/95" />
        <div className="absolute inset-0 archival-grain opacity-50 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.24em] text-[#C5A059] block mb-3">
            Craftsmanship Standard
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-wider font-serif-display text-[#F5F2EB] mb-4">
            The Quality Guarantee
          </h2>
          <p className="text-[#D8D6CE] font-editorial text-lg italic max-w-2xl mx-auto">
            We build physical collectibles intended to outlive the digital noise. If any print does not meet your personal gallery standard, we make it right unconditionally.
          </p>
        </div>

        {/* Four Bullet Points Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GUARANTEE_POINTS.map((item, idx) => (
            <div
              key={item.title}
              className="p-6 rounded-xl bg-[#0E0E12]/90 border border-[#22222A] hover:border-[#C5A059]/40 backdrop-blur-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#181820] border border-[#2A2A34] flex items-center justify-center group-hover:border-[#C5A059]/40 transition-colors">
                    {getIcon(idx)}
                  </div>
                  <span className="text-[10px] font-mono tracking-wider text-[#C5A059] bg-[#C5A059]/10 px-2.5 py-0.5 rounded border border-[#C5A059]/20">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold uppercase tracking-wide font-serif-display text-white mb-2">
                  {item.title}
                </h3>

                <p className="text-xs text-[#B5B3AD] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-[#1C1C24] flex items-center gap-1.5 text-[11px] font-mono text-[#E5C158]">
                <span>Guaranteed</span>
                <span className="text-[#444]">·</span>
                <span className="text-[#8E8C85]">Every Month</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quality Seal Note */}
        <div className="mt-14 max-w-xl mx-auto text-center p-4 rounded-lg bg-[#121218]/70 border border-[#262632] text-xs font-mono text-[#8E8C85]">
          All orders are inspected by hand in our print workshop prior to wax-sealing. Replacement dispatches ship via Air Express within 24 hours of reporting any transit damage.
        </div>
      </div>
    </section>
  );
};
export default TheGuarantee;
