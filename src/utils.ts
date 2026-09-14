/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { 
  AppSection, 
  LoveBurstParticle, 
  CandleState, 
  CandlesAction,
  ClickReaction,
  ReactionMood
} from './types';

// ============================================================================
// CONSTANTS
// ============================================================================

export const DEFAULT_PASSCODE = "1413";
export const DEFAULT_LOVE_COUNT_KEY = "pookie_love_count";
export const BASE_LOVE_COUNT = 1100;
export const BESTIE_NAME = "Ghana";

export const STORY_PARAGRAPHS: readonly string[] = [
  "Ghana.",
  "Late. I know. Roast me. I'll wait.",
  "Okay done? Cool. Now listen —",
  "If we were in a cartoon, I'd be that bestu running in through the window with a tilted cake, out of breath, still saying \"I made it.\" And you'd be standing there like \"seriously?\" but laughing anyway. That's literally us.",
  "Okay now I'm being real for a sec.",
  "You're not just someone who's there. You're someone who stays. 3am calls, stupid fights, saving seats — you show up. Every time. That's not common, Ghana.",
  "That's you being rare without even trying.",
  "Happy Belated Birthday, bestie.",
  "Late gift. Loud heart. Same bestu. 😭🔥💖",
  "Next year I'll be on time. Maybe."
] as const;

export const FINAL_CLOSING_MESSAGE = STORY_PARAGRAPHS[STORY_PARAGRAPHS.length - 1];

export const FUNNY_REACTIONS: readonly string[] = ["😂", "🤣", "💀", "Oye?!", "LOL", "🫠", "🤡", "Uff yaar"] as const;
export const SAD_REACTIONS: readonly string[] = ["😭", "🥺", "😿", "maaf kar", "late...", "💧", "💔", "sorry yaar"] as const;
export const LOVE_REACTIONS: readonly string[] = ["💖", "🤝", "⭐", "🔥", "zabardast", "bestie", "✨", "🫂"] as const;
export const EMOJI_BURST_POOL: readonly string[] = [
  ...FUNNY_REACTIONS, ...SAD_REACTIONS, ...LOVE_REACTIONS
] as const;

export const NO_RESPONSES: readonly { mood: ReactionMood; title: string; body: string }[] = [
  { mood: "funny", title: "Oye?!", body: "Late gift reject? Bestie law mein illegal. YES ko +50 XP. 😂" },
  { mood: "sad", title: "Maaf kar scene...", body: "Raat jag ke banaya aur NO? Sad window start. 😭" },
  { mood: "love", title: "Bestie check", body: "Accept kar. Roast-karke-phir-aa-jana wala pyaar. 💖" },
  { mood: "funny", title: "Plot armor on", body: "NO ne YES ko power-up de diya. Apni haar pakka kar rahi hai. 💀" },
  { mood: "sad", title: "Late, fake nahi", body: "Late mera qasoor. Magar NO option nahi. 🥺" },
  { mood: "love", title: "Bestu-besti rule", body: "Aisa nahi chalta. YES daba. Cake le ke khara hoon. 🤝" },
];

export const CONFETTI_COLORS: readonly string[] = ['#22d3ee', '#f472b6', '#fbbf24', '#a78bfa', '#fb7185', '#4ade80', '#38bdf8'] as const;
export const BALLOON_COLORS: readonly string[] = [
  'rgba(34, 211, 238, 0.85)',
  'rgba(244, 114, 182, 0.85)',
  'rgba(251, 191, 36, 0.85)',
  'rgba(167, 139, 250, 0.85)',
  'rgba(251, 113, 133, 0.85)'
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

export const getNoResponse = (clickNoCount: number) =>
  NO_RESPONSES[(Math.max(1, clickNoCount) - 1) % NO_RESPONSES.length];

export interface UseClickReactionsResult {
  readonly reactions: readonly ClickReaction[];
  readonly spawnReaction: (e: React.MouseEvent<HTMLElement>) => void;
}

export function useClickReactions(): UseClickReactionsResult {
  const [reactions, setReactions] = useState<readonly ClickReaction[]>([]);
  const moodIndex = React.useRef(0);

  const spawnReaction = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const moods: readonly ReactionMood[] = ['funny', 'sad', 'love'];
    const mood = moods[moodIndex.current % 3];
    moodIndex.current += 1;

    const pool = mood === 'funny'
      ? FUNNY_REACTIONS
      : mood === 'sad'
        ? SAD_REACTIONS
        : LOVE_REACTIONS;

    const rect = e.currentTarget.getBoundingClientRect();
    const next: ClickReaction = {
      id: Date.now() + Math.random(),
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      text: pool[Math.floor(Math.random() * pool.length)],
      mood,
      rot: Math.random() * 28 - 14,
    };

    setReactions(prev => [...prev, next].slice(-28));
    window.setTimeout(() => {
      setReactions(prev => prev.filter(r => r.id !== next.id));
    }, 1100);
  }, []);

  return { reactions, spawnReaction };
}
