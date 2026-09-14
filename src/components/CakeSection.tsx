/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CandleState } from '../types';
import { BESTIE_NAME } from '../utils';

interface CakeSectionProps {
  readonly candles: readonly CandleState[];
  readonly blowCandle: (id: number) => void;
  readonly blowAllCandles: () => void;
}

export const CakeSection: React.FC<CakeSectionProps> = ({
  candles,
  blowCandle,
  blowAllCandles,
}) => {
  return (
    <div id="section-cake" className="flex-1 flex flex-col justify-between py-1 items-center text-center animate-fade-slide-up relative min-h-0 h-full">
      <div className="space-y-1 pt-1 shrink-0">
        <h2 className="font-display text-[clamp(1.25rem,4vh,1.75rem)] text-[var(--spider-red)]">Wish maango, {BESTIE_NAME}...</h2>
        <p className="text-[11px] text-violet-700 font-medium max-w-xs mx-auto px-3">
          Late hai, wish asli hai. Tap karke bujhao.
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center w-full relative min-h-0 scale-[0.72] sm:scale-[0.85] origin-center">
        <div className="absolute w-56 h-56 rounded-full blur-3xl -z-10" style={{ backgroundColor: 'rgba(34,211,238,0.2)' }} />

        <div className="flex justify-center gap-5 items-end mb-1 z-10">
          {candles.map((candle, idx) => (
            <div 
               key={candle.id} 
               onClick={() => blowCandle(candle.id)}
               className="flex flex-col items-center cursor-pointer group relative"
               style={{ transform: `translateY(${idx % 2 === 0 ? '0px' : '6px'})` }}
            >
              <div className="h-10 relative flex items-end justify-center w-6">
                {candle.lit ? (
                  <div className="relative">
                    <div className={`w-3 h-7 bg-amber-100 rounded-full animate-flicker-${candle.id} absolute bottom-0 -left-1.5 origin-bottom animate-pulse-glow`}>
                      <div className="w-5 h-8 bg-orange-400 rounded-full opacity-60 absolute -top-1.5 -left-1 origin-bottom blur-[1.5px]" />
                      <div className="w-7 h-9 bg-fuchsia-400 rounded-full opacity-35 absolute -top-2 -left-2 origin-bottom blur-[3px]" />
                      <div className="absolute -top-3 -left-3 w-9 h-9 bg-amber-400/15 rounded-full blur-md animate-ping opacity-20" style={{ animationDuration: '3s' }} />
                    </div>
                  </div>
                ) : (
                  candle.smoked && (
                    <div className="absolute bottom-0 w-1 h-1">
                      {candle.smokeParticles.map(p => (
                        <div 
                          key={p.id}
                          className="absolute rounded-full bg-gray-400/40"
                          style={{
                            left: p.x,
                            top: p.y,
                            width: p.size,
                            height: p.size,
                            animationName: 'smokeRise',
                            animationDuration: '1.2s',
                            animationTimingFunction: 'ease-out',
                            animationFillMode: 'forwards',
                            animationDelay: p.delay
                          }}
                        />
                      ))}
                    </div>
                  )
                )}
              </div>
              <div className="w-[1.5px] h-3 bg-gray-500/70" />
              <div className="w-3 h-14 bg-gradient-to-b from-cyan-200 to-violet-300 rounded-sm relative overflow-hidden border-t border-white/20">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                <div className="w-full h-1 bg-fuchsia-400/40 absolute top-3 rotate-12" />
                <div className="w-full h-1 bg-amber-400/40 absolute top-7 rotate-12" />
                <div className="w-full h-1 bg-cyan-400/40 absolute top-11 rotate-12" />
              </div>
            </div>
          ))}
        </div>

        <div className="w-52 h-14 bg-gradient-to-b from-fuchsia-100 to-violet-200 rounded-full border-2 border-slate-900 relative flex items-center justify-center shadow-md">
          <div className="absolute inset-x-4 top-2 flex justify-between px-2 text-xs opacity-80 select-none pointer-events-none">
            <span className="animate-twinkle-1">🌸</span>
            <span className="animate-twinkle-2">⚡</span>
            <span className="animate-twinkle-3">💖</span>
            <span className="animate-twinkle-4">😂</span>
          </div>
          <div className="absolute -bottom-1 inset-x-2 h-3 bg-violet-400/50 rounded-full blur-[1px]" />
        </div>

        <div className="w-60 h-20 bg-gradient-to-b from-violet-200/95 to-fuchsia-300/95 rounded-full border-2 border-slate-900 -mt-7 relative flex items-center justify-center shadow-lg">
          <div className="absolute inset-x-6 top-0 h-4 bg-white/80 rounded-full blur-[0.5px]">
            <div className="absolute top-2 left-6 w-3 h-5 bg-white/80 rounded-b-full animate-pulse" />
            <div className="absolute top-2 left-20 w-2.5 h-6 bg-white/80 rounded-b-full animate-pulse" style={{ animationDelay: '0.4s' }} />
            <div className="absolute top-2 right-12 w-3.5 h-5 bg-white/80 rounded-b-full animate-pulse" style={{ animationDelay: '0.2s' }} />
          </div>
          <div className="absolute inset-x-8 bottom-3 flex justify-between px-6 text-xs opacity-70 select-none pointer-events-none">
            <span className="animate-twinkle-3">⭐</span>
            <span className="animate-twinkle-1">😭</span>
            <span className="animate-twinkle-4">🔥</span>
          </div>
        </div>

        <div className="w-64 h-5 bg-gradient-to-b from-cyan-100 to-violet-200 rounded-full border-t border-white shadow-md -mt-5" />
        <div className="w-24 h-6 bg-gradient-to-b from-violet-200 to-violet-300 rounded-b-lg border-x border-b border-slate-900/40 shadow-md" />
      </div>

      <div className="w-full px-2 space-y-1 shrink-0">
        <button
          id="btn-blow-candles"
          type="button"
          onClick={blowAllCandles}
          disabled={candles.every(c => !c.lit)}
          className="w-full py-2.5 font-display text-base rounded-xl shadow-[4px_4px_0_#0f172a] active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer border-2 border-slate-900 text-white"
          style={{ background: 'linear-gradient(90deg, #7c3aed, #22d3ee)' }}
        >
          Saari candles bujhao
        </button>
        
        {candles.every(c => !c.lit) && (
          <p className="text-[11px] text-fuchsia-600 font-semibold animate-pulse">
            Wish mil gayi. Memories aa rahi hain...
          </p>
        )}
      </div>
    </div>
  );
};
