/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HeartSilhouetteBorder } from './SubComponents';

interface GallerySectionProps {
  readonly galleryImg1Error: boolean;
  readonly galleryImg2Error: boolean;
  readonly galleryImg3Error: boolean;
  readonly setGalleryImg1Error: (err: boolean) => void;
  readonly setGalleryImg2Error: (err: boolean) => void;
  readonly setGalleryImg3Error: (err: boolean) => void;
  readonly activeHeartPhoto: string | null;
  readonly setActiveHeartPhoto: (photo: string | null) => void;
  readonly onNext: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  galleryImg1Error,
  galleryImg2Error,
  galleryImg3Error,
  setGalleryImg1Error,
  setGalleryImg2Error,
  setGalleryImg3Error,
  activeHeartPhoto,
  setActiveHeartPhoto,
  onNext,
}) => {
  return (
    <div id="section-gallery" className="flex-1 flex flex-col justify-between py-6 animate-fade-slide-up relative">
      <img src="/spider-web.svg" alt="web" className="absolute top-3 left-3 w-20 h-20 opacity-8 pointer-events-none" />
      <img src="/rose.svg" alt="rose" className="absolute bottom-6 right-6 w-14 h-14 opacity-95 pointer-events-none" />
      
      {/* SVG Definitions for Heart Clip Path */}
      <svg className="absolute w-0 h-0" width="0" height="0" aria-hidden="true">
        <defs>
          <clipPath id="heart-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0.5, 0.15 C 0.35, -0.05, 0, -0.05, 0, 0.35 C 0, 0.65, 0.3, 0.85, 0.5, 0.98 C 0.7, 0.85, 1, 0.65, 1, 0.35 C 1, -0.05, 0.65, -0.05, 0.5, 0.15 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Main scrapbook area */}
      <div className="flex-1 flex flex-col justify-center items-center my-auto relative select-none">
        
        {/* Hand-drawn style squiggly/wavy line decorations extending on the sides */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 320 280" fill="none" aria-hidden="true">
          {/* Left wavy path */}
          <path 
            d="M 10 160 C 45 130, 35 180, 80 145 C 95 130, 85 165, 110 150" 
            stroke="var(--spider-red)" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="opacity-70 animate-pulse"
          />
          {/* Right wavy path */}
          <path 
            d="M 310 160 C 275 130, 285 180, 240 145 C 225 130, 235 165, 210 150" 
            stroke="var(--spider-red)" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="opacity-70 animate-pulse"
          />
          
          {/* Hand-drawn sparkles/stars around the heart */}
          <path 
            d="M 45 65 Q 48 58 53 63 Q 58 58 61 65 Q 53 75 45 65 Z" 
            stroke="var(--accent-pink)" 
            strokeWidth="1.5" 
            fill="var(--accent-pink)" 
            className="opacity-30 rotate-[-15deg] transform origin-center animate-pulse"
          />
          <path 
            d="M 265 60 Q 268 53 273 58 Q 278 53 281 60 Q 273 70 265 60 Z" 
            stroke="var(--accent-pink)" 
            strokeWidth="1.5" 
            fill="var(--accent-pink)" 
            className="opacity-30 rotate-[15deg] transform origin-center animate-pulse"
          />
        </svg>

        {/* Animated Headline text "Would you be mine?" */}
        <div className="text-center z-20 mb-6 animate-headline-arrive">
          <span className="font-display text-[32px] font-extrabold text-[var(--spider-red)] select-none block animate-breathe-slow leading-tight">
            Would you be mine?
          </span>
        </div>

        {/* Heart-Shaped Collage Frame Container with 3 Hearts */}
        <div className="relative w-[370px] h-[280px] mx-auto z-10">
          
          {/* 1. Main Center Heart (Top/Middle, containing image-1) */}
          <div 
            onClick={() => setActiveHeartPhoto(galleryImg1Error ? "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&w=800&q=80" : "/image-1.png")}
            className="absolute top-[0px] left-[calc(50%-90px)] w-[180px] h-[180px] z-10 transition-all duration-300 hover:scale-105 hover:z-30 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)] cursor-pointer"
          >
            <div className="w-full h-full relative">
              {/* Clipped image */}
              <div className="w-full h-full bg-gradient-to-tr from-pink-50 to-rose-100" style={{ clipPath: 'url(#heart-clip)' }}>
                <img 
                  src={galleryImg1Error ? "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&w=400&q=80" : "/image-1.png"} 
                  onError={() => setGalleryImg1Error(true)}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  referrerPolicy="no-referrer"
                  alt="Center Moment"
                />
              </div>
              {/* Hand-drawn Outer Heart Silhouette Border */}
              <HeartSilhouetteBorder />
            </div>
          </div>

          {/* 2. Left Heart (Lower Left, containing image-2) */}
          <div 
            onClick={() => setActiveHeartPhoto(galleryImg2Error ? "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=800&q=80" : "/image-2.jpg")}
            className="absolute top-[130px] left-[calc(50%-165px)] w-[130px] h-[130px] z-20 rotate-[-12deg] transition-all duration-300 hover:scale-110 hover:rotate-0 hover:z-30 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.18)] cursor-pointer"
          >
            <div className="w-full h-full relative">
              {/* Clipped image */}
              <div className="w-full h-full bg-gradient-to-tr from-pink-50 to-rose-100" style={{ clipPath: 'url(#heart-clip)' }}>
                <img 
                  src={galleryImg2Error ? "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=400&q=80" : "/image-2.jpg"} 
                  onError={() => setGalleryImg2Error(true)}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  referrerPolicy="no-referrer"
                  alt="Left Moment"
                />
              </div>
              {/* Hand-drawn Outer Heart Silhouette Border */}
              <HeartSilhouetteBorder />
            </div>
          </div>

          {/* 3. Right Heart (Lower Right, containing image-3) */}
          <div 
            onClick={() => setActiveHeartPhoto(galleryImg3Error ? "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=800&q=80" : "/image-3.png")}
            className="absolute top-[130px] left-[calc(50%+35px)] w-[130px] h-[130px] z-20 rotate-[12deg] transition-all duration-300 hover:scale-110 hover:rotate-0 hover:z-30 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.18)] cursor-pointer"
          >
            <div className="w-full h-full relative">
              {/* Clipped image */}
              <div className="w-full h-full bg-gradient-to-tr from-pink-50 to-rose-100" style={{ clipPath: 'url(#heart-clip)' }}>
                <img 
                  src={galleryImg3Error ? "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=400&q=80" : "/image-3.png"} 
                  onError={() => setGalleryImg3Error(true)}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  referrerPolicy="no-referrer"
                  alt="Right Moment"
                />
              </div>
              {/* Hand-drawn Outer Heart Silhouette Border */}
              <HeartSilhouetteBorder />
            </div>
          </div>

        </div>

        {/* Heart-Shaped Interactive Full View Modal Overlay */}
        {activeHeartPhoto && (
          <div 
            className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 backdrop-blur-md animate-fade-in cursor-pointer"
            style={{ backgroundColor: 'rgba(27,27,117,0.8)' }}
            onClick={() => setActiveHeartPhoto(null)}
          >
            {/* Outer scaling-up container */}
            <div 
              className="relative w-80 h-80 sm:w-96 sm:h-96 animate-modal-zoom drop-shadow-[0_20px_40px_rgba(225,29,72,0.4)] cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Clipped full-view image */}
              <div 
                className="w-full h-full relative overflow-hidden bg-white"
                style={{ clipPath: 'url(#heart-clip)' }}
              >
                <img 
                  src={activeHeartPhoto} 
                  className="w-full h-full object-cover animate-pulse-slow" 
                  alt="Full view moment"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Hand-drawn Outer Heart Silhouette Border */}
              <HeartSilhouetteBorder strokeWidthRose={2.5} strokeWidthPink={1.5} />
            </div>

            {/* Elegant Close Hint */}
            <div className="mt-6 text-white/95 font-display text-sm text-center select-none px-5 py-2.5 rounded-full shadow-lg animate-bounce cursor-pointer transition-colors">
              Tap anywhere to close
            </div>
          </div>
        )}
      </div>

      {/* Next section */}
      <div className="px-6">
        <button
          id="btn-gallery-continue"
          type="button"
          onClick={onNext}
          className="w-full py-4 bg-gradient-to-r from-pink-500 via-rose-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white font-semibold rounded-xl text-sm font-serif-elegant tracking-wider active:scale-95 transition-all cursor-pointer text-center border-2 border-pink-100 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-300"
        >
          Read Final Note ➔
        </button>
      </div>
    </div>
  );
};
