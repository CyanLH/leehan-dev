import type { RefObject } from "react";
import type { Project } from "@/data/portfolio";
import { Arrow, Tags, textLinkClassName } from "./shared";

export function ProjectDialog({
  project,
  dialogRef,
}: {
  project: Project | null;
  dialogRef: RefObject<HTMLDialogElement | null>;
}) {
  return (
    <dialog
      ref={dialogRef}
      className="m-auto max-h-[85dvh] w-[min(650px,calc(100%-32px))] rounded-[20px] border border-[#e9e9ed] bg-[#fafafa] p-0 text-foreground shadow-[0_24px_100px_#0003] backdrop:bg-[#17172866] backdrop:backdrop-blur-[7px]"
      onClick={(event) => {
        if (event.target === event.currentTarget) dialogRef.current?.close();
      }}
      aria-labelledby="dialog-title"
    >
      <div className="p-[45px] max-[640px]:px-[25px] max-[640px]:py-[37px]">
        <button
          className="absolute top-3 right-[17px] px-2.5 py-1 text-[30px] text-[#757680]"
          onClick={() => dialogRef.current?.close()}
          aria-label="상세 보기 닫기"
        >
          ×
        </button>
        {project && (
          <>
            <p className="text-[12px] tracking-[1px] text-accent">
              PROJECT CASE STUDY
            </p>
            <h2
              id="dialog-title"
              className="my-3 text-[36px] tracking-[-1px] max-[640px]:text-[29px]"
            >
              {project.name}
            </h2>
            <p className="mb-[19px] text-[13px] text-muted">
              {project.company}
            </p>
            <Tags items={project.tags} />
            <h3 className="mt-[30px] mb-[18px] text-[20px] leading-[1.6] break-keep max-[640px]:text-[17px]">
              {project.intro}
            </h3>
            <ul className="pl-5 text-[14px] leading-[1.9] text-[#686a73] max-[640px]:text-[13px]">
              {project.details.map((detail) => (
                <li className="my-3 pl-[5px]" key={detail}>
                  {detail}
                </li>
              ))}
            </ul>
            <a
              className={`${textLinkClassName} mt-[15px] text-[14px] text-accent`}
              href="/resume/leehan-frontend-resume.pdf"
              target="_blank"
              rel="noreferrer"
            >
              전체 이력서 보기 <Arrow />
            </a>
          </>
        )}
      </div>
    </dialog>
  );
}
