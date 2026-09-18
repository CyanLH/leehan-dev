import type { ReactNode } from "react";

export const shellClassName =
  "mx-auto w-[calc(100%-92px)] max-w-[1400px] max-[1200px]:w-[calc(100%-72px)] max-[640px]:w-[calc(100%-40px)]";

export const textLinkClassName =
  "inline-flex items-center gap-3.5 transition-colors duration-200 hover:text-accent";

export function Arrow({ down = false }: { down?: boolean }) {
  return (
    <span aria-hidden="true" className="inline-block text-[18px] font-normal">
      {down ? "↓" : "→"}
    </span>
  );
}

export function Tags({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-[7px] max-[1200px]:gap-[5px] max-[640px]:gap-1">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-[18px] bg-[#ededee] px-2.5 py-[5px] text-[11px] leading-[1.2] whitespace-nowrap text-[#60626a] max-[1200px]:px-[9px] max-[1200px]:text-[10px] max-[640px]:px-[7px] max-[640px]:py-1 max-[640px]:text-[9px]"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export function SectionHeading({
  children,
  id,
  action,
}: {
  children: ReactNode;
  id?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-[21px] flex items-center justify-between">
      <h2
        id={id}
        className="text-[16px] font-normal tracking-[0.5px] text-[#383a43] max-[640px]:text-[14px]"
      >
        {children}
      </h2>
      {action}
    </div>
  );
}
