import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import PublishingGuidePage from "./pages/PublishingGuidePage/PublishingGuidePage";
import PublishingUrlPage from "./pages/PublishingUrlPage/PublishingUrlPage";
import SamplePage from "./pages/SamplePage/SamplePage";
import AmericanoPage from "./pages/AmericanoPage/AmericanoPage";
import SearchSamplePage from "./pages/SearchSamplePage/SearchSamplePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ReportPage from "./pages/ReportPage/ReportPage";
import MobileOfficeHomePage from "./pages/MobileOfficeHomePage/MobileOfficeHomePage";
import Footer from "./components/Footer/Footer";
import "./App.scss";

function AppNav() {
  const location = useLocation();
  
  return (
    <nav className="app-nav">
      <Link
        to="/url"
        className={`app-nav-btn ${location.pathname === "/url" ? "active" : ""}`}
      >
        URL 관리
      </Link>
      <Link
        to="/guide"
        className={`app-nav-btn ${location.pathname === "/guide" ? "active" : ""}`}
      >
        퍼블리싱 가이드
      </Link>
      <Link
        to="/sample"
        className={`app-nav-btn ${location.pathname === "/sample" ? "active" : ""}`}
      >
        샘플 페이지
      </Link>
    </nav>
  );
}

function App() {
  // GitHub Pages의 base path 설정
  // package.json의 homepage 필드: "https://ricoplgrim.github.io/Newstarbucks"
  // basename은 URL의 pathname 부분만 사용: "/Newstarbucks"
  // 개발 환경에서는 빈 문자열, 프로덕션에서는 "/Newstarbucks"
  const basename = process.env.NODE_ENV === 'production' ? '/Newstarbucks' : '';
  
  return (
    <BrowserRouter basename={basename}>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isReportPage = location.pathname === '/report';
  const isMobileOfficeHome = location.pathname === '/mobile-office';
  
  return (
    <div className="app">
      {!isLoginPage && !isReportPage && !isMobileOfficeHome && <AppNav />}
      
      <Routes>
        <Route path="/url" element={<PublishingUrlPage />} />
        <Route path="/guide" element={<PublishingGuidePage />} />
        <Route path="/sample" element={<SamplePage />} />
        <Route path="/search-sample" element={<SearchSamplePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/mobile-office" element={<MobileOfficeHomePage />} />
        <Route path="/menu/coffee/americano" element={<AmericanoPage />} />
        <Route path="/" element={<PublishingUrlPage />} />
      </Routes>

      {!isLoginPage && !isReportPage && !isMobileOfficeHome && <Footer />}
    </div>
  );
}

export default App;
