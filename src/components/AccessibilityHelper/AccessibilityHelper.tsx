import { useState, useEffect, useRef } from "react";
import "./AccessibilityHelper.scss";

const FONT_SCALE_OPTIONS = [
  { id: "small", label: "작게" },
  { id: "normal", label: "보통" },
  { id: "large", label: "크게" },
  { id: "xlarge", label: "아주 크게" },
];

// TODO: 접근성 체크리스트 기능 구현 예정
// const ACCESSIBILITY_CHECKLIST = [
//   { id: "contrast", label: "색상 대비 비율 4.5:1 이상", checked: false },
//   { id: "font-size", label: "최소 폰트 크기 14px 이상", checked: false },
//   { id: "focus", label: "키보드 포커스 표시 명확", checked: false },
//   { id: "alt", label: "이미지 alt 텍스트 제공", checked: false },
//   { id: "aria", label: "ARIA 레이블 적절히 사용", checked: false },
//   { id: "semantic", label: "시맨틱 HTML 태그 사용", checked: false },
// ];

function AccessibilityHelper({ isDarkMode, setIsDarkMode, fontScale, setFontScale }) {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const timeoutRef = useRef(null);
  // TODO: 접근성 체크리스트 기능 구현 예정
  // const [checklist, setChecklist] = useState(ACCESSIBILITY_CHECKLIST);
  // const toggleChecklist = (id) => {
  //   setChecklist((prev) =>
  //     prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
  //   );
  // };

  // isOpen 상태 변경 시 shouldRender 관리 (애니메이션 완료 후 DOM에서 제거)
  useEffect(() => {
    if (isOpen) {
      // 열릴 때: 즉시 렌더링하고 약간의 지연 후 애니메이션 시작
      setShouldRender(true);
      // 기존 timeout 취소
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      // 다음 프레임에서 애니메이션이 시작되도록 약간의 지연
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // 애니메이션이 시작되도록 강제
        });
      });
    } else if (shouldRender) {
      // 닫힐 때: transition 시간(300ms) 후 DOM에서 제거
      // shouldRender가 true일 때만 timeout 설정 (이미 false면 실행하지 않음)
      timeoutRef.current = setTimeout(() => {
        setShouldRender(false);
        timeoutRef.current = null;
      }, 300); // CSS transition 시간과 일치
    }

    // cleanup: 컴포넌트 언마운트 시 timeout 정리
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [isOpen, shouldRender]);

  const currentFontScaleLabel =
    FONT_SCALE_OPTIONS.find((option) => option.id === fontScale)?.label ?? "보통";

  return (
    <div 
      className={`accessibility-helper ${isOpen ? "is-open" : ""}`}
    >
      <button
        className="accessibility-helper__toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "접근성 도우미 닫기" : "접근성 도우미 열기"}
        aria-expanded={isOpen}
      >
        <span className="accessibility-helper__icon" aria-hidden="true">
          {isOpen ? "◀" : "▶"}
        </span>
        <span className="accessibility-helper__label">옵션</span>
      </button>

      {shouldRender && (
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
        </div>
      )}
    </div>
  );
}

export default AccessibilityHelper;

