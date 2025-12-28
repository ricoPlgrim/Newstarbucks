# 페이지 생성 가이드

## 📁 프로젝트 구조

```
src/
├── pages/              # 페이지 컴포넌트
│   ├── YourPage/
│   │   ├── YourPage.tsx  # TypeScript 파일
│   │   └── YourPage.scss
├── components/         # 재사용 가능한 컴포넌트
│   ├── PageTemplate/  # 페이지 레이아웃 템플릿 (다크모드, 폰트 스케일)
│   ├── Header/        # 헤더 컴포넌트
│   ├── Footer/        # 푸터 컴포넌트
│   └── ...            # 기타 컴포넌트들
├── styles/            # 전역 스타일
│   ├── _variables.scss  # CSS 변수
│   ├── _mixins.scss    # SCSS 믹스인 (px 등)
│   ├── _utilities.scss # 유틸리티 클래스
│   └── _base.scss      # 기본 스타일
└── mocks/             # 목업 데이터
```

## 🎯 페이지 생성 기준

### ⭐ **기본 퍼블리싱 템플릿: SamplePage.tsx**

**새 페이지를 만들 때는 `SamplePage.tsx`를 복사해서 사용하세요!**

이 파일은 기본적인 퍼블리싱 구조를 포함하고 있습니다:

**참고**: 프로젝트는 TypeScript로 작성되어 있습니다. 모든 파일은 `.tsx` 또는 `.ts` 확장자를 사용합니다.
- Header 컴포넌트
- 히어로 섹션 (메인 비주얼 영역)
- 콘텐츠 섹션 (그리드 레이아웃)
- CTA 섹션 (행동 유도 영역)
- 로딩/에러 상태 처리 예시

```tsx
import Header from "../../components/Header/Header";
import "./YourPage.scss";

const YourPage = () => {
  return (
    <div className="your-page">
      <Header 
        variant="main" 
        currentPage="your-page" 
        onPageChange={() => {}} 
        sticky={false}
      />
      
      <main className="your-page__main">
        {/* 히어로 섹션 */}
        <section className="your-hero">
          {/* 메인 비주얼 영역 */}
        </section>
        
        {/* 콘텐츠 섹션 */}
        <section className="your-section">
          {/* 메인 콘텐츠 */}
        </section>
      </main>
    </div>
  );
};

export default YourPage;
```

### 2. **PageTemplate 사용 (접근성 기능 필요 시)**

다크모드, 폰트 스케일 등 접근성 기능이 필요한 경우

**예시**: `PublishingGuidePage`, `PublishingUrlPage`, `ExamplePage`

```tsx
import PageTemplate from "../../components/PageTemplate/PageTemplate";
import "./YourPage.scss";

const YourPage = () => {
  return (
    <PageTemplate title="페이지 제목">
      <div className="your-page">
        {/* 페이지 내용 */}
      </div>
    </PageTemplate>
  );
};

export default YourPage;
```

**장점**:
- ✅ 다크모드 자동 지원
- ✅ 폰트 스케일 조절 기능
- ✅ 접근성 도우미 패널 포함

## 📝 페이지 생성 단계

### Step 1: 페이지 폴더 및 파일 생성

```bash
src/pages/YourPage/
├── YourPage.tsx  # TypeScript 파일
└── YourPage.scss
```

### Step 2: 기본 페이지 구조 작성

**SamplePage.tsx를 복사하여 YourPage.tsx 생성 후 수정:**

```tsx
import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import "./YourPage.scss";
// import { fetchMockData } from "../../mocks/mockData"; // 필요시 주석 해제

const YourPage = () => {
  // 상태 관리 (필요시)
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 데이터 로드 (필요시 주석 해제)
  // useEffect(() => {
  //   fetchMockData()
  //     .then(setData)
  //     .catch((err) => {
  //       console.error("데이터 로드 실패:", err);
  //       setError("데이터를 불러오지 못했습니다.");
  //     })
  //     .finally(() => setIsLoading(false));
  // }, []);

  return (
    <div className="your-page">
      <Header currentPage="your-page" onPageChange={() => {}} />
      
      <main className="your-main">
        {/* 히어로 섹션 */}
        <section className="your-hero">
          <h1>페이지 제목</h1>
          <p>페이지 설명</p>
        </section>
        
        {/* 콘텐츠 섹션 */}
        <section className="your-section">
          {/* 여기에 콘텐츠 작성 */}
        </section>
      </main>
    </div>
  );
}

export default YourPage;
```

