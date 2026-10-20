import React from 'react';

export const InsightSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-surface-container-low transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="font-label-caps text-xs uppercase text-secondary tracking-wider block mb-2 font-bold">
            The Reality of Growing Up Today
          </span>
          <h2 className="font-headline-lg text-primary tracking-tight mb-4">
            Children start making money decisions long before adulthood.
          </h2>
          <p className="font-body-lg text-on-surface-variant leading-relaxed">
            Children encounter money constantly — through gifts, pocket money, shopping trips, mobile money alerts, in-app purchases, and casual family conversations. Without guidance, they learn by guesswork. TATI turns these everyday moments into lifelong practical skills.
          </p>
        </div>

        {/* 3 Key Insight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Card 1 */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm flex flex-col gap-4 border border-surface-container hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-primary mb-1">
              <span className="material-symbols-outlined text-[28px]">lightbulb</span>
            </div>
            <h3 className="font-headline-sm text-on-surface font-bold">Understand money</h3>
            <p className="font-body-md text-on-surface-variant text-sm leading-relaxed">
              Demystify where money actually comes from, the value created behind earning, and how every spending decision involves an intentional trade-off.
            </p>
            <div className="mt-auto pt-4 flex items-center gap-2 text-primary font-body-sm text-xs font-semibold">
              <span className="material-symbols-outlined text-[18px]">verified</span> Real value creation
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm flex flex-col gap-4 border border-surface-container hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-secondary-fixed flex items-center justify-center text-secondary mb-1">
              <span className="material-symbols-outlined text-[28px]">balance</span>
            </div>
            <h3 className="font-headline-sm text-on-surface font-bold">Make smarter decisions</h3>
            <p className="font-body-md text-on-surface-variant text-sm leading-relaxed">
              Practise distinguishing real needs from impulse wants, comparing prices, resisting peer pressure, and protecting digital wallets from common scams.
            </p>
            <div className="mt-auto pt-4 flex items-center gap-2 text-secondary font-body-sm text-xs font-semibold">
              <span className="material-symbols-outlined text-[18px]">verified</span> Critical judgement
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm flex flex-col gap-4 border border-surface-container hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-tertiary-fixed flex items-center justify-center text-tertiary mb-1">
              <span className="material-symbols-outlined text-[28px]">trending_up</span>
            </div>
            <h3 className="font-headline-sm text-on-surface font-bold">Build real habits</h3>
            <p className="font-body-md text-on-surface-variant text-sm leading-relaxed">
              Apply lessons immediately through hands-on physical kits, weekly savings challenges, and guided low-stakes family discussions.
            </p>
            <div className="mt-auto pt-4 flex items-center gap-2 text-tertiary font-body-sm text-xs font-semibold">
              <span className="material-symbols-outlined text-[18px]">verified</span> Everyday muscle memory
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
