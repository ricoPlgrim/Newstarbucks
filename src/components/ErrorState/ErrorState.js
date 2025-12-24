import "./ErrorState.scss";

/**
 * ErrorState 컴포넌트
 * 에러 발생 시 표시하는 공통 에러 화면
 * 
 * @param {string} title - 제목 텍스트
 * @param {string} message - 에러 메시지
 * @param {ReactNode} icon - 아이콘 (이모지, SVG, 컴포넌트 등)
 * @param {ReactNode} action - 액션 버튼/링크 (재시도 버튼 등)
 * @param {string} type - 'error' | 'nodata' | 'network' | 'notfound' (기본값: 'error')
 * @param {string} className - 추가 클래스명
 */
const ErrorState = ({
  title,
  message,
  icon,
  action,
  type = "error",
  className = "",
}) => {
  // 타입별 기본값
  const defaultConfig = {
    error: {
      title: "오류가 발생했습니다",
      message: "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      icon: "⚠️",
    },
    nodata: {
      title: "데이터를 불러올 수 없습니다",
      message: "데이터를 불러오는 중 문제가 발생했습니다.",
      icon: "📭",
    },
    network: {
      title: "네트워크 오류",
      message: "인터넷 연결을 확인하고 다시 시도해주세요.",
      icon: "📡",
    },
    notfound: {
      title: "페이지를 찾을 수 없습니다",
      message: "요청하신 페이지가 존재하지 않습니다.",
      icon: "🔍",
    },
  };

  const config = defaultConfig[type] || defaultConfig.error;
  const displayTitle = title || config.title;
  const displayMessage = message || config.message;
  const displayIcon = icon !== undefined ? icon : config.icon;

  return (
    <div className={`error-state error-state--${type} ${className}`}>
      <div className="error-state__icon">{displayIcon}</div>
      <h3 className="error-state__title">{displayTitle}</h3>
      {displayMessage && <p className="error-state__message">{displayMessage}</p>}
      {action && <div className="error-state__action">{action}</div>}
    </div>
  );
};

export default ErrorState;

