import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import PublishingGuidePage from "./pages/PublishingGuidePage/PublishingGuidePage";
import PublishingUrlPage from "./pages/PublishingUrlPage/PublishingUrlPage";
import SamplePage from "./pages/SamplePage/SamplePage";
import AmericanoPage from "./pages/AmericanoPage/AmericanoPage";
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
      <div className="app">
        <AppNav />
        
        <Routes>
          <Route path="/url" element={<PublishingUrlPage />} />
          <Route path="/guide" element={<PublishingGuidePage />} />
          <Route path="/sample" element={<SamplePage />} />
          <Route path="/menu/coffee/americano" element={<AmericanoPage />} />
          <Route path="/" element={<PublishingUrlPage />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
