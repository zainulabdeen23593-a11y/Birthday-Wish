/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ExtraCatHeart } from '../types';
import { PasscodeIndicators, KeypadButton, WrongPasscodeOverlay } from './SubComponents';
import { AnimeStamp, SpeechBubble } from './AnimeTheme';

interface PasscodeSectionProps {
  readonly isCatWiggling: boolean;
  readonly triggerCatWiggle: () => void;
  readonly extraHearts: readonly ExtraCatHeart[];
  readonly typedCode: string;
  readonly isPasscodeWrong: boolean;
  readonly handleKeypadPress: (val: string) => void;
  readonly handleBackspace: () => void;
  readonly resetPasscode: () => void;
  readonly setTypedCode: (code: string) => void;
}

export const PasscodeSection: React.FC<PasscodeSectionProps> = ({
  isCatWiggling,
  triggerCatWiggle,
  extraHearts,
  typedCode,
  isPasscodeWrong,
  handleKeypadPress,
  handleBackspace,
  resetPasscode,
  setTypedCode,
}) => {
  return (
    <div id="section-passcode" className="flex-1 flex flex-col justify-between animate-fade-slide-up min-h-0 h-full py-1">
      <div className="flex flex-col items-center gap-1 shrink-0">
        <div className="relative">
          <div 
            onClick={triggerCatWiggle}
            className={`relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center cursor-pointer select-none ${
              isCatWiggling ? "animate-cat-wiggle" : "animate-cat-tilt"
            }`}
          >
            {extraHearts.map(eh => (
              <div
                key={eh.id}
                className="absolute text-xl z-30 select-none animate-float pointer-events-none"
                style={{
                  left: `${eh.left}%`,
                  top: `${eh.top}%`,
                  animationDuration: '1s',
                  animationDelay: `${eh.delay}ms`
                }}
              >
                {eh.emoji}
              </div>
            ))}

            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-[var(--ink)] overflow-hidden bg-[#fff5f6] flex items-center justify-center shadow-[3px_3px_0_#ff2d6a] relative z-10">
              <img 
                src="/cat.jfif" 
                referrerPolicy="no-referrer" 
                className="w-full h-full object-cover rounded-full select-none pointer-events-none" 
                alt="Guardian cat" 
              />
            </div>
          </div>
        </div>
        
        <div className="text-center space-y-1">
          <AnimeStamp text="SECRET" />
          <h2 className="font-display text-xl text-[var(--spider-blue)] tracking-wide">Passcode</h2>
          <SpeechBubble className="mx-3">
            <p className="text-xs text-[var(--ink)] font-medium">Char digits. Tu jaanti hai. Spoiler nahi.</p>
          </SpeechBubble>
        </div>
      </div>

      <PasscodeIndicators length={typedCode.length} />

      <div className="grid grid-cols-3 gap-y-1 gap-x-3 px-6 max-w-sm mx-auto w-full">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map((btn) => (
          <KeypadButton
            key={btn}
            label={btn}
            onClick={() => {
              if (btn !== "*" && btn !== "#") {
                handleKeypadPress(btn);
              }
            }}
          />
        ))}
      </div>

      <div className="flex justify-between items-center px-12 text-xs text-[var(--spider-blue)] font-medium shrink-0">
        <button 
          type="button"
          onClick={() => setTypedCode("")}
          className="hover:text-fuchsia-600 transition-colors py-1 cursor-pointer"
        >
          CLEAR
        </button>
        <button 
          type="button"
          onClick={handleBackspace}
          className="hover:text-fuchsia-600 transition-colors py-1 cursor-pointer"
        >
          DELETE
        </button>
      </div>

      {isPasscodeWrong && (
        <WrongPasscodeOverlay onRetry={resetPasscode} />
      )}
    </div>
  );
};
