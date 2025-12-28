// 공통 목업 데이터와 비동기 호출 유틸리티
const clone = <T,>(data: T): T => JSON.parse(JSON.stringify(data)) as T;

type WithLatencyOptions = {
  delay?: number;
  shouldFail?: boolean;
};

const withLatency = <T,>(
  data: T,
  { delay = 800, shouldFail = false }: WithLatencyOptions = {}
): Promise<T> =>
  new Promise<T>((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("목업 데이터 로드 실패"));
        return;
      }
      resolve(clone(data));
    }, delay);
  });

const mockData = {
  id: 101,
  title: "목업 데이터",
  content: "비동기 요청을 흉내낸 목업 응답 예시입니다.",
  timestamp: new Date().toLocaleString(),
};

export const mockUrlData = [
  {
    id: 1,
    depth1: "메인",
    depth2: "홈",
    depth3: "",
    depth4: "",
    url: "https://example.com",
    description: "메인 홈페이지",
  },
  {
    id: 2,
    depth1: "메뉴",
    depth2: "커피",
    depth3: "아메리카노",
    depth4: "",
    url: "/menu/coffee/americano",
    description: "아메리카노 메뉴 페이지", 
  },
  {
    id: 3,
    depth1: "메뉴",
    depth2: "커피",
    depth3: "라떼",
    depth4: "바닐라라떼",
    url: "https://example.com/menu/coffee/latte/vanilla-latte",
    description: "바닐라 라떼 상세 페이지",
  },
  {
    id: 4,
    depth1: "스토어",
    depth2: "매장찾기",
    depth3: "",
    depth4: "",
    url: "https://example.com/store/locator",
    description: "매장 위치 찾기",
  },
  {
    id: 5,
    depth1: "멤버십",
    depth2: "등급",
    depth3: "골드",
    depth4: "",
    url: "https://example.com/membership/tiers/gold",
    description: "골드 등급 혜택 안내",
  },
];

// 가이드/데모용 추가 목업 데이터 (차후 각 컴포넌트에서 비동기 사용 예정)
export const mockToastMessages = [
  { id: 1, type: "success", message: "저장되었습니다." },
  { id: 2, type: "warning", message: "네트워크가 불안정합니다." },
  { id: 3, type: "danger", message: "저장에 실패했습니다." },
];

export const mockTabs = [
  { id: "tab-1", label: "탭 1", content: "탭 1 내용" },
  { id: "tab-2", label: "탭 2", content: "탭 2 내용" },
  { id: "tab-3", label: "탭 3", content: "탭 3 내용" },
];

export const mockDropdownOptions = [
  { value: "apple", label: "사과" },
  { value: "banana", label: "바나나" },
  { value: "cherry", label: "체리" },
];

export const mockListSyncOptions = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "next", label: "Next.js" },
  { value: "astro", label: "Astro" },
];

export const mockCarouselSlides = [
  { id: 1, title: "슬라이드 1", description: "첫 번째 슬라이드" },
  { id: 2, title: "슬라이드 2", description: "두 번째 슬라이드" },
  { id: 3, title: "슬라이드 3", description: "세 번째 슬라이드" },
];

export const mockTableBasicRows = [
  { id: 1, title: "모집 공고 A", date: "2025-01-03", attachment: "guide.pdf", views: 1280, ratio: "12:1" },
  { id: 2, title: "모집 공고 B", date: "2025-01-12", attachment: null, views: 860, ratio: "9:1" },
  { id: 3, title: "모집 공고 C", date: "2025-02-02", attachment: "terms.docx", views: 432, ratio: "5:1" },
  { id: 4, title: "모집 공고 D", date: "2025-02-14", attachment: "spec.xlsx", views: 2210, ratio: "18:1" },
  { id: 5, title: "모집 공고 E", date: "2025-03-01", attachment: null, views: 642, ratio: "7:1" },
];

export const mockTableWideHeaders = ["번호", "제목", "등록일", "첨부", "조회수", "경쟁률", "상태", "분류", "담당자", "마감일", "비고"];

export const mockTableWideRows = [
  {
    id: 1,
    title: "데이터 분석가 채용",
    date: "2025-01-07",
    attachment: "jd.pdf",
    views: 3210,
    ratio: "15:1",
    status: "진행중",
    category: "채용",
    owner: "홍길동",
    deadline: "2025-02-01",
    note: "온라인 면접",
  },
  {
    id: 2,
    title: "프론트엔드 인턴 모집",
    date: "2025-01-15",
    attachment: "apply.docx",
    views: 1880,
    ratio: "22:1",
    status: "접수중",
    category: "인턴",
    owner: "김개발",
    deadline: "2025-02-10",
    note: "리액트 과제 포함",
  },
  {
    id: 3,
    title: "디자인 시스템 워크숍",
    date: "2025-01-20",
    attachment: null,
    views: 940,
    ratio: "4:1",
    status: "마감임박",
    category: "교육",
    owner: "이기획",
    deadline: "2025-01-30",
    note: "오프라인",
  },
];

export const mockSampleHero = {
  badge: "Page Template",
  title: "프로젝트용 샘플 페이지",
  lead: "헤더/푸터는 공통 컴포넌트, 본문은 자유롭게 교체할 수 있도록 만든 기본 레이아웃입니다.",
  primaryCta: "Primary CTA",
  secondaryCta: "Secondary",
};

export const mockSampleCards = [
  { id: 1, title: "블록 1", desc: "여기에 카드형 콘텐츠를 배치합니다." },
  { id: 2, title: "블록 2", desc: "리스트, 표, 폼 등을 넣을 수 있습니다." },
  { id: 3, title: "블록 3", desc: "그래프, 배너 등 원하는 모듈을 추가하세요." },
];

// 공통 fetch 헬퍼
export const fetchMockData = (options = {}) =>
  withLatency({ ...mockData, timestamp: new Date().toLocaleString() }, { delay: 1200, ...options });
export const fetchMockUrls = (options = {}) => withLatency(mockUrlData, { delay: 800, ...options });
export const fetchMockToastMessages = (options = {}) => withLatency(mockToastMessages, { delay: 600, ...options });
export const fetchMockTabs = (options = {}) => withLatency(mockTabs, { delay: 500, ...options });
export const fetchMockDropdownOptions = (options = {}) => withLatency(mockDropdownOptions, { delay: 500, ...options });
export const fetchMockListSyncOptions = (options = {}) => withLatency(mockListSyncOptions, { delay: 500, ...options });
export const fetchMockCarouselSlides = (options = {}) => withLatency(mockCarouselSlides, { delay: 700, ...options });
export const fetchMockTableBasic = (options = {}) => withLatency(mockTableBasicRows, { delay: 650, ...options });
export const fetchMockTableWide = (options = {}) =>
  withLatency({ headers: mockTableWideHeaders, rows: mockTableWideRows }, { delay: 700, ...options });
export const fetchMockSamplePage = (options = {}) =>
  withLatency({ hero: mockSampleHero, cards: mockSampleCards }, { delay: 600, ...options });

