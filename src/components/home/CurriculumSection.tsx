import React from "react";
import { ArrowUpRight, Plus, BookOpen } from "lucide-react";
import { CURRICULUM_MODULES } from "../../data/curriculumData";
import { useAppDispatch } from "../../store";
import { setActiveTab } from "../../store/uiSlice";
export const CurriculumSection = () => {
  const dispatch = useAppDispatch();
  return (
    <section className="lesson-section" id="curriculum">
      <div className="home-container">
        <div className="section-heading">
          <div>
            <div className="eyebrow">
              TWELVE CHAPTERS. ONE CONNECTED JOURNEY.
            </div>
            <h2 className="info-title">
              A world of money
              <br />
              to discover.
            </h2>
          </div>
          <p>
            Explore the curriculum. Open a chapter for a story and a practical
            activity to try.
          </p>
        </div>
        <div className="curriculum-grid">
          {CURRICULUM_MODULES.map((mod) => (
            <details className="curriculum-chapter" key={mod.id}>
              <summary>
                <span className="chapter-number">
                  {mod.numberString}
                  <Plus size={15} />
                </span>
                <strong>{mod.title}</strong>
                <span>{mod.summary}</span>
              </summary>
              <div className="chapter-content">
                <div className="eyebrow">
                  <BookOpen size={14} />
                  THE STORY
                </div>
                <p>{mod.story.scenario}</p>
                <div className="eyebrow">TRY IT IN REAL LIFE</div>
                <p>{mod.doMission}</p>
                <button
                  className="text-link"
                  onClick={() => dispatch(setActiveTab("learner"))}
                >
                  Open learning preview
                  <ArrowUpRight size={15} />
                </button>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
