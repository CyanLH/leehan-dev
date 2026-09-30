"use client";

import { useEffect } from "react";

let hasGreeted = false;

export function ConsoleGreeting() {
  useEffect(() => {
    // Keep Strict Mode and component remounts from repeating the greeting.
    if (hasGreeted) return;
    hasGreeted = true;

    const accent = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-accent")
      .trim();

    console.info(
      "%c> hello, fellow developer_%c\n\n" +
        "보이는 화면 너머까지 살펴보는 분이군요.\n\n" +
        "React · Next.js · TypeScript\n" +
        "복잡한 서비스를 만들고, 빠르게 개선하고, 오래 운영합니다.\n\n" +
        "힌트: Hero의 leehan.ts를 클릭하면 코드가 달리기 시작합니다.\n\n" +
        "좋은 이야기는 언제나 환영합니다.\n" +
        "→ dlgksk5@gmail.com\n" +
        "→ https://github.com/CyanLH",
      `color: ${accent}; font-weight: bold; font-family: monospace;`,
      "",
    );
  }, []);

  return null;
}
