/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';

// ============================================================================
// HEADING FLOURISH
// ============================================================================
export const HeadingFlourish: React.FC = () => (
  <svg className="w-16 h-1.5 bg-transparent mx-auto mt-1 mb-2 opacity-80" viewBox="0 0 100 10" fill="none" aria-hidden="true">
    <path d="M5 5 Q25 1, 50 5 T95 5" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 3" />
  </svg>
);

// ============================================================================
// TYPEWRITER TEXT (Highly Safe & Leaks-proof)
// ============================================================================
interface TypewriterTextProps {
  readonly text: string;
  readonly speed?: number;
  readonly delay?: number;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({ text, speed = 40, delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let isMounted = true;
    setDisplayedText("");

    let intervalId: NodeJS.Timeout | null = null;

    const startTimer = setTimeout(() => {
      if (!isMounted) return;

      let currentIndex = 0;
      intervalId = setInterval(() => {
        if (!isMounted) {
          if (intervalId) clearInterval(intervalId);
          return;
        }

        currentIndex++;
        setDisplayedText(text.slice(0, currentIndex));

        if (currentIndex >= text.length) {
          if (intervalId) clearInterval(intervalId);
        }
      }, speed);
    }, delay);

    return () => {
      isMounted = false;
      clearTimeout(startTimer);
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [text, speed, delay]);

  return <span className="inline-block transition-all">{displayedText}</span>;
};

// ============================================================================
// KEYPAD BUTTON
// ============================================================================
interface KeypadButtonProps {
  readonly label: string;
  readonly onClick: () => void;
}

export const KeypadButton: React.FC<KeypadButtonProps> = ({ label, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="w-14 h-14 rounded-full mx-auto flex items-center justify-center font-serif text-lg font-bold select-none keypad-btn focus:outline-none focus:ring-2 focus:ring-pink-300"
  >
    {label}
  </button>
);

// ============================================================================
// PASSCODE INDICATORS
// ============================================================================
interface PasscodeIndicatorsProps {
  readonly length: number;
}

export const PasscodeIndicators: React.FC<PasscodeIndicatorsProps> = ({ length }) => (
  <div className="flex justify-center gap-4 my-6" aria-label={`Passcode length entered: ${length} out of 4`}>
    {Array.from({ length: 4 }).map((_, i) => (
      <div 
        key={i} 
        className={`w-12 h-12 rounded-xl border-2 bg-white flex items-center justify-center transition-all duration-300 relative ${
          i < length 
            ? "border-pink-400 scale-105 shadow-[0_4px_12px_rgba(244,63,94,0.12)]" 
            : "border-pink-200"
        }`}
      >
        {i < length && (
          <div className="absolute inset-0 bg-pink-100/40 rounded-xl blur-[3px] animate-pulse" />
        )}
        {i < length ? (
          <span className="text-xl text-pink-600 animate-flower-pop relative z-10" role="img" aria-label="entered">🌸</span>
        ) : (
          <span className="text-xs text-pink-200 relative z-10" aria-hidden="true">○</span>
        )}
      </div>
    ))}
  </div>
);

// ============================================================================
// WRONG PASSCODE OVERLAY
// ============================================================================
interface WrongPasscodeOverlayProps {
  readonly onRetry: () => void;
}

export const WrongPasscodeOverlay: React.FC<WrongPasscodeOverlayProps> = ({ onRetry }) => (
  <div className="absolute inset-0 bg-white/95 backdrop-blur-sm border-4 border-pink-200 rounded-3xl flex flex-col items-center justify-center p-6 z-40 animate-fade-slide-up text-center">
    <div className="w-24 h-24 mb-4 text-rose-400">
      <svg viewBox="0 0 100 100" className="w-full h-full fill-current animate-kitty-shiver" aria-hidden="true">
        <circle cx="50" cy="50" r="45" fill="#fbcfe8" />
        <g className="animate-droopy-ears origin-bottom">
          <path d="M 25 35 Q 30 25 35 32" fill="none" stroke="#be185d" strokeWidth="3" />
          <path d="M 75 35 Q 70 25 65 32" fill="none" stroke="#be185d" strokeWidth="3" />
        </g>
        <ellipse cx="33" cy="48" rx="3.5" ry="5.5" fill="#4c0519" />
        <ellipse cx="67" cy="48" rx="3.5" ry="5.5" fill="#4c0519" />
        <path d="M 33 54 C 33 62 30 65 30 68" fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
        <path d="M 67 54 C 67 62 70 65 70 68" fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
        <path d="M 45 65 Q 50 58 55 65" fill="none" stroke="#4c0519" strokeWidth="3" />
      </svg>
    </div>
    <h3 className="text-2xl font-serif text-rose-700 tracking-wide font-semibold">WRONG PASSCODE!</h3>
    <p className="text-rose-950 mt-2 max-w-xs text-sm font-medium">
      Oops, that passcode wasn't correct. Try again! <br/>
      <span className="text-xs text-rose-500">(Hint: check the hint code on the entry pad!)</span>
    </p>
    <button
      type="button"
      onClick={onRetry}
      className="mt-6 px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-medium shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer border-2 border-pink-100"
    >
      TRY AGAIN
    </button>
  </div>
);

// ============================================================================
// HEART SILHOUETTE BORDER
// ============================================================================
interface HeartSilhouetteBorderProps {
  readonly strokeWidthRose?: number;
  readonly strokeWidthPink?: number;
}

export const HeartSilhouetteBorder: React.FC<HeartSilhouetteBorderProps> = ({
  strokeWidthRose = 2.2,
  strokeWidthPink = 1.2
}) => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
    <path 
      d="M 50 15 C 35 -5, 0 -5, 0 35 C 0 65, 30 85, 50 98 C 70 85, 100 65, 100 35 C 100 -5, 65 -5, 50 15 Z" 
      stroke="#ffffff" 
      strokeWidth="6" 
      fill="none" 
    />
    <path 
      d="M 50 15 C 35 -5, 0 -5, 0 35 C 0 65, 30 85, 50 98 C 70 85, 100 65, 100 35 C 100 -5, 65 -5, 50 15 Z" 
      stroke="#e11d48" 
      strokeWidth={strokeWidthRose} 
      fill="none" 
      strokeLinecap="round"
      strokeLinejoin="round"
      className="opacity-95"
    />
    <path 
      d="M 50 17 C 37 -3, 2 -3, 2 35 C 2 63, 31 83, 50 96 C 69 83, 98 63, 98 35 C 98 -3, 63 -3, 50 17 Z" 
      stroke="#fda4af" 
      strokeWidth={strokeWidthPink} 
      fill="none" 
      strokeLinecap="round"
      strokeLinejoin="round"
      className="opacity-75"
    />
  </svg>
);
