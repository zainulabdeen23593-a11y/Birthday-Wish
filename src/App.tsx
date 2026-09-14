/**
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useReducer, useCallback } from 'react';
import { 
  AppSection, 
  ConfettiParticle, 
  BalloonState, 
  EmberState, 
  ExtraCatHeart 
} from './types';
import {
  DEFAULT_PASSCODE,
  STORY_PARAGRAPHS,
  CONFETTI_COLORS,
  BALLOON_COLORS,
  EMOJI_BURST_POOL,
  candlesReducer,
  useLoveBurst,
  usePasscode,
  useQuestionScreen,
  useStoryProgress,
  useClickReactions
} from './utils';
import { LandingSection } from './components/LandingSection';
import { PasscodeSection } from './components/PasscodeSection';
import { QuestionSection } from './components/QuestionSection';
import { CelebrationSection } from './components/CelebrationSection';
import { CakeSection } from './components/CakeSection';
import { GallerySection } from './components/GallerySection';
import { ClosingSection } from './components/ClosingSection';
import { ClickReactionOverlay } from './components/SubComponents';
import { AnimeSky, FallingSakura, MangaCorners } from './components/AnimeTheme';

export default function App() {
  const [section, setSection] = useState<AppSection>(AppSection.Landing);

  const { loveCount, homeHearts, triggerLoveBurst, clearHearts } = useLoveBurst();
  const { reactions, spawnReaction } = useClickReactions();
  
  const [peachGomaSrc, setPeachGomaSrc] = useState(
    "/peach-goma.gif"
  );

  const handlePeachGomaError = useCallback(() => {
    setPeachGomaSrc("https://media.tenor.com/E8v4Cof58h0AAAAC/peach-and-goma-peach-goma.gif");
  }, []);

  const {
    typedCode,
    isPasscodeWrong,
    handleKeypadPress,
    handleBackspace,
    resetPasscode,
    setTypedCode
  } = usePasscode(DEFAULT_PASSCODE, () => {
    setSection(AppSection.Question);
  });

  const {
    clickNoCount,
    isNoModalOpen,
    setIsNoModalOpen,
    yesScale,
    noScale,
    isShaking,
    handleNoClick,
    resetQuestionScreen
  } = useQuestionScreen();

  const [isCatWiggling, setIsCatWiggling] = useState(false);
  const [extraHearts, setExtraHearts] = useState<readonly ExtraCatHeart[]>([]);

  const triggerCatWiggle = useCallback(() => {
    setIsCatWiggling(true);
    const wiggleTimer = setTimeout(() => setIsCatWiggling(false), 650);
    
    const burst = Array.from({ length: 5 }).map((_, i) => ({
      id: Date.now() + i,
      left: 10 + Math.random() * 80,
      top: 10 + Math.random() * 80,
      delay: i * 80,
      emoji: EMOJI_BURST_POOL[Math.floor(Math.random() * EMOJI_BURST_POOL.length)]
    }));
    setExtraHearts(prev => [...prev, ...burst]);

    const cleanupTimer = setTimeout(() => {
      setExtraHearts(prev => prev.filter(h => !burst.some(b => b.id === h.id)));
    }, 1500);

    return () => {
      clearTimeout(wiggleTimer);
      clearTimeout(cleanupTimer);
    };
  }, []);

  const [confetti, setConfetti] = useState<readonly ConfettiParticle[]>([]);
  const [balloons, setBalloons] = useState<readonly BalloonState[]>([]);

  const [candles, dispatchCandles] = useReducer(candlesReducer, [
    { id: 1, lit: true, smoked: false, smokeParticles: [] },
    { id: 2, lit: true, smoked: false, smokeParticles: [] },
    { id: 3, lit: true, smoked: false, smokeParticles: [] },
    { id: 4, lit: true, smoked: false, smokeParticles: [] },
    { id: 5, lit: true, smoked: false, smokeParticles: [] },
  ]);

  const [embers, setEmbers] = useState<readonly EmberState[]>([]);

  const [galleryImg1Error, setGalleryImg1Error] = useState(false);
  const [galleryImg2Error, setGalleryImg2Error] = useState(false);
  const [galleryImg3Error, setGalleryImg3Error] = useState(false);
  const [activeHeartPhoto, setActiveHeartPhoto] = useState<string | null>(null);

  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const { slideProgress } = useStoryProgress(
    section,
    currentStoryIndex,
    setCurrentStoryIndex,
    isPlaying,
    setIsPlaying
  );

  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    const generatedEmbers = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 10}s`,
      duration: `${10 + Math.random() * 15}s`,
      size: `${3 + Math.random() * 5}px`
    }));
    setEmbers(generatedEmbers);
  }, []);

  const startCelebrationEffects = useCallback(() => {
    const newConfetti = Array.from({ length: 85 }).map((_, i) => ({
      id: i,
      left: `${20 + Math.random() * 60}%`,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      size: `${6 + Math.random() * 12}px`,
      delay: `${Math.random() * 1.5}s`,
      duration: `${2.5 + Math.random() * 2}s`,
      rotation: `${Math.random() * 360}deg`
    }));
    setConfetti(newConfetti);

    const newBalloons = Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      left: `${10 + (i * 85 / 9)}%`,
      color: BALLOON_COLORS[i % BALLOON_COLORS.length],
      delay: `${i * 0.4}s`,
      duration: `${6 + Math.random() * 4}s`,
      size: `${45 + Math.random() * 25}px`
    }));
    setBalloons(newBalloons);

    const autoAdvanceTimer = setTimeout(() => {
      setSection(AppSection.Cake);
    }, 4800);

    return () => clearTimeout(autoAdvanceTimer);
  }, []);

  useEffect(() => {
    if (section === AppSection.Celebration) {
      return startCelebrationEffects();
    }
  }, [section, startCelebrationEffects]);

  const blowCandle = useCallback((id: number) => {
    dispatchCandles({ type: 'BLOW_CANDLE', id });
  }, []);

  const blowAllCandles = useCallback(() => {
    candles.forEach((c, idx) => {
      if (c.lit) {
        setTimeout(() => blowCandle(c.id), idx * 120);
      }
    });
  }, [candles, blowCandle]);

  useEffect(() => {
    if (section === AppSection.Cake) {
      const allBlown = candles.every(c => !c.lit);
      if (allBlown) {
        const timer = setTimeout(() => {
          setSection(AppSection.Gallery);
        }, 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [candles, section]);

  const restartApp = useCallback(() => {
    setIsResetting(true);
    const resetTimer = setTimeout(() => {
      setSection(AppSection.Landing);
      resetPasscode();
      resetQuestionScreen();
      clearHearts();
      dispatchCandles({ type: 'RESET' });
      
      setCurrentStoryIndex(0);
      setIsPlaying(false);
      
      setIsCatWiggling(false);
      setExtraHearts([]);
      setGalleryImg1Error(false);
      setGalleryImg2Error(false);
      setGalleryImg3Error(false);
      setActiveHeartPhoto(null);
      setIsResetting(false);
    }, 450);

    return () => clearTimeout(resetTimer);
  }, [resetPasscode, resetQuestionScreen, clearHearts]);

  return (
    <div 
      id="app-container" 
      onClick={spawnReaction}
      className="h-dvh bg-[#0b1029] text-gray-100 flex flex-col items-center justify-center relative overflow-hidden select-none"
    >
      <AnimeSky />
      <FallingSakura count={10} />
      <ClickReactionOverlay reactions={reactions} />
      <div className="absolute inset-0 grain-overlay pointer-events-none opacity-[0.45] z-10" aria-hidden="true" />

      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        {section >= AppSection.Gallery && embers.map(ember => (
          <div 
            key={ember.id} 
            className="absolute rounded-full bg-cyan-300/25 blur-[1px]"
            style={{
              left: ember.left,
              bottom: '-50px',
              width: ember.size,
              height: ember.size,
              animationName: 'slowDrift',
              animationDuration: section === AppSection.Gallery ? `calc(${ember.duration} * 2.2)` : ember.duration,
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
              animationDelay: ember.delay
            }}
          />
        ))}
      </div>

      <main 
        id="main-frame" 
        className={`manga-volume w-full relative flex flex-col justify-between overflow-hidden z-10 transition-all duration-400 ${
          isShaking ? "animate-screen-shake" : ""
        }`}
      >
        <FallingSakura count={5} />
        <MangaCorners />
        <div className="manga-halftone" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 rounded-[22px] bg-[radial-gradient(circle_at_center,transparent_42%,rgba(20,12,40,0.08)_100%)] z-10" aria-hidden="true" />

        <div className={`absolute inset-0 bg-white z-50 pointer-events-none transition-opacity duration-500 ${isResetting ? "opacity-100" : "opacity-0"}`} aria-hidden="true" />
        
        {section === AppSection.Landing && (
          <LandingSection
            loveCount={loveCount}
            homeHearts={homeHearts}
            peachGomaSrc={peachGomaSrc}
            onPeachGomaError={handlePeachGomaError}
            triggerLoveBurst={triggerLoveBurst}
            onNext={() => setSection(AppSection.Passcode)}
          />
        )}

        {section === AppSection.Passcode && (
          <PasscodeSection
            isCatWiggling={isCatWiggling}
            triggerCatWiggle={triggerCatWiggle}
            extraHearts={extraHearts}
            typedCode={typedCode}
            isPasscodeWrong={isPasscodeWrong}
            handleKeypadPress={handleKeypadPress}
            handleBackspace={handleBackspace}
            resetPasscode={resetPasscode}
            setTypedCode={setTypedCode}
          />
        )}

        {section === AppSection.Question && (
          <QuestionSection
            yesScale={yesScale}
            noScale={noScale}
            clickNoCount={clickNoCount}
            isNoModalOpen={isNoModalOpen}
            setIsNoModalOpen={setIsNoModalOpen}
            handleNoClick={handleNoClick}
            onYes={() => setSection(AppSection.Celebration)}
          />
        )}

        {section === AppSection.Celebration && (
          <CelebrationSection
            confetti={confetti}
            balloons={balloons}
            onNext={() => setSection(AppSection.Cake)}
          />
        )}

        {section === AppSection.Cake && (
          <CakeSection
            candles={candles}
            blowCandle={blowCandle}
            blowAllCandles={blowAllCandles}
          />
        )}

        {section === AppSection.Gallery && (
          <GallerySection
            galleryImg1Error={galleryImg1Error}
            galleryImg2Error={galleryImg2Error}
            galleryImg3Error={galleryImg3Error}
            setGalleryImg1Error={setGalleryImg1Error}
            setGalleryImg2Error={setGalleryImg2Error}
            setGalleryImg3Error={setGalleryImg3Error}
            activeHeartPhoto={activeHeartPhoto}
            setActiveHeartPhoto={setActiveHeartPhoto}
            onNext={() => setSection(AppSection.Closing)}
          />
        )}

        {section === AppSection.Closing && (
          <ClosingSection
            homeHearts={homeHearts}
            triggerLoveBurst={triggerLoveBurst}
            currentStoryIndex={currentStoryIndex}
            setCurrentStoryIndex={setCurrentStoryIndex}
            slideProgress={slideProgress}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            restartApp={restartApp}
            storyParagraphs={STORY_PARAGRAPHS}
          />
        )}

      </main>
    </div>
  );
}
