import React from 'react';
import { AutomotiveMailLogo } from './AutomotiveMailLogo';
import { useAutomotiveMail } from '../context/AutomotiveMailContext';
import { ArrowDown, Sparkles, ShieldCheck, Mail, MapPin } from 'lucide-react';
import heroCarImage from '../assets/images/hero_automotive_mail_1791615857706.jpg';

export const Hero: React.FC = () => {
  const { setIsDropsModalOpen, addToCart } = useAutomotiveMail();

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-[#08080A] pt-24 pb-16">
      {/* Full-bleed cinematic car photograph backdrop */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroCarImage}
          alt="Vintage dark emerald Porsche 911 coupe parked on wet mountain tarmac at twilight"
          className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.12]"
          referrerPolicy="no-referrer"
        />
        {/* Editorial gradient scrims for maximum legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-[#08080A]/60 to-black/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08080A]/85 via-transparent to-[#08080A]/70" />
        <div className="absolute inset-0 archival-grain opacity-60 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Curated dispatch label */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#121216]/90 border border-[#C5A059]/40 backdrop-blur-md mb-8 text-xs font-mono tracking-widest text-[#E5C158] uppercase shadow-lg">
          <MapPin className="w-3.5 h-3.5 text-[#E5C158]" />
          <span>Physical Art Dispatches · Delivered Across India</span>
        </div>

        {/* Your Postage Stamp Logo */}
        <div className="mb-6 transform hover:scale-105 transition-transform duration-300">
          <AutomotiveMailLogo variant="stamp-only" />
        </div>

        {/* Oversized gold serif title: "AUTOMOTIVE MAIL" */}
        <div className="flex flex-col items-center justify-center mb-6">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[0.14em] uppercase font-serif-display gold-gradient-text drop-shadow-[0_8px_30px_rgba(0,0,0,0.9)] leading-none">
            Automotive
          </h1>
          <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black italic tracking-[0.24em] uppercase text-[#D82638] leading-none mt-2 sm:mt-3 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            Mail
          </span>
        </div>

        {/* Editorial Subtitle */}
        <p className="max-w-2xl text-base sm:text-lg md:text-xl text-[#D8D6CE] font-editorial italic font-normal tracking-wide mb-10 leading-relaxed text-balance drop-shadow-md">
          A premium monthly subscription delivering physical museum-grade art prints, blueprints, vintage covers, and historical dispatches of iconic cars and aircraft to collectors across India.
        </p>

        {/* Two CTAs: Subscribe Now and View Drops */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center mb-12">
          <a
            href="#plans"
            className="w-full sm:w-auto px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-[#0A0A0C] bg-gradient-to-r from-[#FFF1C5] via-[#E5C158] to-[#C5A059] hover:from-[#FFFFFF] hover:to-[#D4AF37] rounded transition-all shadow-[0_4px_24px_rgba(229,193,88,0.3)] hover:shadow-[0_6px_32px_rgba(229,193,88,0.5)] transform hover:-translate-y-0.5"
          >
            Subscribe Now
          </a>

          <button
            onClick={() => setIsDropsModalOpen(true)}
            className="w-full sm:w-auto px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-[#F5F2EB] bg-[#121216]/80 hover:bg-[#1C1C24] border border-[#C5A059]/40 hover:border-[#E5C158] rounded backdrop-blur-md transition-all shadow-md transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
          >
            <span>View Drops</span>
            <span className="text-[#E5C158] group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>

        {/* Collector Trust Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 pt-8 border-t border-[#2A2A32]/80 max-w-3xl w-full text-center">
          <div className="flex flex-col">
            <span className="font-mono text-xs text-[#8E8C85] uppercase tracking-wider">Prints Inside</span>
            <span className="font-serif-display text-lg text-[#F4F1EA] font-bold mt-0.5">5 Physical Items</span>
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-xs text-[#8E8C85] uppercase tracking-wider">Paper Quality</span>
            <span className="font-serif-display text-lg text-[#F4F1EA] font-bold mt-0.5">300 GSM Cotton</span>
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-xs text-[#8E8C85] uppercase tracking-wider">Starting Tier</span>
            <span className="font-serif-display text-lg text-[#E5C158] font-bold mt-0.5">₹459 / month</span>
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-xs text-[#8E8C85] uppercase tracking-wider">Delivery</span>
            <span className="font-serif-display text-lg text-[#F4F1EA] font-bold mt-0.5">Pan-India Express</span>
          </div>
        </div>

        {/* Subtle scroll down indicator */}
        <a
          href="#plans"
          className="mt-12 text-[#8E8C85] hover:text-[#E5C158] transition-colors p-2 animate-bounce"
          aria-label="Scroll to Subscription Plans"
        >
          <ArrowDown className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
};
export default Hero;
