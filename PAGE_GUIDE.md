# 모바일 웹 페이지 개발 가이드

## 📋 목차
1. [프로젝트 구조](#프로젝트-구조)
2. [템플릿 사용법](#템플릿-사용법)
3. [SCSS 믹스인 사용법](#scss-믹스인-사용법)
4. [접근성 도우미 사용법](#접근성-도우미-사용법)
5. [접근성 체크리스트](#접근성-체크리스트)
6. [다크모드 & 큰글씨 모드](#다크모드--큰글씨-모드)
7. [사용 가능한 컴포넌트](#사용-가능한-컴포넌트)

---

## 프로젝트 구조

```
src/
├── components/
│   ├── AccessibilityHelper/    # 오른쪽 고정 접근성 도우미 컴포넌트
│   │   ├── AccessibilityHelper.tsx
│   │   └── AccessibilityHelper.scss
│   ├── ScrollTop/               # 스크롤 탑 버튼 컴포넌트
│   │   ├── ScrollTop.tsx
│   │   └── ScrollTop.scss
│   └── PageTemplate/            # 페이지 템플릿 컴포넌트
│       ├── PageTemplate.tsx
│       └── PageTemplate.scss
├── pages/
│   ├── ReportPage/              # 보고 작성 페이지
│   │   ├── ReportPage.tsx
│   │   └── ReportPage.scss
│   ├── SearchSamplePage/        # 검색 샘플 페이지
│   │   ├── SearchSamplePage.tsx
│   │   └── SearchSamplePage.scss
│   ├── LoginPage/               # 로그인 페이지
│   │   ├── LoginPage.tsx
│   │   └── LoginPage.scss
│   ├── SendCardPage/            # 카드 보내기 페이지
│   │   ├── SendCardPage.tsx
│   │   └── SendCardPage.scss
│   ├── ReceivedCardPage/        # 받은 카드 페이지
│   │   ├── ReceivedCardPage.tsx
│   │   └── ReceivedCardPage.scss
│   └── ExamplePage/             # 예시 페이지
│       ├── ExamplePage.tsx
│       └── ExamplePage.scss
├── styles/
│   ├── _variables.scss          # CSS 변수 (다크모드, 폰트 스케일)
│   ├── _mixins.scss             # SCSS 믹스인 (px)
│   ├── _base.scss               # 기본 스타일
│   └── index.scss               # 스타일 통합 파일
├── App.tsx                      # 메인 앱 컴포넌트 (React Router 사용)
└── index.tsx                    # 진입점
```

---

## 템플릿 사용법

새로운 페이지를 만들 때는 `PageTemplate` 컴포넌트를 사용하세요.

```tsx
import PageTemplate from "../../components/PageTemplate/PageTemplate";

const MyPage = () => {
  return (
    <PageTemplate title="내 페이지 제목">
      {/* 페이지 내용 */}
    </PageTemplate>
  );
};

export default MyPage;
```

`PageTemplate`은 다음 기능을 제공합니다:
- ✅ 다크모드 자동 감지 및 적용 (localStorage 저장)
- ✅ 큰글씨 모드 지원 (작게, 보통, 크게, 아주 크게) - 메인 컨텐츠 영역에만 적용
- ✅ 오른쪽 접근성 도우미 자동 포함
- ✅ 반응형 최대 너비 설정 (1200px)
- ✅ FOUC 방지 (초기 로드 시 깜빡임 없음)

---

## SCSS 믹스인 사용법

### px 믹스인

피그마에서 가져온 픽셀 값을 그대로 사용하면 자동으로 rem 단위로 변환됩니다.

#### 기본 사용법 (px() 함수)

```scss
.my-element {
  padding: px(20);              // 20px → 1.25rem
  margin: px(16);               // 16px → 1rem
  font-size: px(14);            // 14px → 0.875rem
}
```

#### 믹스인 사용법 (@include px)

```scss
.my-element {
  @include px(font-size, 16);        // 16px → 1rem
  @include px(padding, 20);          // 20px → 1.25rem
  @include px(margin, 12);          // 12px → 0.75rem
}
```

#### max-width 설정

```scss
.container {
  @include px(max-width, 1200);      // max-width: 75rem
}
```

#### 여러 속성 동시 설정

```scss
.card {
  padding: px(20);
  margin-bottom: px(24);
  border-radius: px(8);
}
```

또는

```scss
.card {
  @include px(padding, 20);
  @include px(margin-bottom, 24);
  @include px(border-radius, 8);
}
```

#### 매개변수 설명

**px() 함수:**
- `$value`: 피그마에서 가져온 픽셀 값 (숫자만 입력)
- `$base`: (선택) 기준 픽셀 값, 기본값 16px

**@include px 믹스인:**
- `$property`: CSS 속성명 (font-size, padding, margin 등)
- `$value`: 피그마에서 가져온 픽셀 값 (숫자만 입력)
- `$max`: (선택) 최대값 설정 시 사용
- `$base`: (선택) 기준 픽셀 값, 기본값 16px

---

## 접근성 도우미 사용법

모든 페이지에는 **오른쪽에 고정된** 접근성 도우미가 자동으로 포함됩니다.

### 위치 및 동작

- 오른쪽 중앙에 고정
- 토글 버튼 클릭 시 패널이 슬라이드 인/아웃
- 큰글씨 모드 제외 (항상 고정 크기 유지)

### 기능

1. **접근성 설정**
   - 다크모드 토글 (라이트/다크)
   - 큰글씨 모드 선택 (작게/보통/크게/아주 크게)

2. **접근성 체크리스트**
   - 페이지 코딩 시 체크할 항목들
   - 실시간으로 체크박스로 관리 가능

### 접근성 도우미 열기/닫기

- 오른쪽의 "옵션" 버튼을 클릭하면 패널이 열립니다
- 다시 클릭하면 닫힙니다
- 패널은 항상 DOM에 유지되며, CSS로만 보이기/숨기기를 처리합니다
- 열릴 때와 닫힐 때 toggle 버튼과 panel이 동시에 애니메이션됩니다
- 닫힐 때는 오른쪽으로 슬라이드 아웃한 후 visibility가 hidden 처리됩니다

---

## 접근성 체크리스트

페이지 코딩 시 다음 항목들을 확인하세요:

- [ ] **색상 대비 비율 4.5:1 이상**
  - 텍스트와 배경색의 대비가 충분한지 확인
  - 다크모드에서도 대비 확인

- [ ] **최소 폰트 크기 14px 이상**
  - 본문 텍스트는 최소 14px 유지
  - 큰글씨 모드에서도 가독성 확인

- [ ] **키보드 포커스 표시 명확**
  - 모든 인터랙티브 요소에 포커스 스타일 적용
  - `:focus` 상태에서 명확한 시각적 표시

- [ ] **이미지 alt 텍스트 제공**
  - 모든 `<img>` 태그에 `alt` 속성 추가
  - 장식용 이미지는 `alt=""` 사용

- [ ] **ARIA 레이블 적절히 사용**
  - 버튼, 링크에 명확한 레이블
  - 복잡한 UI는 `aria-label`, `aria-labelledby` 사용

- [ ] **시맨틱 HTML 태그 사용**
  - `<header>`, `<main>`, `<section>`, `<article>` 등 적절히 사용
  - `<div>` 남용 지양

---

## 다크모드 & 큰글씨 모드

### 다크모드

시스템 설정을 자동으로 감지하며, 사용자가 수동으로 전환할 수 있습니다.

```scss
// CSS 변수로 자동 적용
.my-element {
  color: var(--color-text);        // 다크모드에 따라 자동 변경
  background: var(--color-card);    // 다크모드에 따라 자동 변경
}
```

### 큰글씨 모드

4가지 크기 옵션 제공:
- **작게**: 0.92배
- **보통**: 1배 (기본값)
- **크게**: 1.16배
- **아주 크게**: 1.3배

#### 적용 범위

큰글씨 모드는 **메인 컨텐츠 영역에만 적용**됩니다:
- ✅ `PageTemplate`의 `main` 영역 (`.font-scale-applied` 클래스 자동 적용)
- ❌ 헤더 영역 (제외)
- ❌ 접근성 도우미 (제외)

#### 다른 엘리먼트에 적용하려면

```jsx
<div className="font-scale-applied">
  {/* 이 영역의 텍스트만 큰글씨 모드 적용 */}
</div>
```

또는

```jsx
<div data-font-scale-applied>
  {/* 이 영역의 텍스트만 큰글씨 모드 적용 */}
</div>
```

#### CSS 변수

폰트 크기는 `--font-scale` 변수를 통해 자동으로 조정됩니다.

```scss
.font-scale-applied {
  font-size: calc(1rem * var(--font-scale));
  
  * {
    font-size: inherit;  // 하위 모든 요소에 상속
  }
}
```

---

## CSS 변수 목록

### 색상 변수

```scss
--color-bg          // 배경색
--color-card        // 카드 배경색
--color-text        // 텍스트 색상
--color-muted       // 보조 텍스트 색상
--color-accent      // 강조 색상
--color-border      // 테두리 색상
```

### 기타 변수

```scss
--font-scale        // 폰트 스케일 (큰글씨 모드)
--shadow-soft       // 부드러운 그림자
```

---

## 사용 가능한 컴포넌트

프로젝트에 이미 구현된 컴포넌트들을 활용하세요. 자세한 사용법은 `PublishingGuidePage`에서 확인할 수 있습니다.

### 레이아웃
- **Header** - 모바일 헤더 (메인 헤더: 햄버거 메뉴 / 서브 헤더: 뒤로가기, 카테고리명, 유틸리티 버튼, `sticky` prop으로 sticky 위치 지정 가능)
- **Footer** - 푸터
- **PageTemplate** - 페이지 템플릿 (다크모드, 폰트 스케일 지원)
- **ListContainer** - 리스트 컨테이너 (section/article 태그 기반)
- **ScrollTop** - 스크롤 탑 버튼 (스크롤 시 나타나는 상단 이동 버튼, `showAfter`, `smooth` props 지원)

### 입력 컴포넌트
- **Input** - 텍스트 입력 (text, password, number, tel, email, 자동 하이픈 포맷팅)
- **Select** - 셀렉트 박스
- **Textarea** - 여러 줄 텍스트 입력 (바이트 카운터 지원, 한글 2바이트/영문 1바이트 계산, `maxByte`, `showByteCounter` props)
- **FileUpload** - 파일 업로드 (이미지 미리보기, 무제한 업로드, 가로 스크롤, 이미지 파일 타입 검증 강화, .ico 파일 제외)
- **SearchField** - 검색 필드 (검색 아이콘, 클리어 버튼)

### 선택 컴포넌트
- **Checkbox** - 체크박스 (단일/그룹)
- **Radio** - 라디오 버튼 (단일/그룹)

### 리스트 & 카드
- **Card** - 카드 컴포넌트 (상품 카드, 콘텐츠 카드)
- **List / ListItem** - 리스트 컴포넌트 (텍스트 리스트, 아이콘 리스트)
- **ListContainer** - 리스트 컨테이너 (section/article 태그 기반)
- **Notice** - 공지사항 리스트 (링크 지원)
- **DataList** - API 데이터 리스트 컴포넌트 (목업 API를 통해 데이터를 가져와서 리스트 형태로 표시, 로딩/에러/빈 상태 자동 처리, Card/List/Table 등 다양한 렌더링 유형 지원)

### 네비게이션
- **Tabs** - 탭 인터페이스 (default, scroll, swiper 타입, showContent prop으로 탭 UI만 표시 가능)
- **Pagination** - 페이지네이션
- **Accordion** - 아코디언 (exclusive, independent 타입)
- **BottomDock** - 하단 돗바

### 피드백
- **Toast** - 토스트 알림 (빈 메시지일 때 자동으로 렌더링하지 않음, 조건부 렌더링 강화)
- **Tooltip** - 툴팁
- **Popup** - 팝업 (기본: Swiper 캐러셀 지원 / 시트: 드래그로 닫기 / 풀스크린: showHeaderClose, showBottomClose props로 3가지 타입 지원)
  - **ImageZoomPopup** - 이미지 확대 팝업 (Swiper 기반, 핀치 줌/더블 탭 줌 지원, 확대 시 페이지네이션 및 네비게이션 버튼 자동 숨김, 줌 해제 시 부드러운 위치 복원, 이미지가 컨테이너를 꽉 채우도록 최적화, 배지 스타일 페이지네이션)

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
- **DayPicker** - 날짜 선택 컴포넌트 (react-day-picker 기반, 단일/범위 선택 지원, 한국어 로케일 지원)
- **Table** - 테이블 (가로 스크롤·열 고정 / 세로 스크롤·헤더 고정 3개 컬럼 / 가로·세로 스크롤·헤더&열 고정)
- **Form** - 폼 요소 (유효성 검사 포함, Button 컴포넌트 사용)
- **DragDropList** - 드래그앤드랍 리스트
- **ListSync** - 리스트 동기화
- **Icon** - 아이콘 컴포넌트 (이모지, SVG, 텍스트 지원, 크기/색상 옵션, 모바일/태블릿에서 한 줄 표시)
- **Typography** - 타이포그래피 컴포넌트 (제목, 본문, 캡션, 오버라인, H1-H6 명확한 크기/간격 차이, 7가지 글자 굵기 옵션: light, normal, medium, semibold, bold, extrabold, black)
- **Color** - 컬러 시스템 컴포넌트 (브랜드 컬러, 상태 컬러, 테마 비교)
- **Spacing** - 간격 시스템 컴포넌트 (간격 토큰, 사용 예시, 빈 공간 없이 채움)
- **Layout** - 레이아웃 컴포넌트 (컨테이너 폭, 그리드 시스템, 12컬럼 동일 너비, 화면 넘침 방지)
- **LoadingGrid** - 그리드 로딩 인디케이터

---

## 예시 페이지

`src/pages/ExamplePage/ExamplePage.js` 파일을 참고하여 새로운 페이지를 만들 수 있습니다.

예시 페이지에는 다음이 포함되어 있습니다:
- 템플릿 사용 예시
- SCSS 믹스인 사용 예시
- 접근성 도우미 동작 확인

자세한 컴포넌트 사용 예시는 `PublishingGuidePage`에서 확인할 수 있습니다.

---

## 개발 팁

1. **피그마 수치값 그대로 사용**
   - 믹스인에 픽셀 값만 입력하면 자동 변환
   - 계산 불필요

2. **접근성 도우미 활용**
   - 코딩 중간중간 체크리스트 확인
   - 다크모드와 큰글씨 모드에서 테스트

3. **CSS 변수 활용**
   - 하드코딩 지양
   - 변수를 사용하여 일관성 유지

4. **반응형 고려**
   - 모바일 우선 설계
   - max-width로 최대 너비 제한

---

## 문의

프로젝트 관련 문의사항이 있으면 팀에 공유해주세요.

