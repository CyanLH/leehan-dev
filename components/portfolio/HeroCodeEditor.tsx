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

export function HeroCodeEditor() {
  const lineCount = code.split("\n").length;

  return (
    <figure
      className="min-w-0 overflow-hidden rounded-2xl border border-zinc-200/80 bg-[#fcfcfd] shadow-[0_12px_40px_-16px_#25253b18]"
      aria-label="이한의 개발 철학을 담은 TypeScript 코드"
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
        <span aria-hidden="true" className="font-mono text-xs text-zinc-400">
          {"{ }"}
        </span>
      </figcaption>
      <pre className="sr-only">{code}</pre>
      <div
        className="flex overflow-x-auto font-mono text-[13px] leading-6 max-[640px]:text-[12px]"
        tabIndex={0}
        role="region"
        aria-label="코드 가로 스크롤"
      >
        <div
          aria-hidden="true"
          className="sticky left-0 z-10 shrink-0 select-none border-r border-zinc-100 bg-[#f7f8fa] px-3 py-5 text-right text-zinc-400"
        >
          {Array.from({ length: lineCount }, (_, index) => (
            <div key={index}>{index + 1}</div>
          ))}
        </div>
        <div aria-hidden="true" className="grid min-w-max flex-1 px-4 py-5">
          <pre className="invisible col-start-1 row-start-1 pr-3">{code}</pre>
          <pre className="col-start-1 row-start-1 pr-3">
            <TextType
              as="span"
              text={code}
              syntaxLanguage="typescript"
              loop={false}
              cursorCharacter="▎"
              cursorClassName="text-violet-500"
            />
          </pre>
        </div>
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
