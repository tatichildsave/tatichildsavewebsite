import React, { useState } from "react";
const skills = ["Earn", "Plan", "Save", "Spend", "Grow", "Protect"];
const examples = [
  [
    "Value starts with effort.",
    "Explore how people earn money by solving problems, helping others and sharing their skills.",
  ],
  [
    "A little plan. A big difference.",
    "Give every cedi a purpose. Practise making room for needs, goals and a little fun.",
  ],
  [
    "Small steps. Something to look forward to.",
    "Choose a goal, break it into smaller steps and discover the satisfaction of saving towards it.",
  ],
  [
    "Pause before the purchase.",
    "Explore needs and wants, compare choices and decide what is worth spending on.",
  ],
  [
    "Give good ideas room to grow.",
    "Discover how patience, learning and looking after resources can create new possibilities.",
  ],
  [
    "Keep what matters safe.",
    "Practise protecting personal information, spotting risky requests and asking a trusted adult for help.",
  ],
];
export function MoneySkillsExplorer() {
  const [skill, setSkill] = useState(2);
  const [choice, setChoice] = useState<number | null>(null);
  return (
    <details className="ref-extra-learning">
      <summary>
        Explore a money skill and try a real-life choice <span>+</span>
      </summary>
      <div className="ref-extra-grid">
        <div>
          <div className="skill-tabs" aria-label="Money skills">
            {skills.map((name, i) => (
              <button
                key={name}
                aria-pressed={skill === i}
                onClick={() => setSkill(i)}
              >
                {name}
              </button>
            ))}
          </div>
          <div aria-live="polite">
            <h3>{examples[skill][0]}</h3>
            <p>{examples[skill][1]}</p>
          </div>
        </div>
        <div>
          <h3>You’ve been given GH₵50. What would you do first?</h3>
          <button
            className="ref-choice"
            aria-pressed={choice === 0}
            onClick={() => setChoice(0)}
          >
            Make a plan for saving and spending
          </button>
          <button
            className="ref-choice"
            aria-pressed={choice === 1}
            onClick={() => setChoice(1)}
          >
            Spend it all on a treat today
          </button>
          <p aria-live="polite">
            {choice === null
              ? "Every choice is a chance to learn."
              : choice === 0
                ? "A thoughtful start! Set a little aside for your goal, then decide what you can enjoy today."
                : "A treat can be fun. How would spending it all affect your savings goal? Try making room for both."}
          </p>
        </div>
      </div>
    </details>
  );
}
