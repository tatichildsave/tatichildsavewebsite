import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChildLearnerState } from '../types';

const initialState: ChildLearnerState = {
  activeChild: {
    name: 'Ama Mensah',
    age: 10,
    city: 'Accra',
    level: 4,
    xp: 420,
    avatar: '🇬🇭',
    pathway: 'flex',
  },
  unlockedModules: [1, 2, 3, 4, 5],
  completedModules: [1, 2, 3, 4],
  earnedBadges: [
    {
      id: 'badge-1',
      title: 'Money Explorer',
      icon: 'toll',
      unlockedAt: '2026-09-29T10:00:00Z',
      category: 'Foundation',
    },
    {
      id: 'badge-2',
      title: 'Value Creator',
      icon: 'handshake',
      unlockedAt: '2026-09-30T15:00:00Z',
      category: 'Earning',
    },
    {
      id: 'badge-3',
      title: 'Smart Spender',
      icon: 'shopping_cart',
      unlockedAt: '2026-10-02T12:00:00Z',
      category: 'Spending',
    },
    {
      id: 'badge-4',
      title: 'Money Planner',
      icon: 'checklist',
      unlockedAt: '2026-10-04T09:30:00Z',
      category: 'Budgeting',
    },
    {
      id: 'badge-5',
      title: 'Savings Champion',
      icon: 'workspace_premium',
      unlockedAt: '2026-10-05T08:00:00Z',
      category: 'Milestone',
    },
  ],
  savingsGoal: {
    title: 'Science Experiment Kit',
    targetAmount: 120,
    currentAmount: 75,
    currency: 'GH₵',
  },
  completedTalksCount: 3,
  completedQuests: ['quest-1', 'quest-2'],
};

export const learnerSlice = createSlice({
  name: 'learner',
  initialState,
  reducers: {
    setActiveLearnerChild: (
      state,
      action: PayloadAction<{ name: string; age: number; city: string; pathway: string }>
    ) => {
      state.activeChild.name = action.payload.name;
      state.activeChild.age = action.payload.age;
      state.activeChild.city = action.payload.city;
      state.activeChild.pathway = action.payload.pathway;
    },
    addXP: (state, action: PayloadAction<number>) => {
      state.activeChild.xp += action.payload;
      const calculatedLevel = Math.floor(state.activeChild.xp / 100) + 1;
      state.activeChild.level = calculatedLevel;
    },
    completeModule: (state, action: PayloadAction<{ moduleId: number; badgeTitle: string; badgeIcon: string }>) => {
      if (!state.completedModules.includes(action.payload.moduleId)) {
        state.completedModules.push(action.payload.moduleId);
        state.activeChild.xp += 50;
        state.activeChild.level = Math.floor(state.activeChild.xp / 100) + 1;

        // Unlock next module
        const nextId = action.payload.moduleId + 1;
        if (nextId <= 12 && !state.unlockedModules.includes(nextId)) {
          state.unlockedModules.push(nextId);
        }

        // Add badge
        state.earnedBadges.push({
          id: `badge-${Date.now()}`,
          title: action.payload.badgeTitle,
          icon: action.payload.badgeIcon,
          unlockedAt: new Date().toISOString(),
          category: 'Curriculum Mastery',
        });
      }
    },
    depositSavings: (state, action: PayloadAction<number>) => {
      state.savingsGoal.currentAmount = Math.min(
        state.savingsGoal.targetAmount,
        state.savingsGoal.currentAmount + action.payload
      );
      state.activeChild.xp += 20;
    },
    completeQuest: (state, action: PayloadAction<{ questId: string; xpEarned: number }>) => {
      if (!state.completedQuests.includes(action.payload.questId)) {
        state.completedQuests.push(action.payload.questId);
        state.activeChild.xp += action.payload.xpEarned;
        state.activeChild.level = Math.floor(state.activeChild.xp / 100) + 1;
      }
    },
    incrementTalkCount: (state) => {
      state.completedTalksCount += 1;
      state.activeChild.xp += 15;
    },
  },
});

export const {
  setActiveLearnerChild,
  addXP,
  completeModule,
  depositSavings,
  completeQuest,
  incrementTalkCount,
} = learnerSlice.actions;

export default learnerSlice.reducer;
