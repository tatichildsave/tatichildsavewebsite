import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { incrementTalkCount } from '../../store/learnerSlice';
import { addToast, setActiveTab } from '../../store/uiSlice';

export const ParentDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { activeChild, completedModules, savingsGoal, completedTalksCount, earnedBadges } =
    useAppSelector((state) => state.learner);
  const { registrations } = useAppSelector((state) => state.registration);

  const handleMarkTalkComplete = () => {
    dispatch(incrementTalkCount());
    dispatch(
      addToast({
        title: 'TATI Talk Recorded! 🎉',
        message: 'Way to go! Meaningful 5-minute conversations create lasting confidence.',
        type: 'success',
      })
    );
  };

  const progressPct = Math.round((completedModules.length / 12) * 100);

  return (
    <div className="py-12 bg-surface min-h-[calc(100vh-80px)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Parent Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-surface-container pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-1">
              <span className="material-symbols-outlined text-[18px]">family_restroom</span>
              <span>Parent Stewardship Portal</span>
            </div>
            <h1 className="font-headline-lg text-primary tracking-tight">
              Parent Visibility & Insights
            </h1>
            <p className="font-body-md text-xs sm:text-sm text-on-surface-variant mt-0.5">
              Zero tests, zero high-stakes pressure. Track habits and connection moments.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => dispatch(setActiveTab('register'))}
              className="px-4 py-2.5 rounded-xl bg-surface-container-high text-xs font-bold text-on-surface hover:bg-surface-container-highest transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">person_add</span>
              <span>Enroll Another Child</span>
            </button>
            <button
              type="button"
              onClick={() => dispatch(setActiveTab('learner'))}
              className="px-5 py-2.5 rounded-xl bg-primary-container text-on-primary text-xs font-bold shadow-md hover:bg-primary transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">sports_esports</span>
              <span>Open Child View</span>
            </button>
          </div>
        </div>

        {/* Top Metric Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-surface-container-lowest p-5 rounded-2xl border border-surface-container shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-outline font-bold uppercase">Active Learner</span>
              <span className="text-lg font-bold">{activeChild.avatar || '🇬🇭'}</span>
            </div>
            <h3 className="font-headline-sm text-lg font-extrabold text-on-surface">
              {activeChild.name}
            </h3>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Age {activeChild.age} • Level {activeChild.level} ({activeChild.xp} XP)
            </p>
          </div>

          <div className="bg-surface-container-lowest p-5 rounded-2xl border border-surface-container shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-outline font-bold uppercase">Curriculum Progress</span>
              <span className="material-symbols-outlined text-primary text-[20px]">trending_up</span>
            </div>
            <h3 className="font-headline-sm text-lg font-extrabold text-primary">
              {progressPct}% Complete
            </h3>
            <p className="text-xs text-on-surface-variant mt-0.5">
              {completedModules.length} of 12 Modules Mastered
            </p>
          </div>

          <div className="bg-surface-container-lowest p-5 rounded-2xl border border-surface-container shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-outline font-bold uppercase">Savings Goal</span>
              <span className="material-symbols-outlined text-amber-500 text-[20px]">savings</span>
            </div>
            <h3 className="font-headline-sm text-lg font-extrabold text-on-surface">
              GH₵ {savingsGoal.currentAmount} / {savingsGoal.targetAmount}
            </h3>
            <p className="text-xs text-on-surface-variant mt-0.5 truncate">
              {savingsGoal.title}
            </p>
          </div>

          <div className="bg-surface-container-lowest p-5 rounded-2xl border border-surface-container shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-outline font-bold uppercase">5-Min TATI Talks</span>
              <span className="material-symbols-outlined text-tertiary text-[20px]">chat</span>
            </div>
            <h3 className="font-headline-sm text-lg font-extrabold text-tertiary">
              {completedTalksCount} Completed
            </h3>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Regular casual conversations recorded
            </p>
          </div>
        </div>

        {/* Featured Weekly 5-Minute TATI Talk Generator */}
        <div className="bg-gradient-to-r from-primary-fixed/30 to-secondary-fixed/30 p-6 sm:p-8 rounded-3xl border border-primary/20 shadow-md">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[22px]">forum</span>
                <span className="font-label-caps text-xs text-primary uppercase font-extrabold">
                  This Week's 5-Minute TATI Talk Prompt
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-surface-container-lowest text-on-surface text-[10px] font-bold">
                  Zero Prep Required
                </span>
              </div>
              <p className="font-headline-sm text-base sm:text-lg text-on-surface font-extrabold italic leading-snug">
                "Ask {activeChild.name} what they would adjust in their weekly money plan if an unexpected school sports excursion or book sale came up this Friday."
              </p>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Parent tip: Listen for how they balance their "Spend", "Save", and "Give" categories. Praise thoughtful reasoning rather than looking for a single textbook answer!
              </p>
            </div>

            <div className="flex flex-col gap-2 w-full lg:w-auto">
              <button
                type="button"
                onClick={handleMarkTalkComplete}
                className="px-6 py-3 rounded-xl bg-primary-container text-on-primary font-bold text-xs sm:text-sm shadow-md hover:bg-primary transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">done_all</span>
                <span>Mark Talk As Completed</span>
              </button>
              <span className="text-[11px] text-center text-on-surface-variant">
                Awards +15 XP to {activeChild.name}
              </span>
            </div>
          </div>
        </div>

        {/* Registered Children Roster in Community */}
        <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 shadow-xl border border-surface-container space-y-4">
          <div className="flex items-center justify-between border-b border-surface-container pb-4">
            <div>
              <span className="font-label-caps text-xs uppercase text-primary font-extrabold block">
                Community Enrolments
              </span>
              <h3 className="font-headline-sm text-lg font-bold text-on-surface">
                Family Registered Learners
              </h3>
            </div>
            <span className="text-xs text-on-surface-variant">
              {registrations.length} learners registered
            </span>
          </div>

          <div className="divide-y divide-surface-container">
            {registrations.map((reg) => (
              <div key={reg.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-bold text-sm">
                    {reg.childName[0]}
                  </div>
                  <div>
                    <h4 className="font-title-md text-sm font-bold text-on-surface">{reg.childName}</h4>
                    <p className="text-xs text-on-surface-variant">
                      Age {reg.childAge} • {reg.city}, {reg.country} • Parent: {reg.parentName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-primary-fixed text-primary text-[11px] font-bold uppercase">
                    {reg.pathway}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-bold">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span> Active
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
