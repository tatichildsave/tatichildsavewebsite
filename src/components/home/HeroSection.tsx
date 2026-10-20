import React, { useState } from 'react';
import { useAppDispatch } from '../../store';
import { setActiveTab } from '../../store/uiSlice';
import { addXP } from '../../store/learnerSlice';
import { addToast } from '../../store/uiSlice';

export const HeroSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const [selectedScenarioChoice, setSelectedScenarioChoice] = useState<number | null>(null);

  const handleScenarioChoice = (choice: number) => {
    setSelectedScenarioChoice(choice);
    if (choice === 1) {
      dispatch(addXP(25));
      dispatch(
        addToast({
          title: '+25 Goal XP Earned!',
          message: 'Wise decision! Planning needs, savings & fun sets you up for financial peace.',
          type: 'success',
        })
      );
    } else {
      dispatch(
        addToast({
          title: 'Learning Opportunity',
          message: 'Spending everything today leaves you with zero for your bicycle or science kit goals!',
          type: 'warning',
        })
      );
    }
  };

  return (
    <section className="relative overflow-hidden bg-surface py-12 lg:py-24 transition-colors">
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary-container/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-24 w-80 h-80 bg-secondary-container/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Reassurance Pill Badges */}
        <div className="inline-flex flex-wrap items-center gap-2 bg-surface-container-high px-4 py-1.5 rounded-full mb-8 shadow-sm">
          <span className="inline-flex items-center gap-1.5 font-label-caps text-xs text-primary uppercase font-bold">
            <span className="material-symbols-outlined text-[15px]">school</span>
            Designed for children 8–12
          </span>
          <span className="text-outline-variant font-label-caps">•</span>
          <span className="inline-flex items-center gap-1.5 font-label-caps text-xs text-secondary uppercase font-bold">
            <span className="material-symbols-outlined text-[15px]">public</span>
            Built for African families
          </span>
          <span className="text-outline-variant font-label-caps">•</span>
          <span className="inline-flex items-center gap-1.5 font-label-caps text-xs text-tertiary uppercase font-bold">
            <span className="material-symbols-outlined text-[15px]">devices</span>
            Learn anywhere
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Text Column */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <h1 className="font-display-hero text-primary tracking-tight">
              Smart money habits <br className="hidden sm:block" />
              <span className="text-secondary-container">start young.</span>
            </h1>
            <p className="font-body-lg text-lg text-on-surface-variant max-w-2xl leading-relaxed">
              TATI ChildSave helps children aged 8–12 build the confidence and skills to earn, plan, save, spend, grow and protect money — through stories, choices, games and real-life experiences.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => dispatch(setActiveTab('register'))}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary-container text-on-primary font-title-md text-base shadow-md hover:bg-primary transition-all font-bold"
              >
                <span>Start Your Child's Journey</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-surface-container-high text-on-surface font-title-md text-base hover:bg-surface-container-highest transition-colors font-semibold"
              >
                <span className="material-symbols-outlined text-[20px] text-primary">play_circle</span>
                <span>See How TATI Works</span>
              </a>
            </div>

            {/* Trust Sub-strip */}
            <div className="flex items-center gap-4 pt-4 text-on-surface-variant">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-fixed flex items-center justify-center font-label-data-md font-bold shadow-sm ring-2 ring-surface">
                  K
                </div>
                <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-label-data-md font-bold shadow-sm ring-2 ring-surface">
                  A
                </div>
                <div className="w-10 h-10 rounded-full bg-tertiary-container text-on-tertiary flex items-center justify-center font-label-data-md font-bold shadow-sm ring-2 ring-surface">
                  Y
                </div>
              </div>
              <p className="font-body-sm text-sm">
                <strong className="text-on-surface font-semibold">Practical financial stewardship</strong> — zero adult jargon, zero high-stakes pressure.
              </p>
            </div>
          </div>

          {/* Hero Visual Preview Column */}
          <div className="lg:col-span-5 relative">
            {/* Main Visual Showcase Card */}
            <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-xl relative z-10 flex flex-col gap-4 border border-surface-container">
              {/* Child Profile Header Inside App Preview */}
              <div className="flex items-center justify-between bg-surface-container-low p-3 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed text-lg font-bold">
                    🇬🇭
                  </div>
                  <div>
                    <h4 className="font-title-md text-sm text-on-surface font-bold">Ama's Journey</h4>
                    <p className="font-body-sm text-xs text-on-surface-variant">Level 4: Money Planner</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-caps text-xs font-bold">
                  <span className="material-symbols-outlined text-[14px]">verified</span> Active
                </span>
              </div>

              {/* Visual Graphic: Confident African Learner */}
              <div className="relative w-full h-56 rounded-xl overflow-hidden bg-surface-container">
                <img
                  className="w-full h-full object-cover"
                  alt="A cheerful 10-year-old West African girl seated comfortably at a sunlit wooden desk in Accra with her TATI money wallet, goal card, and colorful notebook, smiling proudly while holding up an achievement token"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCS1JXjCOV7SNi6ofJUUOicoEh_NKHn5N5SBikYTeEitce-0c7BSfTpbr8YN5sKdfaEEG7rQXH13yQYTOIurzXyOI8fxynWHwCmO5gSuNTaElyxh7uTd7Huf02t1sPMjHEUU50VfTO3ijtOqU6qjeEY5FKEnfW3AKvlG8_K6wipNK4hOFVhj4k0_dNMpIfYnWk5EC4Q1S8snmhrT7kMVGpx9F-xRUpMYrBrGcYggHyLzbV8muo3CXU"
                />
                <div className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-md px-3 py-1 rounded-lg text-white font-label-caps text-[11px] flex items-center gap-1.5 font-bold">
                  <span className="material-symbols-outlined text-[14px] text-tertiary-fixed">task_alt</span> Module 04: Decisions
                </div>
              </div>

              {/* Micro Interactive Scenario Simulator inside Hero */}
              <div className="bg-surface-container p-4 rounded-xl flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-label-caps text-[11px] uppercase text-primary font-bold">
                    Try A Real Choice Scenario
                  </span>
                  <span className="font-body-sm text-xs text-secondary font-bold">+25 Goal XP</span>
                </div>
                <p className="font-body-md text-sm text-on-surface font-semibold">
                  "You received GH₵ 50 for your birthday. What is your first step?"
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => handleScenarioChoice(1)}
                    className={`text-left p-2.5 rounded-lg border text-xs font-medium transition-all ${
                      selectedScenarioChoice === 1
                        ? 'bg-primary-container text-on-primary border-primary shadow-sm font-bold'
                        : 'bg-surface-container-lowest text-on-surface border-surface-container hover:border-primary'
                    }`}
                  >
                    1. Plan needs, savings & fun
                  </button>
                  <button
                    type="button"
                    onClick={() => handleScenarioChoice(2)}
                    className={`text-left p-2.5 rounded-lg border text-xs font-medium transition-all ${
                      selectedScenarioChoice === 2
                        ? 'bg-secondary-container text-on-secondary-fixed border-secondary shadow-sm font-bold'
                        : 'bg-surface-container-lowest text-on-surface border-surface-container hover:border-secondary'
                    }`}
                  >
                    2. Spend everything today
                  </button>
                </div>
              </div>
            </div>

            {/* Overlapping Floating Badge */}
            <div className="hidden sm:flex absolute -bottom-5 -left-5 z-20 bg-secondary-container text-on-secondary-fixed p-4 rounded-2xl shadow-xl items-center gap-3 border border-amber-300">
              <span className="material-symbols-outlined text-[32px] text-on-secondary-container">
                workspace_premium
              </span>
              <div>
                <p className="font-label-caps text-[10px] uppercase font-bold text-on-secondary-container">
                  Earned Badge
                </p>
                <p className="font-title-md text-sm font-extrabold text-on-secondary-fixed">
                  Savings Champion
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
