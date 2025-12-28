# 모바일 웹 프로젝트 - 접근성 중심 React 앱

모바일 웹을 위한 **TypeScript + React** 프로젝트로, **다크모드**와 **큰글씨 모드**를 핵심 기능으로 제공하며, 접근성을 최우선으로 고려한 프로젝트입니다.

## 📋 목차

- [주요 기능](#주요-기능)
- [시작하기](#시작하기)
- [프로젝트 구조](#프로젝트-구조)
- [핵심 기능 상세](#핵심-기능-상세)
- [컴포넌트 가이드](#컴포넌트-가이드)
- [스타일 시스템](#스타일-시스템)
- [접근성 기능](#접근성-기능)
- [개발 가이드](#개발-가이드)

---

## 주요 기능

### ✨ 핵심 기능

- 🌓 **다크모드**: 시스템 설정 자동 감지 및 수동 전환, localStorage 저장
- 📏 **큰글씨 모드**: 작게/보통/크게/아주 크게 4단계 제공
- 🎨 **SCSS 믹스인**: 피그마 수치값을 그대로 사용하여 자동 rem 변환
- ♿ **접근성 도우미**: 오른쪽 고정 패널로 실시간 접근성 체크
- 📱 **모바일 최적화**: 반응형 디자인 및 모바일 우선 설계

### 🛠 기술 스택

- **React 19.2.0**: 최신 React 기능 활용
- **TypeScript**: 타입 안정성 제공
- **SCSS/Sass**: 모듈화된 스타일 시스템
- **Create React App**: 빠른 개발 환경 설정
- **React Router**: 페이지 라우팅
- **react-day-picker**: 날짜 선택 컴포넌트

---

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm start
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열면 앱을 확인할 수 있습니다.

### 빌드

```bash
npm run build
```

프로덕션 빌드가 `docs` 폴더에 생성됩니다. (GitHub Pages 배포용)

### 빌드 시간 분석

빌드 시 어떤 파일이나 로더가 오래 걸리는지 확인하려면:

```bash
npm run build:analyze
```

이 명령어는 다음 정보를 제공합니다:
- 각 로더(loader)의 실행 시간
- 각 플러그인(plugin)의 실행 시간
- 가장 오래 걸리는 상위 10개 파일
- 전체 빌드 시간

빌드 최적화 시 유용한 도구입니다.

---

## 프로젝트 구조

```
Newstarbucks/
├── public/
│   └── index.html                    # HTML 템플릿 (초기 테마 설정 포함)
├── src/
│   ├── components/                    # 재사용 가능한 컴포넌트
│   │   ├── AccessibilityHelper/      # 접근성 도우미 컴포넌트
│   │   ├── Accordion/                # 아코디언 컴포넌트
│   │   ├── Badge/                    # 뱃지 컴포넌트
│   │   ├── BorderAnimation/          # 보더 애니메이션 컴포넌트
│   │   ├── BottomDock/               # 하단 돗바 컴포넌트
│   │   ├── Button/                   # 버튼 컴포넌트
│   │   ├── Card/                     # 카드 컴포넌트
│   │   ├── Carousel/                 # 캐러셀 컴포넌트
│   │   ├── Checkbox/                 # 체크박스 컴포넌트
│   │   ├── Color/                    # 컬러 컴포넌트 (디자인 시스템)
│   │   ├── DatePicker/               # 날짜 선택 컴포넌트
│   │   ├── DataList/                 # API 데이터 리스트 컴포넌트
│   │   ├── DragDropList/             # 드래그앤드랍 리스트
│   │   ├── Dropdown/                 # 드롭다운 컴포넌트
│   │   ├── EmptyState/               # 빈 상태 UI
│   │   ├── ErrorState/               # 에러 상태 UI
│   │   ├── FileUpload/               # 파일 업로드 컴포넌트
│   │   ├── Footer/                   # 푸터 컴포넌트
│   │   ├── Form/                     # 폼 컴포넌트
│   │   ├── Header/                   # 헤더 컴포넌트 (메인/서브 헤더, sticky 지원)
│   │   ├── Icon/                     # 아이콘 컴포넌트
│   │   ├── Image/                    # 이미지 컴포넌트
│   │   ├── Input/                    # 입력 컴포넌트
│   │   ├── ScrollTop/                # 스크롤 탑 버튼 컴포넌트
│   │   ├── Layout/                   # 레이아웃 컴포넌트 (디자인 시스템)
│   │   ├── List/                     # 리스트 컴포넌트
│   │   ├── ListContainer/            # 리스트 컨테이너 컴포넌트
│   │   ├── ListSync/                 # 리스트 동기화 컴포넌트
│   │   ├── Loading/                  # 로딩 인디케이터
│   │   ├── LoadingGrid/              # 로딩 그리드
│   │   ├── Lottie/                   # Lottie 애니메이션
│   │   ├── Notice/                   # 공지사항 컴포넌트
│   │   ├── PageTemplate/             # 페이지 템플릿 컴포넌트
│   │   ├── Popup/                    # 팝업 컴포넌트
│   │   ├── Radio/                    # 라디오 버튼 컴포넌트
│   │   ├── SearchField/              # 검색 필드 컴포넌트
│   │   ├── Select/                   # 셀렉트 박스 컴포넌트
│   │   ├── Skeleton/                 # 스켈레톤 로딩 컴포넌트
│   │   ├── Spacing/                  # 스페이싱 컴포넌트 (디자인 시스템)
│   │   ├── Table/                    # 테이블 컴포넌트
│   │   ├── Tabs/                     # 탭 컴포넌트
│   │   ├── Textarea/                 # 텍스트 영역 컴포넌트
│   │   ├── Toast/                    # 토스트 알림 컴포넌트
│   │   ├── Toggle/                   # 토글 스위치 컴포넌트
│   │   ├── Tooltip/                  # 툴팁 컴포넌트
│   │   └── Typography/               # 타이포그래피 컴포넌트 (디자인 시스템)
│   ├── pages/                        # 페이지 컴포넌트
│   │   ├── AmericanoPage/            # 아메리카노 페이지
│   │   ├── PublishingGuidePage/      # 퍼블리싱 가이드 페이지
│   │   ├── PublishingUrlPage/        # 퍼블리싱 URL 관리 페이지
│   │   ├── ReportPage/                # 보고 작성 페이지
│   │   ├── SearchSamplePage/          # 검색 샘플 페이지
│   │   ├── LoginPage/                 # 로그인 페이지
│   │   └── SamplePage/                # 샘플 페이지
│   ├── styles/                       # 전역 스타일
│   │   ├── _variables.scss           # CSS 변수 정의 (다크모드, 색상 등)
│   │   ├── _mixins.scss              # SCSS 믹스인 (px-to-rem, 보더 애니메이션)
│   │   ├── _utilities.scss           # 유틸리티 클래스 (mt-10, pt-20 등)
│   │   ├── _base.scss                # 기본 스타일 (리셋, 기본 설정)
│   │   └── index.scss                 # 스타일 통합 파일
│   ├── App.tsx                       # 메인 앱 컴포넌트 (React Router 사용)
│   └── index.tsx                     # 진입점
├── PAGE_GUIDE.md                     # 페이지 개발 가이드
├── PAGE_CREATION_GUIDE.md            # 페이지 생성 가이드
└── README.md                         # 프로젝트 문서 (현재 파일)
```

---

## 핵심 기능 상세

### 🌓 다크모드

#### 자동 감지 및 저장
- 시스템 다크모드 설정을 자동으로 감지
- 사용자가 변경한 설정은 localStorage에 저장
- 페이지 새로고침 시에도 설정 유지
- FOUC(Flash of Unstyled Content) 방지: 초기 로드 시 깜빡임 없음

#### 사용법

```tsx
// PageTemplate을 사용하면 자동으로 다크모드 지원
<PageTemplate title="내 페이지">
  {/* 컨텐츠 */}
</PageTemplate>
```

#### CSS 변수 활용

```scss
.my-element {
  background: var(--color-card);    // 다크모드에 따라 자동 변경
  color: var(--color-text);         // 다크모드에 따라 자동 변경
  border: 1px solid var(--color-border);
}
```

### 📏 큰글씨 모드

#### 4단계 크기 옵션

| 옵션 | 배율 | 설명 |
|------|------|------|
| 작게 | 0.92배 | 기본보다 약간 작게 |
| 보통 | 1배 | 기본 크기 (기본값) |
| 크게 | 1.16배 | 기본보다 16% 크게 |
| 아주 크게 | 1.3배 | 기본보다 30% 크게 |

#### 특정 엘리먼트에만 적용

큰글씨 모드는 **메인 컨텐츠 영역에만 적용**되며, 헤더와 접근성 도우미는 제외됩니다.

```tsx
// PageTemplate의 main 영역에 자동으로 .font-scale-applied 클래스 적용
<PageTemplate title="제목">
  {/* 이 영역의 텍스트만 큰글씨 모드 적용 */}
</PageTemplate>
```

#### 다른 엘리먼트에 적용하려면

```tsx
<div className="font-scale-applied">
  {/* 이 영역의 텍스트만 큰글씨 모드 적용 */}
</div>
```

또는

```tsx
<div data-font-scale-applied>
  {/* 이 영역의 텍스트만 큰글씨 모드 적용 */}
</div>
```

---

## 컴포넌트 가이드

### PageTemplate

모든 페이지에서 사용하는 기본 템플릿 컴포넌트입니다.

#### 기능
- ✅ 다크모드 자동 감지 및 적용
- ✅ 큰글씨 모드 지원 (메인 컨텐츠 영역에만 적용)
- ✅ 오른쪽 접근성 도우미 자동 포함
- ✅ 반응형 최대 너비 설정 (1200px)
- ✅ localStorage에 설정 자동 저장

#### 사용법

```tsx
import PageTemplate from "../../components/PageTemplate/PageTemplate";

const MyPage = () => {
  return (
    <PageTemplate title="페이지 제목">
      <section>
        <h2>섹션 제목</h2>
        <p>페이지 내용</p>
      </section>
    </PageTemplate>
  );
};

export default MyPage;
```

#### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `title` | `string` | `"페이지 제목"` | 페이지 헤더에 표시될 제목 |
| `children` | `ReactNode` | - | 페이지 컨텐츠 |

### AccessibilityHelper

오른쪽에 고정되는 접근성 도우미 컴포넌트입니다.

#### 기능
- ✅ 다크모드 토글 (라이트/다크)
- ✅ 큰글씨 모드 선택 (작게/보통/크게/아주 크게)
- ✅ 접근성 체크리스트 (6개 항목)

#### 위치
- 오른쪽 중앙에 고정
- 토글 버튼 클릭 시 패널 슬라이드 인/아웃
- 큰글씨 모드 제외 (항상 고정 크기)

#### 접근성 체크리스트 항목

1. 색상 대비 비율 4.5:1 이상
2. 최소 폰트 크기 14px 이상
3. 키보드 포커스 표시 명확
4. 이미지 alt 텍스트 제공
5. ARIA 레이블 적절히 사용
6. 시맨틱 HTML 태그 사용

### 사용 가능한 컴포넌트 목록

프로젝트에 구현된 주요 컴포넌트들입니다. 자세한 사용법은 `PublishingGuidePage`에서 확인할 수 있습니다.

#### 디자인 시스템
- **Typography** - 타이포그래피 컴포넌트 (h1-h6, body, caption, overline, 다양한 size/weight/color 옵션, H1-H6 명확한 크기/간격 차이)
- **Color** - 컬러 컴포넌트 (브랜드 컬러, 상태 컬러, 다크모드 지원)
- **Spacing** - 스페이싱 컴포넌트 (간격 토큰 시각화 및 예제, 빈 공간 없이 채움)
- **Layout** - 레이아웃 컴포넌트 (컨테이너 폭, 그리드 시스템, 12컬럼 동일 너비, 화면 넘침 방지)
- **Icon** - 아이콘 컴포넌트 (이모지, SVG, 텍스트 지원, size/color 옵션, 모바일/태블릿에서 한 줄 표시)

#### 레이아웃
- **Header** - 모바일 헤더 (메인 헤더: 햄버거 메뉴, 3뎁스 메뉴 구조 / 서브 헤더: 뒤로가기, 카테고리명, 유틸리티 버튼, `sticky` prop으로 sticky 위치 지정 가능)
- **Footer** - 푸터
- **PageTemplate** - 페이지 템플릿 (다크모드, 폰트 스케일 지원)
- **ListContainer** - 리스트 컨테이너 (section/article 태그 기반, 제목/설명, bordered/divided 옵션)
- **ScrollTop** - 스크롤 탑 버튼 (스크롤 시 나타나는 상단 이동 버튼, `showAfter`, `smooth` props 지원)

#### 입력 컴포넌트
- **Input** - 텍스트 입력 (text, password, number, tel, email, validation states, help text, clear button, 자동 하이픈 포맷팅)
- **Select** - 셀렉트 박스 (native select with custom styling)
- **Textarea** - 여러 줄 텍스트 입력 (바이트 카운터 지원, 한글 2바이트/영문 1바이트 계산, `maxByte`, `showByteCounter` props)
- **FileUpload** - 파일 업로드 (이미지 미리보기, 무제한 업로드, 가로 스크롤, 이미지 파일 타입 검증 강화, .ico 파일 제외)
- **SearchField** - 검색 필드 (검색 아이콘, 클리어 버튼)

#### 선택 컴포넌트
- **Checkbox** - 체크박스 (단일/그룹 사용)
- **Radio** - 라디오 버튼 (단일/그룹 사용)

#### 리스트 & 카드
- **Card** - 카드 컴포넌트 (상품 카드, 콘텐츠 카드, hover 효과)
- **List / ListItem** - 리스트 컴포넌트 (텍스트 리스트, 아이콘 리스트)
- **ListContainer** - 리스트 컨테이너 (section/article 태그, 제목/설명, bordered/divided 옵션)
- **Notice** - 공지사항 리스트 (스켈레톤 로딩 지원, 링크 지원)
- **DataList** - API 데이터 리스트 컴포넌트 (목업 API를 통해 데이터를 가져와서 리스트 형태로 표시, 로딩/에러/빈 상태 자동 처리, Card/List/ListItem/Badge/Button 등 다양한 렌더링 유형 지원, 그리드 레이아웃 지원)

#### 네비게이션
- **Tabs** - 탭 인터페이스 (default, scroll, swiper 타입, 가운데 정렬, showContent prop으로 탭 UI만 표시 가능)
- **Pagination** - 페이지네이션
- **Accordion** - 아코디언 (exclusive, independent 타입)
- **BottomDock** - 하단 돗바

#### 피드백
- **Toast** - 토스트 알림 (빈 메시지일 때 자동으로 렌더링하지 않음, 조건부 렌더링 강화)
- **Tooltip** - 툴팁 (top, bottom, left, right placement)
- **Popup** - 팝업 (기본: Swiper 캐러셀 지원, lazy loading / 시트: 드래그로 닫기 / 풀스크린: showHeaderClose, showBottomClose props로 3가지 타입 지원)

#### 미디어
- **Image** - 이미지 컴포넌트 (에러 처리, 비율 자동 판단, landscape/portrait/square, fallback 이미지 지원)
- **Carousel** - 캐러셀 (Swiper 기반, 다양한 효과: fade, cube, coverflow, flip, multiple slides, 단일 슬라이드 시 no-swiper 클래스, lazy loading)
- **Lottie** - Lottie 애니메이션

#### 상태 & 로딩
- **Loading** - 로딩 인디케이터
- **Skeleton** - 스켈레톤 로딩
- **SkeletonPlaceholder** - 스켈레톤 플레이스홀더
- **Badge** - 뱃지 (다양한 variant, size, outlined)
- **EmptyState** - 빈 상태 UI (데이터 없을 때)
- **ErrorState** - 에러 상태 UI (error, nodata, network, notfound)

#### 버튼 & 토글
- **Button** - 버튼 (Primary, Secondary, Ghost variant, Small/Medium/Large size, disabled 상태, 아이콘 지원)
- **Toggle** - 토글 스위치
- **BorderAnimation** - 보더 애니메이션 (회전하는 그라데이션, 펄스, 그라데이션 효과)

#### 드롭다운 & 피커
- **Dropdown** - 드롭다운
- **DatePicker** - 날짜 선택 (단일/범위/다중 선택, 닫기 버튼, 자동 닫기 제거)

#### 기타 UI
- **Table** - 테이블 (가로 스크롤·열 고정 / 세로 스크롤·헤더 고정 3개 컬럼 / 가로·세로 스크롤·헤더&열 고정)
- **Form** - 폼 요소 (유효성 검사 포함, Button 컴포넌트 사용)
- **DragDropList** - 드래그앤드랍 리스트
- **ListSync** - 리스트 동기화

---

## 스타일 시스템

### SCSS 믹스인

#### px (px-to-rem 단축)

피그마에서 가져온 픽셀 값을 그대로 사용하면 자동으로 rem 단위로 변환됩니다.

##### 기본 사용법

```scss
.my-element {
  @include px(font-size, 16);        // 16px → 1rem
  @include px(padding, 20);          // 20px → 1.25rem
  @include px(margin, 12);           // 12px → 0.75rem
}
```

##### px() 함수 사용법

```scss
.my-element {
  padding: px(20);              // 20px → 1.25rem
  margin: px(16);               // 16px → 1rem
  font-size: px(14);            // 14px → 0.875rem
}
```

##### max-width 설정

```scss
.container {
  @include px(max-width, 1200);  // max-width: 75rem
}
```

##### 매개변수

| 매개변수 | Type | 기본값 | 설명 |
|----------|------|--------|------|
| `$property` | `string` | - | CSS 속성명 (필수) |
| `$value` | `number` | - | 피그마 픽셀 값 (필수) |
| `$max` | `number` | `null` | 최대값 설정 (선택) |
| `$base` | `number` | `16` | 기준 픽셀 값 (선택) |

#### 보더 애니메이션 Mixin

보더 애니메이션 효과를 위한 mixin을 제공합니다.

##### 회전하는 그라데이션 보더

```scss
.my-element {
  @include border-animation-rotate(3px, (#0c7c59, #4ade80, #10b981), 2s);
}
```

##### 펄스 보더

```scss
.my-element {
  @include border-animation-pulse(3px, #0c7c59, 1.5s);
}
```

##### 그라데이션 보더

```scss
.my-element {
  @include border-animation-gradient(3px, (#0c7c59, #4ade80), 2s);
}
```

##### 매개변수

| 매개변수 | Type | 기본값 | 설명 |
|----------|------|--------|------|
| `$border-width` | `number` | `2px` | 보더 두께 |
| `$colors` | `list` | - | 그라데이션 색상 배열 (rotate, gradient용) |
| `$color` | `color` | `#0c7c59` | 단일 색상 (pulse용) |
| `$duration` | `time` | `2s` 또는 `3s` | 애니메이션 지속 시간 |

### 유틸리티 클래스

간편하게 사용할 수 있는 마진/패딩 유틸리티 클래스를 제공합니다. 모든 값은 `px()` 함수를 통해 자동으로 rem 변환됩니다.

```scss
// 마진 유틸리티
.mt-10 { margin-top: 10px; }      // 상단 마진 10px
.mb-20 { margin-bottom: 20px; }   // 하단 마진 20px
.mx-30 { margin-left: 30px; margin-right: 30px; }  // 좌우 마진 30px

// 패딩 유틸리티
.pt-15 { padding-top: 15px; }     // 상단 패딩 15px
.pb-25 { padding-bottom: 25px; }  // 하단 패딩 25px
.px-40 { padding-left: 40px; padding-right: 40px; } // 좌우 패딩 40px
```

**사용 가능한 범위**: 10px ~ 100px (10px 단위)

### CSS 변수

#### 색상 변수

```scss
--color-bg          // 배경색
--color-card        // 카드 배경색
--color-text        // 텍스트 색상
--color-muted       // 보조 텍스트 색상
--color-accent      // 강조 색상 (#0c7c59)
--color-border      // 테두리 색상
```

#### 다크모드 색상

다크모드에서는 위 색상 변수들이 자동으로 변경됩니다:
- 배경색: `#111315`
- 카드 배경: `#1a1c1f`
- 텍스트: `#f8f8fa`
- 보조 텍스트: `#a5a7ac`

#### 기타 변수

```scss
--font-scale        // 폰트 스케일 (큰글씨 모드)
--shadow-soft       // 부드러운 그림자
```

### 큰글씨 모드 적용 방법

큰글씨 모드는 `.font-scale-applied` 클래스나 `[data-font-scale-applied]` 속성을 가진 엘리먼트에만 적용됩니다.

```scss
.font-scale-applied {
  font-size: calc(1rem * var(--font-scale));
  
  * {
    font-size: inherit;  // 하위 모든 요소에 상속
  }
}
```

---

## 접근성 기능

### 자동 적용되는 접근성 기능

1. **시맨틱 HTML**: `<header>`, `<main>`, `<section>` 등 적절한 태그 사용
2. **ARIA 레이블**: 버튼과 인터랙티브 요소에 적절한 레이블 제공
3. **키보드 접근성**: 모든 기능이 키보드로 접근 가능
4. **포커스 표시**: 명확한 포커스 스타일 제공
5. **색상 대비**: WCAG AA 기준 준수

### 접근성 도우미 활용

개발 중 접근성 도우미를 통해:
- ✅ 다크모드와 큰글씨 모드에서 테스트
- ✅ 체크리스트로 접근성 항목 확인
- ✅ 사용법 가이드 참고

---

## 개발 가이드

### 새 페이지 만들기

1. `src/pages/` 폴더에 새 페이지 폴더 생성
2. `PageTemplate` 컴포넌트 사용
3. SCSS 파일에서 `px-to-rem` 믹스인 활용

```tsx
// src/pages/MyPage/MyPage.tsx
import PageTemplate from "../../components/PageTemplate/PageTemplate";
import "./MyPage.scss";

const MyPage = () => {
  return (
    <PageTemplate title="내 페이지">
      <section className="my-section">
        <h2>제목</h2>
        <p>내용</p>
      </section>
    </PageTemplate>
  );
};

export default MyPage;
```

```scss
// src/pages/MyPage/MyPage.scss
@import "../../styles/index.scss";

.my-section {
  @include px-to-rem(padding, 20);
  
  h2 {
    @include px-to-rem(font-size, 24);
    @include px-to-rem(margin-bottom, 16);
    color: var(--color-text);
  }
  
  p {
    @include px-to-rem(font-size, 16);
    @include px-to-rem(line-height, 24);
    color: var(--color-text);
  }
}
```

### 스타일 작성 가이드

1. **피그마 수치값 그대로 사용**
   ```scss
   // ✅ 좋은 예
   @include px-to-rem(font-size, 16);
   
   // ❌ 나쁜 예
   font-size: 1rem;  // 직접 계산하지 말 것
   ```

2. **CSS 변수 활용**
   ```scss
   // ✅ 좋은 예
   color: var(--color-text);
   
   // ❌ 나쁜 예
   color: #1b1b1f;  // 하드코딩 지양
   ```

3. **큰글씨 모드 고려**
   - 메인 컨텐츠는 자동으로 적용됨
   - 헤더나 특정 요소는 `font-size: 1rem` 고정 가능

### 접근성 체크 포인트

페이지 개발 시 다음을 확인하세요:

- [ ] 모든 이미지에 `alt` 속성 추가
- [ ] 버튼과 링크에 명확한 레이블
- [ ] 키보드로 모든 기능 접근 가능
- [ ] 포커스 스타일 명확히 표시
- [ ] 색상 대비 비율 4.5:1 이상
- [ ] 다크모드에서도 가독성 확인
- [ ] 큰글씨 모드에서도 레이아웃 유지

---

## 설정 저장 및 복원

### localStorage 저장

다크모드와 큰글씨 모드 설정은 자동으로 localStorage에 저장됩니다:

- **키**: `accessibility-theme` (값: `"dark"` 또는 `"light"`)
- **키**: `accessibility-font-scale` (값: `"small"`, `"normal"`, `"large"`, `"xlarge"`)

### 초기 로드 시 적용

`public/index.html`에 인라인 스크립트가 포함되어 있어, React가 로드되기 전에 설정이 적용됩니다. 이를 통해 FOUC(깜빡임) 현상을 방지합니다.

---

## 포함된 페이지들

### PublishingGuidePage (퍼블리싱 가이드)
퍼블리싱을 위한 UI 컴포넌트 가이드 페이지입니다.

- 🎨 **레이아웃, 입력 컴포넌트, 선택 컴포넌트, 리스트 & 카드, 네비게이션, 피드백, 미디어, 상태 & 로딩, 기타 UI, API 데이터, 폼 예제** 카테고리별 컴포넌트 예시
- 💻 코드 예시와 실제 UI 미리보기 동시 표시
- 🎯 컴포넌트별 사용법 및 Props 설명
- 📱 반응형 디자인 및 인터랙션 예시
- ♿ 접근성 기능 포함 (다크모드, 큰글씨 모드)
- 📊 DataList 컴포넌트 유형별 예시 (Card 그리드, List/ListItem, Badge 포함 Card, Button 포함 Card, 아이콘 리스트)

### PublishingUrlPage (퍼블리싱 URL 관리)
퍼블리싱된 페이지들의 URL을 체계적으로 관리하는 페이지입니다.

- 📋 **뎁스1 ~ 뎁스4** 계층 구조로 URL 분류
- 🔗 URL 클릭 시 새 탭에서 열기
- 📊 깔끔한 테이블 레이아웃 (table-layout: fixed로 로딩 중/후 일관된 레이아웃 유지)
- 📱 모바일 반응형 디자인 (가로 스크롤, 컬럼 너비 최적화)
- ⏳ Loading 컴포넌트로 로딩 상태 표시 (가운데 정렬)

### ExamplePage (예시 페이지)
기본적인 사용법을 보여주는 예시 페이지입니다.

- ✅ 템플릿 사용법
- ✅ SCSS 믹스인 사용법
- ✅ 다크모드 테스트
- ✅ 큰글씨 모드 테스트
- ✅ 접근성 도우미 동작 확인

### SamplePage (샘플 페이지)
헤더/풋터와 공통 컴포넌트를 조합한 실사용 예시 페이지입니다.

- ✅ Header/공통 레이아웃 유지, 본문은 자유롭게 교체 가능
- ✅ 히어로/콘텐츠 그리드/CTA 예시 블록 제공
- ✅ 반응형 레이아웃

### ReportPage (보고 작성 페이지)
재해시설 보고서 작성 페이지입니다.

- ✅ 다양한 입력 필드 (응급조치, 발생매장, 발생시간, 발생장소, 영업가부, 재난피해)
- ✅ 파일 업로드 (사진 첨부)
- ✅ 날짜/시간 선택기 (react-day-picker 사용)
- ✅ 바이트 카운터가 있는 상세내용 입력
- ✅ 보고내용 미리보기 (선택한 항목 자동 표시)
- ✅ 서브 헤더 사용 (sticky 지원)

### SearchSamplePage (검색 샘플 페이지)
검색 기능을 보여주는 샘플 페이지입니다.

- ✅ 최근 검색어 관리 (localStorage 사용)
- ✅ 검색 결과 표시
- ✅ 연관검색어 표시
- ✅ 빈 검색 결과 처리 (EmptyState 컴포넌트)

### LoginPage (로그인 페이지)
사용자 로그인 페이지입니다.

- ✅ 아이디/비밀번호 입력
- ✅ 자동로그인 체크박스
- ✅ 이미지 로고 사용

---

## 추가 문서

- [PAGE_GUIDE.md](./PAGE_GUIDE.md): 페이지 개발 상세 가이드
- [PAGE_CREATION_GUIDE.md](./PAGE_CREATION_GUIDE.md): 페이지 생성 가이드 및 컴포넌트 목록

---

## 라이선스

이 프로젝트는 내부 사용을 위한 것입니다.

---

## 문의

프로젝트 관련 문의사항이 있으면 팀에 공유해주세요.
