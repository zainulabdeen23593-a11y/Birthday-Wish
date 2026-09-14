/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export const FallingSakura: React.FC<{ count?: number }> = ({ count = 16 }) => (
  <div className="sakura-field" aria-hidden="true">
    {Array.from({ length: count }).map((_, i) => (
      <span
        key={i}
        className="sakura-petal"
        style={{
          left: `${(i * 6.3) % 100}%`,
          animationDuration: `${7 + (i % 6)}s`,
          animationDelay: `${(i * 0.45) % 8}s`,
          transform: `scale(${0.55 + (i % 5) * 0.12})`,
        }}
      />
    ))}
  </div>
);

export const MangaCorners: React.FC = () => (
  <div className="manga-corners" aria-hidden="true">
    <span className="ink-corner tl" />
    <span className="ink-corner tr" />
    <span className="ink-corner bl" />
    <span className="ink-corner br" />
  </div>
);

export const AnimeStamp: React.FC<{
  text: string;
  className?: string;
}> = ({ text, className = '' }) => (
  <span className={`anime-stamp ${className}`}>{text}</span>
);

export const SpeechBubble: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div className={`speech-bubble ${className}`}>{children}</div>
);

export const ImpactBurst: React.FC = () => (
  <svg className="impact-burst" viewBox="0 0 200 200" aria-hidden="true">
    {Array.from({ length: 16 }).map((_, i) => {
      const a = (i / 16) * Math.PI * 2;
      const x2 = 100 + Math.cos(a) * 98;
      const y2 = 100 + Math.sin(a) * 98;
      const x1 = 100 + Math.cos(a) * 28;
      const y1 = 100 + Math.sin(a) * 28;
      return (
        <polygon
          key={i}
          points={`${x1},${y1} ${x2},${y2} ${100 + Math.cos(a + 0.12) * 86},${100 + Math.sin(a + 0.12) * 86}`}
          fill={i % 2 === 0 ? '#ffe566' : '#ff2d6a'}
        />
      );
    })}
  </svg>
);

export const AnimeSky: React.FC = () => (
  <div className="anime-sky" aria-hidden="true">
    <div className="anime-stars" />
    <div className="anime-moon" />
    <div className="anime-lantern l1" />
    <div className="anime-lantern l2" />
    <div className="anime-city" />
    <div className="seigaiha-overlay" />
  </div>
);
