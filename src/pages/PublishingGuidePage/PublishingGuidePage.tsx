import { useState, useEffect, useRef } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/vs2015.css"; // VS Code 다크 테마 스타일
import PageTemplate from "../../components/PageTemplate/PageTemplate";
import Image from "../../components/Image/Image";
import Header from "../../components/Header/Header";
import FileUpload from "../../components/FileUpload/FileUpload";
import Form from "../../components/Form/Form";
import Tabs from "../../components/Tabs/Tabs";
import Table from "../../components/Table/Table";
import DatePicker from "../../components/DatePicker/DatePicker";
import type { DateRange } from "react-day-picker";
import Tooltip from "../../components/Tooltip/Tooltip";
import DragDropList from "../../components/DragDropList/DragDropList";
import Carousel from "../../components/Carousel/Carousel";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade, EffectCube, EffectCoverflow, EffectFlip, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/effect-cube";
import "swiper/css/effect-coverflow";
import "swiper/css/effect-flip";
import Dropdown from "../../components/Dropdown/Dropdown";
import ImageZoomPopup from "../../components/Popup/ImageZoomPopup";
import { BasicPopup, BottomSheetPopup, FullscreenPopup } from "../../components/Popup/Popup";
import Toggle from "../../components/Toggle/Toggle";
import Toast from "../../components/Toast/Toast";
import BottomDock from "../../components/BottomDock/BottomDock";
import ListSync from "../../components/ListSync/ListSync";
import Footer from "../../components/Footer/Footer";
import "../../components/Popup/Popup.scss";
import "./PublishingGuidePage.scss";
import {
  fetchMockData,
  fetchMockToastMessages,
  fetchMockTabs,
  fetchMockDropdownOptions,
  fetchMockListSyncOptions,
  fetchMockCarouselSlides,
  fetchMockTableWide,
  fetchMockSamplePage,
  fetchMockUrls,
  fetchMockTableBasic,
} from "../../mocks/mockData";
import Skeleton from "../../components/Skeleton/Skeleton";
import SkeletonPlaceholder from "../../components/Skeleton/SkeletonPlaceholder";
import Loading from "../../components/Loading/Loading";
import Notice from "../../components/Notice/Notice";
import LottieAnimation from "../../components/Lottie/Lottie";
import Accordion from "../../components/Accordion/Accordion";
import Badge from "../../components/Badge/Badge";
import SearchField from "../../components/SearchField/SearchField";
import Input from "../../components/Input/Input";
import DataList from "../../components/DataList/DataList";
import Card from "../../components/Card/Card";
import Select from "../../components/Select/Select";
import Checkbox, { CheckboxGroup, type CheckboxOption } from "../../components/Checkbox/Checkbox";
import Radio, { RadioGroup } from "../../components/Radio/Radio";
import Textarea from "../../components/Textarea/Textarea";
import List, { ListItem } from "../../components/List/List";
import EmptyState from "../../components/EmptyState/EmptyState";
import ErrorState from "../../components/ErrorState/ErrorState";
import Typography from "../../components/Typography/Typography";
import Color, { ColorPalette, ColorTheme } from "../../components/Color/Color";
import Spacing, { SpacingScale, SpacingExample } from "../../components/Spacing/Spacing";
import Container, { ContainerScale, GridSystem } from "../../components/Layout/Layout";
import Icon from "../../components/Icon/Icon";
import Button from "../../components/Button/Button";
import BorderAnimation from "../../components/BorderAnimation/BorderAnimation";
import ListContainer from "../../components/ListContainer/ListContainer";
import ScrollTop from "../../components/ScrollTop/ScrollTop";
import Weather from "../../components/Weather/Weather";
import CommonLayout from "../../components/CommonLayout/CommonLayout";
import LoadingGrid from "../../components/LoadingGrid/LoadingGrid";
import AccessibilityHelper from "../../components/AccessibilityHelper/AccessibilityHelper";

// 코드 블록 컴포넌트 (구문 강조 적용)
const CodeBlock = ({ code, language = "tsx" }) => {
  const codeRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (codeRef.current) {
      // highlight.js로 구문 강조 적용
      hljs.highlightElement(codeRef.current);
    }
  }, [code]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("복사 실패:", err);
      // Fallback: 텍스트 영역을 사용한 복사
      const textArea = document.createElement("textarea");
      textArea.value = code;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      } catch (fallbackErr) {
        console.error("Fallback 복사 실패:", fallbackErr);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="guide-section__code-wrapper">
      <button
        className="guide-section__copy-button"
        onClick={handleCopy}
        aria-label={copied ? "Copied" : "Copy code"}
        title={copied ? "Copied!" : "Copy code"}
      >
        {copied ? (
          <>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13.3333 4L6 11.3333L2.66667 8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Copied</span>
          </>
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5.33333 2.66667H11.3333C12.0697 2.66667 12.6667 3.26362 12.6667 4V10.6667"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.6667 5.33333H3.33333C2.59695 5.33333 2 5.93029 2 6.66667V13.3333C2 14.0697 2.59695 14.6667 3.33333 14.6667H10C10.7364 14.6667 11.3333 14.0697 11.3333 13.3333V6.66667C11.3333 5.93029 10.7364 5.33333 10 5.33333H10.6667Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Copy</span>
          </>
        )}
      </button>
      <pre className="guide-section__code-pre">
        <code ref={codeRef} className={`language-${language}`}>
          {code}
        </code>
      </pre>
    </div>
  );
};

/**
 * Weather 컴포넌트 미리보기
 * 
 * Weather 컴포넌트의 다양한 사용 예제를 보여주는 프리뷰 컴포넌트입니다.
 * 목업 데이터와 실제 API 데이터를 모두 시연하며, 다양한 레이아웃과 사용 사례를 제공합니다.
 * 
 * @component
 * @returns {JSX.Element} Weather 컴포넌트 예제 모음
 */
