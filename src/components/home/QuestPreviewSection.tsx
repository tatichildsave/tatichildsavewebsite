import React from 'react';
import { useAppDispatch } from '../../store';
import { setActiveTab } from '../../store/uiSlice';

export const QuestPreviewSection: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <section className="py-16 lg:py-24 bg-surface transition-colors" id="quest">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-primary via-primary-container to-blue-900 rounded-3xl p-6 sm:p-10 lg:p-14 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 flex flex-col gap-5">
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-1.5 rounded-full text-white w-fit border border-white/20">
                <span className="material-symbols-outlined text-[18px] text-amber-300">
                  sports_esports
                </span>
                <span className="font-label-caps text-xs uppercase tracking-wider font-bold">
                  Interactive TATI Simulation Game
                </span>
              </div>

              <h2 className="font-headline-lg text-white tracking-tight">
                TATI Money Quest: <br />
                <span className="text-amber-300 font-extrabold">"What would you do?"</span>
              </h2>

              <p className="font-body-lg text-blue-100 max-w-xl leading-relaxed">
                TATI Money Quest turns critical financial choices into dynamic play. Children earn, plan, save, spend, respond to unexpected family surprises and race toward goals — learning that real money wisdom is about more than simply having the largest balance.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <span className="inline-flex items-center gap-1.5 bg-white/10 px-3.5 py-1.5 rounded-xl font-body-sm text-xs font-semibold">
                  <span className="material-symbols-outlined text-[16px] text-emerald-300">casino</span> Dynamic scenarios
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white/10 px-3.5 py-1.5 rounded-xl font-body-sm text-xs font-semibold">
                  <span className="material-symbols-outlined text-[16px] text-emerald-300">group</span> Peer negotiations
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white/10 px-3.5 py-1.5 rounded-xl font-body-sm text-xs font-semibold">
                  <span className="material-symbols-outlined text-[16px] text-emerald-300">psychology</span> Consequence mastery
                </span>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => dispatch(setActiveTab('learner'))}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-400 text-slate-950 font-title-md text-sm font-extrabold shadow-lg hover:bg-amber-300 transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">play_circle</span>
                  <span>Play The Money Quest Interactive Simulator</span>
                </button>
              </div>
            </div>

            {/* Quest Preview Card */}
            <div className="lg:col-span-5">
              <div className="bg-surface-container-lowest text-on-surface p-6 rounded-3xl shadow-2xl flex flex-col gap-4 border border-white/20">
                <div className="flex items-center justify-between border-b border-surface-container pb-3">
                  <span className="font-label-caps text-xs text-primary uppercase font-bold">
                    Quest Card Preview
                  </span>
                  <span className="font-label-caps text-xs bg-secondary-fixed text-on-secondary-fixed px-3 py-1 rounded-full font-bold">
                    Round 4 Dilemma
                  </span>
                </div>
                <h4 className="font-title-md text-base font-bold text-on-surface">
                  The Leaky Roof Dilemma
                </h4>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  "Heavy rains damaged the community bookshop where you earn pocket money on Saturdays. Do you donate 30% of your savings, offer 2 hours of labor instead, or hold back to safeguard your personal bicycle goal?"
                </p>
                <div className="bg-secondary-fixed/20 p-3 rounded-xl font-body-sm text-xs text-secondary font-bold border border-secondary/30">
                  Outcome teaches: Stewardship vs Immediate Sacrifice
                </div>
                <button
                  type="button"
                  onClick={() => dispatch(setActiveTab('learner'))}
                  className="w-full py-2.5 rounded-xl bg-primary-container text-on-primary text-xs font-bold hover:bg-primary transition-colors text-center"
                >
                  Make Choice in Game View
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
