/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles } from 'lucide-react';
import { ConfettiParticle, BalloonState } from '../types';
import { BESTIE_NAME } from '../utils';
import { ImpactBurst, AnimeStamp } from './AnimeTheme';

interface CelebrationSectionProps {
  readonly confetti: readonly ConfettiParticle[];
  readonly balloons: readonly BalloonState[];
  readonly onNext: () => void;
}

export const CelebrationSection: React.FC<CelebrationSectionProps> = ({
  confetti,
  balloons,
  onNext,
}) => {
  return (
    <div id="section-celebration" className="flex-1 flex flex-col justify-between py-2 items-center text-center relative overflow-hidden min-h-0 h-full">
      <div className="speed-lines" aria-hidden="true" />
      <ImpactBurst />

      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {confetti.map(p => (
          <div 
            key={p.id}
            className="absolute rounded"
            style={{
              left: p.left,
              top: '-15px',
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              animationName: 'confettiFall',
              animationDuration: p.duration,
              animationTimingFunction: 'linear',
              animationFillMode: 'forwards',
              animationDelay: p.delay,
              transform: `rotate(${p.rotation})`
            }}
          />
        ))}

        {balloons.map(b => (
          <div 
            key={b.id}
            className="absolute bottom-0 flex flex-col items-center"
            style={{
              left: b.left,
              animationName: 'float',
              animationDuration: b.duration,
              animationTimingFunction: 'linear',
              animationFillMode: 'forwards',
              animationDelay: b.delay,
            }}
          >
            <div 
              className="rounded-full shadow-lg relative flex items-center justify-center border-2 border-slate-900"
              style={{
                width: b.size,
                height: `calc(${b.size} * 1.2)`,
                backgroundColor: b.color,
                borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%'
              }}
            >
              <div className="w-1.5 h-3 bg-white/30 absolute top-3 left-4 rounded-full blur-[1px]" />
            </div>
            <div 
              className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] -mt-[2px]" 
              style={{ borderBottomColor: b.color }}
            />
            <svg className="w-4 h-16 -mt-[2.5px] text-slate-400/50" viewBox="0 0 20 60" fill="none">
              <path d="M 10 0 Q 15 15, 10 30 T 10 60" stroke="currentColor" strokeWidth="1.5" className="animate-pulse" />
            </svg>
          </div>
        ))}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-3 z-20 px-4 min-h-0">
        <div className="w-12 h-12 animate-spin shrink-0" style={{ animationDuration: '6s', color: '#22d3ee' }}>
          <Sparkles className="w-full h-full text-glow-rose" />
        </div>

        <div className="space-y-1 relative">
          <AnimeStamp text="BIRTHDAY" />
          <p className="text-[11px] tracking-wide text-rose-600">Late hai, dil nahi</p>
          <h1 className="font-display text-[clamp(2rem,7vh,3rem)] text-[var(--spider-red)] animate-bounce leading-none">
            Happy (late)<br/>Birthday
          </h1>
          <p className="font-display text-[clamp(1.6rem,5vh,2.2rem)] text-[#7c3aed] drop-shadow-[3px_3px_0_#140c28]">{BESTIE_NAME}!</p>
          <p className="text-slate-700 text-sm mt-2 leading-snug max-w-xs mx-auto font-medium">
            Bestu late aaya. Bestu phir bhi aaya.
          </p>
        </div>
      </div>

      <button 
        type="button"
        onClick={onNext}
        className="px-6 py-2 bg-white rounded-full text-xs text-slate-800 font-black tracking-wider z-20 active:scale-95 transition-all cursor-pointer shadow-[3px_3px_0_#0f172a] border-2 border-slate-900 shrink-0"
      >
        SKIP ➔
      </button>
    </div>
  );
};
