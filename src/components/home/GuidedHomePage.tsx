import React from "react";
import { ArrowRight, PlayCircle, Check, Sparkles } from "lucide-react";
import { APPLICATION_FORM_URL } from "../../config/application";
export const adventurePreview = [
  {
    title: "Meet Money",
    image: "needs-wants",
    number: "01",
    description: "Discover money and the different ways we pay.",
  },
  {
    title: "Earn It",
    image: "smart-spending",
    number: "02",
    description: "Explore how helping and solving problems can create value.",
  },
  {
    title: "Spend Smart",
    image: "smart-spending",
    number: "04",
    description: "Practise pausing, thinking and choosing before spending.",
  },
];
export function GuidedHomePage() {
  return (
    <div className="ref-home guided-home">
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
            Big life skills begin with little everyday choices. Through stories,
            play and real-life adventures, TATI helps your child build a
            confident relationship with money.
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
            <a className="ref-button ref-button-outline" href="#try-a-lesson">
              <PlayCircle size={20} /> Try a free lesson
            </a>
          </div>
          <div className="ref-benefits">
            {[
              "Learn by doing",
              "Rooted in African life",
              "Parent-supported",
            ].map((x, i) => (
              <div key={x}>
                <span className={"ref-check " + ["green", "blue", "amber"][i]}>
                  <Check size={15} />
                </span>
                <span>{x}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="ref-hero-visual">
          <img
            src="/assets/refinement/hero.webp"
            alt="Two children exploring their savings jar and TATI money journey workbook"
            width="1300"
            height="732"
            fetchPriority="high"
          />
        </div>
      </section>
      <section className="guided-why" id="how-it-works">
        <div className="ref-wrap guided-why-inner">
          <div>
            <span className="ref-kicker">
              LITTLE CHOICES. LIFELONG CONFIDENCE.
            </span>
            <h2>
              Money is already part of their world.
              <br />
              <em>Let’s help them understand it.</em>
            </h2>
          </div>
          <div>
            <p>
              A treat today or a goal for tomorrow? Everyday moments are
              opportunities to practise. TATI makes room for questions,
              thoughtful decisions and habits that grow with your child.
            </p>
            <a className="guided-text-link" href="#about">
              Discover our approach <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>
      <section className="guided-choose ref-wrap">
        <div className="guided-section-top">
          <div>
            <span className="ref-kicker">YOUR JOURNEY STARTS HERE</span>
            <h2>
              A little curiosity.
              <br />A world of possibilities.
            </h2>
          </div>
          <p>Find the next step that feels right for you.</p>
        </div>
        <div className="guided-choice-grid">
          {[
            {
              title: "For my child",
              tag: "FOR PARENTS",
              text: "Help your child build money confidence, one everyday adventure at a time.",
              image: "self-paced",
              route: "for-parents",
              action: "Explore as a parent",
              color: "mint",
            },
            {
              title: "For my school",
              tag: "SCHOOLS & PARTNERS",
              text: "Bring meaningful money conversations into your learning community.",
              image: "school",
              route: "for-schools",
              action: "Explore for schools",
              color: "sky",
            },
            {
              title: "What will they learn?",
              tag: "THE TATI CURRICULUM",
              text: "Discover a journey of stories, practical choices and money adventures.",
              image: "academy",
              route: "curriculum",
              action: "Explore the adventures",
              color: "lilac",
            },
          ].map((c) => (
            <a
              className={"guided-choice " + c.color}
              href={"#" + c.route}
              key={c.route}
            >
              <span className="ref-kicker">{c.tag}</span>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
              <div className="guided-choice-image">
                <img
                  src={"/assets/refinement/" + c.image + ".webp"}
                  alt=""
                  loading="lazy"
                />
              </div>
              <span className="guided-card-action">
                {c.action}
                <span>
                  <ArrowRight size={19} />
                </span>
              </span>
            </a>
          ))}
        </div>
      </section>
      <section className="guided-adventures" id="what-they-learn">
        <div className="ref-wrap">
          <div className="guided-section-top">
            <div>
              <span className="ref-kicker">
                12 ADVENTURES. SO MUCH TO DISCOVER.
              </span>
              <h2>
                Small adventures.
                <br />
                Skills for a bigger world.
              </h2>
            </div>
            <a className="guided-text-link" href="#curriculum">
              Explore all 12 adventures <ArrowRight size={17} />
            </a>
          </div>
          <div className="guided-adventure-grid">
            {adventurePreview.map((a) => (
              <a
                className="guided-adventure"
                href={"#curriculum/" + a.number}
                key={a.number}
              >
                <div className="guided-adventure-art">
                  <span>ADVENTURE {a.number}</span>
                  <img
                    src={"/assets/refinement/" + a.image + ".webp"}
                    alt=""
                    loading="lazy"
                  />
                </div>
                <div className="guided-adventure-copy">
                  <h3>
                    {a.title}
                    <ArrowRight size={18} />
                  </h3>
                  <p>{a.description}</p>
                </div>
              </a>
            ))}
          </div>
          <p className="guided-curriculum-note">
            <Sparkles size={16} /> Stories to explore. Choices to make.
            Confidence to grow.
          </p>
        </div>
      </section>
      <section className="guided-founding" id="founding-families">
        <div className="ref-wrap guided-founding-inner">
          <div className="guided-family-photo">
            <img
              src="/assets/refinement/family.webp"
              alt="A mother and daughter sharing a joyful hug"
              loading="lazy"
              width="350"
              height="284"
            />
            <span aria-hidden="true">✳</span>
          </div>
          <div>
            <span className="ref-kicker">
              A SMALL COHORT. A BRIGHT BEGINNING.
            </span>
            <h2>
              Be part of their
              <br />
              <em>brighter tomorrow.</em>
            </h2>
            <p>
              Join our founding families and help shape the future of TATI
              ChildSave. Little lessons today. Lifelong confidence tomorrow.
            </p>
            <div className="guided-benefit-labels">
              <span>Early access</span>
              <span>Founding community</span>
              <span>Founder pricing</span>
            </div>
            <div className="ref-actions">
              <a
                className="ref-button"
                href={APPLICATION_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Join a Founding Family <ArrowRight size={17} />
              </a>
              <a className="guided-text-link" href="#for-parents">
                Benefits & who can join <ArrowRight size={15} />
              </a>
            </div>
            <small>
              50 places in the founding cohort · Applications reviewed on a
              rolling basis.
            </small>
          </div>
        </div>
      </section>
    </div>
  );
}
