/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { LoveBurstParticle } from '../types';
import { TypewriterText } from './SubComponents';
import { BESTIE_NAME } from '../utils';
import { AnimeStamp } from './AnimeTheme';

interface ClosingSectionProps {
  readonly homeHearts: readonly LoveBurstParticle[];
  readonly triggerLoveBurst: (e: React.MouseEvent<HTMLDivElement>) => void;
  readonly currentStoryIndex: number;
  readonly setCurrentStoryIndex: React.Dispatch<React.SetStateAction<number>>;
  readonly slideProgress: number;
  readonly isPlaying: boolean;
  readonly setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  readonly restartApp: () => void;
  readonly storyParagraphs: readonly string[];
}

export const ClosingSection: React.FC<ClosingSectionProps> = ({
  homeHearts,
  triggerLoveBurst,
  currentStoryIndex,
  setCurrentStoryIndex,
  slideProgress,
  isPlaying,
  setIsPlaying,
  restartApp,
  storyParagraphs,
}) => {
  const moods = ['funny', 'sad', 'love'] as const;
  const mood = moods[currentStoryIndex % 3];
  const isLast = currentStoryIndex === storyParagraphs.length - 1;

  return (
    <div id="section-closing" className="flex-1 flex flex-col justify-between items-center text-center animate-fade-slide-up relative overflow-hidden h-full min-h-0 gap-1">
      {!isLast && (
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
      )}

      <div className="space-y-0.5 z-10 relative px-2 shrink-0">
        <AnimeStamp text="LETTER" />
        <div className="text-violet-700 text-[10px] tracking-widest uppercase font-extrabold">
          For {BESTIE_NAME}
        </div>
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-700 font-bold bg-white/80 border-2 border-slate-900 px-2.5 py-0.5 rounded-full shadow-[2px_2px_0_#22d3ee]">
          <span className={`uppercase tracking-wider text-[9px] ${
            mood === 'funny' ? 'text-amber-500' : mood === 'sad' ? 'text-sky-600' : 'text-rose-500'
          }`}>{mood}</span>
          <span>EP</span>
          <span className="font-mono font-extrabold">{currentStoryIndex + 1}</span>
          <span className="text-slate-400">/</span>
          <span className="font-mono">{storyParagraphs.length}</span>
        </div>
      </div>

      <div className="flex-1 w-full flex items-center justify-center px-1 z-10 min-h-0">
        <div 
          onClick={(e) => {
            if (!isLast) {
              triggerLoveBurst(e);
              setCurrentStoryIndex(prev => prev + 1);
            }
          }}
          className={`w-full bg-white/95 border-2 border-slate-900 rounded-2xl p-3 shadow-[4px_4px_0_#f472b6] transition-all duration-300 ${isLast ? '' : 'cursor-pointer active:scale-[0.99]'} select-none flex flex-col justify-between relative overflow-hidden min-h-0 h-full`}
        >
          <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden relative mb-2 border border-slate-300 shrink-0">
            <div 
              className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full transition-all duration-100 ease-linear"
              style={{ width: `${slideProgress}%` }}
            />
          </div>

          <div className="flex-1 flex items-center justify-center min-h-0 overflow-hidden px-1">
            <p className={`tracking-wide leading-snug text-slate-900 font-bold select-none w-full ${
              currentStoryIndex === 0
                ? "font-display text-[clamp(2rem,8vh,3rem)] text-[var(--spider-red)]"
                : "text-[clamp(0.8rem,2.4vh,0.95rem)] font-semibold"
            }`}>
              <TypewriterText 
                key={currentStoryIndex} 
                text={storyParagraphs[currentStoryIndex]} 
                speed={currentStoryIndex === 0 ? 70 : 18} 
              />
            </p>
          </div>

          {!isLast && (
            <div className="text-center mt-1 animate-pulse shrink-0">
              <span className="text-[9px] uppercase tracking-wider font-extrabold text-violet-600 bg-cyan-50 px-2 py-0.5 rounded-full border border-slate-900">
                Tap for next feeling
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="w-full px-2 space-y-1.5 z-10 shrink-0">
        <div className="flex items-center justify-center gap-3 bg-white/80 border-2 border-slate-900 p-1.5 rounded-full shadow-[3px_3px_0_#22d3ee] max-w-[220px] mx-auto">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (currentStoryIndex > 0) setCurrentStoryIndex(prev => prev - 1);
            }}
            disabled={currentStoryIndex === 0}
            className="p-2 rounded-full bg-white border-2 border-slate-900 text-violet-700 disabled:opacity-40 active:scale-90 transition-all cursor-pointer disabled:pointer-events-none"
            aria-label="Previous line"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsPlaying(!isPlaying);
            }}
            className="p-2.5 rounded-full bg-gradient-to-r from-violet-600 to-cyan-400 text-white active:scale-95 transition-all cursor-pointer flex items-center justify-center border-2 border-slate-900"
            aria-label={isPlaying ? "Pause autoplay" : "Play autoplay"}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-white text-white" />
            ) : (
              <Play className="w-4 h-4 fill-white text-white ml-0.5" />
            )}
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (!isLast) setCurrentStoryIndex(prev => prev + 1);
            }}
            disabled={isLast}
            className="p-2 rounded-full bg-white border-2 border-slate-900 text-violet-700 disabled:opacity-40 active:scale-90 transition-all cursor-pointer disabled:pointer-events-none"
            aria-label="Next line"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={restartApp}
          className="mx-auto px-5 py-1.5 bg-white border-2 border-slate-900 text-slate-800 font-display rounded-full text-xs tracking-wide active:scale-95 transition-all cursor-pointer shadow-[2px_2px_0_#f472b6] block"
        >
          Replay phir se
        </button>
      </div>
    </div>
  );
};
