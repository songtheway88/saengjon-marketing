export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  target: string;
  highlights: string[];
  emoji: string;
  badge?: string;
  // 콘텐츠 링크 (등록 후 제공)
  is_paid: boolean;
  price?: string;
  video_url?: string;   // 강의 영상 URL (유튜브/비메오 등)
  ebook_url?: string;   // 전자책 PDF URL (구글드라이브 등)
}

export const courses: Course[] = [
  {
    id: "notebooklm-gemini",
    title: "노트북LM + 제미나이 활용 강의",
    subtitle: "AI 리서치부터 콘텐츠 자동 생성까지",
    description:
      "구글 노트북LM으로 자료를 수집하고, 제미나이로 콘텐츠를 자동 생성하는 파이프라인을 직접 구축합니다.",
    target: "콘텐츠 제작자, 마케터",
    highlights: [
      "노트북LM 100% 활용법",
      "제미나이 프롬프트 고급 기법",
      "리서치→초안 자동화 파이프라인",
      "실무 템플릿 제공",
    ],
    emoji: "📓",
    badge: "인기",
    is_paid: false,
    video_url: "",    // TODO: 강의 영상 링크 입력
    ebook_url: "",    // TODO: 전자책 링크 입력
  },
  {
    id: "gemini-gems-shorts",
    title: "제미나이 젬스로 쇼츠 자동화",
    subtitle: "상세페이지 하나로 쇼츠 대본 뚝딱",
    description:
      "Super Gems 기능으로 쇼핑몰 상세페이지를 넣으면 쇼츠 스크립트가 자동으로 나오는 워크플로우를 만듭니다.",
    target: "유튜버, 쇼핑몰 운영자",
    highlights: [
      "Super Gems 세팅 완전정복",
      "상세페이지→쇼츠 스크립트 자동 변환",
      "후크 문장 작성 공식",
      "채널 성장 전략 포함",
    ],
    emoji: "🎬",
    badge: "신규",
    is_paid: false,
    video_url: "",    // TODO: 강의 영상 링크 입력
    ebook_url: "",    // TODO: 전자책 링크 입력
  },
  {
    id: "vrew-editing",
    title: "Vrew 영상 편집 강의",
    subtitle: "자막 자동화부터 컷 편집까지 한 번에",
    description:
      "AI 영상 편집 툴 Vrew로 자막 자동 생성, 컷 편집, BGM 삽입까지. 편집 경험 없어도 전문가급 영상 완성.",
    target: "영상 초보자, 1인 크리에이터",
    highlights: [
      "Vrew 기초부터 심화까지",
      "AI 자막 자동 생성",
      "유튜브 최적화 컷 편집",
      "썸네일 디자인 팁",
    ],
    emoji: "✂️",
    is_paid: false,
    video_url: "",    // TODO: 강의 영상 링크 입력
    ebook_url: "",    // TODO: 전자책 링크 입력
  },
  {
    id: "claude-complete",
    title: "클로드 스타일·스킬·프로젝트 완전정복",
    subtitle: "Claude Projects로 나만의 AI 비서 만들기",
    description:
      "Claude Projects 세팅, 스타일 커스터마이징, 스킬 활용법까지. 실무 마케터가 바로 쓸 수 있는 완전 가이드.",
    target: "실무 마케터, 에이전시 담당자",
    highlights: [
      "Claude Projects 완전 세팅",
      "스타일 가이드 커스터마이징",
      "반복 업무 자동화 스킬",
      "에이전시 실무 워크플로우",
    ],
    emoji: "🤖",
    badge: "추천",
    is_paid: true,
    price: "49,000원",
    video_url: "",    // TODO: 강의 영상 링크 입력
    ebook_url: "",    // TODO: 전자책 링크 입력
  },
  {
    id: "antigravity-beginner",
    title: "안티그래비티 왕초보 버전",
    subtitle: "코드 몰라도 GitHub Pages 배포까지",
    description:
      "코딩 입문자와 재취업 준비자를 위한 노코드 웹 개발. AI의 도움을 받아 나만의 포트폴리오 사이트를 만듭니다.",
    target: "코딩 입문자, 재취업 준비자",
    highlights: [
      "코딩 지식 0에서 시작",
      "AI로 HTML/CSS 자동 생성",
      "GitHub Pages 무료 배포",
      "포트폴리오 사이트 완성",
    ],
    emoji: "🚀",
    is_paid: true,
    price: "39,000원",
    video_url: "",    // TODO: 강의 영상 링크 입력
    ebook_url: "",    // TODO: 전자책 링크 입력
  },
];
