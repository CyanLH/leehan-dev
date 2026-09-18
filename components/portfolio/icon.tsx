import type { ReactNode } from "react";

export function Icon({ name }: { name: string }) {
  const paths: Record<string, ReactNode> = {
    box: (
      <>
        <path d="m12 3 9 5v10l-9 5-9-5V8l9-5Z" />
        <path d="m3 8 9 5 9-5M12 13v10M7.5 5.5l9 5" />
      </>
    ),
    layers: (
      <>
        <path d="m12 3 10 5-10 5L2 8l10-5ZM2 12l10 5 10-5M2 16l10 5 10-5" />
      </>
    ),
    bolt: <path d="m14 2-10 12h7l-1 9L21 10h-8l1-8Z" />,
    cloud: <path d="M6 19a4 4 0 0 1-1-8 7 7 0 0 1 14-1 4.5 4.5 0 0 1 0 9H6Z" />,
    settings: (
      <>
        <path d="m10 2-.7 3-2 .9-2.7-1.1-2 3.4L5 10v3l-2.4 1.8 2 3.5 2.7-1.1 2 .9.7 3h4l.7-3 2-.9 2.7 1.1 2-3.5L19 13v-3l2.4-1.8-2-3.4-2.7 1.1-2-.9L14 2h-4Z" />
        <circle cx="12" cy="11.5" r="3" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 6 9 7 9-7" />
      </>
    ),
    file: (
      <>
        <path d="M14 2H5v20h14V7l-5-5Z M14 2v5h5M8 12h8M8 16h8" />
      </>
    ),
  };
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
