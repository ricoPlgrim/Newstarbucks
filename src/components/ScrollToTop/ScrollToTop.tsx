import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop 컴포넌트
 * 페이지 전환 시 스크롤을 맨 위로 이동시킴
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 경로가 변경될 때마다 스크롤을 맨 위로 이동
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;

