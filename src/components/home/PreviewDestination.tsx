import React from "react";
import { FoundingFamilies } from "./FoundingFamilies";
import { GhcChallenge } from "./GhcChallenge";
import { MoneySkillsExplorer } from "./MoneySkillsExplorer";
import { adventurePreview } from "./GuidedHomePage";
// Only homepage/navigation are in visual review. Existing features remain usable.
export function PreviewDestination({
  page,
}: {
  page: "for-parents" | "curriculum" | "try-a-lesson";
}) {
  if (page === "for-parents")
    return (
      <div className="ref-home">
        <div className="ref-wrap guided-destination">
          <span className="ref-kicker">FOR PARENTS</span>
          <h1>
            Little lessons.
            <br />
            Lifelong confidence.
          </h1>
          <p>
            For curious children aged 8–12, with parents alongside their
            learning journey.
          </p>
          <div className="ref-actions">
            <a href="#curriculum" className="ref-button">
              Explore their learning
            </a>
            <a href="#junior" className="guided-text-link">
              Compare learning pathways →
            </a>
          </div>
        </div>
        <FoundingFamilies />
      </div>
    );
  if (page === "try-a-lesson")
    return (
      <div className="ref-home">
        <section className="ref-wrap guided-destination">
          <span className="ref-kicker">TRY A LESSON</span>
          <h1>The GH₵50 Challenge</h1>
          <p>
            How would you divide GH₵50 between spend, save and give? Move GH₵5
            at a time, then reflect on your choices.
          </p>
          <div className="guided-challenge">
            <GhcChallenge />
          </div>
          <div className="ref-actions">
            <a className="ref-button" href="#curriculum">
              Explore the learning journey
            </a>
            <a className="guided-text-link" href="#learner">
              Open the existing learner preview →
            </a>
          </div>
        </section>
      </div>
    );
  const selected = adventurePreview.find((a) =>
    window.location.hash.endsWith("/" + a.number),
  );
  return (
    <div className="ref-home">
      <section className="ref-wrap guided-destination">
        <span className="ref-kicker">OUR CURRICULUM · HOMEPAGE PREVIEW</span>
        <h1>
          A world of money
          <br />
          to discover.
        </h1>
        <p>
          The complete 12-adventure experience follows the homepage visual
          review. These three previews have been checked against the revised
          Junior Workbook.
        </p>
        <div className="guided-adventure-grid">
          {(selected ? [selected] : adventurePreview).map((a) => (
            <article
              className="guided-adventure guided-adventure-copy"
              key={a.number}
            >
              <span className="ref-kicker">ADVENTURE {a.number}</span>
              <h2>{a.title}</h2>
              <p>{a.description}</p>
            </article>
          ))}
        </div>
        {selected && (
          <a className="guided-text-link" href="#curriculum">
            ← Back to adventure previews
          </a>
        )}
        <MoneySkillsExplorer />
        <div className="ref-actions">
          <a href="#junior" className="ref-button">
            Explore learning pathways
          </a>
          <a href="#try-a-lesson" className="guided-text-link">
            Try the GH₵50 Challenge →
          </a>
        </div>
      </section>
    </div>
  );
}
