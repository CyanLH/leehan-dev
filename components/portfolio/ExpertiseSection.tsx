import { expertise } from "@/data/portfolio";
import { Icon } from "./icon";
import { SectionHeading } from "./shared";

export function ExpertiseSection() {
  return (
    <section id="about" className="mt-[21px] max-[640px]:mt-[42px]">
      <SectionHeading>EXPERTISE</SectionHeading>
      <div className="mt-[30px] grid grid-cols-[1.1fr_1.13fr_1.14fr_1fr_0.92fr] gap-[30px] max-[1200px]:gap-[19px] max-[900px]:grid-cols-3 max-[900px]:gap-y-7 max-[640px]:grid-cols-2 max-[640px]:gap-y-[26px]">
        {expertise.map((item) => (
          <article
            key={item.title}
            className="flex items-start gap-[15px] max-[1200px]:gap-[11px] max-[640px]:gap-2.5 [&_svg]:shrink-0 max-[1200px]:[&_svg]:w-[23px] max-[640px]:[&_svg]:w-[22px]"
          >
            <Icon name={item.icon} />
            <div>
              <h3 className="mt-1 mb-[11px] text-[14px] font-semibold tracking-[-0.25px] whitespace-nowrap max-[1200px]:text-[12px] max-[900px]:text-[13px] max-[640px]:text-[11px] max-[640px]:whitespace-normal">
                {item.title}
              </h3>
              <p className="text-[12px] leading-[1.8] text-muted max-[1200px]:text-[10px] max-[900px]:text-[12px] max-[640px]:text-[10px]">
                {item.text}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
