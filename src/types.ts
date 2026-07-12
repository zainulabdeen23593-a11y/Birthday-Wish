/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export enum AppSection {
  Landing = 1.0,
  Passcode = 1.5,
  Question = 1.8,
  Celebration = 2.0,
  Cake = 3.0,
  Apology = 4.0,
  Gallery = 5.0,
  Closing = 6.0
}

export interface LoveBurstParticle {
  readonly id: number;
  readonly x: number;
  readonly y: number;
  readonly emoji: string;
  readonly scale: number;
  readonly rot: number;
}

export interface ExtraCatHeart {
  readonly id: number;
  readonly left: number;
  readonly top: number;
  readonly delay: number;
}

export interface SmokeParticle {
  readonly id: number;
  readonly x: number;
  readonly y: number;
  readonly size: string;
  readonly delay: string;
}

export interface CandleState {
  readonly id: number;
  readonly lit: boolean;
  readonly smoked: boolean;
  readonly smokeParticles: readonly SmokeParticle[];
}

export interface ConfettiParticle {
  readonly id: number;
  readonly left: string;
  readonly color: string;
  readonly size: string;
  readonly delay: string;
  readonly duration: string;
  readonly rotation: string;
}

export interface BalloonState {
  readonly id: number;
  readonly left: string;
  readonly color: string;
  readonly delay: string;
  readonly duration: string;
  readonly size: string;
}

export interface EmberState {
  readonly id: number;
  readonly left: string;
  readonly delay: string;
  readonly duration: string;
  readonly size: string;
}

export interface MemoryCard {
  readonly title: string;
  readonly caption: string;
  readonly bg: string;
  readonly icon: React.ReactNode;
  readonly images: readonly string[];
}

export type CandlesAction =
  | { type: 'BLOW_CANDLE'; id: number }
  | { type: 'RESET' }
  | { type: 'SET'; candles: readonly CandleState[] };
