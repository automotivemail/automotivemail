import React from 'react';
import carInteriorImg from '../assets/images/mosaic_car_interior_1791615904320.jpg';
import aircraftImg from '../assets/images/mosaic_vintage_aircraft_1791615916243.jpg';
import framedPrintImg from '../assets/images/mosaic_framed_print_1791615979155.jpg';
import { AutomotiveMailLogo } from './AutomotiveMailLogo';

export const NostalgicMission: React.FC = () => {
  return (
    <section className="relative py-28 bg-[#08080A] border-t border-[#1C1C22]">
      {/* Background grain */}
      <div className="absolute inset-0 archival-grain opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Brand Story Copy on the Left (5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <span className="text-xs font-mono uppercase tracking-[0.24em] text-[#C5A059] block mb-3">
              The Soul of the Machine
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-wider font-serif-display text-[#F5F2EB] mb-6 leading-tight">
              The Nostalgic Mission
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#D8D6CE] font-editorial leading-relaxed">
              <p>
                In an era where legendary speed has been reduced to ephemeral 15-second digital clips and disposable algorithms, we believe iconic machinery deserves enduring physical reverence.
              </p>
              <p>
                There was a time when petrolheads and aviation dreamers waited patiently by the mailbox for foreign motoring journals, blueprint schematics, and letters from race engineers. Automotive Mail was founded to resurrect that lost tactile romance for collectors across India.
              </p>
              <p>
                When you slice open our wax-sealed black envelope, the scent of fresh pigment ink on 250 to 300 GSM archival paper commands your uninterrupted attention. You are not just hanging a poster; you are curating an heirloom tribute to human courage, aerodynamics, and mechanical perfection.
              </p>
            </div>

            {/* Subtle Brand Quote Box */}
            <div className="mt-8 p-5 rounded-lg bg-[#0F0F14] border border-[#23232C] border-l-2 border-l-[#E5C158]">
              <p className="text-xs font-editorial italic text-[#C5A059] leading-relaxed">
                "Speed is temporary. The art and engineering that captured it are immortal."
              </p>
              <div className="mt-2 text-[11px] font-mono text-[#8E8C85] uppercase tracking-wider">
                — Founders’ Manifesto · Automotive Mail Dispatch
              </div>
            </div>
          </div>

          {/* Image Mosaic on the Right (7 cols) */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {/* Mosaic Item 1: Car Interior (Cockpit craftsmanship) */}
              <div className="relative rounded-xl overflow-hidden bg-[#14141A] border border-[#24242E] shadow-xl group aspect-[4/3]">
                <img
                  src={carInteriorImg}
                  alt="Vintage hand-stitched leather cockpit and chrome gauges"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-[11px] font-mono uppercase tracking-wider text-[#E5C158]">
                  Analog Cockpits
                </div>
              </div>

              {/* Mosaic Item 2: Aircraft (Supersonic / Warbird heritage) */}
              <div className="relative rounded-xl overflow-hidden bg-[#14141A] border border-[#24242E] shadow-xl group aspect-[4/3]">
                <img
                  src={aircraftImg}
                  alt="Classic aviation fighter aircraft soaring in dramatic golden hour clouds"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-[11px] font-mono uppercase tracking-wider text-[#E5C158]">
                  Heroic Aviation
                </div>
              </div>

              {/* Mosaic Item 3: Framed Print (Spanning full width below) */}
              <div className="col-span-2 relative rounded-xl overflow-hidden bg-[#14141A] border border-[#24242E] shadow-2xl group aspect-[16/9]">
                <img
                  src={framedPrintImg}
                  alt="Framed black and white historic sports car fine art print hung on dark gallery wall"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#E5C158] block">
                      Gallery Presentation
                    </span>
                    <span className="text-sm font-serif-display font-semibold text-white">
                      Archival Fine Art On Collector Walls
                    </span>
                  </div>
                  <div className="hidden sm:block">
                    <AutomotiveMailLogo variant="stamp-only" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default NostalgicMission;
