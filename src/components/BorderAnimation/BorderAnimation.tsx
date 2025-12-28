import "./BorderAnimation.scss";
import type { CSSProperties, ReactNode } from "react";

type BorderAnimationVariant = "rotate" | "shimmer" | "pulse" | "gradient";

type BorderAnimationProps = {
  variant?: BorderAnimationVariant;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

/**
 * BorderAnimation 컴포넌트
 * 다양한 보더 애니메이션 효과를 제공합니다.
 * @param {string} variant - 애니메이션 타입 ('rotate' | 'shimmer' | 'pulse' | 'gradient')
 * @param {ReactNode} children - 내부 콘텐츠
 * @param {string} className - 추가 CSS 클래스
 * @param {object} style - 인라인 스타일
 */
const BorderAnimation = ({ 
  variant = "rotate", 
  children, 
  className = "",
  style 
}: BorderAnimationProps) => {
  return (
    <div 
      className={`border-animation border-animation--${variant} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default BorderAnimation;