const WeatherPreview = () => {
  /**
   * 환경 변수에서 API 키 확인
   * 
   * REACT_APP_WEATHER_API_KEY가 설정되어 있으면 실제 API를 사용할 수 있습니다.
   * 없으면 목업 데이터만 표시하고 API 사용 안내를 보여줍니다.
   */
  const hasApiKey = !!process.env.REACT_APP_WEATHER_API_KEY;
  
  return (
    <div className="guide-preview guide-preview--weather">
      <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        {/* 기본 사용 예제 */}
        <div>
          <h4 style={{ marginBottom: "16px", fontSize: "16px", fontWeight: 700, color: "var(--color-text)" }}>
            기본 사용 (목업 데이터)
          </h4>
          <p style={{ marginBottom: "16px", fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
            city, apiKey, useMock을 지정하지 않으면 기본값으로 목업 데이터를 사용합니다.
            목업 데이터는 항상 동일한 날씨 정보(20°C, 일부 맑음)를 표시합니다.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", width: "100%", maxWidth: "100%", overflowX: "hidden" }}>
            <Weather />
          </div>
        </div>

        {/* 실제 API 예제 */}
        {hasApiKey ? (
          <div>
            <h4 style={{ marginBottom: "16px", fontSize: "16px", fontWeight: 700, color: "var(--color-text)" }}>
              실제 API 데이터 예제
            </h4>
            <p style={{ marginBottom: "16px", fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
              OpenWeatherMap API를 사용하여 실제 날씨 데이터를 가져옵니다.
              각 도시의 현재 날씨 정보가 실시간으로 표시됩니다.
              API 호출 중에는 로딩 상태가 표시되고, 실패 시 에러 메시지가 표시됩니다.
            </p>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "16px", alignItems: "flex-start", flexWrap: "wrap", width: "100%", maxWidth: "100%" }}>
              <div style={{ width: "300px", flex: "0 0 300px", maxWidth: "100%" }}>
                <Weather city="Seoul" useMock={false} />
              </div>
              <div style={{ width: "300px", flex: "0 0 300px", maxWidth: "100%", padding: "12px", background: "var(--color-bg-secondary)", borderRadius: "8px", border: "1px solid var(--color-border)", display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                <p style={{ margin: 0, fontSize: "14px", color: "var(--color-text)", lineHeight: "1.6", fontWeight: 600 }}>
                  현재 도시: 서울로 세팅함
                </p>
                <p style={{ margin: "8px 0 0 0", fontSize: "13px", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
                  ✅ 실제 API가 연결되어 있습니다. 서울의 현재 날씨 정보를 확인할 수 있습니다.
                </p>
              </div>
            </div>
            <div style={{ marginTop: "32px" }}>
              <h4 style={{ marginBottom: "16px", fontSize: "16px", fontWeight: 700, color: "var(--color-text)" }}>
                GPS 위치 기반 날씨 조회 예제
              </h4>
              <p style={{ marginBottom: "16px", fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
                GPS 신호를 사용하여 현재 위치의 날씨 정보를 가져옵니다.
                브라우저에서 위치 권한을 요청하며, 허용 시 현재 위치의 날씨 정보가 표시됩니다.
              </p>
              <div style={{ width: "300px", maxWidth: "100%" }}>
                <Weather useGPS={true} useMock={false} />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h4 style={{ marginBottom: "16px", fontSize: "16px", fontWeight: 700, color: "var(--color-text)" }}>
              실제 API 데이터 예제
            </h4>
            <div style={{ padding: "20px", background: "var(--color-bg-secondary)", borderRadius: "8px", border: "1px solid var(--color-border)" }}>
              <p style={{ margin: "0 0 12px 0", fontSize: "14px", color: "var(--color-text)", fontWeight: 600 }}>
                💡 실제 API를 사용하려면
              </p>
              <ol style={{ margin: "0 0 12px 0", paddingLeft: "20px", fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: "1.8" }}>
                <li>
                  <code style={{ background: "var(--color-bg)", padding: "2px 6px", borderRadius: "4px", fontSize: "13px" }}>.env</code> 파일을 프로젝트 루트에 생성합니다.
                </li>
                <li>
                  <code style={{ background: "var(--color-bg)", padding: "2px 6px", borderRadius: "4px", fontSize: "13px" }}>REACT_APP_WEATHER_API_KEY=your-api-key-here</code>를 추가합니다.
                </li>
                <li>
                  OpenWeatherMap에서 API 키를 발급받으세요:{" "}
                  <a 
                    href="https://openweathermap.org/api" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: "var(--color-accent)", textDecoration: "underline" }}
                  >
                    https://openweathermap.org/api
                  </a>
                </li>
                <li>개발 서버를 재시작합니다.</li>
              </ol>
              <p style={{ margin: 0, fontSize: "13px", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
                ⚠️ 브라우저에서 직접 API를 호출할 경우 CORS 정책에 의해 차단될 수 있습니다.
                이 경우 프록시 서버를 사용하거나 백엔드 API를 통해 호출해야 합니다.
              </p>
            </div>
          </div>
        )}

        {/* 커스텀 클래스명 예제 */}
        <div>
          <h4 style={{ marginBottom: "16px", fontSize: "16px", fontWeight: 700, color: "var(--color-text)" }}>
            커스텀 클래스명 적용
          </h4>
          <p style={{ marginBottom: "16px", fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
            className prop을 사용하여 추가 스타일을 적용할 수 있습니다.
            CSS에서 .custom-weather 클래스를 정의하여 날씨 카드의 스타일을 커스터마이징할 수 있습니다.
          </p>
          <div style={{ maxWidth: "300px" }}>
            <Weather city="Seoul" useMock={true} className="custom-weather" />
          </div>
        </div>

        {/* 로딩 상태 예제 */}
        <div>
          <h4 style={{ marginBottom: "16px", fontSize: "16px", fontWeight: 700, color: "var(--color-text)" }}>
            로딩 상태
          </h4>
          <p style={{ marginBottom: "16px", fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
            날씨 정보를 불러오는 동안 Loading 컴포넌트가 표시됩니다.
            아래 예제는 로딩 상태를 계속 표시하는 예시입니다.
          </p>
          <div style={{ maxWidth: "300px" }}>
            <Card variant="content" className="weather">
              <div className="weather__loading">
                <Loading size={32} label="날씨 정보를 불러오는 중..." />
              </div>
            </Card>
          </div>
        </div>

        {/* 에러 상태 안내 */}
        <div>
          <h4 style={{ marginBottom: "16px", fontSize: "16px", fontWeight: 700, color: "var(--color-text)" }}>
            에러 상태
          </h4>
          <p style={{ marginBottom: "16px", fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
            API 호출이 실패하거나 네트워크 오류가 발생하면 ErrorState 컴포넌트가 표시됩니다.
            에러 메시지는 "api 호출 안됌"으로 표시되며, 목업 데이터로 자동 폴백하지 않습니다.
          </p>
          <div style={{ maxWidth: "300px" }}>
            <Card variant="content" className="weather">
              <ErrorState message="api 호출 안됌" />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

const PaginationPreview = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalItems = 25;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // 현재 페이지의 아이템들 계산
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentItems = Array.from({ length: endIndex - startIndex }, (_, idx) => startIndex + idx + 1);

  // 전체 페이지 번호 리스트를 반환
  const getVisiblePages = () => {
    return Array.from({ length: totalPages }, (_, idx) => idx + 1);
  };

  return (
    <div className="guide-preview guide-preview--pagination">
      <div className="pagination-demo">
        {/* 리스트 영역 */}
        <div className="pagination-list">
          <h4>페이지네이션 리스트 ({currentItems.length}개 항목)</h4>
          <div className="pagination-items">
            {currentItems.map((item) => (
              <div key={item} className="pagination-item">
                <div className="pagination-item__content">
                  <span className="pagination-item__number">{item}</span>
                  <span className="pagination-item__title">페이지네이션 아이템 {item}</span>
                </div>
                <div className="pagination-item__actions">
                  <button className="pagination-item__btn">보기</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 페이지네이션 컨트롤 */}
        <div className="pagination-controls">
          <div className="pagination-info">
            <span>총 {totalItems}개 항목 · {totalPages}페이지 중 </span>
            <strong>{currentPage}페이지</strong>
            <span> 표시중</span>
          </div>

          <div className="pagination-buttons">
            <button
              className="pagination-btn pagination-btn--prev"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              ‹ 이전
            </button>

            <div className="pagination-numbers">
              {getVisiblePages().map((page, index) => (
                <button
                  key={index}
                  className={`pagination-btn ${page === currentPage ? 'is-active' : ''}`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              className="pagination-btn pagination-btn--next"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              다음 ›
            </button>
          </div>
        </div>

        <div className="pagination-summary">
          <small>페이지네이션은 대량 데이터를 효율적으로 탐색할 수 있게 해줍니다</small>
        </div>
      </div>
    </div>
  );
};

const LoadMorePreview = () => {
  const [visibleItems, setVisibleItems] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const totalItems = 20;

  // 더보기 버튼 핸들러
  const handleLoadMore = async () => {
    if (isLoading || visibleItems >= totalItems) return;
    
    setIsLoading(true);
    // 데이터 로드 시뮬레이션 (1초 대기)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setVisibleItems(prev => Math.min(prev + 5, totalItems));
    setIsLoading(false);
  };

  // 현재 표시할 아이템들
  const currentItems = Array.from({ length: visibleItems }, (_, idx) => idx + 1);
  const remainingItems = totalItems - visibleItems;

  return (
    <div className="guide-preview guide-preview--layout">
      {/* 리스트 영역 */}
      <div className="layout-list">
        <h4>더보기 리스트 예시 ({currentItems.length}/{totalItems})</h4>
        <div className="layout-items">
          {currentItems.map((item) => (
            <div key={item} className="layout-item">
              <div className="layout-item__content">
                <span className="layout-item__number">{item}</span>
                <span className="layout-item__title">리스트 아이템 {item}</span>
              </div>
              <div className="layout-item__actions">
                <button className="layout-item__btn">보기</button>
              </div>
            </div>
          ))}
        </div>

        {/* 더보기 버튼 */}
        {visibleItems < totalItems && (
          <div className="layout-load-more">
            <button
              className="btn btn--secondary"
              onClick={handleLoadMore}
              disabled={isLoading}
              style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}
            >
              {isLoading ? (
                <Loading size={16} thickness={2} />
              ) : (
                `더보기 (${remainingItems}개)`
              )}
            </button>
          </div>
        )}

        {/* 모든 항목 로드 완료 */}
        {visibleItems >= totalItems && (
          <div className="layout-load-more">
            <p style={{ textAlign: "center", color: "#666", padding: "16px" }}>
              모든 항목을 불러왔습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const IconPreview = () => {
  const [copiedIcon, setCopiedIcon] = useState(null);

  const icons = [
    { label: "알림", symbol: "🔔", className: "icon-notification" },
    { label: "즐겨찾기", symbol: "⭐", className: "icon-star" },
    { label: "설정", symbol: "⚙️", className: "icon-settings" },
    { label: "홈", symbol: "🏠", className: "icon-home" },
    { label: "검색", symbol: "🔍", className: "icon-search" },
    { label: "프로필", symbol: "👤", className: "icon-profile" },
  ];

  const copyToClipboard = async (className, iconLabel) => {
    try {
      await navigator.clipboard.writeText(className);
      setCopiedIcon(className);
      setTimeout(() => setCopiedIcon(null), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = className;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopiedIcon(className);
      setTimeout(() => setCopiedIcon(null), 2000);
    }
  };

  return (
    <div className="guide-preview guide-preview--icons">
      {/* 아이콘 컴포넌트 예시 */}
      <div className="icon-preview__section">
        <h4 className="icon-preview__title">아이콘 컴포넌트</h4>
        <div className="icon-preview__group">
          <div className="icon-preview__row">
            <div className="icon-preview__item">
              <Icon name="알림" size="small">🔔</Icon>
              <span className="icon-preview__label">Small (16px)</span>
            </div>
            <div className="icon-preview__item">
              <Icon name="알림" size="medium">🔔</Icon>
              <span className="icon-preview__label">Medium (20px)</span>
            </div>
            <div className="icon-preview__item">
              <Icon name="알림" size="large">🔔</Icon>
              <span className="icon-preview__label">Large (24px)</span>
            </div>
            <div className="icon-preview__item">
              <Icon name="알림" size="xlarge">🔔</Icon>
              <span className="icon-preview__label">XLarge (32px)</span>
            </div>
          </div>

          <div className="icon-preview__row">
            <div className="icon-preview__item">
              <Icon name="알림" color="default">🔔</Icon>
              <span className="icon-preview__label">Default</span>
            </div>
            <div className="icon-preview__item">
              <Icon name="성공" color="success">✓</Icon>
              <span className="icon-preview__label">Success</span>
            </div>
            <div className="icon-preview__item">
              <Icon name="경고" color="warning">⚠</Icon>
              <span className="icon-preview__label">Warning</span>
            </div>
            <div className="icon-preview__item">
              <Icon name="에러" color="error">✕</Icon>
              <span className="icon-preview__label">Error</span>
            </div>
            <div className="icon-preview__item">
              <Icon name="정보" color="info">ℹ</Icon>
              <span className="icon-preview__label">Info</span>
            </div>
          </div>

          <div className="icon-preview__row">
            <div className="icon-preview__item">
              <Icon name="알림" clickable onClick={() => alert("클릭됨!")}>🔔</Icon>
              <span className="icon-preview__label">Clickable</span>
            </div>
            <div className="icon-preview__item">
              <Icon name="즐겨찾기" color="accent" clickable onClick={() => alert("클릭됨!")}>⭐</Icon>
              <span className="icon-preview__label">Clickable Accent</span>
            </div>
          </div>
        </div>
      </div>

      {/* 아이콘 라이브러리 */}
      <div className="icon-preview__section">
        <h4 className="icon-preview__title">아이콘 라이브러리</h4>
    <div className="guide-preview guide-preview--icons">
      {icons.map((icon) => (
        <button
          key={icon.className}
          type="button"
          className={`icon-chip ${copiedIcon === icon.className ? "is-copied" : ""}`}
          aria-label={`${icon.label} 아이콘 복사`}
          onClick={() => copyToClipboard(icon.className, icon.label)}
        >
          <span className="icon-chip__symbol">{icon.symbol}</span>
          <span className="icon-chip__label">{icon.label}</span>
          {copiedIcon === icon.className && (
            <span className="icon-chip__copied" aria-live="polite">
              복사됨
            </span>
          )}
        </button>
      ))}
        </div>
      </div>
    </div>
  );
};

const ButtonPreview = () => (
  <div className="guide-preview guide-preview--buttons">
    <div className="button-preview__section">
      <h4 className="button-preview__title">Variant (스타일)</h4>
      <div className="button-preview__row">
        <Button variant="primary" size="medium">Primary</Button>
        <Button variant="secondary" size="medium">Secondary</Button>
        <Button variant="ghost" size="medium">Ghost</Button>
        <Button variant="primary" size="medium" disabled>Disabled</Button>
      </div>
    </div>

    <div className="button-preview__section">
      <h4 className="button-preview__title">Size (크기)</h4>
      <div className="button-preview__row">
        <div className="button-preview__item">
          <span className="button-preview__label">Small (S)</span>
          <Button variant="primary" size="small">Small</Button>
        </div>
        <div className="button-preview__item">
          <span className="button-preview__label">Medium (M)</span>
          <Button variant="primary" size="medium">Medium</Button>
        </div>
        <div className="button-preview__item">
          <span className="button-preview__label">Large (L)</span>
          <Button variant="primary" size="large">Large</Button>
        </div>
      </div>
    </div>

    <div className="button-preview__section">
      <h4 className="button-preview__title">Size별 Variant 비교</h4>
    <ul className="button-list">
      <li className="button-list__item">
          <div className="button-list__label">Small (S)</div>
        <div className="button-list__actions">
            <Button variant="primary" size="small">Primary</Button>
            <Button variant="secondary" size="small">Secondary</Button>
            <Button variant="ghost" size="small">Ghost</Button>
            <Button variant="primary" size="small" disabled>Disabled</Button>
        </div>
      </li>
      <li className="button-list__item">
          <div className="button-list__label">Medium (M)</div>
        <div className="button-list__actions">
            <Button variant="primary" size="medium">Primary</Button>
            <Button variant="secondary" size="medium">Secondary</Button>
            <Button variant="ghost" size="medium">Ghost</Button>
            <Button variant="primary" size="medium" disabled>Disabled</Button>
        </div>
      </li>
      <li className="button-list__item">
          <div className="button-list__label">Large (L)</div>
        <div className="button-list__actions">
            <Button variant="primary" size="large">Primary</Button>
            <Button variant="secondary" size="large">Secondary</Button>
            <Button variant="ghost" size="large">Ghost</Button>
            <Button variant="primary" size="large" disabled>Disabled</Button>
        </div>
      </li>
    </ul>
    </div>

    <div className="button-preview__section">
      <h4 className="button-preview__title">아이콘 버튼</h4>
      <div className="button-preview__row">
        <Button variant="primary" size="medium" className="button-preview__btn">
          <Icon name="알림" size="small">🔔</Icon>
          알림
        </Button>
        <Button variant="secondary" size="medium" className="button-preview__btn">
          <Icon name="즐겨찾기" size="small">⭐</Icon>
          즐겨찾기
        </Button>
        <Button variant="ghost" size="medium" className="button-preview__btn">
          <Icon name="설정" size="small">⚙️</Icon>
          설정
        </Button>
      </div>
    </div>
  </div>
);

const TogglePreview = () => {
  const [states, setStates] = useState({
    wifi: true,
    push: false,
    marketing: false,
  });
  // Toast 알림 상태 (중앙 관리)
  const [toast, setToast] = useState(null);

  // 토글 변경 핸들러
  const handleChange = (key, next, label) => {
    setStates((prev) => ({ ...prev, [key]: next }));
    
    // Toast 알림 표시
    const toastMessage = next ? `${label}이(가) 켜졌습니다.` : `${label}이(가) 꺼졌습니다.`;
    const toastType = next ? "success" : "info";
    setToast({ message: toastMessage, type: toastType, key: Date.now() });
  };

  // Toast 닫기 핸들러
  const handleToastClose = () => {
    setToast(null);
  };

  return (
    <div className="guide-preview guide-preview--toggle">
      <Toggle
        label="Wi-Fi 자동 연결"
        description="보안이 약한 네트워크는 자동 연결하지 않습니다."
        defaultOn={states.wifi}
        onChange={(next) => handleChange("wifi", next, "Wi-Fi 자동 연결")}
      />
      <Toggle
        label="푸시 알림"
        description="중요 공지와 업데이트 소식을 받아봅니다."
        defaultOn={states.push}
        onChange={(next) => handleChange("push", next, "푸시 알림")}
      />
      <Toggle
        label="마케팅 수신 동의"
        description="이벤트와 혜택 정보를 이메일로 받아봅니다."
        defaultOn={states.marketing}
        onChange={(next) => handleChange("marketing", next, "마케팅 수신 동의")}
      />
      <div className="toggle-status">
        <span>현재 상태: </span>
        <code>Wi-Fi {states.wifi ? "ON" : "OFF"} · Push {states.push ? "ON" : "OFF"} · Marketing {states.marketing ? "ON" : "OFF"}</code>
      </div>
      {/* Toast 알림 (중앙 관리) */}
      {toast && toast.message && typeof toast.message === 'string' && toast.message.trim().length > 0 ? (
        <div className="toast-stack">
          <Toast 
            key={toast.key} 
            message={toast.message} 
            type={toast.type} 
            onClose={handleToastClose} 
          />
        </div>
      ) : null}
    </div>
  );
};

const ToastPreview = () => {
  const [toast, setToast] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMockToastMessages()
      .then(setMessages)
      .catch((err) => {
        console.error("토스트 데이터 로드 실패:", err);
        setError("토스트 데이터를 불러오지 못했습니다.");
      })
      .finally(() => setIsLoading(false));
  }, []);


  const showToast = (type) => {
    const found = messages.find((m) => m.type === type);
    const message = found?.message ?? "데이터가 없습니다.";
    setToast({ message, type, key: Date.now() });
  };

  const clearToast = () => setToast(null);

  if (isLoading) {
    return (
      <div className="guide-preview guide-preview--toast">
        <div className="toast-actions" style={{ display: "flex", gap: 8 }}>
          <Skeleton width="110px" height={32} />
          <Skeleton width="110px" height={32} />
          <Skeleton width="110px" height={32} />
        </div>
      </div>
    );
  }

  return (
    <div className="guide-preview guide-preview--toast">
      <div className="toast-actions">
        <button className="btn btn--primary btn--sm" disabled={isLoading} onClick={() => showToast("success")}>
          {isLoading ? "불러오는 중..." : "성공 토스트"}
        </button>
        <button className="btn btn--secondary btn--sm" disabled={isLoading} onClick={() => showToast("warning")}>
          {isLoading ? "불러오는 중..." : "경고 토스트"}
        </button>
        <button className="btn btn--ghost btn--sm" disabled={isLoading} onClick={() => showToast("danger")}>
          {isLoading ? "불러오는 중..." : "에러 토스트"}
        </button>
      </div>

      {error && <p className="toast-error">{error}</p>}

      {toast && toast.message && typeof toast.message === 'string' && toast.message.trim().length > 0 ? (
        <div className="toast-stack">
          <Toast key={toast.key} message={toast.message} type={toast.type} onClose={clearToast} />
        </div>
      ) : null}
    </div>
  );
};

const BottomDockPreview = () => {
  const [last, setLast] = useState("home");

  const items = [
    { key: "home", label: "홈", icon: "🏠" },
    { key: "search", label: "검색", icon: "🔍" },
    { key: "bookmark", label: "즐겨찾기", icon: "⭐" },
    { key: "chat", label: "채팅", icon: "💬" },
    { key: "profile", label: "내 정보", icon: "👤" },
  ];

  return (
    <div className="guide-preview guide-preview--dock">
      <BottomDock items={items} defaultActive={last} onChange={(key) => setLast(key)} position="relative" />
      <div className="dock-status">
        마지막 클릭: <strong>{last}</strong>
      </div>
    </div>
  );
};

const DataListPreview = () => {
  return (
    <div className="guide-preview guide-preview--datalist">
      <div style={{ display: "flex", flexDirection: "column", gap: "32px", width: "100%" }}>
        {/* 유형 1: Card 그리드 레이아웃 */}
        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>유형 1: Card 그리드 레이아웃</h4>
          <DataList
            fetchData={async () => {
              const result = await fetchMockSamplePage();
              return result.cards || [];
            }}
            renderItem={(item) => (
              <Card key={item.id} title={item.title} description={item.desc} />
            )}
            containerProps={{
              style: {
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "16px",
              },
            }}
            emptyMessage="카드 데이터가 없습니다."
            errorMessage="카드 데이터를 불러오지 못했습니다."
            loadingLabel="카드 데이터를 불러오는 중..."
          />
        </div>

        {/* 유형 2: List/ListItem 리스트 레이아웃 */}
        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>유형 2: List/ListItem 리스트 레이아웃</h4>
          <DataList
            fetchData={fetchMockUrls}
            renderItem={(item) => (
              <ListItem
                key={item.id}
                icon="📄"
                suffix={
                  <Badge variant="default" size="small">
                    {item.depth1}
                  </Badge>
                }
                onClick={() => console.log("클릭:", item.url)}
              >
                {item.depth1} {item.depth2 && `> ${item.depth2}`} {item.depth3 && `> ${item.depth3}`}
              </ListItem>
            )}
            containerProps={{
              style: {
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              },
            }}
            emptyMessage="URL 데이터가 없습니다."
            errorMessage="URL 데이터를 불러오지 못했습니다."
            loadingLabel="URL 데이터를 불러오는 중..."
          />
        </div>

        {/* 유형 3: Badge가 포함된 Card */}
        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>유형 4: Badge가 포함된 Card</h4>
          <DataList
            fetchData={fetchMockCarouselSlides}
            renderItem={(item) => (
              <Card
                key={item.id}
                title={item.title}
                description={item.description}
                badge="NEW"
                badgeVariant="success"
              />
            )}
            containerProps={{
              style: {
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: "16px",
              },
            }}
            emptyMessage="슬라이드 데이터가 없습니다."
            errorMessage="슬라이드 데이터를 불러오지 못했습니다."
            loadingLabel="슬라이드 데이터를 불러오는 중..."
          />
        </div>

        {/* 유형 4: Button이 포함된 Card */}
        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>유형 5: Button이 포함된 Card</h4>
          <DataList
            fetchData={async () => {
              const result = await fetchMockSamplePage();
              return result.cards || [];
            }}
            renderItem={(item) => (
              <Card
                key={item.id}
                title={item.title}
                description={item.desc}
              >
                <div style={{ marginTop: "12px", display: "flex", gap: "8px" }}>
                  <Button variant="primary" size="small">
                    자세히 보기
                  </Button>
                  <Button variant="ghost" size="small">
                    공유하기
                  </Button>
                </div>
              </Card>
            )}
            containerProps={{
              style: {
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "16px",
              },
            }}
            emptyMessage="카드 데이터가 없습니다."
            errorMessage="카드 데이터를 불러오지 못했습니다."
            loadingLabel="카드 데이터를 불러오는 중..."
          />
        </div>

        {/* 유형 5: 아이콘이 포함된 리스트 */}
        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>유형 6: 아이콘이 포함된 리스트</h4>
          <DataList
            fetchData={fetchMockDropdownOptions}
            renderItem={(item) => (
              <ListItem
                key={item.value}
                icon="🍎"
                suffix={
                  <Icon name="chevron-right" size="small">
                    →
                  </Icon>
                }
                onClick={() => console.log("선택:", item.label)}
              >
                {item.label}
              </ListItem>
            )}
            containerProps={{
              style: {
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              },
            }}
            emptyMessage="옵션 데이터가 없습니다."
            errorMessage="옵션 데이터를 불러오지 못했습니다."
            loadingLabel="옵션 데이터를 불러오는 중..."
          />
        </div>
      </div>
    </div>
  );
};

const ListSyncPreview = () => {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMockListSyncOptions()
      .then(setOptions)
      .catch((err) => {
        console.error("리스트 동기화 데이터 로드 실패:", err);
        setError("리스트 데이터를 불러오지 못했습니다.");
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="guide-preview guide-preview--listsync">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} width="88px" height={32} />
          ))}
        </div>
        <div className="listsync-status" style={{ marginTop: 12 }}>
          <Skeleton width="140px" height={16} />
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="guide-preview guide-preview--listsync">{error}</div>;
  }

  return (
    <div className="guide-preview guide-preview--listsync">
      <ListSync options={options} onChange={setSelected} />
      <div className="listsync-status">
        <span>현재 선택:</span>
        <code>{selected.map((s) => s.label).join(", ") || "없음"}</code>
      </div>
    </div>
  );
};

const DropdownPreview = () => {
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMockDropdownOptions()
      .then(setOptions)
      .catch((err) => {
        console.error("드롭다운 데이터 로드 실패:", err);
        setError("드롭다운 데이터를 불러오지 못했습니다.");
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="guide-preview guide-preview--dropdown" style={{ display: "grid", gap: 12 }}>
        <Skeleton width="200px" height={38} />
        <Skeleton width="200px" height={38} />
        <Skeleton width="200px" height={38} />
      </div>
    );
  }
  if (error) return <div className="guide-preview guide-preview--dropdown">{error}</div>;

  return (
    <div className="guide-preview guide-preview--dropdown">
      <Dropdown options={options} />
      <Dropdown options={options} variant="filled" />
      <Dropdown options={options} variant="ghost" />
    </div>
  );
};

const TabsPreview = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMockTabs()
      .then(setItems)
      .catch((err) => {
        console.error("탭 데이터 로드 실패:", err);
        setError("탭 데이터를 불러오지 못했습니다.");
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="guide-preview guide-preview--tabs">
        <div style={{ display: "flex", gap: 8, marginBottom: 12, width: "100%" }}> 
          <Skeleton width="80px" height={32} />
          <Skeleton width="80px" height={32} />
          <Skeleton width="80px" height={32} />
        </div>
        <Skeleton width="100%" height={48} />
      </div>
    );
  }
  if (error) return <div className="guide-preview guide-preview--tabs">{error}</div>;

  // 많은 탭 아이템으로 스크롤 테스트
  const manyItems = [
    { id: "tab1", label: "첫번째 탭", description: "첫번째 탭 내용입니다." },
    { id: "tab2", label: "두번째 탭", description: "두번째 탭 내용입니다." },
    { id: "tab3", label: "세번째 탭", description: "세번째 탭 내용입니다." },
    { id: "tab4", label: "네번째 탭", description: "네번째 탭 내용입니다." },
    { id: "tab5", label: "다섯번째 탭", description: "다섯번째 탭 내용입니다." },
    { id: "tab6", label: "여섯번째 탭", description: "여섯번째 탭 내용입니다." },
    { id: "tab7", label: "일곱번째 탭", description: "일곱번째 탭 내용입니다." },
    { id: "tab8", label: "여덟번째 탭", description: "여덟번째 탭 내용입니다." },
  ];

  return (
    <div className="guide-preview guide-preview--tabs">
      <div style={{ display: "flex", flexDirection: "column", gap: "32px", width: "100%" }}>
        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>기본 타입 (Default)</h4>
          <Tabs items={items} type="default" />
        </div>

        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>
            스크롤 타입 (Scroll) - 클릭 시 가운데 정렬
          </h4>
          <Tabs items={manyItems} type="scroll" scrollContainerId="tabs-scroll-container" />
        </div>

        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>
            Swiper 타입 - 클릭 시 가운데 정렬
          </h4>
          <Tabs items={manyItems} type="swiper" />
        </div>

        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>
            탭 UI만 (컨텐츠 없음)
          </h4>
          <Tabs items={items} type="default" showContent={false} />
        </div>

        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>
            탭 UI만 - 스크롤 타입
          </h4>
          <Tabs items={manyItems} type="scroll" scrollContainerId="tabs-ui-only-scroll" showContent={false} />
        </div>

        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>
            탭 UI만 - Swiper 타입
          </h4>
          <Tabs items={manyItems} type="swiper" showContent={false} />
        </div>
      </div>
    </div>
  );
};

const defaultCarouselSlides = [
  { id: 1, title: "배너 1", desc: "이곳에 주요 메시지를 노출하세요.", color: "#0c7c59" },
  { id: 2, title: "배너 2", desc: "슬라이드를 넘겨 다양한 정보를 전달합니다.", color: "#1a9d6f" },
  { id: 3, title: "배너 3", desc: "모바일/데스크탑 반응형 지원.", color: "#28b87f" },
  { id: 4, title: "배너 4", desc: "Swiper의 다양한 효과를 확인하세요.", color: "#36d38f" },
];

const CarouselPreview = () => {
  const [slides, setSlides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const effectSlides = defaultCarouselSlides;

  useEffect(() => {
    fetchMockCarouselSlides()
      .then(setSlides)
      .catch((err) => {
        console.error("캐러셀 데이터 로드 실패:", err);
        setError("캐러셀 데이터를 불러오지 못했습니다.");
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="guide-preview guide-preview--carousel">
        <Skeleton width="100%" height={140} />
      </div>
    );
  }
  if (error) return <div className="guide-preview guide-preview--carousel">{error}</div>;

  // 슬라이드가 1개인 케이스 (no-swiper 클래스 적용)
  const singleSlide = slides.length > 0 ? [slides[0]] : [];

  return (
    <div className="guide-preview guide-preview--carousel-combined">
      {/* 기본 캐러셀 (여러 개) */}
      <div className="carousel-combined__section">
        <h4 className="carousel-combined__title">기본 캐러셀 (여러 개)</h4>
        <Carousel slides={slides} showOptionsPanel />
      </div>

      {/* 슬라이드 1개 케이스 (no-swiper) */}
      <div className="carousel-combined__section">
        <h4 className="carousel-combined__title">슬라이드 1개 (no-swiper)</h4>
        <Carousel slides={singleSlide} showOptionsPanel={false} />
        <div className="carousel-combined__note">
          <p>슬라이드가 1개 이하일 때는 자동으로 <code>no-swiper</code> 클래스가 적용되고 스와이퍼가 실행되지 않습니다.</p>
        </div>
      </div>

      {/* 효과 미리보기 */}
      <div className="carousel-combined__effects">
        <h4 className="carousel-combined__title">다양한 효과 옵션</h4>
        <div className="guide-preview guide-preview--carousel-effects">
          <div className="carousel-effects__section">
            <h5 className="carousel-effects__title">기본 슬라이드 (Slide)</h5>
            <div className="carousel-effects__swiper-wrapper">
              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                spaceBetween={0}
                slidesPerView={1}
                loop
                allowTouchMove
                className="carousel-effects__swiper"
              >
                {effectSlides.map((slide) => (
                  <SwiperSlide key={slide.id}>
                    <div className="carousel-effects__slide" style={{ backgroundColor: slide.color }}>
                      <h5>{slide.title}</h5>
                      <p>{slide.desc}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="carousel-effects__options">
              <strong>옵션:</strong> effect 없음 (기본), navigation, pagination, loop
            </div>
          </div>

          <div className="carousel-effects__section">
            <h5 className="carousel-effects__title">페이드 효과 (Fade)</h5>
            <div className="carousel-effects__swiper-wrapper">
              <Swiper
                modules={[Navigation, Pagination, EffectFade, Autoplay]}
                effect="fade"
                navigation
                pagination={{ clickable: true }}
                loop
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                className="carousel-effects__swiper"
              >
                {effectSlides.map((slide) => (
                  <SwiperSlide key={slide.id}>
                    <div className="carousel-effects__slide" style={{ backgroundColor: slide.color }}>
                      <h5>{slide.title}</h5>
                      <p>{slide.desc}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="carousel-effects__options">
              <strong>옵션:</strong> effect="fade", navigation, pagination, loop, autoplay
            </div>
          </div>

          <div className="carousel-effects__section">
            <h5 className="carousel-effects__title">큐브 효과 (Cube)</h5>
            <div className="carousel-effects__swiper-wrapper carousel-effects__swiper-wrapper--cube">
              <Swiper
                modules={[Navigation, Pagination, EffectCube]}
                effect="cube"
                navigation
                pagination={{ clickable: true }}
                loop
                grabCursor
                cubeEffect={{
                  shadow: true,
                  slideShadows: true,
                  shadowOffset: 20,
                  shadowScale: 0.94,
                }}
                className="carousel-effects__swiper"
              >
                {effectSlides.map((slide) => (
                  <SwiperSlide key={slide.id}>
                    <div className="carousel-effects__slide" style={{ backgroundColor: slide.color }}>
                      <h5>{slide.title}</h5>
                      <p>{slide.desc}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="carousel-effects__options">
              <strong>옵션:</strong> effect="cube", cubeEffect (shadow, slideShadows), navigation, pagination, loop
            </div>
          </div>

          <div className="carousel-effects__section">
            <h5 className="carousel-effects__title">커버플로우 효과 (Coverflow)</h5>
            <div className="carousel-effects__swiper-wrapper carousel-effects__swiper-wrapper--coverflow">
              <Swiper
                modules={[Navigation, Pagination, EffectCoverflow]}
                effect="coverflow"
                navigation
                pagination={{ clickable: true }}
                loop
                grabCursor
                slidesPerView={1.2}
                centeredSlides
                coverflowEffect={{
                  rotate: 50,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
                }}
                className="carousel-effects__swiper"
              >
                {effectSlides.map((slide) => (
                  <SwiperSlide key={slide.id}>
                    <div className="carousel-effects__slide" style={{ backgroundColor: slide.color }}>
                      <h5>{slide.title}</h5>
                      <p>{slide.desc}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="carousel-effects__options">
              <strong>옵션:</strong> effect="coverflow", slidesPerView=1.2, centeredSlides, coverflowEffect (rotate, depth, slideShadows), navigation, pagination, loop
            </div>
          </div>

          <div className="carousel-effects__section">
            <h5 className="carousel-effects__title">플립 효과 (Flip)</h5>
            <div className="carousel-effects__swiper-wrapper carousel-effects__swiper-wrapper--flip">
              <Swiper
                modules={[Navigation, Pagination, EffectFlip]}
                effect="flip"
                navigation
                pagination={{ clickable: true }}
                loop
                flipEffect={{
                  slideShadows: true,
                  limitRotation: true,
                }}
                className="carousel-effects__swiper"
              >
                {effectSlides.map((slide) => (
                  <SwiperSlide key={slide.id}>
                    <div className="carousel-effects__slide" style={{ backgroundColor: slide.color }}>
                      <h5>{slide.title}</h5>
                      <p>{slide.desc}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="carousel-effects__options">
              <strong>옵션:</strong> effect="flip", flipEffect (slideShadows, limitRotation), navigation, pagination, loop
            </div>
          </div>

          <div className="carousel-effects__section">
            <h5 className="carousel-effects__title">다중 슬라이드 (Multiple Slides)</h5>
            <div className="carousel-effects__swiper-wrapper">
              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                spaceBetween={16}
                slidesPerView={1.5}
                centeredSlides
                watchOverflow
                loop={false}
                grabCursor
                breakpoints={{
                  640: { slidesPerView: 2, spaceBetween: 16 },
                  900: { slidesPerView: 2.5, spaceBetween: 20 },
                  1200: { slidesPerView: 3, spaceBetween: 24 },
                }}
                className="carousel-effects__swiper carousel-effects__swiper--multiple"
              >
                {effectSlides.map((slide) => (
                  <SwiperSlide key={slide.id}>
                    <div className="carousel-effects__slide" style={{ backgroundColor: slide.color }}>
                      <h5>{slide.title}</h5>
                      <p>{slide.desc}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="carousel-effects__options">
              <strong>옵션:</strong> slidesPerView=1.5, centeredSlides, watchOverflow, breakpoints (반응형), navigation, pagination, loop=false
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const TablePreview = () => {
  const [wideHeaders, setWideHeaders] = useState([]);
  const [wideRows, setWideRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const wide = await fetchMockTableWide();
        setWideHeaders(wide.headers ?? []);
        setWideRows(wide.rows ?? []);
      } catch (err) {
        console.error("테이블 데이터 로드 실패:", err);
        setError("테이블 데이터를 불러오지 못했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  if (isLoading) {
    return (
      <div className="guide-preview guide-preview--table" style={{ display: "grid", gap: 12 }}>
        <Skeleton width="60%" height={22} />
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} width="100%" height={18} />
        ))}
      </div>
    );
  }
  if (error) return <div className="guide-preview guide-preview--table">{error}</div>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px", width: "100%" }}>
      <div>
        <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>가로 스크롤 · 열 고정 테이블</h4>
        <Table scrollType="horizontal" wideHeaders={wideHeaders} wideRows={wideRows} />
      </div>
      <div>
        <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>세로 스크롤 · 헤더 고정 테이블</h4>
        <Table scrollType="vertical" />
      </div>
      <div>
        <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>가로·세로 스크롤 · 헤더 & 열 고정 테이블</h4>
        <Table scrollType="both" wideHeaders={wideHeaders} wideRows={wideRows} />
      </div>
    </div>
  );
};

const PopupPreview = () => {
  const [isBasicOpen, setIsBasicOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isFullOpen, setIsFullOpen] = useState(false);
  const [isFullNoHeaderOpen, setIsFullNoHeaderOpen] = useState(false);
  const [isFullBothOpen, setIsFullBothOpen] = useState(false);

  return (
    <div className="guide-preview guide-preview--popup">
      <div className="popup-actions">
        <button className="btn btn--primary btn--sm" onClick={() => setIsBasicOpen(true)}>
          Basic 팝업
        </button>
        <button className="btn btn--secondary btn--sm" onClick={() => setIsSheetOpen(true)}>
          바텀시트
        </button>
        <button className="btn btn--ghost btn--sm" onClick={() => setIsFullOpen(true)}>
          풀스크린 (X버튼)
        </button>
        <button className="btn btn--ghost btn--sm" onClick={() => setIsFullNoHeaderOpen(true)}>
          풀스크린 (닫기버튼만)
        </button>
        <button className="btn btn--ghost btn--sm" onClick={() => setIsFullBothOpen(true)}>
          풀스크린 (둘다)
        </button>
      </div>

      {/* Basic Center Popup with Swiper (2 images) */}
      <BasicPopup
        open={isBasicOpen}
        onClose={() => setIsBasicOpen(false)}
        images={[
          "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=600&fit=crop"
        ]}
        title="Setting my friends data"
        description="You can chat freely after a privacy my chatroom by chatting data"
        actions={[
          {
            label: "Cancel",
            variant: "ghost",
            onClick: () => setIsBasicOpen(false),
          },
          {
            label: "OK",
            variant: "primary",
            onClick: () => setIsBasicOpen(false),
          },
        ]}
      />

      {/* Bottom Sheet */}
      <BottomSheetPopup
        open={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        title="바텀시트 팝업"
        description="상단 드래그로 절반 이상 내리면 자동으로 닫힙니다."
      />

      {/* Fullscreen Popup - X 버튼만 있는 타입 */}
      <FullscreenPopup
        open={isFullOpen}
        onClose={() => setIsFullOpen(false)}
        title="풀스크린 팝업"
        body={
          <div>
            <p>전체 화면을 덮는 풀스크린 팝업입니다.</p>
            <p>배경 스크롤을 잠그고, 상단 X 버튼만 제공합니다.</p>
            <p>본문 영역은 스크롤 가능합니다.</p>
          </div>
        }
        showHeaderClose={true}
        showBottomClose={false}
      />

      {/* Fullscreen Popup - 하단 닫기 버튼만 있는 타입 */}
      <FullscreenPopup
        open={isFullNoHeaderOpen}
        onClose={() => setIsFullNoHeaderOpen(false)}
        title="풀스크린 팝업"
        body={
          <div>
            <p>전체 화면을 덮는 풀스크린 팝업입니다.</p>
            <p>배경 스크롤을 잠그고, 하단 닫기 버튼만 제공합니다.</p>
            <p>상단 X 버튼이 없고 하단 닫기 버튼만 있는 타입입니다.</p>
            <p>본문 영역은 스크롤 가능하며, 하단 닫기 버튼은 항상 화면 하단에 고정됩니다.</p>
          </div>
        }
        showHeaderClose={false}
        showBottomClose={true}
      />

      {/* Fullscreen Popup - X 버튼과 하단 닫기 버튼 둘 다 있는 타입 */}
      <FullscreenPopup
        open={isFullBothOpen}
        onClose={() => setIsFullBothOpen(false)}
        title="풀스크린 팝업"
        body={
          <div>
            <p>전체 화면을 덮는 풀스크린 팝업입니다.</p>
            <p>배경 스크롤을 잠그고, 상단 X 버튼과 하단 닫기 버튼을 모두 제공합니다.</p>
            <p>본문 영역은 스크롤 가능하며, 하단 닫기 버튼은 항상 화면 하단에 고정됩니다.</p>
          </div>
        }
        showHeaderClose={true}
        showBottomClose={true}
      />
    </div>
  );
};

const ImagePreview = () => (
  <div className="guide-preview guide-preview--images">
    <div className="image-examples">
      {/* 정상 이미지 */}
      <div className="image-example">
        <h4>정상 이미지</h4>
        <Image
          src="https://picsum.photos/300/200"
          alt="가로형 이미지 예시"
          width="200"
          height="150"
        />
      </div>

      {/* 세로형 이미지 */}
      <div className="image-example">
        <h4>세로형 이미지</h4>
        <Image
          src="https://picsum.photos/200/300"
          alt="세로형 이미지 예시"
          width="150"
          height="200"
        />
      </div>

      {/* 정사각형 이미지 */}
      <div className="image-example">
        <h4>정사각형 이미지</h4>
        <Image
          src="https://picsum.photos/200/200"
          alt="정사각형 이미지 예시"
          width="150"
          height="150"
        />
      </div>

      {/* 로드 실패 이미지 */}
      <div className="image-example">
        <h4>noimage 이미지 (폴백)</h4>
        <Image
          src="https://invalid-url-that-will-fail.com/image.jpg"
          alt="로드 실패 이미지"
          width="150"
          height="150"
        />
      </div>
    </div>
  </div>
);

const ScriptPreview = () => {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  // 카운터 증가 핸들러
  const handleIncrement = () => {
    setCount(prev => prev + 1);
    setMessage(`카운터가 ${count + 1}로 증가했습니다!`);
    setTimeout(() => setMessage(''), 2000);
  };

  // 목업 데이터 로드
  const handleLoadData = async () => {
    setIsLoading(true);
    setMessage('데이터를 불러오는 중...');

    try {
      const result = await fetchMockData();
      setData(result);
      setMessage('데이터가 성공적으로 로드되었습니다!');
    } catch (error) {
      console.error('목업 데이터 로드 실패:', error);
      setMessage('데이터 로드에 실패했습니다.');
    } finally {
      setIsLoading(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  // 폼 제출 핸들러
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');

    setMessage(`폼이 제출되었습니다: ${name} (${email})`);
    event.target.reset();
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="guide-preview guide-preview--scripts">
      {/* 상태 관리 예시 */}
      <div className="script-section">
        <h4>상태 관리 & 이벤트 핸들링</h4>
        <div className="script-demo">
          <p>카운터: <strong>{count}</strong></p>
          <button
            className="btn btn--primary"
            onClick={handleIncrement}
          >
            카운트 증가
          </button>
        </div>
      </div>

      {/* 비동기 데이터 로드 예시 */}
      <div className="script-section">
        <h4>비동기 데이터 로드</h4>
        <div className="script-demo">
          <button
            className="btn btn--secondary"
            onClick={handleLoadData}
            disabled={isLoading}
          >
            {isLoading ? '로딩 중...' : '데이터 로드'}
          </button>
          {data && (
            <div className="script-result">
              <p><strong>로드된 데이터:</strong></p>
              <p>ID: {data.id}</p>
              <p>제목: {data.title}</p>
              <p>내용: {data.content}</p>
              <p>시간: {data.timestamp}</p>
            </div>
          )}
        </div>
      </div>

      {/* 폼 제출 예시 */}
      <div className="script-section">
        <h4>폼 제출</h4>
        <div className="script-demo">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                type="text"
                name="name"
                placeholder="이름 입력"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="이메일 입력"
                required
              />
              <button type="submit" className="btn btn--primary">
                제출
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* 메시지 표시 */}
      {message && (
        <div className="script-message">
          {message}
        </div>
      )}
    </div>
  );
};

const HeaderPreview = () => {
  const [currentPage, setCurrentPage] = useState("guide");

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleBack = () => {
    console.log("뒤로가기 클릭");
  };

  const handleCartClick = () => {
    console.log("장바구니 클릭");
  };

  const handleUtilityClick = (type) => {
    console.log(`${type} 버튼 클릭`);
  };

  return (
    <div className="guide-preview guide-preview--header">
      <div className="header-demo">
        {/* 메인 헤더 */}
        <div className="header-demo__section">
          <h4 className="header-demo__section-title">메인 헤더</h4>
          <div className="header-demo__description">
            <p>모바일 햄버거 버튼을 눌러 사이드 메뉴를 열고, 2·3뎁스 펼침을 확인하세요.</p>
            <p>실제 Header 컴포넌트를 그대로 사용해 동작을 시연합니다.</p>
          </div>

          {/* 실제 Header 컴포넌트를 포함한 데모 프레임 */}
          <div className="header-demo__mobile-frame">
            <div className="header-demo__mobile-screen">
              <Header currentPage={currentPage} onPageChange={handlePageChange} variant="main" />
              <div className="header-demo__mobile-content">
                <h4>모바일 헤더 데모</h4>
                <p>현재 페이지: <strong>{currentPage === "guide" ? "퍼블리싱 가이드" : "URL 관리"}</strong></p>
                <p>우측 햄버거 버튼을 눌러 2·3뎁스 메뉴를 펼쳐보세요.</p>
                <p>사이드 메뉴는 슬라이드 인/아웃으로 동작합니다.</p>
              </div>
            </div>
          </div>
        </div>

        {/* 서브 헤더 */}
        <div className="header-demo__section">
          <h4 className="header-demo__section-title">서브 헤더</h4>
          <div className="header-demo__description">
            <p>좌측 뒤로가기 버튼, 가운데 카테고리 이름, 우측 유틸리티 버튼들로 구성된 서브 헤더입니다.</p>
            <p>각 버튼을 클릭하여 동작을 확인할 수 있습니다.</p>
          </div>

          {/* 서브 헤더 데모 */}
          <div className="header-demo__mobile-frame">
            <div className="header-demo__mobile-screen">
              <Header 
                variant="sub" 
                categoryName="음료"
                onBack={handleBack}
                onCartClick={handleCartClick}
                onUtilityClick={handleUtilityClick}
                showMoreButton={false}
              />
              <div className="header-demo__mobile-content">
                <h4>서브 헤더 데모</h4>
                <p>좌측: 뒤로가기 버튼</p>
                <p>가운데: 카테고리 이름 (음료)</p>
                <p>우측: 장바구니, 검색 버튼</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FooterPreview = () => {
  return (
    <div className="guide-preview guide-preview--footer">
      <Footer />
    </div>
  );
};

const LoadingPreview = () => (
  <div className="guide-preview guide-preview--loading">
    <div className="loading-preview__box">
      <Loading size={52} thickness={5} label="로딩 중..." />
    </div>
  </div>
);

const SkeletonPlaceholderPreview = () => (
  <div className="guide-preview guide-preview--loading" style={{ gap: 12 }}>
    <SkeletonPlaceholder withAvatar withActions lines={3} />
    <SkeletonPlaceholder withAvatar lines={2} />
    <SkeletonPlaceholder lines={2} />
  </div>
);

const EmptyStatePreview = () => {
  return (
    <div className="guide-preview guide-preview--empty-state">
      <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>기본</h4>
          <EmptyState
            title="데이터가 없습니다"
            description="표시할 데이터가 없습니다. 새로운 데이터를 추가해보세요."
            icon="📭"
          />
        </div>

        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>액션 버튼 포함</h4>
          <EmptyState
            title="검색 결과가 없습니다"
            description="다른 검색어로 시도해보세요."
            icon="🔍"
            action={
              <button className="btn btn--primary btn--md" onClick={() => console.log("검색 초기화")}>
                검색 초기화
              </button>
            }
          />
        </div>

        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>Minimal 타입</h4>
          <EmptyState
            title="리스트가 비어있습니다"
            description="아직 항목이 없습니다."
            icon="📋"
            variant="minimal"
          />
        </div>

        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>Illustration 타입</h4>
          <EmptyState
            title="장바구니가 비어있습니다"
            description="상품을 추가하면 여기에 표시됩니다."
            icon="🛒"
            variant="illustration"
            action={
              <button className="btn btn--primary btn--md" onClick={() => console.log("쇼핑하기")}>
                쇼핑하러 가기
              </button>
            }
          />
        </div>
      </div>
    </div>
  );
};

const ErrorStatePreview = () => {
  return (
    <div className="guide-preview guide-preview--error-state">
      <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>기본 에러</h4>
          <ErrorState type="error" />
        </div>

        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>재시도 버튼 포함</h4>
          <ErrorState
            type="error"
            action={
              <button className="btn btn--primary btn--md" onClick={() => console.log("재시도")}>
                다시 시도
              </button>
            }
          />
        </div>

        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>데이터 없음</h4>
          <ErrorState
            type="nodata"
            action={
              <button className="btn btn--secondary btn--md" onClick={() => console.log("새로고침")}>
                새로고침
              </button>
            }
          />
        </div>

        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>네트워크 오류</h4>
          <ErrorState
            type="network"
            action={
              <button className="btn btn--primary btn--md" onClick={() => console.log("재시도")}>
                다시 시도
              </button>
            }
          />
        </div>

        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>페이지 없음</h4>
          <ErrorState
            type="notfound"
            action={
              <button className="btn btn--primary btn--md" onClick={() => console.log("홈으로")}>
                홈으로 가기
              </button>
            }
          />
        </div>

        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>커스텀 메시지</h4>
          <ErrorState
            type="error"
            title="서버 오류"
            message="서버에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요."
            icon="⚠️"
            action={
              <button className="btn btn--primary btn--md" onClick={() => console.log("재시도")}>
                재시도
              </button>
            }
          />
        </div>
      </div>
    </div>
  );
};

const NoticePreview = () => (
  <div className="guide-preview guide-preview--notice">
    <Notice />
  </div>
);

const BadgePreview = () => {
  return (
    <div className="guide-preview guide-preview--badge">
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>
            Variant (기본)
          </h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
            <Badge variant="default">기본</Badge>
            <Badge variant="success">성공</Badge>
            <Badge variant="warning">경고</Badge>
            <Badge variant="error">오류</Badge>
            <Badge variant="info">정보</Badge>
          </div>
        </div>

        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>
            Outlined 스타일
          </h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
            <Badge variant="default" outlined>기본</Badge>
            <Badge variant="success" outlined>성공</Badge>
            <Badge variant="warning" outlined>경고</Badge>
            <Badge variant="error" outlined>오류</Badge>
            <Badge variant="info" outlined>정보</Badge>
          </div>
        </div>

        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>
            Size
          </h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
            <Badge size="small">Small</Badge>
            <Badge size="medium">Medium</Badge>
            <Badge size="large">Large</Badge>
          </div>
        </div>

        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>
            조합 예시
          </h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
            <Badge variant="success" size="small">NEW</Badge>
            <Badge variant="error" size="small" outlined>HOT</Badge>
            <Badge variant="info" size="large">프리미엄</Badge>
            <Badge variant="warning" size="medium" outlined>할인</Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

const SearchFieldPreview = () => {
  const [searchValue1, setSearchValue1] = useState("");
  const [searchValue2, setSearchValue2] = useState("");
  const [searchValue3, setSearchValue3] = useState("");

  return (
    <div className="guide-preview guide-preview--search-field">
      <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "600px" }}>
        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>
            기본 (검색 버튼 없음)
          </h4>
          <SearchField
            placeholder="상품명, 브랜드명을 입력하세요"
            value={searchValue1}
            onChange={(e, value) => setSearchValue1(value)}
            onClear={() => console.log("검색어 지움")}
          />
        </div>

        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>
            검색 버튼 포함
          </h4>
          <SearchField
            placeholder="검색어를 입력하세요"
            value={searchValue2}
            onChange={(e, value) => setSearchValue2(value)}
            onSearch={(value) => console.log("검색:", value)}
            onClear={() => setSearchValue2("")}
          />
        </div>

        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>
            Size & Variant
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <SearchField
              size="small"
              variant="default"
              placeholder="Small size"
            />
            <SearchField
              size="medium"
              variant="filled"
              placeholder="Medium size (filled)"
            />
            <SearchField
              size="large"
              variant="outlined"
              placeholder="Large size (outlined)"
            />
          </div>
        </div>

        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>
            비활성화
          </h4>
          <SearchField
            placeholder="비활성화된 검색 필드"
            disabled
          />
        </div>
      </div>
    </div>
  );
};

const InputPreview = () => {
  const [textValue, setTextValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [numberValue, setNumberValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [errorValue, setErrorValue] = useState("");
  const [successValue, setSuccessValue] = useState("");

  return (
    <div className="guide-preview guide-preview--input">
      <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "500px" }}>
        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>Text</h4>
          <Input
            label="이름"
            placeholder="이름을 입력하세요"
            value={textValue}
            onChange={(e, value) => setTextValue(value)}
            showClearButton
            help="본인 확인이 가능한 이름을 입력하세요"
          />
        </div>

        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>Tel (휴대폰 번호)</h4>
          <Input
            type="tel"
            label="휴대폰 번호"
            placeholder="010-1234-5678"
            value={phoneValue}
            onChange={(e, value) => setPhoneValue(value)}
            showClearButton
            help="숫자만 입력해도 자동으로 하이픈이 추가됩니다"
          />
        </div>

        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>Email</h4>
          <Input
            type="email"
            label="이메일"
            placeholder="name@example.com"
            value={emailValue}
            onChange={(e, value) => setEmailValue(value)}
            showClearButton
            help="이메일 주소를 입력하세요"
          />
        </div>

        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>Password</h4>
          <Input
            type="password"
            label="비밀번호"
            placeholder="비밀번호를 입력하세요"
            value={passwordValue}
            onChange={(e, value) => setPasswordValue(value)}
            help="8자 이상 입력하세요"
          />
        </div>

        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>Number</h4>
          <Input
            type="number"
            label="수량"
            placeholder="0"
            value={numberValue}
            onChange={(e, value) => setNumberValue(value)}
            showClearButton
          />
        </div>

        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>Error 상태</h4>
          <Input
            label="이메일"
            type="email"
            placeholder="email@example.com"
            value={errorValue}
            onChange={(e, value) => setErrorValue(value)}
            error="올바른 이메일 형식이 아닙니다"
            showClearButton
          />
        </div>

        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>Success 상태</h4>
          <Input
            label="사용자명"
            placeholder="사용자명을 입력하세요"
            value={successValue}
            onChange={(e, value) => setSuccessValue(value)}
            success="사용 가능한 사용자명입니다"
            showClearButton
          />
        </div>
      </div>
    </div>
  );
};

const SelectPreview = () => {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");

  const options = [
    { value: "opt1", label: "옵션 1" },
    { value: "opt2", label: "옵션 2" },
    { value: "opt3", label: "옵션 3" },
  ];

  return (
    <div className="guide-preview guide-preview--select">
      <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "500px" }}>
        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>기본</h4>
          <Select
            label="카테고리"
            options={options}
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
            placeholder="선택하세요"
          />
        </div>

        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>Error 상태</h4>
          <Select
            label="지역"
            options={options}
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
            error="지역을 선택해주세요"
          />
        </div>
      </div>
    </div>
  );
};

const CheckboxPreview = () => {
  const [checked1, setChecked1] = useState(false);
  const [groupOptions, setGroupOptions] = useState<CheckboxOption[]>([
    { value: "opt1", label: "옵션 1", checked: false },
    { value: "opt2", label: "옵션 2", checked: true },
    { value: "opt3", label: "옵션 3", checked: false, disabled: true },
  ]);

  return (
    <div className="guide-preview guide-preview--checkbox">
      <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "500px" }}>
        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>단일 선택</h4>
          <Checkbox label="약관에 동의합니다" checked={checked1} onChange={(e) => setChecked1(e.target.checked)} />
        </div>

        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>전체 선택 포함</h4>
          <CheckboxGroup
            label="관심사 선택"
            name="interests-with-select-all"
            options={groupOptions}
            onChange={(e, updatedOptions) => setGroupOptions(updatedOptions)}
            showSelectAll={true}
            selectAllLabel="전체 선택"
          />
        </div>
      </div>
    </div>
  );
};

const RadioPreview = () => {
  const [selected1, setSelected1] = useState("opt1");
  const [selected2, setSelected2] = useState("opt2");

  const options = [
    { value: "opt1", label: "옵션 1" },
    { value: "opt2", label: "옵션 2" },
    { value: "opt3", label: "옵션 3", disabled: true },
  ];

  return (
    <div className="guide-preview guide-preview--radio">
      <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "500px" }}>
        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>단일</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Radio name="single1" value="opt1" label="옵션 1" checked={selected1 === "opt1"} onChange={(e) => setSelected1(e.target.value)} />
            <Radio name="single1" value="opt2" label="옵션 2" checked={selected1 === "opt2"} onChange={(e) => setSelected1(e.target.value)} />
            <Radio name="single2" value="opt3" label="비활성화" disabled />
          </div>
        </div>

        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>그룹</h4>
          <RadioGroup
            label="결제 방법"
            name="payment"
            options={options}
            selectedValue={selected2}
            onChange={(e, value) => setSelected2(value)}
          />
        </div>
      </div>
    </div>
  );
};

const TextareaPreview = () => {
  const [value1, setValue1] = useState("");
  // 에러 상태를 바로 확인할 수 있도록 초기값에 1000바이트를 초과하는 텍스트 설정 (한글 약 600자 = 1200바이트)
  const [value2, setValue2] = useState(
    "이것은 바이트 제한을 초과하는 예시 텍스트입니다. 한글은 2바이트로 계산되므로 이 텍스트는 1000바이트를 초과하여 에러 상태로 표시됩니다. 실제 사용 시에는 사용자가 입력한 내용의 바이트 수를 계산하여 제한을 초과하면 에러 메시지가 표시됩니다. 이 예시는 에러 상태를 바로 확인할 수 있도록 초기값에 충분히 긴 텍스트를 넣어둔 것입니다. 계속해서 텍스트를 추가하여 바이트 수가 증가하는 것을 확인할 수 있습니다. 바이트 카운터는 하단 왼쪽에 표시되며, 제한을 초과하면 빨간색으로 표시되고 에러 메시지가 나타납니다. 이 기능은 사용자가 입력 가능한 최대 바이트 수를 명확하게 알려주고, 제한을 초과하지 않도록 도와줍니다. 실제 서비스에서는 상세 설명이나 긴 텍스트 입력 시 유용하게 사용할 수 있습니다. 추가로 더 많은 텍스트를 입력하여 바이트 수가 계속 증가하는 것을 확인할 수 있습니다. 바이트 제한을 초과하면 보더 색상이 빨간색으로 변경되고, 바이트 카운터도 빨간색으로 표시됩니다. 에러 메시지가 자동으로 나타나서 사용자에게 제한을 초과했다는 것을 알려줍니다. 이렇게 하면 사용자가 실수로 제한을 초과하는 것을 방지할 수 있습니다. 텍스트를 삭제하여 바이트 수를 줄이면 에러 상태가 해제되고 정상 상태로 돌아갑니다."
  );

  // 바이트 계산 함수
  const getByteLength = (str: string): number => {
    let byteLength = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charAt(i);
      if (char.match(/[가-힣ㄱ-ㅎㅏ-ㅣ一-龯]/)) {
        byteLength += 2;
      } else {
        byteLength += 1;
      }
    }
    return byteLength;
  };

  const byteLength1 = getByteLength(value1);
  const byteLength2 = getByteLength(value2);
  const maxByte = 1000;
  const isExceeded1 = byteLength1 > maxByte;
  const isExceeded2 = byteLength2 > maxByte;

  return (
    <div className="guide-preview guide-preview--textarea">
      <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "500px" }}>
        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>바이트 카운터</h4>
          <Textarea
            label="보다 자세한 상황 파악을 위해 상세내용을 입력해 주세요."
            placeholder="상세 내용을 입력하세요"
            value={value1}
            onChange={(e, value) => setValue1(value)}
            rows={8}
            maxByte={maxByte}
            showByteCounter={true}
          />
        </div>

        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>바이트 카운터 (에러 상태)</h4>
          <Textarea
            label="보다 자세한 상황 파악을 위해 상세내용을 입력해 주세요."
            placeholder="상세 내용을 입력하세요 (1000바이트 초과 시 에러)"
            value={value2}
            onChange={(e, value) => setValue2(value)}
            rows={8}
            maxByte={maxByte}
            showByteCounter={true}
            error={isExceeded2 ? `최대 ${maxByte}바이트까지 입력 가능합니다. (현재: ${byteLength2}바이트)` : undefined}
          />
        </div>
      </div>
    </div>
  );
};

const CardPreview = () => {
  return (
    <div className="guide-preview guide-preview--card">
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>상품 카드</h4>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "16px" }}>
            <Card
              variant="product"
              image="https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=300&fit=crop"
              imageAlt="아메리카노"
              title="아메리카노"
              description="진한 에스프레소에 물을 더한 클래식한 커피"
              price="4,500원"
              badge="NEW"
              badgeVariant="success"
              hoverable
            />
            <Card
              variant="product"
              image="https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=300&fit=crop"
              imageAlt="카라멜 아메리카노"
              title="카라멜 아메리카노"
              description="달콤한 카라멜 시럽이 들어간 아메리카노"
              price="5,000원"
              badge="인기"
              badgeVariant="error"
              hoverable
            />
          </div>
        </div>

        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>콘텐츠 카드</h4>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
            <Card
              variant="content"
              image="https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=250&fit=crop"
              imageAlt="커피 이야기"
              title="커피의 역사"
              description="커피는 에티오피아에서 시작되어 전 세계로 퍼져나간 음료입니다."
              hoverable
            />
            <Card
              variant="content"
              title="커피 원두 선택 가이드"
              description="좋은 원두를 선택하는 방법과 보관법에 대해 알아봅시다."
              hoverable
            />
          </div>
        </div>

        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>클릭 가능한 카드</h4>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "16px" }}>
            <Card
              variant="product"
              image="https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=300&fit=crop"
              imageAlt="아이스 아메리카노"
              title="아이스 아메리카노"
              description="시원하게 즐기는 아메리카노"
              price="4,500원"
              onClick={() => console.log("카드 클릭")}
              hoverable
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ListPreview = () => {
  const textItems = [
    { id: 1, content: "첫 번째 항목" },
    { id: 2, content: "두 번째 항목" },
    { id: 3, content: "세 번째 항목" },
  ];

  const iconItems = [
    { id: 1, content: "홈", icon: "🏠" },
    { id: 2, content: "검색", icon: "🔍" },
    { id: 3, content: "설정", icon: "⚙️" },
    { id: 4, content: "프로필", icon: "👤" },
  ];

  const clickableItems = [
    { id: 1, content: "클릭 가능한 항목 1", onClick: () => console.log("클릭 1") },
    { id: 2, content: "클릭 가능한 항목 2", onClick: () => console.log("클릭 2") },
    { id: 3, content: "비활성화 항목", onClick: () => {}, disabled: true },
  ];

  const complexItems = [
    { id: 1, content: "알림", icon: "🔔", suffix: "3" },
    { id: 2, content: "메시지", icon: "💬", suffix: "12" },
    { id: 3, content: "이메일", icon: "📧", suffix: "읽지 않음" },
  ];

  return (
    <div className="guide-preview guide-preview--list">
      <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "500px" }}>
        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>텍스트 리스트</h4>
          <List items={textItems} variant="text" bordered />
        </div>

        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>아이콘 리스트</h4>
          <List items={iconItems} variant="icon" bordered />
        </div>

        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>구분선 있는 리스트</h4>
          <List items={textItems} variant="text" bordered divided />
        </div>

        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>클릭 가능한 리스트</h4>
          <List items={clickableItems} variant="text" bordered />
        </div>

        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>복합 리스트 (아이콘 + suffix)</h4>
          <List items={complexItems} variant="icon" bordered />
        </div>

        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>직접 ListItem 사용</h4>
          <List variant="text" bordered>
            <ListItem icon="⭐" prefix="1.">첫 번째 항목</ListItem>
            <ListItem icon="⭐" prefix="2.">두 번째 항목</ListItem>
            <ListItem icon="⭐" prefix="3." suffix="완료">세 번째 항목</ListItem>
          </List>
        </div>
      </div>
    </div>
  );
};

const AccordionPreview = () => {
  const exclusiveItems = [
    {
      id: "1",
      label: "에피타이저",
      content: "에피타이저 메뉴입니다. 다양한 전채 요리를 제공합니다.",
    },
    {
      id: "2",
      label: "메인 음식",
      content: "메인 음식 메뉴입니다. 풍부한 맛의 메인 요리를 제공합니다.",
    },
    {
      id: "3",
      label: "디저트",
      content: "디저트 메뉴입니다. 달콤한 디저트를 제공합니다.",
    },
  ];

  const independentItems = [
    {
      id: "4",
      label: "음료",
      content: "음료 메뉴입니다. 다양한 음료를 제공합니다.",
    },
    {
      id: "5",
      label: "셀러드",
      content: "셀러드 메뉴입니다. 신선한 샐러드를 제공합니다.",
    },
    {
      id: "6",
      label: "일식",
      content: "일식 메뉴입니다. 정통 일식을 제공합니다.",
    },
  ];

  return (
    <div className="guide-preview guide-preview--accordion">
      <div style={{ marginBottom: "24px", display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
        <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>
          Exclusive 타입 (하나만 열림)
        </h4>
        <Accordion items={exclusiveItems} type="exclusive" />
      </div>
      <div style={{ marginBottom: "24px", display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
        <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>
          Independent 타입 (독립적으로 열림)
        </h4>
        <Accordion items={independentItems} type="independent" />
      </div>
    </div>
  );
};

const LottiePreview = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [loop, setLoop] = useState(true);

  // 공개된 Lottie 샘플 URL 사용 (실제 작동하는 애니메이션)
  const sampleUrl = "https://assets5.lottiefiles.com/packages/lf20_jcikwtux.json";
  
  // 또는 로컬 JSON 데이터 사용 (주석 해제하여 사용)
  // const loadingAnimation = {
  //   v: "5.7.4",
  //   fr: 30,
  //   ip: 0,
  //   op: 60,
  //   w: 200,
  //   h: 200,
  //   nm: "Loading Circle",
  //   ddd: 0,
  //   assets: [],
  //   layers: [...]
  // };

  return (
    <div className="guide-preview guide-preview--lottie">
      <div className="lottie-preview__container">
        <div className="lottie-preview__animation">
          <LottieAnimation
            animationData={sampleUrl}
            loop={loop}
            autoplay={isPlaying}
            speed={speed}
            width={200}
            height={200}
          />
        </div>
        
        <div className="lottie-preview__controls">
          <div className="lottie-control-group">
            <label className="lottie-control-label">
              <input
                type="checkbox"
                checked={isPlaying}
                onChange={(e) => setIsPlaying(e.target.checked)}
              />
              <span>자동 재생</span>
            </label>
          </div>

          <div className="lottie-control-group">
            <label className="lottie-control-label">
              <input
                type="checkbox"
                checked={loop}
                onChange={(e) => setLoop(e.target.checked)}
              />
              <span>반복 재생</span>
            </label>
          </div>

          <div className="lottie-control-group">
            <label className="lottie-control-label">
              <span>재생 속도: {speed}x</span>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
              />
            </label>
          </div>
        </div>

        <div className="lottie-preview__info">
          <p>Lottie 애니메이션은 JSON 형식의 벡터 애니메이션을 웹에서 재생할 수 있게 해줍니다.</p>
          <p>After Effects에서 Bodymovin 플러그인으로 내보낸 JSON 파일을 사용합니다.</p>
        </div>
      </div>
    </div>
  );
};

const TypographyPreview = () => {
  return (
    <div className="guide-preview guide-preview--typography">
      <div className="typography-preview">
        {/* 제목 스타일 */}
        <div className="typography-preview__section">
          <h4 className="typography-preview__title">제목 스타일</h4>
          <div className="typography-preview__group">
            <Typography variant="h1">Heading 1</Typography>
            <Typography variant="h2">Heading 2</Typography>
            <Typography variant="h3">Heading 3</Typography>
            <Typography variant="h4">Heading 4</Typography>
            <Typography variant="h5">Heading 5</Typography>
            <Typography variant="h6">Heading 6</Typography>
          </div>
        </div>

        {/* 본문 스타일 */}
        <div className="typography-preview__section">
          <h4 className="typography-preview__title">본문 스타일</h4>
          <div className="typography-preview__group">
            <Typography variant="body" size="small">
              작은 본문 텍스트 (Small Body)
            </Typography>
            <Typography variant="body">
              기본 본문 텍스트 (Body) - 일반적인 본문 내용에 사용됩니다. 여러 줄로 표시될 수 있으며 가독성을 고려하여 적절한 행간과 자간이 설정되어 있습니다.
            </Typography>
            <Typography variant="body" size="large">
              큰 본문 텍스트 (Large Body) - 강조가 필요한 본문 내용에 사용됩니다.
            </Typography>
          </div>
        </div>

        {/* 캡션 & 오버라인 */}
        <div className="typography-preview__section">
          <h4 className="typography-preview__title">캡션 & 오버라인</h4>
          <div className="typography-preview__group">
            <Typography variant="caption">캡션 텍스트 (Caption)</Typography>
            <Typography variant="caption" size="small">작은 캡션</Typography>
            <Typography variant="caption" size="large">큰 캡션</Typography>
            <Typography variant="overline">오버라인 텍스트</Typography>
          </div>
        </div>

        {/* 색상 변형 */}
        <div className="typography-preview__section">
          <h4 className="typography-preview__title">색상 변형</h4>
          <div className="typography-preview__group">
            <Typography variant="body" color="default">기본 색상 (Default)</Typography>
            <Typography variant="body" color="muted">약한 색상 (Muted)</Typography>
            <Typography variant="body" color="accent">강조 색상 (Accent)</Typography>
          </div>
        </div>

        {/* 폰트 굵기 */}
        <div className="typography-preview__section">
          <h4 className="typography-preview__title">폰트 굵기</h4>
          <div className="typography-preview__group">
            <Typography variant="body" weight="normal">Normal (400)</Typography>
            <Typography variant="body" weight="medium">Medium (500)</Typography>
            <Typography variant="body" weight="semibold">Semibold (600)</Typography>
            <Typography variant="body" weight="bold">Bold (700)</Typography>
          </div>
        </div>

        {/* 텍스트 정렬 */}
        <div className="typography-preview__section">
          <h4 className="typography-preview__title">텍스트 정렬</h4>
          <div className="typography-preview__group">
            <Typography variant="body" align="left">왼쪽 정렬 (Left)</Typography>
            <Typography variant="body" align="center">가운데 정렬 (Center)</Typography>
            <Typography variant="body" align="right">오른쪽 정렬 (Right)</Typography>
          </div>
        </div>

        {/* 말줄임표 */}
        <div className="typography-preview__section">
          <h4 className="typography-preview__title">말줄임표</h4>
          <div className="typography-preview__group">
            <Typography variant="body" truncate style={{ maxWidth: "200px" }}>
              한 줄 말줄임표 예시입니다. 텍스트가 길어지면 자동으로 말줄임표가 표시됩니다.
            </Typography>
            <Typography variant="body" lineClamp={2} style={{ maxWidth: "200px" }}>
              두 줄 말줄임표 예시입니다. 여러 줄의 텍스트가 표시되다가 지정된 줄 수를 넘으면 자동으로 말줄임표가 표시됩니다.
            </Typography>
            <Typography variant="body" lineClamp={3} style={{ maxWidth: "200px" }}>
              세 줄 말줄임표 예시입니다. 더 많은 텍스트를 표시할 수 있으며, 세 줄을 넘어가면 자동으로 말줄임표가 표시됩니다.
            </Typography>
          </div>
        </div>

        {/* 커스텀 태그 */}
        <div className="typography-preview__section">
          <h4 className="typography-preview__title">커스텀 태그</h4>
          <div className="typography-preview__group">
            <Typography variant="h3" as="div">h3 스타일을 div 태그로</Typography>
            <Typography variant="body" as="span">body 스타일을 span 태그로</Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

const ColorPreview = () => {
  // 브랜드 컬러 팔레트
  const brandColors = [
    {
      name: "Primary",
      value: "#0c7c59",
      description: "메인 브랜드 컬러",
      showVariable: true,
    },
    {
      name: "Primary Light",
      value: "rgba(12, 124, 89, 0.12)",
      description: "브랜드 컬러 배경",
      showVariable: true,
    },
    {
      name: "Primary Dark",
      value: "#0a6347",
      description: "브랜드 컬러 다크",
      showVariable: true,
    },
  ];

  // 상태 컬러 팔레트
  const statusColors = [
    {
      name: "Success",
      value: "#22c55e",
      description: "성공 상태",
      showVariable: true,
    },
    {
      name: "Warning",
      value: "#fbbf24",
      description: "경고 상태",
      showVariable: true,
    },
    {
      name: "Error",
      value: "#ef4444",
      description: "에러 상태",
      showVariable: true,
    },
    {
      name: "Info",
      value: "#3b82f6",
      description: "정보 상태",
      showVariable: true,
    },
  ];

  // 기본 컬러 팔레트
  const baseColors = [
    {
      name: "Background",
      value: "#f5f6f7",
      description: "배경색",
      showVariable: true,
    },
    {
      name: "Card",
      value: "#ffffff",
      description: "카드 배경색",
      showVariable: true,
    },
    {
      name: "Text",
      value: "#1b1b1f",
      description: "텍스트 색상",
      showVariable: true,
    },
    {
      name: "Muted",
      value: "#5b5c60",
      description: "보조 텍스트",
      showVariable: true,
    },
    {
      name: "Border",
      value: "rgba(12, 124, 89, 0.16)",
      description: "테두리 색상",
      showVariable: true,
    },
  ];

  // 테마 비교용 컬러
  const themeColors = [
    {
      name: "Background",
      light: "#f5f6f7",
      dark: "#111315",
      variable: "--color-bg",
    },
    {
      name: "Card",
      light: "#ffffff",
      dark: "#1a1c1f",
      variable: "--color-card",
    },
    {
      name: "Text",
      light: "#1b1b1f",
      dark: "#f8f8fa",
      variable: "--color-text",
    },
    {
      name: "Muted",
      light: "#5b5c60",
      dark: "#a5a7ac",
      variable: "--color-muted",
    },
    {
      name: "Accent",
      light: "#0c7c59",
      dark: "#10b981",
      variable: "--color-accent",
    },
    {
      name: "Success",
      light: "#22c55e",
      dark: "#4ade80",
      variable: "--color-success",
    },
    {
      name: "Warning",
      light: "#fbbf24",
      dark: "#fcd34d",
      variable: "--color-warning",
    },
    {
      name: "Error",
      light: "#ef4444",
      dark: "#f87171",
      variable: "--color-error",
    },
    {
      name: "Info",
      light: "#3b82f6",
      dark: "#60a5fa",
      variable: "--color-info",
    },
  ];

  return (
    <div className="guide-preview guide-preview--color">
      <ColorPalette title="브랜드 컬러" colors={brandColors} />
      <ColorPalette title="상태 컬러" colors={statusColors} />
      <ColorPalette title="기본 컬러" colors={baseColors} />
      <ColorTheme colors={themeColors} />
    </div>
  );
};

const SpacingPreview = () => {
  // 간격 토큰 스케일
  const spacingTokens = [
    { value: 4, name: "XS" },
    { value: 8, name: "SM" },
    { value: 12, name: "MD" },
    { value: 16, name: "LG" },
    { value: 20, name: "XL" },
    { value: 24, name: "2XL" },
    { value: 32, name: "3XL" },
    { value: 40, name: "4XL" },
    { value: 48, name: "5XL" },
    { value: 64, name: "6XL" },
  ];

  // 간격 사용 예시
  const spacingExamples = [
    {
      label: "간격 8px (SM)",
      value: 8,
      code: "gap: px(8); // 또는 gap: 0.5rem;",
    },
    {
      label: "간격 16px (LG)",
      value: 16,
      code: "gap: px(16); // 또는 gap: 1rem;",
    },
    {
      label: "간격 24px (2XL)",
      value: 24,
      code: "gap: px(24); // 또는 gap: 1.5rem;",
    },
    {
      label: "간격 32px (3XL)",
      value: 32,
      code: "gap: px(32); // 또는 gap: 2rem;",
    },
  ];

  return (
    <div className="guide-preview guide-preview--spacing">
      <SpacingScale title="간격 토큰 스케일" values={spacingTokens} />
      <SpacingExample title="간격 사용 예시" examples={spacingExamples} />
    </div>
  );
};

const LayoutSpacingPreview = () => {
  // 컨테이너 폭 스케일
  const containers = [
    {
      name: "Mobile",
      width: 375,
      description: "모바일 기본 폭",
    },
    {
      name: "Tablet",
      width: 768,
      description: "태블릿 기본 폭",
    },
    {
      name: "Desktop",
      width: 1200,
      description: "데스크톱 기본 폭",
    },
    {
      name: "Wide",
      width: 1440,
      description: "와이드 데스크톱 폭",
    },
  ];

  // 그리드 시스템
  const grids = [
    {
      columns: 2,
      gap: 16,
      name: "2 Column Grid",
    },
    {
      columns: 3,
      gap: 16,
      name: "3 Column Grid",
    },
    {
      columns: 4,
      gap: 16,
      name: "4 Column Grid",
    },
    {
      columns: 6,
      gap: 12,
      name: "6 Column Grid",
    },
    {
      columns: 12,
      gap: 16,
      name: "12 Column Grid",
    },
  ];

  return (
    <div className="guide-preview guide-preview--layout-spacing">
      <ContainerScale title="컨테이너 폭" containers={containers} />
      <GridSystem title="그리드 시스템" grids={grids} />
    </div>
  );
};

const ScrollTopPreview = () => {
  return (
    <div className="guide-preview guide-preview--scroll-top">
      <div style={{ padding: "40px", minHeight: "200vh", background: "linear-gradient(to bottom, #f5f5f5, #e0e0e0)" }}>
        <h4 style={{ marginBottom: "24px", fontSize: "16px", fontWeight: 700 }}>
          스크롤을 내려보세요. 오른쪽 하단에 버튼이 나타납니다.
        </h4>
        <div style={{ marginBottom: "40px" }}>
          <p style={{ marginBottom: "16px", lineHeight: "1.6" }}>
            이 페이지는 스크롤 탑 버튼의 동작을 확인하기 위해 충분한 높이를 가지고 있습니다.
          </p>
          <p style={{ marginBottom: "16px", lineHeight: "1.6" }}>
            페이지를 아래로 스크롤하면 오른쪽 하단에 "맨 위로 이동" 버튼이 나타납니다.
          </p>
          <p style={{ marginBottom: "16px", lineHeight: "1.6" }}>
            버튼을 클릭하면 페이지 상단으로 부드럽게 스크롤됩니다.
          </p>
        </div>
        <div style={{ height: "1500px", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255, 255, 255, 0.5)", borderRadius: "8px" }}>
          <p style={{ fontSize: "14px", color: "#666" }}>더 많은 콘텐츠 영역...</p>
        </div>
        <ScrollTop showAfter={200} smooth={true} />
      </div>
    </div>
  );
};

const BorderAnimationPreview = () => {
  return (
    <div className="guide-preview guide-preview--border-animation">
      <div className="border-animation-grid">
        <div className="border-animation-item">
          <h5>회전하는 그라데이션</h5>
          <BorderAnimation variant="rotate">
            <div>
              <Typography variant="h6" size="medium">회전 보더</Typography>
              <Typography variant="body" size="small" color="muted">
                그라데이션이 회전하는 보더 애니메이션
              </Typography>
            </div>
          </BorderAnimation>
        </div>
        <div className="border-animation-item">
          <h5>펄스 보더</h5>
          <BorderAnimation variant="pulse">
            <div>
              <Typography variant="h6" size="medium">펄스 보더</Typography>
              <Typography variant="body" size="small" color="muted">
                맥박처럼 뛰는 펄스 애니메이션
              </Typography>
            </div>
          </BorderAnimation>
        </div>
        <div className="border-animation-item">
          <h5>그라데이션 보더</h5>
          <BorderAnimation variant="gradient">
            <div>
              <Typography variant="h6" size="medium">그라데이션 보더</Typography>
              <Typography variant="body" size="small" color="muted">
                위에서 아래로 흐르는 그라데이션
              </Typography>
            </div>
          </BorderAnimation>
        </div>
      </div>
    </div>
  );
};

const ListContainerPreview = () => {
  return (
    <div className="guide-preview guide-preview--list-container">
      <div className="list-container-demo">
        {/* Section 태그 예시 */}
        <div className="list-container-demo__section">
          <h4 className="list-container-demo__title">Section 태그</h4>
          <ListContainer
            tag="section"
            title="음료 메뉴"
            description="다양한 음료를 선택하실 수 있습니다."
            bordered
          >
            <Card variant="product" title="아메리카노" description="진한 에스프레소에 뜨거운 물을 부어 만든 커피" price="4,500원" />
            <Card variant="product" title="카페라떼" description="에스프레소와 스팀 밀크의 조화" price="5,000원" />
            <Card variant="product" title="카푸치노" description="에스프레소와 우유 거품의 만남" price="5,000원" />
          </ListContainer>
        </div>

        {/* Article 태그 예시 */}
        <div className="list-container-demo__section">
          <h4 className="list-container-demo__title">Article 태그</h4>
          <ListContainer
            tag="article"
            title="공지사항"
            description="최신 공지사항을 확인하세요."
            bordered
            divided
          >
            <div>
              <Typography variant="h6" size="small">시스템 점검 안내</Typography>
              <Typography variant="body" size="small" color="muted">
                2024년 1월 15일 시스템 점검이 예정되어 있습니다.
              </Typography>
            </div>
            <div>
              <Typography variant="h6" size="small">새로운 메뉴 출시</Typography>
              <Typography variant="body" size="small" color="muted">
                봄 시즌 한정 메뉴가 출시되었습니다.
              </Typography>
            </div>
            <div>
              <Typography variant="h6" size="small">이벤트 안내</Typography>
              <Typography variant="body" size="small" color="muted">
                신규 회원 가입 시 무료 음료 쿠폰을 드립니다.
              </Typography>
            </div>
          </ListContainer>
        </div>

        {/* 구분선 스타일 예시 */}
        <div className="list-container-demo__section">
          <h4 className="list-container-demo__title">구분선 스타일 (divided)</h4>
          <ListContainer tag="section" divided>
            <div>
              <Typography variant="body" size="medium">첫 번째 아이템</Typography>
            </div>
            <div>
              <Typography variant="body" size="medium">두 번째 아이템</Typography>
            </div>
            <div>
              <Typography variant="body" size="medium">세 번째 아이템</Typography>
            </div>
          </ListContainer>
        </div>

        {/* 테두리 스타일 예시 */}
        <div className="list-container-demo__section">
          <h4 className="list-container-demo__title">테두리 스타일 (bordered)</h4>
          <ListContainer tag="section" bordered>
            <div>
              <Typography variant="body" size="medium">테두리가 있는 컨테이너입니다.</Typography>
            </div>
            <div>
              <Typography variant="body" size="small" color="muted">
                bordered prop을 사용하면 테두리와 배경색이 적용됩니다.
              </Typography>
            </div>
          </ListContainer>
        </div>
      </div>
    </div>
  );
};

const CommonLayoutPreview = () => {
  const [currentPage, setCurrentPage] = useState("guide");
  const [activeDock, setActiveDock] = useState("home");
  
  const bottomDockItems = [
    { key: "home", label: "홈", icon: "🏠" },
    { key: "search", label: "검색", icon: "🔍" },
    { key: "profile", label: "프로필", icon: "👤" },
  ];

  return (
    <div className="guide-preview guide-preview--common-layout">
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>기본 사용 (서브 헤더)</h4>
          <div style={{ border: "1px solid var(--color-border)", borderRadius: "8px", overflow: "hidden" }}>
            <CommonLayout
              headerVariant="sub"
              headerCategoryName="카테고리"
              headerOnBack={() => console.log("뒤로가기")}
              showScrollTop={true}
              scrollTopShowAfter={100}
            >
              <div style={{ padding: "20px", minHeight: "200px" }}>
                <Typography variant="body" size="medium">컨텐츠 영역입니다.</Typography>
              </div>
            </CommonLayout>
          </div>
        </div>

        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>메인 헤더 + BottomDock</h4>
          <div style={{ border: "1px solid var(--color-border)", borderRadius: "8px", overflow: "hidden" }}>
            <CommonLayout
              headerVariant="main"
              headerCurrentPage={currentPage}
              headerOnPageChange={(page) => setCurrentPage(page)}
              showBottomDock={true}
              bottomDockItems={bottomDockItems}
              bottomDockOnChange={(key) => setActiveDock(key)}
              bottomDockDefaultActive="home"
              bottomDockPosition="relative"
              showScrollTop={true}
            >
              <div style={{ padding: "20px", minHeight: "200px" }}>
                <Typography variant="body" size="medium">메인 헤더와 하단 도크가 있는 레이아웃입니다.</Typography>
              </div>
            </CommonLayout>
          </div>
        </div>

        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>푸터 포함</h4>
          <div style={{ border: "1px solid var(--color-border)", borderRadius: "8px", overflow: "hidden" }}>
            <CommonLayout
              headerVariant="sub"
              headerCategoryName="페이지"
              showFooter={true}
              footerNav={[
                { label: "회사소개", href: "/company" },
                { label: "이용약관", href: "/terms" },
              ]}
              footerInfo={{
                address: "서울특별시 강남구",
                contact: "02-1234-5678",
              }}
            >
              <div style={{ padding: "20px", minHeight: "200px" }}>
                <Typography variant="body" size="medium">푸터가 포함된 레이아웃입니다.</Typography>
              </div>
            </CommonLayout>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoadingGridPreview = () => {
  return (
    <div className="guide-preview guide-preview--loading-grid">
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>기본 사용 (12개, 5열)</h4>
          <LoadingGrid count={12} columns={5} />
        </div>

        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>6개, 3열</h4>
          <LoadingGrid count={6} columns={3} />
        </div>

        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>8개, 4열</h4>
          <LoadingGrid count={8} columns={4} />
        </div>
      </div>
    </div>
  );
};

const AccessibilityHelperPreview = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontScale, setFontScale] = useState("normal");

  return (
    <div className="guide-preview guide-preview--accessibility-helper">
      <div style={{ display: "flex", flexDirection: "column", gap: "24px", minHeight: "300px", position: "relative" }}>
        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>접근성 도우미</h4>
          <Typography variant="body" size="small" color="muted" style={{ marginBottom: "16px" }}>
            오른쪽 가운데 "옵션" 버튼을 클릭하여 열 수 있습니다.
          </Typography>
          <div style={{ border: "1px solid var(--color-border)", borderRadius: "8px", padding: "20px", minHeight: "200px" }}>
            <Typography variant="body" size="medium">이 영역은 접근성 도우미의 영향을 받습니다.</Typography>
            <Typography variant="body" size="small" color="muted" style={{ marginTop: "8px" }}>
              다크모드와 폰트 크기를 변경할 수 있습니다.
            </Typography>
          </div>
        </div>

        <div style={{ position: "relative", height: "100px" }}>
          <AccessibilityHelper
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            fontScale={fontScale}
            setFontScale={setFontScale}
          />
        </div>
      </div>
    </div>
  );
};

const PageTemplatePreview = () => {
  return (
    <div className="guide-preview guide-preview--page-template">
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>PageTemplate 사용 예제</h4>
          <Typography variant="body" size="small" color="muted" style={{ marginBottom: "16px" }}>
            PageTemplate은 다크모드, 폰트 스케일 조절 등 접근성 기능을 포함합니다.
            실제 페이지에서는 다음과 같이 사용합니다.
          </Typography>
          <div style={{ border: "1px solid var(--color-border)", borderRadius: "8px", padding: "20px", background: "var(--color-bg)" }}>
            <Typography variant="body" size="medium" style={{ marginBottom: "12px" }}>
              이 페이지는 PageTemplate으로 감싸져 있습니다.
            </Typography>
            <Typography variant="body" size="small" color="muted">
              오른쪽 하단의 접근성 도우미를 통해 테마와 폰트 크기를 조절할 수 있습니다.
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

// 가이드 섹션 정의
const guideSections = [
  {
    id: "header",
    label: "헤더",
    title: "모바일 헤더 레이아웃",
    description:
      "모바일 환경을 위한 반응형 헤더 디자인입니다. 메인 헤더는 햄버거 버튼으로 사이드 메뉴를 열 수 있으며, 3뎁스 메뉴 구조를 지원합니다. 서브 헤더는 뒤로가기 버튼, 카테고리 이름, 유틸리티 버튼들로 구성됩니다.",
    code: `import Header from "./Header";
import { useState, useEffect } from "react";

type Page = "guide" | "url" | "sample";
type UtilityType = "search" | "more";

// ===== Props 설명 (TypeScript) =====
// variant?: "main" | "sub";
// currentPage?: Page;                // variant="main"일 때 사용
// onPageChange?: (page: Page) => void;
// categoryName?: string;             // variant="sub"일 때 사용
// onBack?: () => void;
// onCartClick?: () => void;
// onUtilityClick?: (type: UtilityType) => void;
// sticky?: boolean;                  // sticky 활성화 여부 (기본값: false)

// ===== 메인 헤더 기본 사용 =====
const [currentPage, setCurrentPage] = useState<Page>("guide");

const handlePageChange = (page: Page): void => {
  setCurrentPage(page);
  navigateToPage(page);
};

<Header 
  currentPage={currentPage} 
  onPageChange={handlePageChange} 
  variant="main"
/>;

// ===== 메인 헤더 sticky 활성화 =====
<Header 
  currentPage={currentPage} 
  onPageChange={handlePageChange} 
  variant="main"
  sticky={true}
/>;

// ===== 서브 헤더 기본 사용 =====
<Header 
  variant="sub"
  categoryName="음료"
  onBack={() => navigateBack()}
  onCartClick={() => navigateToCart()}
  onUtilityClick={(type: UtilityType) => {
    if (type === "search") {
      openSearchModal();
    } else {
      openMoreMenu();
    }
  }}
/>;

// ===== 서브 헤더 sticky 활성화 =====
<Header 
  variant="sub"
  categoryName="음료"
  sticky={true}
  onBack={() => navigateBack()}
  onCartClick={() => navigateToCart()}
  onUtilityClick={(type: UtilityType) => {
    if (type === "search") {
      openSearchModal();
    } else {
      openMoreMenu();
    }
  }}
/>;

// ===== 조건부 sticky 적용 =====
const PageWithHeader = () => {
  const [isSticky, setIsSticky] = useState<boolean>(false);

  const handleScroll = (): void => {
    // 스크롤 위치에 따라 sticky 활성화/비활성화
    setIsSticky(window.scrollY > 100);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Header 
      variant="main"
      sticky={isSticky}
      currentPage={currentPage}
      onPageChange={handlePageChange}
    />
  );
};

// ===== gnbMenu 구조 =====
// { id: string; label: string; href?: string; children?: GnbItem[] }[];`,
    PreviewComponent: HeaderPreview,
  },
  {
    id: "footer",
    label: "푸터",
    title: "푸터 레이아웃",
    description:
      "사이트의 공통 하단 영역으로, 회사 정보·고객센터·SNS 링크 등을 담습니다. 명확한 링크와 대비를 유지하고, 모바일에서도 읽기 쉬운 여백을 확보합니다.",
    code: `import Footer from "./Footer";

type FooterLink = { label: string; href: string };
type FooterInfo = { address: string; contact: string };

// ===== 기본 사용 (기본값 활용) =====
<Footer />;

// ===== 커스텀 네비게이션 / 회사정보 / SNS =====
const nav: FooterLink[] = [
  { label: "회사소개", href: "/company" },
  { label: "개인정보처리방침", href: "/privacy" },
  { label: "이용약관", href: "/terms" },
  { label: "FAQ", href: "/faq" },
  { label: "문의하기", href: "/contact" },
];

const info: FooterInfo = {
  address: "서울특별시 강남구 테헤란로 123, 스타벅스코리아",
  contact: "고객센터 1522-3232 | support@starbucks.co.kr",
};

const sns: string[] = ["Instagram", "Facebook", "Youtube", "Twitter"];

<Footer nav={nav} info={info} sns={sns} logo="STARBUCKS" />;

// Tip: nav는 label/href가 필수이며, info는 address/contact가 필수입니다.`,
    PreviewComponent: FooterPreview,
  },
  {
    id: "file-upload",
    label: "파일첨부",
    title: "FileUpload 컴포넌트",
    description:
      "이미지 파일만 허용하며 최대 3개까지 업로드할 수 있는 파일 업로드 컴포넌트입니다. 각 파일은 최대 300MB까지 허용되며, 이미지 미리보기, 개별 삭제, 전체 삭제 기능을 포함합니다. Image 컴포넌트를 사용하여 자동으로 비율을 판단하고 적절한 크기로 표시합니다.",
    code: `import FileUpload from "./FileUpload";
import { useState } from "react";
import type { ChangeEvent } from "react";

// ===== 기본 사용 =====
// 내부에서 상태를 모두 관리하므로 단순히 렌더링만 하면 됩니다.
<FileUpload />;

// ===== 파일 메타 타입 =====
type UploadedFile = {
  id: number;
  file: File;
  name: string;
  size: number;
  type: string;
  preview: string; // Blob URL
};

const MAX_FILES = 3;
const MAX_SIZE = 300 * 1024 * 1024; // 300MB

// ===== 파일 선택 시 검증 예시 =====
const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
  const files = e.target.files;
  if (!files) return;

  const selected = Array.from(files);
  const images = selected.filter((file: File) => file.type.startsWith("image/"));
  
  if (images.length === 0) {
    alert("이미지 파일만 업로드할 수 있습니다.");
    e.target.value = "";
    return;
  }

  if (images.length > MAX_FILES) {
    alert(\`최대 \${MAX_FILES}개까지 업로드할 수 있습니다.\`);
    e.target.value = "";
    return;
  }

  if (images.some((file: File) => file.size > MAX_SIZE)) {
    alert("파일당 최대 300MB까지 첨부할 수 있습니다.");
    e.target.value = "";
    return;
  }

  // 이후 FileUpload 내부 로직과 동일하게 상태를 업데이트합니다.
  e.target.value = ""; // 같은 파일 재선택 허용
};

// ===== 상태 관리 예제 =====
const FileUploadExample = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    if (!files) return;

    const newFiles: UploadedFile[] = Array.from(files)
      .filter((file: File) => file.type.startsWith("image/"))
      .slice(0, MAX_FILES)
      .map((file: File, index: number) => ({
        id: Date.now() + index,
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        preview: URL.createObjectURL(file),
      }));

    setUploadedFiles((prev) => [...prev, ...newFiles].slice(0, MAX_FILES));
  };

  const handleRemove = (id: number): void => {
    setUploadedFiles((prev) => {
      const file = prev.find((f) => f.id === id);
      if (file) {
        URL.revokeObjectURL(file.preview);
      }
      return prev.filter((f) => f.id !== id);
    });
  };

  const handleClear = (): void => {
    uploadedFiles.forEach((file) => {
      URL.revokeObjectURL(file.preview);
    });
    setUploadedFiles([]);
  };

  return (
    <div>
      <input type="file" multiple accept="image/*" onChange={handleFileSelect} />
      {/* FileUpload 컴포넌트 사용 */}
      <FileUpload />
    </div>
  );
};`,
    PreviewComponent: FileUpload,
  },
  {
    id: "more",
    label: "더보기",
    title: "더보기 레이아웃",
    description:
      "더보기 버튼으로 대량의 리스트 데이터를 점진적으로 로드합니다. 초기 제한된 개수부터 시작해 사용자의 필요에 따라 추가 데이터를 불러옵니다.",
    code: `import { useState, useRef, useEffect } from "react";
import Loading from "./Loading";
import type { IntersectionObserverEntry } from "react";

type Item = {
  id: number;
  title: string;
  description: string;
};

// ===== 기본 더보기 기능 =====
const LoadMoreBasic = () => {
  const [visibleItems, setVisibleItems] = useState<number>(5);
  const totalItems = 20;
  const itemsPerPage = 5;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const items: Item[] = Array.from({ length: totalItems }, (_, i) => ({
    id: i + 1,
    title: \`항목 \${i + 1}\`,
    description: \`항목 \${i + 1} 설명\`,
  }));

  const handleLoadMore = async (): Promise<void> => {
    if (isLoading || visibleItems >= totalItems) return;
    
    setIsLoading(true);
    // 데이터 로드 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setVisibleItems((prev) => Math.min(prev + itemsPerPage, totalItems));
    setIsLoading(false);
  };

  const displayedItems = items.slice(0, visibleItems);
  const remainingItems = totalItems - visibleItems;

  return (
    <div className="layout-list">
      {displayedItems.map((item) => (
        <div key={item.id} className="layout-item">
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      ))}

      {visibleItems < totalItems && (
        <button
          onClick={handleLoadMore}
          className="load-more-btn"
          disabled={isLoading}
          aria-label={\`\${remainingItems}개 더보기\`}
        >
          {isLoading ? (
            <>
              <Loading size={16} thickness={2} />
              <span>불러오는 중...</span>
            </>
          ) : (
            \`더보기 (\${remainingItems}개)\`
          )}
        </button>
      )}

      {visibleItems >= totalItems && (
        <p className="load-more-end">모든 항목을 불러왔습니다.</p>
      )}
    </div>
  );
};

// ===== 비동기 API 데이터 로드 =====
const LoadMoreAsync = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  const handleLoadMore = async (): Promise<void> => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const response = await fetch(\`/api/items?page=\${page + 1}&limit=10\`);
      const data = await response.json();

      if (data.items.length === 0) {
        setHasMore(false);
      } else {
        setItems((prev) => [...prev, ...data.items]);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("데이터 로드 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="layout-list">
      {items.map((item) => (
        <div key={item.id} className="layout-item">
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      ))}

      {hasMore && (
        <button
          onClick={handleLoadMore}
          className="load-more-btn"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loading size={20} thickness={3} label="불러오는 중..." />
            </>
          ) : (
            "더보기"
          )}
        </button>
      )}

      {!hasMore && items.length > 0 && (
        <p className="load-more-end">모든 항목을 불러왔습니다.</p>
      )}
    </div>
  );
};

// ===== 무한 스크롤 패턴 =====
const LoadMoreInfinite = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const handleLoadMore = async (): Promise<void> => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const response = await fetch(\`/api/items?page=\${page + 1}&limit=10\`);
      const data = await response.json();

      if (data.items.length === 0) {
        setHasMore(false);
      } else {
        setItems((prev) => [...prev, ...data.items]);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("데이터 로드 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          handleLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [hasMore, isLoading]);

  return (
    <div className="layout-list">
      {items.map((item) => (
        <div key={item.id} className="layout-item">
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      ))}

      {isLoading && (
        <div className="load-more-loading" style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
          <Loading size={32} thickness={4} label="불러오는 중..." />
        </div>
      )}

      {hasMore && !isLoading && <div ref={loadMoreRef} style={{ height: "20px" }} />}

      {!hasMore && items.length > 0 && (
        <p className="load-more-end">모든 항목을 불러왔습니다.</p>
      )}
    </div>
  );
};

// ===== 무한 스크롤 패턴 =====
// Intersection Observer를 사용하여 자동으로 더보기:
const loadMoreRef = useRef(null);

useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && hasMore && !isLoading) {
        handleLoadMore();
      }
    },
    { threshold: 0.1 }
  );

  if (loadMoreRef.current) {
    observer.observe(loadMoreRef.current);
  }

  return () => {
    if (loadMoreRef.current) {
      observer.unobserve(loadMoreRef.current);
    }
  };
}, [hasMore, isLoading]);

// 트리거 요소
<div ref={loadMoreRef} style={{ height: "20px" }} />

// ===== 성능 최적화 =====
// React.memo를 사용하여 불필요한 리렌더링 방지:
const Item = React.memo(({ item }) => (
  <div className="layout-item">
    <h3>{item.title}</h3>
    <p>{item.description}</p>
  </div>
));

// ===== 접근성 =====
// - 더보기 버튼에 aria-label 제공
// - 로딩 상태를 스크린 리더에 알림 (aria-live)
// - 키보드 접근성 지원 (Enter 키로 클릭 가능)

// ===== 주의사항 =====
// 1. visibleItems는 totalItems를 초과하지 않도록 제한해야 합니다.
// 2. 비동기 로드 시 로딩 상태와 에러 처리를 구현해야 합니다.
// 3. 무한 스크롤 사용 시 메모리 누수를 방지하기 위해 오래된 아이템을 제거하는 전략을 고려해야 합니다.
// 4. 더보기 버튼은 남은 아이템이 있을 때만 표시해야 합니다.
// 5. 로딩 중에는 버튼을 비활성화하거나 로딩 인디케이터를 표시해야 합니다.
// 6. 페이지 새로고침 시 초기 상태로 리셋되어야 합니다.
// 7. 아이템이 많을 경우 가상화(virtualization)를 고려해야 합니다.
// 8. 모바일 환경에서는 무한 스크롤이 더 자연스러울 수 있습니다.
// 9. SEO를 고려해야 하는 경우 서버 사이드 렌더링을 사용해야 합니다.
// 10. 데이터가 변경될 때 visibleItems를 적절히 조정해야 합니다.`,
    PreviewComponent: LoadMorePreview,
  },
  {
    id: "icon",
    label: "아이콘",
    title: "Icon 컴포넌트",
    description:
      "일관된 아이콘 시스템을 제공하는 컴포넌트입니다. 이모지, SVG, 텍스트 등 다양한 형태의 아이콘을 지원하며, 크기와 색상 옵션을 제공합니다. 클릭 가능한 아이콘 버튼으로도 사용할 수 있으며, 접근성을 고려한 aria-label을 자동으로 설정합니다.",
    code: `import Icon from "./Icon";
import type { MouseEventHandler } from "react";

type IconSize = "small" | "medium" | "large" | "xlarge";
type IconColor = "default" | "muted" | "accent" | "success" | "warning" | "error" | "info";

const handleFavorite = () => {
  console.log("즐겨찾기 클릭");
};

<Icon name="알림">🔔</Icon>;
<Icon name="성공" color="success" size="large">✓</Icon>;
<Icon name="즐겨찾기" color="accent" clickable onClick={handleFavorite}>
  ⭐
</Icon>;
<Icon name="검색">
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16z" stroke="currentColor" />
    <path d="m19 19-4.35-4.35" stroke="currentColor" strokeLinecap="round" />
  </svg>
</Icon>;`,
    PreviewComponent: IconPreview,
  },
  {
    id: "toggle",
    label: "토글",
    title: "토글 스위치",
    description:
      "접근성을 고려한 role=\"switch\" 기반 토글입니다. 라벨과 설명을 함께 제공하고, 상태 변화는 onChange 이벤트로 전달합니다.",
    code: `import Toggle from "./Toggle";
import { useState } from "react";

type ToggleKeys = "wifi" | "push" | "marketing";
type ToggleState = Record<ToggleKeys, boolean>;

// 기본 사용
<Toggle
  label="푸시 알림"
  description="중요 공지와 업데이트 소식을 받아봅니다."
  defaultOn={false}
  onChange={(next: boolean) => console.log("토글 상태:", next)}
/>;

// 여러 토글 관리
const SettingsPage = () => {
  const [settings, setSettings] = useState<ToggleState>({
    wifi: true,
    push: false,
    marketing: false,
  });

  const handleToggle = (key: ToggleKeys, next: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: next }));
  };

  return (
    <>
      <Toggle
        label="Wi-Fi 자동 연결"
        defaultOn={settings.wifi}
        onChange={(next) => handleToggle("wifi", next)}
      />
      <Toggle
        label="푸시 알림"
        defaultOn={settings.push}
        onChange={(next) => handleToggle("push", next)}
      />
      <Toggle
        label="마케팅 수신 동의"
        defaultOn={settings.marketing}
        onChange={(next) => handleToggle("marketing", next)}
      />
    </>
  );
};

// 접근성: 내부에서 role="switch", aria-checked를 처리합니다.`,
    PreviewComponent: TogglePreview,
  },
  {
    id: "input",
    label: "인풋",
    title: "Input 컴포넌트",
    description:
      "Text, Password, Number 등 다양한 타입을 지원하는 입력 필드입니다. error/success 상태, clear 버튼, 비밀번호 보기/숨기기 기능을 포함합니다. Controlled/Uncontrolled 모드를 모두 지원하며, onChange 핸들러는 (event, newValue) 형태로 호출됩니다.",
    code: `import Input from "./Input";
import { useState, type ChangeEvent } from "react";

type InputType = "text" | "password" | "number" | "email" | "tel";

// Controlled
const [value, setValue] = useState("");
<Input
  type="text"
  label="이름"
  placeholder="이름을 입력하세요"
  value={value}
  onChange={(_e: ChangeEvent<HTMLInputElement>, next: string) => setValue(next)}
  showClearButton
/>;

// Password
const [password, setPassword] = useState("");
<Input
  type="password"
  label="비밀번호"
  value={password}
  onChange={(_e, next) => setPassword(next)}
/>;

// Number
const [quantity, setQuantity] = useState("0");
<Input
  type="number"
  label="수량"
  value={quantity}
  onChange={(_e, next) => setQuantity(next)}
/>;

// Error/Success
<Input
  label="이메일"
  type="email"
  value={email}
  error="올바른 이메일 형식이 아닙니다"
  onChange={(_e, next) => setEmail(next)}
/>;

<Input
  label="사용자명"
  value={username}
  success="사용 가능한 사용자명입니다"
  onChange={(_e, next) => setUsername(next)}
/>;`,
    PreviewComponent: InputPreview,
  },
  {
    id: "select",
    label: "셀렉트",
    title: "Select 컴포넌트",
    description:
      "기본 HTML select 요소를 스타일링한 셀렉트 컴포넌트입니다. label, error 메시지, help 텍스트를 포함합니다. options 배열은 { value, label } 형태의 객체 배열이어야 합니다.",
    code: `import Select from "./Select";
import { useState, type ChangeEvent } from "react";

type Option = { value: string; label: string };

const options: Option[] = [
  { value: "opt1", label: "옵션 1" },
  { value: "opt2", label: "옵션 2" },
  { value: "opt3", label: "옵션 3" },
];

const [selected, setSelected] = useState("");

<Select
  label="카테고리"
  options={options}
  value={selected}
  onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelected(e.target.value)}
  placeholder="선택하세요"
/>;

<Select
  label="지역"
  options={options}
  value={selected}
  error="지역을 선택해주세요"
  onChange={(e) => setSelected(e.target.value)}
/>;

<Select
  label="배송 방법"
  options={options}
  value={selected}
  help="배송 방법을 선택해주세요"
  onChange={(e) => setSelected(e.target.value)}
/>;

<Select
  label="비활성화"
  options={options}
  value="opt1"
  disabled
/>;

<Select label="Small" options={options} size="small" />;
<Select label="Medium" options={options} size="medium" />;
<Select label="Large" options={options} size="large" />;`,
    PreviewComponent: SelectPreview,
  },
  {
    id: "checkbox",
    label: "체크박스",
    title: "Checkbox 컴포넌트",
    description:
      "단일 체크박스와 그룹 체크박스를 지원합니다. disabled, checked 상태를 포함하며, CheckboxGroup으로 여러 옵션을 관리할 수 있습니다. 그룹 사용 시 onChange 핸들러는 업데이트된 options 배열을 반환합니다.",
    code: `import Checkbox, { CheckboxGroup, type CheckboxOption } from "./Checkbox";
import { useState } from "react";
import type { ChangeEvent } from "react";

type CheckboxOption = {
  value: string;
  label: string;
  checked?: boolean;
  disabled?: boolean;
};

// 단일 체크박스
const [checked, setChecked] = useState<boolean>(false);

const handleSingleChange = (e: ChangeEvent<HTMLInputElement>): void => {
  setChecked(e.target.checked);
};

<Checkbox
  label="약관에 동의합니다"
  name="agreement"
  value="agree"
  checked={checked}
  onChange={handleSingleChange}
/>;

// 체크박스 그룹
const [options, setOptions] = useState<CheckboxOption[]>([
  { value: "opt1", label: "옵션 1", checked: false },
  { value: "opt2", label: "옵션 2", checked: true },
  { value: "opt3", label: "옵션 3", checked: false, disabled: true },
]);

const handleGroupChange = (
  _e: ChangeEvent<HTMLInputElement>,
  updated: CheckboxOption[]
): void => {
  setOptions(updated);
};

<CheckboxGroup
  label="관심사 선택"
  name="interests"
  options={options}
  onChange={handleGroupChange}
/>;

// 전체 선택 기능 포함
<CheckboxGroup
  label="관심사 선택 (전체 선택)"
  name="interests-with-select-all"
  options={options}
  onChange={handleGroupChange}
  showSelectAll={true}
  selectAllLabel="전체 선택"
/>;

// 상태 관리 예제
const FormExample = () => {
  const [agreed, setAgreed] = useState<boolean>(false);
  const [interests, setInterests] = useState<CheckboxOption[]>([
    { value: "sports", label: "스포츠", checked: false },
    { value: "music", label: "음악", checked: false },
    { value: "travel", label: "여행", checked: false },
  ]);

  const handleAgreementChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setAgreed(e.target.checked);
  };

  const handleInterestsChange = (
    _e: ChangeEvent<HTMLInputElement>,
    updated: CheckboxOption[]
  ): void => {
    setInterests(updated);
  };

  const getSelectedValues = (): string[] => {
    return interests.filter((opt) => opt.checked).map((opt) => opt.value);
  };

  return (
    <div>
      <Checkbox
        label="이용약관에 동의합니다"
        name="agreement"
        value="agree"
        checked={agreed}
        onChange={handleAgreementChange}
      />
      <CheckboxGroup
        label="관심사 선택 (복수 선택 가능)"
        name="interests"
        options={interests}
        onChange={handleInterestsChange}
      />
      <p>선택된 관심사: {getSelectedValues().join(", ")}</p>
    </div>
  );
};`,
    PreviewComponent: CheckboxPreview,
  },
  {
    id: "radio",
    label: "라디오",
    title: "Radio 컴포넌트",
    description:
      "단일 라디오 버튼과 그룹 라디오 버튼을 지원합니다. disabled, checked 상태를 포함하며, RadioGroup으로 여러 옵션 중 하나를 선택할 수 있습니다. 같은 name을 가진 라디오 버튼들은 자동으로 그룹화되어 하나만 선택됩니다.",
    code: `import Radio, { RadioGroup } from "./Radio";
import { useState, type ChangeEvent } from "react";

type RadioOption = { value: string; label: string; disabled?: boolean };

// 단일
const [selected, setSelected] = useState("opt1");

<Radio
  name="option"
  value="opt1"
  label="옵션 1"
  checked={selected === "opt1"}
  onChange={(e: ChangeEvent<HTMLInputElement>) => setSelected(e.target.value)}
/>;

// 그룹
const paymentOptions: RadioOption[] = [
  { value: "card", label: "신용카드" },
  { value: "bank", label: "계좌이체" },
  { value: "cash", label: "현금", disabled: true },
];

const [paymentMethod, setPaymentMethod] = useState("card");

<RadioGroup
  label="결제 방법"
  name="payment"
  options={paymentOptions}
  selectedValue={paymentMethod}
  onChange={(_e, value) => setPaymentMethod(value)}
/>;
`,
    PreviewComponent: RadioPreview,
  },
  {
    id: "textarea",
    label: "텍스트에어리어",
    title: "Textarea 컴포넌트",
    description:
      "여러 줄 텍스트 입력을 위한 텍스트에어리어 컴포넌트입니다. maxByte와 showByteCounter 옵션으로 바이트 카운터를 표시하고 입력을 제한할 수 있습니다. 바이트 제한을 초과하면 에러 상태로 표시됩니다.",
    code: `import Textarea from "./Textarea";
import { useState, useMemo } from "react";
import type { ChangeEvent } from "react";

// 바이트 계산 함수
const getByteLength = (str: string): number => {
  let byteLength = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charAt(i);
    // 한글, 한자 등은 2바이트, 영문/숫자는 1바이트
    if (char.match(/[가-힣ㄱ-ㅎㅏ-ㅣ一-龯]/)) {
      byteLength += 2;
    } else {
      byteLength += 1;
    }
  }
  return byteLength;
};

// 바이트 카운터 기본 사용
const [detail, setDetail] = useState<string>("");

const handleDetailChange = (
  _e: ChangeEvent<HTMLTextAreaElement>,
  next: string
): void => {
  setDetail(next);
};

<Textarea
  label="보다 자세한 상황 파악을 위해 상세내용을 입력해 주세요."
  placeholder="상세 내용을 입력하세요"
  value={detail}
  onChange={handleDetailChange}
  rows={8}
  maxByte={1000}
  showByteCounter={true}
/>;

// 바이트 카운터 에러 상태 예제
const ByteCounterWithError = () => {
  const [content, setContent] = useState<string>("");
  const maxByte = 1000;

  const currentByteLength = useMemo(() => {
    return getByteLength(content);
  }, [content]);

  const isExceeded = currentByteLength > maxByte;

  const handleChange = (
    _e: ChangeEvent<HTMLTextAreaElement>,
    value: string
  ): void => {
    setContent(value);
  };

  return (
    <Textarea
      label="보다 자세한 상황 파악을 위해 상세내용을 입력해 주세요."
      placeholder="상세 내용을 입력하세요 (1000바이트 초과 시 에러)"
      value={content}
      onChange={handleChange}
      rows={8}
      maxByte={maxByte}
      showByteCounter={true}
      error={isExceeded ? \`최대 \${maxByte}바이트까지 입력 가능합니다. (현재: \${currentByteLength}바이트)\` : undefined}
    />
  );
};`,
    PreviewComponent: TextareaPreview,
  },
  {
    id: "card",
    label: "카드",
    title: "Card 컴포넌트",
    description:
      "상품 카드와 콘텐츠 카드를 지원하는 카드 컴포넌트입니다. 이미지, 제목, 설명, 가격, 뱃지 등을 포함할 수 있으며, hover 효과와 클릭 기능을 지원합니다. Image 컴포넌트를 사용하여 자동으로 비율을 판단하고 적절한 크기로 표시합니다.",
    code: `import Card from "./Card";
import Badge from "./Badge";

type CardVariant = "product" | "content";

<Card
  variant="product"
  image="https://example.com/image.jpg"
  title="아메리카노"
  description="진한 에스프레소에 뜨거운 물을 부어 만든 커피"
  price="4,500원"
  badge="NEW"
  hoverable
  onClick={() => console.log("상품 클릭")}
/>;

<Card
  variant="content"
  image="https://example.com/image.jpg"
  title="카드 제목"
  description="카드 설명 텍스트입니다. 여러 줄로 표시될 수 있습니다."
  hoverable
  onClick={() => console.log("카드 클릭")}
/>;

<Card
  variant="content"
  title="이미지 없는 카드"
  description="이미지 없이 텍스트만 표시할 수 있습니다."
/>;
`,
    PreviewComponent: CardPreview,
  },
  {
    id: "list",
    label: "리스트",
    title: "List / ListItem 컴포넌트",
    description:
      "텍스트 리스트와 아이콘 리스트를 지원하는 리스트 컴포넌트입니다. 클릭 가능한 항목, 비활성화, prefix/suffix, 구분선 등을 지원합니다.",
    code: `import List, { ListItem } from "./List";

type ListItemData = {
  id: number | string;
  content?: string;
  icon?: string;
  prefix?: string;
  suffix?: string;
  onClick?: () => void;
  disabled?: boolean;
};

const textItems: ListItemData[] = [
  { id: 1, content: "첫 번째 항목" },
  { id: 2, content: "두 번째 항목" },
];

const iconItems: ListItemData[] = [
  { id: 1, content: "홈", icon: "🏠" },
  { id: 2, content: "검색", icon: "🔍" },
];

const clickableItems: ListItemData[] = [
  { id: 1, content: "항목 1", onClick: () => console.log("항목 1 클릭") },
  { id: 2, content: "항목 2", onClick: () => console.log("항목 2 클릭") },
  { id: 3, content: "비활성화", disabled: true },
];

<List items={textItems} variant="text" bordered />;
<List items={iconItems} variant="icon" bordered />;
<List items={textItems} variant="text" bordered divided />;
<List items={clickableItems} variant="text" bordered />;

<List variant="text" bordered>
  <ListItem icon="⭐" prefix="1.">첫 번째</ListItem>
  <ListItem icon="⭐" prefix="2." suffix="완료">두 번째</ListItem>
  <ListItem icon="⭐" prefix="3." onClick={() => console.log("클릭")}>세 번째</ListItem>
</List>;
`,
    PreviewComponent: ListPreview,
  },
  {
    id: "list-container",
    label: "리스트 컨테이너",
    title: "ListContainer 컴포넌트",
    description:
      "section/article 태그를 사용하는 리스트 컨테이너 컴포넌트입니다. 제목, 설명, 테두리, 구분선 등의 옵션을 제공합니다.",
    code: `import ListContainer from "./ListContainer";
import Card from "./Card";
import Typography from "./Typography";

type ListContainerTag = "section" | "article";

<ListContainer
  tag="section"
  title="음료 메뉴"
  description="다양한 음료를 선택하실 수 있습니다."
  bordered
>
  <Card variant="product" title="아메리카노" price="4,500원" />
  <Card variant="product" title="카페라떼" price="5,000원" />
</ListContainer>;

<ListContainer
  tag="article"
  title="공지사항"
  description="최신 공지사항을 확인하세요."
  bordered
  divided
>
  <div>
    <Typography variant="h6" size="small">시스템 점검 안내</Typography>
    <Typography variant="body" size="small" color="muted">
      2024년 1월 15일 시스템 점검이 예정되어 있습니다.
    </Typography>
  </div>
</ListContainer>;

// props
// tag?: ListContainerTag;
// title?: string;
// description?: string;
// bordered?: boolean;
// divided?: boolean;`,
    PreviewComponent: ListContainerPreview,
  },
  {
    id: "form",
    label: "폼",
    title: "폼 컴포넌트",
    description:
      "레이블·플레이스홀더·보조텍스트와 함께 간단한 유효성 검사를 포함한 폼입니다. 이름, 휴대폰, 주소, 이메일, 비밀번호를 검증합니다.",
    code: `import { useState, type ChangeEvent, type FormEvent } from "react";
import Input from "./Input";
import Button from "./Button";

type FormState = {
  name: string;
  phone: string;
  address: string;
  email: string;
  password: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

function Form() {
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    address: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [message, setMessage] = useState("");

  const handleChange =
    (field: keyof FormState) => (_e: ChangeEvent<HTMLInputElement>, value: string) => {
      setForm((prev) => ({ ...prev, [field]: value }));
      setMessage("");
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: "" }));
      }
    };

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (!form.name.trim()) next.name = "이름을 입력해주세요.";
    if (!/^01[0-9]-?\\d{3,4}-?\\d{4}$/.test(form.phone)) {
      next.phone = "휴대폰 번호를 010-1234-5678 형식으로 입력해주세요.";
    }
    if (!form.address.trim()) next.address = "주소를 입력해주세요.";
    if (!/\\S+@\\S+\\.\\S+/.test(form.email)) {
      next.email = "유효한 이메일을 입력해주세요.";
    }
    if (form.password.length < 8) {
      next.password = "비밀번호는 8자 이상이어야 합니다.";
    }
    return next;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setMessage("유효성 검사가 완료되었습니다!");
    }
  };

  return (
<form onSubmit={handleSubmit} className="form">
  <Input
    label="이름"
    type="text"
    placeholder="홍길동"
    value={form.name}
    onChange={handleChange("name")}
    error={errors.name}
    help={!errors.name ? "본인 확인이 가능한 이름을 입력하세요." : undefined}
    showClearButton
  />
  <Input
    label="휴대폰 번호"
    type="tel"
    placeholder="010-1234-5678"
    value={form.phone}
    onChange={handleChange("phone")}
    error={errors.phone}
    help={!errors.phone ? "숫자만 입력해도 자동으로 처리됩니다." : undefined}
    showClearButton
  />
  <Input
    label="주소"
    type="text"
    placeholder="도로명 주소를 입력하세요"
    value={form.address}
    onChange={handleChange("address")}
    error={errors.address}
    help={!errors.address ? "배송 또는 연락 가능한 주소를 입력하세요." : undefined}
    showClearButton
  />
  <Input
    label="이메일"
    type="email"
    placeholder="name@example.com"
    value={form.email}
    onChange={handleChange("email")}
    error={errors.email}
    help={!errors.email ? "가입 시 사용한 이메일을 입력하세요." : undefined}
    showClearButton
  />
  <Input
    label="비밀번호"
    type="password"
    placeholder="8자 이상 입력"
    value={form.password}
    onChange={handleChange("password")}
    error={errors.password}
    help={!errors.password ? "문자, 숫자 조합으로 8자 이상 입력하세요." : undefined}
  />
  <Button type="submit" variant="primary" size="medium">
    유효성 검사
  </Button>
  {message && <p className="form__success">{message}</p>}
</form>
  );
}
`,
    PreviewComponent: Form,
  },
  {
    id: "button",
    label: "버튼",
    title: "Button 컴포넌트",
    description:
      "Primary/Secondary/Ghost 버튼을 제공하는 컴포넌트입니다. Small/Medium/Large 크기를 지원하며, disabled 상태와 아이콘을 포함한 버튼도 사용할 수 있습니다. 접근성을 고려하여 키보드 포커스와 ARIA 속성을 자동으로 처리합니다.",
    code: `import Button from "./Button";
import Icon from "./Icon";
import { type MouseEvent } from "react";

// ===== Props 설명 =====
// children: 버튼 내용
// variant: 'primary' | 'secondary' | 'ghost' (기본값: 'primary')
// size: 'small' | 'medium' | 'large' (기본값: 'medium')
// disabled: 비활성화 여부 (기본값: false)
// type: 'button' | 'submit' | 'reset' (기본값: 'button')
// onClick: 클릭 핸들러
// className: 추가 클래스명
// style: 인라인 스타일

// ===== Variant =====
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>

// ===== Size =====
// Small: 13px, padding 6px 12px, min-height 32px
<Button variant="primary" size="small">Small</Button>

// Medium: 14px, padding 10px 18px, min-height 40px (기본값)
<Button variant="primary" size="medium">Medium</Button>

// Large: 16px, padding 14px 20px, min-height 48px
<Button variant="primary" size="large">Large</Button>

// ===== Disabled =====
<Button variant="primary" disabled>Disabled</Button>
<Button variant="secondary" disabled>Disabled</Button>
<Button variant="ghost" disabled>Disabled</Button>

// ===== 아이콘과 함께 사용 =====
<Button variant="primary" size="medium">
  <Icon name="알림" size="small">🔔</Icon>
  알림
</Button>

<Button variant="secondary" size="medium">
  <Icon name="즐겨찾기" size="small">⭐</Icon>
  즐겨찾기
</Button>

// ===== Submit 버튼 =====
<Button type="submit" variant="primary">
  제출하기
</Button>

// ===== 이벤트 핸들러 =====
<Button
  variant="primary"
  onClick={(e: MouseEvent<HTMLButtonElement>) => console.log("클릭됨", e.currentTarget)}
>
  클릭
</Button>;

// ===== 주의사항 =====
// 1. variant에 따라 배경색, 테두리, 텍스트 색상이 자동으로 설정됨
// 2. disabled 상태에서는 모든 인터랙션이 비활성화됨
// 3. hover/active 상태에서 자동으로 애니메이션 효과 적용
// 4. focus-visible 상태에서 접근성을 위한 outline 표시
// 5. 아이콘과 텍스트를 함께 사용할 때는 gap이 자동으로 적용됨`,
    PreviewComponent: ButtonPreview,
  },
  {
    id: "border-animation",
    label: "보더 애니메이션",
    title: "BorderAnimation 컴포넌트",
    description:
      "다양한 보더 애니메이션 효과를 제공하는 컴포넌트입니다. 회전하는 그라데이션, 펄스, 그라데이션 등 3가지 애니메이션 타입을 지원합니다. _mixins.scss에 정의된 mixin을 사용하여 구현되었습니다.",
    code: `import BorderAnimation from "./BorderAnimation";
import { type CSSProperties, type ReactNode } from "react";

type BorderAnimationVariant = "rotate" | "pulse" | "gradient";

<BorderAnimation variant="rotate">
  <div>
    <h3>회전 보더</h3>
    <p>그라데이션이 회전하는 보더 애니메이션</p>
  </div>
</BorderAnimation>;

<BorderAnimation variant="pulse">
  <div>
    <h3>펄스 보더</h3>
    <p>맥박처럼 뛰는 펄스 애니메이션</p>
  </div>
</BorderAnimation>;

<BorderAnimation variant="gradient">
  <div>
    <h3>그라데이션 보더</h3>
    <p>위에서 아래로 흐르는 그라데이션</p>
  </div>
</BorderAnimation>;

// ===== Mixin 사용법 =====
// _mixins.scss에 정의된 mixin을 직접 사용할 수도 있습니다:

// 회전하는 그라데이션
@include border-animation-rotate(2px, (#0c7c59, #4ade80, #0c7c59), 3s);

// 펄스 보더
@include border-animation-pulse(2px, #0c7c59, 2s);

// 그라데이션 보더
@include border-animation-gradient(2px, (#0c7c59, #4ade80), 3s);

// ===== Mixin 파라미터 =====
// border-width: 보더 두께 (기본값: 2px)
// colors: 그라데이션 색상 배열 (rotate, gradient용)
// color: 단일 색상 (pulse용)
// duration: 애니메이션 지속 시간 (기본값: 2s 또는 3s)

// ===== 주의사항 =====
// 1. 모든 애니메이션은 무한 반복됩니다 (infinite)
// 2. 보더 애니메이션은 ::before pseudo-element를 사용합니다
// 3. 내부 콘텐츠는 position: relative로 배치됩니다
// 4. 배경색은 var(--color-card)를 사용합니다`,
    PreviewComponent: BorderAnimationPreview,
  },
  {
    id: "toast",
    label: "토스트",
    title: "토스트 알림",
    description:
      "성공/경고/에러 등 상태에 따라 색상이 바뀌는 토스트 알림입니다. 지정된 시간 후 자동으로 사라지며 닫기 버튼을 제공합니다.",
    code: `import Toast from "./Toast";
import { useState, type Dispatch, type SetStateAction } from "react";

type ToastType = "info" | "success" | "warning" | "error";
type ToastState = { message: string; type: ToastType };

// ===== Props 설명 =====
// message: 토스트에 표시할 메시지 (필수, 빈 문자열이면 렌더링 안 함)
// type: 토스트 타입 'info' | 'success' | 'warning' | 'error' (기본값: 'info')
// duration: 자동 닫힘 시간 (밀리초, 기본값: 3000)
// onClose: 토스트 닫기 핸들러 (필수, duration 후 자동 호출 또는 사용자 클릭 시 호출)

// ===== 기본 사용 =====
// 토스트는 상태 관리와 함께 사용됩니다.
const [toast, setToast] = useState<ToastState>({ message: "", type: "info" });

const showToast = (type: ToastType, message: string) => {
  setToast({ message, type });
};

<Toast 
  message={toast.message} 
  type={toast.type} 
  onClose={() => setToast({ message: "", type: "info" })} 
/>;

// ===== Type 옵션 =====
// info: 정보성 메시지 (기본값, 파란색)
<Toast 
  message="정보 메시지입니다." 
  type="info" 
  onClose={() => setToast({ message: "", type: "info" })} 
/>;

// success: 성공 메시지 (초록색)
<Toast 
  message="작업이 완료되었습니다." 
  type="success" 
  onClose={() => setToast({ message: "", type: "info" })} 
/>;

// warning: 경고 메시지 (노란색)
<Toast 
  message="주의가 필요합니다." 
  type="warning" 
  onClose={() => setToast({ message: "", type: "info" })} 
/>;

// error: 에러 메시지 (빨간색)
<Toast 
  message="오류가 발생했습니다." 
  type="error" 
  onClose={() => setToast({ message: "", type: "info" })} 
/>;

// ===== 자동 닫힘 시간 조정 =====
// duration prop으로 자동 닫힘 시간을 조정할 수 있습니다.
<Toast 
  message="5초 후 자동으로 닫힙니다." 
  type="info" 
  duration={5000}
  onClose={() => setToast({ message: "", type: "info" })} 
/>;

// 영구적으로 표시하려면 duration을 매우 큰 값으로 설정
<Toast 
  message="수동으로 닫아야 합니다." 
  type="info" 
  duration={999999}
  onClose={() => setToast({ message: "", type: "info" })} 
/>;

// ===== 수동 닫기 =====
// 사용자가 닫기 버튼(✕)을 클릭하거나 토스트 영역을 클릭하면 즉시 닫힙니다.
// onClose 핸들러가 호출됩니다.

// ===== 내부 동작 =====
// useEffect를 사용하여 message가 변경되면 타이머를 설정합니다.
// duration 시간 후 onClose를 자동으로 호출합니다.
// 컴포넌트 언마운트 시 타이머를 정리합니다 (cleanup).

// ===== 조건부 렌더링 =====
// message가 없거나 빈 문자열이면 null을 반환하여 렌더링하지 않습니다.
// if (!message) return null;

// ===== UI 구조 =====
// toast: 최상위 컨테이너
//   toast--{type}: 타입별 클래스 (info, success, warning, error)
//   toast__dot: 타입별 색상 점 (aria-hidden="true")
//   toast__message: 메시지 텍스트
//   toast__close: 닫기 버튼 (✕)

// ===== 접근성 =====
// - role="status" 제공 (스크린 리더에 상태 변경 알림)
// - aria-live="polite" 제공 (스크린 리더가 우선순위 낮게 읽음)
// - 닫기 버튼에 aria-label="토스트 닫기" 제공
// - 닫기 버튼과 토스트 영역 클릭 시 닫힘

// ===== 토스트 관리 패턴 =====
// 여러 토스트를 관리하려면 배열로 관리:
const [toasts, setToasts] = useState<Array<ToastState & { id: number }>>([]);

const addToast = (type: ToastType, message: string) => {
  const id = Date.now();
  setToasts((prev) => [...prev, { id, type, message }]);
  setTimeout(() => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, 3000);
};

const removeToast = (id: number) => {
  setToasts((prev) => prev.filter((toast) => toast.id !== id));
};

// 렌더링
{toasts.map(toast => (
  <Toast
    key={toast.id}
    message={toast.message}
    type={toast.type}
    onClose={() => removeToast(toast.id)}
  />
))};

// ===== 전역 토스트 관리 =====
// Context API를 사용하여 전역에서 토스트를 관리할 수 있습니다.
type ToastContextValue = { showToast: (type: ToastType, message: string) => void };
const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<ToastState>({ message: "", type: "info" });
  const showToast = (type: ToastType, message: string) => setToast({ message, type });
  
  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast({ message: "", type: "info" })} 
      />
    </ToastContext.Provider>
  );
};

// 사용
const ctx = useContext(ToastContext);
ctx?.showToast("success", "작업 완료!");

// ===== 주의사항 =====
// 1. message가 없으면 토스트가 렌더링되지 않습니다.
// 2. onClose는 필수이며, duration 후 자동으로 호출됩니다.
// 3. 같은 토스트를 연속으로 표시하려면 key를 변경해야 합니다.
// 4. 여러 토스트를 동시에 표시하려면 배열로 관리해야 합니다.
// 5. duration은 밀리초 단위입니다 (3000 = 3초).
// 6. 토스트는 클릭하면 즉시 닫힙니다 (닫기 버튼 또는 토스트 영역).
// 7. useEffect의 cleanup 함수로 타이머를 정리하여 메모리 누수를 방지합니다.
// 8. 접근성을 위해 role="status"와 aria-live="polite"를 제공합니다.
// 9. 토스트는 보통 화면 상단 또는 하단에 고정 위치로 표시됩니다.
// 10. 여러 토스트를 표시할 때는 z-index를 조정하여 겹치지 않도록 해야 합니다.`,
    PreviewComponent: ToastPreview,
  },
  {
    id: "dock",
    label: "하단 내비게이션",
    title: "하단  내비게이션",
    description:
      "모바일 하단 고정형 내비게이션 UI. 아이콘/라벨 목록을 props로 받아 활성 상태를 표시하며 onChange로 선택 값을 전달합니다.",
    code: `import BottomDock from "./BottomDock";
import { useState } from "react";

type BottomDockItem = { key: string; label: string; icon: string };

const items: BottomDockItem[] = [
  { key: "home", label: "홈", icon: "🏠" },
  { key: "search", label: "검색", icon: "🔍" },
  { key: "bookmark", label: "즐겨찾기", icon: "⭐" },
  { key: "profile", label: "내 정보", icon: "👤" },
];

const [activeTab, setActiveTab] = useState<string>("home");

<BottomDock
  items={items}
  defaultActive={activeTab}
  onChange={(key: string) => {
    setActiveTab(key);
    console.log("탭 변경:", key);
  }}
/>;`,
    PreviewComponent: BottomDockPreview,
  },
  {
    id: "datalist",
    label: "데이터 리스트",
    title: "API 데이터 리스트",
    description:
      "목업 API를 통해 데이터를 가져와서 리스트 형태로 표시하는 범용 컴포넌트입니다. 로딩, 에러, 빈 상태를 자동으로 처리합니다.",
    code: `import DataList from "./DataList";
import Card from "./Card";
import List, { ListItem } from "./List";
import { fetchMockSamplePage, fetchMockUrls, fetchMockCarouselSlides, fetchMockDropdownOptions } from "../../mocks/mockData";
import { useState } from "react";

type UrlItem = { id: string | number; depth1: string; depth2: string; url: string };
type CardItem = { id: string | number; title: string; description?: string; desc?: string };
type DropdownItem = { value: string; label: string };

// ===== Props 설명 =====
// fetchData: 데이터를 가져오는 비동기 함수 (Promise 반환, 필수)
// renderItem: 각 아이템을 렌더링하는 함수 (item, index) => ReactNode (필수)
// renderEmpty: 데이터가 없을 때 렌더링하는 함수 (선택, 기본 EmptyState 사용)
// renderError: 에러 발생 시 렌더링하는 함수 (선택, 기본 ErrorState 사용)
// renderLoading: 로딩 중 렌더링하는 함수 (선택, 기본 Loading 사용)
// emptyMessage: 데이터가 없을 때 표시할 메시지 (기본값: "데이터가 없습니다.")
// errorMessage: 에러 발생 시 표시할 메시지 (기본값: "데이터를 불러오지 못했습니다.")
// loadingLabel: 로딩 중 표시할 메시지 (기본값: "데이터를 불러오는 중...")
// className: 추가 클래스명
// containerProps: 컨테이너 div에 전달할 추가 props

// ===== 1. 목업 API 함수 사용하기 =====
// mockData.js에서 제공하는 fetch 함수들을 직접 사용할 수 있습니다.
// 예: fetchMockUrls, fetchMockCarouselSlides, fetchMockSamplePage 등

// 목업 API가 배열을 직접 반환하는 경우
<DataList<UrlItem>
  fetchData={fetchMockUrls}
  renderItem={(item) => (
    <div key={item.id}>
      <h4>{item.depth1} > {item.depth2}</h4>
      <p>{item.url}</p>
    </div>
  )}
/>;

// 목업 API가 객체를 반환하는 경우 (배열 추출 필요)
<DataList<CardItem>
  fetchData={async () => {
    const result = await fetchMockSamplePage();
    return result.cards || [];
  }}
  renderItem={(item) => (
    <Card key={item.id} title={item.title} description={item.desc} />
  )}
/>;

// ===== 2. 실제 API 호출하기 =====
// 실제 REST API를 호출하는 경우
<DataList
  fetchData={async () => {
    const response = await fetch('/api/products');
    if (!response.ok) {
      throw new Error('데이터를 불러오는데 실패했습니다.');
    }
    const data = await response.json();
    // API 응답이 { data: [...] } 형태인 경우
    return data.data || [];
    // 또는 API가 배열을 직접 반환하는 경우
    // return data;
  }}
  renderItem={(item) => (
    <Card key={item.id} title={item.name} description={item.description} />
  )}
/>

// ===== 3. 쿼리 파라미터와 함께 API 호출 =====
const [category, setCategory] = useState<string>("all");

<DataList<CardItem>
  fetchData={async () => {
    const url = category === 'all' 
      ? '/api/products' 
      : \`/api/products?category=\${category}\`;
    const response = await fetch(url);
    const data = await response.json();
    return data.products || [];
  }}
  renderItem={(item) => (
    <Card key={item.id} title={item.name} />
  )}
/>
// category가 변경되면 자동으로 데이터를 다시 가져옵니다.

// ===== 4. POST 요청으로 데이터 가져오기 =====
<DataList
  fetchData={async () => {
    const response = await fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ keyword: '검색어' }),
    });
    const data = await response.json();
    return data.results || [];
  }}
  renderItem={(item) => (
    <div key={item.id}>{item.title}</div>
  )}
/>

// ===== 5. 에러 처리 포함한 fetchData 작성 =====
<DataList
  fetchData={async () => {
    try {
      const response = await fetch('/api/data');
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('데이터 로드 실패:', error);
      throw error; // DataList가 에러 상태를 표시하도록 함
    }
  }}
  renderItem={(item) => (
    <Card key={item.id} title={item.title} />
  )}
  errorMessage="데이터를 불러오는데 실패했습니다. 다시 시도해주세요."
/>

// ===== 6. 데이터 변환 및 필터링 =====
<DataList
  fetchData={async () => {
    const response = await fetch('/api/users');
    const users = await response.json();
    // 데이터 변환: 활성 사용자만 필터링
    return users
      .filter(user => user.isActive)
      .map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
      }));
  }}
  renderItem={(item) => (
    <div key={item.id}>
      <h4>{item.name}</h4>
      <p>{item.email}</p>
    </div>
  )}
/>

// ===== 7. 기본 사용 (간단한 예시) =====
// 목업 API를 직접 사용하는 가장 간단한 방법
<DataList<CardItem>
  fetchData={fetchMockCarouselSlides}
  renderItem={(item) => (
    <Card key={item.id} title={item.title} description={item.description} />
  )}
/>

// ===== 커스텀 로딩 UI =====
<DataList
  fetchData={fetchMockSamplePage}
  renderItem={(item) => <Card title={item.title} />}
  renderLoading={() => (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <Loading size={48} label="커스텀 로딩 메시지" />
    </div>
  )}
/>

// ===== 커스텀 에러 UI =====
<DataList
  fetchData={fetchMockSamplePage}
  renderItem={(item) => <Card title={item.title} />}
  renderError={(error) => (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <ErrorState type="error" message={error} />
    </div>
  )}
/>

// ===== 커스텀 빈 상태 UI =====
<DataList
  fetchData={fetchMockSamplePage}
  renderItem={(item) => <Card title={item.title} />}
  renderEmpty={() => (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <EmptyState message="커스텀 빈 상태 메시지" />
    </div>
  )}
/>

// ===== 리스트 아이템으로 렌더링 =====
<DataList<DropdownItem>
  fetchData={fetchMockDropdownOptions}
  renderItem={(item) => (
    <ListItem key={item.value} icon="📋">
      {item.label}
    </ListItem>
  )}
  className="custom-list"
/>;

// ===== 그리드 레이아웃 =====
<DataList
  fetchData={async () => {
    const result = await fetchMockSamplePage();
    return result.cards || [];
  }}
  renderItem={(item) => (
    <Card key={item.id} title={item.title} description={item.desc} />
  )}
  containerProps={{
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
      gap: "16px",
    },
  }}
/>

// ===== 주의사항 =====
// 1. fetchData는 Promise를 반환하는 함수여야 합니다.
// 2. renderItem 함수는 각 아이템에 대한 ReactNode를 반환해야 합니다.
// 3. 데이터가 배열이 아닌 경우, fetchData 내부에서 배열로 변환해야 합니다.
// 4. 각 아이템은 고유한 key를 가져야 합니다 (item.id, item.key, 또는 index 사용).
// 5. 로딩, 에러, 빈 상태는 자동으로 처리되지만 커스텀 렌더링 함수로 오버라이드할 수 있습니다.
// 6. fetchData가 변경되면 자동으로 데이터를 다시 가져옵니다.`,
    PreviewComponent: DataListPreview,
  },
  {
    id: "listsync",
    label: "리스트 동기화",
    title: "선택 리스트 연동",
    description:
      "좌측 버튼 리스트를 클릭하면 우측 리스트에 li로 추가되고, 삭제 버튼을 누르면 선택 목록에서 제거됩니다. onChange로 최신 선택 배열을 전달합니다.",
    code: `import ListSync from "./ListSync";
import { useState, type Dispatch, type SetStateAction } from "react";

type ListSyncOption = { value: string; label: string };

// ===== Props 설명 =====
// options: 선택 가능한 옵션 배열 [{ value, label }] (기본값: defaultOptions)
// onChange: 선택된 항목 변경 핸들러 (선택된 배열을 인자로 받음, 선택)

// ===== 기본 사용 =====
// ListSync는 두 개의 영역으로 구성됩니다:
// 1. 소스 영역: 추가할 수 있는 옵션들 (왼쪽)
// 2. 타겟 영역: 선택된 항목들 (오른쪽)
const options: ListSyncOption[] = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue.js" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
];

const [selected, setSelected] = useState<ListSyncOption[]>([]);

<ListSync 
  options={options} 
  onChange={(selectedItems: ListSyncOption[]) => {
    setSelected(selectedItems);
    console.log("선택된 항목:", selectedItems);
  }} 
/>

// ===== 선택된 항목 추적 =====
// onChange 핸들러를 통해 선택된 항목을 외부에서 관리할 수 있습니다.
const [selectedItems, setSelectedItems] = useState<ListSyncOption[]>([]);

const handleChange = (items: ListSyncOption[]) => {
  setSelectedItems(items);
  // 선택된 항목을 서버에 저장하거나 다른 로직 실행
  saveSelectedItems(items);
};

<ListSync options={options} onChange={handleChange} />

// ===== 중복 방지 =====
// 컴포넌트 내부에서 자동으로 중복을 방지합니다.
// handleAdd 함수에서 items.some()을 사용하여 value 기준으로 중복 체크:
// if (items.some((item) => item.value === option.value)) return;

// 같은 value를 가진 옵션은 한 번만 추가됩니다.

// ===== 항목 추가 =====
// 소스 영역의 옵션 버튼을 클릭하면 타겟 영역에 추가됩니다.
// handleAdd 함수가 호출되며:
// 1. 중복 체크
// 2. items 배열에 추가
// 3. onChange 호출 (제공된 경우)

// ===== 항목 삭제 =====
// 타겟 영역의 각 항목 옆에 "삭제" 버튼이 있습니다.
// handleRemove 함수가 호출되며:
// 1. 해당 인덱스의 항목을 필터링하여 제거
// 2. onChange 호출 (제공된 경우)

// ===== 빈 상태 =====
// 선택된 항목이 없을 때 "아직 선택된 항목이 없습니다." 메시지가 표시됩니다.
{items.length === 0 && (
  <p className="list-sync__empty">아직 선택된 항목이 없습니다.</p>
)}

// ===== 선택된 항목 개수 표시 =====
// 타겟 영역의 헤더에 선택된 항목 개수가 표시됩니다.
<div className="list-sync__target-head">
  <span>선택된 항목</span>
  <span className="list-sync__count">{items.length}개</span>
</div>

// ===== 내부 상태 관리 =====
// 컴포넌트 내부에서 items 상태를 관리합니다:
// const [items, setItems] = useState([]);
//
// onChange prop이 제공되면 외부에서도 선택된 항목을 추적할 수 있습니다.

// ===== UI 구조 =====
// list-sync: 최상위 컨테이너
//   list-sync__source: 소스 영역 (추가할 옵션들)
//     list-sync__option: 각 옵션 버튼
//   list-sync__target: 타겟 영역 (선택된 항목들)
//     list-sync__target-head: 헤더 (제목 + 개수)
//     list-sync__empty: 빈 상태 메시지
//     list-sync__list: 선택된 항목 리스트
//       list-sync__remove: 삭제 버튼

// ===== 접근성 =====
// - 소스 영역에 aria-label="추가할 항목 선택" 제공
// - 삭제 버튼에 aria-label="{항목명} 삭제" 제공
// - 키보드 접근성 지원 (버튼은 Enter/Space로 클릭 가능)

// ===== 비동기 옵션 로드 =====
// API에서 옵션을 로드하는 경우:
const [options, setOptions] = useState([]);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  fetchOptions()
    .then(setOptions)
    .catch(console.error)
    .finally(() => setIsLoading(false));
}, []);

{isLoading ? (
  <Loading />
) : (
  <ListSync options={options} onChange={setSelected} />
)}

// ===== 주의사항 =====
// 1. options 배열의 각 항목은 { value, label } 구조를 가져야 합니다.
// 2. value는 고유해야 하며, 중복된 value는 한 번만 추가됩니다.
// 3. onChange는 선택 사항이지만, 외부에서 선택된 항목을 추적하려면 제공해야 합니다.
// 4. 컴포넌트 내부 상태와 외부 상태를 동기화하려면 onChange를 사용해야 합니다.
// 5. 옵션이 많을 경우 소스 영역의 스크롤을 고려해야 합니다.
// 6. 선택된 항목이 많을 경우 타겟 영역의 스크롤을 고려해야 합니다.
// 7. 삭제 버튼은 각 항목의 우측에 위치합니다.
// 8. 빈 상태 메시지는 선택된 항목이 없을 때만 표시됩니다.
// 9. 항목 개수는 실시간으로 업데이트됩니다.
// 10. 옵션 배열이 변경되면 내부 상태는 자동으로 업데이트되지 않습니다 (외부에서 관리 필요).`,
    PreviewComponent: ListSyncPreview,
  },
  {
    id: "table",
    label: "테이블",
    title: "테이블 컴포넌트",
    description: "가로 스크롤, 세로 스크롤, 헤더 & 열 고정 등 다양한 스크롤 타입을 지원하는 테이블 컴포넌트입니다.",
    code: `import Table from "./Table";

type TableRow = {
  id: number;
  title: string;
  date?: string;
  attachment?: string;
  views?: number;
  ratio?: string;
  status?: string;
  category?: string;
  owner?: string;
  deadline?: string;
  note?: string;
};

// ===== Props 설명 =====
// scrollType: 'horizontal' | 'vertical' | 'both' (기본값: 'horizontal')
// headers: 테이블 헤더 배열
// rows: 테이블 데이터 배열

// ===== 타입 1: 가로 스크롤 · 열 고정 테이블 =====
// 가로 스크롤만 가능, 첫 번째 열 고정, 헤더 고정 없음
<Table<TableRow>
  scrollType="horizontal"
  headers={["번호", "제목", "등록일", "첨부", "조회수", "경쟁률", "상태", "분류", "담당자", "마감일", "비고"]}
  rows={[
    { id: 1, title: "데이터 분석가 채용", date: "2025-01-07", attachment: "jd.pdf", views: 3210, ratio: "15:1", status: "진행중", category: "채용", owner: "홍길동", deadline: "2025-02-01", note: "온라인 면접" }
  ]}
/>

/* 스타일 */
.table__table-wrapper--scroll-horizontal {
  overflow-x: auto;
  overflow-y: hidden;
}
.table__table--freeze .is-sticky--first {
  position: sticky;
  left: 0;
  z-index: 8;
}

// ===== 타입 2: 세로 스크롤 · 헤더 고정 테이블 =====
// 세로 스크롤만 가능, 헤더 고정, 열 고정 없음, max-height: 400px
<Table<TableRow>
  scrollType="vertical"
  headers={["번호", "제목", "등록일", "조회수", "상태"]}
  rows={[
    { id: 1, title: "공지사항 제목 1", date: "2025-01-15", views: 1250, status: "공개" }
  ]}
/>

/* 스타일 */
.table__table-wrapper--scroll-vertical {
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 400px;
}
.table__table-wrapper--scroll-vertical .table__table thead {
  position: sticky;
  top: 0;
  z-index: 20;
}

// ===== 타입 3: 가로·세로 스크롤 · 헤더 & 열 고정 테이블 =====
// 가로·세로 스크롤 모두 가능, 헤더와 첫 번째 열 모두 고정, max-height: 400px
<Table 
  scrollType="both"
  headers={["번호", "제목", "등록일", "첨부", "조회수", "경쟁률", "상태", "분류", "담당자", "마감일", "비고"]}
  rows={[
    { id: 1, title: "데이터 분석가 채용", date: "2025-01-07", attachment: "jd.pdf", views: 3210, ratio: "15:1", status: "진행중", category: "채용", owner: "홍길동", deadline: "2025-02-01", note: "온라인 면접" }
  ]}
/>

/* 스타일 */
.table__table-wrapper--scroll-both {
  overflow-x: auto;
  overflow-y: auto;
  max-height: 400px;
}
.table__table-wrapper--scroll-both .table__table thead {
  position: sticky;
  top: 0;
  z-index: 20;
}
.table__table--freeze .is-sticky--first {
  position: sticky;
  left: 0;
  z-index: 8;
}
.table__table-wrapper--scroll-both .table__table--freeze thead th.is-sticky--first {
  z-index: 25; // 헤더와 열이 모두 고정된 경우 가장 위에
}

// ===== 타입별 차이점 =====
// horizontal: 가로 스크롤만, 헤더 고정 없음, 높이 제한 없음
// vertical: 세로 스크롤만, 헤더 고정, 열 고정 없음, max-height: 400px
// both: 가로·세로 스크롤 모두, 헤더와 열 모두 고정, max-height: 400px`,
    PreviewComponent: TablePreview,
  },
  {
    id: "popup",
    label: "팝업",
    title: "팝업 UI",
    description:
      "Basic 중앙 팝업, 바텀시트(드래그로 닫기), 풀스크린 팝업을 제공합니다.",
    code: `import { BasicPopup, BottomSheetPopup, FullscreenPopup } from "./Popup";
import Button from "./Button";
import { useState } from "react";

type PopupAction = { label: string; variant?: "primary" | "ghost" | "secondary"; onClick: () => void };

const [isBasicOpen, setIsBasicOpen] = useState<boolean>(false);
const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
const [isFullOpen, setIsFullOpen] = useState<boolean>(false);

<BasicPopup
  open={isBasicOpen}
  onClose={() => setIsBasicOpen(false)}
  icon="🔒"
  title="알림"
  description="이 작업을 계속하시겠습니까?"
  actions={[
    { label: "취소", variant: "ghost", onClick: () => setIsBasicOpen(false) },
    { label: "확인", variant: "primary", onClick: () => setIsBasicOpen(false) },
  ] satisfies PopupAction[]}
/>;

<BasicPopup
  open={isBasicOpen}
  onClose={() => setIsBasicOpen(false)}
  title="알림"
  description="작업이 완료되었습니다."
  actions={[
    { label: "확인", variant: "primary", onClick: () => setIsBasicOpen(false) },
  ] satisfies PopupAction[]}
/>;

<BottomSheetPopup
  open={isSheetOpen}
  onClose={() => setIsSheetOpen(false)}
  title="옵션 선택"
  description="원하는 옵션을 선택하세요."
/>;

// ===== BottomSheetPopup 드래그 기능 =====
// 바텀시트는 드래그하여 닫을 수 있습니다.
// - 드래그 시작: onMouseDown 또는 onTouchStart
// - 드래그 중: onMouseMove 또는 onTouchMove (최대 240px 이동)
// - 드래그 종료: onMouseUp 또는 onTouchEnd
// - 임계값(THRESHOLD): 120px 이상 드래그하면 팝업 닫기
//
// 내부 상태 관리:
// - offset: 드래그 오프셋 (0 ~ 240px)
// - startY: 드래그 시작 Y 좌표
//
// 드래그 종료 시:
// if (offset > THRESHOLD) {
//   onClose?.();
// }

// ===== FullscreenPopup 사용 =====
// 전체 화면을 덮는 풀스크린 팝업입니다.
// 세 가지 타입을 제공합니다:
// 1. 상단 X 버튼만 있는 타입 (기본)
// 2. 하단 닫기 버튼만 있는 타입
// 3. 상단 X 버튼과 하단 닫기 버튼 둘 다 있는 타입

const [isFullOpen, setIsFullOpen] = useState(false);

// 타입 1: 상단 X 버튼만 있는 타입 (기본)
<FullscreenPopup
  open={isFullOpen}
  onClose={() => setIsFullOpen(false)}
  title="상세 정보"
  body={
    <div>
      <p>풀스크린 팝업 내용입니다.</p>
      <p>자유롭게 콘텐츠를 구성할 수 있습니다.</p>
      <p>상단 헤더에 X 버튼만 있습니다.</p>
    </div>
  }
  showHeaderClose={true}   // 기본값이므로 생략 가능
  showBottomClose={false}  // 기본값이므로 생략 가능
/>

// 타입 2: 하단 닫기 버튼만 있는 타입
<FullscreenPopup
  open={isFullOpen}
  onClose={() => setIsFullOpen(false)}
  title="상세 정보"
  body={
    <div>
      <p>풀스크린 팝업 내용입니다.</p>
      <p>자유롭게 콘텐츠를 구성할 수 있습니다.</p>
      <p>상단 X 버튼이 없고 하단 닫기 버튼만 있습니다.</p>
    </div>
  }
  showHeaderClose={false}  // X 버튼 숨김
  showBottomClose={true}    // 하단 닫기 버튼 표시
/>

// 타입 3: 상단 X 버튼과 하단 닫기 버튼 둘 다 있는 타입
<FullscreenPopup
  open={isFullOpen}
  onClose={() => setIsFullOpen(false)}
  title="상세 정보"
  body={
    <div>
      <p>풀스크린 팝업 내용입니다.</p>
      <p>자유롭게 콘텐츠를 구성할 수 있습니다.</p>
      <p>상단 X 버튼과 하단 닫기 버튼을 모두 제공합니다.</p>
    </div>
  }
  showHeaderClose={true}   // X 버튼 표시
  showBottomClose={true}   // 하단 닫기 버튼 표시
/>

// ===== 오버레이 클릭으로 닫기 =====
// BasicPopup과 BottomSheetPopup은 오버레이 클릭 시 닫힙니다.
// handleOverlayClick 함수가 onClose를 호출합니다.
// 팝업 내부 클릭 시 이벤트 전파를 막아 오버레이 클릭으로 인한 닫힘을 방지합니다.
// const handlePopupClick = (e) => {
//   e.stopPropagation();
// };

// ===== 조건부 렌더링 =====
// 모든 팝업은 open이 false이면 null을 반환하여 렌더링하지 않습니다.
// if (!open) return null;

// ===== BasicPopup 액션 버튼 =====
// actions 배열의 각 항목은 Button 컴포넌트로 렌더링됩니다.
// actions.map((action, idx) => (
//   <Button
//     key={idx}
//     variant={action.variant || "ghost"}
//     onClick={action.onClick}
//   >
//     {action.label}
//   </Button>
// ))

// ===== BottomSheetPopup 드래그 핸들 =====
// 바텀시트 상단에 드래그 핸들이 표시됩니다.
// <div className="popup__handle" />
// 시각적으로 드래그 가능함을 나타냅니다.

// ===== FullscreenPopup 닫기 버튼 =====
// 풀스크린 팝업은 세 가지 닫기 버튼 타입을 제공합니다:
// 1. 상단 X 버튼만 있는 타입 (showHeaderClose={true}, showBottomClose={false}, 기본값)
// 2. 하단 닫기 버튼만 있는 타입 (showHeaderClose={false}, showBottomClose={true})
// 3. 상단 X 버튼과 하단 닫기 버튼 둘 다 있는 타입 (showHeaderClose={true}, showBottomClose={true})
// 
// 상단 X 버튼:
// <button className="popup__close" onClick={onClose} aria-label="닫기">✕</button>
// 
// 하단 닫기 버튼:
// <div className="popup__actions popup__actions--stack">
//   <Button variant="primary" onClick={onClose}>닫기</Button>
// </div>
// 
// 하단 닫기 버튼은 항상 화면 하단에 고정되며, 본문 영역이 스크롤 가능합니다.

// ===== UI 구조 =====
// BasicPopup:
//   popup-overlay: 오버레이 (클릭 시 닫기)
//     popup popup--basic: 팝업 컨테이너
//       popup__image: 아이콘 영역
//       popup__body: 본문 영역
//       popup__dots: 데코레이션 도트
//       popup__actions: 액션 버튼 영역
//
// BottomSheetPopup:
//   popup-overlay popup-overlay--sheet: 오버레이
//     popup popup--sheet: 팝업 컨테이너 (transform 적용)
//       popup__handle: 드래그 핸들
//       popup__body: 본문 영역
//       popup__actions: 액션 버튼 영역
//
// FullscreenPopup:
//   popup-overlay popup-overlay--full: 오버레이
//     popup popup--full: 팝업 컨테이너
//       popup__header: 헤더 (제목 + X 버튼, showHeaderClose에 따라 표시/숨김)
//       popup__body: 본문 영역 (스크롤 가능)
//       popup__actions: 하단 닫기 버튼 영역 (항상 하단 고정)

// ===== Typography 사용 =====
// 모든 팝업은 내부적으로 Typography 컴포넌트를 사용합니다:
// - title: Typography variant="h4", size="small"
// - description: Typography variant="body", size="small", color="muted"

// ===== 접근성 =====
// - 오버레이 클릭으로 닫기 기능 제공
// - FullscreenPopup의 닫기 버튼에 aria-label="닫기" 제공
// - 키보드 접근성 지원 (ESC 키로 닫기 - 구현 필요 시)
// - 포커스 트랩 (모달 내부에 포커스 유지 - 구현 필요 시)

// ===== 사용 사례 =====
// 1. 확인 다이얼로그
const handleDelete = () => {
  setIsBasicOpen(true);
};

<BasicPopup
  open={isBasicOpen}
  onClose={() => setIsBasicOpen(false)}
  icon="🗑️"
  title="삭제 확인"
  description="정말로 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
  actions={[
    {
      label: "취소",
      variant: "ghost",
      onClick: () => setIsBasicOpen(false),
    },
    {
      label: "삭제",
      variant: "primary",
      onClick: () => {
        deleteItem();
        setIsBasicOpen(false);
      },
    },
  ]}
/>

// 2. 옵션 선택 (바텀시트)
<BottomSheetPopup
  open={isSheetOpen}
  onClose={() => setIsSheetOpen(false)}
  title="정렬 방식"
  description="원하는 정렬 방식을 선택하세요."
/>

// 3. 상세 정보 (풀스크린 - X 버튼만 있는 타입)
<FullscreenPopup
  open={isFullOpen}
  onClose={() => setIsFullOpen(false)}
  title="상품 상세 정보"
  body={<ProductDetail product={product} />}
  showHeaderClose={true}   // 기본값이므로 생략 가능
  showBottomClose={false}  // 기본값이므로 생략 가능
/>

// 4. 상세 정보 (풀스크린 - 하단 닫기 버튼만 있는 타입)
<FullscreenPopup
  open={isFullOpen}
  onClose={() => setIsFullOpen(false)}
  title="상품 상세 정보"
  body={<ProductDetail product={product} />}
  showHeaderClose={false}  // X 버튼 숨김
  showBottomClose={true}   // 하단 닫기 버튼 표시
/>

// 5. 상세 정보 (풀스크린 - X 버튼과 하단 닫기 버튼 둘 다 있는 타입)
<FullscreenPopup
  open={isFullOpen}
  onClose={() => setIsFullOpen(false)}
  title="상품 상세 정보"
  body={<ProductDetail product={product} />}
  showHeaderClose={true}   // X 버튼 표시
  showBottomClose={true}   // 하단 닫기 버튼 표시
/>

// ===== 주의사항 =====
// 1. open prop이 false이면 팝업이 렌더링되지 않습니다 (null 반환).
// 2. onClose는 필수이며, 팝업을 닫을 때 호출됩니다.
// 3. BasicPopup의 actions 배열이 비어있으면 액션 버튼이 표시되지 않습니다.
// 4. BottomSheetPopup은 드래그로 닫을 수 있으며, 임계값은 120px입니다.
// 5. BottomSheetPopup이 닫힐 때 offset과 startY 상태가 자동으로 초기화됩니다.
// 6. FullscreenPopup의 body는 ReactNode이므로 자유롭게 콘텐츠를 구성할 수 있습니다.
// 7. FullscreenPopup은 showHeaderClose와 showBottomClose prop으로 세 가지 타입을 제공합니다:
//    - showHeaderClose={true}, showBottomClose={false} (기본): 상단 X 버튼만 표시
//    - showHeaderClose={false}, showBottomClose={true}: 하단 닫기 버튼만 표시
//    - showHeaderClose={true}, showBottomClose={true}: 상단 X 버튼과 하단 닫기 버튼 둘 다 표시
// 8. FullscreenPopup의 하단 닫기 버튼은 항상 화면 하단에 고정되며, 본문 영역은 스크롤 가능합니다.
// 7. 오버레이 클릭 시 팝업이 닫히므로, 팝업 내부 클릭 시 stopPropagation을 사용합니다.
// 8. BasicPopup의 icon은 이모지, 텍스트, SVG 등 다양한 형태를 지원합니다.
// 9. 모든 팝업은 Typography 컴포넌트를 사용하여 텍스트를 렌더링합니다.
// 10. 접근성을 위해 적절한 aria-label과 키보드 지원을 제공해야 합니다.`,
    PreviewComponent: PopupPreview,
  },
  {
    id: "image-zoom",
    label: "이미지 줌 팝업",
    title: "풀스크린 이미지 확대",
    description: "Swiper를 사용하여 여러 이미지를 스와이프하며 각 이미지를 핀치/더블 탭/휠로 확대·축소하는 예시입니다.",
    code: `import ImageZoomPopup from "./ImageZoomPopup";
import { useState } from "react";

// ===== Props 설명 =====
// images: 이미지 URL 또는 이미지 URL 배열 (필수, 단일 이미지 또는 여러 이미지 지원)
// alt: 이미지 대체 텍스트 또는 배열 (기본값: "Zoom image")
// initialIndex: 초기 표시할 이미지 인덱스 (기본값: 0, 여러 이미지일 때 사용)
// open: 팝업 열림/닫힘 상태 (boolean, 필수)
// onClose: 팝업 닫기 핸들러 (function, 필수)

// ===== 기본 사용 (단일 이미지) =====
const [isOpen, setIsOpen] = useState<boolean>(false);

<button onClick={() => setIsOpen(true)}>
  이미지 확대 보기
</button>

<ImageZoomPopup
  images="https://example.com/image.jpg"
  alt="확대할 이미지"
  open={isOpen}
  onClose={() => setIsOpen(false)}
/>

// ===== 여러 이미지 사용 =====
const [isOpen, setIsOpen] = useState<boolean>(false);
const [currentIndex, setCurrentIndex] = useState<number>(0);

const imageUrls = [
  "https://example.com/image1.jpg",
  "https://example.com/image2.jpg",
  "https://example.com/image3.jpg"
];

<button onClick={() => setIsOpen(true)}>
  이미지 갤러리 열기
</button>

<ImageZoomPopup
  images={imageUrls}
  alt={["이미지 1", "이미지 2", "이미지 3"]}
  initialIndex={currentIndex}
  open={isOpen}
  onClose={() => setIsOpen(false)}
/>

// ===== 상태 관리 예제 =====
const ImageViewer = () => {
  const [isZoomOpen, setIsZoomOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (imageUrl: string): void => {
    setSelectedImage(imageUrl);
    setIsZoomOpen(true);
  };

  const handleClose = (): void => {
    setIsZoomOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      <img 
        src="https://example.com/thumbnail.jpg" 
        onClick={() => handleImageClick("https://example.com/full-image.jpg")}
        alt="썸네일"
      />
      
      <ImageZoomPopup
        images={selectedImage || ""}
        alt="확대 이미지"
        open={isZoomOpen}
        onClose={handleClose}
      />
    </>
  );
};`,
    PreviewComponent: () => {
      const [open, setOpen] = useState(false);
      const sampleImages = [
        "https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&w=1200",
        "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&w=1200"
      ];
      return (
        <div className="guide-preview guide-preview--popup">
          <button className="btn btn--primary btn--sm" onClick={() => setOpen(true)}>
            이미지 풀팝업 열기 (2개 이미지)
          </button>
          <ImageZoomPopup
            images={sampleImages}
            alt={["샘플 이미지 1", "샘플 이미지 2"]}
            open={open}
            onClose={() => setOpen(false)}
          />
        </div>
      );
    },
  },
  {
    id: "datepicker",
    label: "데이터피커",
    title: "데이터 피커",
    description: "날짜, 시간, 또는 날짜+시간을 선택할 수 있는 컴포넌트입니다. 타입에 따라 캘린더 아이콘(📅) 또는 시계 아이콘(🕐)이 표시됩니다.",
    code: `import DatePicker from "./DatePicker";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

// ===== Props 설명 (TypeScript) =====
// type?: "date" | "time" | "range";     // 선택 타입 (기본값: "date")
// value?: Date | DateRange;              // 초기값 (date/time: Date, range: DateRange)
// onChange?: (date: Date | DateRange | undefined) => void;  // 변경 핸들러
// placeholder?: string;                  // 플레이스홀더
// className?: string;                    // 추가 CSS 클래스명

// ===== 날짜 선택 (type="date") =====
const [dateValue, setDateValue] = useState<Date | undefined>(undefined);

<DatePicker
  type="date"
  value={dateValue}
  onChange={setDateValue}
  placeholder="날짜를 선택해주세요"
/>;

// ===== 시간 선택 (type="time") =====
const [timeValue, setTimeValue] = useState<Date | undefined>(undefined);

<DatePicker
  type="time"
  value={timeValue}
  onChange={setTimeValue}
  placeholder="시간을 선택해주세요"
/>;

// ===== 날짜 다중 선택 (type="range") =====
const [rangeValue, setRangeValue] = useState<DateRange | undefined>(undefined);

<DatePicker
  type="range"
  value={rangeValue}
  onChange={setRangeValue}
  placeholder="날짜 범위를 선택해주세요"
/>;

// ===== 상태 관리 예제 =====
const DatePickerExample = () => {
  const [dateValue, setDateValue] = useState<Date | undefined>(undefined);
  const [timeValue, setTimeValue] = useState<Date | undefined>(undefined);
  const [rangeValue, setRangeValue] = useState<DateRange | undefined>(undefined);

  return (
    <div>
      <div>
        <label>날짜 선택</label>
        <DatePicker
          type="date"
          value={dateValue}
          onChange={setDateValue}
        />
        {dateValue && (
          <span>선택된 날짜: {dateValue.toLocaleDateString("ko-KR")}</span>
        )}
      </div>
      <div>
        <label>시간 선택</label>
        <DatePicker
          type="time"
          value={timeValue}
          onChange={setTimeValue}
        />
        {timeValue && (
          <span>선택된 시간: {timeValue.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })}</span>
        )}
      </div>
      <div>
        <label>날짜 다중 선택</label>
        <DatePicker
          type="range"
          value={rangeValue}
          onChange={setRangeValue}
        />
        {rangeValue?.from && rangeValue?.to && (
          <span>
            선택된 기간: {rangeValue.from.toLocaleDateString("ko-KR")} ~ {rangeValue.to.toLocaleDateString("ko-KR")}
          </span>
        )}
      </div>
    </div>
  );
};

// ===== 날짜 유효성 검사 예제 =====
const DatePickerWithValidation = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [error, setError] = useState<string>("");

  const handleSelect = (date: Date | undefined): void => {
    if (!date) {
      setSelectedDate(undefined);
      setError("");
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date < today) {
      setError("과거 날짜는 선택할 수 없습니다.");
      setSelectedDate(undefined);
      return;
    }

    setSelectedDate(date);
    setError("");
  };

  return (
    <div>
      <DatePicker
        type="date"
        value={selectedDate}
        onChange={handleSelect}
      />
      {error && <div style={{ color: "red" }}>{error}</div>}
      {selectedDate && (
        <div>선택된 날짜: {selectedDate.toLocaleDateString("ko-KR")}</div>
      )}
    </div>
  );
};

// ===== 폼과 함께 사용 예제 =====
const FormWithDatePicker = () => {
  const [formData, setFormData] = useState({
    checkIn: undefined as Date | undefined,
    checkOut: undefined as Date | undefined,
    stayPeriod: undefined as DateRange | undefined,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("예약 정보:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>체크인 날짜</label>
        <DatePicker
          type="date"
          value={formData.checkIn}
          onChange={(date) => setFormData({ ...formData, checkIn: date })}
        />
      </div>
      <div>
        <label>체크아웃 날짜</label>
        <DatePicker
          type="date"
          value={formData.checkOut}
          onChange={(date) => setFormData({ ...formData, checkOut: date })}
        />
      </div>
      <div>
        <label>숙박 기간 (다중 선택)</label>
        <DatePicker
          type="range"
          value={formData.stayPeriod}
          onChange={(range) => setFormData({ ...formData, stayPeriod: range })}
        />
      </div>
      <button type="submit">예약하기</button>
    </form>
  );
};`,
    PreviewComponent: () => {
      const [dateValue, setDateValue] = useState<Date | undefined>(undefined);
      const [timeValue, setTimeValue] = useState<Date | undefined>(undefined);
      const [rangeValue, setRangeValue] = useState<DateRange | undefined>(undefined);

      return (
        <div className="guide-preview guide-preview--datepicker">
          <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "500px" }}>
            <div>
              <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700, color: "var(--color-text)" }}>
                날짜 선택 (type="date")
              </h4>
              <DatePicker
                type="date"
                value={dateValue}
                onChange={(date) => setDateValue(date as Date | undefined)}
                placeholder="날짜를 선택해주세요"
              />
              {dateValue && (
                <p style={{ marginTop: "8px", fontSize: "13px", color: "var(--color-text-secondary)" }}>
                  선택된 날짜: {dateValue.toLocaleDateString("ko-KR")}
                </p>
              )}
            </div>

            <div>
              <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700, color: "var(--color-text)" }}>
                시간 선택 (type="time")
              </h4>
              <DatePicker
                type="time"
                value={timeValue}
                onChange={(time) => setTimeValue(time as Date | undefined)}
                placeholder="시간을 선택해주세요"
              />
              {timeValue && (
                <p style={{ marginTop: "8px", fontSize: "13px", color: "var(--color-text-secondary)" }}>
                  선택된 시간: {timeValue.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })}
                </p>
              )}
            </div>

            <div>
              <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700, color: "var(--color-text)" }}>
                날짜 다중 선택 (type="range")
              </h4>
              <DatePicker
                type="range"
                value={rangeValue}
                onChange={(range) => setRangeValue(range as DateRange | undefined)}
                placeholder="날짜 범위를 선택해주세요"
              />
              {rangeValue?.from && rangeValue?.to && (
                <p style={{ marginTop: "8px", fontSize: "13px", color: "var(--color-text-secondary)" }}>
                  선택된 기간: {rangeValue.from.toLocaleDateString("ko-KR")} ~ {rangeValue.to.toLocaleDateString("ko-KR")}
                </p>
              )}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    id: "tooltip",
    label: "툴팁",
    title: "툴팁 컴포넌트",
    description: "물음표 아이콘을 클릭하면 툴팁이 토글되는 UI입니다. top/right/bottom/left 위치를 지원합니다.",
    code: `import Tooltip from "./Tooltip";
import { useState } from "react";

type TooltipPlacement = "top" | "right" | "bottom" | "left";

// 기본 사용
<Tooltip 
  text="이것은 툴팁 내용입니다." 
  placement="top" 
/>;

// 다양한 placement 옵션
<Tooltip text="위쪽 툴팁" placement="top" />;
<Tooltip text="오른쪽 툴팁" placement="right" />;
<Tooltip text="아래쪽 툴팁" placement="bottom" />;
<Tooltip text="왼쪽 툴팁" placement="left" />;

// 커스텀 레이블
<Tooltip 
  label="도움말 보기" 
  text="이 기능에 대한 자세한 설명입니다." 
  placement="top" 
/>;

// 여러 툴팁 배치
const TooltipRow = () => {
  return (
    <div className="tooltip-row">
      <Tooltip text="위쪽 툴팁" placement="top" />
      <Tooltip text="오른쪽 툴팁" placement="right" />
      <Tooltip text="아래쪽 툴팁" placement="bottom" />
      <Tooltip text="왼쪽 툴팁" placement="left" />
    </div>
  );
};

// 동적 placement 예제
const DynamicTooltip = () => {
  const [placement, setPlacement] = useState<TooltipPlacement>("top");

  const placements: TooltipPlacement[] = ["top", "right", "bottom", "left"];

  return (
    <div>
      <select 
        value={placement} 
        onChange={(e) => setPlacement(e.target.value as TooltipPlacement)}
      >
        {placements.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
      <Tooltip 
        text={\`현재 위치: \${placement}\`} 
        placement={placement} 
      />
    </div>
  );
};

// 폼 필드와 함께 사용
const FormWithTooltip = () => {
  return (
    <div>
      <label>
        사용자명
        <Tooltip 
          label="사용자명 도움말" 
          text="영문, 숫자, 언더스코어만 사용 가능합니다. (3-20자)" 
          placement="right" 
        />
      </label>
      <input type="text" />
    </div>
  );
};

// 조건부 툴팁 표시
const ConditionalTooltip = () => {
  const [showTooltip, setShowTooltip] = useState<boolean>(true);

  if (!showTooltip) {
    return <div>툴팁 없음</div>;
  }

  return (
    <Tooltip 
      text="조건부로 표시되는 툴팁입니다." 
      placement="top" 
    />
  );
};
// 트리거 버튼 클릭 시 open 상태가 토글됩니다.
// open이 true일 때만 툴팁 버블이 표시됩니다.

// ===== 외부 클릭 감지 =====
// 툴팁이 열려있을 때 외부를 클릭하면 자동으로 닫힙니다.
// useEffect를 사용하여 document에 클릭 이벤트 리스너를 등록합니다.
// triggerRef를 사용하여 트리거 버튼 영역을 참조합니다.

// ===== UI 구조 =====
// tooltip: 최상위 컨테이너 (position: relative)
//   tooltip__trigger: 트리거 버튼 (물음표 아이콘)
//   tooltip__bubble: 툴팁 버블 (조건부 렌더링)
//     tooltip__bubble--{placement}: 위치별 클래스
//     tooltip__text: 툴팁 텍스트
//     tooltip__arrow: 화살표 (위치별로 다른 스타일)

// ===== 화살표 위치 =====
// 각 placement에 따라 화살표가 다른 위치에 표시됩니다:
// - top: 버블 하단 중앙
// - right: 버블 왼쪽 중앙
// - bottom: 버블 상단 중앙
// - left: 버블 오른쪽 중앙
//
// 화살표는 transform: rotate(45deg)로 45도 회전된 정사각형입니다.

// ===== 스타일링 =====
// 툴팁 버블:
// - 배경색: #111 (검은색)
// - 텍스트 색상: #fff (흰색)
// - 최소 너비: 140px
// - 최대 너비: 220px
// - 패딩: 10px 12px
// - border-radius: 8px
// - box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18)
//
// 트리거 버튼:
// - 크기: 28px × 28px
// - border-radius: 50% (원형)
// - 호버 시 배경색과 테두리 색상 변경

// ===== 접근성 =====
// - 트리거 버튼에 aria-label 제공 (label prop)
// - 트리거 버튼에 aria-expanded 속성 제공 (open 상태)
// - 툴팁 버블에 role="status" 제공
// - 화살표에 aria-hidden="true" 제공 (장식용)
// - 키보드 접근성 지원 (버튼은 Enter/Space로 클릭 가능)

// ===== 조건부 렌더링 =====
// open 상태가 true일 때만 툴팁 버블이 렌더링됩니다:
{open && (
  <div className={\`tooltip__bubble tooltip__bubble--\${placement}\`} role="status">
    <span className="tooltip__text">{text}</span>
    <span className="tooltip__arrow" aria-hidden="true" />
  </div>
)}

// ===== 텍스트 줄바꿈 =====
// tooltip__text에 word-break: keep-all이 적용되어
// 한글 단어가 중간에 끊어지지 않도록 합니다.
// 긴 텍스트는 자동으로 줄바꿈됩니다.

// ===== z-index =====
// 툴팁 버블의 z-index는 10으로 설정되어
// 다른 요소 위에 표시됩니다.

// ===== 주의사항 =====
// 1. placement는 'top', 'right', 'bottom', 'left' 중 하나여야 합니다.
// 2. 툴팁이 화면 밖으로 나가지 않도록 주의해야 합니다 (추가 로직 필요 시).
// 3. 외부 클릭 시 자동으로 닫히므로, 여러 툴팁을 동시에 열 수 없습니다.
// 4. 트리거 버튼은 원형이며, 물음표(?) 텍스트가 표시됩니다.
// 5. 툴팁 텍스트가 길 경우 자동으로 줄바꿈되며, 최대 너비는 220px입니다.
// 6. 화살표는 CSS transform을 사용하여 회전된 정사각형입니다.
// 7. 툴팁 버블은 절대 위치로 표시되므로 부모 요소의 position에 주의해야 합니다.
// 8. tooltip 컨테이너는 inline-flex로 설정되어 인라인 요소처럼 동작합니다.
// 9. 여러 툴팁을 나란히 배치할 때는 flexbox나 grid를 사용하는 것이 좋습니다.
// 10. 접근성을 위해 label prop을 제공하는 것을 권장합니다.`,
    PreviewComponent: () => (
      <div className="guide-preview guide-preview--tooltip">
        <div className="tooltip-row">
          <Tooltip text="기본 상단 툴팁입니다." placement="top" />
          <Tooltip text="오른쪽에 표시되는 툴팁" placement="right" />
          <Tooltip text="아래쪽 툴팁" placement="bottom" />
          <Tooltip text="왼쪽 툴팁" placement="left" />
        </div>
      </div>
    ),
  },
  {
    id: "dnd",
    label: "드래그앤드랍",
    title: "드래그앤드랍 리스트",
    description: "react-draggable을 사용한 세로 리스트 드래그 & 순서 변경 예시입니다.",
    code: `import Draggable, { type DraggableData } from "react-draggable";
import { useState } from "react";

type Item = { id: number; title: string };

const [items, setItems] = useState<Item[]>([
  { id: 1, title: "아이템 1" },
  { id: 2, title: "아이템 2" },
  { id: 3, title: "아이템 3" },
  { id: 4, title: "아이템 4" },
]);

const itemHeight = 80;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const reorder = (startIndex: number, targetIndex: number) => {
  if (startIndex === targetIndex) return;
  const next = [...items];
  const [removed] = next.splice(startIndex, 1);
  next.splice(targetIndex, 0, removed);
  setItems(next);
};

const handleStop = (startIndex: number, data: DraggableData) => {
  const deltaIndex = Math.round(data.y / itemHeight);
  const target = clamp(startIndex + deltaIndex, 0, items.length - 1);
  reorder(startIndex, target);
};

<div className="drag-drop-list">
  {items.map((item, index) => (
    <Draggable
      key={item.id}
      axis="y"
      onStop={(_e, data) => handleStop(index, data)}
      handle=".drag-handle"
    >
      <div className="card">
        <div className="drag-handle">⋮⋮</div>
        <h3>{item.title}</h3>
        <p>드래그하여 순서를 변경할 수 있습니다.</p>
      </div>
    </Draggable>
  ))}
</div>;`,
    PreviewComponent: DragDropList,
  },
  {
    id: "carousel",
    label: "캐러셀",
    title: "Swiper 캐러셀",
    description:
      "react + swiper 캐러셀. 기본 네비게이션/페이지네이션 + loop/간격 옵션을 사용하며, breakpoints로 반응형 슬라이드 수를 조절합니다. fade, cube, coverflow, flip 등 다양한 전환 효과도 제공합니다.",
    code: `import Carousel from "./Carousel";

type Slide = { id: number; title?: string; desc?: string; description?: string; image?: string };

// ===== Props 설명 =====
// slides: 슬라이드 데이터 배열 [{ id, title, desc, description, image }] (기본값: defaultSlides)
// showOptionsPanel: 옵션 패널 표시 여부 (기본값: false)

// ===== 기본 사용 =====
// 기본 데이터를 사용하여 캐러셀 표시
<Carousel />

// ===== 커스텀 슬라이드 데이터 =====
const customSlides: Slide[] = [
  { 
    id: 1, 
    title: "배너 1", 
    desc: "이곳에 주요 메시지를 노출하세요.",
    image: "https://example.com/banner1.jpg"
  },
  { 
    id: 2, 
    title: "배너 2", 
    desc: "슬라이드를 넘겨 다양한 정보를 전달합니다.",
    image: "https://example.com/banner2.jpg"
  },
  { 
    id: 3, 
    title: "배너 3", 
    desc: "모바일/데스크탑 반응형 지원.",
    image: "https://example.com/banner3.jpg"
  },
];

<Carousel slides={customSlides} />

// ===== 옵션 패널 표시 =====
// Swiper 옵션 정보를 표시하는 패널 포함
<Carousel slides={customSlides} showOptionsPanel />

// ===== 슬라이드 1개 케이스 (no-swiper) =====
// 슬라이드가 1개 이하일 때는 자동으로 no-swiper 클래스가 적용되고 스와이퍼가 실행되지 않음
const singleSlide: Slide[] = [
  { 
    id: 1, 
    title: "단일 배너", 
    desc: "슬라이드가 1개일 때는 스와이퍼 없이 표시됩니다.",
    image: "https://example.com/banner.jpg"
  }
];

<Carousel slides={singleSlide} />

// ===== 슬라이드 데이터 구조 =====
// slides 배열의 각 객체는 다음 속성을 가질 수 있습니다:
const slideExample = {
  id: 1,                    // 고유 식별자 (필수)
  title: "배너 제목",       // 슬라이드 제목 (선택)
  desc: "슬라이드 설명",    // 슬라이드 설명 (desc 또는 description 사용 가능)
  description: "슬라이드 설명", // desc와 동일한 용도
  image: "https://example.com/image.jpg" // 슬라이드 이미지 URL (선택)
};

// ===== 기본 데이터 구조 =====
// 컴포넌트 내부에 기본 데이터가 내장되어 있습니다:
const defaultSlides: Slide[] = [
  { id: 1, title: "배너 1", desc: "이곳에 주요 메시지를 노출하세요." },
  { id: 2, title: "배너 2", desc: "슬라이드를 넘겨 다양한 정보를 전달합니다." },
  { id: 3, title: "배너 3", desc: "모바일/데스크탑 반응형 지원." },
];

// ===== Swiper 직접 사용 (고급 옵션) =====
// Carousel 컴포넌트 대신 Swiper를 직접 사용하여 더 세밀한 제어 가능
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

<Swiper
  modules={[Navigation, Pagination, EffectFade, Autoplay]}
  navigation               // 좌·우 화살표
  pagination={{ clickable: true }} // bullet + 클릭 이동
  effect="fade"            // 페이드 효과
  loop                     // 마지막 뒤로 순환
  autoplay={{ delay: 3000, disableOnInteraction: false }} // 자동 재생
  spaceBetween={16}        // 슬라이드 간격(px)
  slidesPerView={1}        // 기본 1장
  breakpoints={{           // 반응형: 해상도별 슬라이드 수/간격
    640: { slidesPerView: 1.2, spaceBetween: 12 },
    900: { slidesPerView: 2, spaceBetween: 14 },
    1200: { slidesPerView: 3, spaceBetween: 16 },
  }}
>
  <SwiperSlide>슬라이드 1</SwiperSlide>
  <SwiperSlide>슬라이드 2</SwiperSlide>
</Swiper>

// ===== 다양한 Swiper 효과 =====
// Fade 효과
<Swiper modules={[Navigation, Pagination, EffectFade]} effect="fade" />

// Cube 효과
<Swiper modules={[Navigation, Pagination, EffectCube]} effect="cube" />

// Coverflow 효과
<Swiper 
  modules={[Navigation, Pagination, EffectCoverflow]} 
  effect="coverflow"
  slidesPerView={1.2}
  centeredSlides
/>

// Flip 효과
<Swiper modules={[Navigation, Pagination, EffectFlip]} effect="flip" />

// ===== 주의사항 =====
// 1. slides 배열의 각 객체는 id 속성을 필수로 가져야 함
// 2. title, desc, description, image는 모두 선택 사항
// 3. desc와 description은 동일한 용도로 사용 가능 (description 우선)
// 4. slides가 1개 이하일 때는 자동으로 no-swiper 클래스가 적용되고 스와이퍼가 실행되지 않음
// 5. slides가 2개 이상일 때만 스와이퍼 기능이 활성화됨
// 6. Image 컴포넌트를 사용하여 자동으로 비율 판단 (landscape/portrait/square)
// 7. Typography 컴포넌트를 사용하여 제목과 설명 스타일 일관성 유지
// 8. showOptionsPanel은 개발/디버깅 목적으로 사용되며, 실제 프로덕션에서는 false 권장
// 9. Swiper 모듈은 필요한 것만 import하여 번들 크기 최적화
// 10. breakpoints를 사용하여 반응형 디자인 구현 권장`,
    PreviewComponent: CarouselPreview,
  },
  {
    id: "dropdown",
    label: "드롭다운",
    title: "드롭다운 UI",
    description: "클릭으로 열고 닫는 기본/filled/ghost 드롭다운. 선택 값 표시와 선택 이벤트 예시를 포함합니다.",
    code: `import Dropdown from "./Dropdown";
import { useState } from "react";

// ===== Props 설명 =====
// options: 옵션 배열 [{ value, label }] (기본값: defaultOptions)
// variant: 'outline' | 'filled' | 'ghost' (기본값: 'outline')
// placeholder: 플레이스홀더 텍스트 (기본값: "선택하세요")
// disabled: 비활성화 여부 (기본값: false)
// fullWidth: 전체 너비 사용 여부 (기본값: false)
// onChange: 옵션 선택 핸들러 (선택된 옵션 객체를 인자로 받음, 선택)

// ===== 기본 사용 =====
type DropdownOption = { value: string; label: string };

const options: DropdownOption[] = [
  { value: "opt1", label: "옵션 1" },
  { value: "opt2", label: "옵션 2" },
  { value: "opt3", label: "옵션 3" },
];

<Dropdown options={options} />

// ===== Variant 옵션 =====
// outline: 외곽선 스타일 (기본값)
<Dropdown options={options} variant="outline" />

// filled: 채워진 배경 스타일
<Dropdown options={options} variant="filled" />

// ghost: 투명 배경 스타일
<Dropdown options={options} variant="ghost" />

// ===== 옵션 선택 추적 =====
// onChange 핸들러를 통해 선택된 옵션을 외부에서 관리할 수 있습니다.
const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(null);

<Dropdown
  options={options}
  onChange={(option: DropdownOption | null) => {
    setSelectedOption(option);
    console.log("선택된 옵션:", option);
  }}
/>

// ===== 내부 상태 관리 =====
// 컴포넌트 내부에서 다음 상태를 관리합니다:
// - open: 드롭다운 메뉴 열림/닫힘 상태
// - selected: 선택된 옵션 (기본값: options[0] 또는 null)
//
// 옵션이 변경되면 selected가 자동으로 options[0]으로 리셋됩니다.

// ===== 외부 클릭 감지 =====
// 드롭다운이 열려있을 때 외부를 클릭하면 자동으로 닫힙니다.
// useEffect를 사용하여 document에 클릭 이벤트 리스너를 등록합니다.
// wrapperRef를 사용하여 드롭다운 컨테이너를 참조합니다.

// ===== 옵션 선택 =====
// handleSelect 함수가 호출되며:
// 1. selected 상태 업데이트
// 2. open 상태를 false로 변경 (메뉴 닫기)
// 3. onChange 호출 (제공된 경우)

// ===== UI 구조 =====
// dropdown: 최상위 컨테이너 (position: relative)
//   dropdown--{variant}: variant별 클래스
//   dropdown--full: 전체 너비 클래스
//   dropdown--disabled: 비활성화 클래스
//   dropdown__toggle: 토글 버튼
//     dropdown__chevron: 화살표 아이콘 (▾)
//   dropdown__menu: 드롭다운 메뉴 (조건부 렌더링)
//     dropdown__option: 각 옵션 버튼
//       dropdown__option.is-selected: 선택된 옵션 클래스

// ===== 전체 너비 =====
// fullWidth={true}로 설정하면 최대 너비 제한이 제거됩니다.
<Dropdown
  options={options}
  fullWidth={true}
/>

// ===== 비활성화 =====
// disabled={true}로 설정하면 드롭다운이 비활성화됩니다.
<Dropdown
  options={options}
  disabled={true}
/>

// ===== 커스텀 플레이스홀더 =====
// placeholder prop으로 플레이스홀더 텍스트를 변경할 수 있습니다.
<Dropdown
  options={options}
  placeholder="카테고리를 선택하세요"
/>

// ===== 선택된 옵션 표시 =====
// 토글 버튼에는 선택된 옵션의 label이 표시됩니다.
// 선택된 옵션이 없으면 placeholder가 표시됩니다.
// {selected?.label || placeholder}

// ===== 메뉴 위치 =====
// 드롭다운 메뉴는 토글 버튼 바로 아래에 표시됩니다.
// position: absolute, top: calc(100% + 6px)로 설정됩니다.

// ===== 접근성 =====
// - 토글 버튼에 aria-haspopup="listbox" 제공
// - 토글 버튼에 aria-expanded 속성 제공 (open 상태)
// - 메뉴에 role="listbox" 제공
// - 각 옵션에 role="option" 및 aria-selected 속성 제공
// - 키보드 접근성 지원 (화살표 키로 옵션 탐색, Enter로 선택)

// ===== 스타일링 =====
// outline variant:
//   - 배경: var(--color-card)
//   - 테두리: 1px solid var(--color-border)
//   - 호버 시 테두리 색상과 box-shadow 변경
//
// filled variant:
//   - 배경: rgba(12, 124, 89, 0.08)
//   - 테두리: rgba(12, 124, 89, 0.25)
//   - 호버 시 배경과 테두리 색상 변경
//
// ghost variant:
//   - 배경: transparent
//   - 테두리: transparent
//   - 호버 시 테두리와 배경 표시

// ===== 옵션 호버 효과 =====
// 옵션에 마우스를 올리면 배경색과 텍스트 색상이 변경됩니다.
// 선택된 옵션은 항상 강조 표시됩니다 (배경색 + 폰트 굵기).

// ===== 주의사항 =====
// 1. options 배열의 각 항목은 { value, label } 구조를 가져야 합니다.
// 2. value는 고유해야 하며, 옵션 식별에 사용됩니다.
// 3. 옵션이 변경되면 내부 selected 상태가 자동으로 첫 번째 옵션으로 리셋됩니다.
// 4. 외부 클릭 시 메뉴가 자동으로 닫히므로, 여러 드롭다운을 동시에 열 수 없습니다.
// 5. fullWidth={true}일 때는 최대 너비 제한이 제거되며, 부모 요소의 너비를 따릅니다.
// 6. disabled 상태에서는 모든 상호작용이 비활성화됩니다 (opacity: 0.5, pointer-events: none).
// 7. 메뉴는 z-index: 20으로 설정되어 다른 요소 위에 표시됩니다.
// 8. 옵션이 많을 경우 메뉴에 스크롤을 추가하는 것을 고려해야 합니다.
// 9. onChange는 선택 사항이지만, 외부에서 선택된 옵션을 추적하려면 제공해야 합니다.
// 10. 화살표 아이콘(▾)은 aria-hidden="true"로 설정되어 스크린 리더에서 무시됩니다.`,
    PreviewComponent: DropdownPreview,
  },
  {
    id: "tab",
    label: "탭",
    title: "Tabs 컴포넌트",
    description:
      "탭은 버튼 역할을 하며, `aria-selected`와 `role=\"tablist\"` 속성을 설정합니다. 기본 타입, 스크롤 타입(부모 스크롤바 이용), Swiper 타입(가운데 정렬)을 지원합니다. 탭 클릭 시 active 클래스가 즉시 적용되며, Swiper 타입에서는 스와이프 제스처로도 탭을 변경할 수 있습니다.",
    code: `import Tabs from "./Tabs";
import { useState } from "react";

type TabItem = { id: string; label: string; description?: string };

const items: TabItem[] = [
  { id: "detail", label: "상세", description: "상세 정보를 표시합니다." },
  { id: "review", label: "리뷰" },
  { id: "qa", label: "Q&A" },
];

const [activeTab, setActiveTab] = useState<string>(items[0].id);

<div id="tabs-scroll" style={{ overflowX: "auto" }}>
  <Tabs
    items={items}
    type="swiper"
    scrollContainerId="tabs-scroll"
    onChange={(id: string) => setActiveTab(id)}
  />
</div>;`,
    PreviewComponent: TabsPreview,
  },


  {
    id: "image",
    label: "이미지",
    title: "이미지 컴포넌트",
    description:
      "이미지 로드 실패 시 자동으로 'noimage' 이미지를 표시하고, 원본 이미지의 가로/세로 비율에 따라 자동으로 클래스를 부여합니다.",
    code: `import Image from "./Image";
import type { SyntheticEvent } from "react";

const handleError = (e: SyntheticEvent<HTMLImageElement>): void => {
  console.warn("이미지 로드 실패:", e.currentTarget.src);
};

const handleLoad = (): void => {
  console.log("이미지 로드 완료");
};

<Image
  src="https://example.com/hero.jpg"
  alt="대표 이미지"
  width={320}
  height={180}
  onError={handleError}
  onLoad={handleLoad}
/>;`,
    PreviewComponent: ImagePreview,
  },


  {
    id: "loading",
    label: "로딩",
    title: "로딩 인디케이터",
    description:
      "로딩 상태를 명확히 알려주는 스피너형 인디케이터입니다. size와 thickness로 크기를 조절하고, label로 접근성 텍스트를 제공합니다.",
    code: `import Loading from "./Loading";
import { useState, useEffect } from "react";

// 기본 사용
<Loading size={48} thickness={4} label="로딩 중..." />;

// 다양한 크기
<Loading size={24} thickness={2} label="작은 로딩" />;
<Loading size={48} thickness={4} label="중간 로딩" />;
<Loading size={64} thickness={6} label="큰 로딩" />;

// 레이블 없이 사용
<Loading size={48} thickness={4} />;

// 상태 관리 예제
const LoadingExample = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setIsLoading(true);
      try {
        // API 호출 시뮬레이션
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setData(["항목 1", "항목 2", "항목 3"]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <Loading size={48} thickness={4} label="데이터를 불러오는 중..." />;
  }

  return (
    <ul>
      {data.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

// 조건부 렌더링 예제
const DataComponent = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");

  const handleLoad = async (): Promise<void> => {
    setLoading(true);
    try {
      // 데이터 로드 로직
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setContent("데이터 로드 완료");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <Loading size={40} thickness={3} label="처리 중..." />
      ) : (
        <div>{content}</div>
      )}
    </div>
  );
};

// 전체 화면 로딩
const FullScreenLoading = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Loading size={64} thickness={5} label="페이지를 불러오는 중..." />
    </div>
  );
};`,
    PreviewComponent: LoadingPreview,
  },


  {
    id: "accordion",
    label: "아코디언",
    title: "Accordion 컴포넌트",
    description:
      "여러 항목을 접었다 펼칠 수 있는 아코디언 컴포넌트입니다. Exclusive 타입(하나만 열림)과 Independent 타입(독립적으로 열림) 두 가지 모드를 지원합니다.",
    code: `import Accordion from "./Accordion";
import { ReactNode } from "react";

// 타입 정의
type AccordionItem = {
  id: string | number;
  label: string;
  content: string | ReactNode;
};

// 기본 사용법 - Exclusive 타입 (하나만 열림)
const basicItems: AccordionItem[] = [
  { 
    id: "1", 
    label: "에피타이저", 
    content: "에피타이저 메뉴입니다. 다양한 전채 요리를 제공합니다." 
  },
  { 
    id: "2", 
    label: "메인 음식", 
    content: "메인 음식 메뉴입니다. 풍부한 맛의 메인 요리를 제공합니다." 
  },
  { 
    id: "3", 
    label: "디저트", 
    content: "디저트 메뉴입니다. 달콤한 디저트를 제공합니다." 
  },
];

<Accordion items={basicItems} type="exclusive" />;

// Independent 타입 (독립적으로 열림, 여러 개 동시에 열 수 있음)
const independentItems: AccordionItem[] = [
  { id: "4", label: "음료", content: "음료 메뉴입니다." },
  { id: "5", label: "셀러드", content: "셀러드 메뉴입니다." },
  { id: "6", label: "일식", content: "일식 메뉴입니다." },
];

<Accordion items={independentItems} type="independent" />;

// 첫 번째 아이템 기본 열림
<Accordion 
  items={basicItems} 
  type="exclusive" 
  defaultOpenFirst={true} 
/>;

// content에 ReactNode 사용 (복잡한 구조)
const complexItems: AccordionItem[] = [
  {
    id: "7",
    label: "상세 정보",
    content: (
      <div>
        <h4>제목</h4>
        <p>설명 텍스트입니다.</p>
        <ul>
          <li>항목 1</li>
          <li>항목 2</li>
          <li>항목 3</li>
        </ul>
      </div>
    ),
  },
  {
    id: "8",
    label: "추가 정보",
    content: (
      <div>
        <p>추가 정보 내용입니다.</p>
        <button onClick={() => alert("클릭")}>버튼</button>
      </div>
    ),
  },
];

<Accordion items={complexItems} type="independent" />;

// className으로 스타일 커스터마이징
<Accordion 
  items={basicItems} 
  type="exclusive" 
  className="custom-accordion" 
/>;

// 실제 사용 예제
const MenuAccordion = () => {
  const menuItems: AccordionItem[] = [
    {
      id: "appetizer",
      label: "에피타이저",
      content: "새우튀김, 양념치킨, 감자튀김 등",
    },
    {
      id: "main",
      label: "메인 요리",
      content: "스테이크, 파스타, 피자 등",
    },
    {
      id: "dessert",
      label: "디저트",
      content: "케이크, 아이스크림, 커피 등",
    },
  ];

  return (
    <Accordion 
      items={menuItems} 
      type="exclusive" 
      defaultOpenFirst={true}
    />
  );
};

// Props 설명:
// - items: AccordionItem[] (필수) - 아코디언 아이템 배열
//   - id: string | number - 각 아이템의 고유 식별자
//   - label: string - 헤더에 표시될 텍스트
//   - content: string | ReactNode - 펼쳐질 때 표시될 내용
// - type: "exclusive" | "independent" (선택, 기본값: "exclusive")
//   - "exclusive": 하나만 열림 (다른 항목 열면 이전 항목 자동 닫힘)
//   - "independent": 독립적으로 열림 (여러 개 동시에 열 수 있음)
// - defaultOpenFirst: boolean (선택, 기본값: false)
//   - true: 첫 번째 아이템이 기본적으로 열려있음
// - className: string (선택) - 추가 CSS 클래스명`,
    PreviewComponent: AccordionPreview,
  },


  {
    id: "badge",
    label: "뱃지",
    title: "뱃지 컴포넌트",
    description:
      "상태, 카테고리, 라벨 등을 표시하는 작은 뱃지 컴포넌트입니다. 다양한 variant와 size, outlined 스타일을 지원합니다.",
    code: `import Badge from "./Badge";

// 기본 사용
<Badge variant="success" size="small">완료</Badge>;

// 다양한 variant
<Badge variant="primary">기본</Badge>;
<Badge variant="success">성공</Badge>;
<Badge variant="warning">경고</Badge>;
<Badge variant="error">오류</Badge>;
<Badge variant="info">정보</Badge>;

// 다양한 size
<Badge variant="primary" size="small">작은 뱃지</Badge>;
<Badge variant="primary" size="medium">중간 뱃지</Badge>;
<Badge variant="primary" size="large">큰 뱃지</Badge>;

// outlined 스타일
<Badge variant="primary" outlined={true}>아웃라인</Badge>;
<Badge variant="success" outlined={true}>성공 아웃라인</Badge>;

// 동적 뱃지 예제
const BadgeExample = () => {
  type BadgeVariant = "primary" | "success" | "warning" | "error" | "info";
  type BadgeSize = "small" | "medium" | "large";

  const status: BadgeVariant = "success";
  const size: BadgeSize = "medium";

  return (
    <div>
      <Badge variant={status} size={size}>
        상태: {status}
      </Badge>
      <Badge variant="info" outlined={true}>
        정보 뱃지
      </Badge>
    </div>
  );
};

// 리스트와 함께 사용
const items = [
  { id: 1, name: "항목 1", status: "success" as const },
  { id: 2, name: "항목 2", status: "warning" as const },
  { id: 3, name: "항목 3", status: "error" as const },
];

{items.map((item) => (
  <div key={item.id}>
    {item.name}
    <Badge variant={item.status} size="small">
      {item.status}
    </Badge>
  </div>
))};`,
    PreviewComponent: BadgePreview,
  },


  {
    id: "search-field",
    label: "서치 필드",
    title: "검색 필드 컴포넌트",
    description:
      "검색 아이콘, 입력 필드, 클리어 버튼, 검색 버튼을 포함한 검색 입력 컴포넌트입니다.",
    code: `import SearchField from "./SearchField";
import { useState } from "react";
import type { ChangeEvent } from "react";

// 기본 사용
const [value, setValue] = useState<string>("");

const handleChange = (_e: ChangeEvent<HTMLInputElement>, v: string): void => {
  setValue(v);
};

const handleSearch = (searchValue: string): void => {
  console.log("검색:", searchValue);
  // 검색 로직 실행
};

const handleClear = (): void => {
  setValue("");
};

<SearchField
  placeholder="검색어를 입력하세요"
  value={value}
  onChange={handleChange}
  onSearch={handleSearch}
  onClear={handleClear}
/>;

// 상태 관리 예제
const SearchExample = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const handleSearch = (query: string): void => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    // 검색 API 호출 또는 로컬 필터링
    const results = performSearch(query);
    setSearchResults(results);
  };

  const performSearch = (query: string): string[] => {
    // 검색 로직 구현
    return [];
  };

  return (
    <div>
      <SearchField
        placeholder="검색어를 입력하세요"
        value={searchValue}
        onChange={(_e: ChangeEvent<HTMLInputElement>, v: string): void => {
          setSearchValue(v);
        }}
        onSearch={handleSearch}
        onClear={(): void => {
          setSearchValue("");
          setSearchResults([]);
        }}
      />
      {/* 검색 결과 표시 */}
    </div>
  );
};`,
    PreviewComponent: SearchFieldPreview,
  },

  {
    id: "notice",
    label: "공지사항",
    title: "공지사항 리스트",
    description:
      "타이틀/날짜/뱃지 형태의 공지사항 리스트 컴포넌트입니다. 기본 데이터가 내장되어 있으며 items로 교체 가능하며, 로딩 상태를 skeleton으로 표시할 수 있습니다.",
    code: `import Notice from "./Notice";

type NoticeItem = {
  id: number;
  title: string;
  date: string;
  badge?: string;
  href: string;
};

const items: NoticeItem[] = [
  { id: 1, title: "시스템 점검 안내", date: "2025-01-23", badge: "안내", href: "#" },
  { id: 2, title: "개인정보 처리방침 개정", date: "2025-01-20", href: "#" },
];

<Notice
  title="공지사항"
  linkText="더보기"
  items={items}
  onClickMore={() => console.log("more")}
/>;
`,
    PreviewComponent: NoticePreview,
  },

  {
    id: "skeleton-placeholder",
    label: "스켈레톤",
    title: "스켈레톤 플레이스홀더",
    description:
      "리스트·카드 로딩 상태에 자주 쓰는 아바타/텍스트/버튼 조합 스켈레톤을 즉시 렌더링하는 헬퍼입니다.",
    code: `import SkeletonPlaceholder from "./Skeleton/SkeletonPlaceholder";
import { useState, useEffect } from "react";

// 기본 사용
<SkeletonPlaceholder lines={3} withAvatar={true} withActions={true} />;

// 다양한 옵션
<SkeletonPlaceholder lines={2} withAvatar={false} withActions={false} />;
<SkeletonPlaceholder lines={5} withAvatar={true} withActions={true} />;

// 상태 관리 예제
const SkeletonExample = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [items, setItems] = useState<Array<{ id: number; name: string }>>([]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setIsLoading(true);
      try {
        // API 호출 시뮬레이션
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setItems([
          { id: 1, name: "항목 1" },
          { id: 2, name: "항목 2" },
          { id: 3, name: "항목 3" },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div>
        {[1, 2, 3].map((index) => (
          <SkeletonPlaceholder
            key={index}
            lines={3}
            withAvatar={true}
            withActions={true}
          />
        ))}
      </div>
    );
  }

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
};

// 리스트 스켈레톤 예제
const ListSkeleton = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading ? (
        <>
          <SkeletonPlaceholder lines={2} withAvatar={true} withActions={false} />
          <SkeletonPlaceholder lines={2} withAvatar={true} withActions={false} />
          <SkeletonPlaceholder lines={2} withAvatar={true} withActions={false} />
        </>
      ) : (
        <div>데이터 표시</div>
      )}
    </div>
  );
};

// 카드 스켈레톤 예제
const CardSkeleton = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleLoad = async (): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  if (isLoading) {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
        {[1, 2, 3].map((index) => (
          <SkeletonPlaceholder
            key={index}
            lines={4}
            withAvatar={false}
            withActions={true}
          />
        ))}
      </div>
    );
  }

  return <div>카드 데이터</div>;
};`,
    PreviewComponent: SkeletonPlaceholderPreview,
  },

  {
    id: "empty-state",
    label: "비어있음",
    title: "EmptyState 컴포넌트",
    description: "데이터가 없을 때 안내 메시지와 아이콘을 보여주는 상태 컴포넌트입니다.",
    code: `import EmptyState from "./EmptyState";

// 기본 사용
<EmptyState
  title="검색 결과가 없습니다"
  description="다른 키워드로 다시 검색해 주세요."
  icon="info"
  action={{ label: "돌아가기", onClick: () => console.log("back") }}
/>;

// 다양한 아이콘과 액션
<EmptyState
  title="데이터가 없습니다"
  description="새로운 데이터를 추가해보세요."
  icon="empty"
  action={{ label: "추가하기", onClick: () => console.log("add") }}
/>;

// 액션 없이 사용
<EmptyState
  title="목록이 비어있습니다"
  description="아직 등록된 항목이 없습니다."
  icon="info"
/>;

// 상태 관리 예제
const EmptyStateExample = () => {
  const handleBack = (): void => {
    console.log("뒤로 가기");
    // 네비게이션 로직
  };

  const handleRefresh = (): void => {
    console.log("새로고침");
    // 데이터 새로고침 로직
  };

  return (
    <EmptyState
      title="검색 결과가 없습니다"
      description="다른 키워드로 다시 검색해 주세요."
      icon="info"
      action={{ label: "돌아가기", onClick: handleBack }}
    />
  );
};

// 조건부 렌더링 예제
const ListExample = () => {
  const items: string[] = [];

  if (items.length === 0) {
    return (
      <EmptyState
        title="항목이 없습니다"
        description="새로운 항목을 추가해보세요."
        icon="empty"
        action={{ label: "추가하기", onClick: () => console.log("add") }}
      />
    );
  }

  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};`,
    PreviewComponent: EmptyStatePreview,
  },

  {
    id: "error-state",
    label: "에러",
    title: "ErrorState 컴포넌트",
    description: "에러가 발생했을 때 메시지와 재시도 액션을 제공하는 컴포넌트입니다.",
    code: `import ErrorState from "./ErrorState";
import { useState } from "react";

// 기본 사용
<ErrorState
  title="네트워크 오류"
  message="잠시 후 다시 시도해 주세요."
  action={{ label: "재시도", onClick: () => console.log("retry") }}
/>;

// 다양한 에러 메시지
<ErrorState
  title="데이터를 불러올 수 없습니다"
  message="서버에 연결할 수 없습니다. 네트워크 연결을 확인해주세요."
  icon="error"
  action={{ label: "재시도", onClick: () => console.log("retry") }}
/>;

// 액션 없이 사용
<ErrorState
  title="권한이 없습니다"
  message="이 페이지에 접근할 권한이 없습니다."
  icon="error"
/>;

// 상태 관리 예제
const ErrorStateExample = () => {
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleRetry = async (): Promise<void> => {
    try {
      setHasError(false);
      // API 호출 또는 데이터 로드
      await fetchData();
    } catch (error) {
      setHasError(true);
      setErrorMessage(error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.");
    }
  };

  const fetchData = async (): Promise<void> => {
    // 데이터 로드 로직
  };

  if (hasError) {
    return (
      <ErrorState
        title="데이터를 불러올 수 없습니다"
        message={errorMessage || "잠시 후 다시 시도해 주세요."}
        action={{ label: "재시도", onClick: handleRetry }}
      />
    );
  }

  return <div>데이터 표시</div>;
};

// 에러 바운더리와 함께 사용
const DataLoader = () => {
  const [error, setError] = useState<Error | null>(null);

  const loadData = async (): Promise<void> => {
    try {
      // 데이터 로드 로직
    } catch (err) {
      setError(err instanceof Error ? err : new Error("알 수 없는 오류"));
    }
  };

  if (error) {
    return (
      <ErrorState
        title="오류가 발생했습니다"
        message={error.message}
        action={{ label: "다시 시도", onClick: () => {
          setError(null);
          loadData();
        }}}
      />
    );
  }

  return <div>데이터 로딩 중...</div>;
};`,
    PreviewComponent: ErrorStatePreview,
  },

  {
    id: "lottie",
    label: "로티",
    title: "Lottie 애니메이션",
    description: "lottie-react를 사용해 JSON 애니메이션을 재생하는 예시입니다.",
    code: `import LottieAnimation from "./Lottie";
import { useRef } from "react";
import type { LottieRef } from "lottie-react";
import successAnim from "../assets/lottie/success.json";

// 기본 사용
<LottieAnimation
  animationData={successAnim}
  loop={true}
  autoplay={true}
  width={200}
  height={200}
  onComplete={() => console.log("애니메이션 완료")}
/>;

// ref를 사용한 제어
const MyComponent = () => {
  const lottieRef = useRef<LottieRef>(null);

  const handlePlay = (): void => {
    lottieRef.current?.play();
  };

  const handlePause = (): void => {
    lottieRef.current?.pause();
  };

  const handleStop = (): void => {
    lottieRef.current?.stop();
  };

  const handleComplete = (): void => {
    console.log("애니메이션 완료");
  };

  const handleLoopComplete = (): void => {
    console.log("루프 완료");
  };

  return (
    <>
      <div>
        <button onClick={handlePlay}>재생</button>
        <button onClick={handlePause}>일시정지</button>
        <button onClick={handleStop}>정지</button>
      </div>
      <LottieAnimation
        lottieRef={lottieRef}
        animationData={successAnim}
        loop={false}
        autoplay={false}
        width={200}
        height={200}
        onComplete={handleComplete}
        onLoopComplete={handleLoopComplete}
      />
    </>
  );
};`,
    PreviewComponent: LottiePreview,
  },

  {
    id: "typography",
    label: "타이포그래피",
    title: "Typography 컴포넌트",
    description: "문단/제목/캡션 등 텍스트 스타일을 일관되게 적용합니다.",
    code: `import Typography from "./Typography";

<Typography as="h2" variant="headline" align="center">
  새로운 소식
</Typography>;
`,
    PreviewComponent: TypographyPreview,
  },
  {
    id: "color",
    label: "컬러",
    title: "Color & Theme 컴포넌트",
    description:
      "브랜드 컬러와 상태 컬러(success/warn/error/info)를 시각적으로 표시하는 컴포넌트입니다. 라이트 모드와 다크 모드에서의 컬러 차이를 비교할 수 있으며, CSS 변수명도 함께 표시됩니다. 컬러 팔레트와 테마 비교 기능을 제공합니다.",
    code: `import Color, { ColorPalette, ColorTheme } from "./Color";

type ColorItem = {
  name: string;
  value: string;
  description?: string;
  showVariable?: boolean;
};

type ThemeColorItem = {
  name: string;
  light: string;
  dark: string;
  variable: string;
};

const brandColors: ColorItem[] = [
  { name: "Primary", value: "#0c7c59", description: "메인 브랜드 컬러", showVariable: true },
  { name: "Primary Light", value: "rgba(12, 124, 89, 0.12)", description: "브랜드 컬러 배경" },
];

const statusColors: ColorItem[] = [
  { name: "Success", value: "#22c55e", description: "성공 상태" },
  { name: "Warning", value: "#fbbf24", description: "경고 상태" },
  { name: "Error", value: "#ef4444", description: "에러 상태" },
  { name: "Info", value: "#3b82f6", description: "정보 상태" },
];

const themeColors: ThemeColorItem[] = [
  { name: "Background", light: "#f5f6f7", dark: "#111315", variable: "--color-bg" },
  { name: "Text", light: "#1b1b1f", dark: "#f8f8fa", variable: "--color-text" },
];

<Color name="Primary" value="#0c7c59" description="메인 브랜드 컬러" showVariable />;
<ColorPalette title="브랜드 컬러" colors={brandColors} />;
<ColorPalette title="상태 컬러" colors={statusColors} />;
<ColorTheme colors={themeColors} />;`,
    PreviewComponent: ColorPreview,
  },
  {
    id: "spacing",
    label: "간격",
    title: "Spacing 컴포넌트",
    description:
      "일관된 간격 시스템을 제공하는 컴포넌트입니다. 4px부터 64px까지의 간격 토큰을 시각적으로 표시하며, 각 간격의 px와 rem 값을 함께 보여줍니다. 간격 사용 예시를 통해 실제 적용 방법을 확인할 수 있습니다.",
    code: `import Spacing, { SpacingScale, SpacingExample } from "./Spacing";

// ===== Props 설명 =====
// Spacing 컴포넌트:
//   value: 간격 값 (px)
//   name: 간격 이름 (선택)

// SpacingScale 컴포넌트:
//   title: 스케일 제목
//   values: 간격 배열 [{ value, name }]

// SpacingExample 컴포넌트:
//   title: 예시 제목
//   examples: 예시 배열 [{ label, value, code }]

// ===== 단일 간격 토큰 =====
<Spacing value={16} name="LG" />

// ===== 간격 스케일 =====
const spacingTokens = [
  { value: 4, name: "XS" },
  { value: 8, name: "SM" },
  { value: 16, name: "LG" },
  { value: 24, name: "2XL" },
  { value: 32, name: "3XL" },
];

<SpacingScale title="간격 토큰 스케일" values={spacingTokens} />

// ===== 간격 사용 예시 =====
const examples = [
  {
    label: "간격 16px",
    value: 16,
    code: "gap: px(16); // 또는 gap: 1rem;",
  },
];

<SpacingExample title="간격 사용 예시" examples={examples} />

// ===== SCSS에서 사용 =====
// px() 함수 사용
.my-element {
  padding: px(16);        // 16px → 1rem
  margin: px(24);         // 24px → 1.5rem
  gap: px(12);            // 12px → 0.75rem
}

// @include px 믹스인 사용
.my-element {
  @include px(padding, 16);
  @include px(margin, 24);
  @include px(gap, 12);
}

// ===== 유틸리티 클래스 사용 =====
<div className="p-16">패딩 16px</div>
<div className="m-24">마진 24px</div>
<div className="gap-12">간격 12px</div>

// ===== 주의사항 =====
// 1. 모든 간격은 4px 단위로 증가 (4, 8, 12, 16, 20, 24, 32, 40, 48, 64)
// 2. px() 함수는 자동으로 rem으로 변환 (16px = 1rem 기준)
// 3. 유틸리티 클래스는 10px 단위로 제공 (10~100px)
// 4. 간격 토큰은 일관된 디자인 시스템을 위해 사용`,
    PreviewComponent: SpacingPreview,
  },
  {
    id: "scroll-top",
    label: "스크롤 탑",
    title: "ScrollTop 컴포넌트",
    description:
      "페이지를 스크롤했을 때 나타나서 클릭하면 페이지 상단으로 이동하는 버튼 컴포넌트입니다. 일정 픽셀 이상 스크롤했을 때만 표시되며, 부드러운 스크롤 애니메이션을 지원합니다.",
    code: `import ScrollTop from "./ScrollTop";

// 기본 사용
<ScrollTop />;

// 커스텀 옵션
<ScrollTop 
  showAfter={400}  // 400px 이상 스크롤했을 때 표시
  smooth={true}    // 부드러운 스크롤 사용
/>;

// 즉시 표시 (스크롤 위치와 무관)
<ScrollTop showAfter={0} />;

// 즉시 스크롤 (애니메이션 없음)
<ScrollTop smooth={false} />;

// 상태 관리 예제
const PageWithScrollTop = () => {
  return (
    <div>
      {/* 페이지 콘텐츠 */}
      <div style={{ minHeight: "200vh" }}>
        <h1>긴 페이지 콘텐츠</h1>
        <p>스크롤을 내려보세요...</p>
      </div>
      
      {/* 스크롤 탑 버튼 */}
      <ScrollTop showAfter={300} smooth={true} />
    </div>
  );
};`,
    PreviewComponent: ScrollTopPreview,
  },
  {
    id: "layout",
    label: "레이아웃",
    title: "Layout 컴포넌트",
    description:
      "컨테이너 폭과 그리드 시스템을 시각적으로 표시하는 컴포넌트입니다. 모바일, 태블릿, 데스크톱 등 다양한 화면 크기에 맞는 컨테이너 폭을 확인할 수 있으며, 2열부터 12열까지의 그리드 시스템을 미리볼 수 있습니다.",
    code: `import Container, { ContainerScale, GridSystem } from "./Layout";

// ===== Props 설명 =====
// Container 컴포넌트:
//   name: 컨테이너 이름
//   width: 컨테이너 폭 (px)
//   description: 설명

// ContainerScale 컴포넌트:
//   title: 스케일 제목
//   containers: 컨테이너 배열 [{ name, width, description }]

// GridSystem 컴포넌트:
//   title: 그리드 시스템 제목
//   grids: 그리드 배열 [{ columns, gap, name }]

// ===== 단일 컨테이너 =====
<Container
  name="Desktop"
  width={1200}
  description="데스크톱 기본 폭"
/>

// ===== 컨테이너 스케일 =====
const containers = [
  { name: "Mobile", width: 375, description: "모바일 기본 폭" },
  { name: "Tablet", width: 768, description: "태블릿 기본 폭" },
  { name: "Desktop", width: 1200, description: "데스크톱 기본 폭" },
];

<ContainerScale title="컨테이너 폭" containers={containers} />

// ===== 그리드 시스템 =====
const grids = [
  { columns: 2, gap: 16, name: "2 Column Grid" },
  { columns: 3, gap: 16, name: "3 Column Grid" },
  { columns: 4, gap: 16, name: "4 Column Grid" },
  { columns: 12, gap: 16, name: "12 Column Grid" },
];

<GridSystem title="그리드 시스템" grids={grids} />

// ===== SCSS에서 사용 =====
// 컨테이너 폭 설정
.container {
  width: 100%;
  max-width: px(1200);
  margin: 0 auto;
  padding: 0 px(20);
}

// 그리드 레이아웃
.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: px(16);
}

.grid-item {
  grid-column: span 4; // 12열 중 4열 차지
}

// 반응형 그리드
.responsive-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: px(16);

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

// ===== 주의사항 =====
// 1. 컨테이너 폭은 max-width로 설정하여 반응형 지원
// 2. 그리드 gap은 간격 토큰을 사용 (8, 12, 16, 24px 등)
// 3. 모바일 우선 접근 방식 권장
// 4. 그리드 시스템은 flexbox와 함께 사용 가능`,
    PreviewComponent: LayoutSpacingPreview,
  },
  {
    id: "script",
    label: "스크립트",
    title: "JavaScript 인터랙션",
    description:
      "React의 이벤트 핸들링, 상태 관리, API 연동을 포함한 인터랙션 구현 패턴입니다. 사용자 입력에 따라 UI가 동적으로 변화합니다.",
    code: `import { useState, useEffect, useRef } from "react";

// ===== 상태 관리 =====
// useState를 사용하여 컴포넌트의 상태를 관리합니다.
const [count, setCount] = useState(0);
const [data, setData] = useState(null);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);

// ===== 이벤트 핸들러 =====
// 사용자 상호작용에 반응하는 함수입니다.
const handleClick = () => {
  // 함수형 업데이트를 사용하여 이전 값을 기반으로 상태를 업데이트합니다.
  setCount(prev => prev + 1);
};

// 인라인 핸들러
<button onClick={() => setCount(count + 1)}>
  클릭: {count}
</button>

// ===== 비동기 데이터 로드 =====
// fetch API를 사용하여 서버에서 데이터를 가져옵니다.
const loadData = async () => {
  setIsLoading(true);
  setError(null);
  
  try {
    const response = await fetch('/api/data');
    
    // HTTP 상태 코드 확인
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const data = await response.json();
    setData(data);
  } catch (error) {
    console.error('데이터 로드 실패:', error);
    setError(error.message);
  } finally {
    setIsLoading(false);
  }
};

// ===== useEffect를 사용한 데이터 로드 =====
// 컴포넌트 마운트 시 자동으로 데이터를 로드합니다.
useEffect(() => {
  loadData();
}, []); // 빈 배열: 마운트 시 한 번만 실행

// 의존성 배열이 있는 경우
useEffect(() => {
  loadData();
}, [userId]); // userId가 변경될 때마다 실행

// ===== 폼 제출 =====
// 폼 제출 이벤트를 처리합니다.
const handleSubmit = (event) => {
  event.preventDefault(); // 기본 폼 제출 동작 방지
  
  // 폼 데이터 수집
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  
  // 폼 데이터 처리
  console.log('폼 제출됨:', data);
  
  // 서버에 전송
  submitForm(data);
};

// ===== 입력 필드 제어 =====
// Controlled 컴포넌트: React 상태로 입력 값을 제어합니다.
const [inputValue, setInputValue] = useState("");

const handleChange = (e) => {
  setInputValue(e.target.value);
};

<input
  type="text"
  value={inputValue}
  onChange={handleChange}
/>

// ===== 조건부 렌더링 =====
// 상태에 따라 다른 UI를 표시합니다.
{isLoading && <Loading />}
{error && <Error message={error} />}
{data && <DataDisplay data={data} />}

// 삼항 연산자
{isLoggedIn ? <UserDashboard /> : <LoginForm />}

// && 연산자 (조건이 true일 때만 렌더링)
{hasItems && <ItemList items={items} />}

// ===== 리스트 렌더링 =====
// 배열 데이터를 리스트로 렌더링합니다.
const items = [
  { id: 1, name: "아이템 1" },
  { id: 2, name: "아이템 2" },
  { id: 3, name: "아이템 3" },
];

return (
  <ul>
    {items.map(item => (
      <li key={item.id}>{item.name}</li>
    ))}
  </ul>
);

// ===== useRef를 사용한 DOM 참조 =====
// DOM 요소에 직접 접근해야 할 때 사용합니다.
const inputRef = useRef(null);

const handleFocus = () => {
  inputRef.current?.focus();
};

<input ref={inputRef} type="text" />

// ===== 타이머 관리 =====
// setTimeout/setInterval을 사용할 때는 cleanup이 필요합니다.
useEffect(() => {
  const timer = setTimeout(() => {
    console.log("5초 후 실행");
  }, 5000);
  
  // cleanup: 컴포넌트 언마운트 시 타이머 제거
  return () => clearTimeout(timer);
}, []);

// ===== 이벤트 리스너 등록 =====
// window 이벤트나 document 이벤트를 사용할 때 cleanup이 필요합니다.
useEffect(() => {
  const handleResize = () => {
    console.log("윈도우 크기 변경:", window.innerWidth);
  };
  
  window.addEventListener('resize', handleResize);
  
  // cleanup: 컴포넌트 언마운트 시 이벤트 리스너 제거
  return () => window.removeEventListener('resize', handleResize);
}, []);

// ===== 커스텀 훅 =====
// 재사용 가능한 로직을 커스텀 훅으로 분리합니다.
const useCounter = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(initialValue);
  
  return { count, increment, decrement, reset };
};

// 사용
const { count, increment, decrement, reset } = useCounter(0);

// ===== 에러 처리 =====
// try-catch를 사용하여 에러를 처리합니다.
const handleAction = async () => {
  try {
    await riskyOperation();
  } catch (error) {
    console.error("에러 발생:", error);
    setError(error.message);
    // 사용자에게 에러 메시지 표시
    showToast("작업 중 오류가 발생했습니다.");
  }
};

// ===== 주의사항 =====
// 1. useState의 함수형 업데이트를 사용하면 최신 상태를 보장할 수 있습니다.
// 2. useEffect의 cleanup 함수를 항상 제공하여 메모리 누수를 방지해야 합니다.
// 3. 의존성 배열을 올바르게 설정하여 불필요한 재실행을 방지해야 합니다.
// 4. 비동기 작업은 항상 에러 처리를 포함해야 합니다.
// 5. 폼 제출 시 event.preventDefault()를 호출하여 기본 동작을 방지해야 합니다.
// 6. 리스트 렌더링 시 key prop을 고유한 값으로 제공해야 합니다.
// 7. useRef로 참조한 DOM 요소는 current 속성으로 접근합니다.
// 8. 조건부 렌더링 시 null을 반환하면 아무것도 렌더링되지 않습니다.
// 9. 비동기 함수는 async/await 또는 .then()을 사용하여 처리합니다.
// 10. 상태 업데이트는 비동기적으로 처리되므로, 즉시 반영되지 않을 수 있습니다.`,
    PreviewComponent: ScriptPreview,
  },
  {
    id: "pagination",
    label: "페이지네이션",
    title: "페이지네이션 레이아웃",
    description:
      "대량의 데이터를 여러 페이지로 나누어 표시하는 네비게이션 컴포넌트입니다. 현재 페이지 표시와 이전/다음 이동 기능을 제공하며, 긴 목록을 효율적으로 탐색할 수 있습니다.",
    code: `import { useEffect, useState } from "react";

type PageItem = { id: number; title: string };
type PageResponse = { items: PageItem[]; total: number };

const PAGE_SIZE = 10;

const [page, setPage] = useState<number>(1);
const [total, setTotal] = useState<number>(0);
const [items, setItems] = useState<PageItem[]>([]);

const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

const loadPage = async (nextPage: number) => {
  const res = await fetch(\`/api/items?page=\${nextPage}&limit=\${PAGE_SIZE}\`);
  const data: PageResponse = await res.json();
  setItems(data.items);
  setTotal(data.total);
};

useEffect(() => {
  loadPage(page);
}, [page]);

const go = (nextPage: number) => {
  if (nextPage < 1 || nextPage > totalPages) return;
  setPage(nextPage);
};

<div className="pagination">
  <button onClick={() => go(page - 1)} disabled={page === 1}>
    이전
  </button>
  {Array.from({ length: totalPages }, (_v, i) => i + 1).map((p) => (
    <button
      key={p}
      onClick={() => go(p)}
      aria-current={p === page ? "page" : undefined}
      className={p === page ? "active" : ""}
    >
      {p}
    </button>
  ))}
  <button onClick={() => go(page + 1)} disabled={page === totalPages}>
    다음
  </button>
</div>;`,
    PreviewComponent: PaginationPreview,
  },
  {
    id: "weather",
    label: "날씨",
    title: "날씨 컴포넌트",
    description:
      "실시간 날씨 정보를 표시하는 컴포넌트입니다. OpenWeatherMap API를 사용하여 날씨 데이터를 가져오거나 목업 데이터를 사용할 수 있습니다. 날씨 아이콘, 온도, 날씨 상태를 표시합니다.",
    code: `import Weather from "./Weather";

// ===== Props 설명 (TypeScript) =====
// city?: string;              // 날씨 정보를 조회할 도시 이름 (기본값: "Seoul")
// apiKey?: string;            // OpenWeatherMap API 키 (환경 변수 REACT_APP_WEATHER_API_KEY가 없을 경우 사용)
// useMock?: boolean;          // 목업 데이터 사용 여부 (기본값: true)
// useGPS?: boolean;           // GPS 위치 기반 날씨 조회 여부 (기본값: false)
// className?: string;         // 추가 CSS 클래스명

// ===== 기본 사용 (목업 데이터) =====
// city, apiKey, useMock을 지정하지 않으면 기본값으로 목업 데이터를 사용합니다.
<Weather />;

// ===== 특정 도시 지정 (목업 데이터) =====
// useMock을 명시하지 않으면 기본값 true로 목업 데이터를 사용합니다.
<Weather city="Busan" />;
<Weather city="Jeju" />;
<Weather city="Incheon" />;

// ===== 목업 데이터 명시적 사용 =====
<Weather city="Busan" useMock={true} />;

// ===== 실제 API 사용 =====
// OpenWeatherMap API를 사용하려면 useMock={false}를 설정하고 API 키를 제공해야 합니다.
// 방법 1: apiKey prop으로 직접 전달
<Weather 
  city="Seoul" 
  apiKey="your-api-key-here" 
  useMock={false} 
/>;

// 방법 2: 환경 변수 사용 (권장)
// .env 파일에 REACT_APP_WEATHER_API_KEY=your-api-key-here 추가
// 개발 서버 재시작 필요
<Weather city="Seoul" useMock={false} />;
<Weather city="Busan" useMock={false} />;

// ===== GPS 위치 기반 날씨 조회 =====
// useGPS={true}를 설정하면 현재 위치의 GPS 신호를 사용하여 날씨 정보를 가져옵니다.
// 브라우저에서 위치 권한을 요청하며, 허용 시 현재 위치의 날씨 정보가 표시됩니다.
// useMock={false}와 함께 사용해야 실제 API를 통해 GPS 위치의 날씨를 가져옵니다.
<Weather useGPS={true} useMock={false} />;

// ===== 추가 클래스명 적용 =====
<Weather className="custom-weather" />;
<Weather city="Seoul" className="weather-card" useMock={true} />;

// ===== 여러 도시 날씨 표시 =====
const WeatherDashboard = () => {
  const cities = ["Seoul", "Busan", "Jeju", "Incheon"];
  
  return (
    <div className="weather-dashboard">
      {cities.map((city) => (
        <Weather 
          key={city} 
          city={city} 
          useMock={true}
          className="weather-item"
        />
      ))}
    </div>
  );
};

// ===== 조건부 API 사용 =====
// 환경 변수에 API 키가 있으면 실제 API 사용, 없으면 목업 사용
const WeatherWithFallback = () => {
  const hasApiKey = !!process.env.REACT_APP_WEATHER_API_KEY;
  
  return (
    <Weather 
      city="Seoul" 
      useMock={!hasApiKey}
    />
  );
};

// ===== 상태 관리와 함께 사용 =====
import { useState } from "react";

const WeatherSelector = () => {
  const [selectedCity, setSelectedCity] = useState<string>("Seoul");
  const [useApi, setUseApi] = useState<boolean>(false);
  
  return (
    <div>
      <select 
        value={selectedCity} 
        onChange={(e) => setSelectedCity(e.target.value)}
      >
        <option value="Seoul">서울</option>
        <option value="Busan">부산</option>
        <option value="Jeju">제주</option>
      </select>
      
      <label>
        <input 
          type="checkbox" 
          checked={useApi} 
          onChange={(e) => setUseApi(e.target.checked)}
        />
        실제 API 사용
      </label>
      
      <Weather 
        city={selectedCity} 
        useMock={!useApi}
      />
    </div>
  );
};

// ===== 컴포넌트 구조 =====
// Weather
// └── Card (variant="content")
//     ├── 로딩 상태: Loading 컴포넌트
//     ├── 에러 상태: ErrorState 컴포넌트
//     └── 날씨 정보
//         ├── weather__top
//         │   ├── weather__icon (이모지 아이콘)
//         │   └── weather__temp (온도)
//         └── weather__text (날씨 상태 설명)

// ===== 상태 관리 =====
// 컴포넌트 내부에서 다음 상태를 관리합니다:
// - weather: 현재 날씨 데이터 (WeatherData | null)
// - loading: 로딩 상태 (boolean)
// - error: 에러 메시지 (string | null)

// ===== API 호출 =====
// OpenWeatherMap API를 사용합니다:
// - 엔드포인트: https://api.openweathermap.org/data/2.5/weather
// - 파라미터:
//   - q: 도시 이름
//   - appid: API 키
//   - units: metric (섭씨 온도)
//   - lang: kr (한국어 응답)

// ===== 에러 처리 =====
// - API 호출 실패 시 ErrorState 컴포넌트로 에러 메시지 표시
// - 목업 데이터로 자동 폴백하지 않음 (에러 상태 유지)
// - 에러 메시지는 "api 호출 안됌"으로 표시

// ===== 주의사항 =====
// 1. API 키 필요: 실제 날씨 데이터를 사용하려면 OpenWeatherMap API 키가 필요합니다.
//    - API 키 발급: https://openweathermap.org/api
// 2. CORS 정책: 브라우저에서 직접 API를 호출할 경우 CORS 정책에 의해 차단될 수 있습니다.
//    이 경우 프록시 서버를 사용하거나 백엔드 API를 통해 호출해야 합니다.
// 3. 목업 모드: 개발 중에는 useMock={true}를 사용하여 API 호출 없이 테스트할 수 있습니다.
// 4. 로딩 시간: 목업 데이터도 500ms의 로딩 시간을 시뮬레이션합니다.
// 5. 에러 상태: API 호출 실패 시 목업 데이터로 폴백하지 않고 에러 상태를 유지합니다.
// 6. 환경 변수: .env 파일에 REACT_APP_WEATHER_API_KEY를 설정한 후 개발 서버를 재시작해야 합니다.
// 7. 날씨 아이콘: 날씨 상태에 따라 자동으로 이모지 아이콘이 매핑됩니다.
//    - 맑음/clear → ☀️
//    - 구름/cloud → ☁️
//    - 비/rain → 🌧️
//    - 눈/snow → ❄️
//    - 안개/fog → 🌫️
//    - 기본값 → ☁️☀️

// ===== 의존성 컴포넌트 =====
// - Typography: 날씨 정보 텍스트 표시
// - Card: 날씨 정보를 담는 카드 컨테이너
// - Loading: 로딩 상태 표시
// - ErrorState: 에러 상태 표시

// ===== 접근성 =====
// - Card 컴포넌트를 통해 시맨틱한 구조 제공
// - Typography 컴포넌트를 통해 적절한 텍스트 스타일링
// - 로딩 및 에러 상태에 대한 명확한 피드백 제공
`,
    PreviewComponent: WeatherPreview,
  },
  {
    id: "common-layout",
    label: "공통 레이아웃",
    title: "CommonLayout 컴포넌트",
    description:
      "Header, Footer, BottomDock, ScrollTop을 통합한 공통 레이아웃 컴포넌트입니다. 여러 페이지에서 일관된 레이아웃 구조를 제공하며, 각 요소의 표시 여부와 동작을 props로 제어할 수 있습니다.",
    code: `import CommonLayout from "./CommonLayout";
import { useState } from "react";

// ===== Props 설명 (TypeScript) =====
// children: ReactNode;                    // 레이아웃 내부에 표시할 컨텐츠
// headerVariant?: "main" | "sub";        // 헤더 타입
// headerCategoryName?: string;           // 서브 헤더에 표시할 카테고리명
// headerOnBack?: () => void;             // 뒤로가기 버튼 클릭 시 실행할 함수
// headerShowUtilities?: boolean;        // 헤더 유틸리티 버튼 표시 여부
// headerSticky?: boolean;                // 헤더 고정 여부 (기본값: true)
// headerCurrentPage?: string;           // 현재 선택된 페이지
// headerOnPageChange?: (page: string) => void; // 페이지 변경 시 실행할 함수
// headerOnCartClick?: () => void;        // 장바구니 아이콘 클릭 시 실행할 함수
// headerOnUtilityClick?: (key: string) => void; // 헤더 유틸리티 버튼 클릭 시 실행할 함수
// showFooter?: boolean;                  // 푸터 표시 여부
// footerNav?: Array<{ label: string; href: string }>; // 푸터 네비게이션 링크 배열
// footerInfo?: { address: string; contact: string }; // 푸터 정보
// footerSns?: string[];                  // 푸터 SNS 링크 배열
// footerLogo?: string;                   // 푸터 로고 이미지 경로
// showBottomDock?: boolean;              // 하단 도크 표시 여부
// bottomDockItems?: Array<{ key: string; label: string; icon: string }>; // 하단 도크 아이템 배열
// bottomDockOnChange?: (key: string) => void; // 하단 도크 아이템 변경 시 실행할 함수
// bottomDockDefaultActive?: string;       // 하단 도크 기본 활성화 아이템 키
// bottomDockPosition?: "fixed" | "relative"; // 하단 도크 위치
// showScrollTop?: boolean;                // 스크롤 탑 버튼 표시 여부
// scrollTopShowAfter?: number;           // 스크롤 탑 버튼이 나타날 스크롤 픽셀 값 (기본값: 100)
// scrollTopSmooth?: boolean;              // 스크롤 탑 버튼 부드러운 스크롤 사용 여부 (기본값: true)
// customHeader?: ReactNode;              // 커스텀 헤더 컴포넌트
// className?: string;                     // 추가 클래스명

// ===== 기본 사용 (서브 헤더) =====
<CommonLayout
  headerVariant="sub"
  headerCategoryName="카테고리"
  headerOnBack={() => navigate(-1)}
>
  <div>컨텐츠 영역</div>
</CommonLayout>;

// ===== 메인 헤더 + BottomDock =====
const [currentPage, setCurrentPage] = useState("home");
const [activeDock, setActiveDock] = useState("home");

const bottomDockItems = [
  { key: "home", label: "홈", icon: "🏠" },
  { key: "search", label: "검색", icon: "🔍" },
  { key: "profile", label: "프로필", icon: "👤" },
];

<CommonLayout
  headerVariant="main"
  headerCurrentPage={currentPage}
  headerOnPageChange={(page) => setCurrentPage(page)}
  showBottomDock={true}
  bottomDockItems={bottomDockItems}
  bottomDockOnChange={(key) => setActiveDock(key)}
  bottomDockDefaultActive="home"
  bottomDockPosition="fixed"
  showScrollTop={true}
  scrollTopShowAfter={100}
  scrollTopSmooth={true}
>
  <div>컨텐츠 영역</div>
</CommonLayout>;

// ===== 푸터 포함 =====
<CommonLayout
  headerVariant="sub"
  headerCategoryName="페이지"
  showFooter={true}
  footerNav={[
    { label: "회사소개", href: "/company" },
    { label: "이용약관", href: "/terms" },
  ]}
  footerInfo={{
    address: "서울특별시 강남구",
    contact: "02-1234-5678",
  }}
  footerSns={["Instagram", "Facebook"]}
  footerLogo="STARBUCKS"
>
  <div>컨텐츠 영역</div>
</CommonLayout>;

// ===== 커스텀 헤더 사용 =====
<CommonLayout
  customHeader={
    <Header
      variant="main"
      notificationCount={3}
      onLogoClick={() => console.log("로고 클릭")}
      onNotificationClick={() => console.log("알림 클릭")}
    />
  }
  showBottomDock={true}
  bottomDockItems={bottomDockItems}
>
  <div>컨텐츠 영역</div>
</CommonLayout>;

// ===== ScrollTop만 사용 =====
<CommonLayout
  headerVariant="sub"
  headerCategoryName="페이지"
  showScrollTop={true}
  scrollTopShowAfter={200}
  scrollTopSmooth={true}
>
  <div>긴 컨텐츠 영역</div>
</CommonLayout>;

// ===== 주의사항 =====
// 1. headerVariant가 "main"일 때는 headerCurrentPage와 headerOnPageChange를 함께 사용해야 합니다.
// 2. showBottomDock이 true일 때는 bottomDockItems와 bottomDockOnChange를 필수로 제공해야 합니다.
// 3. bottomDockPosition이 "relative"일 때는 하단 도크가 일반 컨텐츠처럼 배치됩니다.
// 4. customHeader를 사용하면 headerVariant 관련 props는 무시됩니다.
// 5. showFooter가 true일 때는 footerNav, footerInfo 등을 제공하는 것이 좋습니다.`,
    PreviewComponent: CommonLayoutPreview,
  },
  {
    id: "loading-grid",
    label: "로딩 그리드",
    title: "LoadingGrid 컴포넌트",
    description:
      "Skeleton 컴포넌트를 그리드 형태로 배치한 로딩 인디케이터입니다. 카드 리스트나 상품 목록 등의 로딩 상태를 표시할 때 사용합니다. count와 columns props로 개수와 열 수를 조절할 수 있습니다.",
    code: `import LoadingGrid from "./LoadingGrid";

// ===== Props 설명 (TypeScript) =====
// count?: number;        // 표시할 스켈레톤 개수 (기본값: 12)
// columns?: number;     // 그리드 열 수 (기본값: 5)
// className?: string;    // 추가 CSS 클래스명

// ===== 기본 사용 =====
<LoadingGrid />;

// ===== 개수와 열 수 지정 =====
<LoadingGrid count={12} columns={5} />;
<LoadingGrid count={6} columns={3} />;
<LoadingGrid count={8} columns={4} />;

// ===== 컨테이너 내에서 사용 =====
// LoadingGrid는 자동으로 컨테이너의 너비에 맞춰 조정됩니다.
// max-width: 100%, overflow: hidden이 자동으로 적용되어 컨테이너를 넘지 않습니다.
<div style={{ width: "100%", maxWidth: "1200px", padding: "20px" }}>
  <LoadingGrid count={12} columns={5} />
</div>;

// ===== 실제 데이터 로딩과 함께 사용 =====
import { useState, useEffect } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <LoadingGrid count={12} columns={5} />;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

// ===== 반응형 동작 =====
// 모바일 환경(480px 이하)에서는 자동으로 2열로 변경됩니다.
// 5열, 4열, 6열 그리드는 모바일에서 2열로 자동 조정됩니다.
// 3열 그리드도 모바일에서 2열로 변경됩니다.

// ===== 컴포넌트 구조 =====
// LoadingGrid
// └── loading-grid (그리드 컨테이너)
//     └── loading-grid__card (각 카드)
//         ├── loading-grid__thumb (썸네일 영역, aspect-ratio: 4/3)
//         │   └── Skeleton (이미지 스켈레톤)
//         └── loading-grid__lines (텍스트 라인 영역)
//             ├── Skeleton (80% 너비, 12px 높이)
//             ├── Skeleton (70% 너비, 10px 높이)
//             └── Skeleton (60% 너비, 10px 높이)

// ===== 주의사항 =====
// 1. count는 표시할 스켈레톤 카드의 총 개수입니다.
// 2. columns는 그리드의 열 수를 지정하며, CSS grid의 repeat() 함수를 사용합니다.
// 3. 각 스켈레톤 카드는 썸네일 이미지(4:3 비율)와 텍스트 라인 3개로 구성됩니다.
// 4. 실제 데이터가 로드되면 LoadingGrid를 제거하고 실제 컨텐츠를 표시합니다.
// 5. LoadingGrid는 자동으로 컨테이너의 너비에 맞춰 조정되며, 컨테이너를 넘지 않습니다.
// 6. 그리드 열은 minmax(0, 1fr)를 사용하여 컨테이너 너비에 맞춰 자동으로 조정됩니다.
// 7. 모바일 환경에서는 미디어쿼리를 통해 자동으로 2열로 변경됩니다.`,
    PreviewComponent: LoadingGridPreview,
  },
  {
    id: "accessibility-helper",
    label: "접근성 도우미",
    title: "AccessibilityHelper 컴포넌트",
    description:
      "다크모드와 폰트 크기 조절 기능을 제공하는 접근성 도우미 컴포넌트입니다. 오른쪽 하단에 고정되어 있으며, 클릭하면 패널이 열려 테마와 폰트 크기를 변경할 수 있습니다. PageTemplate 컴포넌트 내부에서 자동으로 사용됩니다.",
    code: `import AccessibilityHelper from "./AccessibilityHelper";
import { useState } from "react";

// ===== Props 설명 (TypeScript) =====
// isDarkMode: boolean;                    // 다크모드 활성화 여부
// setIsDarkMode: (value: boolean) => void; // 다크모드 변경 함수
// fontScale: "small" | "normal" | "large" | "xlarge"; // 폰트 크기
// setFontScale: (value: string) => void;  // 폰트 크기 변경 함수

// ===== 기본 사용 =====
const [isDarkMode, setIsDarkMode] = useState(false);
const [fontScale, setFontScale] = useState("normal");

<AccessibilityHelper
  isDarkMode={isDarkMode}
  setIsDarkMode={setIsDarkMode}
  fontScale={fontScale}
  setFontScale={setFontScale}
/>;

// ===== PageTemplate 내부에서 자동 사용 =====
// PageTemplate 컴포넌트를 사용하면 AccessibilityHelper가 자동으로 포함됩니다.
import PageTemplate from "./PageTemplate";

<PageTemplate title="페이지 제목">
  <div>페이지 컨텐츠</div>
</PageTemplate>;

// ===== 수동으로 다크모드 제어 =====
const [isDarkMode, setIsDarkMode] = useState(() => {
  // localStorage에서 저장된 설정 불러오기
  const stored = localStorage.getItem("accessibility-theme");
  return stored === "dark";
});

useEffect(() => {
  // 다크모드 변경 시 localStorage에 저장
  document.documentElement.dataset.theme = isDarkMode ? "dark" : "light";
  localStorage.setItem("accessibility-theme", isDarkMode ? "dark" : "light");
}, [isDarkMode]);

<AccessibilityHelper
  isDarkMode={isDarkMode}
  setIsDarkMode={setIsDarkMode}
  fontScale={fontScale}
  setFontScale={setFontScale}
/>;

// ===== 폰트 크기 옵션 =====
// - small: 작게
// - normal: 보통 (기본값)
// - large: 크게
// - xlarge: 아주 크게

// ===== 주의사항 =====
// 1. AccessibilityHelper는 오른쪽 하단에 고정되어 있습니다.
// 2. 패널이 열리면 오른쪽에서 슬라이드 애니메이션으로 나타납니다.
// 3. 다크모드 변경 시 document.documentElement.dataset.theme이 자동으로 업데이트됩니다.
// 4. 폰트 크기 변경 시 document.documentElement.dataset.fontScale이 자동으로 업데이트됩니다.
// 5. 설정은 localStorage에 자동으로 저장되어 다음 방문 시에도 유지됩니다.
// 6. PageTemplate을 사용하면 이러한 설정 관리가 자동으로 처리됩니다.`,
    PreviewComponent: AccessibilityHelperPreview,
  },
  {
    id: "page-template",
    label: "페이지 템플릿",
    title: "PageTemplate 컴포넌트",
    description:
      "접근성 기능(다크모드, 폰트 스케일 조절)을 포함한 페이지 템플릿 컴포넌트입니다. 페이지를 감싸면 자동으로 AccessibilityHelper가 포함되며, 다크모드와 폰트 크기 설정이 localStorage에 저장되어 다음 방문 시에도 유지됩니다.",
    code: `import PageTemplate from "./PageTemplate";

// ===== Props 설명 (TypeScript) =====
// children: ReactNode;    // 페이지 컨텐츠
// title?: string;        // 페이지 제목 (기본값: "페이지 제목")

// ===== 기본 사용 =====
<PageTemplate title="내 페이지">
  <div>페이지 컨텐츠</div>
</PageTemplate>;

// ===== 접근성 기능 =====
// PageTemplate을 사용하면 다음 기능이 자동으로 제공됩니다:
// 1. 다크모드 자동 감지 및 적용 (localStorage 저장)
// 2. 큰글씨 모드 지원 (작게, 보통, 크게, 아주 크게)
// 3. 오른쪽 접근성 도우미 자동 포함
// 4. 반응형 최대 너비 설정 (1200px)
// 5. FOUC 방지 (초기 로드 시 깜빡임 없음)

// ===== 실제 페이지 예제 =====
import PageTemplate from "./PageTemplate";
import Header from "./Header";
import "./MyPage.scss";

const MyPage = () => {
  return (
    <PageTemplate title="내 페이지">
      <div className="my-page">
        <Header variant="main" />
        <main className="my-page__main">
          <h1>페이지 제목</h1>
          <p>페이지 컨텐츠입니다.</p>
        </main>
      </div>
    </PageTemplate>
  );
};

export default MyPage;

// ===== 다크모드 동작 =====
// 1. 시스템 설정을 기본값으로 사용합니다.
// 2. 사용자가 다크모드를 변경하면 localStorage에 저장됩니다.
// 3. 다음 방문 시 저장된 설정을 우선 사용합니다.
// 4. document.documentElement.dataset.theme이 "dark" 또는 "light"로 설정됩니다.

// ===== 폰트 스케일 동작 =====
// 1. 기본값은 "normal"입니다.
// 2. 사용자가 폰트 크기를 변경하면 localStorage에 저장됩니다.
// 3. 다음 방문 시 저장된 설정을 사용합니다.
// 4. document.documentElement.dataset.fontScale이 "small", "normal", "large", "xlarge"로 설정됩니다.
// 5. .font-scale-applied 클래스가 적용된 영역에만 폰트 크기가 적용됩니다.

// ===== CommonLayout과 함께 사용 =====
import PageTemplate from "./PageTemplate";
import CommonLayout from "./CommonLayout";

const MyPage = () => {
  return (
    <PageTemplate title="내 페이지">
      <CommonLayout
        headerVariant="sub"
        headerCategoryName="카테고리"
        showScrollTop={true}
      >
        <div>컨텐츠</div>
      </CommonLayout>
    </PageTemplate>
  );
};

// ===== 주의사항 =====
// 1. PageTemplate은 페이지의 최상위 래퍼로 사용해야 합니다.
// 2. 다크모드와 폰트 스케일 설정은 localStorage에 저장되므로 브라우저별로 다를 수 있습니다.
// 3. 폰트 스케일은 .font-scale-applied 클래스가 적용된 영역에만 적용됩니다.
// 4. AccessibilityHelper는 자동으로 포함되므로 별도로 추가할 필요가 없습니다.
// 5. 시스템 다크모드 설정을 감지하여 초기 테마를 결정합니다.`,
    PreviewComponent: PageTemplatePreview,
  },
];

// 1뎁스 그룹 구성 (LNB용) - ㄱ~ㅎ 순서로 정렬
const guideGroups = [
  {
    id: "navigation-group",
    label: "네비게이션",
    items: ["accordion", "dock", "pagination", "scroll-top", "tab"],
  },
  {
    id: "data-display-group",
    label: "데이터 표시",
    items: ["table"],
  },
  {
    id: "api-data-group",
    label: "API 데이터",
    items: ["datalist"],
  },
  {
    id: "design-system-group",
    label: "디자인 시스템",
    items: ["color", "icon", "layout", "spacing", "typography"],
  },
  {
    id: "layout-group",
    label: "레이아웃",
    items: ["common-layout", "footer", "header", "page-template"],
  },
  {
    id: "list-card-group",
    label: "리스트 & 카드",
    items: ["card", "list", "list-container", "notice", "weather"],
  },
  {
    id: "media-group",
    label: "미디어",
    items: ["carousel", "image", "image-zoom", "lottie"],
  },
  {
    id: "button-toggle-group",
    label: "버튼 & 토글",
    items: ["border-animation", "button", "toggle"],
  },
  {
    id: "input-group",
    label: "입력 컴포넌트",
    items: ["file-upload", "input", "search-field", "select", "textarea"],
  },
  {
    id: "selection-group",
    label: "선택 컴포넌트",
    items: ["checkbox", "radio"],
  },
  {
    id: "status-group",
    label: "상태 & 로딩",
    items: ["badge", "empty-state", "error-state", "loading", "loading-grid", "skeleton-placeholder"],
  },
  {
    id: "feedback-group",
    label: "피드백",
    items: ["popup", "toast", "tooltip"],
  },
  {
    id: "dropdown-picker-group",
    label: "드롭다운 & 피커",
    items: ["datepicker", "dropdown"],
  },
  {
    id: "functional-group",
    label: "기능 컴포넌트",
    items: ["accessibility-helper", "dnd", "listsync", "more"],
  },
  {
    id: "form-group",
    label: "폼 예제",
    items: ["form"],
  },
];

// id로 빠르게 조회하기 위한 맵
const sectionMap = guideSections.reduce((acc, cur) => {
  acc[cur.id] = cur;
  return acc;
}, {});

function PublishingGuidePage() {
  // localStorage에서 마지막으로 본 섹션 복원
  const getInitialSection = () => {
    const saved = localStorage.getItem('publishing-guide-active-section');
    if (saved && guideSections.find(s => s.id === saved)) {
      return saved;
    }
    return guideGroups[0].items[0];
  };

  const [activeSection, setActiveSection] = useState(getInitialSection);
  const [isMobileLnbOpen, setIsMobileLnbOpen] = useState(false);

  // activeSection이 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('publishing-guide-active-section', activeSection);
  }, [activeSection]);

  // 페이지 로드 시 저장된 섹션으로 스크롤 이동
  useEffect(() => {
    const saved = localStorage.getItem('publishing-guide-active-section');
    if (saved && guideSections.find(s => s.id === saved)) {
      // DOM이 완전히 로드된 후 스크롤 이동
      setTimeout(() => {
        const element = document.getElementById(saved);
        if (element) {
          const navElement = document.querySelector(".app-nav") as HTMLElement | null;
          const navHeight = navElement ? navElement.offsetHeight : 0;
          const targetPosition = element.offsetTop - navHeight - 20;
          window.scrollTo({
            top: targetPosition,
            behavior: 'auto' // 즉시 이동
          });
        }
      }, 100);
    }
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  // 네비게이션 클릭 핸들러 - 네비게이션 바 높이 고려한 부드러운 스크롤
  const handleNavClick = (sectionId: string) => {
    // 먼저 활성 섹션을 업데이트해서 우측 패널이 즉시 변경되도록
    setActiveSection(sectionId);
    setIsMobileLnbOpen(false);

    // 렌더 후 스크롤 이동 시도 (DOM 생성 시점을 고려)
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (!element) return;

      const navElement = document.querySelector(".app-nav") as HTMLElement | null;
      const navHeight = navElement ? navElement.offsetHeight : 0;
      const targetPosition = element.offsetTop - navHeight - 20;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }, 50);
  };

  // 스크롤 이벤트로 활성화 섹션 감지
  useEffect(() => {
    const handleScroll = () => {
      const sections = guideSections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id)
      })).filter((section): section is { id: string; element: HTMLElement } => Boolean(section.element));

      if (sections.length === 0) return;

      // 상단 네비게이션 바 높이 계산
      const navElement = document.querySelector(".app-nav") as HTMLElement | null;
      const navHeight = navElement ? navElement.offsetHeight : 0;

      const scrollPosition = window.scrollY + navHeight + 50; // 네비 높이 + 추가 오프셋

      // 아래에서 위로 순회하며 현재 위치에 해당하는 섹션 찾기
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const offsetTop = section.element.offsetTop;

        if (scrollPosition >= offsetTop) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    // DOM이 완전히 로드된 후 실행되도록 타임아웃 설정
    const timeoutId = setTimeout(() => {
      handleScroll();
      window.addEventListener('scroll', handleScroll, { passive: true });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 모바일 LNB 모달이 열릴 때 활성화된 링크로 즉시 스크롤 이동
  useEffect(() => {
    if (!isMobileLnbOpen) return;

    // 모달이 렌더링된 직후 즉시 스크롤 위치 설정
    const scrollToActiveLink = () => {
      const modal = document.querySelector(".publishing-guide__mobile-lnb-modal") as HTMLElement | null;
      if (!modal) return;

      const activeLink = modal.querySelector(".publishing-guide__lnb-link.is-active") as HTMLElement | null;
      if (!activeLink) return;

      const modalBody = modal.querySelector(".publishing-guide__mobile-lnb-body") as HTMLElement | null;
      if (!modalBody) return;

      // 활성화된 링크의 위치 계산
      const linkTop = activeLink.offsetTop;
      const linkHeight = activeLink.offsetHeight;
      const modalBodyHeight = modalBody.clientHeight;
      const linkCenter = linkTop + linkHeight / 2;
      const scrollPosition = linkCenter - modalBodyHeight / 2;

      // 즉시 스크롤 이동 (애니메이션 없음)
      modalBody.scrollTop = Math.max(0, scrollPosition);
    };

    // requestAnimationFrame을 사용하여 다음 프레임에서 실행 (DOM 렌더링 완료 후)
    const rafId = requestAnimationFrame(() => {
      scrollToActiveLink();
    });

    return () => cancelAnimationFrame(rafId);
  }, [isMobileLnbOpen, activeSection]);

  return (
    <PageTemplate title="퍼블리싱 가이드">
      <section className="publishing-guide">
        <div className="publishing-guide__layout">
          {/* 모바일 LNB 토글 버튼 */}
          <div className="publishing-guide__mobile-toggle">
            <button onClick={() => setIsMobileLnbOpen(true)}>메뉴</button>
          </div>

          {/* 모바일 LNB 모달 */}
          {isMobileLnbOpen && (
            <div className="publishing-guide__mobile-lnb-overlay" onClick={() => setIsMobileLnbOpen(false)}>
              <div
                className="publishing-guide__mobile-lnb-modal"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-label="퍼블리싱 가이드 메뉴"
              >
                <div className="publishing-guide__mobile-lnb-header">
                  <h4>Guide</h4>
                  <button onClick={() => setIsMobileLnbOpen(false)} aria-label="닫기">✕</button>
                </div>
                <div className="publishing-guide__mobile-lnb-body">
                  {guideGroups.map((group) => (
                    <div key={group.id} className="publishing-guide__mobile-lnb-group">
                      <p className="publishing-guide__lnb-group-label">{group.label}</p>
                      <ul className="publishing-guide__lnb-sublist">
                        {group.items.map((sectionId) => {
                          const section = sectionMap[sectionId];
                          if (!section) return null;
                          const isActive = activeSection === sectionId;
                          return (
                            <li key={sectionId}>
                              <button
                                className={`publishing-guide__lnb-link${isActive ? " is-active" : ""}`}
                                aria-current={isActive ? "true" : undefined}
                                onClick={() => handleNavClick(sectionId)}
                              >
                                {section.label}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <nav className="publishing-guide__lnb" aria-label="퍼블리싱 가이드 메뉴">
            <ul className="publishing-guide__lnb-list">
              {guideGroups.map((group) => (
                <li key={group.id} className="publishing-guide__lnb-group">
                  <p className="publishing-guide__lnb-group-label">{group.label}</p>
                  <ul className="publishing-guide__lnb-sublist">
                    {group.items.map((sectionId) => {
                      const section = sectionMap[sectionId];
                      if (!section) return null;
                      const isActive = activeSection === sectionId;
                      return (
                        <li key={sectionId}>
                          <button
                            className={`publishing-guide__lnb-link${isActive ? " is-active" : ""}`}
                            aria-current={isActive ? "true" : undefined}
                            onClick={() => handleNavClick(sectionId)}
                          >
                            {section.label}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))}
            </ul>
          </nav>

          <div className="publishing-guide__content">
            {(() => {
              const currentSection = sectionMap[activeSection] || guideSections[0];

              return (
                <article key={currentSection.id} id={currentSection.id} className="guide-section">
                  <header className="guide-section__header">
                    <p className="guide-section__title" >{currentSection.label}</p>
                    <div>
                      {/* <h3 className="guide-section__title">{currentSection.title}</h3> */}
                      <p className="guide-section__description">{currentSection.description}</p>
                    </div>
                  </header>

                  <div className="guide-section__body">
                    <div className="guide-section__code">
                      <CodeBlock code={currentSection.code} language="tsx" />
                    </div>

                    <div className="guide-section__preview">
                      <p className="guide-section__code-label">UI 미리보기</p>
                      <currentSection.PreviewComponent />
                    </div>
                  </div>
                </article>
              );
            })()}
          </div>
        </div>
      </section>
    </PageTemplate>
  );
}

export default PublishingGuidePage;



