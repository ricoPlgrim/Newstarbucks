import { useState } from "react";
import "./Toggle.scss";

/**
 * Toggle 컴포넌트
 * 스위치 형태의 토글 컴포넌트
 * 
 * @param {string} label - 토글 레이블 (기본값: "토글")
 * @param {string} description - 토글 설명 텍스트
 * @param {boolean} defaultOn - 기본 켜짐 상태 (기본값: false)
 * @param {boolean} disabled - 비활성화 여부 (기본값: false)
 * @param {function} onChange - 토글 변경 핸들러 (checked 상태를 인자로 받음)
 */
function Toggle({ label = "토글", description, defaultOn = false, disabled = false, onChange }) {
  // 토글 켜짐/꺼짐 상태
  const [checked, setChecked] = useState(defaultOn);

  // 토글 변경 핸들러
  const handleToggle = () => {
    if (disabled) return;
    
    const next = !checked;
    setChecked(next);
    
    // onChange 콜백 호출
    onChange?.(next);
  };

  return (
    <label className={`toggle ${checked ? "is-on" : ""} ${disabled ? "is-disabled" : ""}`}>
      <input
        type="checkbox"
        role="switch"
        aria-checked={checked}
        checked={checked}
        onChange={handleToggle}
        disabled={disabled}
      />
      {/* 토글 트랙 (시각적 스위치) */}
      <span className="toggle__track" aria-hidden="true">
        <span className="toggle__thumb" />
      </span>
      {/* 토글 텍스트 영역 */}
      <div className="toggle__text">
        <span className="toggle__label">{label}</span>
        {description && <span className="toggle__desc">{description}</span>}
      </div>
    </label>
  );
}

export default Toggle;

