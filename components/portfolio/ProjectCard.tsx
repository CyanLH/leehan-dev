import Image from "next/image";
import type { Project } from "@/data/portfolio";
import { Arrow, Tags } from "./shared";

export function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
}) {
  return (
    <article className="min-w-0 overflow-hidden rounded-[11px] bg-white/50 transition-[transform,box-shadow] duration-250 hover:-translate-y-[5px] hover:shadow-[0_12px_35px_#24253b0a]">
      <button
        className="block h-full w-full p-0 text-left"
        onClick={() => onOpen(project)}
        aria-label={`${project.name} 프로젝트 상세 보기`}
      >
        <div className="relative aspect-[226/140] overflow-hidden rounded-[10px] bg-[#ededee]">
          <Image
            src={project.thumbnail}
            alt={`${project.name} 썸네일`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) calc((100vw - 53px) / 2), (max-width: 900px) calc((100vw - 92px) / 2), (max-width: 1200px) calc((100vw - 114px) / 4), (max-width: 1492px) calc((100vw - 134px) / 4), 340px"
          />
        </div>
        <div className="px-[18px] pt-[17px] pb-[18px] max-[1200px]:px-[15px] max-[1200px]:py-[13px] max-[900px]:p-[18px] max-[640px]:px-[11px] max-[640px]:py-[13px]">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-[17px] font-semibold tracking-[-0.35px] max-[1200px]:text-[15px] max-[900px]:text-[17px] max-[640px]:text-[14px]">
              {project.name}
            </h3>
            <span className="text-[12px] text-[#999ba4] max-[640px]:text-[10px]">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <p className="mt-[7px] mb-[17px] text-[13px] leading-[1.5] break-keep text-[#63656d] max-[1200px]:mb-2.5 max-[1200px]:min-h-9 max-[1200px]:text-[12px] max-[900px]:min-h-0 max-[640px]:mb-3 max-[640px]:min-h-[33px] max-[640px]:text-[11px]">
            {project.description}
          </p>
          <Tags items={project.tags} />
          <span className="mt-4 flex items-center gap-[15px] text-[13px] max-[640px]:mt-[13px] max-[640px]:gap-2.5 max-[640px]:text-[11px]">
            View Case Study <Arrow />
          </span>
        </div>
      </button>
    </article>
  );
}
