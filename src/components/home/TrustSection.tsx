import React from "react";
import { Sprout, ShieldCheck, BookOpen } from "lucide-react";
export const TrustSection = () => (
  <section className="home-container home-section">
    <div className="eyebrow">OUR APPROACH</div>
    <div className="section-heading">
      <h2
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(32px,4vw,48px)",
          fontWeight: 700,
          lineHeight: 1.15,
        }}
      >
        Confidence grows
        <br />
        through everyday choices.
      </h2>
      <p>
        TATI introduces money skills through stories, exploration and practical
        conversations. The aim is to make learning relatable, thoughtful and
        encouraging.
      </p>
    </div>
    <div className="steps-grid">
      {[
        {
          Icon: BookOpen,
          title: "Make it understandable",
          body: "Use familiar situations, simple language and room for questions.",
        },
        {
          Icon: Sprout,
          title: "Make space to practise",
          body: "Explore decisions in playful scenarios before connecting them to daily life.",
        },
        {
          Icon: ShieldCheck,
          title: "Keep families involved",
          body: "Help parents support learning with shared goals and conversations.",
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
  </section>
);
