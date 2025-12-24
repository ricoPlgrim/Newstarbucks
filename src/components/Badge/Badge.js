import "./Badge.scss";

/**
 * Badge 컴포넌트
 * @param {string} children - 뱃지 텍스트
 * @param {string} variant - 'default' | 'success' | 'warning' | 'error' | 'info'
 * @param {string} size - 'small' | 'medium' | 'large'
 * @param {boolean} outlined - 아웃라인 스타일 여부
 * @param {string} className - 추가 클래스명
 */
const Badge = ({
  children,
  variant = "default",
  size = "medium",
  outlined = false,
  className = "",
}) => {
  return (
    <span
      className={`badge badge--${variant} badge--${size} ${
        outlined ? "badge--outlined" : ""
      } ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;

