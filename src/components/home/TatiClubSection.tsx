import React from 'react';
import { useAppDispatch } from '../../store';
import { setActiveTab } from '../../store/uiSlice';

export const TatiClubSection: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <section className="py-16 lg:py-24 bg-surface transition-colors" id="tati-club">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Visual Column */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="w-full h-80 sm:h-96 rounded-3xl overflow-hidden bg-surface-container shadow-xl border border-surface-container">
              <img
                className="w-full h-full object-cover"
                alt="A group of lively, diverse African kids gathered together in high-energy collaboration around a game board in an Accra creative learning space"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5T_cUGdqpR03anicjrZ5zluvgp3aNksFkb95Cn8KASyNwCX2nKD7c8lTTtc9_AyfFhUlndNUwAPhcWDov7J2F5kCs_TdwigpJlKjh-ZcgLG2fr0tuN5fAcJt6XH_fgjgjkdWNQ8pET4xUUD44feYWsBZUKLcNwxrzIpRJvoUZ2LA8sF9GrnB_irdrxwvnyNqy5374aspk_kYZ-8H1kNS26vLfZFm-Q8iEpKsJa35OTdwXRwqSKws"
              />
            </div>
          </div>

          {/* Copy Column */}
          <div className="lg:col-span-7 flex flex-col gap-6 order-1 lg:order-2">
            <span className="font-label-caps text-xs uppercase text-primary tracking-wider font-bold">
              Lifelong Community
            </span>
            <h2 className="font-headline-lg text-primary tracking-tight">
              The journey doesn't end at graduation.
            </h2>
            <p className="font-body-lg text-on-surface-variant leading-relaxed">
              Introducing <strong>TATI ChildSave Club</strong> — our continuing ecosystem for sustained practice and play. Because real financial confidence develops through steady habits throughout adolescence.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="flex items-start gap-3 bg-surface-container-low p-4 rounded-xl border border-surface-container">
                <span className="material-symbols-outlined text-primary text-[24px] shrink-0 mt-0.5">
                  event
                </span>
                <div>
                  <p className="font-title-md text-sm text-on-surface font-bold">Money Quest Events</p>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                    Live monthly challenges and interactive team simulations.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-surface-container-low p-4 rounded-xl border border-surface-container">
                <span className="material-symbols-outlined text-secondary text-[24px] shrink-0 mt-0.5">
                  storefront
                </span>
                <div>
                  <p className="font-title-md text-sm text-on-surface font-bold">Mini-Enterprise Challenges</p>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                    Low-stakes real-world earning and problem-solving projects.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-surface-container-low p-4 rounded-xl border border-surface-container">
                <span className="material-symbols-outlined text-tertiary text-[24px] shrink-0 mt-0.5">
                  meeting_room
                </span>
                <div>
                  <p className="font-title-md text-sm text-on-surface font-bold">Virtual Money Rooms</p>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                    Moderated question circles with guest African business mentors.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-surface-container-low p-4 rounded-xl border border-surface-container">
                <span className="material-symbols-outlined text-primary text-[24px] shrink-0 mt-0.5">
                  volunteer_activism
                </span>
                <div>
                  <p className="font-title-md text-sm text-on-surface font-bold">Family Money Days</p>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                    Celebrations, market stalls, and parent-child trading fairs.
                  </p>
                </div>
              </div>
            </div>

            <p className="font-body-sm text-xs text-on-surface-variant bg-surface-container-low p-4 rounded-xl border border-surface-container">
              *Academy learners receive automatic membership upon course completion; Flex families access the club as part of their enrolled pathway.
            </p>

            <div>
              <button
                type="button"
                onClick={() => dispatch(setActiveTab('register'))}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-surface-container-highest text-primary font-title-md text-sm font-bold hover:bg-primary hover:text-on-primary transition-all shadow-sm"
              >
                <span>Join The TATI Community Today</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