**YourPage.scss**:
```scss
@use "../../styles/index.scss" as *;

.your-page {
  // 페이지 스타일
  padding: px(20);
  
  // 반응형
  @media (max-width: 960px) {
    padding: px(16);
  }
}
```

### Step 3: App.js에 페이지 등록

**App.js**에 추가:
```jsx
import YourPage from "./pages/YourPage/YourPage";

// currentPage 상태에 추가
const [currentPage, setCurrentPage] = useState(() => {
  return sessionStorage.getItem('currentPage') || 'your-page';
});

// 네비게이션 버튼 추가
<button
  className={`app-nav-btn ${currentPage === "your-page" ? "active" : ""}`}
  onClick={() => handlePageChange("your-page")}
>
  페이지 이름
</button>

// 페이지 렌더링
{currentPage === "your-page" && <YourPage />}
```

## 🎨 스타일 가이드

### SCSS 믹스인 사용

```scss
@use "../../styles/index.scss" as *;

.your-element {
  // px 함수 사용 (피그마 수치값 그대로 사용, 자동으로 rem 변환)
  padding: px(20);
  margin: px(16);
  font-size: px(14);
  
  // 또는 믹스인 사용
  @include px(padding, 20);
  @include px(font-size, 16);
}
```

### CSS 변수 사용

```scss
.your-element {
  color: var(--color-text);
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
}
```

### 반응형 디자인

```scss
.your-element {
  // 모바일 우선
  padding: px(16);
  
  // 태블릿 이상
  @media (min-width: 768px) {
    padding: px(24);
  }
  
  // 데스크톱
  @media (min-width: 1024px) {
    padding: px(32);
  }
}
```

## 🧩 사용 가능한 컴포넌트

프로젝트에 이미 구현된 컴포넌트들을 활용하세요:

### 레이아웃
- **Header** - 모바일 헤더 (메인 헤더: 햄버거 메뉴 / 서브 헤더: 뒤로가기, 카테고리명, 유틸리티 버튼, `sticky` prop으로 sticky 위치 지정 가능)
- **Footer** - 푸터
- **PageTemplate** - 페이지 템플릿 (다크모드, 폰트 스케일 지원)
- **ListContainer** - 리스트 컨테이너 (section/article 태그 기반)
- **ScrollTop** - 스크롤 탑 버튼 (스크롤 시 나타나는 상단 이동 버튼)

### 입력 컴포넌트
- **Input** - 텍스트 입력 (text, password, number, tel, email, 자동 하이픈 포맷팅)
- **Select** - 셀렉트 박스
- **Textarea** - 여러 줄 텍스트 입력 (바이트 카운터 지원, 한글 2바이트/영문 1바이트 계산)
- **FileUpload** - 파일 업로드 (이미지 미리보기, 무제한 업로드, 가로 스크롤, 이미지 파일 타입 검증 강화)
- **SearchField** - 검색 필드 (검색 아이콘, 클리어 버튼)

### 선택 컴포넌트
- **Checkbox** - 체크박스 (단일/그룹)
- **Radio** - 라디오 버튼 (단일/그룹)

### 리스트 & 카드
- **Card** - 카드 컴포넌트 (상품 카드, 콘텐츠 카드)
- **List / ListItem** - 리스트 컴포넌트 (텍스트 리스트, 아이콘 리스트)
- **ListContainer** - 리스트 컨테이너 (section/article 태그 기반)
- **Notice** - 공지사항 리스트 (링크 지원)
- **DataList** - API 데이터 리스트 컴포넌트 (목업 API를 통해 데이터를 가져와서 리스트 형태로 표시, 로딩/에러/빈 상태 자동 처리, 다양한 렌더링 유형 지원)

### 네비게이션
- **Tabs** - 탭 인터페이스 (default, scroll, swiper 타입, showContent prop으로 탭 UI만 표시 가능)
- **Pagination** - 페이지네이션
- **Accordion** - 아코디언 (exclusive, independent 타입)
- **BottomDock** - 하단 돗바

