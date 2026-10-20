import React, { useState } from "react";
import {
  ArrowRight,
  Check,
  Heart,
  Minus,
  Plus,
  RotateCcw,
  ShoppingCart,
  PiggyBank,
} from "lucide-react";

import {
  STARTING_ALLOCATION,
  adjustAllocation,
  type Allocation,
} from "./allocation";

export function GhcChallenge() {
  const [values, setValues] = useState<Allocation>(STARTING_ALLOCATION);
  const [reviewed, setReviewed] = useState(false);
  const total = values.spend + values.save + values.give;
  const choices = [
    { key: "spend" as const, name: "Spend", Icon: ShoppingCart },
    { key: "save" as const, name: "Save", Icon: PiggyBank },
    { key: "give" as const, name: "Give", Icon: Heart },
  ];
  const adjust = (key: keyof Allocation, delta: number) => {
    setValues((current) => adjustAllocation(current, key, delta));
    setReviewed(false);
  };
  return (
    <div
      className="challenge-tablet"
      aria-label="Interactive GH₵50 money challenge"
    >
      <div className="tablet-camera" />
      <div className="tablet-screen">
        <div className="challenge-title">
          <img src="/assets/tati-logo.png" alt="Tati" width="34" height="34" />
          <h3>The GH₵50 Challenge</h3>
          <button
            className="challenge-reset"
            aria-label="Reset money challenge"
            onClick={() => {
              setValues(STARTING_ALLOCATION);
              setReviewed(false);
            }}
          >
            <RotateCcw size={16} />
          </button>
        </div>
        <p>You have GH₵50. How would you divide it?</p>
        <div className="allocation-grid">
          {choices.map(({ key, name, Icon }) => (
            <div className={"allocation allocation-" + key} key={key}>
              <Icon size={25} aria-hidden="true" />
              <strong>{name}</strong>
              <output aria-label={name + " amount"}>GH₵{values[key]}</output>
              <div className="allocation-controls">
                <button
                  aria-label={"Decrease " + name.toLowerCase()}
                  disabled={values[key] === 0}
                  onClick={() => adjust(key, -5)}
                >
                  <Minus size={13} />
                </button>
                <span>GH₵5</span>
                <button
                  aria-label={"Increase " + name.toLowerCase()}
                  disabled={total >= 50}
                  onClick={() => adjust(key, 5)}
                >
                  <Plus size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="allocation-progress" aria-hidden="true">
          {choices.map(({ key }) => (
            <span
              key={key}
              className={"progress-" + key}
              style={{ width: values[key] * 2 + "%" }}
            />
          ))}
        </div>
        <div className="allocation-bottom">
          <output aria-live="polite">
            Total: <strong>GH₵{total}</strong>
            {total < 50 && <small>GH₵{50 - total} left to plan</small>}
          </output>
          <button
            className="ref-button"
            disabled={total !== 50}
            onClick={() => setReviewed(true)}
          >
            Next <ArrowRight size={15} />
          </button>
        </div>
        <div className="allocation-reflection" role="status">
          {reviewed ? (
            <>
              <Check size={16} />
              <span>
                Your plan adds up! You chose GH₵{values.spend} for today, GH₵
                {values.save} for a goal and GH₵{values.give} to share. What
                would you change, and why?
              </span>
            </>
          ) : (
            <span>
              Move GH₵5 at a time. Plan all GH₵50 to reflect on your choices.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
