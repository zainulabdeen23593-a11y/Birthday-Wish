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
  getSectionBgClass,
  candlesReducer,
  useLoveBurst,
  usePasscode,
  useQuestionScreen,
  useStoryProgress
} from './utils';
import { LandingSection } from './components/LandingSection';
import { PasscodeSection } from './components/PasscodeSection';
import { QuestionSection } from './components/QuestionSection';
import { CelebrationSection } from './components/CelebrationSection';
import { CakeSection } from './components/CakeSection';
import { ApologySection } from './components/ApologySection';
import { GallerySection } from './components/GallerySection';
import { ClosingSection } from './components/ClosingSection';

export default function App() {
  const [section, setSection] = useState<AppSection>(AppSection.Landing);

  // Love Burst state managed via custom hook
  const { loveCount, homeHearts, triggerLoveBurst, clearHearts } = useLoveBurst();
  
  // Custom GIF background path with offline fallback error handling
  const [peachGomaSrc, setPeachGomaSrc] = useState(
    "/Peach Peach And Goma Sticker - Peach Peach and goma Peach flower - GIF \u3092\u898b\u3064\u3051\u3066\u5171\u6709\u3059\u308b.gif"
  );

  const handlePeachGomaError = useCallback(() => {
    setPeachGomaSrc("https://media.tenor.com/E8v4Cof58h0AAAAC/peach-and-goma-peach-goma.gif");
  }, []);

  // Section 1.5: Passcode lock screen entry state managed via hook
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

  // Section 1.8: Question screen YES/NO size transitions state managed via hook
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

  // Section 1.5: Cat tap wiggle animation state
  const [isCatWiggling, setIsCatWiggling] = useState(false);
  const [extraHearts, setExtraHearts] = useState<readonly ExtraCatHeart[]>([]);

  const triggerCatWiggle = useCallback(() => {
    setIsCatWiggling(true);
    const wiggleTimer = setTimeout(() => setIsCatWiggling(false), 650);
    
    // Burst of 4 extra floating hearts around the sticker tap area
    const burst = Array.from({ length: 4 }).map((_, i) => ({
      id: Date.now() + i,
      left: 10 + Math.random() * 80,
      top: 10 + Math.random() * 80,
      delay: i * 80
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

  // Section 2: Celebration interactive particles
  const [confetti, setConfetti] = useState<readonly ConfettiParticle[]>([]);
  const [balloons, setBalloons] = useState<readonly BalloonState[]>([]);

  // Section 3: Birthday candles state
  const [candles, dispatchCandles] = useReducer(candlesReducer, [
    { id: 1, lit: true, smoked: false, smokeParticles: [] },
    { id: 2, lit: true, smoked: false, smokeParticles: [] },
    { id: 3, lit: true, smoked: false, smokeParticles: [] },
    { id: 4, lit: true, smoked: false, smokeParticles: [] },
    { id: 5, lit: true, smoked: false, smokeParticles: [] },
  ]);

  // Section 4: Progressive line transitions and warm backgrounds
  const [apologyLinesRevealed, setApologyLinesRevealed] = useState(0);
  const [embers, setEmbers] = useState<readonly EmberState[]>([]);

  // Section 5: Gallery scrapbook states
  const [galleryImg1Error, setGalleryImg1Error] = useState(false);
  const [galleryImg2Error, setGalleryImg2Error] = useState(false);
  const [galleryImg3Error, setGalleryImg3Error] = useState(false);
  const [activeHeartPhoto, setActiveHeartPhoto] = useState<string | null>(null);

  // Section 6: Closing autoplay / manual progress notes
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const { slideProgress } = useStoryProgress(
    section,
    currentStoryIndex,
    setCurrentStoryIndex,
    isPlaying,
    setIsPlaying
  );

  // Global reset transition state
  const [isResetting, setIsResetting] = useState(false);

  // ------------------------------------------------------------
  // EFFECTS & LIFECYCLES
  // ------------------------------------------------------------

  // Generate slow backdrop glowing embers on mount
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

  // Section 2: Celebration effects triggers
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

  // Section 3: Blowing Candle Handlers
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

  // Auto transition Section 3 -> Section 4 when candles blown out
  useEffect(() => {
    if (section === AppSection.Cake) {
      const allBlown = candles.every(c => !c.lit);
      if (allBlown) {
        const timer = setTimeout(() => {
          setSection(AppSection.Apology);
        }, 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [candles, section]);

  // Section 4: Progressive apology fades timers
  useEffect(() => {
    if (section === AppSection.Apology) {
      setApologyLinesRevealed(1);
      const timers = [
        setTimeout(() => setApologyLinesRevealed(2), 2200),
        setTimeout(() => setApologyLinesRevealed(3), 4400),
        setTimeout(() => setApologyLinesRevealed(4), 6800),
        setTimeout(() => setApologyLinesRevealed(5), 9200),
        setTimeout(() => setApologyLinesRevealed(6), 11500) // Shows continue button
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, [section]);

  // Global clean restart handler
  const restartApp = useCallback(() => {
    setIsResetting(true);
    const resetTimer = setTimeout(() => {
      setSection(AppSection.Landing);
      resetPasscode();
      resetQuestionScreen();
      clearHearts();
      dispatchCandles({ type: 'RESET' });
      setApologyLinesRevealed(0);
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
      className={`min-h-screen ${getSectionBgClass(section)} text-gray-100 flex flex-col items-center justify-center p-4 relative overflow-hidden select-none`}
    >
      {/* Low-opacity SVG noise / paper grain overlay */}
      <div className="absolute inset-0 grain-overlay pointer-events-none opacity-[0.75] z-10 animate-fade-in" aria-hidden="true" />

      {/* Cozy Blurred Backdrop Blobs */}
      <div 
        className={`absolute inset-0 pointer-events-none overflow-hidden z-0 transition-opacity duration-1000 ${
          section === AppSection.Apology ? "opacity-[0.12]" : "opacity-35"
        }`}
        aria-hidden="true"
      >
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-pink-300 blur-[85px] animate-blob-1" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-rose-200 blur-[95px] animate-blob-2" />
        <div 
          className="absolute top-1/2 right-10 w-64 h-64 rounded-full bg-purple-200 blur-[85px] animate-blob-1" 
          style={{ animationDelay: '-4s' }} 
        />
      </div>

      {/* Floating Ambient Light Specks (Active from Apology onwards) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        {section >= AppSection.Apology && embers.map(ember => (
          <div 
            key={ember.id} 
            className="absolute rounded-full bg-rose-300/25 blur-[1px]"
            style={{
              left: ember.left,
              bottom: '-50px',
              width: ember.size,
              height: ember.size,
              animationName: 'slowDrift',
              animationDuration: section === AppSection.Apology ? `calc(${ember.duration} * 2.2)` : ember.duration,
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
              animationDelay: ember.delay
            }}
          />
        ))}
      </div>

      {/* Main Responsive Mobile-First Screen Framework */}
      <main 
        id="main-frame" 
        className={`w-full max-w-md aspect-[9/16] max-h-[850px] bg-white/80 backdrop-blur-md rounded-3xl border-4 border-pink-200/80 shadow-[0_20px_50px_rgba(244,63,94,0.12)] relative flex flex-col justify-between overflow-hidden z-10 p-6 transition-all duration-1000 ${
          isShaking ? "animate-screen-shake" : ""
        }`}
      >
        {/* Soft inner-glow spotlight vignette */}
        <div id="pookie-vignette" className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_center,transparent_45%,rgba(244,63,94,0.05)_100%)] z-10" aria-hidden="true" />

        {/* Full-screen White Transition Overlay on reset */}
        <div className={`absolute inset-0 bg-white z-50 pointer-events-none transition-opacity duration-500 ${isResetting ? "opacity-100" : "opacity-0"}`} aria-hidden="true" />
        
        {/* ------------------------------------------------------------
            ROUTING SECTION VIEWS
            ------------------------------------------------------------ */}
        
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

        {section === AppSection.Apology && (
          <ApologySection
            apologyLinesRevealed={apologyLinesRevealed}
            onNext={() => setSection(AppSection.Gallery)}
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
