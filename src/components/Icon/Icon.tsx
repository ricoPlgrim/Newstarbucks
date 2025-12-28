import "./Icon.scss";
import type { CSSProperties, MouseEventHandler, ReactNode } from "react";

type IconSize = "small" | "medium" | "large" | "xlarge";
type IconColor = "default" | "muted" | "accent" | "success" | "warning" | "error" | "info";

type IconProps = {
  children: ReactNode;
  name?: string;
  size?: IconSize;
  color?: IconColor;
  clickable?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  style?: CSSProperties;
};

/**
 * Icon 컴포넌트
 * @param {string|ReactNode} children - 아이콘 내용 (이모지, SVG, 텍스트 등)
 * @param {string} name - 아이콘 이름 (접근성용, aria-label에 사용)
 * @param {string} size - 아이콘 크기 ('small' | 'medium' | 'large' | 'xlarge', 기본값: 'medium')
 *                        - small: 16px (1rem)
 *                        - medium: 20px (1.25rem)
 *                        - large: 24px (1.5rem)
 *                        - xlarge: 32px (2rem)
 * @param {string} color - 아이콘 색상 ('default' | 'muted' | 'accent' | 'success' | 'warning' | 'error' | 'info', 기본값: 'default')
 * @param {boolean} clickable - 클릭 가능 여부 (기본값: false)
 * @param {function} onClick - 클릭 핸들러 (clickable이 true일 때)
 * @param {string} className - 추가 클래스명
 * @param {object} style - 인라인 스타일 (선택)
 */
const Icon = ({
  children,
  name,
  size = "medium",
  color = "default",
  clickable = false,
  onClick,
  className = "",
  style,
}: IconProps) => {
  const classes = [
    "icon",
    `icon--${size}`,
    color !== "default" && `icon--color-${color}`,
    clickable && "icon--clickable",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (clickable) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={classes}
        style={style}
        aria-label={name || "아이콘"}
      >
        {children}
      </button>
    );
  }

  return (
    <span className={classes} style={style} aria-label={name} role={name ? "img" : undefined}>
      {children}
    </span>
  );
};

export default Icon;

