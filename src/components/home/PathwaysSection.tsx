import React from 'react';
import { useAppDispatch } from '../../store';
import { setActiveTab } from '../../store/uiSlice';
import { updateActiveForm } from '../../store/registrationSlice';

export const PathwaysSection: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleSelectPathway = (pathway: 'flex' | 'virtual' | 'in-person') => {
    dispatch(updateActiveForm({ pathway }));
    dispatch(setActiveTab('register'));
  };

  return (
    <section className="py-16 lg:py-24 bg-surface-container-low transition-colors" id="pathways">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="font-label-caps text-xs uppercase text-secondary tracking-wider block mb-2 font-bold">
            Pathways & Modalities
          </span>
          <h2 className="font-headline-lg text-primary tracking-tight mb-4">
            One TATI journey. Different ways to experience it.
          </h2>
          <p className="font-body-lg text-on-surface-variant leading-relaxed">
            Every child follows the same rigorous, foundational 12-module curriculum. Select the level of social interaction and live facilitator guidance that fits your family's lifestyle.
          </p>
        </div>

        {/* 3 Premium Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* CARD 1: TATI JUNIOR FLEX */}
          <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container p-6 lg:p-8 flex flex-col justify-between hover:shadow-lg transition-all relative">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-caps text-[11px] uppercase font-bold">
                  Best for flexible schedules
                </span>
                <span className="material-symbols-outlined text-primary text-[22px]">schedule</span>
              </div>
              <div>
                <p className="font-label-caps text-xs text-primary uppercase font-bold tracking-wider">
                  Learn anywhere
                </p>
                <h3 className="font-headline-md text-on-surface font-extrabold mt-1">
                  TATI Junior Flex
                </h3>
              </div>
              <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                A child-led, self-paced TATI experience for families who need total timing flexibility.
              </p>

              {/* Parent Reassurance Callout */}
              <div className="p-3.5 rounded-xl bg-surface-container-low text-on-surface flex items-start gap-2.5 my-1 border border-surface-container">
                <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">
                  sentiment_satisfied
                </span>
                <p className="font-body-sm text-xs leading-relaxed">
                  <strong>Parents don't have to teach:</strong> TATI guides the child while parents support with occasional short conversations.
                </p>
              </div>

              {/* Features List */}
              <ul className="flex flex-col gap-2.5 pt-2 text-xs font-medium text-on-surface">
                {[
                  'Complete 12-module Junior journey',
                  'Interactive digital learning experience',
                  'Physical TATI Junior Kit & Workbook',
                  'DECIDE scenarios & Money Missions',
                  'Unlockable badges & progress tracker',
                  'Parent progress view & discussion prompts',
                  'Monthly virtual TATI Money Room',
                  '6 months full platform access',
                ].map((feat, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[17px] text-tertiary">
                      check_circle
                    </span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 flex flex-col gap-3 mt-4 bg-surface-container-low p-4 rounded-xl border border-surface-container">
              <span className="font-label-caps text-[11px] text-primary uppercase font-bold text-center">
                Founding Family Enrolment Active
              </span>
              <button
                type="button"
                onClick={() => handleSelectPathway('flex')}
                className="w-full text-center py-3 px-4 rounded-xl bg-surface-container-highest text-primary font-title-md text-sm font-bold hover:bg-primary hover:text-on-primary transition-all shadow-sm"
              >
                Enroll in Flex Pathway
              </button>
            </div>
          </div>

          {/* CARD 2: TATI ACADEMY VIRTUAL */}
          <div className="bg-surface-container-lowest rounded-2xl shadow-lg border-2 border-primary/40 p-6 lg:p-8 flex flex-col justify-between hover:shadow-xl transition-all relative">
            <div className="absolute -top-3.5 right-6 bg-secondary-container text-on-secondary-fixed font-label-caps text-xs px-3 py-1 rounded-full uppercase font-extrabold shadow-sm ring-2 ring-surface">
              Popular Choice
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-primary-fixed text-primary font-label-caps text-[11px] uppercase font-bold">
                  Best for structure + flexibility
                </span>
                <span className="material-symbols-outlined text-primary text-[22px]">videocam</span>
              </div>
              <div>
                <p className="font-label-caps text-xs text-primary uppercase font-bold tracking-wider">
                  Learn live from anywhere
                </p>
                <h3 className="font-headline-md text-on-surface font-extrabold mt-1">
                  TATI Academy Virtual
                </h3>
              </div>
              <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                The complete TATI Junior journey guided by an expert TATI facilitator with an engaged, small online peer cohort.
              </p>

              <div className="p-3.5 rounded-xl bg-primary-fixed/20 text-on-surface flex items-start gap-2.5 my-1 border border-primary/20">
                <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">
                  groups
                </span>
                <p className="font-body-sm text-xs leading-relaxed">
                  <strong>Live Facilitation:</strong> 12 interactive weekly sessions where children debate, collaborate, and practise together.
                </p>
              </div>

              {/* Features List */}
              <ul className="flex flex-col gap-2.5 pt-2 text-xs font-medium text-on-surface">
                {[
                  'TATI Junior Kit delivered home',
                  'Complete digital journey access',
                  '12 weekly live interactive sessions',
                  'Small cohorts for personalized voice',
                  'Team games & Money Missions',
                  'Facilitator feedback & catch-up support',
                  'Money Quest graduation challenge',
                  'Automatic TATI Club membership',
                ].map((feat, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[17px] text-primary">
                      check_circle
                    </span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 flex flex-col gap-3 mt-4 bg-surface-container-low p-4 rounded-xl border border-surface-container">
              <span className="font-label-caps text-[11px] text-secondary font-bold uppercase text-center">
                Virtual Cohort Enrolment Active
              </span>
              <button
                type="button"
                onClick={() => handleSelectPathway('virtual')}
                className="w-full text-center py-3 px-4 rounded-xl bg-primary-container text-on-primary font-title-md text-sm font-bold hover:bg-primary transition-all shadow-md"
              >
                Enroll in Virtual Academy
              </button>
            </div>
          </div>

          {/* CARD 3: TATI ACADEMY IN-PERSON */}
          <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container p-6 lg:p-8 flex flex-col justify-between hover:shadow-lg transition-all relative">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-secondary-fixed text-secondary font-label-caps text-[11px] uppercase font-bold">
                  Most immersive
                </span>
                <span className="material-symbols-outlined text-secondary text-[22px]">diversity_3</span>
              </div>
              <div>
                <p className="font-label-caps text-xs text-secondary uppercase font-bold tracking-wider">
                  The full TATI experience
                </p>
                <h3 className="font-headline-md text-on-surface font-extrabold mt-1">
                  TATI Academy In-Person
                </h3>
              </div>
              <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                Saturday morning workshops where children practise money decisions through physical simulations, market days, and teamwork.
              </p>

              <div className="p-3.5 rounded-xl bg-secondary-fixed/20 text-on-surface flex items-start gap-2.5 my-1 border border-secondary/20">
                <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">
                  storefront
                </span>
                <p className="font-body-sm text-xs leading-relaxed">
                  <strong>Real Simulation:</strong> Live TATI Market days, cash registers, budgeting simulations, and team entrepreneurship.
                </p>
              </div>

              {/* Features List */}
              <ul className="flex flex-col gap-2.5 pt-2 text-xs font-medium text-on-surface">
                {[
                  'TATI Junior Kit & Materials box',
                  'Complete digital platform access',
                  '12 Saturday in-person masterclasses',
                  'Live TATI Market trading simulations',
                  'Hands-on group money quests',
                  'Direct facilitator mentor interaction',
                  'In-person Graduation & Family Day',
                  'Automatic TATI Club membership',
                ].map((feat, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[17px] text-secondary">
                      check_circle
                    </span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 flex flex-col gap-3 mt-4 bg-surface-container-low p-4 rounded-xl border border-surface-container">
              <span className="font-label-caps text-[11px] text-secondary font-bold uppercase text-center">
                Accra Cohort Enrolment Active
              </span>
              <button
                type="button"
                onClick={() => handleSelectPathway('in-person')}
                className="w-full text-center py-3 px-4 rounded-xl bg-surface-container-highest text-secondary font-title-md text-sm font-bold hover:bg-secondary hover:text-on-secondary transition-all shadow-sm"
              >
                Enroll in In-Person Academy
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
