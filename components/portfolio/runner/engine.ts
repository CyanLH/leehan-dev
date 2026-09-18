// Logical pixels match the arena width. No DOM or React work lives in the simulation.
export const PLAYER_X = 42;
export const PLAYER_WIDTH = 26;
export const GRAVITY = 1300;
export const JUMP_VELOCITY = 500;
export const POOL_SIZE = 8;
export const GROUND_SEGMENT = 96;
export const FIXED_STEP = 1 / 120;

export interface Obstacle {
  slot: number;
  x: number;
  width: number;
  height: number;
  label: string;
}
export interface RunnerState {
  width: number;
  elapsed: number;
  distance: number;
  y: number;
  velocity: number;
  spawnDistance: number;
  obstacles: Obstacle[];
  killedBy: string | null;
}

export function createRunner(width: number): RunnerState {
  return {
    width,
    elapsed: 0,
    distance: 0,
    y: 0,
    velocity: 0,
    spawnDistance: 160,
    obstacles: [],
    killedBy: null,
  };
}
export function speedAt(elapsed: number) {
  return Math.min(300, 160 + elapsed * 4);
}
export function scoreOf(state: RunnerState) {
  return Math.floor(state.distance / 4);
}
export function jump(state: RunnerState) {
  if (state.killedBy || state.y > 0) return false;
  state.velocity = JUMP_VELOCITY;
  return true;
}
export function stepRunner(
  state: RunnerState,
  dt: number,
  random = Math.random,
) {
  if (state.killedBy) return;
  state.elapsed += dt;
  const speed = speedAt(state.elapsed);
  const movement = speed * dt;
  state.distance += movement;
  state.velocity -= GRAVITY * dt;
  state.y = Math.max(0, state.y + state.velocity * dt);
  if (state.y === 0) state.velocity = 0;

  for (const obstacle of state.obstacles) {
    obstacle.x -= movement;
    // Small insets make edge contacts forgiving; fixed timesteps avoid tunnelling.
    if (
      PLAYER_X + PLAYER_WIDTH - 3 > obstacle.x + 3 &&
      PLAYER_X + 3 < obstacle.x + obstacle.width - 3 &&
      state.y + 3 < obstacle.height
    ) {
      state.killedBy = obstacle.label;
      return;
    }
  }
  state.obstacles = state.obstacles.filter(
    (obstacle) => obstacle.x + obstacle.width > -20,
  );
  state.spawnDistance -= movement;
  if (state.spawnDistance > 0) return;

  const labels =
    state.elapsed > 18 && random() < 0.2
      ? ["MERGE", "HYDRATION"]
      : ["500", "404", "CORS", "CVE", "OOM", "ANY", "BUG"];
  const label = labels[Math.floor(random() * labels.length)];
  const slot = Array.from({ length: POOL_SIZE }, (_, index) => index).find(
    (index) => !state.obstacles.some((obstacle) => obstacle.slot === index),
  );
  if (slot === undefined) return;
  const width = Math.max(30, label.length * 8);
  const height = label.length > 4 ? 48 : 38;
  state.obstacles.push({ slot, x: state.width + 24, width, height, label });
  // Minimum gap exceeds a full jump (~0.77s) plus recovery and input reaction time.
  const gapSeconds =
    Math.max(1.25, 1.95 - state.elapsed * 0.014) + random() * 0.45;
  state.spawnDistance = width + speed * gapSeconds;
}
