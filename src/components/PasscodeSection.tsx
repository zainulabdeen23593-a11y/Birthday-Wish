/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ExtraCatHeart } from '../types';
import { PasscodeIndicators, KeypadButton, WrongPasscodeOverlay } from './SubComponents';

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
    <div id="section-passcode" className="flex-1 flex flex-col justify-between py-4 animate-fade-slide-up">
      
      {/* Top Cat Crown Avatar Block */}
      <div className="flex flex-col items-center pt-2 gap-3">
        <div className="relative">
          {/* Custom Kawaii Cat Sticker representing the cute cat in the image */}
          <div 
            onClick={triggerCatWiggle}
            className={`relative w-32 h-32 flex items-center justify-center cursor-pointer select-none transition-all duration-300 hover:scale-105 active:scale-95 ${
              isCatWiggling ? "animate-cat-wiggle" : "animate-cat-tilt"
            }`}
          >
            {/* Dashed hand-drawn effect accent circle around the cat */}
            <div className="absolute inset-0 rounded-full border-2 border-dashed" style={{ borderColor: 'var(--accent-pink)' }} />
            
            {/* Cute Bows on ears */}
            <div className="absolute top-1 left-2 text-2xl z-20 animate-bounce select-none">🎀</div>
            <div className="absolute top-1 right-2 text-2xl z-20 animate-bounce select-none" style={{ animationDelay: '0.2s' }}>🎀</div>
            
            {/* Yellow sparkles */}
            <div className="absolute top-5 -left-4 text-xl z-20 animate-pulse select-none">✨</div>
            <div className="absolute bottom-6 -right-4 text-xl z-20 animate-pulse select-none" style={{ animationDelay: '0.5s' }}>✨</div>
            
            {/* Pink hearts */}
            <div className="absolute -bottom-1 -left-2 text-2xl z-20 animate-[heartPop_1.5s_infinite] select-none">💖</div>
            <div className="absolute -bottom-1 -right-2 text-2xl z-20 animate-[heartPop_1.5s_infinite] select-none" style={{ animationDelay: '0.4s' }}>💖</div>

            {/* Extra Tap hearts generated on demand */}
            {extraHearts.map(eh => (
              <div
                key={eh.id}
                className="absolute text-2xl z-30 select-none animate-float pointer-events-none opacity-95 text-rose-500 font-bold"
                style={{
                  left: `${eh.left}%`,
                  top: `${eh.top}%`,
                  animationDuration: '1s'
                }}
              >
                💖
              </div>
            ))}

            {/* Main Cat Avatar */}
            <div className="w-24 h-24 rounded-full border-4 border-pink-300 overflow-hidden bg-[#fff5f6] flex items-center justify-center shadow-md relative z-10 p-0.5">
              <img 
                src="/cat.jfif" 
                referrerPolicy="no-referrer" 
                className="w-full h-full object-cover rounded-full select-none pointer-events-none" 
                alt="Cute Pookie Cat" 
              />
            </div>
          </div>
          {/* Soft pulsing shadow beneath cat */}
          <div className="w-16 h-2 bg-[var(--accent-pink)]/35 rounded-full blur-[2px] mx-auto -mt-1.5 animate-shadow-pulse" />
        </div>
        
        <div className="text-center">
          <h2 className="text-[var(--spider-blue)] text-lg font-medium tracking-wide">Enter a passcode</h2>
          <p className="text-xs text-[var(--accent-pink)/70] font-medium">Hint: Think of May 23 — the journey continues from 4 years, to death.</p>
        </div>
      </div>

      {/* Custom Passcode Box Indicators */}
      <PasscodeIndicators length={typedCode.length} />

      {/* Custom 12-button Keypad */}
      <div className="grid grid-cols-3 gap-y-3 gap-x-6 px-10 max-w-sm mx-auto w-full">
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

      {/* Delete / Backspace utility bar */}
      <div className="flex justify-between items-center px-16 mt-3 text-xs text-[var(--spider-blue)] font-medium">
        <button 
          type="button"
          onClick={() => setTypedCode("")}
          className="hover:text-[var(--spider-red)] transition-colors py-1 cursor-pointer focus:outline-none focus:underline"
        >
          CLEAR
        </button>
        <button 
          type="button"
          onClick={handleBackspace}
          className="hover:text-[var(--spider-red)] transition-colors py-1 flex items-center gap-1 cursor-pointer focus:outline-none focus:underline"
        >
          DELETE
        </button>
      </div>

      {/* decorative overlays */}
      <img src="/spider-web.svg" alt="web" className="absolute top-3 right-3 w-20 h-20 opacity-8 pointer-events-none" />
      <img src="/daisy.svg" alt="daisy" className="absolute bottom-6 left-4 w-12 h-12 opacity-95 pointer-events-none" />

      {/* WRONG PASSCODE OVERLAY */}
      {isPasscodeWrong && (
        <WrongPasscodeOverlay onRetry={resetPasscode} />
      )}
    </div>
  );
};
