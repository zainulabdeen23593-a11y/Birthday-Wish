/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles } from 'lucide-react';
import { LoveBurstParticle } from '../types';
import { AnimeStamp, SpeechBubble } from './AnimeTheme';

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
    <div id="section-landing" className="flex-1 flex flex-col justify-between items-center text-center animate-fade-slide-up relative overflow-hidden h-full min-h-0 py-1">
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

      <div className="space-y-1 z-10 relative shrink-0">
        <AnimeStamp text="EP 00" />
        <p className="text-[11px] tracking-wide text-rose-600 mt-1">Late gift</p>
        <h1 className="font-display text-[clamp(1.5rem,5vh,2.1rem)] text-[var(--spider-red)] tracking-wide">
          A late gift<br/>just <span className="marker-highlight text-[var(--spider-blue)]">spawned</span>
        </h1>
        <p className="text-xs text-violet-700 animate-pulse">
          Tap karo — hansi, aansu, pyaar
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center z-10 min-h-0">
        <div 
          onClick={triggerLoveBurst}
          className="relative group cursor-pointer select-none transition-all duration-300 hover:scale-[1.04] active:scale-95 ease-out"
        >
          <div className="absolute -inset-3 bg-gradient-to-tr from-cyan-300/35 to-fuchsia-300/35 rounded-full blur-2xl -z-10" />
          <div className="anime-cel p-1.5 flex flex-col items-center">
            <div className="w-[clamp(7.2rem,28vw,10rem)] h-[clamp(7.2rem,28vw,10rem)] overflow-hidden bg-violet-50 relative flex items-center justify-center">
              <img 
                src={peachGomaSrc}
                onError={onPeachGomaError}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                alt="Anime sticker"
              />
              <div className="absolute bottom-1.5 right-1.5 bg-white px-1.5 py-0.5 border-2 border-[var(--ink)] text-[10px] text-rose-700">
                ???
              </div>
            </div>
            <div className="mt-1 text-center">
              <span className="font-display text-lg text-[var(--spider-blue)] leading-none">
                Yeh kis ke liye hai?
              </span>
            </div>
          </div>
        </div>

        <SpeechBubble className="mt-3 z-10">
          <span className="text-xs font-bold text-violet-800 flex items-center gap-1.5 select-none">
            Bestie XP <span className="text-sm font-extrabold text-rose-600 font-mono tracking-wider">{loveCount}</span>
          </span>
        </SpeechBubble>
      </div>

      <div className="w-full px-2 z-10 relative shrink-0">
        <button 
          id="btn-landing-open"
          type="button"
          onClick={onNext}
          style={{ background: 'linear-gradient(90deg, #7c3aed, #22d3ee)', color: '#fff' }}
          className="w-full py-3 rounded-xl font-display tracking-wide text-base shadow-[4px_4px_0_#140c28] active:scale-95 transition-all text-center flex items-center justify-center gap-2 cursor-pointer border-[3px] border-[var(--ink)]"
        >
          <Sparkles className="w-5 h-5 animate-bounce" /> Episode kholo
        </button>
      </div>
    </div>
  );
};
