import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { CURRICULUM_MODULES } from '../../data/curriculumData';
import {
  completeModule,
  addXP,
  depositSavings,
  incrementTalkCount,
} from '../../store/learnerSlice';
import { addToast, setActiveTab } from '../../store/uiSlice';
import { MoneyQuestGame } from './MoneyQuestGame';
import { CurriculumModule } from '../../types';

export const LearnerApp: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    activeChild,
    unlockedModules,
    completedModules,
    earnedBadges,
    savingsGoal,
    completedTalksCount,
  } = useAppSelector((state) => state.learner);

  const [activeLearnerTab, setActiveLearnerTab] = useState<
    'curriculum' | 'quest' | 'wallet' | 'passport'
  >('curriculum');
  const [activeModuleId, setActiveModuleId] = useState<number>(1);
  const [selectedDecideOption, setSelectedDecideOption] = useState<string | null>(null);
  const [savingsInput, setSavingsInput] = useState<number>(10);

  const activeModule =
    CURRICULUM_MODULES.find((m) => m.id === activeModuleId) || CURRICULUM_MODULES[0];
  const isModuleCompleted = completedModules.includes(activeModule.id);
  const isModuleUnlocked = unlockedModules.includes(activeModule.id);

  const handleSelectDecideOption = (optId: string) => {
    setSelectedDecideOption(optId);
  };

  const handleCompleteCurrentModule = () => {
    dispatch(
      completeModule({
        moduleId: activeModule.id,
        badgeTitle: activeModule.badgeName,
        badgeIcon: activeModule.badgeIcon,
      })
    );
    dispatch(
      addToast({
        title: `🏆 Badge Earned: ${activeModule.badgeName}!`,
        message: `Module 0${activeModule.id} mastered! +50 XP and next module unlocked in your Money Passport.`,
        type: 'success',
      })
    );
  };

  const handleDepositSavings = () => {
    if (savingsInput <= 0) return;
    dispatch(depositSavings(savingsInput));
    dispatch(
      addToast({
        title: `+GH₵ ${savingsInput} Deposited!`,
        message: `Great discipline! Current savings: GH₵ ${savingsGoal.currentAmount + savingsInput} of GH₵ ${savingsGoal.targetAmount}.`,
        type: 'success',
      })
    );
  };

  const percentGoal = Math.min(
    100,
    Math.round((savingsGoal.currentAmount / savingsGoal.targetAmount) * 100)
  );

  return (
    <div className="py-10 bg-surface min-h-[calc(100vh-80px)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Child Profile Command Center Banner */}
        <div className="bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
            {/* Child Info */}
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center text-3xl font-extrabold shadow-lg border-2 border-white/20">
                {activeChild.avatar || '🇬🇭'}
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 text-white font-label-caps text-[11px] uppercase font-extrabold mb-1">
                  Level {activeChild.level} • Junior Steward
                </div>
                <h1 className="font-headline-sm sm:font-headline-md text-xl sm:text-2xl font-extrabold text-white">
                  {activeChild.name}'s Journey
                </h1>
                <p className="text-xs text-blue-100 mt-0.5">
                  Location: {activeChild.city} • Pathway: <span className="uppercase font-bold">{activeChild.pathway}</span>
                </p>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-3 w-full sm:w-auto">
              <div className="bg-white/10 backdrop-blur-md p-3 sm:p-4 rounded-2xl text-center border border-white/10">
                <span className="font-label-caps text-[10px] uppercase text-amber-300 block font-bold">
                  Total XP
                </span>
                <span className="font-label-data-lg text-lg sm:text-xl font-extrabold text-white">
                  {activeChild.xp}
                </span>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-3 sm:p-4 rounded-2xl text-center border border-white/10">
                <span className="font-label-caps text-[10px] uppercase text-emerald-300 block font-bold">
                  Badges
                </span>
                <span className="font-label-data-lg text-lg sm:text-xl font-extrabold text-white">
                  {earnedBadges.length}
                </span>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-3 sm:p-4 rounded-2xl text-center border border-white/10">
                <span className="font-label-caps text-[10px] uppercase text-blue-200 block font-bold">
                  Wallet
                </span>
                <span className="font-label-data-lg text-lg sm:text-xl font-extrabold text-white">
                  GH₵ {savingsGoal.currentAmount}
                </span>
              </div>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="mt-6 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between text-xs text-blue-100 font-semibold mb-1.5">
              <span>Level {activeChild.level} Progress</span>
              <span>{activeChild.xp % 100} / 100 XP to Level {activeChild.level + 1}</span>
            </div>
            <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
              <div
                className="bg-amber-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${activeChild.xp % 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-surface-container pb-3 overflow-x-auto">
          {[
            { id: 'curriculum', label: '12-Module Journey', icon: 'menu_book' },
            { id: 'quest', label: 'Money Quest Simulator', icon: 'sports_esports' },
            { id: 'wallet', label: 'My Money Wallet', icon: 'savings' },
            { id: 'passport', label: 'Money Passport Badges', icon: 'military_tech' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveLearnerTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-title-md text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeLearnerTab === tab.id
                  ? 'bg-primary-container text-on-primary shadow-md'
                  : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* TAB 1: CURRICULUM JOURNEY */}
        {activeLearnerTab === 'curriculum' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Module Selector Strip */}
            <div className="lg:col-span-4 bg-surface-container-lowest rounded-3xl p-5 shadow-lg border border-surface-container space-y-2 max-h-[700px] overflow-y-auto">
              <span className="font-label-caps text-xs uppercase text-outline block mb-3 font-bold">
                12 Progressive Modules
              </span>
              {CURRICULUM_MODULES.map((m) => {
                const isUnlocked = unlockedModules.includes(m.id);
                const isDone = completedModules.includes(m.id);
                const isSelected = activeModuleId === m.id;

                return (
                  <div
                    key={m.id}
                    onClick={() => {
                      if (isUnlocked) {
                        setActiveModuleId(m.id);
                        setSelectedDecideOption(null);
                      }
                    }}
                    className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'border-primary bg-primary-fixed/20 shadow-sm'
                        : isUnlocked
                        ? 'border-surface-container hover:bg-surface-container-low'
                        : 'border-surface-container/40 opacity-50 cursor-not-allowed bg-surface-container-lowest'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                          isDone
                            ? 'bg-emerald-600 text-white'
                            : isUnlocked
                            ? 'bg-primary-fixed text-primary'
                            : 'bg-surface-container-high text-outline'
                        }`}
                      >
                        {isDone ? (
                          <span className="material-symbols-outlined text-[18px]">check</span>
                        ) : (
                          m.id
                        )}
                      </div>
                      <div>
                        <h4 className="font-title-md text-xs sm:text-sm font-bold text-on-surface">
                          {m.title}
                        </h4>
                        <span className="text-[11px] text-on-surface-variant flex items-center gap-1">
                          <span className="material-symbols-outlined text-[13px]">{m.badgeIcon}</span>
                          <span>{m.badgeName}</span>
                        </span>
                      </div>
                    </div>

                    {!isUnlocked && (
                      <span className="material-symbols-outlined text-outline text-[18px]">lock</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right Active Module Interactive Player */}
            <div className="lg:col-span-8 bg-surface-container-lowest rounded-3xl p-6 sm:p-8 shadow-xl border border-surface-container space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-surface-container pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-label-caps text-xs text-primary uppercase font-extrabold">
                      {activeModule.numberString} Interactive Mission
                    </span>
                    {isModuleCompleted && (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        Mastered
                      </span>
                    )}
                  </div>
                  <h2 className="font-headline-sm text-xl sm:text-2xl font-extrabold text-on-surface mt-1">
                    {activeModule.title}
                  </h2>
                </div>

                <div className="flex items-center gap-2 text-right">
                  <span className="material-symbols-outlined text-[28px] text-amber-500">
                    {activeModule.badgeIcon}
                  </span>
                </div>
              </div>

              {/* 1. STORY */}
              <div className="bg-surface-container-low p-5 rounded-2xl border border-surface-container">
                <div className="flex items-center gap-2 text-primary font-label-caps text-xs uppercase font-extrabold mb-1">
                  <span className="material-symbols-outlined text-[18px]">menu_book</span>
                  <span>1. The Story: {activeModule.story.character}</span>
                </div>
                <p className="font-body-md text-sm text-on-surface font-medium leading-relaxed mb-2">
                  "{activeModule.story.scenario}"
                </p>
                <p className="text-xs text-on-surface-variant italic">
                  Cultural Context: {activeModule.story.africanContext}
                </p>
              </div>

              {/* 2. DISCOVER */}
              <div className="bg-primary-fixed/20 p-5 rounded-2xl border border-primary/20">
                <div className="flex items-center gap-2 text-primary font-label-caps text-xs uppercase font-extrabold mb-1">
                  <span className="material-symbols-outlined text-[18px]">lightbulb</span>
                  <span>2. Core Financial Principle</span>
                </div>
                <p className="font-body-md text-sm text-on-surface leading-relaxed">
                  {activeModule.discover}
                </p>
              </div>

              {/* 3. DECIDE (Branching Choices) */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-secondary font-label-caps text-xs uppercase font-extrabold">
                  <span className="material-symbols-outlined text-[18px]">psychology</span>
                  <span>3. Make The Real Choice (DECIDE)</span>
                </div>
                <p className="font-title-md text-sm font-bold text-on-surface">
                  {activeModule.decideQuestion}
                </p>

                <div className="space-y-2">
                  {activeModule.options.map((opt) => {
                    const isSelected = selectedDecideOption === opt.id;
                    return (
                      <div
                        key={opt.id}
                        onClick={() => handleSelectDecideOption(opt.id)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'border-primary bg-primary-fixed/20 shadow-sm ring-2 ring-primary/30'
                            : 'border-surface-container bg-surface-container-low hover:border-outline'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                              isSelected ? 'border-primary bg-primary text-white' : 'border-outline'
                            }`}
                          >
                            {isSelected && (
                              <span className="material-symbols-outlined text-[14px]">check</span>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-body-md text-xs sm:text-sm font-semibold text-on-surface">
                              {opt.text}
                            </p>
                            {isSelected && (
                              <div className="mt-2 text-xs text-primary font-bold animate-fadeIn">
                                Outcome: {opt.outcome}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 4. DO PHYSICAL MISSION */}
              <div className="bg-secondary-fixed/15 p-5 rounded-2xl border border-secondary/20">
                <div className="flex items-center gap-2 text-secondary font-label-caps text-xs uppercase font-extrabold mb-1">
                  <span className="material-symbols-outlined text-[18px]">task_alt</span>
                  <span>4. Tactile Mission (TATI Junior Kit)</span>
                </div>
                <p className="font-body-md text-xs sm:text-sm text-on-surface leading-relaxed">
                  {activeModule.doMission}
                </p>
              </div>

              {/* Module Action completion */}
              <div className="flex items-center justify-between pt-4 border-t border-surface-container">
                <button
                  type="button"
                  onClick={() => dispatch(incrementTalkCount())}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-surface-container-high text-xs font-bold text-on-surface hover:bg-surface-container-highest transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px] text-tertiary">chat</span>
                  <span>Completed 5-min Parent Talk ({completedTalksCount} done)</span>
                </button>

                {!isModuleCompleted ? (
                  <button
                    type="button"
                    onClick={handleCompleteCurrentModule}
                    disabled={!selectedDecideOption}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-container text-on-primary font-bold text-xs sm:text-sm shadow-md hover:bg-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                    <span>Complete Module & Unlock Badge</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      if (activeModule.id < 12) {
                        setActiveModuleId(activeModule.id + 1);
                        setSelectedDecideOption(null);
                      }
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary-container text-on-secondary-fixed font-bold text-xs sm:text-sm shadow-md hover:bg-amber-400 transition-all"
                  >
                    <span>Proceed to Next Module</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MONEY QUEST GAME */}
        {activeLearnerTab === 'quest' && <MoneyQuestGame />}

        {/* TAB 3: MONEY WALLET & PIGGY BANK */}
        {activeLearnerTab === 'wallet' && (
          <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 shadow-xl border border-surface-container space-y-8">
            <div>
              <span className="font-label-caps text-xs uppercase text-primary font-extrabold block mb-1">
                Virtual & Physical Money Wallet
              </span>
              <h2 className="font-headline-sm text-xl sm:text-2xl font-extrabold text-on-surface">
                {activeChild.name}'s Savings Goal Tracker
              </h2>
            </div>

            {/* Savings Goal Card */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-zinc-900 dark:to-zinc-800 p-6 rounded-3xl border-2 border-amber-300 dark:border-amber-700/50 shadow-md">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <span className="font-label-caps text-xs uppercase font-extrabold text-amber-700 dark:text-amber-300">
                    Active Target Goal
                  </span>
                  <h3 className="font-headline-sm text-2xl font-extrabold text-on-surface mt-1">
                    {savingsGoal.title}
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-1">
                    Target: <strong>GH₵ {savingsGoal.targetAmount}</strong> • Current Progress: <strong>GH₵ {savingsGoal.currentAmount}</strong>
                  </p>
                </div>

                <div className="w-24 h-24 rounded-full border-4 border-amber-400 flex items-center justify-center bg-white dark:bg-zinc-900 shadow-inner flex-shrink-0">
                  <div className="text-center">
                    <span className="font-label-data-lg text-lg font-extrabold text-amber-600 dark:text-amber-300">
                      {percentGoal}%
                    </span>
                    <span className="text-[10px] text-outline block font-bold">Saved</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="w-full bg-amber-200/50 dark:bg-zinc-700 h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${percentGoal}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Deposit / Simulate Savings */}
            <div className="bg-surface-container-low p-6 rounded-2xl border border-surface-container flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-title-md text-sm font-bold text-on-surface">
                  Simulate Cash Deposit (Pocket Money or Chore Earnings)
                </h4>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  Record money put into your physical TATI Wallet or Money Jar.
                </p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs font-bold text-outline">GH₵</span>
                  <input
                    type="number"
                    min="1"
                    value={savingsInput}
                    onChange={(e) => setSavingsInput(parseInt(e.target.value) || 0)}
                    className="w-28 pl-10 pr-3 py-2 rounded-xl bg-surface-container-lowest border border-surface-container text-xs font-bold text-on-surface"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleDepositSavings}
                  className="px-5 py-2.5 rounded-xl bg-primary-container text-on-primary font-bold text-xs shadow-md hover:bg-primary transition-all flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">savings</span>
                  <span>Deposit Savings</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PASSPORT BADGES */}
        {activeLearnerTab === 'passport' && (
          <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 shadow-xl border border-surface-container space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-label-caps text-xs uppercase text-primary font-extrabold block mb-1">
                  Official Stewardship Badges
                </span>
                <h2 className="font-headline-sm text-xl sm:text-2xl font-extrabold text-on-surface">
                  TATI Money Passport Collection
                </h2>
              </div>
              <span className="px-3.5 py-1.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-bold">
                {earnedBadges.length} of 12 Unlocked
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {earnedBadges.map((b) => (
                <div
                  key={b.id}
                  className="bg-surface-container-low p-5 rounded-2xl border border-surface-container flex flex-col items-center text-center shadow-sm"
                >
                  <div className="w-14 h-14 rounded-2xl bg-amber-400/20 text-amber-600 dark:text-amber-300 flex items-center justify-center mb-3">
                    <span className="material-symbols-outlined text-[32px]">{b.icon}</span>
                  </div>
                  <h4 className="font-title-md text-sm font-extrabold text-on-surface mb-1">
                    {b.title}
                  </h4>
                  <span className="font-label-caps text-[10px] text-outline uppercase font-bold">
                    {b.category}
                  </span>
                  <span className="text-[10px] text-tertiary font-bold mt-2">
                    ✓ Verified in Passport
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
