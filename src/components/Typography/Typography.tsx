import "./Typography.scss";
import type { CSSProperties, ReactNode, ElementType } from "react";

type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body"
  | "caption"
  | "overline";

type TypographySize = "small" | "medium" | "large";
type TypographyColor = "default" | "muted" | "accent" | "inherit";
type TypographyWeight = "normal" | "medium" | "semibold" | "bold";
type TypographyAlign = "left" | "center" | "right" | "justify";

type TypographyProps = {
  variant?: TypographyVariant;
  size?: TypographySize;
  as?: ElementType;
  color?: TypographyColor;
  weight?: TypographyWeight;
  align?: TypographyAlign;
  truncate?: boolean;
  lineClamp?: number;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

/**
 * Typography 컴포넌트
 * @param {string} variant - 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption' | 'overline' (기본값: 'body')
 * @param {string} size - 'small' | 'medium' | 'large' (variant에 따라 기본값 다름)
 * @param {string} as - 실제 렌더링할 HTML 태그 (기본값: variant에 따라 자동 결정)
 * @param {string} color - 텍스트 색상 ('default' | 'muted' | 'accent' | 'inherit')
 * @param {string} weight - 폰트 굵기 ('normal' | 'medium' | 'semibold' | 'bold')
 * @param {string} align - 텍스트 정렬 ('left' | 'center' | 'right' | 'justify')
 * @param {boolean} truncate - 텍스트 말줄임표 표시 (기본값: false)
 * @param {number} lineClamp - 최대 줄 수 (truncate와 함께 사용)
 * @param {ReactNode} children - 텍스트 내용
 * @param {string} className - 추가 클래스명
 * @param {object} style - 인라인 스타일 (선택)
 */
const Typography = ({
  variant = "body",
  size,
  as,
  color = "default",
  weight,
  align,
  truncate = false,
  lineClamp,
  children,
  className = "",
  style,
}: TypographyProps) => {
  // variant에 따라 기본 태그 결정
  const getDefaultTag = (): "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" => {
    switch (variant) {
      case "h1":
      case "h2":
      case "h3":
      case "h4":
      case "h5":
      case "h6":
        return variant;
      case "caption":
      case "overline":
        return "span";
      case "body":
      default:
        return "p";
    }
  };

  const Component = as || getDefaultTag();

  // 클래스명 조합
  const classes = [
    "typography",
    `typography--${variant}`,
    size && `typography--${size}`,
    color !== "default" && `typography--color-${color}`,
    weight && `typography--weight-${weight}`,
    align && `typography--align-${align}`,
    truncate && "typography--truncate",
    lineClamp && `typography--line-clamp-${lineClamp}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component className={classes} style={style}>
      {children}
    </Component>
  );
};

export default Typography;

