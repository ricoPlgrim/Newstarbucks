import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * PageScrollReset 컴포넌트
 * 페이지 전환 시 스크롤을 맨 위로 이동시킴
 * useLayoutEffect를 사용하여 화면 렌더링 전에 스크롤을 리셋하여 이전 페이지 화면이 보이는 것을 방지
 */
const PageScrollReset = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // 경로가 변경될 때마다 DOM 업데이트 후, 화면 그리기 전에 스크롤을 맨 위로 이동
    window.scrollTo(0, 0);
    // document.documentElement와 document.body도 함께 리셋
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return null;
};

export default PageScrollReset;

