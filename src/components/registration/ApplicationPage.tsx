import React from "react";
import { ExternalLink, ArrowLeft } from "lucide-react";
import {
  APPLICATION_FORM_URL,
  APPLICATION_FORM_EMBED_URL,
} from "../../config/application";
import { useAppDispatch } from "../../store";
import { setActiveTab } from "../../store/uiSlice";

export function ApplicationPage() {
  const dispatch = useAppDispatch();
  return (
    <section className="founding-application ref-wrap">
      <button
        className="ref-text-link"
        onClick={() => dispatch(setActiveTab("home"))}
      >
        <ArrowLeft size={15} />
        Back to TATI
      </button>
      <div className="ref-kicker">FOUNDING FAMILIES · APPLICATION</div>
      <h1>Start their money-smart journey.</h1>
      <p>
        Complete the TATI ChildSave application below. Your answers are
        submitted directly to TATI’s Google Form when you select{" "}
        <strong>Submit</strong> at the end of the form.
      </p>
      <a
        className="ref-button"
        href={APPLICATION_FORM_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        Open application in Google Forms <ExternalLink size={17} />
      </a>
      <p className="form-fallback-note">
        If the form does not load or you prefer a full-screen view, use the
        button above. Applying does not automatically confirm a place;
        applications are reviewed on a rolling basis.
      </p>
      <iframe
        className="founding-google-form"
        src={APPLICATION_FORM_EMBED_URL}
        title="TATI ChildSave Founding Families application"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      >
        Open the application using the Google Forms button above.
      </iframe>
    </section>
  );
}
