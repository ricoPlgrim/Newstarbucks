import { useRef } from "react";
import "./Textarea.scss";

/**
 * Textarea 컴포넌트
 * @param {string} label - 라벨 텍스트
 * @param {string} placeholder - 플레이스홀더
 * @param {string} value - 입력 값 (controlled)
 * @param {function} onChange - 값 변경 핸들러
 * @param {string} error - 에러 메시지
 * @param {string} help - 도움말 텍스트
 * @param {boolean} disabled - 비활성화 여부
 * @param {number} rows - 행 수
 * @param {boolean} autoResize - 자동 높이 조절
 * @param {string} size - 'small' | 'medium' | 'large'
 * @param {string} className - 추가 클래스명
 * @param {object} ...rest - 기타 textarea props
 */
const Textarea = ({
  label,
  placeholder,
  value: controlledValue,
  onChange,
  error,
  help,
  disabled = false,
  rows = 4,
  autoResize = false,
  size = "medium",
  className = "",
  ...rest
}) => {
  // textarea 요소 참조 (자동 높이 조절용)
  const textareaRef = useRef(null);

  /**
   * 입력값 변경 이벤트 핸들러
   * @param {Event} e - textarea change 이벤트 객체
   */
  const handleChange = (e) => {
    // 외부 onChange 핸들러 호출 (이벤트 객체와 새 값 전달)
    if (onChange) {
      onChange(e, e.target.value);
    }

    // autoResize 옵션이 활성화되어 있으면 높이 자동 조절
    if (autoResize && textareaRef.current) {
      // 높이를 auto로 설정하여 scrollHeight를 정확히 측정
      textareaRef.current.style.height = "auto";
      // scrollHeight만큼 높이 설정 (내용에 맞게 자동 조절)
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const hasError = !!error;
  const status = hasError ? "error" : "";

  return (
    <div className={`textarea-field textarea-field--${size} ${className}`}>
      {label && (
        <label className="textarea-field__label" htmlFor={rest.id}>
          {label}
        </label>
      )}
      <div className={`textarea-field__wrapper textarea-field__wrapper--${status}`}>
        <textarea
          ref={textareaRef}
          className="textarea-field__textarea"
          placeholder={placeholder}
          value={controlledValue || ""}
          onChange={handleChange}
          disabled={disabled}
          rows={rows}
          aria-invalid={hasError}
          aria-describedby={
            error ? (rest.id ? rest.id + "-error" : "textarea-error") : help ? (rest.id ? rest.id + "-help" : "textarea-help") : undefined
          }
          {...rest}
        />
      </div>
      {(error || help) && (
        <small
          className={hasError ? "textarea-field__help textarea-field__help--error" : "textarea-field__help"}
          id={error ? (rest.id ? rest.id + "-error" : "textarea-error") : help ? (rest.id ? rest.id + "-help" : "textarea-help") : undefined}
        >
          {error || help}
        </small>
      )}
    </div>
  );
};

export default Textarea;
