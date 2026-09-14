/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ClickReaction } from '../types';

// ============================================================================
// HEADING FLOURISH
// ============================================================================
export const HeadingFlourish: React.FC = () => (
  <svg className="w-16 h-1.5 bg-transparent mx-auto mt-1 mb-2 opacity-80" viewBox="0 0 100 10" fill="none" aria-hidden="true">
    <path d="M5 5 Q25 1, 50 5 T95 5" stroke="var(--spider-red)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 3" />
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
    className="rounded-full mx-auto flex items-center justify-center font-display text-xl font-bold select-none keypad-btn focus:outline-none focus:ring-2 relative"
  >
    <span className="absolute -top-1 -right-1 text-[10px] pointer-events-none">⭐</span>
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
  <div className="flex justify-center gap-3 my-2" aria-label={`Passcode length entered: ${length} out of 4`}>
    {Array.from({ length: 4 }).map((_, i) => (
      <div 
        key={i} 
        className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white flex items-center justify-center transition-all duration-300 relative`} 
        style={{ borderWidth: '2px', borderStyle: 'solid', borderColor: i < length ? 'var(--accent-pink)' : 'rgba(246,202,202,0.6)', transform: i < length ? 'scale(1.05)' : 'scale(1)', boxShadow: i < length ? '0 4px 12px rgba(226,54,54,0.08)' : 'none' }}>
        {i < length && (
          <div className="absolute inset-0 bg-[var(--accent-pink)/40] rounded-xl blur-[3px] animate-pulse" />
        )}
        {i < length ? (
          <span className="relative z-10 text-lg">⚡</span>
        ) : (
          <span className="text-xs text-[var(--muted)/60] relative z-10" aria-hidden="true">○</span>
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
  <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center p-6 z-40 animate-fade-slide-up text-center" style={{ borderWidth: '4px', borderStyle: 'solid', borderColor: 'rgba(246,202,202,0.6)' }}>
        <div className="w-24 h-24 mb-4" style={{ color: 'var(--accent-pink)' }}>
      <svg viewBox="0 0 100 100" className="w-full h-full fill-current animate-kitty-shiver" aria-hidden="true">
        <circle cx="50" cy="50" r="45" fill="var(--accent-pink)" />
        <g className="animate-droopy-ears origin-bottom">
          <path d="M 25 35 Q 30 25 35 32" fill="none" stroke="var(--spider-red)" strokeWidth="3" />
          <path d="M 75 35 Q 70 25 65 32" fill="none" stroke="var(--spider-red)" strokeWidth="3" />
        </g>
        <ellipse cx="33" cy="48" rx="3.5" ry="5.5" fill="var(--spider-blue)" />
        <ellipse cx="67" cy="48" rx="3.5" ry="5.5" fill="var(--spider-blue)" />
        <path d="M 33 54 C 33 62 30 65 30 68" fill="none" stroke="var(--spider-blue)" strokeWidth="3" strokeLinecap="round" />
        <path d="M 67 54 C 67 62 70 65 70 68" fill="none" stroke="var(--spider-blue)" strokeWidth="3" strokeLinecap="round" />
        <path d="M 45 65 Q 50 58 55 65" fill="none" stroke="var(--spider-blue)" strokeWidth="3" />
      </svg>
    </div>
    <h3 className="text-2xl font-display text-[var(--spider-red)] tracking-wide font-semibold">OYE?! GALAT CODE!</h3>
    <p className="text-[var(--spider-blue)] mt-2 max-w-xs text-sm font-medium">
      Yeh combo episode nahi kholta. Dobara try kar! 😭<br/>
      <span className="text-xs text-violet-500">(Hint: char digits. Naam spoiler nahi.)</span>
    </p>
    <button
      type="button"
      onClick={onRetry}
      className="mt-6 px-6 py-3 rounded-xl font-medium shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer border-2"
      style={{ background: 'linear-gradient(90deg, var(--spider-red), var(--accent-pink))', color: '#fff', borderColor: 'var(--accent-pink)' }}
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
      stroke="var(--spider-red)" 
      strokeWidth={strokeWidthRose} 
      fill="none" 
      strokeLinecap="round"
      strokeLinejoin="round"
      className="opacity-95"
    />
    <path 
      d="M 50 17 C 37 -3, 2 -3, 2 35 C 2 63, 31 83, 50 96 C 69 83, 98 63, 98 35 C 98 -3, 63 -3, 50 17 Z" 
      stroke="var(--accent-pink)" 
      strokeWidth={strokeWidthPink} 
      fill="none" 
      strokeLinecap="round"
      strokeLinejoin="round"
      className="opacity-75"
    />
  </svg>
);

export const ClickReactionOverlay: React.FC<{ reactions: readonly ClickReaction[] }> = ({ reactions }) => (
  <div className="absolute inset-0 pointer-events-none z-[70] overflow-hidden" aria-hidden="true">
    {reactions.map((r) => (
      <span
        key={r.id}
        className={`anime-reaction anime-reaction-${r.mood}`}
        style={{
          left: `${r.x}%`,
          top: `${r.y}%`,
          ['--rot' as string]: `${r.rot}deg`,
        }}
      >
        {r.text}
      </span>
    ))}
  </div>
);
