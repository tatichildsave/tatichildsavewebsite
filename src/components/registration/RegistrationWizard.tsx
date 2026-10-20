import React, { useState } from "react";
import { ArrowRight, ArrowLeft, Check, Sprout } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../store";
import { setActiveTab } from "../../store/uiSlice";
export function RegistrationWizard() {
  const dispatch = useAppDispatch();
  const preferred = useAppSelector((s) => s.registration.activeForm.pathway);
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("8");
  const [path, setPath] = useState(preferred || "flex");
  const [email, setEmail] = useState("");
  const [parent, setParent] = useState("");
  const [consent, setConsent] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const labels: Record<string, string> = {
    flex: "TATI Junior Flex",
    virtual: "TATI Academy Virtual",
    "in-person": "In-person learning",
  };
  const download = () => {
    const blob = new Blob(
      [
        JSON.stringify(
          {
            parentName: parent,
            parentEmail: email,
            childFirstName: name,
            age: Number(age),
            preferredPathway: path,
            status: "Unsubmitted local draft",
          },
          null,
          2,
        ),
      ],
      { type: "application/json" },
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tati-enrolment-draft.json";
    a.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
  };
  return (
    <section className="enrol-section home-container">
      <div className="eyebrow">A LITTLE STEP TOWARDS THEIR FUTURE</div>
      <h1>Let’s find their beginning.</h1>
      <p className="enrol-intro">
        Explore enrolment in three simple steps. This preview keeps your details
        in this session only. Nothing is sent to TATI.
      </p>
      {done ? (
        <div className="enrol-card">
          <Sprout size={40} />
          <h2>Your draft is ready, {parent.split(" ")[0]}.</h2>
          <p>
            You’ve selected {labels[path]} for {name}. This is a local draft,
            not a confirmed enrolment. Programme availability and fees need
            confirmation with TATI.
          </p>
          <div className="review-list">
            <span>
              Learner
              <strong>
                {name}, age {age}
              </strong>
            </span>
            <span>
              Parent<strong>{parent}</strong>
            </span>
            <span>
              Email<strong>{email}</strong>
            </span>
            <span>
              Pathway<strong>{labels[path]}</strong>
            </span>
          </div>
          <div className="enrol-actions">
            <button className="button-primary" onClick={download}>
              Download draft <ArrowRight size={16} />
            </button>
            <button
              className="text-link"
              onClick={() => dispatch(setActiveTab("learner"))}
            >
              Try a lesson <ArrowRight size={16} />
            </button>
          </div>
          <p role="status">
            {downloaded
              ? "Draft downloaded. Keep this file somewhere private."
              : "You can download your draft to keep a copy."}
          </p>
          <button
            className="text-link"
            onClick={() => {
              setDone(false);
              setStep(1);
            }}
          >
            Edit details
          </button>
        </div>
      ) : (
        <>
          <ol className="enrol-steps">
            {["Your learner", "Your pathway", "Review & save"].map((l, i) => (
              <li
                key={l}
                aria-current={step === i + 1 ? "step" : undefined}
                className={step >= i + 1 ? "active" : ""}
              >
                <span>{step > i + 1 ? <Check size={14} /> : i + 1}</span>
                {l}
              </li>
            ))}
          </ol>
          <form
            className="enrol-card"
            onSubmit={(e) => {
              e.preventDefault();
              if (step < 3) setStep(step + 1);
              else setDone(true);
            }}
          >
            {step === 1 && (
              <>
                <h2>Meet your young explorer.</h2>
                <p>Use a first name or nickname for this preview.</p>
                <label>
                  Child’s first name or nickname
                  <input
                    required
                    maxLength={50}
                    autoComplete="off"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ama"
                  />
                </label>
                <label>
                  Age
                  <select value={age} onChange={(e) => setAge(e.target.value)}>
                    {[8, 9, 10, 11, 12].map((a) => (
                      <option key={a}>{a}</option>
                    ))}
                  </select>
                </label>
                <div className="form-columns">
                  <label>
                    Parent or guardian’s name
                    <input
                      required
                      maxLength={80}
                      autoComplete="name"
                      value={parent}
                      onChange={(e) => setParent(e.target.value)}
                      placeholder="Your name"
                    />
                  </label>
                  <label>
                    Parent or guardian’s email
                    <input
                      required
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                    />
                  </label>
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <h2>Make room for their kind of learning.</h2>
                <p>
                  Select a preferred pathway. Availability is not confirmed in
                  this preview.
                </p>
                <fieldset className="pathway-options">
                  <legend className="sr-only">Preferred pathway</legend>
                  {Object.entries(labels).map(([key, label]) => (
                    <label key={key} className={path === key ? "selected" : ""}>
                      <input
                        type="radio"
                        name="pathway"
                        value={key}
                        checked={path === key}
                        onChange={() => setPath(key as typeof path)}
                      />
                      <span>
                        <strong>{label}</strong>
                        <small>
                          {key === "flex"
                            ? "Independent learning, at your family’s pace."
                            : key === "virtual"
                              ? "Guided learning, joining online."
                              : "Shared learning, in a physical setting."}
                        </small>
                      </span>
                    </label>
                  ))}
                </fieldset>
              </>
            )}
            {step === 3 && (
              <>
                <h2>A good beginning.</h2>
                <p>Check your details before creating a local draft.</p>
                <div className="review-list">
                  <span>
                    Learner
                    <strong>
                      {name}, age {age}
                    </strong>
                  </span>
                  <span>
                    Parent<strong>{parent}</strong>
                  </span>
                  <span>
                    Email<strong>{email}</strong>
                  </span>
                  <span>
                    Pathway<strong>{labels[path]}</strong>
                  </span>
                </div>
                <label className="consent">
                  <input
                    type="checkbox"
                    required
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                  />
                  <span>
                    I am the parent or guardian. I understand this creates a
                    local draft and does not submit an enrolment or send an
                    email.
                  </span>
                </label>
              </>
            )}
            <div className="enrol-actions">
              {step > 1 ? (
                <button
                  type="button"
                  className="text-link"
                  onClick={() => setStep(step - 1)}
                >
                  <ArrowLeft size={16} />
                  Back
                </button>
              ) : (
                <button
                  type="button"
                  className="text-link"
                  onClick={() => dispatch(setActiveTab("home"))}
                >
                  Back to home
                </button>
              )}
              <button className="button-primary" type="submit">
                {step === 3 ? "Create local draft" : "Continue"}
                <ArrowRight size={16} />
              </button>
            </div>
          </form>
        </>
      )}
    </section>
  );
}
