/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HeartSilhouetteBorder } from './SubComponents';
import { BESTIE_NAME } from '../utils';
import { AnimeStamp } from './AnimeTheme';

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
    <div id="section-gallery" className="flex-1 flex flex-col justify-between py-1 animate-fade-slide-up relative min-h-0 h-full overflow-hidden">
      <svg className="absolute w-0 h-0" width="0" height="0" aria-hidden="true">
        <defs>
          <clipPath id="heart-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0.5, 0.15 C 0.35, -0.05, 0, -0.05, 0, 0.35 C 0, 0.65, 0.3, 0.85, 0.5, 0.98 C 0.7, 0.85, 1, 0.65, 1, 0.35 C 1, -0.05, 0.65, -0.05, 0.5, 0.15 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="flex-1 flex flex-col justify-center items-center my-auto relative select-none">
        <div className="text-center z-20 mb-1 animate-headline-arrive">
          <AnimeStamp text="MEMORIES" />
          <span className="font-display text-[clamp(1.3rem,4vh,1.7rem)] font-extrabold text-[var(--spider-red)] select-none block leading-tight mt-1">
            That's my bestie
          </span>
          <p className="text-xs text-violet-700 mt-1">{BESTIE_NAME}, tu main character hai.</p>
        </div>

        <div className="relative w-full h-[min(32vh,220px)] flex items-center justify-center overflow-hidden z-10">
          <div className="relative w-[370px] h-[280px] scale-[0.58] sm:scale-[0.72] origin-center shrink-0">
          <div 
            onClick={() => setActiveHeartPhoto(galleryImg1Error ? "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80" : "/image-1.png")}
            className="absolute top-[0px] left-[calc(50%-90px)] w-[180px] h-[180px] z-10 transition-all duration-300 hover:scale-105 hover:z-30 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)] cursor-pointer"
          >
            <div className="w-full h-full relative">
              <div className="w-full h-full bg-gradient-to-tr from-cyan-50 to-fuchsia-100" style={{ clipPath: 'url(#heart-clip)' }}>
                <img 
                  src={galleryImg1Error ? "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=400&q=80" : "/image-1.png"} 
                  onError={() => setGalleryImg1Error(true)}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  referrerPolicy="no-referrer"
                  alt="Chaos teammate"
                />
              </div>
              <HeartSilhouetteBorder />
            </div>
          </div>

          <div 
            onClick={() => setActiveHeartPhoto(galleryImg2Error ? "https://images.unsplash.com/photo-1607604276583-e5825cb55c0f?auto=format&fit=crop&w=800&q=80" : "/image-2.jpg")}
            className="absolute top-[130px] left-[calc(50%-165px)] w-[130px] h-[130px] z-20 rotate-[-12deg] transition-all duration-300 hover:scale-110 hover:rotate-0 hover:z-30 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.18)] cursor-pointer"
          >
            <div className="w-full h-full relative">
              <div className="w-full h-full bg-gradient-to-tr from-amber-50 to-violet-100" style={{ clipPath: 'url(#heart-clip)' }}>
                <img 
                  src={galleryImg2Error ? "https://images.unsplash.com/photo-1607604276583-e5825cb55c0f?auto=format&fit=crop&w=400&q=80" : "/image-2.jpg"} 
                  onError={() => setGalleryImg2Error(true)}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  referrerPolicy="no-referrer"
                  alt="Main character energy"
                />
              </div>
              <HeartSilhouetteBorder />
            </div>
          </div>

          <div 
            onClick={() => setActiveHeartPhoto(galleryImg3Error ? "https://images.unsplash.com/photo-1560972550-aba3456b5564?auto=format&fit=crop&w=800&q=80" : "/image-3.png")}
            className="absolute top-[130px] left-[calc(50%+35px)] w-[130px] h-[130px] z-20 rotate-[12deg] transition-all duration-300 hover:scale-110 hover:rotate-0 hover:z-30 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.18)] cursor-pointer"
          >
            <div className="w-full h-full relative">
              <div className="w-full h-full bg-gradient-to-tr from-rose-50 to-cyan-100" style={{ clipPath: 'url(#heart-clip)' }}>
                <img 
                  src={galleryImg3Error ? "https://images.unsplash.com/photo-1560972550-aba3456b5564?auto=format&fit=crop&w=400&q=80" : "/image-3.png"} 
                  onError={() => setGalleryImg3Error(true)}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  referrerPolicy="no-referrer"
                  alt="Still my bestie"
                />
              </div>
              <HeartSilhouetteBorder />
            </div>
          </div>
          </div>
        </div>
        <p className="text-[10px] text-slate-500 mt-1">dil tap karo</p>

        {activeHeartPhoto && (
          <div 
            className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 backdrop-blur-md animate-fade-in cursor-pointer"
            style={{ backgroundColor: 'rgba(15,23,42,0.85)' }}
            onClick={() => setActiveHeartPhoto(null)}
          >
            <div 
              className="relative w-80 h-80 sm:w-96 sm:h-96 animate-modal-zoom drop-shadow-[0_20px_40px_rgba(34,211,238,0.4)] cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
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
              <HeartSilhouetteBorder strokeWidthRose={2.5} strokeWidthPink={1.5} />
            </div>
            <div className="mt-6 text-white font-display text-sm text-center select-none px-5 py-2.5 rounded-full shadow-lg animate-bounce cursor-pointer">
              Kahin bhi tap karke band karo
            </div>
          </div>
        )}
      </div>

      <div className="px-2 shrink-0">
        <button
          id="btn-gallery-continue"
          type="button"
          onClick={onNext}
          className="w-full py-2.5 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400 text-white font-display text-base tracking-wide active:scale-95 transition-all cursor-pointer text-center border-2 border-slate-900 shadow-[4px_4px_0_#0f172a]"
        >
          Late letter parhao ➔
        </button>
      </div>
    </div>
  );
};
