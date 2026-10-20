import React from "react";
import { ArrowUpRight, Check, BookOpen, Sprout, Users } from "lucide-react";
import { useAppDispatch } from "../../store";
import { setActiveTab } from "../../store/uiSlice";
import { updateActiveForm } from "../../store/registrationSlice";
import { TrustSection } from "./TrustSection";
import { FinalCtaSection } from "./FinalCtaSection";
import { CurriculumSection } from "./CurriculumSection";
import { HowItWorksSection } from "./HowItWorksSection";
export const InfoPage = ({
  page,
}: {
  page: "about" | "junior" | "for-schools" | "club";
}) => {
  const dispatch = useAppDispatch();
  if (page === "club")
    return (
      <>
        <section className="home-container home-section">
          <div className="eyebrow">TATI CLUB · COMMUNITY & PRACTICE</div>
          <h1 className="info-title">
            Learn together.
            <br />
            Grow in confidence.
          </h1>
          <p className="enrol-intro">
            A shared learning experience built around group activities,
            practical money challenges and conversations with peers. Explore the
            existing enrolment options with your family; specific Club
            availability and delivery details need confirmation with TATI.
          </p>
          <img
            src="/assets/refinement/club.webp"
            alt="Four children learning about money together"
            style={{
              width: "100%",
              maxWidth: 700,
              borderRadius: 20,
              margin: "24px 0",
            }}
          />
          <div>
            <button
              className="button-primary"
              onClick={() => dispatch(setActiveTab("register"))}
            >
              Explore enrolment options <ArrowUpRight size={17} />
            </button>
          </div>
        </section>
        <FinalCtaSection />
      </>
    );
  if (page === "about")
    return (
      <>
        <TrustSection />
        <section className="lesson-section">
          <div className="home-container lesson-layout">
            <div>
              <div className="eyebrow">ROOTED IN EVERYDAY LIFE</div>
              <h2 className="info-title">
                Money is part of their world.
                <br />
                Let’s help them understand it.
              </h2>
              <p>
                A trip to the market. A birthday gift. Something worth saving
                for. These ordinary moments are opportunities to build
                thoughtful habits.
              </p>
            </div>
            <div>
              <h3>Learn. Choose. Reflect. Try again.</h3>
              <p>
                Our learning approach gives children room to explore the reasons
                behind a decision. Parents can support that exploration with
                questions and encouragement.
              </p>
              <button
                className="button-primary"
                onClick={() => dispatch(setActiveTab("learner"))}
              >
                Explore a sample lesson <ArrowUpRight size={17} />
              </button>
            </div>
          </div>
        </section>
        <HowItWorksSection />
        <FinalCtaSection />
      </>
    );
  if (page === "for-schools")
    return (
      <>
        <section className="home-container home-section">
          <div className="eyebrow">FOR SCHOOLS & LEARNING COMMUNITIES</div>
          <div className="section-heading">
            <h1 className="info-title">
              A life skill worth
              <br />
              making room for.
            </h1>
            <p>
              Bring money conversations into the classroom with stories, choices
              and practical activities designed for learners aged 8–12.
            </p>
          </div>
          <div className="steps-grid">
            {[
              {
                Icon: BookOpen,
                title: "Explore the foundations",
                body: "Introduce earning, planning, saving, spending, growing and protecting money.",
              },
              {
                Icon: Users,
                title: "Learn through discussion",
                body: "Let children compare ideas, explain choices and hear different perspectives.",
              },
              {
                Icon: Sprout,
                title: "Connect learning to life",
                body: "Use familiar situations and reflective activities to turn concepts into practice.",
              },
            ].map(({ Icon, title, body }) => (
              <article className="step" key={title}>
                <span className="step-icon">
                  <Icon />
                </span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
          <div className="school-note">
            <h2 className="info-title">Let’s shape the next step.</h2>
            <p>
              The school partnership enquiry service is not connected in this
              development preview. Programme delivery, facilitator support,
              pricing and scheduling need confirmation with TATI.
            </p>
            <button
              className="button-primary"
              onClick={() => dispatch(setActiveTab("learner"))}
            >
              Preview the learning experience
              <ArrowUpRight size={17} />
            </button>
          </div>
        </section>
        <CurriculumSection />
      </>
    );
  return (
    <>
      <section className="home-container home-section">
        <div className="eyebrow">ONE JOURNEY. YOUR FAMILY’S PACE.</div>
        <div className="section-heading">
          <h1 className="info-title">
            Find their way
            <br />
            to money confidence.
          </h1>
          <p>
            Explore three ways to experience TATI. Pathway details are programme
            concepts in this preview; confirm availability and fees before
            enrolling.
          </p>
        </div>
        <div className="pathway-grid">
          {[
            {
              path: "flex",
              title: "TATI Junior Flex",
              subtitle: "AT THEIR OWN PACE",
              body: "Independent exploration with a parent nearby for encouragement.",
              items: [
                "Self-paced learning activities",
                "Stories and money missions",
                "Parent conversation prompts",
              ],
            },
            {
              path: "virtual",
              title: "TATI Academy Virtual",
              subtitle: "TOGETHER, FROM ANYWHERE",
              body: "A guided online experience with space to learn and discuss.",
              items: [
                "Virtual group learning",
                "Shared choices and discussion",
                "Practical activities at home",
              ],
            },
            {
              path: "in-person",
              title: "In-person learning",
              subtitle: "LEARN SIDE BY SIDE",
              body: "Hands-on exploration in the company of other young learners.",
              items: [
                "Group learning activities",
                "Real-life money scenarios",
                "Shared reflection and practice",
              ],
            },
          ].map((p, i) => (
            <article className={"pathway pathway-" + i} key={p.path}>
              <span className="eyebrow">{p.subtitle}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
              <ul>
                {p.items.map((x) => (
                  <li key={x}>
                    <Check size={16} />
                    {x}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => {
                  dispatch(
                    updateActiveForm({
                      pathway: p.path as "flex" | "virtual" | "in-person",
                    }),
                  );
                  dispatch(setActiveTab("register"));
                }}
              >
                Choose this pathway
                <ArrowUpRight size={17} />
              </button>
            </article>
          ))}
        </div>
      </section>
      <CurriculumSection />
      <FinalCtaSection />
    </>
  );
};
