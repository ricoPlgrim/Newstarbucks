# 페이지 생성 가이드

## 📁 프로젝트 구조

```
src/
├── pages/              # 페이지 컴포넌트
│   ├── YourPage/
│   │   ├── YourPage.js
│   │   └── YourPage.scss
├── components/         # 재사용 가능한 컴포넌트
│   ├── PageTemplate/  # 페이지 레이아웃 템플릿 (다크모드, 폰트 스케일)
│   ├── Header/        # 헤더 컴포넌트
│   ├── Footer/        # 푸터 컴포넌트
│   └── ...            # 기타 컴포넌트들
├── styles/            # 전역 스타일
│   ├── _variables.scss  # CSS 변수
│   ├── _mixins.scss    # SCSS 믹스인 (px-to-rem 등)
│   ├── _utilities.scss # 유틸리티 클래스
│   └── _base.scss      # 기본 스타일
└── mocks/             # 목업 데이터
```

## 🎯 페이지 생성 기준

### ⭐ **기본 퍼블리싱 템플릿: SamplePage.js**

**새 페이지를 만들 때는 `SamplePage.js`를 복사해서 사용하세요!**

이 파일은 기본적인 퍼블리싱 구조를 포함하고 있습니다:
- Header 컴포넌트
- 히어로 섹션 (메인 비주얼 영역)
- 콘텐츠 섹션 (그리드 레이아웃)
- CTA 섹션 (행동 유도 영역)
- 로딩/에러 상태 처리 예시

```jsx
import Header from "../../components/Header/Header";
import "./YourPage.scss";

function YourPage() {
  return (
    <div className="your-page">
      <Header currentPage="your-page" onPageChange={() => {}} />
      
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
}

export default YourPage;
```

### 2. **PageTemplate 사용 (접근성 기능 필요 시)**

다크모드, 폰트 스케일 등 접근성 기능이 필요한 경우

**예시**: `PublishingGuidePage`, `PublishingUrlPage`, `ExamplePage`

```jsx
import PageTemplate from "../../components/PageTemplate/PageTemplate";
import "./YourPage.scss";

function YourPage() {
  return (
    <PageTemplate title="페이지 제목">
      <div className="your-page">
        {/* 페이지 내용 */}
      </div>
    </PageTemplate>
  );
}

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
├── YourPage.js
└── YourPage.scss
```

### Step 2: 기본 페이지 구조 작성

**SamplePage.js를 복사하여 YourPage.js 생성 후 수정:**

```jsx
import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import "./YourPage.scss";
// import { fetchMockData } from "../../mocks/mockData"; // 필요시 주석 해제

function YourPage() {
  // 상태 관리 (필요시)
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
  // px-to-rem 변환 (피그마 수치값 그대로 사용)
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

- **Header** - 모바일 헤더 (햄버거 메뉴)
- **Footer** - 푸터
- **Button** - 버튼 (Primary, Secondary, Ghost)
- **FormSample** - 폼 요소
- **TableDemo** - 테이블
- **Carousel** - 캐러셀
- **Tabs** - 탭
- **Dropdown** - 드롭다운
- **Toast** - 토스트 알림
- **Popup** - 팝업
- **DatePicker** - 날짜 선택
- **Toggle** - 토글 스위치
- **Loading** - 로딩 인디케이터
- **Skeleton** - 스켈레톤 로딩
- **Lottie** - Lottie 애니메이션
- **Image** - 이미지 (에러 처리 포함)
- **Tooltip** - 툴팁
- **DragDropList** - 드래그앤드랍 리스트
- **BottomDock** - 하단 돗바
- **ListSync** - 리스트 동기화

자세한 사용법은 `PublishingGuidePage`에서 확인할 수 있습니다.

## 📋 체크리스트

새 페이지를 만들 때 확인할 사항:

- [ ] `src/pages/YourPage/` 폴더 생성
- [ ] `YourPage.js` 파일 생성 (기본 구조 작성)
- [ ] `YourPage.scss` 파일 생성 (스타일 작성)
- [ ] `App.js`에 페이지 등록
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

