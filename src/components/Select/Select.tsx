import "./Select.scss";
import type { ChangeEventHandler, SelectHTMLAttributes } from "react";

type SelectOption = { value: string; label: string };
type SelectSize = "small" | "medium" | "large";

type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "value" | "onChange" | "size"> & {
  label?: string;
  options?: SelectOption[];
  value?: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  placeholder?: string;
  error?: string;
  help?: string;
  disabled?: boolean;
  size?: SelectSize;
  className?: string;
};

/**
 * Select 컴포넌트 (기본 select)
 * @param {string} label - 라벨 텍스트
 * @param {Array} options - 옵션 배열 [{ value, label }]
 * @param {string} value - 선택된 값
 * @param {function} onChange - 값 변경 핸들러
 * @param {string} placeholder - 플레이스홀더
 * @param {string} error - 에러 메시지
 * @param {string} help - 도움말 텍스트
 * @param {boolean} disabled - 비활성화 여부
 * @param {string} size - 'small' | 'medium' | 'large'
 * @param {string} className - 추가 클래스명
 * @param {object} ...rest - 기타 select props
 */
const Select = ({
  label,
  options = [],
  value,
  onChange,
  placeholder = "선택하세요",
  error,
  help,
  disabled = false,
  size = "medium",
  className = "",
  ...rest
}: SelectProps) => {
  const hasError = !!error;
  const status = hasError ? "error" : "";

  return (
    <div className={`select-field select-field--${size} ${className}`}>
      {label && (
        <label className="select-field__label" htmlFor={rest.id}>
          {label}
        </label>
      )}
      <div className={`select-field__wrapper select-field__wrapper--${status}`}>
        <select
          className="select-field__select"
          value={value || ""}
          onChange={onChange}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={
            error ? (rest.id ? rest.id + "-error" : "select-error") : help ? (rest.id ? rest.id + "-help" : "select-help") : undefined
          }
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="select-field__icon" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      {(error || help) && (
        <small
          className={hasError ? "select-field__help select-field__help--error" : "select-field__help"}
          id={error ? (rest.id ? rest.id + "-error" : "select-error") : help ? (rest.id ? rest.id + "-help" : "select-help") : undefined}
        >
          {error || help}
        </small>
      )}
    </div>
  );
};

export default Select;
