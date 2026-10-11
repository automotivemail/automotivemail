import React from 'react';
import { HOW_IT_WORKS_STEPS } from '../data/automotiveMailData';
import { AutomotiveMailLogo } from './AutomotiveMailLogo';
import carInteriorImg from '../assets/images/mosaic_car_interior_1791615904320.jpg';
import darkGarageImg from '../assets/images/guarantee_dark_garage_1791615892167.jpg';
import framedPrintImg from '../assets/images/mosaic_framed_print_1791615979155.jpg';

export const HowItWorks: React.FC = () => {
  const stepImages = [
    {
      img: carInteriorImg,
      alt: 'Selecting vintage motoring and aviation icons with tactile cockpits and dials',
      badge: 'Step 01 · Selection',
    },
    {
      img: darkGarageImg,
      alt: 'Art prints and blueprints laid out on collector workshop bench',
      badge: 'Step 02 · Archival Craft',
    },
    {
      img: framedPrintImg,
      alt: 'Framed collector print delivered and displayed in home gallery',
      badge: 'Step 03 · Pan-India Dispatch',
    },
  ];

  return (
    <section id="how-it-works" className="relative py-28 bg-[#0A0A0E] border-t border-[#1C1C22]">
      {/* Background grain */}
      <div className="absolute inset-0 archival-grain opacity-35 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-mono uppercase tracking-[0.24em] text-[#C5A059] block mb-3">
            The Collector Journey
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-wider font-serif-display text-[#F5F2EB] mb-4">
            How It Works
          </h2>
          <p className="text-[#A8A59E] font-editorial text-lg italic max-w-xl mx-auto">
            From historical curation to hand-sealed postage. Three refined stages delivering physical art to your door.
          </p>
        </div>

        {/* Three Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10">
          {HOW_IT_WORKS_STEPS.map((step, idx) => {
            const media = stepImages[idx];

            return (
              <div
                key={step.step}
                className="relative flex flex-col justify-between bg-[#101015] border border-[#22222A] hover:border-[#C5A059]/40 rounded-xl overflow-hidden group transition-all duration-300 shadow-xl"
              >
                {/* Supporting Image Container */}
                <div className="relative h-60 w-full overflow-hidden bg-[#181820]">
                  <img
                    src={media.img}
                    alt={media.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 contrast-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101015] via-transparent to-black/30" />

                  {/* Step Category Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded bg-[#0A0A0E]/85 border border-[#C5A059]/30 backdrop-blur-md text-[11px] font-mono tracking-widest text-[#E5C158] uppercase">
                    {media.badge}
                  </div>
                </div>

                {/* Content Area with Oversized Ghost Number */}
                <div className="p-7 relative overflow-hidden flex-1 flex flex-col justify-between">
                  {/* Oversized Ghost Number as Typographic Decoration */}
                  <div
                    className="absolute -right-2 -bottom-6 font-serif-display text-8xl sm:text-9xl font-black text-[#1C1C26]/70 select-none pointer-events-none transition-colors group-hover:text-[#252533]"
                    aria-hidden="true"
                  >
                    {step.step}
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono text-xs text-[#E5C158] font-bold tracking-wider">
                        STAGE {step.step}
                      </span>
                      <span className="text-[#444]">·</span>
                      <span className="text-[11px] font-mono text-[#8E8C85] uppercase tracking-wider">
                        {step.subtitle}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wide font-serif-display text-[#F4F1EA] mb-3">
                      {step.title}
                    </h3>

                    <p className="text-sm text-[#D8D6CE] font-editorial leading-relaxed mb-4">
                      {step.description}
                    </p>
                  </div>

                  {/* Supporting Detail Footnote */}
                  <div className="relative z-10 pt-4 border-t border-[#1E1E26] text-xs text-[#8E8C85] font-mono leading-normal">
                    {step.detail}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default HowItWorks;
