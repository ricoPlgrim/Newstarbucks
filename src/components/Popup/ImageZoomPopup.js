import { useRef, useState } from "react";
import Image from "../Image/Image";
import Loading from "../Loading/Loading";
import "./Popup.scss";

const ImageZoomPopup = ({ src, alt = "Zoom image", open, onClose }) => {
  const [scale, setScale] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const pinchRef = useRef(null);

  const clampScale = (value) => Math.min(3, Math.max(1, value));

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = -e.deltaY * 0.0015; // trackpad/마우스 휠 확대 축소 지원
    setScale((prev) => clampScale(parseFloat((prev + delta).toFixed(3))));
  };

  const getDistance = (touches) => {
    const [a, b] = touches;
    const dx = a.clientX - b.clientX;
    const dy = a.clientY - b.clientY;
    return Math.hypot(dx, dy);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      const dist = getDistance(e.touches);
      pinchRef.current = { startScale: scale, startDist: dist };
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2 && pinchRef.current) {
      e.preventDefault();
      const dist = getDistance(e.touches);
      const next = (pinchRef.current.startScale * dist) / pinchRef.current.startDist;
      setScale(clampScale(parseFloat(next.toFixed(3))));
    }
  };

  const handleTouchEnd = () => {
    pinchRef.current = null;
  };

  if (!open) return null;

  return (
    <div className="popup-overlay popup-overlay--full" onClick={onClose}>
      <div className="popup popup--full popup--image-zoom" onClick={(e) => e.stopPropagation()}>
        <div className="popup__header">
          <h4>이미지 확대 보기</h4>
          <button className="popup__close" onClick={onClose}>✕</button>
        </div>
        <p className="popup__zoom-hint">두 손가락으로 핀치 줌(확대/축소), 트랙패드/휠로도 확대 가능합니다.</p>
        <div
          className="popup__image-viewport"
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {isLoading && (
            <div className="popup__image-loading">
              <Loading size={48} thickness={4} label="이미지 로딩 중..." />
            </div>
          )}
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

