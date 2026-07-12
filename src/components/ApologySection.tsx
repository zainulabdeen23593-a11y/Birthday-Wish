/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { TypewriterText } from './SubComponents';

interface ApologySectionProps {
  readonly apologyLinesRevealed: number;
  readonly onNext: () => void;
}

export const ApologySection: React.FC<ApologySectionProps> = ({
  apologyLinesRevealed,
  onNext,
}) => {
  return (
    <div id="section-apology" className="flex-1 flex flex-col justify-between py-10 items-center text-center animate-fade-slide-up relative">
      
      {/* Header branding (extremely simple & humble) */}
      <div className="text-rose-500/70 text-[10px] tracking-widest uppercase font-semibold font-serif-elegant">
        A Sincere Private Note
      </div>

      {/* Core emotional text container */}
      <div className="flex-1 flex flex-col justify-center items-center px-4 space-y-7 my-auto">
        
        {apologyLinesRevealed >= 1 && (
          <p className="font-serif-elegant text-base text-rose-800 leading-relaxed font-medium tracking-wide transition-all duration-1000 animate-fade-slide-up">
            But before we celebrate any further...
          </p>
        )}

        {apologyLinesRevealed >= 2 && (
          <p className="font-serif-elegant text-lg text-rose-950 leading-relaxed font-semibold tracking-wide transition-all duration-1000 animate-fade-slide-up">
            I need to say something <br/>
            I should have said sooner.
          </p>
        )}

        {apologyLinesRevealed >= 3 && (
          <p className="font-serif-elegant text-xl text-rose-600 font-bold text-glow-rose leading-relaxed tracking-wide transition-all duration-1000 animate-fade-slide-up whitespace-pre-line">
            <TypewriterText text={"I’m sorry —\nfor the hurt I caused, and for the mess\nI made of things."} speed={42} />
          </p>
        )}

        {apologyLinesRevealed >= 4 && (
          <p className="font-serif-elegant text-base text-rose-900 leading-relaxed font-medium tracking-wide transition-all duration-1000 animate-fade-slide-up">
            My intentions weren’t to hurt you. <br/>
            But unfortunately, I messed up.
          </p>
        )}

        {apologyLinesRevealed >= 5 && (
          <p className="font-serif-elegant text-sm text-pink-600/80 italic leading-relaxed font-semibold tracking-wide transition-all duration-1000 animate-fade-slide-up">
            I just wanted you to know that, <br/>
            today of all days.
          </p>
        )}

      </div>

      {/* Soft Manual Advance button */}
      <div className="w-full px-6 h-14">
        {apologyLinesRevealed >= 6 && (
          <button
            id="btn-apology-continue"
            type="button"
            onClick={onNext}
            className="w-full py-4 bg-white border-2 border-pink-200 hover:bg-pink-50 text-rose-700 hover:text-rose-950 rounded-xl text-sm font-serif-elegant font-semibold tracking-wider hover:scale-[1.02] active:scale-95 transition-all cursor-pointer shadow-sm animate-fade-slide-up focus:outline-none focus:ring-2 focus:ring-pink-300"
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
};
