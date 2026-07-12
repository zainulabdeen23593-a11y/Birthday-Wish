/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles } from 'lucide-react';
import { ConfettiParticle, BalloonState } from '../types';

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
    <div id="section-celebration" className="flex-1 flex flex-col justify-between py-12 items-center text-center relative overflow-hidden">
      
      {/* Embedded JavaScript Confetti loop rendering */}
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

        {/* Staggered Rising Balloons */}
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
            {/* Balloon Body */}
            <div 
              className="rounded-full shadow-lg relative flex items-center justify-center"
              style={{
                width: b.size,
                height: `calc(${b.size} * 1.2)`,
                backgroundColor: b.color,
                borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%'
              }}
            >
              <div className="w-1.5 h-3 bg-white/30 absolute top-3 left-4 rounded-full blur-[1px]" />
            </div>
            {/* Balloon Knot (Triangle) */}
            <div 
              className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] -mt-[2px]" 
              style={{ borderBottomColor: b.color }}
            />
            {/* Balloon String (Wiggling curved SVG line) */}
            <svg className="w-4 h-16 -mt-[2.5px] text-white/35" viewBox="0 0 20 60" fill="none">
              <path d="M 10 0 Q 15 15, 10 30 T 10 60" stroke="currentColor" strokeWidth="1.5" className="animate-pulse" />
            </svg>
          </div>
        ))}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-6 z-20 px-4">
        {/* Spinning star burst */}
        <div className="w-20 h-20 text-pink-400 animate-spin" style={{ animationDuration: '6s' }}>
          <Sparkles className="w-full h-full text-glow-rose" />
        </div>

        <div className="space-y-4 relative">
          {/* Cozy Ambient Aura behind title */}
          <div className="absolute inset-0 bg-pink-200/25 rounded-full blur-2xl scale-125 pointer-events-none -z-10 animate-pulse" />
          
          <h1 className="font-script text-6xl text-rose-600 text-glow-rose animate-bounce">
            Happy Birthday! 🎂
          </h1>
          
          <p className="text-rose-950 text-sm font-medium mt-4 leading-relaxed max-w-xs mx-auto">
            Before anything else... <br/>
            <span className="text-rose-700 font-bold font-serif-elegant">I have <span className="marker-highlight text-rose-800">something</span> to show you.</span>
          </p>
        </div>
      </div>

      {/* Quick manual advance button */}
      <button 
        type="button"
        onClick={onNext}
        className="px-6 py-2 bg-white border-2 border-pink-200 hover:bg-pink-50 hover:text-rose-900 rounded-full text-xs text-rose-700 font-semibold tracking-wider z-20 active:scale-95 transition-all cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
      >
        SKIP INTRO ➔
      </button>
    </div>
  );
};
