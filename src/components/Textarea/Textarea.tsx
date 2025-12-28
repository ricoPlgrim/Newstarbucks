import { useRef, useMemo } from "react";
import "./Textarea.scss";
import type { TextareaHTMLAttributes } from "react";

type TextareaSize = "small" | "medium" | "large";

type TextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "onChange" | "rows"> & {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: any, value: string) => void;
  error?: string;
  help?: string;
  disabled?: boolean;
  rows?: number;
  autoResize?: boolean;
  size?: TextareaSize;
  className?: string;
  maxByte?: number; // 최대 바이트 수
  showByteCounter?: boolean; // 바이트 카운터 표시 여부
};

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
  maxByte,
  showByteCounter = false,
  ...rest
}: TextareaProps) => {
  // textarea 요소 참조 (자동 높이 조절용)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  /**
   * 문자열의 바이트 수를 계산하는 함수
   * 한글, 한자 등은 2바이트, 영문/숫자/일부 특수문자는 1바이트로 계산
   */
  const getByteLength = (str: string): number => {
    let byteLength = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charAt(i);
      // 한글, 한자 등 (유니코드 범위: 0xAC00-0xD7A3, 0x4E00-0x9FFF 등)
      if (char.match(/[가-힣ㄱ-ㅎㅏ-ㅣ一-龯]/)) {
        byteLength += 2;
      } else {
        byteLength += 1;
      }
    }
    return byteLength;
  };

  // 현재 입력값의 바이트 수 계산
  const currentByteLength = useMemo(() => {
    return controlledValue ? getByteLength(controlledValue) : 0;
  }, [controlledValue]);

  /**
   * 입력값 변경 이벤트 핸들러
   * @param {Event} e - textarea change 이벤트 객체
   */
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    
    // 외부 onChange 핸들러 호출 (이벤트 객체와 새 값 전달)
    // 바이트 제한은 에러 상태로만 표시하고, 값은 자르지 않음
    if (onChange) {
      onChange(e, newValue);
    }

    // autoResize 옵션이 활성화되어 있으면 높이 자동 조절
    if (autoResize && textareaRef.current) {
      // 높이를 auto로 설정하여 scrollHeight를 정확히 측정
      textareaRef.current.style.height = "auto";
      // scrollHeight만큼 높이 설정 (내용에 맞게 자동 조절)
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const isByteLimitExceeded = maxByte ? currentByteLength > maxByte : false;
  const hasError = !!error || isByteLimitExceeded;
  const status = hasError ? "error" : "";
  
  // 표시할 에러 메시지 결정 (error prop 우선, 없으면 바이트 제한 초과 메시지)
  const displayError = error || (isByteLimitExceeded ? `최대 ${maxByte}바이트까지 입력 가능합니다. (현재: ${currentByteLength}바이트)` : null);
  const displayHelp = !hasError ? help : null;

  return (
    <div className={`textarea-field textarea-field--${size} ${className}`}>
      {label && (
        <label className="textarea-field__label" htmlFor={rest.id}>
          {label}
        </label>
      )}
      <div className={`textarea-field__wrapper${status ? ` textarea-field__wrapper--${status}` : ""}`}>
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
            displayError ? (rest.id ? rest.id + "-error" : "textarea-error") : displayHelp ? (rest.id ? rest.id + "-help" : "textarea-help") : undefined
          }
          {...rest}
        />
        {(showByteCounter || maxByte) && (
          <div className="textarea-field__byte-counter">
            <span className={isByteLimitExceeded ? "textarea-field__byte-counter--exceeded" : ""}>
              {currentByteLength}
              {maxByte ? `/${maxByte}` : ""}byte
            </span>
          </div>
        )}
      </div>
      {(displayError || displayHelp) && (
        <small
          className={hasError ? "textarea-field__help textarea-field__help--error" : "textarea-field__help"}
          id={displayError ? (rest.id ? rest.id + "-error" : "textarea-error") : displayHelp ? (rest.id ? rest.id + "-help" : "textarea-help") : undefined}
        >
          {displayError || displayHelp}
        </small>
      )}
    </div>
  );
};

export default Textarea;
