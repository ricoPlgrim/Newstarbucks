import "./EmptyState.scss";

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
  description,
  icon,
  action,
  variant = "default",
  className = "",
}) => {
  return (
    <div className={`empty-state empty-state--${variant} ${className}`}>
      {icon && <div className="empty-state__icon">{icon}</div>}
      <h3 className="empty-state__title">{title}</h3>
      {description && <p className="empty-state__description">{description}</p>}
      {action && <div className="empty-state__action">{action}</div>}
    </div>
  );
};

export default EmptyState;