### 피드백
- **Toast** - 토스트 알림 (빈 메시지일 때 자동으로 렌더링하지 않음, 조건부 렌더링 강화)
- **Tooltip** - 툴팁
- **Popup** - 팝업 (기본: Swiper 캐러셀 지원 / 시트: 드래그로 닫기 / 풀스크린: showHeaderClose, showBottomClose props로 3가지 타입 지원)

### 미디어
- **Image** - 이미지 컴포넌트 (에러 처리, 비율 자동 판단, fallback 이미지 지원)
- **Carousel** - 캐러셀 (Swiper 기반, 단일 슬라이드 시 no-swiper 클래스, lazy loading)
- **Lottie** - Lottie 애니메이션

### 상태 & 로딩
- **Loading** - 로딩 인디케이터
- **Skeleton** - 스켈레톤 로딩
- **SkeletonPlaceholder** - 스켈레톤 플레이스홀더
- **LoadingGrid** - 그리드 로딩 인디케이터
- **Badge** - 뱃지 (다양한 variant, size, outlined)
- **EmptyState** - 빈 상태 UI
- **ErrorState** - 에러 상태 UI (error, nodata, network, notfound)

### 기타 UI
- **Button** - 버튼 (Primary, Secondary, Ghost, Small/Medium/Large, Disabled)
- **Toggle** - 토글 스위치
- **Dropdown** - 드롭다운
- **DatePicker** - 날짜 선택 (닫기 버튼, 자동 닫기 제거)
- **Table** - 테이블 (가로 스크롤·열 고정 / 세로 스크롤·헤더 고정 3개 컬럼 / 가로·세로 스크롤·헤더&열 고정)
- **Form** - 폼 요소 (유효성 검사 포함, Button 컴포넌트 사용)
- **DragDropList** - 드래그앤드랍 리스트
- **ListSync** - 리스트 동기화
- **Icon** - 아이콘 컴포넌트 (이모지, SVG, 텍스트 지원, 크기/색상 옵션, 모바일/태블릿에서 한 줄 표시)
- **Typography** - 타이포그래피 컴포넌트 (제목, 본문, 캡션, 오버라인, H1-H6 명확한 크기/간격 차이)
- **Color** - 컬러 시스템 컴포넌트 (브랜드 컬러, 상태 컬러, 테마 비교)
- **Spacing** - 간격 시스템 컴포넌트 (간격 토큰, 사용 예시, 빈 공간 없이 채움)
- **Layout** - 레이아웃 컴포넌트 (컨테이너 폭, 그리드 시스템, 12컬럼 동일 너비, 화면 넘침 방지)
- **LoadingGrid** - 그리드 로딩 인디케이터
- **DataList** - API 데이터 리스트 컴포넌트 (목업 API를 통해 데이터를 가져와서 리스트 형태로 표시, 로딩/에러/빈 상태 자동 처리, Card/List/ListItem/Badge/Button 등 다양한 렌더링 유형 지원, 그리드 레이아웃 지원)

자세한 사용법은 `PublishingGuidePage`에서 확인할 수 있습니다.

## 📋 체크리스트

새 페이지를 만들 때 확인할 사항:

- [ ] `src/pages/YourPage/` 폴더 생성
- [ ] `YourPage.tsx` 파일 생성 (기본 구조 작성, TypeScript 사용)
- [ ] `YourPage.scss` 파일 생성 (스타일 작성)
- [ ] `App.tsx`에 페이지 등록 (React Router 사용)
- [ ] 로딩 상태 처리 (Skeleton 또는 Loading 컴포넌트)
- [ ] 에러 상태 처리
- [ ] 반응형 디자인 적용
- [ ] 접근성 고려 (aria-label, semantic HTML)
- [ ] 다크모드 대응 (CSS 변수 사용)

## 💡 팁

1. **기존 페이지 참고**: `SamplePage` 또는 `PublishingGuidePage`를 참고하세요
2. **컴포넌트 재사용**: 기존 컴포넌트를 최대한 활용하세요
3. **스타일 일관성**: `px()` 믹스인과 CSS 변수를 사용하세요
4. **접근성**: 키보드 네비게이션, 스크린 리더 지원을 고려하세요
5. **TypeScript 사용**: 모든 컴포넌트는 TypeScript로 작성하며, 타입을 명시하세요
6. **새로운 페이지 예시**: `ReportPage`, `SearchSamplePage`, `LoginPage`를 참고하세요

