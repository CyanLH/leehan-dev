export const projects = [
  {
    name: "SuperClub Next",
    description: "대규모 커뮤니티 플랫폼 개발 및 운영",
    tags: ["Next.js", "React", "TypeScript"],
    thumbnail: "/images/thumbnail_superclub.png",
    company: "DIVERSE · 2024.11 — 2026.07",
    intro: "사용자 경험부터 운영 품질까지, 커뮤니티의 전 과정을 연결했습니다.",
    details: [
      "인증, 게시글·댓글·미디어, 통합 검색, CP 보상, 대시보드와 스트리밍·채팅 기능을 구현했습니다.",
      "Server Actions와 TanStack Query, 캐시 무효화 및 SSR·CSR 쿼리 재사용 구조를 설계했습니다.",
      "역할별 메뉴와 서버 가드를 구축하고 클럽·회원·콘텐츠 관리 기능을 확장했습니다.",
      "GIF의 MP4 변환과 미디어 압축 정책, S3 업로드를 구현하고 AWS Key의 클라이언트 노출을 제거했습니다.",
    ],
  },
  {
    name: "LAKUS",
    description: "글로벌 실시간 공연·VOD 플랫폼",
    tags: ["Next.js", "HLS", "Kubernetes"],
    thumbnail: "/images/thumbnail_lakus.jpg",
    company: "라이브커넥트 · 2022.04 — 2024.04",
    intro:
      "전 세계의 팬과 공연을 연결하는 스트리밍 서비스를 설계하고 운영했습니다.",
    details: [
      "Next.js 기반 SSR·SEO 구조와 공용 컴포넌트를 설계하고 반응형·다국어 서비스를 구축했습니다.",
      "SSR, SWC, Docker 이미지 최적화로 LCP 4.0초 → 1.1초, 빌드 180초 → 45초, 배포 10분 → 3분을 달성했습니다.",
      "HLS 실시간 스트리밍, PubNub 채팅, 결제·환불, 소셜 로그인 및 사용자 권한 제어를 구현했습니다.",
      "Docker·Kubernetes 기반 Blue-Green 무중단 배포와 CI/CD를 구축했습니다.",
    ],
  },
  {
    name: "DIVERSE",
    description: "공식 웹사이트 단독 구축 및 성능 최적화",
    tags: ["Next.js", "Three.js", "GSAP"],
    thumbnail: "/images/thumbnail-diverse.png",
    company: "DIVERSE · 2024.11 — 2026.07",
    intro: "인터랙티브한 브랜드 경험과 안정적인 웹 성능을 함께 구현했습니다.",
    details: [
      "Next.js 16·React 19·Tailwind CSS 4 기반으로 프로젝트를 초기화하고 단독 개발했습니다.",
      "Home·Careers·About 페이지를 구현했습니다.",
      "WebGL을 viewport 진입 시에만 렌더링하고 resize debounce를 적용했습니다.",
      "GSAP·Lenis 최적화로 WebGL 스크롤 프리징 현상을 개선했습니다.",
    ],
  },
  {
    name: "enbrix",
    description: "에너지 관리·분석 서비스 프론트엔드",
    tags: ["React", "TypeScript", "Ant Design"],
    thumbnail: "/images/thumbnail_enbrix.jpg",
    company: "엔엑스테크놀로지 · 2020.01 — 2022.04",
    intro:
      "복잡한 에너지 데이터를 더 빠르고 명확하게 탐색할 수 있도록 개선했습니다.",
    details: [
      "TypeScript·Redux를 단계적으로 도입해 타입 안정성과 상태 관리 구조를 개선했습니다.",
      "Node.js 8 → 14, Next.js 4 → 10, Ant Design 3 → 4 마이그레이션을 진행했습니다.",
      "지역 트리 생성 알고리즘을 O(N²M)에서 O(N log N)으로 개선해 기준 데이터 처리 성능을 95% 향상했습니다.",
      "최대 4개 비교 그래프와 대시보드·검색·분석 기능을 구현하고 PR 코드리뷰 및 운영 가이드를 도입했습니다.",
    ],
  },
  {
    name: "CRETA",
    description: "글로벌 브랜드 웹사이트 및 API 연동",
    tags: ["Next.js", "ISR", "TypeScript"],
    thumbnail: "/images/thumbnail_creta.png",
    company: "DIVERSE · 2024.11 — 2026.07",
    intro: "콘텐츠 탐색부터 고객 문의까지 브랜드의 서비스 흐름을 연결했습니다.",
    details: [
      "Team·Partners·Policy·Inquiry·News·Nexus 및 통합 로그인 기능을 API와 연결했습니다.",
      "ISR·캐시 전략, Skeleton UI, Pagination을 적용해 콘텐츠 제공과 고객 문의 흐름을 개선했습니다.",
    ],
  },
  {
    name: "CRETA Admin",
    description: "다국어 콘텐츠 운영을 위한 관리자 콘솔",
    tags: ["React", "CMS", "Quill"],
    thumbnail: "/images/thumbnail_creta.png",
    company: "DIVERSE · 2024.11 — 2026.07",
    intro:
      "콘텐츠 운영자가 더 안정적으로 일할 수 있는 관리 도구를 만들었습니다.",
    details: [
      "정책·게시판·콘텐츠 관리 기능과 다국어 콘텐츠 폼을 확장했습니다.",
      "Quill Editor, 미디어 선택·이미지 업로드, YouTube 삽입 기능을 구현했습니다.",
      "중복 인증 요청을 제거해 운영 안정성을 높였습니다.",
    ],
  },
  {
    name: "CGP",
    description: "글로벌 게임 플랫폼 사용자 경험 개선",
    tags: ["Next.js", "next-intl", "React"],
    thumbnail: "/images/thumbnail_cgp.png",
    company: "DIVERSE · 2024.11 — 2026.07",
    intro:
      "언어와 디바이스의 경계를 넘어 일관된 게임 플랫폼 경험을 구현했습니다.",
    details: [
      "next-intl 기반 다국어 라우팅을 정비했습니다.",
      "Marketplace·Drops·인증·CBT 이벤트 화면을 리팩터링해 글로벌 접근성과 반응형 사용자 경험을 개선했습니다.",
    ],
  },
  {
    name: "Liveconnect CHINA",
    description: "중국 공연 스트리밍 및 운영 플랫폼",
    tags: ["Next.js", "AWS", "Docker"],
    thumbnail: "/images/thumbnail_liveconnect.png",
    company: "라이브커넥트 · 2022.04 — 2024.04",
    intro: "공연 서비스의 프론트엔드부터 인프라 운영까지 담당했습니다.",
    details: [
      "중국 서비스와 공연·VOD 관리자 플랫폼을 개발했습니다.",
      "AWS EC2·CloudFront 인프라를 구축하고 대용량 데이터 Pagination을 구현했습니다.",
    ],
  },
];
export const careers = [
  {
    date: "2024.11 - 2026.07",
    duration: "1년 9개월",
    name: "주식회사 다이버스",
    role: "멀티프로덕트 프론트엔드 개발 및 운영",
    products: "SuperClub · CRETA · DIVERSE",
    tags: ["Next.js", "React", "TypeScript", "AWS", "Three.js"],
  },
  {
    date: "2022.04 - 2024.04",
    duration: "2년 1개월",
    name: "주식회사 라이브커넥트",
    role: "프론트엔드 개발 및 운영",
    products: "LAKUS · Liveconnect",
    tags: ["Next.js", "HLS", "Kubernetes", "AWS", "PubNub"],
  },
  {
    date: "2020.01 - 2022.04",
    duration: "2년 4개월",
    name: "주식회사 엔엑스테크놀로지",
    role: "프론트엔드 개발 및 운영",
    products: "enbrix",
    tags: ["React", "TypeScript", "Node.js", "Ant Design"],
  },
];
export const expertise = [
  {
    icon: "box",
    title: "Product Development",
    text: "Complex UI, Authentication, Community, CMS, Search",
  },
  {
    icon: "layers",
    title: "Frontend Architecture",
    text: "Next.js, SSR/ISR, Server Actions, State & Cache",
  },
  {
    icon: "bolt",
    title: "Performance",
    text: "Core Web Vitals, Bundle Optimization, Dynamic Import, WebGL",
  },
  {
    icon: "cloud",
    title: "Infrastructure",
    text: "Docker, Kubernetes, CI/CD, AWS, Linux",
  },
  {
    icon: "settings",
    title: "Operation",
    text: "Monitoring, Analytics, Security, QA",
  },
];

export type Project = (typeof projects)[number];
