import React from 'react';
import { AutomotiveMailLogo } from './AutomotiveMailLogo';
import { useAutomotiveMail } from '../context/AutomotiveMailContext';
import { Mail, MapPin, Instagram, Youtube, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setIsDropsModalOpen, subscribeNow } = useAutomotiveMail();

  return (
    <footer className="relative bg-[#060608] border-t border-[#1C1C22] text-[#B5B3AD] pt-20 pb-12">
      {/* Background grain */}
      <div className="absolute inset-0 archival-grain opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Col 1 & 2: Logo + Tagline + Subscribe CTA */}
          <div className="lg:col-span-2 space-y-6">
            <AutomotiveMailLogo variant="full" />

            <p className="text-sm font-editorial italic text-[#D8D6CE] max-w-sm leading-relaxed">
              Automotive Mail is a premium monthly subscription service delivering physical museum-grade art prints of iconic cars and aircraft to collectors across India.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => subscribeNow('both')}
                className="inline-flex items-center px-6 py-3 rounded text-xs font-bold uppercase tracking-[0.16em] text-[#0A0A0C] bg-gradient-to-r from-[#F4E3B2] via-[#E5C158] to-[#C5A059] hover:from-[#FFFFFF] hover:to-[#D4AF37] transition-all shadow-[0_4px_16px_rgba(229,193,88,0.25)] cursor-pointer"
              >
                Subscribe Now — From ₹459/mo
              </button>
            </div>

            <div className="flex items-center gap-3 pt-2 text-xs font-mono text-[#8E8C85]">
              <MapPin className="w-4 h-4 text-[#C5A059] shrink-0" />
              <span>Curated in Mumbai & Bengaluru · Dispatched Pan-India</span>
            </div>
          </div>

          {/* Col 3: Navigation Links */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#F4F1EA] mb-4 font-bold">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="#drops"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsDropsModalOpen(true);
                  }}
                  className="hover:text-[#F3E5AB] transition-colors"
                >
                  View Archive Drops
                </a>
              </li>
              <li>
                <a href="#plans" className="hover:text-[#F3E5AB] transition-colors">
                  Subscription Plans
                </a>
              </li>
              <li>
                <a href="#subject" className="hover:text-[#F3E5AB] transition-colors">
                  The Legendary Subject
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-[#F3E5AB] transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#guarantee" className="hover:text-[#F3E5AB] transition-colors">
                  The Quality Guarantee
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#F3E5AB] transition-colors">
                  FAQ & Inquiries
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Subscription Tiers */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#F4F1EA] mb-4 font-bold">
              Subscription Tiers
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#plans" className="hover:text-[#F3E5AB] transition-colors flex items-center justify-between">
                  <span>Cars Only</span>
                  <span className="font-mono text-[#E5C158]">₹459/mo</span>
                </a>
              </li>
              <li>
                <a href="#plans" className="hover:text-[#F3E5AB] transition-colors flex items-center justify-between">
                  <span>Planes Only</span>
                  <span className="font-mono text-[#E5C158]">₹459/mo</span>
                </a>
              </li>
              <li>
                <a href="#plans" className="hover:text-[#F3E5AB] transition-colors flex items-center justify-between font-semibold text-white">
                  <span>Both Worlds</span>
                  <span className="font-mono text-[#E5C158]">₹759/mo</span>
                </a>
              </li>
              <li className="pt-2 text-[11px] text-[#8E8C85]">
                Includes 5 physical pieces: Hero poster, blueprint, magazine cover, story letter, & polaroids.
              </li>
            </ul>
          </div>

          {/* Col 5: Social Icons & Direct Connect */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#F4F1EA] mb-4 font-bold">
              Connect & Follow
            </h4>
            <div className="flex items-center gap-3 mb-6">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded bg-[#121216] border border-[#23232C] hover:border-[#C5A059] flex items-center justify-center text-[#D8D6CE] hover:text-[#E5C158] transition-colors"
                aria-label="Follow Automotive Mail on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              {/* X (Twitter) */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded bg-[#121216] border border-[#23232C] hover:border-[#C5A059] flex items-center justify-center text-[#D8D6CE] hover:text-[#E5C158] transition-colors"
                aria-label="Follow Automotive Mail on X"
              >
                <Twitter className="w-4 h-4" />
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded bg-[#121216] border border-[#23232C] hover:border-[#C5A059] flex items-center justify-center text-[#D8D6CE] hover:text-[#E5C158] transition-colors"
                aria-label="Follow Automotive Mail on YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>

            <div className="space-y-1.5 text-xs">
              <span className="text-[#8E8C85] text-[11px] block font-mono uppercase">Direct Concierge</span>
              <a
                href="mailto:ask.automotivemail@gmail.com"
                className="text-[#E5C158] hover:underline font-mono text-[11px] break-all block"
              >
                ask.automotivemail@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Legal Links & Copyright Strip */}
        <div className="pt-8 border-t border-[#1A1A22] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#8E8C85]">
          <div className="flex items-center gap-2">
            <span>© 2026 Automotive Mail. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a href="#faq" className="hover:text-[#D8D6CE] transition-colors">
              Privacy Policy
            </a>
            <a href="#faq" className="hover:text-[#D8D6CE] transition-colors">
              Terms of Service
            </a>
            <a href="#faq" className="hover:text-[#D8D6CE] transition-colors">
              Shipping Policy (India)
            </a>
            <a href="mailto:ask.automotivemail@gmail.com" className="hover:text-[#D8D6CE] transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
