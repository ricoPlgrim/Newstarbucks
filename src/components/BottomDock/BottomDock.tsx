import { useState } from "react";
import "./BottomDock.scss";

// 기본 내비게이션 아이템 데이터
const defaultItems = [
  { key: "home", label: "홈", icon: "🏠" },
  { key: "search", label: "검색", icon: "🔍" },
  { key: "bookmark", label: "즐겨찾기", icon: "⭐" },
  { key: "profile", label: "내 정보", icon: "👤" },
];

/**
 * BottomDock 컴포넌트
 * 모바일 하단 고정형 내비게이션 바 컴포넌트
 * 
 * @param {Array} items - 내비게이션 아이템 배열 [{ key, label, icon }] (기본값: defaultItems)
 * @param {function} onChange - 아이템 선택 핸들러 (선택된 key를 인자로 받음)
 * @param {string} defaultActive - 기본 활성화된 아이템 key (기본값: "home")
 * @param {string} position - 위치 타입 'fixed' | 'relative' (기본값: 'fixed')
 */
function BottomDock({ items = defaultItems, onChange, defaultActive = "home", position = "fixed" }) {
  // 현재 활성화된 아이템 key 상태
  const [active, setActive] = useState(defaultActive);

  // 아이템 선택 핸들러
  // 선택된 아이템의 key를 상태에 저장하고 onChange 콜백 호출
  const handleSelect = (key) => {
    setActive(key);
    onChange?.(key);
  };

  return (
    <nav className={`bottom-dock ${position === "relative" ? "bottom-dock--relative" : ""}`} aria-label="하단 내비게이션">
      {items.map((item) => (
        <button
          key={item.key}
          type="button"
          className={`bottom-dock__item ${active === item.key ? "is-active" : ""}`}
          aria-pressed={active === item.key}
          onClick={() => handleSelect(item.key)}
        >
          {/* 아이콘 영역 */}
          <span className="bottom-dock__icon" aria-hidden="true">
            {item.icon}
          </span>
          {/* 라벨 텍스트 */}
          <span className="bottom-dock__label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

export default BottomDock;

