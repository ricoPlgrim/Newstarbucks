import { useState, useRef, useEffect } from "react";
import "./Accordion.scss";

/**
 * Accordion 컴포넌트
 * @param {Array} items - 아코디언 아이템 배열 [{ id, label, content }]
 * @param {string} type - 'exclusive' (하나만 열림) 또는 'independent' (독립적으로 열림)
 * @param {boolean} defaultOpenFirst - 첫 번째 아이템 기본 열림 여부
 * @param {string} className - 추가 클래스명
 */
const Accordion = ({ 
  items = [], 
  type = "exclusive", // 'exclusive' | 'independent'
  defaultOpenFirst = false,
  className = "" 
}) => {
  const [openItems, setOpenItems] = useState(() => {
    if (defaultOpenFirst && items.length > 0) {
      return type === "exclusive" ? [items[0].id] : [items[0].id];
    }
    return [];
  });

  // 각 아코디언 아이템의 콘텐츠 영역 DOM 참조 (높이 애니메이션용)
  const contentRefs = useRef({});

  /**
   * 아코디언 아이템 클릭 이벤트 핸들러
   * 헤더 영역 클릭 시 호출됨
   * @param {string|number} itemId - 클릭된 아이템의 ID
   */
  const handleItemClick = (itemId) => {
    if (type === "exclusive") {
      // Exclusive 타입: 하나만 열림 (토글 방식)
      // 이미 열려있으면 닫고, 닫혀있으면 열기
      setOpenItems((prev) => (prev.includes(itemId) ? [] : [itemId]));
    } else {
      // Independent 타입: 독립적으로 열고 닫음 (여러 개 동시에 열 수 있음)
      setOpenItems((prev) => {
        if (prev.includes(itemId)) {
          // 이미 열려있으면 닫기 (목록에서 제거)
          return prev.filter((id) => id !== itemId);
        } else {
          // 닫혀있으면 열기 (목록에 추가)
          return [...prev, itemId];
        }
      });
    }
  };

  /**
   * 아코디언 콘텐츠 영역의 max-height 설정 (애니메이션용)
   * openItems나 items가 변경될 때마다 실행됨
   */
  useEffect(() => {
    items.forEach((item) => {
      const ref = contentRefs.current[item.id];
      if (ref) {
        if (openItems.includes(item.id)) {
          // 열려있으면 실제 콘텐츠 높이만큼 max-height 설정
          ref.style.maxHeight = ref.scrollHeight + "px";
        } else {
          // 닫혀있으면 max-height를 0으로 설정 (CSS transition으로 애니메이션)
          ref.style.maxHeight = "0";
        }
      }
    });
  }, [openItems, items]);

  /**
   * 콘텐츠 영역 클릭 이벤트 핸들러
   * 콘텐츠 클릭 시 아코디언이 닫히지 않도록 이벤트 전파 방지
   * @param {Event} e - 클릭 이벤트 객체
   */
  const handleContentClick = (e) => {
    // 이벤트 버블링 방지 (부모 요소의 handleItemClick이 호출되지 않도록)
    e.stopPropagation();
  };

  return (
    <div className={`accordion ${className}`}>
      <ul className="accordion__list">
        {items.map((item) => {
          const isOpen = openItems.includes(item.id);
          return (
            <li
              key={item.id}
              className={`accordion__item ${isOpen ? "accordion__item--open" : ""}`}
            >
              <div 
                className="accordion__header"
                onClick={() => handleItemClick(item.id)}
              >
                <span className="accordion__label">{item.label}</span>
                <div className="accordion__icon">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 5.90446L3.8875 5L8 9.19108L12.1125 5L13 5.90446L8 11L3 5.90446Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
              <div
                ref={(el) => {
                  contentRefs.current[item.id] = el;
                }}
                className="accordion__content-wrapper"
                onClick={handleContentClick}
              >
                <div className="accordion__content">
                  {typeof item.content === "string" ? (
                    <p>{item.content}</p>
                  ) : (
                    item.content
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Accordion;

