"use client";

import dynamic from "next/dynamic";
import { useCallback, useRef, useState } from "react";
import { tokenizeTypeScript } from "@/components/reactBits/codeTokens";
import TextType from "@/components/reactBits/TextType";

const code = `const leehan = {
  role: "Frontend Engineer",
  experience: "6+ years",
  basedIn: "Seoul, Korea",

  core: [
    "Next.js",
    "React",
    "TypeScript",
  ],

  focus: [
    "Product",
    "Performance",
    "Architecture",
    "Operation",
  ],

  philosophy: "Build fast. Scale well. Operate longer.",
};`;

const RunnerGame = dynamic(() => import("./runner/RunnerGame"), {
  ssr: false,
  loading: () => (
    <div className="h-full bg-background p-6 font-mono text-[13px] leading-7">
      <p>&gt; npm run play</p>
      <p className="mt-3 text-accent">READY_</p>
    </div>
  ),
});
const highlightedCode = tokenizeTypeScript(code);

export function HeroCodeEditor() {
  const lineCount = code.split("\n").length;
  const [active, setActive] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [best, setBest] = useState(0);
  const editorRef = useRef<HTMLElement>(null);
  const saveBest = useCallback(
    (score: number) => setBest((value) => Math.max(value, score)),
    [],
  );
  const returnToCode = useCallback(() => {
    setActive(false);
    editorRef.current?.focus({ preventScroll: true });
  }, []);
  function startGame() {
    if (active) return;
    setHasPlayed(true);
    setActive(true);
  }

  return (
    <figure
      ref={editorRef}
      data-code-runner={active ? "game" : "code"}
      role={active ? "group" : "button"}
      tabIndex={active ? -1 : 0}
      onClick={() => {
        if (!active) startGame();
      }}
      onKeyDown={(event) => {
        if (active) {
          if (event.key === "Escape") {
            event.preventDefault();
            returnToCode();
          }
          return;
        }
        if (["Enter", " "].includes(event.key)) {
          event.preventDefault();
          if (!event.repeat) startGame();
        }
      }}
      className={`group min-w-0 overflow-hidden rounded-2xl border border-zinc-200/80 bg-[#fcfcfd] shadow-[0_12px_40px_-16px_#25253b18] outline-none transition-[border-color,transform] duration-150 focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-4 motion-reduce:transform-none ${active ? "" : "cursor-pointer hover:-translate-y-px hover:border-accent/25"}`}
      aria-label={
        active
          ? "코드 러너"
          : "leehan.ts 코드 블럭. 클릭하거나 Enter 또는 Space를 누르면 숨겨진 러너 게임을 시작합니다."
      }
    >
      <figcaption className="flex h-12 items-center justify-between border-b border-zinc-200/80 bg-zinc-50 px-4">
        <div className="flex items-center gap-3">
          <div aria-hidden="true" className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-[#edaaa6]" />
            <span className="size-2.5 rounded-full bg-[#e8cd92]" />
            <span className="size-2.5 rounded-full bg-[#a8ccb5]" />
          </div>
          <span className="ml-1 flex items-center gap-2 font-mono text-xs text-slate-500">
            <span
              aria-hidden="true"
              className="rounded bg-sky-100 px-1 py-0.5 text-[9px] font-bold text-sky-700"
            >
              TS
            </span>
            leehan.ts
          </span>
        </div>
        <span
          aria-hidden="true"
          className="font-mono text-xs text-muted opacity-15 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          {active ? ">_" : "▶"}
        </span>
      </figcaption>
      <div className="h-[520px]">
        {active ? (
          <RunnerGame best={best} onBest={saveBest} onReturn={returnToCode} />
        ) : (
          <>
            <pre className="sr-only">{code}</pre>
            <div
              className="flex h-full overflow-x-auto font-mono text-[13px] leading-6 max-[640px]:text-[12px]"
              aria-hidden="true"
            >
              <div className="sticky left-0 z-10 shrink-0 select-none border-r border-zinc-100 bg-[#f7f8fa] px-3 py-5 text-right text-zinc-400">
                {Array.from({ length: lineCount }, (_, index) => (
                  <div key={index}>{index + 1}</div>
                ))}
              </div>
              <div className="grid min-w-max flex-1 px-4 py-5">
                <pre className="invisible col-start-1 row-start-1 pr-3">
                  {code}
                </pre>
                <pre className="col-start-1 row-start-1 pr-3">
                  {hasPlayed ? (
                    <code>
                      {highlightedCode.map((token) => (
                        <span key={token.start} className={token.className}>
                          {token.text}
                        </span>
                      ))}
                    </code>
                  ) : (
                    <TextType
                      as="span"
                      text={code}
                      syntaxLanguage="typescript"
                      loop={false}
                      cursorCharacter="▎"
                      cursorClassName="text-violet-500"
                    />
                  )}
                </pre>
              </div>
            </div>
          </>
        )}
      </div>
      <div
        aria-hidden="true"
        className="flex h-8 items-center justify-between border-t border-zinc-200/70 bg-zinc-50 px-4 font-mono text-[10px] text-zinc-400"
      >
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-emerald-500/70" />
          TypeScript
        </span>
        <span>
          UTF-8 <span className="mx-2 text-zinc-300">·</span> {lineCount} lines
        </span>
      </div>
    </figure>
  );
}
