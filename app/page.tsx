"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const projects = [
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
const careers = [
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
const expertise = [
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
function Arrow({ down = false }: { down?: boolean }) {
  return (
    <span aria-hidden="true" className="arrow">
      {down ? "↓" : "→"}
    </span>
  );
}
function Icon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
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
function Tags({ items }: { items: string[] }) {
  return (
    <div className="tags">
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}

export default function Home() {
  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState<(typeof projects)[number] | null>(
    null,
  );
  const dialog = useRef<HTMLDialogElement>(null);
  function openProject(project: (typeof projects)[number]) {
    setSelected(project);
    dialog.current?.showModal();
  }
  return (
    <>
      <header className="site-header shell">
        <a className="logo" href="#home" aria-label="이한 홈">
          LH.
        </a>
        <nav aria-label="주요 메뉴">
          <a href="#work">Work</a>
          <a href="#career">Career</a>
          <a href="#about">About</a>
        </nav>
        <a
          className="resume-link"
          href="/resume/leehan-frontend-resume.pdf"
          target="_blank"
          rel="noreferrer"
        >
          Resume <span aria-hidden="true">↗</span>
        </a>
      </header>
      <main id="home" className="shell">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">Frontend Engineer</p>
            <h1 id="hero-title">LEEHAN</h1>
            <h2>
              복잡한 웹 서비스를 설계하고,
              <br />
              빠르게 만들고, 오래 운영합니다.
            </h2>
            <p className="hero-description">
              6년 이상 React·Next.js 기반의 웹 서비스를 개발하고 운영한
              프론트엔드 개발자입니다.
              <br className="desktop-break" /> 제품 설계부터 성능 최적화, 배포
              자동화, 운영 안정화까지
              <br className="desktop-break" /> 서비스의 전 과정을 주도적으로
              리딩합니다.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#work">
                View My Work <Arrow down />
              </a>
              <a className="text-link" href="mailto:dlgksk5@gmail.com">
                Contact Me <Arrow />
              </a>
            </div>
          </div>
          <div
            className="hero-art"
            role="img"
            aria-label="구름 사이로 솟은 산봉우리. Build, optimize, operate. Better web experiences."
          />
        </section>
        <section className="stats" aria-label="주요 경력과 성과">
          <div>
            <strong>6+</strong>
            <span>
              YEARS
              <br />
              EXPERIENCE
            </span>
          </div>
          <div>
            <strong>8+</strong>
            <span>
              PRODUCTS
              <br />
              BUILT &amp; OPERATED
            </span>
          </div>
          {/*<div>*/}
          {/*  <strong>*/}
          {/*    4.0s <b>→</b> <em>1.1s</em>*/}
          {/*  </strong>*/}
          {/*  <span>*/}
          {/*    LCP*/}
          {/*    <br />*/}
          {/*    PERFORMANCE*/}
          {/*  </span>*/}
          {/*</div>*/}
          {/*<div>*/}
          {/*  <strong>*/}
          {/*    180s <b>→</b> <em>45s</em>*/}
          {/*  </strong>*/}
          {/*  <span>*/}
          {/*    BUILD TIME*/}
          {/*    <br />*/}
          {/*    OPTIMIZATION*/}
          {/*  </span>*/}
          {/*</div>*/}
          {/*<div>*/}
          {/*  <strong>*/}
          {/*    10m <b>→</b> <em>3m</em>*/}
          {/*  </strong>*/}
          {/*  <span>*/}
          {/*    DEPLOYMENT TIME*/}
          {/*    <br />*/}
          {/*    REDUCTION*/}
          {/*  </span>*/}
          {/*</div>*/}
        </section>
        <section id="work" className="work-section">
          <div className="section-heading">
            <h2>WORKS</h2>
            <button
              aria-expanded={showAll}
              aria-controls="project-grid"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show selected projects" : "View all projects"}{" "}
              <Arrow />
            </button>
          </div>
          <div id="project-grid" className="project-grid">
            {projects
              .slice(0, showAll ? projects.length : 4)
              .map((project, i) => (
                <article className="project-card" key={project.name}>
                  <button
                    className="project-open"
                    onClick={() => openProject(project)}
                    aria-label={`${project.name} 프로젝트 상세 보기`}
                  >
                    <div className="project-thumbnail">
                      <Image
                        src={project.thumbnail}
                        alt={`${project.name} 썸네일`}
                        fill
                        sizes="(max-width: 640px) calc((100vw - 53px) / 2), (max-width: 900px) calc((100vw - 92px) / 2), (max-width: 1200px) calc((100vw - 114px) / 4), (max-width: 1492px) calc((100vw - 134px) / 4), 340px"
                      />
                    </div>
                    <div className="project-body">
                      <div className="project-title">
                        <h3>{project.name}</h3>
                        <span>{String(i + 1).padStart(2, "0")}</span>
                      </div>
                      <p>{project.description}</p>
                      <Tags items={project.tags} />
                      <span className="case-study">
                        View Case Study <Arrow />
                      </span>
                    </div>
                  </button>
                </article>
              ))}
          </div>
        </section>
        <section className="impact-section" aria-labelledby="impact-title">
          <div className="section-heading">
            <h2 id="impact-title">IMPACT</h2>
          </div>
          <div className="impact-grid">
            <div>
              <strong>
                4.0s <span>→</span> 1.1s
              </strong>
              <h3>Largest Contentful Paint</h3>
              <p>
                SSR 구조 설계, SWC 최적화,
                <br />
                Docker 이미지 최적화
              </p>
            </div>
            <div>
              <strong>
                180s <span>→</span> 45s
              </strong>
              <h3>Build Time</h3>
              <p>
                빌드 프로세스 최적화 및<br />
                캐시 전략 개선
              </p>
            </div>
            <div>
              <strong>
                10m <span>→</span> 3m
              </strong>
              <h3>Deployment Time</h3>
              <p>
                CI/CD 파이프라인 구축 및<br />
                배포 자동화
              </p>
            </div>
            <div>
              <strong>+95%</strong>
              <h3>Data Processing</h3>
              <p>
                지역 트리 생성 알고리즘
                <br />
                O(N²M) → O(N log N) 개선
              </p>
            </div>
          </div>
        </section>
        <section id="career" className="career-section">
          <div className="section-heading">
            <h2>CAREER</h2>
          </div>
          <div className="career-layout">
            <div className="timeline">
              {careers.map((career) => (
                <article className="career-item" key={career.name}>
                  <div className="career-date">
                    {career.date}
                    <br />
                    <span>({career.duration})</span>
                  </div>
                  <div className="timeline-marker" />
                  <h3>{career.name}</h3>
                  <div className="career-detail">
                    <p>
                      {career.role}
                      <span className="career-divider"> | </span>
                      {career.products}
                    </p>
                    <Tags items={career.tags} />
                  </div>
                </article>
              ))}
            </div>
            <aside className="career-note">
              <span>—</span>
              <p>
                좋은 서비스를
                <br />더 많은 사람들에게,
                <br />더 오래 사용할 수 있도록.
              </p>
              <div>
                Product
                <br />
                Performance
                <br />
                Architecture
                <br />
                Operation
              </div>
            </aside>
          </div>
        </section>
        <section id="about" className="expertise-section">
          <div className="section-heading">
            <h2>EXPERTISE</h2>
          </div>
          <div className="expertise-grid">
            {expertise.map((item) => (
              <article key={item.title}>
                <Icon name={item.icon} />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <footer className="site-footer shell">
        <div className="footer-top">
          <div className="footer-brand">
            <a className="logo" href="#home">
              LH.
            </a>
            <p>
              Frontend Engineer
              <br />
              Based in Seoul, Korea
            </p>
          </div>
          <div className="footer-contact">
            <div>
              <a
                href="https://github.com/CyanLH"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="이한 github 방문하기"
              >
                <Image
                  src="/logos/logo_github.png"
                  alt="이한 github 방문하기"
                  width={19}
                  height={19}
                />
              </a>
              <a
                href="/resume/leehan-frontend-resume.pdf"
                download
                aria-label="이력서 다운로드"
              >
                <Icon name="file" />
              </a>
              <a
                href="mailto:dlgksk5@gmail.com"
                aria-label="이한에게 이메일 보내기"
              >
                <Icon name="mail" />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} LEEHAN. All rights reserved.</span>
        </div>
      </footer>
      <dialog
        ref={dialog}
        className="project-dialog"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
        aria-labelledby="dialog-title"
      >
        <div className="dialog-content">
          <button
            className="dialog-close"
            onClick={() => dialog.current?.close()}
            aria-label="상세 보기 닫기"
          >
            ×
          </button>
          {selected && (
            <>
              <p className="eyebrow">PROJECT CASE STUDY</p>
              <h2 id="dialog-title">{selected.name}</h2>
              <p className="dialog-company">{selected.company}</p>
              <Tags items={selected.tags} />
              <h3>{selected.intro}</h3>
              <ul>
                {selected.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
              <a
                className="text-link"
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
    </>
  );
}
