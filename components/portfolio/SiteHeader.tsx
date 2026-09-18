import { shellClassName } from "./shared";

export function SiteHeader() {
  return (
    <header
      className={`${shellClassName} flex h-[78px] items-center justify-between max-[640px]:h-[72px]`}
    >
      <a
        className="text-[20px] font-extrabold tracking-[-0.7px] max-[640px]:text-[19px]"
        href="#home"
        aria-label="이한 홈"
      >
        LH.
      </a>
      <nav
        aria-label="주요 메뉴"
        className="flex gap-[34px] text-[13px] max-[640px]:gap-[21px] max-[640px]:text-[12px] [&_a]:transition-colors [&_a]:duration-200 [&_a:hover]:text-accent"
      >
        <a href="#work">Works</a>
        <a href="#career">Career</a>
        <a href="#about">About</a>
      </nav>
      <a
        className="flex gap-[9px] text-[13px] max-[640px]:text-[12px]"
        href="/resume/leehan-frontend-resume.pdf"
        target="_blank"
        rel="noreferrer"
      >
        Resume <span aria-hidden="true">↗</span>
      </a>
    </header>
  );
}
