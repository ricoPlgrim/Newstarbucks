import Typography from "../Typography/Typography";
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
  // 타입별 기본값 설정
  // 각 에러 타입에 맞는 기본 제목, 메시지, 아이콘을 제공
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

  // 현재 타입에 맞는 기본 설정 가져오기 (없으면 error 타입 사용)
  const config = defaultConfig[type] || defaultConfig.error;
  // props로 전달된 값이 있으면 사용, 없으면 기본값 사용
  const displayTitle = title || config.title;
  const displayMessage = message || config.message;
  // icon은 undefined일 수 있으므로 명시적으로 체크
  const displayIcon = icon !== undefined ? icon : config.icon;

  return (
    <div className={`error-state error-state--${type} ${className}`}>
      <div className="error-state__icon">{displayIcon}</div>
      <Typography variant="h3" size="small" className="error-state__title">
        {displayTitle}
      </Typography>
      {displayMessage && (
        <Typography variant="body" size="small" color="muted" className="error-state__message">
          {displayMessage}
        </Typography>
      )}
      {action && <div className="error-state__action">{action}</div>}
    </div>
  );
};

export default ErrorState;

