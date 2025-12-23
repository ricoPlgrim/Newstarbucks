import { useState, useEffect } from "react";
import PublishingGuidePage from "./pages/PublishingGuidePage/PublishingGuidePage";
import PublishingUrlPage from "./pages/PublishingUrlPage/PublishingUrlPage";
import SamplePage from "./pages/SamplePage/SamplePage";
import AmericanoPage from "./pages/AmericanoPage/AmericanoPage";
import Footer from "./components/Footer/Footer";
import "./App.scss";

function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    // URL 파라미터에서 페이지 확인 (새 창에서 열 때 사용)
    const urlParams = new URLSearchParams(window.location.search);
    const pageFromUrl = urlParams.get('page');
    if (pageFromUrl) {
      sessionStorage.setItem('currentPage', pageFromUrl);
      return pageFromUrl;
    }
    // 초기 페이지는 sessionStorage에서 가져옴 (없으면 'url')
    return sessionStorage.getItem('currentPage') || 'url';
  });

  // 브라우저 스크롤 복원
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // 초기 로드 시 저장된 스크롤 위치 복원
    const savedScrollY = sessionStorage.getItem(`scroll-${currentPage}`);
    if (savedScrollY) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedScrollY, 10));
      }, 0);
    }
  }, [currentPage]);

  // 페이지 변경 시 스크롤 위치 저장
  const handlePageChange = (page) => {
    // 현재 페이지의 스크롤 위치 저장
    const currentScrollY = window.scrollY;
    sessionStorage.setItem(`scroll-${currentPage}`, currentScrollY);

    // 현재 페이지 상태 저장
    sessionStorage.setItem('currentPage', page);

    setCurrentPage(page);

    // 새 페이지의 저장된 스크롤 위치 복원
    setTimeout(() => {
      const savedScrollY = sessionStorage.getItem(`scroll-${page}`);
      if (savedScrollY) {
        window.scrollTo(0, parseInt(savedScrollY, 10));
      } else {
        window.scrollTo(0, 0);
      }
    }, 0);
  };

  return (
    <div className="app">
      <nav className="app-nav">
        <button
          className={`app-nav-btn ${currentPage === "url" ? "active" : ""}`}
          onClick={() => handlePageChange("url")}
        >
          URL 관리
        </button>
        <button
          className={`app-nav-btn ${currentPage === "guide" ? "active" : ""}`}
          onClick={() => handlePageChange("guide")}
        >
          퍼블리싱 가이드
        </button>
        <button
          className={`app-nav-btn ${currentPage === "sample" ? "active" : ""}`}
          onClick={() => handlePageChange("sample")}
        >
          샘플 페이지
        </button>
      </nav>

      {currentPage === "guide" && <PublishingGuidePage />}
      {currentPage === "url" && <PublishingUrlPage onPageChange={handlePageChange} />}
      {currentPage === "sample" && <SamplePage />}
      {currentPage === "americano" && <AmericanoPage />}

      <Footer />
    </div>
  );
}

export default App;
