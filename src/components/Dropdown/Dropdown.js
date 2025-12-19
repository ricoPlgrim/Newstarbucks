import { useState, useRef, useEffect } from "react";
import "./Dropdown.scss";

const defaultOptions = [
  { value: "opt1", label: "옵션 1" },
  { value: "opt2", label: "옵션 2" },
  { value: "opt3", label: "옵션 3" },
];

const Dropdown = ({
  options = defaultOptions,
  variant = "outline", // outline | filled | ghost
  placeholder = "선택하세요",
  disabled = false,
  fullWidth = false,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(options[0] || null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", onClickOutside);
    return () => document.removeEventListener("click", onClickOutside);
  }, []);

  useEffect(() => {
    // 옵션이 바뀌면 선택값을 첫 항목으로 리셋
    setSelected(options[0] || null);
  }, [options]);

  const handleSelect = (opt) => {
    setSelected(opt);
    setOpen(false);
    onChange?.(opt);
  };

  return (
    <div
      className={`dropdown dropdown--${variant} ${fullWidth ? "is-full" : ""} ${
        disabled ? "is-disabled" : ""
      }`}
      ref={wrapperRef}
    >
      <button
        type="button"
        className="dropdown__toggle"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => !disabled && setOpen((v) => !v)}
        disabled={disabled}
      >
        {selected?.label || placeholder}
        <span className="dropdown__chevron" aria-hidden="true">▾</span>
      </button>
      {open && (
        <ul className="dropdown__menu" role="listbox">
          {options.map((opt) => (
            <li key={opt.value}>
              <button
                type="button"
                className={`dropdown__option ${selected?.value === opt.value ? "is-selected" : ""}`}
                role="option"
                aria-selected={selected?.value === opt.value}
                onClick={() => handleSelect(opt)}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;

