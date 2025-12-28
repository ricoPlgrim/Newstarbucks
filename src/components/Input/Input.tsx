import { useState, useRef, useEffect } from "react";
import "./Input.scss";
import type { InputHTMLAttributes } from "react";

type InputSize = "small" | "medium" | "large";

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "value" | "onChange"> & {
  type?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: any, value: string) => void;
  error?: string;
  success?: string;
  help?: string;
  showClearButton?: boolean;
  disabled?: boolean;
  size?: InputSize;
  className?: string;
};

/**
 * Input 컴포넌트
 * @param {string} type - 'text' | 'password' | 'number' | 'email' | 'tel' 등
 * @param {string} label - 라벨 텍스트
 * @param {string} placeholder - 플레이스홀더
 * @param {string} value - 입력 값 (controlled)
 * @param {function} onChange - 값 변경 핸들러
 * @param {string} error - 에러 메시지
 * @param {string} success - 성공 메시지
 * @param {string} help - 도움말 텍스트
 * @param {boolean} showClearButton - 클리어 버튼 표시 여부
 * @param {boolean} disabled - 비활성화 여부
 * @param {string} size - 'small' | 'medium' | 'large'
 * @param {string} className - 추가 클래스명
 * @param {object} ...rest - 기타 input props
 */
const Input = ({
  type = "text",
  label,
  placeholder,
  value: controlledValue,
  onChange,
  error,
  success,
  help,
  showClearButton = false,
  disabled = false,
  size = "medium",
  className = "",
  ...rest
}: InputProps) => {
  // 내부 상태 관리 (uncontrolled 모드일 때 사용)
  const [internalValue, setInternalValue] = useState("");
  // 비밀번호 표시/숨김 상태 (password 타입일 때만 사용)
  const [showPassword, setShowPassword] = useState(false);
  // input 요소 참조 (포커스 제어용)
  const inputRef = useRef<HTMLInputElement | null>(null);
  // controlled/uncontrolled 모드 판단
  const isControlled = controlledValue !== undefined;

  // 현재 입력값 결정 (controlled 우선, 없으면 internalValue 사용)
  const value = isControlled ? controlledValue : internalValue;
  // password 타입 여부 확인
  const isPassword = type === "password";
  // tel 타입 여부 확인 (휴대폰 번호)
  const isTel = type === "tel";
  // email 타입 여부 확인
  const isEmail = type === "email";
  // 실제 input type 결정 (password 타입이고 showPassword가 true면 "text"로 변경)
  const inputType = isPassword && showPassword ? "text" : type;

  /**
   * 휴대폰 번호 포맷팅 함수
   * 숫자만 추출하여 010-1234-5678 형식으로 변환
   * @param {string} phone - 입력된 휴대폰 번호
   * @returns {string} - 포맷팅된 휴대폰 번호
   */
  const formatPhoneNumber = (phone: string) => {
    // 숫자만 추출
    const numbers = phone.replace(/[^\d]/g, "");
    // 11자리까지만 허용
    const limitedNumbers = numbers.slice(0, 11);
    
    // 길이에 따라 하이픈 추가
    if (limitedNumbers.length <= 3) {
      return limitedNumbers;
    } else if (limitedNumbers.length <= 7) {
      return `${limitedNumbers.slice(0, 3)}-${limitedNumbers.slice(3)}`;
    } else {
      return `${limitedNumbers.slice(0, 3)}-${limitedNumbers.slice(3, 7)}-${limitedNumbers.slice(7)}`;
    }
  };

  /**
   * 입력값 변경 이벤트 핸들러
   * @param {Event} e - input change 이벤트 객체
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    
    // 휴대폰 번호 타입일 때 자동 포맷팅
    if (isTel) {
      newValue = formatPhoneNumber(newValue);
    }
    
    // uncontrolled 모드일 때 내부 상태 업데이트
    if (!isControlled) {
      setInternalValue(newValue);
    }
    
    // 이벤트 객체의 value도 업데이트
    const updatedEvent: any = {
      ...e,
      target: {
        ...e.target,
        value: newValue,
      },
    };
    
    // 외부 onChange 핸들러 호출 (이벤트 객체와 새 값 전달)
    if (onChange) {
      onChange(updatedEvent, newValue);
    }
  };

  /**
   * 입력값 클리어 이벤트 핸들러
   * 클리어 버튼 클릭 시 호출됨
   */
  const handleClear = () => {
    // uncontrolled 모드일 때 내부 상태 초기화
    if (!isControlled) {
      setInternalValue("");
    }
    // 외부 onChange 핸들러 호출 (빈 값으로 변경)
    if (onChange) {
      onChange({ target: { value: "" } }, "");
    }
    // 클리어 후 input에 포커스 유지
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const hasValue = value && value.length > 0;
  const hasError = !!error;
  const hasSuccess = !!success && !hasError;
  const status = hasError ? "error" : hasSuccess ? "success" : "";

  return (
    <div className={`input-field input-field--${size} ${className}`}>
      {label && (
        <label className="input-field__label" htmlFor={rest.id}>
          {label}
        </label>
      )}
      <div className={`input-field__wrapper input-field__wrapper--${status}`}>
        <input
          ref={inputRef}
          type={inputType}
          className="input-field__input"
          placeholder={placeholder}
          value={value || ""}
          onChange={handleChange}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={
            error ? `${rest.id || "input"}-error` : help ? `${rest.id || "input"}-help` : undefined
          }
          {...rest}
        />
        {isPassword && hasValue && (
          <button
            type="button"
            className="input-field__icon input-field__icon--password"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
            tabIndex={0}
          >
            {showPassword ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M10 3.75C5.83333 3.75 2.275 6.34167 0.833328 10C2.275 13.6583 5.83333 16.25 10 16.25C14.1667 16.25 17.725 13.6583 19.1667 10C17.725 6.34167 14.1667 3.75 10 3.75ZM10 14.5833C7.69999 14.5833 5.83333 12.7167 5.83333 10.4167C5.83333 8.11667 7.69999 6.25 10 6.25C12.3 6.25 14.1667 8.11667 14.1667 10.4167C14.1667 12.7167 12.3 14.5833 10 14.5833ZM10 7.5C8.61666 7.5 7.49999 8.61667 7.49999 10C7.49999 11.3833 8.61666 12.5 10 12.5C11.3833 12.5 12.5 11.3833 12.5 10C12.5 8.61667 11.3833 7.5 10 7.5Z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M2.01666 2.5L17.9833 17.5M12.1583 12.5583C11.625 13.0083 10.9583 13.25 10.25 13.25C8.25 13.25 6.625 11.625 6.625 9.625C6.625 8.91667 6.86666 8.25 7.31666 7.71667M10.25 6C12.25 6 13.875 7.625 13.875 9.625C13.875 10.3333 13.6333 11 13.1833 11.5333M16.6667 7.5C17.1083 8.08333 17.4917 8.71667 17.8083 9.4M3.33333 12.5C2.89166 11.9167 2.50833 11.2833 2.19166 10.6M6.66666 4.75C7.41666 4.41667 8.21666 4.16667 9.08333 4.04167M13.3333 15.25C12.5833 15.5833 11.7833 15.8333 10.9167 15.9583"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        )}
        {showClearButton && hasValue && !disabled && !isPassword && (
          <button
            type="button"
            className="input-field__icon input-field__icon--clear"
            onClick={handleClear}
            aria-label="입력 지우기"
            tabIndex={0}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
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
        {hasError && (
          <div className="input-field__icon input-field__icon--status">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6024 1.66667 10 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10C1.66667 14.6024 5.39763 18.3333 10 18.3333Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 6.66667V10M10 13.3333H10.0083"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
        {hasSuccess && (
          <div className="input-field__icon input-field__icon--status">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M18.3333 9.23333V10C18.3323 11.797 17.7504 13.5455 16.6744 14.9848C15.5985 16.4241 14.0861 17.4771 12.3628 17.9866C10.6395 18.4961 8.79771 18.4349 7.11205 17.8122C5.42639 17.1894 3.98721 16.0374 2.98915 14.5297C1.99108 13.022 1.48259 11.23 1.53276 9.41668C1.58293 7.60335 2.18921 5.83689 3.26924 4.38779C4.34927 2.93869 5.85761 1.87449 7.56777 1.34078C9.27793 0.80707 11.1018 0.83199 12.8 1.41167"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.3333 3.33333L10 11.675L7.5 9.175"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>
      {(error || success || help) && (
        <small
          className={`input-field__help ${hasError ? "input-field__help--error" : ""} ${
            hasSuccess ? "input-field__help--success" : ""
          }`}
          id={error ? `${rest.id || "input"}-error` : help ? `${rest.id || "input"}-help` : undefined}
        >
          {error || success || help}
        </small>
      )}
    </div>
  );
};

export default Input;

