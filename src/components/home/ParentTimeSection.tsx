import React from 'react';

export const ParentTimeSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-surface transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 lg:p-12 shadow-lg border border-surface-container">
          <div className="max-w-3xl mb-10">
            <span className="font-label-caps text-xs uppercase text-primary tracking-wider block mb-2 font-bold">
              Designed for Busy Lives
            </span>
            <h2 className="font-headline-lg text-primary tracking-tight mb-4">
              Your child learns with TATI. <br className="hidden sm:block" />
              <span className="text-on-surface">You don't have to become the teacher.</span>
            </h2>
            <p className="font-body-lg text-on-surface-variant leading-relaxed">
              We understand how demanding parental schedules are. TATI is engineered so children can explore, understand, and advance independently without parents having to teach concepts or correct worksheets after a long day.
            </p>
          </div>

          {/* Side-by-Side Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Column 1: What TATI Does */}
            <div className="bg-surface-container-low p-6 rounded-2xl flex flex-col gap-4 border border-surface-container">
              <div className="flex items-center gap-2 text-primary font-title-md font-bold text-base">
                <span className="material-symbols-outlined text-[24px]">smart_toy</span>
                <span>What TATI Does</span>
              </div>
              <ul className="flex flex-col gap-3 font-body-md text-sm text-on-surface">
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[20px] text-primary shrink-0 mt-0.5">
                    check
                  </span>
                  <span>
                    <strong>Teaches the concepts:</strong> Interactive lessons, audio prompts, and structured video guides.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[20px] text-primary shrink-0 mt-0.5">
                    check
                  </span>
                  <span>
                    <strong>Guides activities:</strong> Provides clear, step-by-step instructions for kit and screen missions.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[20px] text-primary shrink-0 mt-0.5">
                    check
                  </span>
                  <span>
                    <strong>Presents decisions & consequences:</strong> Generates real dilemmas without actual financial risk.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[20px] text-primary shrink-0 mt-0.5">
                    check
                  </span>
                  <span>
                    <strong>Tracks progress & rewards:</strong> Automatically records badge completions and savings habits.
                  </span>
                </li>
              </ul>
            </div>

            {/* Column 2: What Parents Do */}
            <div className="bg-secondary-fixed/10 p-6 rounded-2xl flex flex-col gap-4 border border-secondary/20">
              <div className="flex items-center gap-2 text-secondary font-title-md font-bold text-base">
                <span className="material-symbols-outlined text-[24px]">family_restroom</span>
                <span>What Parents Do</span>
              </div>
              <ul className="flex flex-col gap-3 font-body-md text-sm text-on-surface">
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[20px] text-secondary shrink-0 mt-0.5">
                    favorite
                  </span>
                  <span>
                    <strong>Encourage curiosity:</strong> Be their champion as they reach each milestone.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[20px] text-secondary shrink-0 mt-0.5">
                    chat
                  </span>
                  <span>
                    <strong>5–10 minute TATI Talks:</strong> Casual conversation using pre-made question prompts on car rides or dinner.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[20px] text-secondary shrink-0 mt-0.5">
                    shield
                  </span>
                  <span>
                    <strong>Safeguard real money:</strong> Approve physical savings and pocket money tasks at your own pace.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[20px] text-secondary shrink-0 mt-0.5">
                    celebration
                  </span>
                  <span>
                    <strong>Celebrate progress:</strong> Share in the pride of every module badge unlocked.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Highlight Callout Box */}
          <div className="bg-primary-container text-on-primary p-5 rounded-2xl flex items-center justify-between flex-wrap gap-4 shadow-md">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[32px] text-tertiary-fixed shrink-0">
                tips_and_updates
              </span>
              <p className="font-title-md text-sm sm:text-base font-medium">
                "Think 5–10 minutes of casual, meaningful conversation — not another evening of stressful homework."
              </p>
            </div>
            <span className="font-label-caps text-xs bg-white/20 text-on-primary px-3.5 py-1.5 rounded-full uppercase font-bold tracking-wider">
              Stress-Free Routine
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
