import React from "react";
import { ArrowUpRight } from "lucide-react";
import { useAppDispatch } from "../../store";
import { setActiveTab, NavTab } from "../../store/uiSlice";
export const Footer = () => {
  const dispatch = useAppDispatch();
  return (
    <footer className="site-footer">
      <div className="home-container">
        <div className="footer-top">
          <div>
            <button
              className="brand"
              onClick={() => dispatch(setActiveTab("home"))}
            >
              <img
                className="brand-logo"
                src="/assets/tati-logo.png"
                alt="Tati"
                width="56"
                height="56"
              />
              <span className="brand-product">
                ChildSave<small>Little lessons. Lifelong confidence.</small>
              </span>
            </button>
            <p>
              Growing money confidence.
              <br />
              One little lesson at a time.
            </p>
          </div>
          <div className="footer-links">
            <a
              href="https://tati-childsave-mvp.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="guided-text-link"
            >
              Learning Portal ↗
            </a>
            {(
              [
                ["Home", "home"],
                ["For Parents", "for-parents"],
                ["Our Curriculum", "curriculum"],
                ["About TATI", "about"],
                ["Learning pathways", "junior"],
                ["For schools", "for-schools"],
                ["Try a Lesson", "try-a-lesson"],
              ] as [string, NavTab][]
            ).map(([label, tab]) => (
              <button key={tab} onClick={() => dispatch(setActiveTab(tab))}>
                {label}
                <ArrowUpRight size={15} />
              </button>
            ))}
          </div>
          <div className="footer-statement">
            <a
              href="https://tati-childsave-mvp.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 13 }}
            >
              Learning Portal ↗
            </a>
            <br />
            Small lessons.
            <br />
            <em>Brighter futures.</em>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} TATI ChildSave</span>
          <span>Made for young minds. Rooted in everyday life.</span>
        </div>
      </div>
    </footer>
  );
};
