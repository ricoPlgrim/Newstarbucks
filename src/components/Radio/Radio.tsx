import "./Radio.scss";
import type { ChangeEventHandler, InputHTMLAttributes, ReactNode } from "react";

type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange" | "checked"> & {
  label?: ReactNode;
  name?: string;
  value?: string;
  checked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  className?: string;
};

/**
 * Radio 컴포넌트
 * @param {string} label - 라벨 텍스트
 * @param {string} name - name 속성 (그룹 식별)
 * @param {string} value - value 속성
 * @param {boolean} checked - 체크 상태
 * @param {function} onChange - 변경 핸들러
 * @param {boolean} disabled - 비활성화 여부
 * @param {string} className - 추가 클래스명
 * @param {object} ...rest - 기타 input props
 */
const Radio = ({
  label,
  name,
  value,
  checked = false,
  onChange,
  disabled = false,
  className = "",
  ...rest
}: RadioProps) => {
  return (
    <label className={`radio ${disabled ? "radio--disabled" : ""} ${className}`}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="radio__input"
        {...rest}
      />
      <span className="radio__circle" aria-hidden="true">
        {checked && <span className="radio__dot" />}
      </span>
      {label && <span className="radio__label">{label}</span>}
    </label>
  );
};

/**
 * RadioGroup 컴포넌트
 * @param {string} label - 그룹 라벨
 * @param {Array} options - 옵션 배열 [{ value, label, disabled }]
 * @param {string} name - name 속성
 * @param {string} selectedValue - 선택된 값
 * @param {function} onChange - 변경 핸들러
 * @param {string} className - 추가 클래스명
 */
export const RadioGroup = ({ label, options = [], name, selectedValue, onChange, className = "" }) => {
  /**
   * 라디오 버튼 그룹 변경 이벤트 핸들러
   * 개별 라디오 버튼의 onChange 이벤트에서 호출됨
   * @param {Event} e - input change 이벤트 객체
   */
  const handleChange = (e) => {
    if (onChange) {
      // 외부 onChange 핸들러에 이벤트 객체와 선택된 값 전달
      onChange(e, e.target.value);
    }
  };

  return (
    <div className={`radio-group ${className}`}>
      {label && <div className="radio-group__label">{label}</div>}
      <div className="radio-group__list" role="radiogroup" aria-label={label}>
        {options.map((option) => (
          <Radio
            key={option.value}
            name={name}
            value={option.value}
            label={option.label}
            checked={selectedValue === option.value}
            disabled={option.disabled || false}
            onChange={handleChange}
          />
        ))}
      </div>
    </div>
  );
};

export default Radio;

