import { useState } from "react";
import PageTemplate from "../../components/PageTemplate/PageTemplate";
import Image from "../../components/Image/Image";
import "./PublishingGuidePage.scss";

const LayoutPreview = () => (
  <div className="guide-preview guide-preview--grid">
    {Array.from({ length: 4 }).map((_, idx) => (
      <div key={idx} className="guide-preview__grid-item">
        {idx + 1}
      </div>
    ))}
  </div>
);

const IconPreview = () => {
  const [copiedIcon, setCopiedIcon] = useState(null);

  const icons = [
    { label: "알림", symbol: "🔔", className: "icon-notification" },
    { label: "즐겨찾기", symbol: "⭐", className: "icon-star" },
    { label: "설정", symbol: "⚙️", className: "icon-settings" },
  ];

  const copyToClipboard = async (className, iconLabel) => {
    try {
      await navigator.clipboard.writeText(className);
      setCopiedIcon(className);
      setTimeout(() => setCopiedIcon(null), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = className;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopiedIcon(className);
      setTimeout(() => setCopiedIcon(null), 2000);
    }
  };

  return (
    <div className="guide-preview guide-preview--icons">
      {icons.map((icon) => (
        <button
          key={icon.className}
          type="button"
          className={`icon-chip ${copiedIcon === icon.className ? "is-copied" : ""}`}
          aria-label={`${icon.label} 아이콘 복사`}
          onClick={() => copyToClipboard(icon.className, icon.label)}
        >
          <span className="icon-chip__symbol">{icon.symbol}</span>
          <span className="icon-chip__label">{icon.label}</span>
          {copiedIcon === icon.className && (
            <span className="icon-chip__copied" aria-live="polite">
              복사됨
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

const FormPreview = () => (
  <form className="guide-preview guide-preview--form">
    <label className="field">
      <span className="field__label">이메일</span>
      <input type="email" placeholder="name@example.com" />
      <small className="field__help">가입 시 사용한 이메일을 입력하세요.</small>
    </label>
    <label className="field">
      <span className="field__label">비밀번호</span>
      <input type="password" placeholder="••••••" />
      <small className="field__help is-error">8자 이상 입력해주세요.</small>
    </label>
  </form>
);

const ButtonPreview = () => (
  <div className="guide-preview guide-preview--buttons">
    <button type="button" className="btn btn--primary">
      Primary
    </button>
    <button type="button" className="btn btn--secondary">
      Secondary
    </button>
    <button type="button" className="btn btn--ghost">
      Ghost
    </button>
  </div>
);

const CardPreview = () => (
  <article className="guide-preview guide-preview--card">
    <p className="card__eyebrow">NEW</p>
    <h4>하이라이트 카드</h4>
    <p className="card__desc">
      퍼블리싱 가이드를 따르면, 컴포넌트 간 여백과 타이포가 일관되게 유지됩니다.
    </p>
  </article>
);

const TabPreview = () => {
  const tabItems = [
    {
      id: "detail",
      label: "상세",
      description: "상품 이미지, 설명, 원두 정보 등을 제공합니다.",
    },
    {
      id: "review",
      label: "리뷰",
      description: "구매자 후기와 평점을 정렬/필터링하여 보여줍니다.",
    },
    {
      id: "qa",
      label: "Q&A",
      description: "자주 묻는 질문과 답변을 탭 안에서 바로 확인할 수 있습니다.",
    },
  ];
  const [activeTab, setActiveTab] = useState(tabItems[0].id);
  const activeItem = tabItems.find((item) => item.id === activeTab);

  return (
    <div className="guide-preview guide-preview--tabs">
      <div className="guide-preview__tablist" role="tablist" aria-label="콘텐츠 탭 예시">
        {tabItems.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={activeTab === item.id}
            onClick={() => setActiveTab(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div
        className="guide-preview__tabpanel"
        role="tabpanel"
        aria-live="polite"
        aria-label={`${activeItem?.label} 탭 내용`}
      >
        {activeItem?.description}
      </div>
    </div>
  );
};

const ImagePreview = () => (
  <div className="guide-preview guide-preview--images">
    <div className="image-examples">
      {/* 정상 이미지 */}
      <div className="image-example">
        <h4>정상 이미지</h4>
        <Image
          src="https://picsum.photos/300/200"
          alt="가로형 이미지 예시"
          width="200"
          height="150"
        />
      </div>

      {/* 세로형 이미지 */}
      <div className="image-example">
        <h4>세로형 이미지</h4>
        <Image
          src="https://picsum.photos/200/300"
          alt="세로형 이미지 예시"
          width="150"
          height="200"
        />
      </div>

      {/* 정사각형 이미지 */}
      <div className="image-example">
        <h4>정사각형 이미지</h4>
        <Image
          src="https://picsum.photos/200/200"
          alt="정사각형 이미지 예시"
          width="150"
          height="150"
        />
      </div>

      {/* 로드 실패 이미지 */}
      <div className="image-example">
        <h4>noimage 이미지 (폴백)</h4>
        <Image
          src="https://invalid-url-that-will-fail.com/image.jpg"
          alt="로드 실패 이미지"
          width="150"
          height="150"
        />
      </div>
    </div>
  </div>
);

const guideSections = [
  {
    id: "layout",
    label: "레이아웃",
    title: "레이아웃 시스템",
    description:
      "12컬럼 기반 그리드를 모바일 해상도에 맞춰 재구성했습니다. `gap`과 `auto-fit`을 활용하면 카드 개수가 변해도 자연스럽게 줄바꿈됩니다.",
    code: `section.layout-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
  padding: 16px;
}`,
    PreviewComponent: LayoutPreview,
  },
  {
    id: "icon",
    label: "아이콘",
    title: "아이콘 사용 가이드",
    description:
      "라인 아이콘과 솔리드 아이콘을 구분하고, 접근성 텍스트(\`aria-label\`)를 반드시 제공하세요.",
    code: `<button class="icon-button" aria-label="알림">
  <svg width="20" height="20" aria-hidden="true">
    <!-- icon -->
  </svg>
</button>`,
    PreviewComponent: IconPreview,
  },
  {
    id: "form",
    label: "폼",
    title: "폼 요소",
    description:
      "레이블, 플레이스홀더, 보조텍스트를 구분해 시각·보조기기 사용성을 높입니다.",
    code: `<label class="field">
  <span class="field__label">이메일</span>
  <input type="email" placeholder="name@example.com" />
  <small class="field__help">가입 시 사용한 이메일을 입력하세요.</small>
</label>`,
    PreviewComponent: FormPreview,
  },
  {
    id: "button",
    label: "버튼",
    title: "버튼 타입",
    description:
      "Primary/Secondary/Quiet 버튼을 픽셀값 대신 \`rem\`으로 정의해 접근성을 확보합니다.",
    code: `<button class="btn btn--primary">Primary</button>
<button class="btn btn--secondary">Secondary</button>
<button class="btn btn--ghost">Ghost</button>`,
    PreviewComponent: ButtonPreview,
  },
  {
    id: "component",
    label: "컴포넌트",
    title: "카드 컴포넌트",
    description:
      "카드는 정형화된 높이를 갖고, 본문은 2줄까지 잘라내어 목록 가독성을 높입니다.",
    code: `<article class="card">
  <p class="card__eyebrow">NEW</p>
  <h4>하이라이트 카드</h4>
  <p class="card__desc">2줄에서 말줄임 처리를 적용합니다.</p>
</article>`,
    PreviewComponent: CardPreview,
  },
  {
    id: "tab",
    label: "탭",
    title: "탭 인터페이스",
    description:
      "탭은 버튼 역할을 하며, \`aria-selected\`와 \`role=\"tablist\"\` 속성을 설정합니다.",
    code: `<div role="tablist" aria-label="콘텐츠 탭">
  <button role="tab" aria-selected="true">상세</button>
  <button role="tab" aria-selected="false">리뷰</button>
  <button role="tab" aria-selected="false">Q&A</button>
</div>`,
    PreviewComponent: TabPreview,
  },
  {
    id: "image",
    label: "이미지",
    title: "이미지 컴포넌트",
    description:
      "이미지 로드 실패 시 자동으로 'noimage' 이미지를 표시하고, 원본 이미지의 가로/세로 비율에 따라 자동으로 클래스를 부여합니다.",
    code: `<Image
  src="https://example.com/image.jpg"
  alt="이미지 설명"
  width="300"
  height="200"
  onLoad={() => console.log('이미지 로드됨')}
  onError={() => console.log('이미지 로드 실패')}
/>`,
    PreviewComponent: ImagePreview,
  },
];

function PublishingGuidePage() {
  const [activeSection, setActiveSection] = useState(guideSections[0].id);

  return (
    <PageTemplate title="퍼블리싱 가이드">
      <section className="publishing-guide">
        <div className="publishing-guide__layout">
          <nav className="publishing-guide__lnb" aria-label="퍼블리싱 가이드 메뉴">
            <p className="publishing-guide__lnb-title">Guide</p>
            <ul className="publishing-guide__lnb-list">
              {guideSections.map((section) => {
                const isActive = activeSection === section.id;
                return (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className={`publishing-guide__lnb-link${isActive ? " is-active" : ""}`}
                      aria-current={isActive ? "true" : undefined}
                      onClick={() => setActiveSection(section.id)}
                    >
                      {section.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="publishing-guide__content">
            {guideSections.map((section) => (
              <article key={section.id} id={section.id} className="guide-section">
                <header className="guide-section__header">
                  <p className="guide-section__eyebrow">{section.label}</p>
                  <div>
                    <h3 className="guide-section__title">{section.title}</h3>
                    <p className="guide-section__description">{section.description}</p>
                  </div>
                </header>

                <div className="guide-section__body">
                  <div className="guide-section__code">
                    <p className="guide-section__code-label">예시 코드</p>
                    <pre>
                      <code>{section.code}</code>
                    </pre>
                  </div>

                  <div className="guide-section__preview">
                    <p className="guide-section__code-label">UI 미리보기</p>
                    <section.PreviewComponent />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageTemplate>
  );
}

export default PublishingGuidePage;


