import "./Button.scss";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "small" | "medium" | "large";

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> & {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  type?: "button" | "submit" | "reset";
};

/**
 * Button 컴포넌트
 * @param {ReactNode} children - 버튼 내용
 * @param {string} variant - 'primary' | 'secondary' | 'ghost' (기본값: 'primary')
 * @param {string} size - 'small' | 'medium' | 'large' (기본값: 'medium')
 * @param {boolean} disabled - 비활성화 여부 (기본값: false)
 * @param {string} type - 버튼 타입 ('button' | 'submit' | 'reset', 기본값: 'button')
 * @param {function} onClick - 클릭 핸들러
 * @param {string} className - 추가 클래스명
 * @param {object} style - 인라인 스타일 (선택)
 * @param {object} ...props - 기타 button 속성
 */
const Button = ({
  children,
  variant = "primary",
  size = "medium",
  disabled = false,
  type = "button",
  onClick,
  className = "",
  style,
  ...props
}: ButtonProps) => {
  const classes = [
    "button",
    `button--${variant}`,
    `button--${size}`,
    disabled && "button--disabled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

