/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BESTIE_NAME, getNoResponse } from '../utils';
import { ImpactBurst, AnimeStamp } from './AnimeTheme';

interface QuestionSectionProps {
  readonly yesScale: number;
  readonly noScale: number;
  readonly clickNoCount: number;
  readonly isNoModalOpen: boolean;
  readonly setIsNoModalOpen: (open: boolean) => void;
  readonly handleNoClick: () => void;
  readonly onYes: () => void;
}

export const QuestionSection: React.FC<QuestionSectionProps> = ({
  yesScale,
  noScale,
  clickNoCount,
  isNoModalOpen,
  setIsNoModalOpen,
  handleNoClick,
  onYes,
}) => {
  const noLine = getNoResponse(clickNoCount);

  return (
    <div id="section-question" className="flex-1 flex flex-col justify-between items-center text-center animate-fade-slide-up relative min-h-0 h-full py-1">
      <ImpactBurst />
      <div className="flex-1 flex flex-col items-center justify-center gap-3 min-h-0">
        <div className="relative group select-none">
          <div className="w-[clamp(5.5rem,18vh,7.5rem)] h-[clamp(5.5rem,18vh,7.5rem)] rounded-full border-4 border-slate-900 overflow-hidden bg-white shadow-[4px_4px_0_#fbbf24] flex items-center justify-center p-1 relative z-10">
            <img 
              src="/question-sticker.gif" 
              className="w-full h-full object-cover rounded-full"
              referrerPolicy="no-referrer"
              alt="Anime reaction sticker"
            />
          </div>
        </div>

        <div className="space-y-1 px-2 relative z-10">
          <AnimeStamp text="BESTIE" />
          <p className="text-[11px] tracking-wide text-rose-600">Naam khul gaya</p>
          <h2 className="font-display text-[clamp(2.4rem,8vh,3.5rem)] text-[var(--spider-red)] animate-headline-arrive relative z-10 leading-none">
            {BESTIE_NAME}!
          </h2>
          <p className="text-sm font-semibold text-slate-700 leading-snug max-w-xs mx-auto">
            Itna late birthday raid accept karegi?
          </p>
          <p className="text-[11px] text-violet-700">
            Bestu-besti mein to aisa chalta hai.
          </p>
        </div>
      </div>

      <div className="w-full flex items-center justify-center gap-3 px-3 shrink-0 min-h-[72px]">
        <div style={{ transform: `scale(${Math.min(yesScale, 1.6)})` }} className="transition-all duration-300 origin-center">
            <button
            type="button"
            onClick={onYes}
            className="py-2.5 px-5 rounded-xl font-display text-base shadow-[3px_3px_0_#0f172a] active:scale-95 transition-all cursor-pointer border-2 border-slate-900 whitespace-nowrap text-white"
            style={{ background: 'linear-gradient(90deg, #7c3aed, #22d3ee)' }}
          >
            YES! Haan
          </button>
        </div>
        <div style={{ transform: `scale(${noScale})` }} className="transition-all duration-300 origin-center">
            <button
            type="button"
            onClick={handleNoClick}
            className="py-2.5 px-5 bg-white border-[3px] border-[var(--ink)] text-slate-800 rounded-xl font-semibold transition-all active:scale-95 cursor-pointer shadow-[3px_3px_0_#f472b6] whitespace-nowrap"
          >
            NO Nahi
          </button>
        </div>
      </div>

      {isNoModalOpen && (
        <div className="absolute inset-0 bg-white/95 backdrop-blur-sm border-4 border-slate-900 flex flex-col items-center justify-center p-4 z-40 animate-fade-slide-up text-center overflow-hidden">
          <div className="w-24 h-24 rounded-full border-4 border-slate-900 overflow-hidden bg-white shadow-[4px_4px_0_#fb7185] flex items-center justify-center p-1 mb-3">
            <img 
              src="/pouting-sticker.gif" 
              className="w-full h-full object-cover rounded-full"
              referrerPolicy="no-referrer"
              alt="Pouting anime sticker"
            />
          </div>
          <span className={`text-[10px] font-black tracking-widest uppercase mb-1 ${
            noLine.mood === 'funny' ? 'text-amber-500' : noLine.mood === 'sad' ? 'text-sky-600' : 'text-rose-500'
          }`}>
            {noLine.mood} episode
          </span>
          <h3 className="text-2xl font-display text-slate-900 tracking-wide">
            {noLine.title}
          </h3>
          <p className="text-slate-700 mt-2 max-w-xs text-sm font-semibold leading-snug px-3">
            {noLine.body}
          </p>
          <button
            type="button"
            onClick={() => setIsNoModalOpen(false)}
            className="mt-4 px-6 py-2.5 bg-gradient-to-r from-violet-600 to-cyan-400 text-white rounded-xl font-display text-base shadow-[3px_3px_0_#0f172a] active:scale-95 transition-all cursor-pointer border-2 border-slate-900"
          >
            Theek hai, chalo
          </button>
        </div>
      )}
    </div>
  );
};
