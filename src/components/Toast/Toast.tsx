import { useEffect } from "react";
import "./Toast.scss";

function Toast({ message, type = "info", duration = 3000, onClose }) {
  // useEffect는 항상 호출되어야 하므로 early return 전에 호출
  useEffect(() => {
    if (!message || typeof message !== 'string' || !message.trim()) return;
    const timer = setTimeout(() => {
      onClose?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  // message가 없거나 빈 문자열이면 렌더링하지 않음
  if (!message || typeof message !== 'string' || !message.trim()) {
    return null;
  }

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

