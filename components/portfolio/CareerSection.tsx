import { careers } from "@/data/portfolio";
import { SectionHeading, Tags } from "./shared";

export function CareerSection() {
  return (
    <section id="career" className="mt-[51px] max-[640px]:mt-[45px]">
      <SectionHeading>CAREER</SectionHeading>
      <div className="grid grid-cols-[1fr_178px] gap-[34px] max-[1200px]:grid-cols-[1fr_148px] max-[1200px]:gap-5 min-[1000px]:max-[1200px]:gap-6 max-[900px]:gap-6 max-[640px]:grid-cols-1">
        <div>
          {careers.map((career) => (
            <article
              key={career.name}
              className="group relative grid min-h-[102px] grid-cols-[190px_30px_235px_1fr] gap-0 min-[1440px]:grid-cols-[245px_42px_245px_1fr] max-[1200px]:min-h-[103px] max-[1200px]:grid-cols-[175px_33px_1fr] min-[1000px]:max-[1200px]:min-h-[95px] min-[1000px]:max-[1200px]:grid-cols-[220px_30px_190px_1fr] max-[900px]:grid-cols-[140px_30px_1fr] max-[640px]:min-h-[125px] max-[640px]:grid-cols-[112px_24px_1fr]"
            >
              <div className="pl-[90px] text-[14px] leading-[1.6] whitespace-nowrap text-muted min-[1440px]:pl-[100px] max-[1200px]:pl-[60px] max-[1200px]:text-[12px] min-[1000px]:max-[1200px]:pl-20 max-[900px]:pl-0 max-[640px]:text-[11px]">
                {career.date}
                <br />
                <span className="text-[#8a8c94]">({career.duration})</span>
              </div>
              <div
                aria-hidden="true"
                className="relative ml-2 before:absolute before:top-[7px] before:left-[3px] before:z-[1] before:size-2 before:rounded-full before:bg-[#96979d] before:content-[''] after:absolute after:top-2 after:bottom-[-8px] after:left-1.5 after:w-px after:bg-[#cfcfd3] after:content-[''] group-first:before:bg-[#33353d] group-last:after:hidden max-[1200px]:col-start-2 max-[1200px]:row-[1/3] min-[1000px]:max-[1200px]:row-auto max-[640px]:ml-0"
              />
              <h3 className="pt-px text-[16px] font-semibold tracking-[-0.5px] max-[1200px]:text-[14px] min-[1000px]:max-[1200px]:text-[13px] max-[640px]:text-[13px] max-[640px]:leading-[1.65]">
                {career.name}
              </h3>
              <div className="max-[1200px]:col-start-3 max-[1200px]:pb-[23px] min-[1000px]:max-[1200px]:col-start-4 min-[1000px]:max-[1200px]:pb-5">
                <p className="mb-2.5 text-[12px] leading-[1.65] text-[#85868d] max-[1200px]:mt-[5px] max-[1200px]:mb-[7px] max-[1200px]:text-[11px] min-[1000px]:max-[1200px]:mt-0">
                  {career.role}
                  <span className="px-1.5 max-[640px]:block max-[640px]:h-0 max-[640px]:text-[0px]">
                    {" "}
                    |{" "}
                  </span>
                  {career.products}
                </p>
                <Tags items={career.tags} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
