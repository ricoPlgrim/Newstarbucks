import { useState, useRef } from "react";
import "./SearchField.scss";

type SearchFieldSize = "small" | "medium" | "large";
type SearchFieldVariant = "default" | "filled" | "outlined";

type SearchFieldProps = {
  placeholder?: string;
  value?: string;
  onChange?: (e: any, value: string) => void;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  showClearButton?: boolean;
  size?: SearchFieldSize;
  variant?: SearchFieldVariant;
  disabled?: boolean;
  className?: string;
};

/**
 * SearchField 컴포넌트
 * @param {string} placeholder - 플레이스홀더 텍스트
 * @param {string} value - 입력 값 (controlled)
 * @param {function} onChange - 값 변경 핸들러
 * @param {function} onSearch - 검색 실행 핸들러 (Enter 키 또는 검색 버튼 클릭 시)
 * @param {function} onClear - 클리어 핸들러
 * @param {boolean} showClearButton - 클리어 버튼 표시 여부
 * @param {string} size - 'small' | 'medium' | 'large'
 * @param {string} variant - 'default' | 'filled' | 'outlined'
 * @param {boolean} disabled - 비활성화 여부
 * @param {string} className - 추가 클래스명
 */
const SearchField = ({
  placeholder = "검색어를 입력하세요",
  value: controlledValue,
  onChange,
  onSearch,
  onClear,
  showClearButton = true,
  size = "medium",
  variant = "default",
  disabled = false,
  className = "",
}: SearchFieldProps) => {
  const [internalValue, setInternalValue] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const isControlled = controlledValue !== undefined;

  const value = isControlled ? controlledValue : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (!isControlled) {
      setInternalValue(newValue);
    }
    if (onChange) {
      onChange(e, newValue);
    }
  };

  const handleClear = () => {
    if (!isControlled) {
      setInternalValue("");
    }
    if (onChange) {
      onChange({ target: { value: "" } }, "");
    }
    if (onClear) {
      onClear();
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSearch = () => {
    if (onSearch && value.trim()) {
      onSearch(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const hasValue = value && value.length > 0;

  return (
    <div
      className={`search-field search-field--${size} search-field--${variant} ${className} ${
        disabled ? "search-field--disabled" : ""
      }`}
    >
      <div className="search-field__wrapper">
        <div className="search-field__icon search-field__icon--search">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17.5 17.5L13.875 13.875"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <input
          ref={inputRef}
          type="text"
          className="search-field__input"
          placeholder={placeholder}
          value={value || ""}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          aria-label="검색어 입력"
        />

        {showClearButton && hasValue && !disabled && (
          <button
            type="button"
            className="search-field__icon search-field__icon--clear"
            onClick={handleClear}
            aria-label="검색어 지우기"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}

        {onSearch && (
          <button
            type="button"
            className="search-field__button"
            onClick={handleSearch}
            disabled={disabled || !hasValue}
            aria-label="검색"
          >
            검색
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchField;

