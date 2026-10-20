import React from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  Gamepad2,
  ChartNoAxesColumnIncreasing,
  ShoppingBasket,
  PiggyBank,
  ShoppingBag,
  ShieldCheck,
  Handshake,
  Sprout,
  GraduationCap,
  Laptop,
  Users,
  PlayCircle,
  Flag,
  ChevronRight,
} from "lucide-react";
import { useAppDispatch } from "../../store";
import { setActiveTab } from "../../store/uiSlice";
import { updateActiveForm } from "../../store/registrationSlice";
import { APPLICATION_FORM_URL, LEARNING_PORTAL_URL } from "../../config/application";
import { FoundingFamilies } from "./FoundingFamilies";
import { GhcChallenge } from "./GhcChallenge";
import { MoneySkillsExplorer } from "./MoneySkillsExplorer";
const asset = (name: string) => "/assets/refinement/" + name + ".webp";
const learningCards = [
  {
    title: "Needs vs Wants",
    text: "Learn to tell the difference and make better choices.",
    image: "needs-wants",
    Icon: ShoppingBasket,
    color: "purple",
  },
  {
    title: "Saving for Goals",
    text: "Set goals, save money, and watch it grow.",
    image: "saving-goals",
    Icon: PiggyBank,
    color: "pink",
  },
  {
    title: "Smart Spending",
    text: "Make thoughtful choices and get good value.",
    image: "smart-spending",
    Icon: ShoppingBag,
    color: "pink",
  },
  {
    title: "Money Safety",
    text: "Learn how to keep money safe and avoid risks.",
    image: "money-safety",
    Icon: ShieldCheck,
    color: "green",
  },
  {
    title: "Borrowing Basics",
    text: "Understand borrowing, repaying, and making wise decisions.",
    image: "borrowing",
    Icon: Handshake,
    color: "amber",
  },
  {
    title: "Growing Good Habits",
    text: "Build habits today for a brighter tomorrow.",
    image: "good-habits",
    Icon: Sprout,
    color: "green",
  },
];
export function HomePage() {
  const dispatch = useAppDispatch();
  const join = () => dispatch(setActiveTab("register"));
  const lesson = () =>
    document.getElementById("try-a-lesson")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  const choose = (pathway: "flex" | "virtual") => {
    dispatch(updateActiveForm({ pathway }));
    join();
  };
  return (
    <div className="ref-home">
      <section className="ref-hero ref-wrap">
        <div className="ref-hero-copy">
          <div className="ref-kicker ref-dot">
            FOR CURIOUS CHILDREN AGED 8–12
          </div>
          <h1>
            Money confidence
            <br />
            starts <em>now.</em>
          </h1>
          <p>
            Your child makes financial decisions every day. TATI transforms
            money from a mysterious concept into an exciting skill. Through
            stories, choices, and real-life adventures, your child learns to
            earn, plan, save, and grow with confidence.
          </p>
          <div className="ref-actions">
            <a
              className="ref-button"
              href={APPLICATION_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Join a Founding Family <ArrowRight size={17} />
            </a>
            <button className="ref-button ref-button-outline" onClick={lesson}>
              <PlayCircle size={21} /> Try a Free Lesson
            </button>
          </div>
          <div className="ref-benefits">
            {[
              ["Learn by doing,", "not lecturing", "green"],
              ["Built for", "African families", "blue"],
              ["Parent-supported", "journey", "amber"],
            ].map(([a, b, c]) => (
              <div key={a}>
                <span className={"ref-check " + c}>
                  <Check size={16} />
                </span>
                <span>
                  {a}
                  <br />
                  {b}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="ref-hero-visual">
          <img
            src={asset("hero")}
            alt="Two African children exploring a savings jar and their financial journey workbook, surrounded by an Earn, Plan, Save and Grow learning path"
            width="1300"
            height="732"
            fetchPriority="high"
          />
        </div>
      </section>
      <section className="ref-how ref-blue-band" id="how-it-works">
        <div className="ref-wrap">
          <div className="ref-heading">
            <div className="ref-kicker">HOW TATI WORKS</div>
            <h2>
              Real skills for real life
              <span className="ref-spark" aria-hidden="true">
                ✧
              </span>
            </h2>
            <p>
              An engaging, age-appropriate journey that builds money confidence
              step by step.
            </p>
          </div>
          <div className="ref-how-grid">
            {[
              {
                Icon: BookOpen,
                title: "Stories that spark curiosity",
                text: "Children explore relatable stories set in African contexts.",
                color: "blue",
              },
              {
                Icon: Gamepad2,
                title: "Choices that build skills",
                text: "They make decisions, see real consequences, and learn by doing.",
                color: "amber",
              },
              {
                Icon: ChartNoAxesColumnIncreasing,
                title: "Progress they can be proud of",
                text: "Your child builds real money habits and tracks their growth over time.",
                color: "green",
              },
            ].map(({ Icon, title, text, color }) => (
              <article className="ref-how-card" key={title}>
                <span className={"ref-icon " + color}>
                  <Icon size={32} />
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="ref-learning ref-wrap" id="what-they-learn">
        <div className="ref-heading">
          <div className="ref-kicker">WHAT CHILDREN WILL LEARN</div>
          <h2>Essential money skills for a brighter tomorrow</h2>
          <p>
            Practical skills for real life, taught through fun stories and
            activities.
          </p>
        </div>
        <div className="ref-learning-grid">
          {learningCards.map(({ title, text, image, Icon, color }) => (
            <article className="ref-learning-card" key={title}>
              <span className={"ref-icon " + color}>
                <Icon size={28} />
              </span>
              <div className="ref-learning-copy">
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
              <img
                src={asset(image)}
                alt=""
                loading="lazy"
                width="130"
                height="130"
              />
            </article>
          ))}
        </div>
        <MoneySkillsExplorer />
      </section>
      <section className="ref-pathways ref-blue-band" id="pathways">
        <div className="ref-wrap">
          <div className="ref-heading">
            <div className="ref-kicker">LEARNING PATHWAYS</div>
            <h2>Three ways to learn, one bright future</h2>
            <p>Flexible options for every family and learning style.</p>
          </div>
          <div className="ref-program-grid">
            <article className="ref-program academy">
              <div className="ref-program-heading">
                <span className="ref-icon blue">
                  <GraduationCap size={34} />
                </span>
                <div>
                  <h3>Academy</h3>
                  <span className="ref-program-tag">Guided learning</span>
                </div>
              </div>
              <p className="ref-program-description">
                Structured, facilitator-led learning with stories and clear
                progression.
              </p>
              <div className="ref-program-content">
                <ul>
                  {[
                    "Interactive lessons and stories",
                    "Choices and real-life challenges",
                    "Progress tracking",
                  ].map((x) => (
                    <li key={x}>
                      <Check size={13} />
                      {x}
                    </li>
                  ))}
                </ul>
                <img
                  className="ref-program-portrait"
                  src={asset("academy")}
                  alt="Smiling learner in a blue school uniform with a playful illustrated crown"
                  loading="lazy"
                  width="155"
                  height="230"
                />
              </div>
              <button onClick={() => choose("virtual")}>
                Explore Academy <ArrowRight size={16} />
              </button>
            </article>
            <article className="ref-program self">
              <div className="ref-program-heading">
                <span className="ref-icon green">
                  <Laptop size={32} />
                </span>
                <div>
                  <h3>Self-Paced</h3>
                  <span className="ref-program-tag">
                    Flexible at-home option
                  </span>
                </div>
              </div>
              <p className="ref-program-description">
                Let your child learn at their own pace, anytime, anywhere.
              </p>
              <div className="ref-program-content">
                <ul>
                  {[
                    "Short, engaging lessons",
                    "Fun activities and games",
                    "A flexible learning journey",
                  ].map((x) => (
                    <li key={x}>
                      <Check size={13} />
                      {x}
                    </li>
                  ))}
                </ul>
                <img
                  className="ref-program-portrait"
                  src={asset("self-paced")}
                  alt="Girl wearing headphones and learning on a tablet"
                  loading="lazy"
                  width="155"
                  height="225"
                />
              </div>
              <button onClick={() => choose("flex")}>
                Explore Self-Paced <ArrowRight size={16} />
              </button>
            </article>
            <article className="ref-program club">
              <div className="ref-program-heading">
                <span className="ref-icon purple">
                  <Users size={32} />
                </span>
                <div>
                  <h3>Club</h3>
                  <span className="ref-program-tag">Community & practice</span>
                </div>
              </div>
              <p className="ref-program-description">
                Peer learning, practical activities and real-world projects.
              </p>
              <div className="ref-program-content">
                <ul>
                  {[
                    "Group activities and discussions",
                    "Shared money challenges",
                    "Build confidence with peers",
                  ].map((x) => (
                    <li key={x}>
                      <Check size={13} />
                      {x}
                    </li>
                  ))}
                </ul>
                <img
                  className="ref-program-group"
                  src={asset("club")}
                  alt="Four children learning and exploring money together"
                  loading="lazy"
                  width="300"
                  height="200"
                />
              </div>
              <button onClick={() => dispatch(setActiveTab("tati-club"))}>
                Explore TATI Club <ArrowRight size={16} />
              </button>
            </article>
          </div>
        </div>
      </section>
      <section className="ref-lesson" id="try-a-lesson">
        <div className="ref-wrap ref-lesson-grid">
          <div className="ref-lesson-copy">
            <div className="ref-kicker ref-dot">TRY A LESSON</div>
            <h2>Try a lesson</h2>
            <h3>The GH₵50 Challenge</h3>
            <p>
              How would you divide GH₵50 between spend, save, and give? There’s
              no single right answer — it’s about making thoughtful choices!
            </p>
            <div className="ref-actions">
              <button
                className="ref-button"
                onClick={() =>
                  document
                    .querySelector<HTMLButtonElement>(
                      ".allocation-controls button:not(:disabled)",
                    )
                    ?.focus()
                }
              >
                Try a free lesson <ArrowRight size={16} />
              </button>
              <button
                className="ref-button ref-button-outline"
                onClick={() => dispatch(setActiveTab("about"))}
              >
                <PlayCircle size={18} />
                See how it works
              </button>
            </div>
          </div>
          <div className="ref-lesson-visual">
            <span className="ref-lesson-coin" aria-hidden="true">
              ₵
            </span>
            <GhcChallenge />
            <img
              className="ref-lesson-books"
              src={asset("lesson-decor")}
              alt=""
              loading="lazy"
              width="130"
              height="325"
            />
            <span className="ref-lesson-note">
              Different choices.
              <br />
              Brighter tomorrows.<span aria-hidden="true">☀</span>
            </span>
          </div>
        </div>
      </section>
      <section className="ref-returning-user ref-wrap">
        <div className="ref-returning-user-content">
          <div className="ref-kicker ref-dot">RETURNING USER</div>
          <h2>Already part of the TATI family?</h2>
          <p>Your next money adventure is waiting!</p>
          <a
            className="ref-button"
            href={LEARNING_PORTAL_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Continue Learning <ArrowRight size={17} />
          </a>
        </div>
      </section>
      <section className="ref-schools ref-wrap">
        <div className="ref-school-copy">
          <div className="ref-kicker ref-dot">FOR SCHOOLS & PARTNERS</div>
          <h2>Bring TATI to your school or organisation</h2>
          <p>
            Help more children build money confidence with an engaging,
            age-appropriate programme.
          </p>
          <button
            className="ref-button"
            onClick={() => dispatch(setActiveTab("for-schools"))}
          >
            Partner with TATI <ArrowRight size={16} />
          </button>
        </div>
        <div className="ref-school-features">
          {[
            {
              Icon: BookOpen,
              title: "Age-appropriate financial literacy",
              text: "Designed for children aged 8–12.",
              color: "green",
            },
            {
              Icon: Users,
              title: "Facilitator-ready resources",
              text: "Stories, activities and discussion prompts.",
              color: "amber",
            },
            {
              Icon: Laptop,
              title: "Flexible delivery formats",
              text: "Explore school and community learning.",
              color: "purple",
            },
          ].map(({ Icon, title, text, color }) => (
            <div key={title}>
              <span className={"ref-icon " + color}>
                <Icon size={24} />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
        <img
          className="ref-school-photo"
          src={asset("school")}
          alt="A teacher and three children smiling together around a tablet"
          loading="lazy"
          width="360"
          height="240"
        />
      </section>
      <FoundingFamilies />
    </div>
  );
}
