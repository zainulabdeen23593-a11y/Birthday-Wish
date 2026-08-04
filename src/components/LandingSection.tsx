/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Gift } from 'lucide-react';
import { LoveBurstParticle } from '../types';
import { HeadingFlourish } from './SubComponents';

interface LandingSectionProps {
  readonly loveCount: number;
  readonly homeHearts: readonly LoveBurstParticle[];
  readonly peachGomaSrc: string;
  readonly onPeachGomaError: () => void;
  readonly triggerLoveBurst: (e: React.MouseEvent<HTMLDivElement>) => void;
  readonly onNext: () => void;
}

export const LandingSection: React.FC<LandingSectionProps> = ({
  loveCount,
  homeHearts,
  peachGomaSrc,
  onPeachGomaError,
  triggerLoveBurst,
  onNext,
}) => {
  return (
    <div id="section-landing" className="flex-1 flex flex-col justify-between py-6 items-center text-center animate-fade-slide-up relative overflow-hidden h-full">
      {/* decorative overlays for consistent theme */}
      <img src="/spider-web.svg" alt="web" className="absolute top-4 left-4 w-24 h-24 opacity-10 pointer-events-none" />
      <img src="/rose.svg" alt="rose" className="absolute bottom-6 right-8 w-16 h-16 opacity-95 pointer-events-none" />
      
      {/* Background floating decor cherry blossoms/hearts for lovely mood */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {[
          { id: 1, left: "8%", delay: "0s", dur: "7s", emoji: "🌸", size: "text-lg" },
          { id: 2, left: "88%", delay: "1.5s", dur: "8s", emoji: "💖", size: "text-md" },
          { id: 3, left: "22%", delay: "3s", dur: "6s", emoji: "✨", size: "text-sm" },
          { id: 4, left: "78%", delay: "4.5s", dur: "9s", emoji: "🌸", size: "text-lg" },
          { id: 5, left: "48%", delay: "2.2s", dur: "7.5s", emoji: "🎈", size: "text-md" },
        ].map(item => (
          <div 
            key={item.id}
            className="absolute animate-float opacity-45 text-glow-rose select-none"
            style={{
              left: item.left,
              top: "-20px",
              animation: `slowDrift ${item.dur} linear infinite`,
              animationDelay: item.delay,
            }}
          >
            <span className={item.size}>{item.emoji}</span>
          </div>
        ))}
      </div>

      {/* Tap-to-spawn particles container */}
      <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
        {homeHearts.map(h => (
          <span 
            key={h.id}
            className="absolute animate-float-up-fade text-glow-rose select-none"
            style={{
              left: `${h.x}%`,
              top: `${h.y}%`,
              transform: `scale(${h.scale}) rotate(${h.rot}deg)`,
            }}
          >
            {h.emoji}
          </span>
        ))}
      </div>

      {/* Header section */}
      <div className="space-y-2 mt-4 z-10 relative">
        <h1 className="font-display text-3xl md:text-4xl text-[var(--spider-red)] tracking-wide font-medium">
          A little <span className="marker-highlight text-[var(--spider-blue)]">something</span><br/>for you
        </h1>
        <HeadingFlourish />
        <p className="text-xs font-semibold text-rose-500/80 uppercase tracking-widest animate-pulse">
          Click the sticker to send love! ✨
        </p>
      </div>

      {/* Central Aesthetic Peach & Goma Polaroid Card */}
      <div className="flex-1 flex flex-col items-center justify-center z-10 py-4">
        <div 
          onClick={triggerLoveBurst}
          className="relative group cursor-pointer select-none transition-all duration-300 hover:scale-[1.06] active:scale-95 ease-out animate-float"
        >
          {/* Custom glowing backdrop */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-pink-300/35 to-rose-300/35 rounded-full blur-2xl group-hover:scale-110 transition-all duration-500 -z-10" />

          {/* Polaroid Tape Effect */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-14 h-5.5 bg-pink-100/75 border border-pink-200/50 rounded-sm rotate-2 z-30 shadow-sm backdrop-blur-[0.5px]" />

          {/* Polaroid Card Frame */}
          <div className="p-3 bg-white border border-pink-150 rounded-2xl shadow-[0_12px_30px_rgba(244,63,94,0.12)] flex flex-col items-center">
            
            {/* Photo area with fallback support */}
            <div className="w-44 h-44 rounded-xl overflow-hidden bg-rose-50 border border-pink-100 relative flex items-center justify-center shadow-inner">
              <img 
                src={peachGomaSrc}
                onError={onPeachGomaError}
                className="w-full h-full object-cover rounded-xl"
                referrerPolicy="no-referrer"
                alt="Peach Goma Sticker"
              />
              
              {/* Tiny watermark heart in bottom right */}
              <div className="absolute bottom-2 right-2 bg-white/70 backdrop-blur-sm p-1 rounded-full border border-pink-200">
                <svg className="w-3 h-3 text-rose-500 fill-rose-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
            </div>

            {/* Caption line */}
            <div className="mt-2 text-center">
                  <span className="font-script text-2xl text-[var(--spider-blue)] font-semibold leading-none drop-shadow-sm">
                    Peach & Goma
                  </span>
                </div>
          </div>
        </div>

        {/* Dynamic Love Counter display */}
        <div className="mt-4 px-4 py-1.5 bg-white/60 border border-pink-100 rounded-full shadow-sm backdrop-blur-sm z-10 transition-all duration-300 transform scale-100 hover:scale-105">
          <span className="text-xs font-bold text-rose-600 flex items-center gap-1.5 select-none">
            💖 Love Counter: <span className="text-sm font-extrabold text-rose-700 underline decoration-pink-300 font-mono tracking-wider">{loveCount}</span>
          </span>
        </div>
      </div>

      {/* Bottom buttons & open trigger */}
      <div className="w-full px-6 space-y-3 z-10 relative">
        <button 
          id="btn-landing-open"
          type="button"
          onClick={onNext}
          style={{ background: 'linear-gradient(90deg, var(--spider-red), var(--accent-pink))', color: '#fff' }}
          className="w-full py-4 rounded-xl font-medium shadow-lg active:scale-95 transition-all text-center flex items-center justify-center gap-2 cursor-pointer border-2 border-[var(--accent-pink)] animate-pulse"
        >
          <Gift className="w-5 h-5 animate-bounce" /> Tap to open note
        </button>
      </div>
    </div>
  );
};
