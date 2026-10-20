import React, { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../store";
import { setActiveTab, NavTab } from "../../store/uiSlice";
import { APPLICATION_FORM_URL, LEARNING_PORTAL_URL } from "../../config/application";
export const Header = () => {
  const dispatch = useAppDispatch();
  const active = useAppSelector((s) => s.ui.activeTab);
  const [open, setOpen] = useState(false);
  const go = (tab: NavTab) => {
    dispatch(setActiveTab(tab));
    setOpen(false);
  };
  return (
    <header className="site-header">
      <div className="header-inner">
        <button
          className="brand"
          onClick={() => go("home")}
          aria-label="TATI ChildSave home"
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
        <button
          className="menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav aria-label="Main navigation" className={open ? "nav-open" : ""}>
          {(
            [
              ["Our approach", "about"],
              ["Learning pathways", "junior"],
              ["For schools", "for-schools"],
              ["Try a lesson", "learner"],
            ] as [string, NavTab][]
          ).map(([label, tab]) => (
            <button
              className={active === tab ? "nav-active" : ""}
              key={tab}
              onClick={() => go(tab)}
            >
              {label}
            </button>
          ))}
          <a
            className="header-cta"
            href={LEARNING_PORTAL_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Learning Portal <ArrowUpRight size={16} />
          </a>
          <a
            className="header-cta"
            href={APPLICATION_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Join a Founding Family <ArrowUpRight size={16} />
          </a>
        </nav>
      </div>
    </header>
  );
};
