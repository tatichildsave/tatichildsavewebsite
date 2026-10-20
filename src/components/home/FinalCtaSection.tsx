import React from "react";
import { ArrowUpRight } from "lucide-react";
import { useAppDispatch } from "../../store";
import { setActiveTab } from "../../store/uiSlice";
export const FinalCtaSection = () => {
  const dispatch = useAppDispatch();
  return (
    <section className="closing-section">
      <div className="home-container">
        <span className="eyebrow">LET’S GROW SOMETHING GOOD</span>
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 700,
            lineHeight: 1.1,
          }}
        >
          Their future starts
          <br />
          with a little today.
        </h2>
        <button
          className="button-primary"
          onClick={() => dispatch(setActiveTab("register"))}
        >
          Explore enrolment
          <ArrowUpRight size={19} />
        </button>
        <p>Small lessons. Thoughtful choices. Habits that grow.</p>
      </div>
      <span className="closing-flower" aria-hidden="true">
        ✳
      </span>
    </section>
  );
};
