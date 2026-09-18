import { Arrow, textLinkClassName } from "./shared";
import TextType from "@/components/reactBits/TextType";

export function HeroSection() {
  return (
    <section
      className="grid grid-cols-[0.92fr_1.08fr] items-center gap-8 pt-[26px] min-[1440px]:pt-10 max-[1200px]:gap-[25px] max-[900px]:grid-cols-2 max-[640px]:grid-cols-1 max-[640px]:gap-8 max-[640px]:pt-7"
      aria-labelledby="hero-title"
    >
      <div>
        <p className="text-[20px] tracking-[-0.3px] text-accent max-[1200px]:text-[17px] font-semibold">
          Frontend Engineer
        </p>
        <h1
          id="hero-title"
          className="mt-[9px] mb-[15px] text-[clamp(70px,7.2vw,112px)] leading-[1.07] font-extrabold tracking-[-4px] max-[1200px]:text-[72px] max-[900px]:text-[65px] max-[640px]:mt-2 max-[640px]:mb-4 max-[640px]:text-[79px]"
        >
          LEE HAN
        </h1>
        <h2 className="text-[clamp(23px,2.3vw,34px)] leading-[1.43] font-semibold tracking-[-0.7px] max-[1200px]:text-[25px] max-[900px]:text-[21px] max-[640px]:text-[25px]">
          복잡한 웹 서비스를 설계하고,
          <br />
          빠르게 만들고, 오래 운영합니다.
        </h2>
        <p className="mt-[18px] text-[14px] leading-[1.6] break-keep text-[#686a71] max-[1200px]:text-[12px] max-[640px]:mt-[17px] max-[640px]:text-[13px] max-[640px]:leading-[1.8]">
          6년 이상 React·Next.js 기반의 웹 서비스를 개발하고 운영한 프론트엔드
          개발자입니다.
          <br className="max-[900px]:hidden" /> 제품 설계부터 성능 최적화, 배포
          자동화, 운영 안정화까지
          <br className="max-[900px]:hidden" /> 서비스의 전 과정을 주도적으로
          리딩합니다.
        </p>
        <div className="mt-[27px] flex items-center gap-8 text-[14px] max-[1200px]:gap-[25px] max-[1200px]:text-[12px] max-[640px]:mt-[25px] max-[640px]:gap-[30px] max-[640px]:text-[13px]">
          <a
            className="inline-flex items-center gap-[13px] rounded-[40px] bg-[#18191c] px-6 py-[13px] text-white shadow-[inset_0_0_12px_#ffffff12] transition-[background,transform] duration-200 hover:-translate-y-0.5 hover:bg-accent"
            href="#work"
          >
            View My Work
          </a>
          <a className={textLinkClassName} href="mailto:dlgksk5@gmail.com">
            Contact Me <Arrow />
          </a>
        </div>
      </div>
      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50/80">
        <div className="flex h-10 items-center border-b border-zinc-200 px-4">
          <span className="font-mono text-xs text-zinc-400">~/leehan.ts</span>
        </div>
        <div className="flex gap-4">
          <div className="py-5 px-3 border-r border-zinc-200 text-zinc-400">
            {new Array(20).fill(0).map((_, i) => (
              <pre
                className="overflow-x-auto font-mono text-[13px] leading-6 text-right"
                key={`line_number_${i + 1}`}
              >
                {i + 1}
              </pre>
            ))}
          </div>

          <pre className="overflow-x-auto py-5 font-mono text-[13px] leading-6">
            <TextType
              text={`const leehan = {
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
};`}
              loop={false}
            />
          </pre>
        </div>
      </div>
    </section>
  );
}

export function StatsSection() {
  return (
    <section
      className="mt-[58px] mb-[65px] grid grid-cols-5 min-[1440px]:mt-[65px] max-[640px]:mt-9 max-[640px]:mb-12 max-[640px]:grid-cols-6 max-[640px]:gap-y-[25px]"
      aria-label="주요 경력과 성과"
    >
      {[
        { value: "6+", lines: ["YEARS", "EXPERIENCE"] },
        { value: "8+", lines: ["PRODUCTS", "BUILT & OPERATED"] },
      ].map(({ value, lines }) => (
        <div
          key={value}
          className="border-l border-line pt-[3px] pb-0.5 pl-[35px] max-[1200px]:pl-[30px] max-[900px]:pl-5 max-[640px]:col-span-3 max-[640px]:pl-[13px]"
        >
          <strong className="block text-[29px] font-semibold tracking-[-0.6px] whitespace-nowrap max-[1200px]:text-[25px] max-[900px]:text-[22px]">
            {value}
          </strong>
          <span className="mt-[5px] block text-[13px] leading-[1.5] text-muted max-[1200px]:text-[11px] max-[640px]:text-[10px]">
            {lines[0]}
            <br />
            {lines[1]}
          </span>
        </div>
      ))}
    </section>
  );
}
