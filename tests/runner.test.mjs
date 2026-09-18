import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { runInNewContext } from "node:vm";
import ts from "typescript";

// Use the project's TypeScript compiler; no test runtime dependency is needed.
const compiled = ts.transpileModule(
  readFileSync(
    new URL("../components/portfolio/runner/engine.ts", import.meta.url),
    "utf8",
  ),
  {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2017,
    },
  },
);
const context = { exports: {} };
runInNewContext(compiled.outputText, context);
const {
  createRunner,
  jump,
  stepRunner,
  scoreOf,
  speedAt,
  FIXED_STEP,
  PLAYER_X,
  PLAYER_WIDTH,
  JUMP_VELOCITY,
  GRAVITY,
} = context.exports;
const advance = (state, seconds, random = () => 0.5) => {
  for (let time = 0; time < seconds; time += FIXED_STEP)
    stepRunner(state, FIXED_STEP, random);
};

test("jump rises, prevents airborne jumps, and lands", () => {
  const state = createRunner(600);
  assert.equal(jump(state), true);
  advance(state, 0.1);
  assert.ok(state.y > 0);
  assert.equal(jump(state), false);
  advance(state, 0.8);
  assert.equal(state.y, 0);
  assert.equal(jump(state), true);
});

test("collision identifies the obstacle and freezes simulation", () => {
  const state = createRunner(335);
  state.obstacles.push({
    slot: 0,
    x: PLAYER_X + 8,
    width: 32,
    height: 38,
    label: "CORS",
  });
  stepRunner(state, FIXED_STEP);
  assert.equal(state.killedBy, "CORS");
  const distance = state.distance;
  advance(state, 1);
  assert.equal(state.distance, distance);
  assert.equal(jump(state), false);
});

test("jump clears an overlapping obstacle above its hitbox", () => {
  const state = createRunner(335);
  state.y = 80;
  state.obstacles.push({
    slot: 0,
    x: PLAYER_X + 8,
    width: 32,
    height: 38,
    label: "500",
  });
  stepRunner(state, FIXED_STEP);
  assert.equal(state.killedBy, null);
});

test("score increases and speed has a smooth upper bound", () => {
  const state = createRunner(700);
  advance(state, 2);
  assert.ok(scoreOf(state) > 0);
  assert.ok(speedAt(25) > speedAt(0));
  assert.equal(speedAt(1000), 300);
  assert.equal(scoreOf(createRunner(335)), 0);
});

test("narrow and wide arenas remain playable for 90 seconds with fair jump timing", () => {
  for (const width of [280, 335, 700]) {
    let seed = 42;
    const random = () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 2 ** 32;
    const state = createRunner(width);
    let cleared = 0;
    for (let t = 0; t < 90; t += FIXED_STEP) {
      const obstacle = state.obstacles.find(
        (o) => o.x + o.width > PLAYER_X + 3,
      );
      if (obstacle && state.y === 0) {
        const speed = speedAt(state.elapsed);
        const crossingDuration = (obstacle.width + PLAYER_WIDTH - 12) / speed;
        const ascentToHeight =
          (JUMP_VELOCITY -
            Math.sqrt(JUMP_VELOCITY ** 2 - 2 * GRAVITY * obstacle.height)) /
          GRAVITY;
        const flight = (2 * JUMP_VELOCITY) / GRAVITY;
        assert.ok(
          crossingDuration < flight - 2 * ascentToHeight,
          "obstacle is jumpable",
        );
        const jumpLead = (flight - crossingDuration) / 2;
        const timeToContact =
          (obstacle.x + 3 - (PLAYER_X + PLAYER_WIDTH - 3)) / speed;
        if (timeToContact <= jumpLead) {
          jump(state);
          cleared++;
        }
      }
      stepRunner(state, FIXED_STEP, random);
      assert.equal(
        state.killedBy,
        null,
        `unfair collision at ${t.toFixed(2)}s / ${width}px`,
      );
      assert.ok(state.obstacles.length <= 8);
    }
    assert.ok(cleared > 25);
  }
});
