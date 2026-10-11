import React from 'react';
import legendaryRacecarImage from '../assets/images/legendary_subject_racecar_1791615873936.jpg';

export const LegendarySubject: React.FC = () => {
  return (
    <section id="subject" className="relative h-[65vh] sm:h-[75vh] lg:h-[82vh] w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Dramatic full-bleed racing car photograph */}
      <div className="absolute inset-0 z-0">
        <img
          src={legendaryRacecarImage}
          alt="Dramatic Le Mans endurance racing car on wet circuit at night with slicing golden beam headlights"
          className="w-full h-full object-cover object-center filter brightness-[0.70] contrast-[1.18]"
          referrerPolicy="no-referrer"
        />
        {/* Cinematic vignette scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-black/40 to-[#08080A]/80" />
        <div className="absolute inset-0 bg-black/35 backdrop-blur-[0.5px]" />
        <div className="absolute inset-0 archival-grain opacity-50 pointer-events-none" />
      </div>

      {/* Centred gold headline and one-line description */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        {/* Subtle decorative postmark motif */}
        <div className="inline-flex items-center gap-3 px-3 py-1 rounded border border-[#C5A059]/30 bg-black/60 backdrop-blur-md mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E5C158]" />
          <span className="text-[11px] font-mono uppercase tracking-[0.28em] text-[#E5C158]">
            Curatorial Heritage · Edition 2026
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#E5C158]" />
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-[0.16em] font-serif-display gold-gradient-text drop-shadow-[0_6px_25px_rgba(0,0,0,0.9)] mb-6 leading-tight">
          THE LEGENDARY SUBJECT
        </h2>

        <p className="max-w-2xl text-base sm:text-lg md:text-xl text-[#E6E4DF] font-editorial italic font-normal tracking-wide leading-relaxed text-balance drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
          Every month immortalizes an undisputed titan of speed—from Le Mans tarmac conquerors to supersonic skybreakers.
        </p>

        {/* Quiet technical coordinates strip */}
        <div className="mt-8 pt-6 border-t border-[#C5A059]/25 flex flex-wrap items-center justify-center gap-6 text-[11px] font-mono text-[#A8A59E] uppercase tracking-widest">
          <span>Paddock & Hangar Archives</span>
          <span>·</span>
          <span>Original Factory Blueprints</span>
          <span>·</span>
          <span>Documentary Dossiers</span>
        </div>
      </div>
    </section>
  );
};
export default LegendarySubject;
