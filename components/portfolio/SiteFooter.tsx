import Image from "next/image";
import { Icon } from "./icon";
import { shellClassName } from "./shared";

export function SiteFooter() {
  return (
    <footer
      className={`${shellClassName} mt-[68px] border-t border-[#ececef] pt-[26px] pb-[25px] max-[640px]:mt-11 max-[640px]:pt-[25px]`}
    >
      <div className="flex items-center justify-between max-[640px]:flex-wrap max-[640px]:gap-7">
        <div className="flex items-center gap-[25px] max-[640px]:gap-[15px]">
          <a
            className="text-[24px] font-extrabold tracking-[-0.7px]"
            href="#home"
          >
            LH.
          </a>
          <p className="text-[11px] leading-[1.4] text-[#93949b]">
            Frontend Engineer
            <br />
            Based in Seoul, Korea
          </p>
        </div>
        <div className="text-right text-[12px] text-[#777980] max-[640px]:flex max-[640px]:w-full max-[640px]:flex-row-reverse max-[640px]:items-center max-[640px]:justify-between">
          <div className="mb-3 flex justify-end gap-[23px] text-[#18191c] max-[640px]:m-0 [&_svg]:size-[19px]">
            <a
              href="https://github.com/CyanLH"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="이한 github 방문하기"
            >
              <Image
                src="/logos/logo_github.png"
                alt="이한 github 방문하기"
                width={19}
                height={19}
              />
            </a>
            <a
              href="/resume/leehan-frontend-resume.pdf"
              download
              aria-label="이력서 다운로드"
            >
              <Icon name="file" />
            </a>
            <a
              href="mailto:dlgksk5@gmail.com"
              aria-label="이한에게 이메일 보내기"
            >
              <Icon name="mail" />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-[25px] flex justify-between text-[11px] text-[#92939b] max-[640px]:gap-[15px] max-[640px]:text-[9px] max-[640px]:leading-[1.6]">
        <span>© {new Date().getFullYear()} LEEHAN. All rights reserved.</span>
      </div>
    </footer>
  );
}
