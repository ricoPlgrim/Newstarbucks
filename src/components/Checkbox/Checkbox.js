import "./Checkbox.scss";

/**
 * Checkbox 컴포넌트
 * @param {string} label - 라벨 텍스트
 * @param {string} name - name 속성
 * @param {string} value - value 속성
 * @param {boolean} checked - 체크 상태
 * @param {function} onChange - 변경 핸들러
 * @param {boolean} disabled - 비활성화 여부
 * @param {string} className - 추가 클래스명
 * @param {object} ...rest - 기타 input props
 */
const Checkbox = ({
  label,
  name,
  value,
  checked = false,
  onChange,
  disabled = false,
  className = "",
  ...rest
}) => {
  return (
    <label className={`checkbox ${disabled ? "checkbox--disabled" : ""} ${className}`}>
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="checkbox__input"
        {...rest}
      />
      <span className="checkbox__box" aria-hidden="true">
        {checked && (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M11.6667 3.5L5.25 9.91667L2.33333 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      {label && <span className="checkbox__label">{label}</span>}
    </label>
  );
};

/**
 * CheckboxGroup 컴포넌트
 * @param {string} label - 그룹 라벨
 * @param {Array} options - 옵션 배열 [{ value, label, checked, disabled }]
 * @param {string} name - name 속성
 * @param {function} onChange - 변경 핸들러
 * @param {string} className - 추가 클래스명
 */
export const CheckboxGroup = ({ label, options = [], name, onChange, className = "" }) => {
  /**
   * 체크박스 그룹 변경 이벤트 핸들러
   * 개별 체크박스의 onChange 이벤트에서 호출됨
   * @param {Event} e - input change 이벤트 객체
   */
  const handleChange = (e) => {
    if (onChange) {
      // 변경된 옵션의 checked 상태를 업데이트한 새로운 options 배열 생성
      // 외부 onChange 핸들러에 이벤트 객체와 업데이트된 options 배열 전달
      onChange(e, options.map((opt) => (opt.value === e.target.value ? { ...opt, checked: e.target.checked } : opt)));
    }
  };

  return (
    <div className={`checkbox-group ${className}`}>
      {label && <div className="checkbox-group__label">{label}</div>}
      <div className="checkbox-group__list">
        {options.map((option) => (
          <Checkbox
            key={option.value}
            name={name}
            value={option.value}
            label={option.label}
            checked={option.checked || false}
            disabled={option.disabled || false}
            onChange={handleChange}
          />
        ))}
      </div>
    </div>
  );
};

export default Checkbox;

