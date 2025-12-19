import { useEffect } from "react";
import "./Toast.scss";

function Toast({ message, type = "info", duration = 3000, onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div className={`toast toast--${type}`} role="status" aria-live="polite" onClick={onClose}>
      <span className="toast__dot" aria-hidden="true" />
      <span className="toast__message">{message}</span>
      <button type="button" className="toast__close" onClick={onClose} aria-label="토스트 닫기">
        ✕
      </button>
    </div>
  );
}

export default Toast;

