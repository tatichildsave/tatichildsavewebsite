import React from 'react';
import { useAppDispatch } from '../../store';
import { setActiveTab } from '../../store/uiSlice';

export const JuniorKitSection: React.FC = () => {
  const dispatch = useAppDispatch();

  const kitComponents = [
    { name: 'TATI Junior Workbook', icon: 'menu_book' },
    { name: 'Money Passport', icon: 'badge' },
    { name: 'TATI Money Wallet', icon: 'wallet' },
    { name: 'TATI Learning Money', icon: 'payments' },
    { name: 'Money Mission Cards', icon: 'style' },
    { name: 'Savings Goal Tracker', icon: 'track_changes' },
    { name: 'Achievement Badges', icon: 'loyalty' },
    { name: 'Parent Quick Guide', icon: 'auto_stories' },
  ];

  return (
    <section className="py-16 lg:py-24 bg-surface transition-colors" id="junior-kit">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Visual Flat-Lay Column */}
          <div className="lg:col-span-6 relative">
            <div className="w-full h-96 lg:h-[460px] rounded-3xl overflow-hidden bg-surface-container shadow-2xl relative border border-surface-container">
              <img
                className="w-full h-full object-cover"
                alt="High quality top-down flat lay photograph of the colorful TATI Junior Kit items neatly arranged on a clean cream surface"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzpdXCtWdkVJEkHsysFEw0gpaYAFQBuzMP1ErK9YLdEJvSA2w9q2Hr_kgHw_mqgkoR39hPSWjzsWOKEXyByhN4X2xl09f3gZ6Ko_-poX1Vj1TVQ5WE0U5ycsNvz6n8elBQwWpCbwEZbOwJ75T9l2SiSmJ29VF3hT9UZAUjxZTaYCT-PfWGYkFD2dD1oHWVsIpHOAW7vImRimEX5dJWWzD4q3IN1TXrF5vgFThq1q3a4vZS9q4b1nY"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 bg-surface-container-lowest/90 backdrop-blur-md px-5 py-3 rounded-2xl shadow-md border border-surface-container">
                <p className="font-label-caps text-xs text-primary uppercase font-extrabold">
                  Tactile Physical Companion
                </p>
                <p className="font-title-md text-sm text-on-surface font-bold">
                  Included with Every Journey & Delivered Home
                </p>
              </div>
            </div>
          </div>

          {/* Text & Components List */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <span className="font-label-caps text-xs uppercase text-secondary tracking-wider font-bold">
              Hands-On Tangibility
            </span>
            <h2 className="font-headline-lg text-primary tracking-tight">
              Learning children can touch, play with and use.
            </h2>
            <p className="font-body-lg text-on-surface-variant leading-relaxed">
              Screen learning alone doesn't build financial muscle. The physical TATI Junior Kit bridges digital concepts with tactile actions, turning ideas into household habits and memorable family talks.
            </p>

            {/* Component Grid Tags */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {kitComponents.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 bg-surface-container-low p-3.5 rounded-xl border border-surface-container hover:border-primary/50 transition-colors"
                >
                  <span className="material-symbols-outlined text-primary text-[22px]">
                    {item.icon}
                  </span>
                  <span className="font-body-md text-sm text-on-surface font-semibold">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => dispatch(setActiveTab('register'))}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-container text-on-primary font-title-md text-sm font-bold shadow-md hover:bg-primary transition-all"
              >
                <span>Receive the Junior Kit with Enrollment</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
