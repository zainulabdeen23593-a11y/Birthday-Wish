/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { 
  AppSection, 
  LoveBurstParticle, 
  CandleState, 
  CandlesAction 
} from './types';

// ============================================================================
// CONSTANTS
// ============================================================================

export const DEFAULT_PASSCODE = "2303";
export const DEFAULT_LOVE_COUNT_KEY = "pookie_love_count";
export const BASE_LOVE_COUNT = 520;

export const STORY_PARAGRAPHS: readonly string[] = [
  "Happy Birthday, My Love ❤️",
  "There are countless beautiful words in this world, yet every one of them falls short when I try to describe what you mean to me.",
  "You walked into my life so quietly, yet somehow you became the loudest heartbeat within it. You turned ordinary days into memories I never want to lose, and without even realizing it, you became the place my heart always returns to.",
  "Thank you for every smile that healed a part of me, for every laugh that still echoes in my thoughts, and for every moment that made this life infinitely more beautiful simply because you were in it.",
  "No one knows what tomorrow has written for us. But if life is kind enough to let our paths remain together, then I promise to spend every tomorrow giving you the same warmth, peace, and love that you've given me without ever asking for anything in return.",
  "Today is more than a birthday.",
  "It is the anniversary of the day the universe quietly created the person who would one day become my greatest blessing.",
  "So today, I celebrate not just the day you were born—",
  "I celebrate the day my world unknowingly began waiting for you.",
  "Happy Birthday, My Love.",
  "Happy Birthday, My Home.",
  "Happy Birthday, My Everything. ❤️"
] as const;

export const EMOJI_BURST_POOL: readonly string[] = ["💖", "🌸", "✨", "🥰", "🎀", "🧸", "🍭", "🍬", "🍰", "🎈"] as const;
export const CONFETTI_COLORS: readonly string[] = ['#e8b4b8', '#c9a7eb', '#ffd89b', '#4fa3e3', '#f43f5e', '#10b981', '#f59e0b'] as const;
export const BALLOON_COLORS: readonly string[] = [
  'rgba(232, 180, 184, 0.85)', // rose gold
  'rgba(201, 167, 235, 0.85)', // soft lavender
  'rgba(255, 216, 155, 0.85)', // yellow candlelight
  'rgba(244, 63, 94, 0.8)',    // deep rose
  'rgba(96, 165, 250, 0.85)'   // soft blue
] as const;

// ============================================================================
// UTILITY STORAGE HELPERS
// ============================================================================

export const loadLoveCount = (): number => {
  try {
    const saved = localStorage.getItem(DEFAULT_LOVE_COUNT_KEY);
    return saved ? parseInt(saved, 10) : BASE_LOVE_COUNT;
  } catch {
    return BASE_LOVE_COUNT;
  }
};

export const saveLoveCount = (count: number): void => {
  try {
    localStorage.setItem(DEFAULT_LOVE_COUNT_KEY, count.toString());
  } catch {}
};

export const getSectionBgClass = (section: AppSection): string => {
  if (section === AppSection.Apology) return "animate-gradient-bg-dim";
  if (section >= AppSection.Gallery) return "animate-gradient-bg-warm";
  return "animate-gradient-bg";
};

// ============================================================================
// REDUCERS
// ============================================================================

export function candlesReducer(state: CandleState[], action: CandlesAction): CandleState[] {
  switch (action.type) {
    case 'BLOW_CANDLE':
      return state.map(c => {
        if (c.id === action.id && c.lit) {
          return {
            ...c,
            lit: false,
            smoked: true,
            smokeParticles: Array.from({ length: 8 }).map((_, idx) => ({
              id: idx,
              x: (Math.random() - 0.5) * 30,
              y: -10 - Math.random() * 25,
              size: `${4 + Math.random() * 8}px`,
              delay: `${idx * 0.05}s`
            }))
          };
        }
        return c;
      });
    case 'RESET':
      return [
        { id: 1, lit: true, smoked: false, smokeParticles: [] },
        { id: 2, lit: true, smoked: false, smokeParticles: [] },
        { id: 3, lit: true, smoked: false, smokeParticles: [] },
        { id: 4, lit: true, smoked: false, smokeParticles: [] },
        { id: 5, lit: true, smoked: false, smokeParticles: [] },
      ];
    case 'SET':
      return [...action.candles];
    default:
      return state;
  }
}

// ============================================================================
// CUSTOM HOOKS
// ============================================================================

export interface UseLoveBurstResult {
  readonly loveCount: number;
  readonly homeHearts: readonly LoveBurstParticle[];
  readonly triggerLoveBurst: (e?: React.MouseEvent<HTMLElement>) => void;
  readonly clearHearts: () => void;
}

export function useLoveBurst(): UseLoveBurstResult {
  const [loveCount, setLoveCount] = useState<number>(loadLoveCount);
  const [homeHearts, setHomeHearts] = useState<readonly LoveBurstParticle[]>([]);

  const triggerLoveBurst = useCallback((e?: React.MouseEvent<HTMLElement>) => {
    let x = 50;
    let y = 45;
    if (e) {
      const rect = e.currentTarget.getBoundingClientRect();
      x = ((e.clientX - rect.left) / rect.width) * 100;
      y = ((e.clientY - rect.top) / rect.height) * 100;
    }
    const newParticles = Array.from({ length: 6 }).map((_, idx) => ({
      id: Math.random() + idx,
      x: x + (Math.random() * 20 - 10),
      y: y + (Math.random() * 20 - 10),
      emoji: EMOJI_BURST_POOL[Math.floor(Math.random() * EMOJI_BURST_POOL.length)],
      scale: 0.8 + Math.random() * 0.6,
      rot: Math.random() * 60 - 30
    }));
    setHomeHearts(prev => [...prev, ...newParticles].slice(-36));
    setLoveCount(prev => {
      const next = prev + 1;
      saveLoveCount(next);
      return next;
    });
  }, []);

  useEffect(() => {
    if (homeHearts.length > 0) {
      const timer = setTimeout(() => {
        setHomeHearts(prev => prev.slice(6));
      }, 1400);
      return () => clearTimeout(timer);
    }
  }, [homeHearts]);

  const clearHearts = useCallback(() => {
    setHomeHearts([]);
  }, []);

  return { loveCount, homeHearts, triggerLoveBurst, clearHearts };
}

