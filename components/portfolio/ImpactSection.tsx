import { SectionHeading } from "./shared";

const impacts = [
  {
    before: "4.0s",
    after: "1.1s",
    title: "Largest Contentful Paint",
    lines: ["SSR 구조 설계, SWC 최적화,", "Docker 이미지 최적화"],
  },
  {
    before: "180s",
    after: "45s",
    title: "Build Time",
    lines: ["빌드 프로세스 최적화 및", "캐시 전략 개선"],
  },
  {
    before: "10m",
    after: "3m",
    title: "Deployment Time",
    lines: ["CI/CD 파이프라인 구축 및", "배포 자동화"],
  },
  {
    after: "+95%",
    title: "Data Processing",
    lines: ["지역 트리 생성 알고리즘", "O(N²M) → O(N log N) 개선"],
  },
];

export function ImpactSection() {
  return (
    <section
      className="mt-[50px] max-[640px]:mt-[43px]"
      aria-labelledby="impact-title"
    >
      <SectionHeading id="impact-title">IMPACT</SectionHeading>
      <div className="mt-[26px] grid grid-cols-4 max-[640px]:grid-cols-2 max-[640px]:gap-y-[30px]">
        {impacts.map((impact) => (
          <div
            key={impact.title}
            className="border-l border-line pt-[3px] pr-[30px] pb-[5px] pl-[42px] first:border-0 first:pl-1.5 max-[1200px]:pr-3 max-[1200px]:pl-8 max-[1200px]:first:pl-1.5 max-[900px]:pl-5 max-[900px]:first:pl-1.5 max-[640px]:pl-[19px] max-[640px]:odd:border-l-0 max-[640px]:odd:pl-0"
          >
            <strong className="text-[35px] font-semibold tracking-[-1px] whitespace-nowrap text-accent max-[1200px]:text-[30px] max-[900px]:text-[27px] max-[640px]:text-[28px]">
              {impact.before && (
                <>
                  {impact.before}{" "}
                  <span className="font-normal text-[#50527e]">→</span>{" "}
                </>
              )}
              {impact.after}
            </strong>
            <h3 className="mt-[13px] mb-4 text-[15px] font-medium max-[1200px]:text-[13px] max-[640px]:my-2.5 max-[640px]:text-[12px]">
              {impact.title}
            </h3>
            <p className="text-[14px] leading-[1.6] break-keep text-muted max-[1200px]:text-[12px] max-[640px]:text-[11px]">
              {impact.lines[0]}
              <br />
              {impact.lines[1]}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
