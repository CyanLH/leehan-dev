"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import {
  createRunner,
  FIXED_STEP,
  GROUND_SEGMENT,
  jump,
  PLAYER_X,
  POOL_SIZE,
  scoreOf,
  stepRunner,
  type RunnerState,
} from "./engine";

type Mode = "booting" | "playing" | "gameover";
interface Props {
  best: number;
  onBest: (score: number) => void;
  onReturn: () => void;
}
const formatScore = (score: number) => String(score).padStart(5, "0");

export default function RunnerGame({ best, onBest, onReturn }: Props) {
  const [mode, setMode] = useState<Mode>("booting");
  const [result, setResult] = useState({ score: 0, killedBy: "" });
  const [run, setRun] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const arenaRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLSpanElement>(null);
  const scoreRef = useRef<HTMLSpanElement>(null);
  const bestRef = useRef<HTMLSpanElement>(null);
  const groundRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<RunnerState | null>(null);
  const frameRef = useRef(0);
  const pausedRef = useRef(false);

  const stop = useCallback(() => {
    cancelAnimationFrame(frameRef.current);
    frameRef.current = 0;
  }, []);

  const returnToCode = useCallback(() => {
    stop();
    if (stateRef.current) onBest(scoreOf(stateRef.current));
    onReturn();
  }, [onBest, onReturn, stop]);

  function retry() {
    stop();
    setRun((value) => value + 1);
    setMode("booting");
    rootRef.current?.focus({ preventScroll: true });
  }

  function handleKey(event: KeyboardEvent<HTMLDivElement>) {
    const target = event.target as HTMLElement;
    if (target.isContentEditable || target.closest("input, textarea, select"))
      return;
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      returnToCode();
      return;
    }
    if (mode === "gameover" && event.key.toLowerCase() === "r") {
      event.preventDefault();
      if (!event.repeat) retry();
      return;
    }
    // Preserve Space/Enter activation for the actual Retry/Return buttons.
    if (target.closest("button, a")) return;
    if ([" ", "ArrowUp", "w", "W"].includes(event.key)) {
      event.preventDefault();
      event.stopPropagation();
      if (!event.repeat && mode === "playing" && stateRef.current)
        jump(stateRef.current);
    }
  }

  useEffect(() => {
    rootRef.current?.focus({ preventScroll: true });
    const timer = window.setTimeout(() => setMode("playing"), 400);
    return () => window.clearTimeout(timer);
  }, [run]);

  useEffect(() => {
    if (mode !== "playing") return;
    const arena = arenaRef.current;
    const player = playerRef.current;
    const ground = groundRef.current;
    if (!arena || !player || !ground) return;
    const obstacleNodes = Array.from(
      arena.querySelectorAll<HTMLElement>("[data-obstacle]"),
    );
    const groundNodes = Array.from(
      ground.querySelectorAll<HTMLElement>("[data-line]"),
    );
    const state = createRunner(arena.clientWidth);
    stateRef.current = state;
    let previousTime = 0;
    let accumulator = 0;
    let lastScore = -1;
    let lastLine = -1;
    let active = true;
    pausedRef.current = false;

    const draw = () => {
      player.style.transform = `translate3d(${PLAYER_X}px, ${-state.y}px, 0)`;
      for (const node of obstacleNodes) node.style.visibility = "hidden";
      for (const obstacle of state.obstacles) {
        const node = obstacleNodes[obstacle.slot];
        node.style.visibility = "visible";
        node.style.transform = `translate3d(${obstacle.x}px, 0, 0)`;
        node.style.width = `${obstacle.width}px`;
        node.style.height = `${obstacle.height}px`;
        const label = node.firstElementChild as HTMLElement;
        if (label.textContent !== obstacle.label)
          label.textContent = obstacle.label;
      }
      ground.style.transform = `translate3d(${-state.distance % GROUND_SEGMENT}px, 0, 0)`;
      const line = Math.floor(state.distance / GROUND_SEGMENT);
      if (line !== lastLine) {
        groundNodes.forEach((node, index) => {
          node.textContent = String(24 + line + index).padStart(3, "0");
        });
        lastLine = line;
      }
      const score = scoreOf(state);
      if (score !== lastScore) {
        if (scoreRef.current) scoreRef.current.textContent = formatScore(score);
        if (bestRef.current)
          bestRef.current.textContent = formatScore(Math.max(best, score));
        lastScore = score;
      }
    };
    const tick = (time: number) => {
      if (!active || pausedRef.current) return;
      const delta = previousTime
        ? Math.min((time - previousTime) / 1000, 0.05)
        : 0;
      previousTime = time;
      accumulator += delta;
      while (accumulator >= FIXED_STEP && !state.killedBy) {
        stepRunner(state, FIXED_STEP);
        accumulator -= FIXED_STEP;
      }
      draw();
      if (state.killedBy) {
        active = false;
        frameRef.current = 0;
        const score = scoreOf(state);
        onBest(score);
        setResult({ score, killedBy: state.killedBy });
        setMode("gameover");
        return;
      }
      frameRef.current = requestAnimationFrame(tick);
    };
    const pause = () => {
      pausedRef.current = true;
      stop();
    };
    const resume = () => {
      if (
        !active ||
        document.hidden ||
        !rootRef.current?.contains(document.activeElement)
      )
        return;
      pausedRef.current = false;
      previousTime = 0;
      if (!frameRef.current) frameRef.current = requestAnimationFrame(tick);
    };
    const visibility = () => {
      if (document.hidden) pause();
      else resume();
    };
    const focusOut = (event: FocusEvent) => {
      if (!rootRef.current?.contains(event.relatedTarget as Node | null))
        pause();
    };
    const root = rootRef.current;
    const resize = new ResizeObserver(([entry]) => {
      state.width = entry.contentRect.width;
    });
    resize.observe(arena);
    document.addEventListener("visibilitychange", visibility);
    window.addEventListener("blur", pause);
    window.addEventListener("focus", resume);
    root?.addEventListener("focusout", focusOut);
    root?.addEventListener("focusin", resume);
    draw();
    resume();
    return () => {
      active = false;
      stop();
      resize.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      window.removeEventListener("blur", pause);
      window.removeEventListener("focus", resume);
      root?.removeEventListener("focusout", focusOut);
      root?.removeEventListener("focusin", resume);
    };
  }, [mode, run, best, onBest, stop]);

  return (
    <div
      ref={rootRef}
      data-runner-mode={mode}
      tabIndex={0}
      role="region"
      aria-label="코드 러너 게임. Space, 위쪽 화살표, W 또는 탭으로 점프. Escape로 코드 복귀."
      onKeyDown={handleKey}
      onClick={(event) => {
        if ((event.target as HTMLElement).closest("button, a")) return;
        rootRef.current?.focus({ preventScroll: true });
        if (mode === "playing" && stateRef.current) jump(stateRef.current);
      }}
      className="relative flex h-full min-w-0 flex-col overflow-hidden font-mono text-foreground outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent/50"
    >
      <div className="flex items-start justify-between gap-3 px-5 pt-5 text-[11px] text-muted">
        <span>RUNNING leehan.ts</span>
        <div className="text-right tabular-nums" aria-hidden="true">
          <div>
            SCORE <span ref={scoreRef}>00000</span>
          </div>
          <div className="mt-1">
            BEST&nbsp; <span ref={bestRef}>{formatScore(best)}</span>
          </div>
        </div>
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        {mode === "booting"
          ? "게임 준비 중"
          : mode === "playing"
            ? "게임 시작. Space 또는 탭으로 점프하세요."
            : `게임 종료. 점수 ${result.score}. 충돌한 장애물 ${result.killedBy}. R로 다시 시작하거나 Escape로 돌아가세요.`}
      </p>
      <div
        ref={arenaRef}
        data-runner-arena
        className="relative min-h-0 flex-1 cursor-pointer overflow-hidden touch-manipulation select-none"
        aria-hidden="true"
      >
        <span
          ref={playerRef}
          data-player
          className="absolute bottom-[92px] left-0 text-[24px] leading-6 font-bold text-accent will-change-transform"
        >
          &gt;_
        </span>
        {Array.from({ length: POOL_SIZE }, (_, slot) => (
          <div
            key={slot}
            data-obstacle
            className="invisible absolute bottom-[92px] left-0 flex flex-col items-center justify-end text-foreground will-change-transform"
          >
            <span className="block text-[12px] leading-4" />
            <span className="block w-full flex-1 overflow-hidden bg-foreground/90 text-center text-[20px] leading-[22px] tracking-[-2px]">
              ██
            </span>
          </div>
        ))}
        <div
          ref={groundRef}
          className="absolute bottom-[67px] left-0 flex w-max text-[11px] leading-5 text-muted/60 will-change-transform"
        >
          {Array.from({ length: 12 }, (_, index) => (
            <span key={index} className="flex w-24 shrink-0 items-center gap-3">
              <span data-line>{String(24 + index).padStart(3, "0")}</span>
              <span className="text-line">───</span>
            </span>
          ))}
        </div>
        <p className="absolute right-5 bottom-4 left-5 text-center text-[11px] leading-5 text-muted">
          SPACE / ↑ / W / TAP <span className="text-line">·</span> JUMP
        </p>
      </div>
      <div className="flex items-center justify-between border-t border-line/50 px-5 py-3 text-[10px] text-muted">
        <span>keep shipping.</span>
        <button
          onClick={returnToCode}
          className="rounded px-1 py-0.5 hover:text-accent"
          aria-label="Return to Code"
        >
          ESC · return to code
        </button>
      </div>
      {mode === "booting" && (
        <div
          className="absolute inset-0 bg-background p-6 text-[13px] leading-7"
          aria-hidden="true"
        >
          <p>&gt; npm run play</p>
          <p className="mt-3 text-accent">READY_</p>
        </div>
      )}
      {mode === "gameover" && (
        <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 rounded-xl border border-line bg-background/95 p-5 shadow-sm">
          <p className="text-[13px] font-semibold">PROCESS EXITED (1)</p>
          <p className="mt-4 text-xs leading-6 text-muted">
            score: <span className="text-foreground">{result.score}</span>
            <br />
            killed by:{" "}
            <span className="text-foreground">{result.killedBy}</span>
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-xs">
            <button
              className="rounded-md border border-line! px-3 py-2 text-accent! hover:bg-accent/5"
              onClick={retry}
            >
              [R] Retry
            </button>
            <button
              className="rounded-md px-3 py-2 text-muted hover:text-accent"
              onClick={returnToCode}
            >
              [ESC] Return to Code
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
