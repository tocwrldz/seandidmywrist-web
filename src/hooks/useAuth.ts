import { useState, useEffect, useCallback } from 'react';

export interface UserOrder {
  id: string;
  date: string;
  watchCount: number;
  nonWatchCount: number;
  totalAmount: number;
  punchesEarned: number;
  itemsSummary: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  instagram?: string;
  createdAt: string;
  loyaltyPunches: number; // 0 to 10
  totalWatchesPurchased: number;
  freeWatchesEarned: number;
  orderHistory: UserOrder[];
}

const STORAGE_USERS_KEY = 'sdmw_users_v2';
const STORAGE_CURRENT_USER_KEY = 'sdmw_active_user_v2';
const MAX_PUNCHES = 5;

// Preloaded Demo Accounts for easy testing on mobile or desktop
const INITIAL_DEMO_USERS: UserProfile[] = [
  {
    id: 'usr_sean_vip',
    email: 'sean@seandidmywrist.com',
    name: 'Sean (VIP Member)',
    instagram: '@seandidmywrist',
    createdAt: '2026-01-15',
    loyaltyPunches: 3, // 3 punches collected out of 5, 2 away from free watch!
    totalWatchesPurchased: 8,
    freeWatchesEarned: 1,
    orderHistory: [
      {
        id: 'SDMW-781920',
        date: 'Oct 10, 2026',
        watchCount: 3,
        nonWatchCount: 0,
        totalAmount: 255,
        punchesEarned: 3,
        itemsSummary: '3x Black on Black GA2100'
      },
      {
        id: 'SDMW-492101',
        date: 'Oct 02, 2026',
        watchCount: 5,
        nonWatchCount: 0,
        totalAmount: 500,
        punchesEarned: 5,
        itemsSummary: '5x Custom GA2100'
      }
    ]
  },
  {
    id: 'usr_alex_drip',
    email: 'alex@chicago.com',
    name: 'Alex Drip',
    instagram: '@alex_wristcheck',
    createdAt: '2026-02-01',
    loyaltyPunches: 4, // 4 punches out of 5 - 1 watch away from free watch!
    totalWatchesPurchased: 4,
    freeWatchesEarned: 0,
    orderHistory: [
      {
        id: 'SDMW-629104',
        date: 'Oct 12, 2026',
        watchCount: 4,
        nonWatchCount: 0,
        totalAmount: 340,
        punchesEarned: 4,
        itemsSummary: '4x GA2100 CasiOak Showcase'
      }
    ]
  }
];

export function useAuth() {
  const [users, setUsers] = useState<UserProfile[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_USERS_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
      return INITIAL_DEMO_USERS;
    } catch {
      return INITIAL_DEMO_USERS;
    }
  });

  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const activeId = localStorage.getItem(STORAGE_CURRENT_USER_KEY);
      if (activeId) {
        const savedUsers: UserProfile[] = JSON.parse(
          localStorage.getItem(STORAGE_USERS_KEY) || JSON.stringify(INITIAL_DEMO_USERS)
        );
        const match = savedUsers.find((u) => u.id === activeId);
        if (match) return match;
      }
      // Default to logged-in Sean VIP account for instantaneous testability
      return INITIAL_DEMO_USERS[0];
    } catch {
      return INITIAL_DEMO_USERS[0];
    }
  });

  // Persist users to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
    } catch (e) {
      console.error('Failed to save users', e);
    }
  }, [users]);

  // Persist active user to localStorage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(STORAGE_CURRENT_USER_KEY, currentUser.id);
      } else {
        localStorage.removeItem(STORAGE_CURRENT_USER_KEY);
      }
    } catch (e) {
      console.error('Failed to save active user', e);
    }
  }, [currentUser]);

  // Sync currentUser with users array changes
  const saveUpdatedUser = useCallback((updated: UserProfile) => {
    setCurrentUser(updated);
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
  }, []);

  const signUp = useCallback(
    (name: string, email: string, instagram?: string): UserProfile => {
      const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (existing) {
        setCurrentUser(existing);
        return existing;
      }

      const newUser: UserProfile = {
        id: 'usr_' + Date.now(),
        email: email.trim(),
        name: name.trim() || 'VIP Collector',
        instagram: instagram?.trim() || '',
        createdAt: new Date().toISOString().split('T')[0],
        loyaltyPunches: 0,
        totalWatchesPurchased: 0,
        freeWatchesEarned: 0,
        orderHistory: []
      };

      setUsers((prev) => [newUser, ...prev]);
      setCurrentUser(newUser);
      return newUser;
    },
    [users]
  );

  const signIn = useCallback(
    (email: string): boolean => {
      const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase().trim());
      if (found) {
        setCurrentUser(found);
        return true;
      }
      // If account doesn't exist yet, auto-create for seamless UX
      const autoUser = signUp(email.split('@')[0], email);
      setCurrentUser(autoUser);
      return true;
    },
    [users, signUp]
  );

  const signOut = useCallback(() => {
    setCurrentUser(null);
  }, []);

  const loginAsDemo = useCallback(
    (userId: string) => {
      const found = users.find((u) => u.id === userId);
      if (found) {
        setCurrentUser(found);
      }
    },
    [users]
  );

  /**
   * Adds loyalty punches ONLY for custom watches purchased.
   * "say someone buys 10 at once they get 10 punched holes but if they buy one they get one...
   * if they buy another one next week another hole will be punched"
   */
  const addWatchPunches = useCallback(
    (
      watchCount: number,
      orderId: string,
      totalAmount: number,
      itemsSummary: string,
      nonWatchCount: number = 0
    ) => {
      if (!currentUser || watchCount <= 0) {
        return null;
      }

      const previousPunches = currentUser.loyaltyPunches;
      const totalRaw = previousPunches + watchCount;
      const completedCycles = Math.floor(totalRaw / MAX_PUNCHES);
      const newPunches = totalRaw % MAX_PUNCHES;
      const newFreeWatches = currentUser.freeWatchesEarned + completedCycles;

      const newOrder: UserOrder = {
        id: orderId,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        watchCount,
        nonWatchCount,
        totalAmount,
        punchesEarned: watchCount,
        itemsSummary
      };

      const updatedUser: UserProfile = {
        ...currentUser,
        loyaltyPunches: newPunches,
        totalWatchesPurchased: currentUser.totalWatchesPurchased + watchCount,
        freeWatchesEarned: newFreeWatches,
        orderHistory: [newOrder, ...currentUser.orderHistory]
      };

      saveUpdatedUser(updatedUser);

      return {
        previousPunches,
        newPunches,
        punchesAdded: watchCount,
        completedCycles,
        newFreeWatches
      };
    },
    [currentUser, saveUpdatedUser]
  );

  const redeemFreeWatch = useCallback((): boolean => {
    if (!currentUser || currentUser.freeWatchesEarned <= 0) {
      return false;
    }

    const updatedUser: UserProfile = {
      ...currentUser,
      freeWatchesEarned: Math.max(0, currentUser.freeWatchesEarned - 1)
    };

    saveUpdatedUser(updatedUser);
    return true;
  }, [currentUser, saveUpdatedUser]);

  const resetUserPunches = useCallback(() => {
    if (!currentUser) return;
    const updatedUser: UserProfile = {
      ...currentUser,
      loyaltyPunches: 0,
      freeWatchesEarned: 0
    };
    saveUpdatedUser(updatedUser);
  }, [currentUser, saveUpdatedUser]);

  return {
    currentUser,
    users,
    signUp,
    signIn,
    signOut,
    loginAsDemo,
    addWatchPunches,
    redeemFreeWatch,
    resetUserPunches
  };
}
