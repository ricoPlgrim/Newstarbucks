# 모바일 웹 프로젝트 - 접근성 중심 React 앱

모바일 웹을 위한 React 프로젝트로, **다크모드**와 **큰글씨 모드**를 핵심 기능으로 제공하며, 접근성을 최우선으로 고려한 프로젝트입니다.

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
- **SCSS/Sass**: 모듈화된 스타일 시스템
- **Create React App**: 빠른 개발 환경 설정

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

프로덕션 빌드가 `build` 폴더에 생성됩니다.

---

## 프로젝트 구조

```
stabucks/
├── public/
│   └── index.html              # HTML 템플릿 (초기 테마 설정 포함)
├── src/
│   ├── components/
│   │   ├── AccessibilityHelper/    # 접근성 도우미 컴포넌트
│   │   │   ├── AccessibilityHelper.js
│   │   │   └── AccessibilityHelper.scss
│   │   └── PageTemplate/            # 페이지 템플릿 컴포넌트
│   │       ├── PageTemplate.js
│   │       └── PageTemplate.scss
│   ├── pages/
│   │   └── ExamplePage/             # 예시 페이지
│   │       ├── ExamplePage.js
│   │       └── ExamplePage.scss
│   ├── styles/
│   │   ├── _variables.scss          # CSS 변수 정의
│   │   ├── _mixins.scss             # SCSS 믹스인 (px-to-rem)
│   │   ├── _base.scss               # 기본 스타일
│   │   └── index.scss               # 스타일 통합 파일
│   ├── App.js                       # 메인 앱 컴포넌트
│   └── index.js                     # 진입점
├── PAGE_GUIDE.md                    # 페이지 개발 가이드
└── README.md                        # 프로젝트 문서 (현재 파일)
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

```jsx
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

```jsx
// PageTemplate의 main 영역에 자동으로 .font-scale-applied 클래스 적용
<PageTemplate title="제목">
  {/* 이 영역의 텍스트만 큰글씨 모드 적용 */}
</PageTemplate>
```

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

```jsx
import PageTemplate from "../../components/PageTemplate/PageTemplate";

function MyPage() {
  return (
    <PageTemplate title="페이지 제목">
      <section>
        <h2>섹션 제목</h2>
        <p>페이지 내용</p>
      </section>
    </PageTemplate>
  );
}
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
- ✅ 사용법 가이드 (px-to-rem 믹스인, 접근성 체크 포인트)

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

---

## 스타일 시스템

### SCSS 믹스인: px-to-rem

피그마에서 가져온 픽셀 값을 그대로 사용하면 자동으로 rem 단위로 변환됩니다.

#### 기본 사용법

```scss
.my-element {
  @include px-to-rem(font-size, 16);        // 16px → 1rem
  @include px-to-rem(padding, 20);          // 20px → 1.25rem
  @include px-to-rem(margin, 12, 16);       // 12px → 0.75rem (기준값 16px)
}
```

#### max-width 설정

```scss
.container {
  @include px-to-rem(max-width, 1200, 16);  // max-width: 75rem
}
```

#### 매개변수

| 매개변수 | Type | 기본값 | 설명 |
|----------|------|--------|------|
| `$property` | `string` | - | CSS 속성명 (필수) |
| `$value` | `number` | - | 피그마 픽셀 값 (필수) |
| `$max` | `number` | `null` | 최대값 설정 (선택) |
| `$base` | `number` | `16` | 기준 픽셀 값 (선택) |

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

```jsx
// src/pages/MyPage/MyPage.js
import PageTemplate from "../../components/PageTemplate/PageTemplate";
import "./MyPage.scss";

function MyPage() {
  return (
    <PageTemplate title="내 페이지">
      <section className="my-section">
        <h2>제목</h2>
        <p>내용</p>
      </section>
    </PageTemplate>
  );
}

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

## 예시 페이지

`src/pages/ExamplePage/` 폴더에 예시 페이지가 포함되어 있습니다.

### 포함된 예시

- ✅ 템플릿 사용법
- ✅ SCSS 믹스인 사용법
- ✅ 다크모드 테스트
- ✅ 큰글씨 모드 테스트
- ✅ 접근성 도우미 동작 확인

---

## 추가 문서

- [PAGE_GUIDE.md](./PAGE_GUIDE.md): 페이지 개발 상세 가이드

---

## 라이선스

이 프로젝트는 내부 사용을 위한 것입니다.

---

## 문의

프로젝트 관련 문의사항이 있으면 팀에 공유해주세요.
