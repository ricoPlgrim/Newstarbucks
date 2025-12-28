import { useState, useEffect } from "react";
import "./ScrollTop.scss";

type ScrollTopProps = {
  showAfter?: number; // 이 픽셀 이상 스크롤했을 때 표시 (기본값: 400)
  smooth?: boolean; // 부드러운 스크롤 사용 여부 (기본값: true)
  className?: string;
};

/**
 * ScrollTop 컴포넌트
 * 페이지를 스크롤했을 때 나타나서 클릭하면 페이지 상단으로 이동하는 버튼
 * @param {number} showAfter - 이 픽셀 이상 스크롤했을 때 표시 (기본값: 400)
 * @param {boolean} smooth - 부드러운 스크롤 사용 여부 (기본값: true)
 * @param {string} className - 추가 클래스명
 */
const ScrollTop = ({
  showAfter = 100,
  smooth = true,
  className = "",
}: ScrollTopProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(scrollTop > showAfter);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 초기 상태 확인

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showAfter]);

  const scrollToTop = (): void => {
    if (smooth) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      window.scrollTo(0, 0);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      className={`scroll-top show ${className}`.trim()}
      onClick={scrollToTop}
      aria-label="맨 위로 이동"
      type="button"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
};

export default ScrollTop;

