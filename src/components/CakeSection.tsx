/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CandleState } from '../types';

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
    <div id="section-cake" className="flex-1 flex flex-col justify-between py-6 items-center text-center animate-fade-slide-up">
      
      {/* Title instructions */}
      <div className="space-y-2 pt-2">
        <h2 className="font-serif-elegant text-2xl text-rose-700 text-glow-rose font-semibold">Make a wish... 🎂</h2>
        <p className="text-xs text-rose-950 font-medium max-w-xs mx-auto px-4">
          Tap individual candles or use the button below to blow them out
        </p>
      </div>

      {/* Elegant Birthday Cake Container */}
      <div className="flex-1 flex flex-col justify-center items-center w-full relative h-72">
        
        {/* Outer soft aura behind cake */}
        <div className="absolute w-56 h-56 bg-pink-300/20 rounded-full blur-3xl -z-10" />

        {/* Interactive Candles Area */}
        <div className="flex justify-center gap-5 items-end mb-1 z-10">
          {candles.map((candle, idx) => (
            <div 
               key={candle.id} 
               onClick={() => blowCandle(candle.id)}
               className="flex flex-col items-center cursor-pointer group relative"
               style={{ transform: `translateY(${idx % 2 === 0 ? '0px' : '6px'})` }}
            >
              {/* Flame Container */}
              <div className="h-10 relative flex items-end justify-center w-6">
                
                {/* Active Flickering Flame */}
                {candle.lit ? (
                  <div className="relative">
                    {/* Inner white hot flame */}
                    <div className={`w-3 h-7 bg-amber-100 rounded-full animate-flicker-${candle.id} absolute bottom-0 -left-1.5 origin-bottom animate-pulse-glow`}>
                      {/* Outer orange/rose glow and warm radial halo */}
                      <div className="w-5 h-8 bg-orange-400 rounded-full opacity-60 absolute -top-1.5 -left-1 origin-bottom blur-[1.5px]" />
                      <div className="w-7 h-9 bg-rose-400 rounded-full opacity-35 absolute -top-2 -left-2 origin-bottom blur-[3px]" />
                      <div className="absolute -top-3 -left-3 w-9 h-9 bg-amber-400/15 rounded-full blur-md animate-ping opacity-20" style={{ animationDuration: '3s' }} />
                    </div>
                  </div>
                ) : (
                  /* Smoke Puff Particle effect playing once */
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

              {/* Candle wick */}
              <div className="w-[1.5px] h-3 bg-gray-500/70" />

              {/* Candle body with custom colored stripes */}
              <div className="w-3 h-14 bg-gradient-to-b from-pink-200 to-rose-300 rounded-sm relative overflow-hidden border-t border-white/20">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                <div className="w-full h-1 bg-rose-400/40 absolute top-3 rotate-12" />
                <div className="w-full h-1 bg-pink-400/30 absolute top-7 rotate-12" />
                <div className="w-full h-1 bg-rose-400/40 absolute top-11 rotate-12" />
              </div>
            </div>
          ))}
        </div>

        {/* Cake Top Layer */}
        <div className="w-52 h-14 bg-gradient-to-b from-rose-100 to-rose-200 rounded-full border border-rose-300/30 relative flex items-center justify-center shadow-md">
          {/* Cake sprinkles */}
          <div className="absolute inset-x-4 top-2 flex justify-between px-2 text-xs opacity-80 select-none pointer-events-none">
            <span className="text-pink-500 animate-twinkle-1">🌸</span>
            <span className="text-yellow-500 animate-twinkle-2">✨</span>
            <span className="text-rose-500 animate-twinkle-3">💖</span>
            <span className="text-purple-500 animate-twinkle-4">🌸</span>
          </div>
          <div className="absolute -bottom-1 inset-x-2 h-3 bg-pink-400/50 rounded-full blur-[1px]" />
        </div>

        {/* Cake Bottom Layer */}
        <div className="w-60 h-20 bg-gradient-to-b from-rose-200/95 to-rose-300/95 rounded-full border border-rose-300/40 -mt-7 relative flex items-center justify-center shadow-lg">
          {/* Draping Cream effect with custom drips */}
          <div className="absolute inset-x-6 top-0 h-4 bg-white/80 rounded-full blur-[0.5px]">
            <div className="absolute top-2 left-6 w-3 h-5 bg-white/80 rounded-b-full animate-pulse" />
            <div className="absolute top-2 left-20 w-2.5 h-6 bg-white/80 rounded-b-full animate-pulse" style={{ animationDelay: '0.4s' }} />
            <div className="absolute top-2 right-12 w-3.5 h-5 bg-white/80 rounded-b-full animate-pulse" style={{ animationDelay: '0.2s' }} />
          </div>
          
          {/* Side sprinkles */}
          <div className="absolute inset-x-8 bottom-3 flex justify-between px-6 text-xs opacity-70 select-none pointer-events-none">
            <span className="text-pink-500 animate-twinkle-3">🌸</span>
            <span className="text-rose-500 animate-twinkle-1">❤</span>
            <span className="text-pink-400 animate-twinkle-4">✨</span>
          </div>
        </div>

        {/* Stand / Plate */}
        <div className="w-64 h-5 bg-gradient-to-b from-pink-100 to-rose-200 rounded-full border-t border-white shadow-md -mt-5" />
        <div className="w-24 h-6 bg-gradient-to-b from-rose-200 to-rose-300 rounded-b-lg border-x border-b border-rose-300/50 shadow-md" />

      </div>

      {/* Controls */}
      <div className="w-full px-6 space-y-3">
        <button
          id="btn-blow-candles"
          type="button"
          onClick={blowAllCandles}
          disabled={candles.every(c => !c.lit)}
          className="w-full py-4 bg-gradient-to-r from-pink-50 via-rose-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white font-medium rounded-xl shadow-lg hover:scale-[1.02] active:scale-95 disabled:opacity-40 disabled:scale-100 disabled:pointer-events-none transition-all cursor-pointer border-2 border-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-300"
        >
          Blow out all candles 💨
        </button>
        
        {candles.every(c => !c.lit) && (
          <p className="text-xs text-rose-700 font-semibold animate-pulse mt-2">
            ✨ Wish received. Connecting...
          </p>
        )}
      </div>
    </div>
  );
};
