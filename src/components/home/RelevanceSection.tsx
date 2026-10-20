import React from 'react';

export const RelevanceSection: React.FC = () => {
  const contextTags = [
    { title: 'Pocket Money', icon: 'payments', color: 'text-primary', desc: 'Managing weekly sums without early depletion' },
    { title: 'Local Shopping', icon: 'store', color: 'text-secondary', desc: 'Comparing prices in neighbourhood markets' },
    { title: 'Saving for Goals', icon: 'savings', color: 'text-tertiary', desc: 'Delayed gratification for a desired bicycle or book' },
    { title: 'Mobile Money', icon: 'phone_android', color: 'text-primary', desc: 'Understanding that digital balance is real cash' },
    { title: 'Needs vs Wants', icon: 'balance', color: 'text-secondary', desc: 'Resisting peer pressure and instant gratification' },
    { title: 'Scams & Safety', icon: 'gpp_good', color: 'text-tertiary', desc: 'Guarding OTPs and recognizing suspicious deals' },
    { title: 'Value & Earning', icon: 'handyman', color: 'text-primary', desc: 'Creating real solutions to earn independent funds' },
    { title: 'Borrowing Trust', icon: 'replay', color: 'text-secondary', desc: 'The moral and financial weight of lending' },
    { title: 'Banking Literacy', icon: 'account_balance', color: 'text-tertiary', desc: 'Demystifying bank counters and ledger slips' },
    { title: 'Growing Money', icon: 'trending_up', color: 'text-primary', desc: 'The seed principles of compounding interest' },
  ];

  return (
    <section className="py-16 lg:py-24 bg-surface-container-low transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="font-label-caps text-xs uppercase text-secondary tracking-wider block mb-2 font-bold">
            Context Matters
          </span>
          <h2 className="font-headline-lg text-primary tracking-tight mb-4">
            Money lessons that look like real life.
          </h2>
          <p className="font-body-lg text-on-surface-variant leading-relaxed">
            Designed in Ghana for African realities, with universal financial principles children can carry wherever life takes them.
          </p>
        </div>

        {/* Real Context Tags Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {contextTags.map((item, idx) => (
            <div
              key={idx}
              className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-surface-container flex flex-col items-center text-center hover:shadow-md hover:-translate-y-1 transition-all"
            >
              <span className={`material-symbols-outlined ${item.color} text-[34px] mb-2`}>
                {item.icon}
              </span>
              <h4 className="font-title-md text-sm text-on-surface font-bold">
                {item.title}
              </h4>
              <p className="font-body-sm text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
