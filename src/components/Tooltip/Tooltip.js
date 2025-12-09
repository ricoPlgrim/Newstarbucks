import { useState, useRef, useEffect } from "react";
import "./Tooltip.scss";

const Tooltip = ({ label = "도움말", text = "툴팁 내용", placement = "top" }) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (!triggerRef.current) return;
      if (!triggerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("click", onClickOutside);
    return () => document.removeEventListener("click", onClickOutside);
  }, [open]);

  return (
    <div className={`tooltip ${open ? "is-open" : ""}`} data-placement={placement} ref={triggerRef}>
      <button
        type="button"
        className="tooltip__trigger"
        aria-label={label}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        ?
      </button>
      {open && (
        <div className={`tooltip__bubble tooltip__bubble--${placement}`} role="status">
          <span className="tooltip__text">{text}</span>
          <span className="tooltip__arrow" aria-hidden="true" />
        </div>
      )}
    </div>
  );
};

export default Tooltip;

