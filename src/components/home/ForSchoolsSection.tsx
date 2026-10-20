import React from 'react';
import { useAppDispatch } from '../../store';
import { setActiveTab } from '../../store/uiSlice';

export const ForSchoolsSection: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <section className="py-16 lg:py-24 bg-surface-container-low transition-colors" id="for-schools">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="font-label-caps text-xs uppercase text-secondary tracking-wider block mb-2 font-bold">
            Institutional Collaboration
          </span>
          <h2 className="font-headline-lg text-primary tracking-tight mb-4">
            Partner with TATI ChildSave.
          </h2>
          <p className="font-body-lg text-on-surface-variant leading-relaxed">
            Empowering classrooms, customer families, and community youth initiatives across the continent with practical financial capability programs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Schools */}
          <div className="bg-surface-container-lowest p-6 lg:p-8 rounded-2xl shadow-sm border border-surface-container flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[28px]">school</span>
              </div>
              <h3 className="font-headline-sm text-on-surface font-bold">For Schools</h3>
              <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                Turn-key financial education clubs, co-curricular workshops, physical kits, and facilitator training that elevate your school's life-readiness curriculum.
              </p>
            </div>
            <div className="pt-6 border-t border-surface-container mt-6">
              <span className="font-label-caps text-xs text-primary uppercase font-bold">
                Curriculum-aligned & Co-curricular
              </span>
            </div>
          </div>

          {/* Banks & Fintechs */}
          <div className="bg-surface-container-lowest p-6 lg:p-8 rounded-2xl shadow-sm border border-surface-container flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary-fixed flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[28px]">account_balance</span>
              </div>
              <h3 className="font-headline-sm text-on-surface font-bold">Financial Institutions</h3>
              <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                Meaningful junior savings propositions and brand loyalty initiatives that move beyond plastic piggy banks into genuine financial capability for client families.
              </p>
            </div>
            <div className="pt-6 border-t border-surface-container mt-6">
              <span className="font-label-caps text-xs text-secondary uppercase font-bold">
                High Trust & Custody Preparedness
              </span>
            </div>
          </div>

          {/* Companies */}
          <div className="bg-surface-container-lowest p-6 lg:p-8 rounded-2xl shadow-sm border border-surface-container flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-tertiary-fixed flex items-center justify-center text-tertiary">
                <span className="material-symbols-outlined text-[28px]">domain</span>
              </div>
              <h3 className="font-headline-sm text-on-surface font-bold">Corporations & CSR</h3>
              <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                Impactful employee family benefits and high-impact CSR youth empowerment initiatives creating measurable, lasting economic capability in African communities.
              </p>
            </div>
            <div className="pt-6 border-t border-surface-container mt-6">
              <span className="font-label-caps text-xs text-tertiary uppercase font-bold">
                Measurable Social Impact
              </span>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={() => dispatch(setActiveTab('register'))}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary-container text-on-primary font-title-md text-sm font-bold hover:bg-primary transition-all shadow-md"
          >
            <span>Partner With TATI ChildSave</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </section>
  );
};
