# 모바일 웹 페이지 개발 가이드

## 📋 목차
1. [프로젝트 구조](#프로젝트-구조)
2. [템플릿 사용법](#템플릿-사용법)
3. [SCSS 믹스인 사용법](#scss-믹스인-사용법)
4. [접근성 도우미 사용법](#접근성-도우미-사용법)
5. [접근성 체크리스트](#접근성-체크리스트)
6. [다크모드 & 큰글씨 모드](#다크모드--큰글씨-모드)

---

## 프로젝트 구조

```
src/
├── components/
│   ├── AccessibilityHelper/    # 오른쪽 고정 접근성 도우미 컴포넌트
│   │   ├── AccessibilityHelper.js
│   │   └── AccessibilityHelper.scss
│   └── PageTemplate/            # 페이지 템플릿 컴포넌트
│       ├── PageTemplate.js
│       └── PageTemplate.scss
├── pages/
│   └── ExamplePage/             # 예시 페이지
│       ├── ExamplePage.js
│       └── ExamplePage.scss
├── styles/
│   ├── _variables.scss          # CSS 변수 (다크모드, 폰트 스케일)
│   ├── _mixins.scss             # SCSS 믹스인 (px-to-rem)
│   ├── _base.scss               # 기본 스타일
│   └── index.scss               # 스타일 통합 파일
├── App.js                       # 메인 앱 컴포넌트
└── index.js                     # 진입점
```

---

## 템플릿 사용법

새로운 페이지를 만들 때는 `PageTemplate` 컴포넌트를 사용하세요.

```jsx
import PageTemplate from "../../components/PageTemplate/PageTemplate";

function MyPage() {
  return (
    <PageTemplate title="내 페이지 제목">
      {/* 페이지 내용 */}
    </PageTemplate>
  );
}
```

`PageTemplate`은 다음 기능을 제공합니다:
- ✅ 다크모드 자동 감지 및 적용 (localStorage 저장)
- ✅ 큰글씨 모드 지원 (작게, 보통, 크게, 아주 크게) - 메인 컨텐츠 영역에만 적용
- ✅ 오른쪽 접근성 도우미 자동 포함
- ✅ 반응형 최대 너비 설정 (1200px)
- ✅ FOUC 방지 (초기 로드 시 깜빡임 없음)

---

## SCSS 믹스인 사용법

### px-to-rem 믹스인

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

#### 여러 속성 동시 설정

```scss
.card {
  @include px-to-rem(padding, 20, 16);
  @include px-to-rem(margin-bottom, 24, 16);
  @include px-to-rem(border-radius, 8, 16);
}
```

#### 매개변수 설명

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

3. **사용법 가이드**
   - px-to-rem 믹스인 사용법
   - 접근성 체크 포인트

### 접근성 도우미 열기/닫기

- 오른쪽의 "접근성 도우미" 버튼을 클릭하면 패널이 열립니다
- 다시 클릭하면 닫힙니다

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

## 예시 페이지

`src/pages/ExamplePage/ExamplePage.js` 파일을 참고하여 새로운 페이지를 만들 수 있습니다.

예시 페이지에는 다음이 포함되어 있습니다:
- 템플릿 사용 예시
- SCSS 믹스인 사용 예시
- 접근성 도우미 동작 확인

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

