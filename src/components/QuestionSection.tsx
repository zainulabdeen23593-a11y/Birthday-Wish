/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface QuestionSectionProps {
  readonly yesScale: number;
  readonly noScale: number;
  readonly clickNoCount: number;
  readonly isNoModalOpen: boolean;
  readonly setIsNoModalOpen: (open: boolean) => void;
  readonly handleNoClick: () => void;
  readonly onYes: () => void;
}

export const QuestionSection: React.FC<QuestionSectionProps> = ({
  yesScale,
  noScale,
  clickNoCount,
  isNoModalOpen,
  setIsNoModalOpen,
  handleNoClick,
  onYes,
}) => {
  return (
    <div id="section-question" className="flex-1 flex flex-col justify-between py-10 items-center text-center animate-fade-slide-up">
      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        {/* Cute interactive question sticker gif container */}
        <div className="relative group select-none transition-all duration-300 hover:scale-105 ease-out animate-float">
          {/* Custom glowing backdrop */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-pink-300/35 to-rose-300/35 rounded-full blur-2xl group-hover:scale-110 transition-all duration-500 -z-10 animate-pulse" />
          <div className="w-32 h-32 rounded-full border-4 border-pink-300 overflow-hidden bg-white shadow-lg flex items-center justify-center p-1.5 relative z-10">
            <img 
              src="/8022105582831715.gif" 
              className="w-full h-full object-cover rounded-full"
              referrerPolicy="no-referrer"
              alt="Cute interactive question sticker"
            />
          </div>
        </div>

        <div className="space-y-4 px-4">
          <h2 className="font-serif-elegant text-2xl md:text-3xl text-rose-700 text-glow-rose font-semibold">
            I made something special for you...
          </h2>
          <p className="text-lg text-pink-600 font-script text-4xl font-semibold">
            Do you want to see it? 👉👈
          </p>
        </div>
      </div>

      <div className="w-full flex items-center justify-center gap-4 px-4 min-h-[96px]">
        <div style={{ transform: `scale(${yesScale})` }} className="transition-all duration-300 origin-center">
          <button
            type="button"
            onClick={onYes}
            className="py-3 px-6 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-xl font-semibold shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer border-2 border-pink-100 whitespace-nowrap"
          >
            YES! 🥰
          </button>
        </div>
        <div style={{ transform: `scale(${noScale})` }} className="transition-all duration-300 origin-center">
          <button
            type="button"
            onClick={handleNoClick}
            className="py-3 px-6 bg-white border-2 border-pink-200 text-rose-700 hover:bg-pink-50 hover:text-rose-900 rounded-xl font-semibold transition-all active:scale-95 cursor-pointer shadow-sm whitespace-nowrap"
          >
            NO 😢
          </button>
        </div>
      </div>

      {/* CUTE "WHY DID U CLICK NO" OVERLAY */}
      {isNoModalOpen && (
        <div className="absolute inset-0 bg-white/95 backdrop-blur-sm border-4 border-pink-200 flex flex-col items-center justify-center p-6 z-40 animate-fade-slide-up text-center">
          <div className="relative mb-4 group select-none transition-all duration-300 animate-soft-breath">
            <div className="absolute -inset-3 bg-gradient-to-tr from-rose-400/20 to-pink-400/20 rounded-full blur-xl -z-10 animate-pulse" />
            <div className="w-32 h-32 rounded-full border-4 border-rose-300 overflow-hidden bg-white shadow-lg flex items-center justify-center p-1.5">
              <img 
                src="/302796774970461460 (1).gif" 
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
                alt="Cute pouting love in anger style sticker"
              />
            </div>
          </div>
          <h3 className="text-2xl font-serif text-rose-700 tracking-wide font-bold flex items-center justify-center gap-1.5 animate-pulse">
            Hmph! No is not allowed! 😤💕
          </h3>
          <p className="text-rose-950 mt-3 max-w-xs text-sm font-semibold leading-relaxed min-h-[4.5rem] flex items-center justify-center text-center px-4">
            {clickNoCount % 5 === 1 
              ? "Hey! Don't click NO! I worked day and night on this surprise for you! 😤💕" 
              : clickNoCount % 5 === 2 
              ? "Hmph! No is not an option! You must see how much I love you! 😤💖" 
              : clickNoCount % 5 === 3 
              ? "Are you trying to make me pout? Pretty please look at it! 🥺❤️" 
              : clickNoCount % 5 === 4 
              ? "I won't let you leave until you click YES! 😤🎀" 
              : "I am officially pouting now! Please click Yes! 😤🐾"}
          </p>
          <button
            type="button"
            onClick={() => setIsNoModalOpen(false)}
            className="mt-6 px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-semibold shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer border-2 border-pink-100"
          >
            Okay, fine! Let me see! 🥰
          </button>
        </div>
      )}
    </div>
  );
};
