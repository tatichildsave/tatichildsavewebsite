import test from "node:test";
import assert from "node:assert/strict";
import {
  STARTING_ALLOCATION,
  adjustAllocation,
} from "../src/components/home/allocation.ts";

test("the example plan uses exactly GH₵50", () => {
  assert.equal(
    Object.values(STARTING_ALLOCATION).reduce((a, b) => a + b, 0),
    50,
  );
});
test("money released from one purpose can be assigned to another without mutating the initial plan", () => {
  const released = adjustAllocation(STARTING_ALLOCATION, "spend", -5);
  assert.deepEqual(adjustAllocation(released, "save", 5), {
    spend: 15,
    save: 25,
    give: 10,
  });
  assert.deepEqual(STARTING_ALLOCATION, { spend: 20, save: 20, give: 10 });
});
test("every reachable plan stays non-negative and within the available GH₵50", () => {
  const queue = [{ spend: 0, save: 0, give: 0 }];
  const seen = new Set();
  for (let i = 0; i < queue.length; i++) {
    const state = queue[i];
    const id = JSON.stringify(state);
    if (seen.has(id)) continue;
    seen.add(id);
    for (const key of ["spend", "save", "give"])
      for (const delta of [-5, 5]) {
        const next = adjustAllocation(state, key, delta);
        assert.ok(Object.values(next).every((value) => value >= 0));
        assert.ok(Object.values(next).reduce((a, b) => a + b, 0) <= 50);
        if (!seen.has(JSON.stringify(next))) queue.push(next);
      }
  }
  assert.ok(seen.size > 200);
});
test("attempts to overspend or subtract below zero leave the plan unchanged", () => {
  assert.equal(
    adjustAllocation(STARTING_ALLOCATION, "give", 5),
    STARTING_ALLOCATION,
  );
  const empty = { spend: 0, save: 0, give: 0 };
  assert.equal(adjustAllocation(empty, "save", -5), empty);
});
