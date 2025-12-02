import { useState } from "react";
import PublishingGuidePage from "./pages/PublishingGuidePage/PublishingGuidePage";
import PublishingUrlPage from "./pages/PublishingUrlPage/PublishingUrlPage";
import "./App.scss";

function App() {
  const [currentPage, setCurrentPage] = useState("url");

  return (
    <div className="app">
      <nav className="app-nav">
        <button
          className={`app-nav-btn ${currentPage === "url" ? "active" : ""}`}
          onClick={() => setCurrentPage("url")}
        >
          URL 관리
        </button>
        <button
          className={`app-nav-btn ${currentPage === "guide" ? "active" : ""}`}
          onClick={() => setCurrentPage("guide")}
        >
          퍼블리싱 가이드
        </button>
      </nav>

      {currentPage === "guide" ? <PublishingGuidePage /> : <PublishingUrlPage />}
    </div>
  );
}

export default App;
