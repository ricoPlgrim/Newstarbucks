import { useState } from "react";
import "./AccessibilityHelper.scss";

const FONT_SCALE_OPTIONS = [
  { id: "small", label: "작게" },
  { id: "normal", label: "보통" },
  { id: "large", label: "크게" },
  { id: "xlarge", label: "아주 크게" },
];

const ACCESSIBILITY_CHECKLIST = [
  { id: "contrast", label: "색상 대비 비율 4.5:1 이상", checked: false },
  { id: "font-size", label: "최소 폰트 크기 14px 이상", checked: false },
  { id: "focus", label: "키보드 포커스 표시 명확", checked: false },
  { id: "alt", label: "이미지 alt 텍스트 제공", checked: false },
  { id: "aria", label: "ARIA 레이블 적절히 사용", checked: false },
  { id: "semantic", label: "시맨틱 HTML 태그 사용", checked: false },
];

function AccessibilityHelper({ isDarkMode, setIsDarkMode, fontScale, setFontScale }) {
  const [isOpen, setIsOpen] = useState(false);
  const [checklist, setChecklist] = useState(ACCESSIBILITY_CHECKLIST);

  const toggleChecklist = (id) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const currentFontScaleLabel =
    FONT_SCALE_OPTIONS.find((option) => option.id === fontScale)?.label ?? "보통";

  return (
    <div className={`accessibility-helper ${isOpen ? "is-open" : ""}`}>
      <button
        className="accessibility-helper__toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "접근성 도우미 닫기" : "접근성 도우미 열기"}
        aria-expanded={isOpen}
      >
        <span className="accessibility-helper__icon" aria-hidden="true">
          {isOpen ? "◀" : "▶"}
        </span>
        <span className="accessibility-helper__label">접근성<br />도우미</span>
      </button>

      {isOpen && (
        <div className="accessibility-helper__panel">
          <div className="accessibility-helper__section">
            <h3 className="accessibility-helper__title">접근성 설정</h3>
            
            <div className="accessibility-helper__control">
              <label className="accessibility-helper__label-text">테마 모드</label>
              <div className="accessibility-helper__toggle-group" role="group">
                <button
                  type="button"
                  className={`accessibility-helper__button ${!isDarkMode ? "is-active" : ""}`}
                  onClick={() => setIsDarkMode(false)}
                  aria-pressed={!isDarkMode}
                >
                  라이트
                </button>
                <button
                  type="button"
                  className={`accessibility-helper__button ${isDarkMode ? "is-active" : ""}`}
                  onClick={() => setIsDarkMode(true)}
                  aria-pressed={isDarkMode}
                >
                  다크
                </button>
              </div>
            </div>

            <div className="accessibility-helper__control">
              <label className="accessibility-helper__label-text">글꼴 크기</label>
              <div className="accessibility-helper__toggle-group" role="group">
                {FONT_SCALE_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    className={`accessibility-helper__button ${fontScale === option.id ? "is-active" : ""}`}
                    onClick={() => setFontScale(option.id)}
                    aria-pressed={fontScale === option.id}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="accessibility-helper__status">
              <span>현재: {isDarkMode ? "다크" : "라이트"} · {currentFontScaleLabel}</span>
            </div>
          </div>

          <div className="accessibility-helper__section">
            <h3 className="accessibility-helper__title">접근성 체크리스트</h3>
            <ul className="accessibility-helper__checklist" role="list">
              {checklist.map((item) => (
                <li key={item.id} className="accessibility-helper__checklist-item">
                  <label className="accessibility-helper__checkbox-label">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => toggleChecklist(item.id)}
                      className="accessibility-helper__checkbox"
                    />
                    <span>{item.label}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="accessibility-helper__section">
            <h3 className="accessibility-helper__title">사용법 가이드</h3>
            <div className="accessibility-helper__guide">
              <p><strong>px-to-rem 믹스인 사용법:</strong></p>
              <pre className="accessibility-helper__code">
{`@include px-to-rem(font-size, 16);
@include px-to-rem(margin, 20, 16);`}
              </pre>
              
              <p><strong>max-width 설정:</strong></p>
              <pre className="accessibility-helper__code">
{`@include px-to-rem(max-width, 1200, 16);`}
              </pre>

              <p><strong>접근성 체크 포인트:</strong></p>
              <ul className="accessibility-helper__guide-list">
                <li>모든 이미지에 alt 속성 추가</li>
                <li>버튼과 링크에 명확한 레이블 제공</li>
                <li>키보드로 모든 기능 접근 가능</li>
                <li>색상 대비 비율 확인 (WCAG AA 기준)</li>
                <li>포커스 스타일 명확히 표시</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AccessibilityHelper;

