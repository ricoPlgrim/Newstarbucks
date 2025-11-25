import { useEffect, useMemo, useState } from "react";
import AccessibilityHelper from "../AccessibilityHelper/AccessibilityHelper";
import "./PageTemplate.scss";

const prefersDarkQuery = "(prefers-color-scheme: dark)";
const STORAGE_KEYS = {
  THEME: "accessibility-theme",
  FONT_SCALE: "accessibility-font-scale",
};

function PageTemplate({ children, title = "페이지 제목" }) {
  // localStorage에서 저장된 설정 불러오기
  const getStoredTheme = () => {
    if (typeof window === "undefined" || !window.localStorage) {
      return null;
    }
    const stored = localStorage.getItem(STORAGE_KEYS.THEME);
    if (stored === "dark" || stored === "light") {
      return stored === "dark";
    }
    return null;
  };

  const getStoredFontScale = () => {
    if (typeof window === "undefined" || !window.localStorage) {
      return null;
    }
    const stored = localStorage.getItem(STORAGE_KEYS.FONT_SCALE);
    if (["small", "normal", "large", "xlarge"].includes(stored)) {
      return stored;
    }
    return null;
  };

  const prefersDark = useMemo(() => {
    if (typeof window === "undefined" || !window.matchMedia) {
      return false;
    }
    return window.matchMedia(prefersDarkQuery).matches;
  }, []);

  // 저장된 설정이 있으면 사용, 없으면 시스템 설정 또는 기본값 사용
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const stored = getStoredTheme();
    return stored !== null ? stored : prefersDark;
  });

  const [fontScale, setFontScale] = useState(() => {
    const stored = getStoredFontScale();
    return stored || "normal";
  });

  // 다크모드 변경 시 localStorage에 저장
  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }
    document.documentElement.dataset.theme = isDarkMode ? "dark" : "light";
    
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem(STORAGE_KEYS.THEME, isDarkMode ? "dark" : "light");
    }
  }, [isDarkMode]);

  // 폰트 스케일 변경 시 localStorage에 저장
  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }
    document.documentElement.dataset.fontScale = fontScale;
    
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem(STORAGE_KEYS.FONT_SCALE, fontScale);
    }
  }, [fontScale]);

  // 초기 로드 시 저장된 설정 적용
  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }
    
    const storedTheme = getStoredTheme();
    const storedFontScale = getStoredFontScale();
    
    if (storedTheme !== null) {
      document.documentElement.dataset.theme = storedTheme ? "dark" : "light";
    } else {
      document.documentElement.dataset.theme = prefersDark ? "dark" : "light";
    }
    
    if (storedFontScale) {
      document.documentElement.dataset.fontScale = storedFontScale;
    } else {
      document.documentElement.dataset.fontScale = "normal";
    }
  }, [prefersDark]);

  return (
    <div className="page-template">
      <header className="page-template__header">
        <h1 className="page-template__title">{title}</h1>
      </header>

      <main className="page-template__main font-scale-applied">
        {children}
      </main>

      <AccessibilityHelper
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        fontScale={fontScale}
        setFontScale={setFontScale}
      />
    </div>
  );
}

export default PageTemplate;

