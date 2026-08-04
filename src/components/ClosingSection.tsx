/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, RefreshCw } from 'lucide-react';
import { LoveBurstParticle } from '../types';
import { TypewriterText } from './SubComponents';

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
  return (
    <div id="section-closing" className="flex-1 flex flex-col justify-between py-6 items-center text-center animate-fade-slide-up relative overflow-hidden h-full min-h-[500px]">
      
      {/* Tap-to-spawn hearts in this section too */}
      {/* hearts only on non-final slides */}
      {currentStoryIndex < storyParagraphs.length - 1 && (
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

      {/* Ambient drifting background decor */}
      {/* ambient drifting decor (avoid emoji on final slide) */}
      {currentStoryIndex < storyParagraphs.length - 1 && (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {[
            { id: 101, left: "10%", delay: "0s", dur: "8s", emoji: "🌸" },
            { id: 102, left: "90%", delay: "2s", dur: "9s", emoji: "💖" },
            { id: 103, left: "30%", delay: "4s", dur: "7s", emoji: "✨" },
            { id: 104, left: "70%", delay: "1s", dur: "10s", emoji: "🌸" },
          ].map(item => (
            <div 
              key={item.id}
              className="absolute animate-float opacity-30 text-glow-rose select-none"
              style={{
                left: item.left,
                top: "-20px",
                animation: `slowDrift ${item.dur} linear infinite`,
                animationDelay: item.delay,
              }}
            >
              <span className="text-sm">{item.emoji}</span>
            </div>
          ))}
        </div>
      )}

      {/* Header / Subtitle indicator */}
      {/* Top progress indicator bar */}
      <div className="space-y-1 z-10 relative px-4">
        <div className="text-rose-500/80 text-[10px] tracking-widest uppercase font-extrabold font-sans">
          {currentStoryIndex === storyParagraphs.length - 1 ? 'Letter for My Love' : '💝 Letter for My Love'}
        </div>
        <div className="flex items-center justify-center gap-1.5 text-xs text-rose-700 font-bold bg-rose-50/70 border border-pink-100/50 px-3 py-1 rounded-full shadow-sm backdrop-blur-[1px]">
          <span>Progress:</span>
          <span className="font-mono text-rose-800 font-extrabold underline decoration-rose-300">
            {currentStoryIndex + 1}
          </span>
          <span className="text-rose-400">/</span>
          <span className="font-mono text-rose-600">{storyParagraphs.length}</span>
        </div>
      </div>

      {/* Main Subtitle Box (Click/Tap card area to advance with hearts) */}
      <div className="flex-1 w-full flex items-center justify-center px-4 py-3 z-10">
        {/* Final slide special layout */}
        {currentStoryIndex === storyParagraphs.length - 1 ? (
          <div className="w-full bg-white/95 border-2 border-transparent rounded-3xl p-8 shadow-[0_12px_30px_rgba(0,0,0,0.06)] transition-all duration-500 select-none relative overflow-visible min-h-[360px] flex items-center justify-center">
            {/* Decorative frames: webs + flowers (non-overlapping) */}
            <img src="/spider-web.svg" alt="web" className="absolute left-6 top-6 w-28 h-28 opacity-10 pointer-events-none" />
            <img src="/spider-web.svg" alt="web" className="absolute right-6 top-6 w-28 h-28 opacity-10 pointer-events-none rotate-90" />
            <img src="/rose.svg" alt="rose" className="absolute left-8 bottom-8 w-20 h-20 opacity-95 pointer-events-none" />
            <img src="/daisy.svg" alt="daisy" className="absolute right-8 bottom-8 w-20 h-20 opacity-95 pointer-events-none" />

            <div className="mx-auto w-full max-w-[700px] px-6 py-6 font-script text-[18px] leading-relaxed text-[var(--spider-blue)] text-left" style={{ lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
              <TypewriterText key={`story-${currentStoryIndex}`} text={storyParagraphs[currentStoryIndex]} speed={8} />
            </div>
          </div>
        ) : (
          <div 
            onClick={(e) => {
              triggerLoveBurst(e);
              // Advance on tap if not at the end
              if (currentStoryIndex < storyParagraphs.length - 1) {
                setCurrentStoryIndex(prev => prev + 1);
              }
            }}
            className="w-full bg-white/95 border-2 border-pink-100 rounded-3xl p-6 shadow-[0_15px_40px_rgba(244,63,94,0.11)] hover:shadow-[0_20px_50px_rgba(244,63,94,0.16)] transition-all duration-300 hover:scale-[1.02] active:scale-98 cursor-pointer select-none flex flex-col justify-between relative overflow-hidden min-h-[310px]"
          >
          {/* Visual Ribbon Tape effect */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6.5 bg-pink-100/60 border border-pink-200/30 rounded-sm rotate-1 z-20 shadow-sm" />

          {/* Top dynamic fluid countdown progress bar */}
          <div className="w-full bg-pink-50 h-1.5 rounded-full overflow-hidden relative mb-4">
            <div 
              className="h-full bg-gradient-to-r from-rose-400 to-pink-500 rounded-full transition-all duration-100 ease-linear shadow-[0_0_8px_rgba(244,63,94,0.4)]"
              style={{ width: `${slideProgress}%` }}
            />
          </div>

          {/* Subtitle text content */}
          <div className="flex-1 flex items-center justify-center py-4">
            <p className={`font-serif-elegant tracking-wide leading-relaxed text-rose-950 font-bold drop-shadow-sm select-none transition-all duration-500 ${
              currentStoryIndex === 0 || currentStoryIndex >= 9
                ? "text-2xl text-rose-700 text-glow-rose font-semibold"
                : "text-base font-medium"
            }`}>
              <TypewriterText 
                key={currentStoryIndex} 
                text={storyParagraphs[currentStoryIndex]} 
                speed={currentStoryIndex === 0 || currentStoryIndex >= 9 ? 38 : 28} 
              />
            </p>
          </div>

          {/* Floating helpful action hint */}
            <div className="text-center mt-3 animate-pulse">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-pink-500/80 bg-rose-50/50 px-2.5 py-0.5 rounded-full border border-pink-100/30">
              {currentStoryIndex < storyParagraphs.length - 1 
                ? "Tap to send love & continue 💖" 
                : "You are my absolute everything"}
            </span>
          </div>
        </div>
        )}
      </div>

      {/* Media controls panel */}
      <div className="w-full px-6 space-y-4 z-10">
        <div className="flex items-center justify-center gap-4 bg-white/60 border border-pink-100 p-2 rounded-full shadow-sm backdrop-blur-sm max-w-[240px] mx-auto animate-fade-slide-up">
          {/* Back button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (currentStoryIndex > 0) {
                setCurrentStoryIndex(prev => prev - 1);
              }
            }}
            disabled={currentStoryIndex === 0}
            className="p-2.5 rounded-full bg-white border border-pink-100 text-rose-600 disabled:opacity-40 hover:bg-pink-50 active:scale-90 transition-all cursor-pointer shadow-sm disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-pink-300"
            aria-label="Previous line"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Play / Pause Toggle for Autoplay */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsPlaying(!isPlaying);
            }}
            className="p-3.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:from-rose-600 hover:to-pink-600 active:scale-95 transition-all shadow-md cursor-pointer flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-pink-300"
            aria-label={isPlaying ? "Pause autoplay" : "Play autoplay"}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-white text-white" />
            ) : (
              <Play className="w-4 h-4 fill-white text-white ml-0.5" />
            )}
          </button>

          {/* Forward button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (currentStoryIndex < storyParagraphs.length - 1) {
                setCurrentStoryIndex(prev => prev + 1);
              }
            }}
            disabled={currentStoryIndex === storyParagraphs.length - 1}
            className="p-2.5 rounded-full bg-white border border-pink-100 text-rose-600 disabled:opacity-40 hover:bg-pink-50 active:scale-90 transition-all cursor-pointer shadow-sm disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-pink-300"
            aria-label="Next line"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Final screen celebration elements & Replay Button */}
        <div className="pt-1 flex flex-col items-center gap-3">
          {currentStoryIndex === storyParagraphs.length - 1 && (
            <div className="flex justify-center mb-1 animate-bounce" role="img" aria-label="Love heart pulsing">
              <svg className="w-10 h-10 text-rose-500 fill-rose-500 drop-shadow-[0_0_12px_rgba(244,63,94,0.7)] animate-pulse" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
          )}
          
          <button
            type="button"
            onClick={restartApp}
            className="px-6 py-2.5 bg-white border-2 border-pink-200 hover:bg-pink-50 text-rose-700 font-semibold rounded-full text-[10px] tracking-widest uppercase active:scale-95 transition-all cursor-pointer flex items-center gap-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Replay Letter
          </button>
        </div>
      </div>

    </div>
  );
};