export interface UsePasscodeResult {
  readonly typedCode: string;
  readonly isPasscodeWrong: boolean;
  readonly handleKeypadPress: (val: string) => void;
  readonly handleBackspace: () => void;
  readonly resetPasscode: () => void;
  readonly setTypedCode: (code: string) => void;
}

export function usePasscode(passcode: string, onSuccess: () => void): UsePasscodeResult {
  const [typedCode, setTypedCode] = useState("");
  const [isPasscodeWrong, setIsPasscodeWrong] = useState(false);

  // Keep a ref of onSuccess to avoid stale closure issues or extra triggers
  const onSuccessRef = React.useRef(onSuccess);
  useEffect(() => {
    onSuccessRef.current = onSuccess;
  }, [onSuccess]);

  const handleKeypadPress = useCallback((val: string) => {
    if (typedCode.length < 4) {
      const nextCode = typedCode + val;
      setTypedCode(nextCode);
      
      if (nextCode.length === 4) {
        if (nextCode === passcode) {
          const t = setTimeout(() => {
            onSuccessRef.current();
          }, 600);
          return () => clearTimeout(t);
        } else {
          const t = setTimeout(() => {
            setIsPasscodeWrong(true);
          }, 200);
          return () => clearTimeout(t);
        }
      }
    }
  }, [typedCode, passcode]);

  const handleBackspace = useCallback(() => {
    if (typedCode.length > 0) {
      setTypedCode(typedCode.slice(0, -1));
    }
  }, [typedCode]);

  const resetPasscode = useCallback(() => {
    setTypedCode("");
    setIsPasscodeWrong(false);
  }, []);

  return {
    typedCode,
    isPasscodeWrong,
    handleKeypadPress,
    handleBackspace,
    resetPasscode,
    setTypedCode,
  };
}

export interface UseQuestionScreenResult {
  readonly clickNoCount: number;
  readonly isNoModalOpen: boolean;
  readonly setIsNoModalOpen: (open: boolean) => void;
  readonly yesScale: number;
  readonly noScale: number;
  readonly isShaking: boolean;
  readonly handleNoClick: () => void;
  readonly resetQuestionScreen: () => void;
}

export function useQuestionScreen(): UseQuestionScreenResult {
  const [clickNoCount, setClickNoCount] = useState(0);
  const [isNoModalOpen, setIsNoModalOpen] = useState(false);
  const [yesScale, setYesScale] = useState(1);
  const [noScale, setNoScale] = useState(1);
  const [isShaking, setIsShaking] = useState(false);

  const handleNoClick = useCallback(() => {
    setClickNoCount(prev => prev + 1);
    setIsNoModalOpen(true);
    setIsShaking(true);
    const shakeTimer = setTimeout(() => setIsShaking(false), 450);
    
    setYesScale(prev => Math.min(2.5, prev + 0.18));
    setNoScale(prev => Math.max(0.55, prev - 0.12));

    return () => clearTimeout(shakeTimer);
  }, []);

  const resetQuestionScreen = useCallback(() => {
    setClickNoCount(0);
    setIsNoModalOpen(false);
    setYesScale(1);
    setNoScale(1);
    setIsShaking(false);
  }, []);

  return {
    clickNoCount,
    isNoModalOpen,
    setIsNoModalOpen,
    yesScale,
    noScale,
    isShaking,
    handleNoClick,
    resetQuestionScreen,
  };
}

export interface UseStoryProgressResult {
  readonly slideProgress: number;
}

export function useStoryProgress(
  section: AppSection,
  currentStoryIndex: number,
  setCurrentStoryIndex: React.Dispatch<React.SetStateAction<number>>,
  isPlaying: boolean,
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
): UseStoryProgressResult {
  const [slideProgress, setSlideProgress] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (section === AppSection.Closing && isPlaying) {
      const currentText = STORY_PARAGRAPHS[currentStoryIndex];
      const totalDuration = Math.max(5000, currentText.length * 45 + 2200);
      const intervalMs = 100;
      let elapsed = 0;

      setSlideProgress(0);

      timer = setInterval(() => {
        elapsed += intervalMs;
        const pct = Math.min(100, (elapsed / totalDuration) * 100);
        setSlideProgress(pct);

        if (elapsed >= totalDuration) {
          if (timer) clearInterval(timer);
          if (currentStoryIndex < STORY_PARAGRAPHS.length - 1) {
            setCurrentStoryIndex(prev => prev + 1);
            setSlideProgress(0);
          } else {
            setIsPlaying(false);
            setSlideProgress(100);
          }
        }
      }, intervalMs);
    } else if (!isPlaying) {
      setSlideProgress(0);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [section, isPlaying, currentStoryIndex, setCurrentStoryIndex, setIsPlaying]);

  return { slideProgress };
}
