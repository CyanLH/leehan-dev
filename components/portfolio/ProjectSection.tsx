"use client";

import { useRef, useState } from "react";
import type { Project } from "@/data/portfolio";
import { Arrow, SectionHeading } from "./shared";
import { ProjectCard } from "./ProjectCard";
import { ProjectDialog } from "./ProjectDialog";

export function ProjectSection({ projects }: { projects: Project[] }) {
  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  function openProject(project: Project) {
    setSelected(project);
    dialogRef.current?.showModal();
  }

  return (
    <section id="work">
      <SectionHeading
        action={
          <button
            className="flex items-center gap-2.5 p-0 text-[13px] hover:text-accent max-[640px]:text-[11px]"
            aria-expanded={showAll}
            aria-controls="project-grid"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show selected works" : "View all works"} <Arrow />
          </button>
        }
      >
        WORKS
      </SectionHeading>
      <div
        id="project-grid"
        className="grid grid-cols-4 gap-3.5 max-[900px]:grid-cols-2 max-[900px]:gap-5 max-[640px]:gap-[13px]"
      >
        {projects
          .slice(0, showAll ? projects.length : 4)
          .map((project, index) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={index}
              onOpen={openProject}
            />
          ))}
      </div>
      <ProjectDialog project={selected} dialogRef={dialogRef} />
    </section>
  );
}
