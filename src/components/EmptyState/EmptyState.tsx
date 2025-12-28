import Typography from "../Typography/Typography";
import "./EmptyState.scss";
import type { ReactNode } from "react";

type EmptyStateVariant = "default" | "minimal" | "illustration";

type EmptyStateProps = {
  title?: string;
  /** @deprecated message는 description의 별칭입니다. */
  message?: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  variant?: EmptyStateVariant;
  className?: string;
};

/**
 * EmptyState 컴포넌트
 * 데이터가 없을 때 표시하는 빈 상태 UI
 * 
 * @param {string} title - 제목 텍스트
 * @param {string} description - 설명 텍스트
 * @param {ReactNode} icon - 아이콘 (이모지, SVG, 컴포넌트 등)
 * @param {ReactNode} action - 액션 버튼/링크
 * @param {string} variant - 'default' | 'minimal' | 'illustration' (기본값: 'default')
 * @param {string} className - 추가 클래스명
 */
const EmptyState = ({
  title = "데이터가 없습니다",
  message,
  description,
  icon,
  action,
  variant = "default",
  className = "",
}: EmptyStateProps) => {
  const displayDescription = description ?? message;

  return (
    <div className={`empty-state empty-state--${variant} ${className}`}>
      {/* 아이콘 영역 (이모지, SVG, 컴포넌트 등) */}
      {icon && <div className="empty-state__icon">{icon}</div>}
      {/* 제목 텍스트 */}
      <Typography variant="h3" size="small" className="empty-state__title">
        {title}
      </Typography>
      {/* 설명 텍스트 */}
      {displayDescription && (
        <Typography variant="body" size="small" color="muted" className="empty-state__description">
          {displayDescription}
        </Typography>
      )}
      {/* 액션 버튼/링크 영역 */}
      {action && <div className="empty-state__action">{action}</div>}
    </div>
  );
};

export default EmptyState;

