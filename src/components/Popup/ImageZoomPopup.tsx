import { useRef, useState } from "react";
import Image from "../Image/Image";
import Loading from "../Loading/Loading";
import Typography from "../Typography/Typography";
import "./Popup.scss";

/**
 * ImageZoomPopup 컴포넌트
 * 이미지를 확대하여 보여주는 풀스크린 팝업 컴포넌트
 * 핀치 줌(두 손가락) 및 마우스 휠/트랙패드로 확대/축소 가능
 * 
 * @param {string} src - 이미지 URL
 * @param {string} alt - 이미지 대체 텍스트 (기본값: "Zoom image")
 * @param {boolean} open - 팝업 열림/닫힘 상태
 * @param {function} onClose - 팝업 닫기 핸들러
 */
const ImageZoomPopup = ({ src, alt = "Zoom image", open, onClose }) => {
  // 이미지 확대/축소 배율 (1 ~ 3배)
  const [scale, setScale] = useState(1);
  // 이미지 로딩 상태
  const [isLoading, setIsLoading] = useState(true);
  // 핀치 줌 시작 정보 저장 (터치 거리, 시작 배율)
  const pinchRef = useRef(null);

  // 배율을 1 ~ 3 범위로 제한하는 함수
  const clampScale = (value) => Math.min(3, Math.max(1, value));

  // 마우스 휠/트랙패드 핸들러
  // 휠을 위로 올리면 확대, 아래로 내리면 축소
  const handleWheel = (e) => {
    e.preventDefault();
    const delta = -e.deltaY * 0.0015; // trackpad/마우스 휠 확대 축소 지원
    setScale((prev) => clampScale(parseFloat((prev + delta).toFixed(3))));
  };

  // 두 터치 포인트 간의 거리 계산 함수
  const getDistance = (touches) => {
    const [a, b] = touches;
    const dx = a.clientX - b.clientX;
    const dy = a.clientY - b.clientY;
    return Math.hypot(dx, dy);
  };

  // 터치 시작 핸들러 (핀치 줌 시작)
  // 두 손가락으로 터치했을 때 시작 거리와 현재 배율 저장
  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      const dist = getDistance(e.touches);
      pinchRef.current = { startScale: scale, startDist: dist };
    }
  };

  // 터치 이동 핸들러 (핀치 줌 중)
  // 두 손가락 간 거리 변화에 따라 배율 조정
  const handleTouchMove = (e) => {
    if (e.touches.length === 2 && pinchRef.current) {
      e.preventDefault();
      const dist = getDistance(e.touches);
      // 거리 비율에 따라 배율 계산
      const next = (pinchRef.current.startScale * dist) / pinchRef.current.startDist;
      setScale(clampScale(parseFloat(next.toFixed(3))));
    }
  };

  // 터치 종료 핸들러 (핀치 줌 종료)
  const handleTouchEnd = () => {
    pinchRef.current = null;
  };

  // 팝업이 닫혀있으면 렌더링하지 않음
  if (!open) return null;

  return (
    <div className="popup-overlay popup-overlay--full" onClick={onClose}>
      <div className="popup popup--full popup--image-zoom" onClick={(e) => e.stopPropagation()}>
        {/* 헤더 영역: 제목 + 닫기 버튼 */}
        <div className="popup__header">
          <Typography variant="h4" size="small">이미지 확대 보기</Typography>
          <button className="popup__close" onClick={onClose} aria-label="닫기">✕</button>
        </div>
        {/* 사용 안내 텍스트 */}
        <Typography variant="body" size="small" color="muted" className="popup__zoom-hint">
          두 손가락으로 핀치 줌(확대/축소), 트랙패드/휠로도 확대 가능합니다.
        </Typography>
        {/* 이미지 뷰포트 영역 (확대/축소 이벤트 처리) */}
        <div
          className="popup__image-viewport"
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* 이미지 로딩 중 표시 */}
          {isLoading && (
            <div className="popup__image-loading">
              <Loading size={48} thickness={4} label="이미지 로딩 중..." />
            </div>
          )}
          {/* 확대/축소 가능한 이미지 */}
          <Image
            src={src}
            alt={alt}
            className="popup__image-zoom-element"
            style={{ transform: `scale(${scale})` }}
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
            showFallback={true}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageZoomPopup;

