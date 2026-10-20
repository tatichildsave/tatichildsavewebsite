import React from 'react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      num: 1,
      name: 'STORY',
      color: 'bg-primary text-on-primary',
      textColor: 'text-primary',
      desc: 'Meet a relatable money dilemma from daily African neighbourhood life.',
    },
    {
      num: 2,
      name: 'DISCOVER',
      color: 'bg-primary text-on-primary',
      textColor: 'text-primary',
      desc: 'Unpack the underlying principle simply, without confusing financial jargon.',
    },
    {
      num: 3,
      name: 'DECIDE',
      color: 'bg-secondary text-on-secondary',
      textColor: 'text-secondary',
      desc: 'Make interactive choices and witness the consequences unfold safely.',
    },
    {
      num: 4,
      name: 'DO',
      color: 'bg-secondary text-on-secondary',
      textColor: 'text-secondary',
      desc: 'Execute a tactile physical mission using the TATI Junior Kit and tokens.',
    },
    {
      num: 5,
      name: 'DISCUSS',
      color: 'bg-tertiary text-on-tertiary',
      textColor: 'text-tertiary',
      desc: 'Connect over an easy, pre-prompted 5–10 minute chat with parents.',
    },
    {
      num: 6,
      name: 'REFLECT',
      color: 'bg-tertiary text-on-tertiary',
      textColor: 'text-tertiary',
      desc: 'Anchor key insights in the Money Passport and collect module badges.',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-surface transition-colors" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="font-label-caps text-xs uppercase text-primary tracking-wider block mb-2 font-bold">
            Pedagogical Framework
          </span>
          <h2 className="font-headline-lg text-on-surface tracking-tight mb-4">
            Children don't just learn about money. <br className="hidden sm:block" />
            <span className="text-primary-container">They practise using it wisely.</span>
          </h2>
          <p className="font-body-lg text-on-surface-variant leading-relaxed">
            Our six-step learning cycle grounds abstract economic concepts in emotional safety, real agency, and repeated practice.
          </p>
        </div>

        {/* 6-Stage Stepped Pipeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {steps.map((s) => (
            <div
              key={s.num}
              className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-surface-container flex flex-col items-center text-center relative group hover:shadow-md hover:-translate-y-1 transition-all"
            >
              <div
                className={`w-11 h-11 rounded-full ${s.color} flex items-center justify-center font-label-data-md font-bold mb-3 shadow-sm`}
              >
                {s.num}
              </div>
              <span className={`font-label-caps text-[11px] uppercase ${s.textColor} tracking-wider mb-1 font-bold`}>
                Step 0{s.num}
              </span>
              <h4 className="font-title-md text-on-surface font-bold text-base mb-2">
                {s.name}
              </h4>
              <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
