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

export const DEFAULT_PASSCODE = "0523";
export const DEFAULT_LOVE_COUNT_KEY = "pookie_love_count";
export const BASE_LOVE_COUNT = 520;

export const STORY_PARAGRAPHS: readonly string[] = [
  "Wish",
  "No emoji spoiler alert!  Tick tick. !",
  "It is 12:00 now and It was not just the day when you were born in the planet earth it was the eye catching scenario of my life when this day came and it remind me of the moment when my entire universe begin",
  "yes in the term of physics it start with the famous theory called \"big bang\" but mine one start with your birthday \"5 August \"",
  "i wish i can see the stunning beauty time when you were born to make my life beautiful and growing and i wish the world were ending tomorrow then I could celebrate your birthday and disappear with you and we never exist",
  "come with me muqadas fatima we are going to love each other without any fear or restraint perhaps we love unconditionally from the past 4 years to till the last breast of muhammad moiz and muqadas fatima",
  "rather than living in horrible past why not we start the new journey on your birth-year of 2026 the shining and pretty present  where we are the one with unreadable harmony with each other",
  "yes we have faced the worst circumstances of life but on the other hand we have the loveliest memories together that are making is both fall for each other every day every month and every year!!",
  "last but not the least i am giving you the commitment that i want to do everything for you and im doing! Whatever you love or hatess this goes to my personal opinion if you hate something it means that thing should be hated by me also!",
  "Now in every obstacle moiz is always yours! As you stand up with me every-time i take the swear to do the same"
] as const;

// Final closing long message inserted as the last slide (exact text preserved)
export const FINAL_CLOSING_MESSAGE = `"Wish
No emoji spoiler alert!  Tick tick. ! It is 12:00 now and It was not just the day when you were born in the planet earth it was the eye catching scenario of my life when this day came and it remind me of the moment when my entire universe begin yes in the term of physics it start with the famous theory called "big bang" but mine one start with your birthday "5 August " i wish i can see the stunning beauty time when you were born to make my life beautiful and growing and i wish the world were ending tomorrow then I could celebrate your birthday and disappear with you and we never exist come with me muqadas fatima we are going to love each other without any fear or restraint perhaps we love unconditionally from the past 4 years to till the last breast of muhammad moiz and muqadas fatima rather than living in horrible past why not we start the new journey on your birth-year of 2026 the shining and pretty present  where we are the one with unreadable harmony with each other yes we have faced the worst circumstances of life but on the other hand we have the loveliest memories together that are making is both fall for each other every day every month and every year!!last but not the least i am giving you the commitment that i want to do everything for you and im doing! Whatever you love or hatess this goes to my personal opinion if you hate something it means that thing should be hated by me also! Now in every obstacle moiz is always yours! As you stand up with me every-time i take the swear to do the same`;

export const EMOJI_BURST_POOL: readonly string[] = ["💖", "🌸", "✨", "🥰", "🎀", "🧸", "🍭", "🍬", "🍰", "🎈"] as const;
export const CONFETTI_COLORS: readonly string[] = ['#f6caca', '#c9a7eb', '#ffd89b', '#4fa3e3', '#E23636', '#a7f3d0', '#f59e0b'] as const;
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
