import React, { useRef, useEffect, useState } from "react";
import Lottie from "lottie-react";
import "./Lottie.scss";

/**
 * Lottie 애니메이션 컴포넌트
 * @param {Object} props
 * @param {Object|string} props.animationData - Lottie JSON 데이터 또는 URL
 * @param {boolean} props.loop - 반복 재생 여부 (기본값: true)
 * @param {boolean} props.autoplay - 자동 재생 여부 (기본값: true)
 * @param {number} props.speed - 재생 속도 (기본값: 1)
 * @param {string} props.className - 추가 CSS 클래스
 * @param {number} props.width - 너비 (px)
 * @param {number} props.height - 높이 (px)
 * @param {Function} props.onComplete - 애니메이션 완료 시 콜백
 * @param {Function} props.onLoopComplete - 루프 완료 시 콜백
 */
const LottieAnimation = ({
  animationData,
  loop = true,
  autoplay = true,
  speed = 1,
  className = "",
  width,
  height,
  onComplete,
  onLoopComplete,
}) => {
  const lottieRef = useRef(null);

  // animationData가 URL인 경우 처리
  const [animationJson, setAnimationJson] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (typeof animationData === "string") {
      setIsLoading(true);
      setError(null);
      fetch(animationData)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          setAnimationJson(data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Lottie 애니메이션 로드 실패:", err);
          setError(err);
          setIsLoading(false);
        });
    } else if (animationData) {
      setAnimationJson(animationData);
    }
  }, [animationData]);

  // speed 변경 시 애니메이션 속도 업데이트
  useEffect(() => {
    if (lottieRef.current && lottieRef.current.setSpeed) {
      lottieRef.current.setSpeed(speed);
    }
  }, [speed]);

  if (isLoading) {
    return (
      <div className={`lottie-container ${className}`} style={{ width, height }}>
        <div className="lottie-loading">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`lottie-container ${className}`} style={{ width, height }}>
        <div className="lottie-error">애니메이션을 불러올 수 없습니다.</div>
      </div>
    );
  }

  if (!animationJson) {
    return null;
  }

  return (
    <div className={`lottie-container ${className}`} style={{ width, height }}>
      <Lottie
        lottieRef={lottieRef}
        animationData={animationJson}
        loop={loop}
        autoplay={autoplay}
        speed={speed}
        onComplete={onComplete}
        onLoopComplete={onLoopComplete}
      />
    </div>
  );
};

export default LottieAnimation;

