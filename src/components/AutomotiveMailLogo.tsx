import React from 'react';

interface AutomotiveMailLogoProps {
  variant?: 'full' | 'compact' | 'stamp-only' | 'hero';
  className?: string;
  theme?: 'dark' | 'light';
}

/**
 * Automotive Mail Postage Stamp Logo
 * Exact visual recreation matching the official brand mark:
 * Perforated postage stamp badge with crimson-red ground, vintage Porsche 911 rear profile,
 * and high-contrast "AUTOMOTIVE MAIL" typography.
 */
export const AutomotiveMailLogo: React.FC<AutomotiveMailLogoProps> = ({
  variant = 'full',
  className = '',
  theme = 'dark'
}) => {
  // SVG Stamp Icon with perforated edge and 911 Carrera silhouette
  const StampGraphic = ({ size = 48, rotate = -4 }: { size?: number; rotate?: number }) => (
    <div 
      className="relative shrink-0 transition-transform duration-300 group-hover:rotate-0"
      style={{
        width: `${size}px`,
        height: `${size * 1.15}px`,
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <svg
        viewBox="0 0 100 115"
        className="w-full h-full drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="stampRedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A81B2B" />
            <stop offset="100%" stopColor="#7E111E" />
          </linearGradient>
          <filter id="stampShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Perforated stamp base paper (cream/off-white with scalloped edges) */}
        <path
          d="
            M 10 10
            Q 13 8 16 10 Q 19 8 22 10 Q 25 8 28 10 Q 31 8 34 10 Q 37 8 40 10 
            Q 43 8 46 10 Q 49 8 52 10 Q 55 8 58 10 Q 61 8 64 10 Q 67 8 70 10 
            Q 73 8 76 10 Q 79 8 82 10 Q 85 8 88 10 Q 91 8 94 10
            Q 96 13 94 16 Q 96 19 94 22 Q 96 25 94 28 Q 96 31 94 34 Q 96 37 94 40
            Q 96 43 94 46 Q 96 49 94 52 Q 96 55 94 58 Q 96 61 94 64 Q 96 67 94 70
            Q 96 73 94 76 Q 96 79 94 82 Q 96 85 94 88 Q 96 91 94 94 Q 96 97 94 100
            Q 96 103 94 106
            Q 91 108 88 106 Q 85 108 82 106 Q 79 108 76 106 Q 73 108 70 106 Q 67 108 64 106
            Q 61 108 58 106 Q 55 108 52 106 Q 49 108 46 106 Q 43 108 40 106 Q 37 108 34 106
            Q 31 108 28 106 Q 25 108 22 106 Q 19 108 16 106 Q 13 108 10 106
            Q 8 103 10 100 Q 8 97 10 94 Q 8 91 10 88 Q 8 85 10 82 Q 8 79 10 76
            Q 8 73 10 70 Q 8 67 10 64 Q 8 61 10 58 Q 8 55 10 52 Q 8 49 10 46
            Q 8 43 10 40 Q 8 37 10 34 Q 8 31 10 28 Q 8 25 10 22 Q 8 19 10 16
            Z
          "
          fill="#F5F2EB"
          stroke="#1E1E22"
          strokeWidth="1.5"
          filter="url(#stampShadow)"
        />

        {/* Inner carmine red stamp canvas */}
        <rect
          x="18"
          y="18"
          width="64"
          height="76"
          rx="1"
          fill="url(#stampRedGrad)"
        />

        {/* Thin gold framing line inside stamp */}
        <rect
          x="20.5"
          y="20.5"
          width="59"
          height="71"
          fill="none"
          stroke="#E5C158"
          strokeWidth="0.6"
          strokeOpacity="0.7"
        />

        {/* Iconic White Vintage Porsche 911 Rear Vector Linework */}
        <g transform="translate(23, 26)">
          {/* Ground shadow */}
          <ellipse cx="27" cy="55" rx="25" ry="4" fill="#3D060C" opacity="0.8" />
          <path d="M 5 56 L 49 56 L 44 60 L 10 60 Z" fill="#2A0408" opacity="0.6" />

          {/* Car body - white/cream */}
          <path
            d="
              M 8 50
              C 7 46, 8 40, 11 38
              C 14 36, 17 33, 20 22
              C 23 14, 27 12, 32 12
              C 37 12, 41 14, 44 22
              C 47 33, 50 36, 53 38
              C 56 40, 57 46, 56 50
              C 56 52, 53 53, 50 53
              L 14 53
              C 11 53, 8 52, 8 50
              Z
            "
            fill="#FFFFFF"
            stroke="#121214"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />

          {/* Roof & Rear Greenhouse Window */}
          <path
            d="
              M 22 22
              C 24 16, 27 14, 32 14
              C 37 14, 40 16, 42 22
              C 43 27, 44 32, 45 34
              L 19 34
              C 20 32, 21 27, 22 22
              Z
            "
            fill="#18181B"
            stroke="#121214"
            strokeWidth="1"
          />
          {/* Glass reflection streak */}
          <path d="M 27 16 L 31 32" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.4" strokeLinecap="round" />

          {/* Whale Tail Turbo Spoiler */}
          <path
            d="
              M 15 35
              L 49 35
              C 52 35, 54 36, 54 38
              L 52 40
              L 12 40
              L 10 38
              C 10 36, 12 35, 15 35
              Z
            "
            fill="#18181B"
            stroke="#121214"
            strokeWidth="1"
          />
          {/* Spoiler black rubber lip */}
          <path d="M 12 36 L 52 36" stroke="#2D2D32" strokeWidth="1.5" strokeLinecap="round" />

          {/* Rear Reflector / Continuous Tail Light Bar */}
          <rect x="14" y="42" width="36" height="3.5" rx="0.5" fill="#E11D48" stroke="#121214" strokeWidth="0.8" />
          <line x1="28" y1="42" x2="28" y2="45.5" stroke="#FFFFFF" strokeWidth="0.8" />
          <line x1="36" y1="42" x2="36" y2="45.5" stroke="#FFFFFF" strokeWidth="0.8" />

          {/* License plate recess & plate */}
          <rect x="23" y="47" width="18" height="4.5" rx="0.5" fill="#F4F4F5" stroke="#121214" strokeWidth="0.8" />
          <text x="32" y="50.6" fontSize="2.8" fontFamily="monospace" fontWeight="bold" fill="#18181B" textAnchor="middle">
            AM-911
          </text>

          {/* Rear Bumper & Twin Exhaust Pipes */}
          <ellipse cx="22" cy="53" rx="1.6" ry="1.2" fill="#27272A" stroke="#71717A" strokeWidth="0.6" />
          <ellipse cx="26" cy="53" rx="1.6" ry="1.2" fill="#27272A" stroke="#71717A" strokeWidth="0.6" />

          {/* Flared rear wheel arches & tires */}
          <path d="M 8 47 L 11 53 L 8 53 Z" fill="#18181B" />
          <path d="M 56 47 L 53 53 L 56 53 Z" fill="#18181B" />
          {/* Tire contact tread */}
          <rect x="8" y="51" width="3" height="3" rx="0.5" fill="#09090B" />
          <rect x="53" y="51" width="3" height="3" rx="0.5" fill="#09090B" />
        </g>

        {/* Vintage Postmark overlay stamp curve */}
        <path
          d="M 5 25 C 25 15, 75 35, 95 20"
          stroke="#E5C158"
          strokeWidth="0.75"
          strokeDasharray="2 2"
          strokeOpacity="0.4"
        />
      </svg>
    </div>
  );

  if (variant === 'stamp-only') {
    return <StampGraphic size={44} rotate={-3} />;
  }

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-3 group select-none ${className}`}>
        <StampGraphic size={36} rotate={-3} />
        <div className="flex flex-col tracking-tight">
          <span className="text-[17px] font-black tracking-[0.14em] font-serif uppercase text-[#F4F1EA] leading-none">
            Automotive
          </span>
          <span className="text-[13px] font-black italic tracking-[0.24em] uppercase text-[#C52233] leading-none mt-1">
            Mail
          </span>
        </div>
      </div>
    );
  }

  if (variant === 'hero') {
    return (
      <div className={`flex flex-col items-center text-center group select-none ${className}`}>
        <div className="mb-4">
          <StampGraphic size={88} rotate={-3} />
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-[0.16em] uppercase gold-gradient-text leading-none font-serif-display drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
            Automotive
          </h1>
          <span className="text-2xl sm:text-4xl lg:text-5xl font-black italic tracking-[0.28em] uppercase text-[#D82638] leading-none mt-2 drop-shadow-md">
            Mail
          </span>
        </div>
      </div>
    );
  }

  // Full default lockup
  return (
    <div className={`flex items-center gap-3.5 group select-none ${className}`}>
      <StampGraphic size={46} rotate={-3} />
      <div className="flex flex-col">
        <span
          className={`text-xl font-black tracking-[0.16em] uppercase font-serif leading-none ${
            theme === 'dark' ? 'text-[#F5F2EB]' : 'text-neutral-900'
          }`}
        >
          Automotive
        </span>
        <span className="text-[14px] font-black italic tracking-[0.26em] uppercase text-[#C52233] leading-none mt-1">
          Mail
        </span>
      </div>
    </div>
  );
};
export default AutomotiveMailLogo;
