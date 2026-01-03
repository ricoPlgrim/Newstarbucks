import { useState, useRef, useEffect } from "react";
import "./Dropdown.scss";

type DropdownOption = { value: string; label: string };
type DropdownVariant = "outline" | "filled" | "ghost";

type DropdownProps = {
  options?: DropdownOption[];
  value?: string; 
  variant?: DropdownVariant;
  placeholder?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  onChange?: (opt: DropdownOption) => void;
};

const defaultOptions: DropdownOption[] = [
  { value: "opt1", label: "옵션 1" },
  { value: "opt2", label: "옵션 2" },
  { value: "opt3", label: "옵션 3" },
];

const Dropdown = ({
  options = defaultOptions,
  value,
  variant = "outline", // outline | filled | ghost
  placeholder = "선택하세요",
  disabled = false,
  fullWidth = false,
  onChange,
}: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(options[0] || null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", onClickOutside);
    return () => document.removeEventListener("click", onClickOutside);
  }, []);

   // ⭐ value가 있으면 그 value에 맞는 옵션을 선택값으로 동기화
   useEffect(() => {
    if (!options.length) {
      setSelected(null);
      return;
    }

    const next = options.find((o) => o.value === value) ?? options[0];
    setSelected(next);
  }, [value, options]);


  const handleSelect = (opt: DropdownOption) => {
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

