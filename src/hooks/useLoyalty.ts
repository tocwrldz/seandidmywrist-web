import { useState, useEffect } from 'react';

const LOYALTY_STORAGE_KEY = 'sdmw_loyalty_punches_v2';
const MAX_PUNCHES = 5;

export interface LoyaltyCardState {
  punches: number; // 0 to 5
  freeWatchesEarned: number;
  hasRewardReady: boolean;
  addPunch: (count?: number) => void;
  redeemReward: () => boolean;
  resetCard: () => void;
}

export function useLoyalty(): LoyaltyCardState {
  const [punches, setPunches] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(LOYALTY_STORAGE_KEY);
      if (saved !== null) {
        const val = parseInt(saved, 10);
        return isNaN(val) ? 0 : Math.min(Math.max(val, 0), MAX_PUNCHES);
      }
      return 0; // Starts fresh
    } catch {
      return 0;
    }
  });

  const [freeWatchesEarned, setFreeWatchesEarned] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('sdmw_free_watches_earned_v2');
      return saved ? parseInt(saved, 10) || 0 : 0;
    } catch {
      return 0;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOYALTY_STORAGE_KEY, punches.toString());
      localStorage.setItem('sdmw_free_watches_earned_v2', freeWatchesEarned.toString());
    } catch (e) {
      console.error('Failed to save loyalty data', e);
    }
  }, [punches, freeWatchesEarned]);

  const addPunch = (count: number = 1) => {
    setPunches((prev) => {
      const total = prev + count;
      const completed = Math.floor(total / MAX_PUNCHES);
      if (completed > 0) {
        setFreeWatchesEarned((w) => w + completed);
      }
      return total % MAX_PUNCHES;
    });
  };

  const redeemReward = (): boolean => {
    if (punches >= MAX_PUNCHES || freeWatchesEarned > 0) {
      setPunches(0); // Reset for next loyalty cycle
      setFreeWatchesEarned((w) => Math.max(0, w - 1));
      return true;
    }
    return false;
  };

  const resetCard = () => {
    setPunches(0);
    setFreeWatchesEarned(0);
  };

  return {
    punches,
    freeWatchesEarned,
    hasRewardReady: punches >= MAX_PUNCHES || freeWatchesEarned > 0,
    addPunch,
    redeemReward,
    resetCard
  };
}
