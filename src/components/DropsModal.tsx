import React, { useState } from 'react';
import { useAutomotiveMail } from '../context/AutomotiveMailContext';
import { DROPS_CATALOG, DropItem } from '../data/automotiveMailData';
import { X, Sparkles, Image as ImageIcon, Compass, BookOpen, FileText, Camera, Check } from 'lucide-react';
import heroCarImg from '../assets/images/hero_automotive_mail_1791615857706.jpg';
import aircraftImg from '../assets/images/mosaic_vintage_aircraft_1791615916243.jpg';
import racecarImg from '../assets/images/legendary_subject_racecar_1791615873936.jpg';

export const DropsModal: React.FC = () => {
  const { isDropsModalOpen, setIsDropsModalOpen, subscribeNow } = useAutomotiveMail();
  const [selectedDrop, setSelectedDrop] = useState<DropItem>(DROPS_CATALOG[0]);
  const [activeTab, setActiveTab] = useState<'poster' | 'blueprint' | 'magazine' | 'letter' | 'polaroids'>('poster');

  if (!isDropsModalOpen) return null;

  const getDropImage = (dropId: string) => {
    switch (dropId) {
      case 'drop-01':
        return heroCarImg;
      case 'drop-02':
        return aircraftImg;
      case 'drop-03':
        return racecarImg;
      case 'drop-04':
        return aircraftImg;
      default:
        return heroCarImg;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#0F0F14] border border-[#2B2B38] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header bar */}
        <div className="px-6 py-4 border-b border-[#22222E] flex items-center justify-between bg-[#121218]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#E5C158]">
              Automotive Mail Archive
            </span>
            <span className="text-[#444]">/</span>
            <span className="text-xs text-[#8E8C85] font-mono">Curated Physical Dispatches</span>
          </div>

          <button
            onClick={() => setIsDropsModalOpen(false)}
            className="p-1.5 rounded-lg text-[#8E8C85] hover:text-white hover:bg-[#1E1E28] transition-colors"
            aria-label="Close drops gallery"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-8 flex-1">
          {/* Drop Selector Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {DROPS_CATALOG.map((drop) => {
              const isSelected = selectedDrop.id === drop.id;
              return (
                <button
                  key={drop.id}
                  onClick={() => {
                    setSelectedDrop(drop);
                    setActiveTab('poster');
                  }}
                  className={`p-3 text-left rounded-lg border transition-all ${
                    isSelected
                      ? 'bg-[#181822] border-[#E5C158] shadow-[0_0_20px_-5px_rgba(229,193,88,0.3)]'
                      : 'bg-[#121217] border-[#22222C] hover:border-[#333340]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono text-[#E5C158] font-bold">
                      {drop.number}
                    </span>
                    <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 bg-[#20202A] text-[#8E8C85] rounded">
                      {drop.category}
                    </span>
                  </div>
                  <div className="text-xs font-bold font-serif-display text-white line-clamp-1">
                    {drop.title}
                  </div>
                  <div className="text-[10px] text-[#8E8C85] font-mono mt-0.5 line-clamp-1">
                    {drop.era}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Featured Drop Display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-[#121218] border border-[#22222E] rounded-xl p-6">
            {/* Visual Preview Left */}
            <div className="lg:col-span-6 flex flex-col">
              <div className="relative rounded-lg overflow-hidden bg-black border border-[#282836] aspect-[4/3] shadow-xl">
                <img
                  src={getDropImage(selectedDrop.id)}
                  alt={selectedDrop.title}
                  className="w-full h-full object-cover filter brightness-95"
                />

                {/* Badge Overlay */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/80 border border-[#C5A059]/40 text-[10px] font-mono text-[#E5C158] tracking-widest uppercase backdrop-blur-md">
                  {selectedDrop.badge}
                </div>

                <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded bg-black/75 backdrop-blur-md border border-[#22222A] text-xs">
                  <div className="font-mono text-[10px] text-[#8E8C85] uppercase tracking-wider">
                    Mechanical Specification
                  </div>
                  <div className="font-mono text-white text-[11px] font-semibold mt-0.5">
                    {selectedDrop.specs}
                  </div>
                </div>
              </div>

              {/* 5-Artifact Interactive Tab Switcher */}
              <div className="flex items-center gap-1.5 mt-4 p-1 bg-[#0A0A0E] rounded-lg border border-[#1E1E28] overflow-x-auto">
                <button
                  onClick={() => setActiveTab('poster')}
                  className={`px-3 py-1.5 rounded text-[11px] font-medium transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                    activeTab === 'poster' ? 'bg-[#E5C158] text-black font-bold' : 'text-[#8E8C85] hover:text-white'
                  }`}
                >
                  <ImageIcon className="w-3 h-3" />
                  <span>Hero Poster</span>
                </button>
                <button
                  onClick={() => setActiveTab('blueprint')}
                  className={`px-3 py-1.5 rounded text-[11px] font-medium transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                    activeTab === 'blueprint' ? 'bg-[#E5C158] text-black font-bold' : 'text-[#8E8C85] hover:text-white'
                  }`}
                >
                  <Compass className="w-3 h-3" />
                  <span>Blueprint</span>
                </button>
                <button
                  onClick={() => setActiveTab('magazine')}
                  className={`px-3 py-1.5 rounded text-[11px] font-medium transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                    activeTab === 'magazine' ? 'bg-[#E5C158] text-black font-bold' : 'text-[#8E8C85] hover:text-white'
                  }`}
                >
                  <BookOpen className="w-3 h-3" />
                  <span>Magazine</span>
                </button>
                <button
                  onClick={() => setActiveTab('letter')}
                  className={`px-3 py-1.5 rounded text-[11px] font-medium transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                    activeTab === 'letter' ? 'bg-[#E5C158] text-black font-bold' : 'text-[#8E8C85] hover:text-white'
                  }`}
                >
                  <FileText className="w-3 h-3" />
                  <span>Letter</span>
                </button>
                <button
                  onClick={() => setActiveTab('polaroids')}
                  className={`px-3 py-1.5 rounded text-[11px] font-medium transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                    activeTab === 'polaroids' ? 'bg-[#E5C158] text-black font-bold' : 'text-[#8E8C85] hover:text-white'
                  }`}
                >
                  <Camera className="w-3 h-3" />
                  <span>Polaroids</span>
                </button>
              </div>
            </div>

            {/* Drop Detail Right */}
            <div className="lg:col-span-6 flex flex-col justify-between h-full">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#C5A059] block mb-1">
                  {selectedDrop.era}
                </span>

                <h3 className="text-2xl sm:text-3xl font-black font-serif-display uppercase text-white mb-3">
                  {selectedDrop.title}
                </h3>

                <p className="text-sm font-editorial text-[#D8D6CE] leading-relaxed mb-6">
                  {selectedDrop.description}
                </p>

                {/* Tab Context Card */}
                <div className="p-4 rounded-lg bg-[#0A0A0E] border border-[#20202A] mb-6">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#E5C158] uppercase tracking-wider mb-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Included Artifact Detail ({activeTab.toUpperCase()})</span>
                  </div>

                  {activeTab === 'poster' && (
                    <div className="text-xs text-[#D8D6CE] space-y-1">
                      <div className="font-semibold text-white">A3 Archival Cotton Hero Poster</div>
                      <div>{selectedDrop.heroPosterNote}</div>
                      <div className="text-[11px] text-[#8E8C85] font-mono">Dimensions: 297 × 420 mm · 300 GSM Heavyweight</div>
                    </div>
                  )}

                  {activeTab === 'blueprint' && (
                    <div className="text-xs text-[#D8D6CE] space-y-1">
                      <div className="font-semibold text-white">Technical Schematic Blueprint</div>
                      <div>{selectedDrop.blueprintNote}</div>
                      <div className="text-[11px] text-[#8E8C85] font-mono">Factory chassis tolerances · Authentic millimeter scale</div>
                    </div>
                  )}

                  {activeTab === 'magazine' && (
                    <div className="text-xs text-[#D8D6CE] space-y-1">
                      <div className="font-semibold text-white">Vintage Era Editorial Cover</div>
                      <div>{selectedDrop.magazineTitle}</div>
                      <div className="text-[11px] text-[#8E8C85] font-mono">Original typography & authentic period advertising tone</div>
                    </div>
                  )}

                  {activeTab === 'letter' && (
                    <div className="text-xs text-[#D8D6CE] space-y-1">
                      <div className="font-semibold text-white">Collector's Archival Story Letter</div>
                      <div className="font-editorial italic">"{selectedDrop.letterSnippet}"</div>
                      <div className="text-[11px] text-[#8E8C85] font-mono">Researched historical narrative on textured stationery</div>
                    </div>
                  )}

                  {activeTab === 'polaroids' && (
                    <div className="text-xs text-[#D8D6CE] space-y-1">
                      <div className="font-semibold text-white">3× High-Gloss Mini Polaroids</div>
                      <div>Archival snapshots from paddock pits, flight lines, and design studio clay mockups.</div>
                      <div className="text-[11px] text-[#8E8C85] font-mono">Classic 88 × 107 mm retro border format</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#1E1E28] flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsDropsModalOpen(false);
                    subscribeNow(selectedDrop.category === 'car' ? 'cars' : 'planes');
                  }}
                  className="w-full sm:flex-1 py-3 px-4 rounded text-xs font-bold uppercase tracking-[0.16em] bg-gradient-to-r from-[#F4E3B2] via-[#E5C158] to-[#C5A059] hover:from-white hover:to-[#D4AF37] text-black transition-all shadow-md text-center cursor-pointer"
                >
                  Subscribe to Receive This Drop
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsDropsModalOpen(false);
                    subscribeNow('both');
                  }}
                  className="w-full sm:w-auto py-3 px-4 rounded text-xs font-bold uppercase tracking-[0.16em] bg-[#181822] hover:bg-[#22222E] border border-[#2E2E3E] text-[#E6E4DF] transition-all whitespace-nowrap cursor-pointer"
                >
                  Get Both Worlds (₹759)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DropsModal;
