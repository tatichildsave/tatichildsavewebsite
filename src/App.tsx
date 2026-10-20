/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { setActiveTab, NavTab } from "./store/uiSlice";
import { store, useAppDispatch, useAppSelector } from "./store";
import { Header } from "./components/common/Header";
import { Footer } from "./components/common/Footer";
import { ToastContainer } from "./components/common/Toast";
import { InfoPage } from "./components/home/InfoPage";
import { HomePage } from "./components/home/HomePage";
import { ApplicationPage } from "./components/registration/ApplicationPage";
import { LearnerApp } from "./components/learner/LearnerApp";
import { ParentDashboard } from "./components/parent/ParentDashboard";
import { WorkspaceSyncModal } from "./components/workspace/WorkspaceSyncModal";

function AppContent() {
  const dispatch = useAppDispatch();
  const { activeTab } = useAppSelector((state) => state.ui);
  const { isDarkMode } = useAppSelector((state) => state.theme);

  useEffect(() => {
    const routes = [
      "home",
      "junior",
      "academy",
      "tati-club",
      "for-schools",
      "about",
      "register",
      "learner",
      "parent-dashboard",
      "workspace",
    ];
    const onPop = () => {
      const tab = window.location.hash.slice(1);
      dispatch(setActiveTab((routes.includes(tab) ? tab : "home") as NavTab));
    };
    window.addEventListener("popstate", onPop);
    window.addEventListener("hashchange", onPop);
    return () => {
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("hashchange", onPop);
    };
  }, [dispatch]);
  useEffect(() => {
    if (window.location.hash !== "#" + activeTab)
      window.history.pushState(null, "", "#" + activeTab);
    document.title =
      "TATI ChildSave — " +
      ({
        home: "Little lessons. Lifelong confidence.",
        register: "Explore enrolment",
        learner: "Learning preview",
        "parent-dashboard": "Parent preview",
        "for-schools": "For schools",
        about: "Our approach",
        junior: "Learning pathways",
        academy: "Learning pathways",
        "tati-club": "Learning pathways",
        workspace: "Workspace preview",
      }[activeTab] || "Learning pathways");
  }, [activeTab]);
  // Sync dark mode class on document element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const renderActiveScreen = () => {
    switch (activeTab) {
      case "register":
        return <ApplicationPage />;
      case "learner":
        return <LearnerApp />;
      case "parent-dashboard":
        return <ParentDashboard />;
      case "workspace":
        return <WorkspaceSyncModal />;
      case "junior":
      case "academy":
        return <InfoPage page="junior" />;
      case "tati-club":
        return <InfoPage page="club" />;
      case "for-schools":
        return <InfoPage page="for-schools" />;
      case "about":
        return <InfoPage page="about" />;
      case "home":
      default:
        return <HomePage />;
    }
  };

  // Full Screen Responsive Web
  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col transition-colors">
      <a
        className="skip-link"
        href="#main-content"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById("main-content")?.focus();
        }}
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1 w-full pt-20">
        {activeTab !== "home" && activeTab !== "register" && (
          <div className="demo-banner">
            Development preview · Learning progress and dashboards use demo
            data. No enrolment is submitted.
          </div>
        )}
        {renderActiveScreen()}
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
