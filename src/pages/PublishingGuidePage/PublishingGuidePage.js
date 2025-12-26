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
import Select from "../../components/Select/Select";
import Checkbox, { CheckboxGroup } from "../../components/Checkbox/Checkbox";
import Radio, { RadioGroup } from "../../components/Radio/Radio";
import Textarea from "../../components/Textarea/Textarea";
import Card from "../../components/Card/Card";
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

// 코드 블록 컴포넌트 (구문 강조 적용)
const CodeBlock = ({ code }) => {
  const codeRef = useRef(null);

  useEffect(() => {
    if (codeRef.current) {
      // highlight.js로 구문 강조 적용
      hljs.highlightElement(codeRef.current);
    }
  }, [code]);

  return (
    <pre className="guide-section__code-pre">
      <code ref={codeRef} className="language-javascript">
        {code}
      </code>
    </pre>
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
  const totalItems = 20;

  // 더보기 버튼 핸들러
  const handleLoadMore = () => {
    setVisibleItems(prev => Math.min(prev + 5, totalItems));
  };

  // 현재 표시할 아이템들
  const currentItems = Array.from({ length: visibleItems }, (_, idx) => idx + 1);

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
            >
              더보기 ({Math.min(visibleItems + 5, totalItems) - visibleItems}개)
            </button>
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
  const [toast, setToast] = useState({ message: "", type: "info", key: 0 });

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
    setToast((prev) => ({ message: "", type: "info", key: prev.key }));
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
      <div className="toast-stack">
        <Toast 
          key={toast.key} 
          message={toast.message} 
          type={toast.type} 
          onClose={handleToastClose} 
        />
      </div>
    </div>
  );
};

const ToastPreview = () => {
  const [toast, setToast] = useState({ message: "", type: "info", key: 0 });
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

  const clearToast = () => setToast((prev) => ({ message: "", type: "info", key: prev.key }));

  if (isLoading) {
    return (
      <div className="guide-preview guide-preview--toast">
        <div className="toast-actions" style={{ display: "flex", gap: 8 }}>
          <Skeleton width="110px" height={32} />
          <Skeleton width="110px" height={32} />
          <Skeleton width="110px" height={32} />
        </div>
        <div className="toast-stack" style={{ marginTop: 12 }}>
          <Skeleton width="260px" height={48} />
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

      <div className="toast-stack">
        <Toast key={toast.key} message={toast.message} type={toast.type} onClose={clearToast} />
      </div>
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
      <BottomDock items={items} defaultActive={last} onChange={(key) => setLast(key)} />
      <div className="dock-status">
        마지막 클릭: <strong>{last}</strong>
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
  const [sheetOffset, setSheetOffset] = useState(0);
  const [dragStartY, setDragStartY] = useState(null);

  const SHEET_THRESHOLD = 120;

  const handleSheetStart = (e) => {
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setDragStartY(clientY);
  };

  const handleSheetMove = (e) => {
    if (dragStartY === null) return;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const delta = clientY - dragStartY;
    setSheetOffset(Math.max(0, Math.min(delta, 240))); // drag down only
  };

  const handleSheetEnd = () => {
    if (sheetOffset > SHEET_THRESHOLD) {
      setIsSheetOpen(false);
    }
    setSheetOffset(0);
    setDragStartY(null);
  };

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
          풀스크린
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
      {isSheetOpen && (
        <div className="popup-overlay popup-overlay--sheet" onClick={() => setIsSheetOpen(false)}>
          <div
            className="popup popup--sheet"
            style={{ transform: `translateY(${sheetOffset}px)` }}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={handleSheetStart}
            onMouseMove={handleSheetMove}
            onMouseUp={handleSheetEnd}
            onMouseLeave={handleSheetEnd}
            onTouchStart={handleSheetStart}
            onTouchMove={handleSheetMove}
            onTouchEnd={handleSheetEnd}
          >
            <div className="popup__handle" />
            <h4>바텀시트 팝업</h4>
            <p>상단 드래그로 절반 이상 내리면 자동으로 닫힙니다.</p>
            <button className="btn btn--secondary btn--sm" onClick={() => setIsSheetOpen(false)}>
              닫기
            </button>
          </div>
        </div>
      )}

      {/* Fullscreen Popup */}
      {isFullOpen && (
        <div className="popup-overlay popup-overlay--full">
          <div className="popup popup--full">
            <div className="popup__header">
              <h4>풀스크린 팝업</h4>
              <button className="popup__close" onClick={() => setIsFullOpen(false)}>✕</button>
            </div>
            <div className="popup__body">
              <p>전체 화면을 덮는 풀스크린 팝업입니다.</p>
              <p>배경 스크롤을 잠그고, 상단 닫기 버튼을 제공합니다.</p>
            </div>
          </div>
        </div>
      )}
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
              />
              <div className="header-demo__mobile-content">
                <h4>서브 헤더 데모</h4>
                <p>좌측: 뒤로가기 버튼</p>
                <p>가운데: 카테고리 이름 (음료)</p>
                <p>우측: 장바구니, 검색, 더보기 버튼</p>
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
  const [checked2, setChecked2] = useState(true);
  const [groupOptions, setGroupOptions] = useState([
    { value: "opt1", label: "옵션 1", checked: false },
    { value: "opt2", label: "옵션 2", checked: true },
    { value: "opt3", label: "옵션 3", checked: false, disabled: true },
  ]);

  return (
    <div className="guide-preview guide-preview--checkbox">
      <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "500px" }}>
        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>단일</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Checkbox label="약관에 동의합니다" checked={checked1} onChange={(e) => setChecked1(e.target.checked)} />
            <Checkbox label="이미 체크됨" checked={checked2} onChange={(e) => setChecked2(e.target.checked)} />
            <Checkbox label="비활성화" disabled />
            <Checkbox label="비활성화 체크됨" checked disabled />
          </div>
        </div>

        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>그룹</h4>
          <CheckboxGroup
            label="관심사 선택"
            name="interests"
            options={groupOptions}
            onChange={(e, updatedOptions) => setGroupOptions(updatedOptions)}
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
  const [value2, setValue2] = useState("");

  return (
    <div className="guide-preview guide-preview--textarea">
      <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "500px" }}>
        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>기본</h4>
          <Textarea
            label="메시지"
            placeholder="메시지를 입력하세요"
            value={value1}
            onChange={(e, value) => setValue1(value)}
            rows={4}
            help="최대 500자까지 입력 가능합니다"
          />
        </div>

        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>Error 상태</h4>
          <Textarea
            label="설명"
            placeholder="설명을 입력하세요"
            value={value2}
            onChange={(e, value) => setValue2(value)}
            rows={4}
            error="설명을 입력해주세요"
          />
        </div>

        <div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>자동 높이 조절</h4>
          <Textarea
            label="자동 높이 조절"
            placeholder="입력하면 자동으로 높이가 조절됩니다"
            rows={3}
            autoResize
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

// 가이드 섹션 정의
const guideSections = [
  {
    id: "header",
    label: "헤더",
    title: "모바일 헤더 레이아웃",
    description:
      "모바일 환경을 위한 반응형 헤더 디자인입니다. 메인 헤더는 햄버거 버튼으로 사이드 메뉴를 열 수 있으며, 3뎁스 메뉴 구조를 지원합니다. 서브 헤더는 뒤로가기 버튼, 카테고리 이름, 유틸리티 버튼들로 구성됩니다.",
    code: `import Header from "./Header";
import { useState } from "react";

// ===== Props 설명 =====
// variant: "main" | "sub" (기본값: "main")
//   - "main": 메인 헤더 (로고, 햄버거 버튼, 사이드 메뉴)
//   - "sub": 서브 헤더 (뒤로가기, 카테고리 이름, 유틸리티 버튼)
// currentPage: 현재 페이지 식별자 (variant="main"일 때 사용)
// onPageChange: 페이지 변경 핸들러 (variant="main"일 때 사용, page를 인자로 받음)
// categoryName: 카테고리 이름 (variant="sub"일 때 사용, 기본값: "카테고리")
// onBack: 뒤로가기 버튼 클릭 핸들러 (variant="sub"일 때 사용)
// onCartClick: 장바구니 버튼 클릭 핸들러 (variant="sub"일 때 사용)
// onUtilityClick: 유틸리티 버튼 클릭 핸들러 (variant="sub"일 때 사용, type: "search" | "more")

// ===== 메인 헤더 기본 사용 =====
// 메인 헤더는 로고와 햄버거 버튼을 포함하며, 사이드 메뉴를 열 수 있습니다.
const [currentPage, setCurrentPage] = useState("guide");

const handlePageChange = (page) => {
  setCurrentPage(page);
  // 페이지 이동 로직
  navigateToPage(page);
};

<Header 
  currentPage={currentPage} 
  onPageChange={handlePageChange} 
  variant="main"
/>

// ===== 서브 헤더 기본 사용 =====
// 서브 헤더는 뒤로가기 버튼, 카테고리 이름, 유틸리티 버튼들로 구성됩니다.
<Header 
  variant="sub"
  categoryName="음료"
  onBack={() => {
    console.log("뒤로가기 클릭");
    // 뒤로가기 로직 (예: history.back() 또는 라우터 이동)
    navigateBack();
  }}
  onCartClick={() => {
    console.log("장바구니 클릭");
    // 장바구니 페이지로 이동
    navigateToCart();
  }}
  onUtilityClick={(type) => {
    console.log(\`\${type} 클릭\`);
    // type: "search" | "more"
    if (type === "search") {
      openSearchModal();
    } else if (type === "more") {
      openMoreMenu();
    }
  }}
/>

// ===== 메인 헤더 사이드 메뉴 =====
// 메인 헤더의 햄버거 버튼을 클릭하면 사이드 메뉴가 열립니다.
// 사이드 메뉴는 3뎁스 구조를 지원하며, 각 뎁스는 애니메이션과 함께 표시됩니다.
// 
// 메뉴 구조:
// - 1뎁스: 메인 메뉴 (예: "메뉴 1", "메뉴 2", "메뉴 3")
// - 2뎁스: 서브메뉴 (예: "서브메뉴 1-1", "서브메뉴 1-2")
// - 3뎁스: 최종 링크 (예: "3뎁스 1-1-1", "3뎁스 1-1-2")
//
// 메뉴 데이터는 컴포넌트 내부의 gnbMenu 배열로 관리됩니다.
// 각 메뉴 아이템은 { id, label, children, href } 구조를 가집니다.

// ===== 사이드 메뉴 상태 관리 =====
// 컴포넌트 내부에서 다음 상태를 관리합니다:
// - isMenuOpen: 사이드 메뉴 열림/닫힘 상태
// - expandedItems: 각 뎁스의 확장 상태 (객체 형태로 관리)
//
// toggleMenu(): 햄버거 버튼 클릭 시 사이드 메뉴 토글
// toggleExpanded(key, isMenu1Depth): 서브메뉴 클릭 시 해당 메뉴 확장/축소

// ===== 서브 헤더 유틸리티 버튼 =====
// 서브 헤더의 우측에는 두 개의 유틸리티 버튼이 있습니다:
// 1. 검색 버튼 (돋보기 아이콘)
// 2. 더보기 버튼 (세 개의 점 아이콘)
//
// 각 버튼 클릭 시 onUtilityClick이 호출되며, type 인자로 "search" 또는 "more"가 전달됩니다.

// ===== 헤더 스타일 =====
// 헤더는 position: sticky로 설정되어 스크롤 시 상단에 고정됩니다.
// z-index: 1000으로 설정되어 다른 요소 위에 표시됩니다.
// 배경색은 var(--color-bg), 하단에는 border와 box-shadow가 적용됩니다.

// ===== 접근성 =====
// - 햄버거 버튼에 aria-label="메뉴 열기" 및 aria-expanded 속성 제공
// - 서브 헤더의 뒤로가기 버튼에 적절한 aria-label 제공
// - 유틸리티 버튼에 aria-label 제공 (검색, 더보기)
// - 사이드 메뉴는 role="navigation"으로 표시

// ===== 사이드 메뉴 애니메이션 =====
// 사이드 메뉴는 슬라이드 애니메이션으로 열리고 닫힙니다.
// 서브메뉴는 높이 애니메이션으로 확장/축소됩니다.
// 애니메이션은 CSS transition을 사용하여 부드럽게 처리됩니다.

// ===== 외부 클릭 감지 =====
// 사이드 메뉴가 열려있을 때 외부를 클릭하면 자동으로 닫힙니다.
// useEffect를 사용하여 document에 클릭 이벤트 리스너를 등록합니다.

// ===== 주의사항 =====
// 1. variant="main"일 때는 currentPage와 onPageChange를 제공해야 합니다.
// 2. variant="sub"일 때는 categoryName, onBack, onCartClick, onUtilityClick을 제공해야 합니다.
// 3. 사이드 메뉴의 메뉴 데이터는 컴포넌트 내부의 gnbMenu 배열을 수정하여 변경할 수 있습니다.
// 4. 헤더는 sticky 포지션이므로 상단에 고정됩니다.
// 5. 서브 헤더의 카테고리 이름이 길 경우 텍스트 오버플로우 처리가 됩니다 (ellipsis).
// 6. 사이드 메뉴는 모바일 환경을 위해 최적화되어 있습니다.
// 7. 3뎁스 메뉴 구조는 최대 3단계까지 지원합니다.
// 8. 메뉴 아이템에 href가 있으면 링크로 동작하며, 없으면 확장/축소만 동작합니다.
// 9. 로고는 Typography 컴포넌트를 사용하여 렌더링됩니다 (variant="h1", size="small").
// 10. 서브 헤더의 뒤로가기 버튼은 원형 버튼으로 디자인되어 있습니다.`,
    PreviewComponent: HeaderPreview,
  },
  {
    id: "footer",
    label: "푸터",
    title: "푸터 레이아웃",
    description:
      "사이트의 공통 하단 영역으로, 회사 정보·고객센터·SNS 링크 등을 담습니다. 명확한 링크와 대비를 유지하고, 모바일에서도 읽기 쉬운 여백을 확보합니다.",
    code: `import Footer from "./Footer";

// ===== Props 설명 =====
// nav: 네비게이션 메뉴 배열 [{ label, href }] (기본값: defaultNav)
// info: 회사 정보 객체 { address, contact } (기본값: defaultInfo)
// sns: 소셜 미디어 링크 배열 (기본값: defaultSns)
// logo: 로고 텍스트 (기본값: "스타벅스")

// ===== 기본 사용 =====
// 기본 데이터를 사용하여 푸터 렌더링
<Footer />

// ===== 커스텀 네비게이션 메뉴 =====
const customNav = [
  { label: "회사소개", href: "/company" },
  { label: "개인정보처리방침", href: "/privacy" },
  { label: "이용약관", href: "/terms" },
  { label: "FAQ", href: "/faq" },
  { label: "문의하기", href: "/contact" },
];

<Footer nav={customNav} />

// ===== 커스텀 회사 정보 =====
const customInfo = {
  address: "서울특별시 강남구 테헤란로 123, 스타벅스코리아",
  contact: "고객센터 1522-3232 | support@starbucks.co.kr",
};

<Footer info={customInfo} />

// ===== 커스텀 소셜 미디어 링크 =====
const customSns = ["Instagram", "Facebook", "Youtube", "Twitter", "LinkedIn"];

<Footer sns={customSns} />

// ===== 모든 Props 커스터마이징 =====
const footerNav = [
  { label: "회사소개", href: "/about" },
  { label: "채용정보", href: "/careers" },
  { label: "개인정보처리방침", href: "/privacy" },
  { label: "이용약관", href: "/terms" },
  { label: "FAQ", href: "/faq" },
];

const footerInfo = {
  address: "서울특별시 강남구 테헤란로 123, 스타벅스코리아",
  contact: "고객센터 1522-3232 | 이메일: support@starbucks.co.kr",
};

const footerSns = ["Instagram", "Facebook", "Youtube"];

<Footer
  nav={footerNav}
  info={footerInfo}
  sns={footerSns}
  logo="STARBUCKS"
/>

// ===== 기본 데이터 구조 =====
// defaultNav: 네비게이션 메뉴 배열
const defaultNav = [
  { label: "회사소개", href: "#" },
  { label: "개인정보처리방침", href: "#" },
  { label: "FAQ", href: "#" },
  { label: "문의하기", href: "#" },
];

// defaultInfo: 회사 정보 객체
const defaultInfo = {
  address: "서울시 어딘가 123, 스타벅스코리아",
  contact: "고객센터 1234-5678 | support@starbucks.co.kr",
};

// defaultSns: 소셜 미디어 링크 배열
const defaultSns = ["Instagram", "Facebook", "Youtube"];

// ===== 주의사항 =====
// 1. nav 배열의 각 객체는 label과 href 속성을 가져야 함
// 2. info 객체는 address와 contact 속성을 가져야 함
// 3. sns 배열은 문자열 배열로, 각 항목은 소셜 미디어 플랫폼 이름
// 4. logo는 텍스트로 표시되며, 필요시 이미지로 교체 가능
// 5. Typography 컴포넌트를 사용하여 텍스트 스타일 일관성 유지
// 6. 접근성을 위해 aria-label 속성이 nav와 sns 영역에 설정됨
// 7. 모바일 반응형 디자인을 고려하여 여백과 폰트 크기 조정`,
    PreviewComponent: FooterPreview,
  },
  {
    id: "file-upload",
    label: "파일첨부",
    title: "FileUpload 컴포넌트",
    description:
      "이미지 파일만 허용하며 최대 3개까지 업로드할 수 있는 파일 업로드 컴포넌트입니다. 각 파일은 최대 300MB까지 허용되며, 이미지 미리보기, 개별 삭제, 전체 삭제 기능을 포함합니다. Image 컴포넌트를 사용하여 자동으로 비율을 판단하고 적절한 크기로 표시합니다.",
    code: `import FileUpload from "./FileUpload";

// ===== 기본 사용 =====
// FileUpload 컴포넌트는 내부적으로 상태를 관리하므로
// 별도의 상태 관리가 필요 없습니다.
<FileUpload />

// ===== 파일 제한 사항 =====
// - 허용 타입: image/* (이미지 파일만, 예: jpg, png, gif, webp 등)
// - 최대 개수: 3개 (MAX_FILES = 3)
// - 최대 크기: 300MB (파일당, MAX_SIZE = 300 * 1024 * 1024)
// - PDF, 문서 파일 등은 현재 지원하지 않음

// ===== 파일 선택 처리 =====
// handleFileChange 함수의 동작 순서:
// 1. 선택된 파일들을 배열로 변환 (Array.from(event.target.files))
// 2. 이미지 파일만 필터링 (file.type.startsWith("image/"))
// 3. 이미지 파일이 없으면 경고 후 종료
// 4. 최대 개수 체크 (현재 파일 수 + 새 파일 수 <= 3)
// 5. 파일 크기 체크 (각 파일 <= 300MB)
// 6. Blob URL 생성 (URL.createObjectURL(file))
// 7. 파일 정보 객체 생성: { id, file, name, size, type, preview }
// 8. 로딩 상태 추가 (loadingFiles Set에 파일 ID 추가)
// 9. 파일 목록에 추가 (setFiles)
// 10. input 초기화 (event.target.value = "")

// ===== 파일 데이터 구조 =====
// 각 파일 객체는 다음 속성을 가집니다:
const fileObject = {
  id: Date.now() + Math.random(), // 고유 ID (타임스탬프 + 랜덤)
  file: File, // 원본 File 객체
  name: "example.jpg", // 파일명
  size: 1024000, // 파일 크기 (bytes)
  type: "image/jpeg", // MIME 타입
  preview: "blob:http://localhost:3000/abc-123", // Blob URL (미리보기용)
};

// ===== 미리보기 URL 생성 =====
// Blob URL을 사용하여 이미지 미리보기
// const preview = URL.createObjectURL(file);
// - 브라우저 메모리에 임시 URL 생성
// - 이미지 로드 완료 후에도 유지됨
// - 파일 삭제 시 URL.revokeObjectURL()로 해제 필요

// ===== 로딩 상태 관리 =====
// loadingFiles: Set<fileId> - 로딩 중인 파일 ID 집합
// - 파일 선택 시: 새 파일들의 ID를 Set에 추가
// - 이미지 로드 완료 시: handleImageLoad에서 ID 제거
// - 이미지 로드 실패 시: handleImageError에서 ID 제거
// - 파일 삭제 시: handleRemove에서 ID 제거

// 로딩 중 표시:
{isLoading && (
  <div className="file-upload-demo__preview-loading">
    <Loading size={32} thickness={3} label="" />
  </div>
)}

// ===== 개별 파일 삭제 =====
// handleRemove 함수:
// 1. 삭제할 파일 찾기 (files.find(f => f.id === id))
// 2. Blob URL 메모리 해제 (URL.revokeObjectURL(file.preview))
// 3. 파일 목록에서 제거 (files.filter(f => f.id !== id))
// 4. 로딩 상태에서도 제거 (loadingFiles.delete(id))

// 사용 예시:
<button onClick={() => handleRemove(file.id)}>
  삭제
</button>

// ===== 전체 파일 삭제 =====
// handleClearAll 함수:
// 1. 모든 파일의 Blob URL 해제 (files.forEach + URL.revokeObjectURL)
// 2. 파일 목록 초기화 (setFiles([]))
// 3. 로딩 상태 초기화 (setLoadingFiles(new Set()))
// 4. input 초기화 (inputRef.current.value = "")

// ===== 이미지 로드 이벤트 =====
// handleImageLoad: 이미지 로드 완료 시 호출
// - loadingFiles Set에서 해당 파일 ID 제거
// - 로딩 표시 제거

// handleImageError: 이미지 로드 실패 시 호출
// - loadingFiles Set에서 해당 파일 ID 제거
// - 로딩 표시 제거 (에러 발생 시에도)

// Image 컴포넌트 사용:
<Image
  src={file.preview}
  alt={file.name}
  onLoad={() => handleImageLoad(file.id)}
  onError={() => handleImageError(file.id)}
/>

// ===== 파일 크기 포맷팅 =====
// formatSize 함수: bytes를 읽기 쉬운 형식으로 변환
// - GB: 1024^3 이상
// - MB: 1024^2 이상
// - KB: 1024 이상
// - B: 그 외

// 예시:
formatSize(1024) // "1.0 KB"
formatSize(1024 * 1024) // "1.0 MB"
formatSize(1024 * 1024 * 1024) // "1.0 GB"

// ===== 파일 검증 로직 =====
// 1. 이미지 파일 검증:
const isImage = (file) => file.type.startsWith("image/");
const imageFiles = selectedFiles.filter(isImage);

// 2. 최대 개수 검증:
const remainingSlots = MAX_FILES - files.length;
if (imageFiles.length > remainingSlots) {
  alert(\`최대 \${MAX_FILES}개까지 업로드할 수 있습니다.\`);
}

// 3. 파일 크기 검증:
const oversizedFiles = imageFiles.filter((file) => file.size > MAX_SIZE);
if (oversizedFiles.length > 0) {
  alert("최대 300MB까지 첨부할 수 있습니다.");
}

// ===== UI 구조 =====
// file-upload-demo: 최상위 컨테이너
//   file-upload-demo__field: 파일 선택 영역 (canAddMore일 때만 표시)
//     file-upload-demo__label: 라벨 ("이미지 첨부 (현재/최대)")
//     input[type="file"]: 파일 선택 input
//     file-upload-demo__hint: 안내 텍스트
//   file-upload-demo__preview: 미리보기 영역 (files.length > 0일 때만 표시)
//     file-upload-demo__preview-header: 헤더 영역
//       file-upload-demo__preview-title: 제목 ("업로드된 이미지 (현재/최대)")
//       file-upload-demo__clear-all: 전체 삭제 버튼
//     file-upload-demo__preview-grid: 그리드 레이아웃
//       file-upload-demo__preview-item: 각 파일 아이템
//         file-upload-demo__preview-image-wrapper: 이미지 래퍼
//           file-upload-demo__preview-loading: 로딩 표시
//           Image: 이미지 컴포넌트
//           file-upload-demo__preview-remove: 삭제 버튼
//         file-upload-demo__preview-info: 파일 정보
//           file-upload-demo__preview-name: 파일명
//           file-upload-demo__preview-size: 파일 크기
//   file-upload-demo__empty: 빈 상태 (files.length === 0일 때만 표시)
//     file-upload-demo__placeholder: 플레이스홀더 텍스트

// ===== 조건부 렌더링 =====
// canAddMore: files.length < MAX_FILES
// - true: 파일 선택 영역 표시
// - false: 파일 선택 영역 숨김 (최대 개수 도달)

// files.length > 0: 미리보기 영역 표시
// files.length === 0: 빈 상태 표시

// ===== 접근성 =====
// - input에 id와 label의 htmlFor로 연결
// - 삭제 버튼에 aria-label 제공
// - 전체 삭제 버튼에 aria-label="모든 이미지 삭제"
// - 파일명에 title 속성으로 전체 파일명 표시 (긴 파일명 대비)

// ===== 메모리 관리 =====
// Blob URL은 브라우저 메모리를 사용하므로 명시적으로 해제해야 함
// - 파일 삭제 시: URL.revokeObjectURL(file.preview)
// - 전체 삭제 시: 모든 파일의 preview URL 해제
// - 컴포넌트 언마운트 시: useEffect cleanup에서 처리 권장

// ===== 주의사항 =====
// 1. 현재는 이미지 파일만 지원 (image/* 타입만 허용)
// 2. 최대 3개까지만 업로드 가능 (MAX_FILES = 3)
// 3. 각 파일 최대 300MB 제한 (MAX_SIZE = 300 * 1024 * 1024)
// 4. 파일 삭제 시 Blob URL이 자동으로 해제됨 (메모리 누수 방지)
// 5. Image 컴포넌트를 사용하여 자동으로 비율 판단 (landscape/portrait/square)
// 6. 이미지 로드 실패 시에도 로딩 표시가 제거됨
// 7. 같은 파일을 다시 선택하려면 input을 초기화해야 함 (event.target.value = "")
// 8. 파일 선택 후 input이 자동으로 초기화되어 같은 파일 재선택 가능
// 9. 로딩 상태는 Set 자료구조를 사용하여 O(1) 조회 성능
// 10. 파일 ID는 Date.now() + Math.random()으로 고유성 보장`,
    PreviewComponent: FileUpload,
  },
  {
    id: "more",
    label: "더보기",
    title: "더보기 레이아웃",
    description:
      "더보기 버튼으로 대량의 리스트 데이터를 점진적으로 로드합니다. 초기 제한된 개수부터 시작해 사용자의 필요에 따라 추가 데이터를 불러옵니다.",
    code: `import { useState } from "react";

// ===== 더보기 기능 구현 =====
// 대량의 데이터를 점진적으로 로드하는 패턴입니다.
// 초기에는 일부 아이템만 표시하고, "더보기" 버튼을 클릭하면 추가 아이템을 로드합니다.

// ===== 기본 상태 관리 =====
const [visibleItems, setVisibleItems] = useState(5); // 초기 표시 개수
const totalItems = 20; // 전체 아이템 개수
const itemsPerPage = 5; // 한 번에 로드할 아이템 개수

// ===== 더보기 핸들러 =====
// 더보기 버튼 클릭 시 visibleItems를 증가시킵니다.
// Math.min을 사용하여 totalItems를 초과하지 않도록 제한합니다.
const handleLoadMore = () => {
  setVisibleItems(prev => Math.min(prev + itemsPerPage, totalItems));
};

// ===== 현재 표시할 아이템들 =====
// items 배열에서 visibleItems 개수만큼만 slice하여 표시합니다.
const displayedItems = items.slice(0, visibleItems);

// ===== UI 렌더링 =====
return (
  <div className="layout-list">
    {/* 표시할 아이템들 렌더링 */}
    {displayedItems.map(item => (
      <div key={item.id} className="layout-item">
        {/* 아이템 내용 */}
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>
    ))}

    {/* 더보기 버튼 (남은 아이템이 있을 때만 표시) */}
    {visibleItems < totalItems && (
      <button 
        onClick={handleLoadMore}
        className="load-more-btn"
        aria-label={\`\${totalItems - visibleItems}개 더보기\`}
      >
        더보기 ({totalItems - visibleItems}개)
      </button>
    )}

    {/* 모든 아이템이 표시되었을 때 */}
    {visibleItems >= totalItems && (
      <p className="load-more-end">모든 항목을 불러왔습니다.</p>
    )}
  </div>
);

// ===== 비동기 데이터 로드 =====
// API에서 데이터를 점진적으로 로드하는 경우:
const [items, setItems] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [hasMore, setHasMore] = useState(true);
const [page, setPage] = useState(1);

const handleLoadMore = async () => {
  if (isLoading || !hasMore) return;
  
  setIsLoading(true);
  try {
    const response = await fetch(\`/api/items?page=\${page + 1}&limit=10\`);
    const data = await response.json();
    
    if (data.items.length === 0) {
      setHasMore(false);
    } else {
      setItems(prev => [...prev, ...data.items]);
      setPage(prev => prev + 1);
    }
  } catch (error) {
    console.error("데이터 로드 실패:", error);
  } finally {
    setIsLoading(false);
  }
};

// ===== 로딩 상태 표시 =====
{isLoading && (
  <div className="load-more-loading">
    <Loading size={24} />
    <span>불러오는 중...</span>
  </div>
)}

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

// ===== Props 설명 =====
// children: 아이콘 내용 (이모지, SVG, 텍스트 등)
// name: 아이콘 이름 (접근성용, aria-label에 사용)
// size: 'small' | 'medium' | 'large' | 'xlarge' (기본값: 'medium')
// color: 'default' | 'muted' | 'accent' | 'success' | 'warning' | 'error' | 'info' (기본값: 'default')
// clickable: 클릭 가능 여부 (기본값: false)
// onClick: 클릭 핸들러 (clickable이 true일 때)
// className: 추가 클래스명
// style: 인라인 스타일

// ===== 기본 사용 =====
<Icon name="알림">🔔</Icon>
<Icon name="즐겨찾기">⭐</Icon>
<Icon name="설정">⚙️</Icon>

// ===== 크기 옵션 =====
// small: 16px (1rem)
<Icon name="알림" size="small">🔔</Icon>

// medium: 20px (1.25rem) - 기본값
<Icon name="알림" size="medium">🔔</Icon>

// large: 24px (1.5rem)
<Icon name="알림" size="large">🔔</Icon>

// xlarge: 32px (2rem)
<Icon name="알림" size="xlarge">🔔</Icon>

// ===== 색상 옵션 =====
<Icon name="알림" color="default">🔔</Icon>
<Icon name="성공" color="success">✓</Icon>
<Icon name="경고" color="warning">⚠</Icon>
<Icon name="에러" color="error">✕</Icon>
<Icon name="정보" color="info">ℹ</Icon>
<Icon name="강조" color="accent">⭐</Icon>
<Icon name="보조" color="muted">🔔</Icon>

// ===== 클릭 가능한 아이콘 =====
<Icon
  name="알림"
  clickable
  onClick={() => console.log("알림 클릭")}
>
  🔔
</Icon>

<Icon
  name="즐겨찾기"
  color="accent"
  clickable
  onClick={() => handleFavorite()}
>
  ⭐
</Icon>

// ===== SVG 아이콘 =====
<Icon name="검색">
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16z" stroke="currentColor"/>
    <path d="m19 19-4.35-4.35" stroke="currentColor" strokeLinecap="round"/>
  </svg>
</Icon>

// ===== 커스텀 스타일 =====
<Icon
  name="커스텀"
  style={{ fontSize: "28px", color: "#ff6b6b" }}
>
  🎨
</Icon>

// ===== 주의사항 =====
// 1. name prop은 접근성을 위해 필수입니다 (aria-label에 사용)
// 2. clickable이 true일 때는 button 태그로 렌더링됩니다
// 3. SVG 아이콘은 currentColor를 사용하여 색상이 자동으로 적용됩니다
// 4. 이모지 아이콘은 크기에 따라 자동으로 조정됩니다
// 5. hover 효과는 clickable이 true일 때만 적용됩니다`,
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

// ===== Props 설명 =====
// label: 토글 레이블 텍스트 (기본값: "토글")
// description: 토글 설명 텍스트 (선택)
// defaultOn: 기본 켜짐 상태 (기본값: false)
// disabled: 비활성화 여부 (기본값: false)
// onChange: 토글 변경 핸들러 (checked 상태를 인자로 받음, 선택)

// ===== 기본 사용 =====
<Toggle
  label="푸시 알림"
  description="중요 공지와 업데이트 소식을 받아봅니다."
  defaultOn={false}
  onChange={(next) => console.log("토글 상태:", next)}
/>

// ===== 기본 켜짐 상태 =====
// defaultOn={true}: 초기 상태가 켜짐
<Toggle
  label="Wi-Fi 자동 연결"
  description="보안이 약한 네트워크는 자동 연결하지 않습니다."
  defaultOn={true}
  onChange={(next) => console.log("Wi-Fi:", next)}
/>

// ===== 설명 없이 사용 =====
// description prop을 생략하면 레이블만 표시
<Toggle
  label="다크 모드"
  defaultOn={false}
  onChange={(next) => console.log("다크 모드:", next)}
/>

// ===== 비활성화 상태 =====
// disabled={true}: 토글 비활성화 (클릭 불가)
<Toggle
  label="베타 기능"
  description="현재 사용할 수 없습니다."
  defaultOn={false}
  disabled={true}
/>

// ===== 상태 관리 예제 =====
// 여러 토글을 관리하는 경우
const SettingsPage = () => {
  const [settings, setSettings] = useState({
    wifi: true,
    push: false,
    marketing: false,
  });

  const handleToggle = (key, next) => {
    setSettings((prev) => ({ ...prev, [key]: next }));
    console.log(\`\${key} 설정이 \${next ? "켜졌습니다" : "꺼졌습니다"}\`);
  };

  return (
    <div>
      <Toggle
        label="Wi-Fi 자동 연결"
        description="보안이 약한 네트워크는 자동 연결하지 않습니다."
        defaultOn={settings.wifi}
        onChange={(next) => handleToggle("wifi", next)}
      />
      <Toggle
        label="푸시 알림"
        description="중요 공지와 업데이트 소식을 받아봅니다."
        defaultOn={settings.push}
        onChange={(next) => handleToggle("push", next)}
      />
      <Toggle
        label="마케팅 수신 동의"
        description="이벤트와 혜택 정보를 이메일로 받아봅니다."
        defaultOn={settings.marketing}
        onChange={(next) => handleToggle("marketing", next)}
      />
    </div>
  );
};

// ===== Controlled 컴포넌트로 사용 =====
// defaultOn 대신 외부에서 상태 관리
const ControlledToggle = () => {
  const [isOn, setIsOn] = useState(false);

  return (
    <Toggle
      label="알림 설정"
      description="모든 알림을 받습니다."
      defaultOn={isOn}
      onChange={(next) => {
        setIsOn(next);
        // 추가 로직 처리
        if (next) {
          console.log("알림이 켜졌습니다");
        } else {
          console.log("알림이 꺼졌습니다");
        }
      }}
    />
  );
};

// ===== 토글 상태에 따른 추가 처리 =====
<Toggle
  label="자동 저장"
  description="변경사항을 자동으로 저장합니다."
  defaultOn={false}
  onChange={(next) => {
    if (next) {
      // 자동 저장 활성화
      startAutoSave();
    } else {
      // 자동 저장 비활성화
      stopAutoSave();
    }
  }}
/>

// ===== 접근성 =====
// 컴포넌트 내부에서 자동으로 처리:
// - role="switch": 스위치 역할 명시
// - aria-checked: 현재 상태 (true/false)
// - aria-hidden="true": 시각적 트랙/썸 (스크린 리더에서 숨김)
// - label 태그로 레이블과 입력 연결

// ===== 내부 구조 =====
// <label className="toggle is-on"> (checked일 때 is-on 클래스 추가)
//   <input type="checkbox" role="switch" aria-checked={checked} />
//   <span className="toggle__track" aria-hidden="true">
//     <span className="toggle__thumb" />
//   </span>
//   <div className="toggle__text">
//     <span className="toggle__label">{label}</span>
//     {description && <span className="toggle__desc">{description}</span>}
//   </div>
// </label>

// ===== 상태 관리 로직 =====
// 컴포넌트 내부에서 useState로 상태 관리
// const [checked, setChecked] = useState(defaultOn);

// handleToggle 함수:
// 1. disabled 체크 (비활성화면 return)
// 2. 상태 토글 (next = !checked)
// 3. setChecked(next)로 상태 업데이트
// 4. onChange?.(next)로 콜백 호출

// ===== CSS 클래스 =====
// .toggle: 기본 토글 컨테이너
// .toggle.is-on: 켜진 상태 (checked === true)
// .toggle.is-disabled: 비활성화 상태
// .toggle__track: 토글 트랙 (시각적 스위치)
// .toggle__thumb: 토글 썸 (움직이는 원)
// .toggle__text: 텍스트 영역
// .toggle__label: 레이블 텍스트
// .toggle__desc: 설명 텍스트

// ===== 주의사항 =====
// 1. defaultOn은 초기 렌더링 시에만 사용됨 (Uncontrolled 컴포넌트)
// 2. Controlled 컴포넌트로 사용하려면 외부에서 상태 관리 필요
// 3. onChange는 항상 boolean 값 (true/false)을 인자로 받음
// 4. disabled 상태에서는 onChange가 호출되지 않음
// 5. label prop이 없으면 기본값 "토글" 사용
// 6. description은 선택 사항이며, 없으면 표시되지 않음
// 7. 접근성을 위해 role="switch"와 aria-checked 사용
// 8. 시각적 요소(track, thumb)는 aria-hidden="true"로 스크린 리더에서 숨김
// 9. label 태그로 레이블과 입력이 연결되어 있어 클릭 가능 영역이 넓음
// 10. 토글 상태는 내부 useState로 관리되므로 외부에서 직접 제어 불가 (defaultOn만 가능)`,
    PreviewComponent: TogglePreview,
  },
  {
    id: "input",
    label: "인풋",
    title: "Input 컴포넌트",
    description:
      "Text, Password, Number 등 다양한 타입을 지원하는 입력 필드입니다. error/success 상태, clear 버튼, 비밀번호 보기/숨기기 기능을 포함합니다. Controlled/Uncontrolled 모드를 모두 지원하며, onChange 핸들러는 (event, newValue) 형태로 호출됩니다.",
    code: `import Input from "./Input";
import { useState } from "react";

// ===== Props 설명 =====
// type: 'text' | 'password' | 'number' | 'email' | 'tel' 등
// label: 라벨 텍스트 (선택)
// placeholder: 플레이스홀더 텍스트
// value: 입력 값 (controlled 모드, 선택)
// onChange: (e, newValue) => void - 값 변경 핸들러
// error: 에러 메시지 (선택)
// success: 성공 메시지 (선택)
// help: 도움말 텍스트 (선택)
// showClearButton: 클리어 버튼 표시 여부 (기본값: false)
// disabled: 비활성화 여부 (기본값: false)
// size: 'small' | 'medium' | 'large' (기본값: 'medium')

// ===== 기본 사용 (Controlled) =====
const [value, setValue] = useState("");
<Input
  label="이름"
  placeholder="이름을 입력하세요"
  value={value}
  onChange={(e, newValue) => setValue(newValue)}
  showClearButton
/>

// ===== Uncontrolled 모드 =====
<Input
  label="검색어"
  placeholder="검색어를 입력하세요"
  onChange={(e, newValue) => console.log("입력값:", newValue)}
/>

// ===== Password 타입 (자동 보기/숨기기 버튼) =====
<Input
  type="password"
  label="비밀번호"
  placeholder="비밀번호를 입력하세요"
  value={password}
  onChange={(e, newValue) => setPassword(newValue)}
/>

// ===== Number 타입 =====
<Input
  type="number"
  label="수량"
  placeholder="0"
  value={quantity}
  onChange={(e, newValue) => setQuantity(newValue)}
/>

// ===== Error 상태 =====
<Input
  label="이메일"
  type="email"
  value={email}
  error="올바른 이메일 형식이 아닙니다"
  onChange={(e, newValue) => setEmail(newValue)}
/>

// ===== Success 상태 =====
<Input
  label="사용자명"
  value={username}
  success="사용 가능한 사용자명입니다"
  onChange={(e, newValue) => setUsername(newValue)}
/>

// ===== Help 텍스트 =====
<Input
  label="전화번호"
  type="tel"
  placeholder="010-1234-5678"
  help="하이픈(-) 없이 입력해주세요"
  onChange={(e, newValue) => setPhone(newValue)}
/>

// ===== Disabled 상태 =====
<Input
  label="읽기 전용"
  value="수정 불가"
  disabled
/>

// ===== Size 옵션 =====
<Input label="Small" size="small" />
<Input label="Medium" size="medium" />
<Input label="Large" size="large" />

// ===== 주의사항 =====
// 1. Controlled 모드: value와 onChange를 함께 제공해야 함
// 2. Uncontrolled 모드: value를 제공하지 않으면 내부 상태로 관리됨
// 3. onChange는 항상 (event, newValue) 형태로 호출됨
// 4. password 타입은 자동으로 보기/숨기기 버튼이 표시됨
// 5. error와 success는 동시에 표시되지 않음 (error 우선)`,
    PreviewComponent: InputPreview,
  },
  {
    id: "select",
    label: "셀렉트",
    title: "Select 컴포넌트",
    description:
      "기본 HTML select 요소를 스타일링한 셀렉트 컴포넌트입니다. label, error 메시지, help 텍스트를 포함합니다. options 배열은 { value, label } 형태의 객체 배열이어야 합니다.",
    code: `import Select from "./Select";
import { useState } from "react";

// ===== Props 설명 =====
// label: 라벨 텍스트 (선택)
// options: [{ value, label }] - 옵션 배열 (필수)
// value: 선택된 값 (controlled)
// onChange: (e) => void - 값 변경 핸들러
// placeholder: 플레이스홀더 텍스트 (기본값: "선택하세요")
// error: 에러 메시지 (선택)
// help: 도움말 텍스트 (선택)
// disabled: 비활성화 여부 (기본값: false)
// size: 'small' | 'medium' | 'large' (기본값: 'medium')

// ===== 기본 사용 =====
const [selected, setSelected] = useState("");

const options = [
  { value: "opt1", label: "옵션 1" },
  { value: "opt2", label: "옵션 2" },
  { value: "opt3", label: "옵션 3" },
];

<Select
  label="카테고리"
  options={options}
  value={selected}
  onChange={(e) => setSelected(e.target.value)}
  placeholder="선택하세요"
/>

// ===== Error 상태 =====
<Select
  label="지역"
  options={options}
  value={selected}
  error="지역을 선택해주세요"
  onChange={(e) => setSelected(e.target.value)}
/>

// ===== Help 텍스트 =====
<Select
  label="배송 방법"
  options={options}
  value={selected}
  help="배송 방법을 선택해주세요"
  onChange={(e) => setSelected(e.target.value)}
/>

// ===== Disabled 상태 =====
<Select
  label="비활성화"
  options={options}
  value="opt1"
  disabled
/>

// ===== Size 옵션 =====
<Select label="Small" options={options} size="small" />
<Select label="Medium" options={options} size="medium" />
<Select label="Large" options={options} size="large" />

// ===== 주의사항 =====
// 1. options 배열의 각 객체는 value와 label 속성을 가져야 함
// 2. value는 options 배열에 있는 값 중 하나여야 함
// 3. placeholder 옵션은 value=""로 자동 생성됨
// 4. onChange는 표준 HTML select의 onChange 이벤트와 동일`,
    PreviewComponent: SelectPreview,
  },
  {
    id: "checkbox",
    label: "체크박스",
    title: "Checkbox 컴포넌트",
    description:
      "단일 체크박스와 그룹 체크박스를 지원합니다. disabled, checked 상태를 포함하며, CheckboxGroup으로 여러 옵션을 관리할 수 있습니다. 그룹 사용 시 onChange 핸들러는 업데이트된 options 배열을 반환합니다.",
    code: `import Checkbox, { CheckboxGroup } from "./Checkbox";
import { useState } from "react";

// ===== 단일 Checkbox Props =====
// label: 라벨 텍스트 (선택)
// name: name 속성 (그룹 식별용)
// value: value 속성
// checked: 체크 상태 (기본값: false)
// onChange: (e) => void - 변경 핸들러
// disabled: 비활성화 여부 (기본값: false)

// ===== 단일 Checkbox 사용 =====
const [checked, setChecked] = useState(false);

<Checkbox
  label="약관에 동의합니다"
  name="agreement"
  value="agree"
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
/>

// ===== CheckboxGroup Props =====
// label: 그룹 라벨 (선택)
// options: [{ value, label, checked, disabled }] - 옵션 배열 (필수)
// name: name 속성 (필수, 모든 체크박스가 같은 name 공유)
// onChange: (e, updatedOptions) => void - 변경 핸들러
// onChange의 두 번째 인자로 업데이트된 options 배열이 전달됨

// ===== 그룹 Checkbox 사용 =====
const [options, setOptions] = useState([
  { value: "opt1", label: "옵션 1", checked: false },
  { value: "opt2", label: "옵션 2", checked: true },
  { value: "opt3", label: "옵션 3", checked: false, disabled: true },
]);

<CheckboxGroup
  label="관심사 선택"
  name="interests"
  options={options}
  onChange={(e, updatedOptions) => {
    setOptions(updatedOptions);
    console.log("선택된 옵션:", updatedOptions.filter(opt => opt.checked));
  }}
/>

// ===== Disabled 상태 =====
<Checkbox
  label="비활성화된 체크박스"
  checked={false}
  disabled
/>

// ===== 주의사항 =====
// 1. CheckboxGroup 사용 시 모든 체크박스는 같은 name을 가져야 함
// 2. CheckboxGroup의 onChange는 업데이트된 options 배열을 반환함
// 3. options 배열의 각 객체는 value, label, checked, disabled 속성을 가질 수 있음
// 4. 단일 Checkbox는 표준 HTML checkbox와 동일하게 동작`,
    PreviewComponent: CheckboxPreview,
  },
  {
    id: "radio",
    label: "라디오",
    title: "Radio 컴포넌트",
    description:
      "단일 라디오 버튼과 그룹 라디오 버튼을 지원합니다. disabled, checked 상태를 포함하며, RadioGroup으로 여러 옵션 중 하나를 선택할 수 있습니다. 같은 name을 가진 라디오 버튼들은 자동으로 그룹화되어 하나만 선택됩니다.",
    code: `import Radio, { RadioGroup } from "./Radio";
import { useState } from "react";

// ===== 단일 Radio Props =====
// label: 라벨 텍스트 (선택)
// name: name 속성 (그룹 식별용, 필수)
// value: value 속성 (필수)
// checked: 체크 상태 (기본값: false)
// onChange: (e) => void - 변경 핸들러
// disabled: 비활성화 여부 (기본값: false)

// ===== 단일 Radio 사용 =====
const [selected, setSelected] = useState("opt1");

<Radio
  name="option"
  value="opt1"
  label="옵션 1"
  checked={selected === "opt1"}
  onChange={(e) => setSelected(e.target.value)}
/>

<Radio
  name="option"
  value="opt2"
  label="옵션 2"
  checked={selected === "opt2"}
  onChange={(e) => setSelected(e.target.value)}
/>

// ===== RadioGroup Props =====
// label: 그룹 라벨 (선택)
// options: [{ value, label, disabled }] - 옵션 배열 (필수)
// name: name 속성 (필수, 모든 라디오 버튼이 같은 name 공유)
// selectedValue: 선택된 값 (필수)
// onChange: (e, value) => void - 변경 핸들러
// onChange의 두 번째 인자로 선택된 값이 전달됨

// ===== 그룹 Radio 사용 =====
const [paymentMethod, setPaymentMethod] = useState("card");

const paymentOptions = [
  { value: "card", label: "신용카드" },
  { value: "bank", label: "계좌이체" },
  { value: "cash", label: "현금", disabled: true },
];

<RadioGroup
  label="결제 방법"
  name="payment"
  options={paymentOptions}
  selectedValue={paymentMethod}
  onChange={(e, value) => {
    setPaymentMethod(value);
    console.log("선택된 결제 방법:", value);
  }}
/>

// ===== Disabled 상태 =====
<Radio
  name="disabled-group"
  value="opt1"
  label="비활성화된 라디오"
  disabled
/>

// ===== 주의사항 =====
// 1. 같은 name을 가진 라디오 버튼들은 자동으로 그룹화됨
// 2. RadioGroup 사용 시 모든 라디오 버튼은 같은 name을 가져야 함
// 3. RadioGroup의 onChange는 선택된 값(value)을 반환함
// 4. options 배열의 각 객체는 value, label, disabled 속성을 가질 수 있음
// 5. selectedValue는 options 배열에 있는 값 중 하나여야 함
// 6. 라디오 버튼은 항상 하나만 선택 가능 (단일 선택)`,
    PreviewComponent: RadioPreview,
  },
  {
    id: "textarea",
    label: "텍스트에어리어",
    title: "Textarea 컴포넌트",
    description:
      "여러 줄 텍스트 입력을 위한 텍스트에어리어 컴포넌트입니다. label, error 메시지, help 텍스트, 자동 높이 조절 기능을 포함합니다. autoResize 옵션을 사용하면 내용에 따라 높이가 자동으로 조절됩니다.",
    code: `import Textarea from "./Textarea";
import { useState } from "react";

// ===== Props 설명 =====
// label: 라벨 텍스트 (선택)
// placeholder: 플레이스홀더 텍스트
// value: 입력 값 (controlled)
// onChange: (e, newValue) => void - 값 변경 핸들러
// error: 에러 메시지 (선택)
// help: 도움말 텍스트 (선택)
// disabled: 비활성화 여부 (기본값: false)
// rows: 행 수 (기본값: 4)
// autoResize: 자동 높이 조절 여부 (기본값: false)
// size: 'small' | 'medium' | 'large' (기본값: 'medium')

// ===== 기본 사용 (Controlled) =====
const [message, setMessage] = useState("");

<Textarea
  label="메시지"
  placeholder="메시지를 입력하세요"
  value={message}
  onChange={(e, newValue) => setMessage(newValue)}
  rows={4}
  help="최대 500자까지 입력 가능합니다"
/>

// ===== Error 상태 =====
<Textarea
  label="설명"
  value={description}
  error="설명을 입력해주세요"
  onChange={(e, newValue) => setDescription(newValue)}
/>

// ===== 자동 높이 조절 (autoResize) =====
// 내용이 늘어나면 자동으로 높이가 증가하고, 줄어들면 높이가 감소합니다.
<Textarea
  label="자동 높이 조절"
  placeholder="여러 줄 입력 시 높이가 자동으로 조절됩니다"
  value={autoResizeValue}
  rows={3}
  autoResize
  onChange={(e, newValue) => setAutoResizeValue(newValue)}
/>

// ===== Help 텍스트 =====
<Textarea
  label="의견"
  placeholder="의견을 입력해주세요"
  value={opinion}
  help="최소 10자 이상 입력해주세요"
  onChange={(e, newValue) => setOpinion(newValue)}
/>

// ===== Disabled 상태 =====
<Textarea
  label="읽기 전용"
  value="수정할 수 없는 텍스트입니다"
  disabled
/>

// ===== Size 옵션 =====
<Textarea label="Small" size="small" rows={3} />
<Textarea label="Medium" size="medium" rows={4} />
<Textarea label="Large" size="large" rows={5} />

// ===== 주의사항 =====
// 1. autoResize 사용 시 rows는 초기 높이만 결정함
// 2. autoResize는 scrollHeight를 사용하여 높이를 계산함
// 3. onChange는 항상 (event, newValue) 형태로 호출됨
// 4. error와 help는 동시에 표시되지 않음 (error 우선)
// 5. autoResize가 활성화되면 사용자가 높이를 수동으로 조절할 수 없음`,
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

// ===== Props 설명 =====
// variant: 'product' | 'content' (기본값: 'content')
// image: 이미지 URL (선택)
// title: 제목 (선택)
// description: 설명 (선택)
// price: 가격 (variant가 'product'일 때만 사용)
// badge: 뱃지 텍스트 (선택)
// hoverable: hover 효과 적용 여부 (기본값: false)
// onClick: 클릭 이벤트 핸들러 (선택)
// className: 추가 클래스명 (선택)

// ===== 상품 카드 (Product) =====
<Card
  variant="product"
  image="https://example.com/image.jpg"
  title="아메리카노"
  description="진한 에스프레소에 뜨거운 물을 부어 만든 커피"
  price="4,500원"
  badge="NEW"
  hoverable
  onClick={() => console.log("상품 클릭")}
/>

// ===== 콘텐츠 카드 (Content) =====
<Card
  variant="content"
  image="https://example.com/image.jpg"
  title="카드 제목"
  description="카드 설명 텍스트입니다. 여러 줄로 표시될 수 있습니다."
  hoverable
  onClick={() => console.log("카드 클릭")}
/>

// ===== 뱃지 포함 카드 =====
<Card
  variant="product"
  image="https://example.com/image.jpg"
  title="상품명"
  description="상품 설명"
  price="10,000원"
  badge="할인"
  hoverable
/>

// ===== 이미지 없는 카드 =====
<Card
  variant="content"
  title="이미지 없는 카드"
  description="이미지 없이 텍스트만 표시할 수 있습니다."
/>

// ===== 클릭 가능한 카드 =====
<Card
  variant="product"
  image="https://example.com/image.jpg"
  title="클릭 가능한 카드"
  description="onClick 핸들러를 제공하면 클릭 가능한 카드가 됩니다."
  onClick={() => {
    console.log("카드 클릭됨");
    // 상세 페이지로 이동 등
  }}
  hoverable
/>

// ===== 주의사항 =====
// 1. variant가 'product'일 때만 price가 표시됨
// 2. hoverable이 true일 때 hover 효과가 적용됨
// 3. onClick이 제공되면 role="button"이 자동으로 설정됨
// 4. Image 컴포넌트를 사용하여 자동으로 비율 판단 (landscape/portrait/square)
// 5. badge는 Badge 컴포넌트로 렌더링됨`,
    PreviewComponent: CardPreview,
  },
  {
    id: "list",
    label: "리스트",
    title: "List / ListItem 컴포넌트",
    description:
      "텍스트 리스트와 아이콘 리스트를 지원하는 리스트 컴포넌트입니다. 클릭 가능한 항목, 비활성화, prefix/suffix, 구분선 등을 지원합니다.",
    code: `import List, { ListItem } from "./List";

// ===== List 컴포넌트 Props 설명 =====
// items: 리스트 아이템 배열 [{ id, content, icon, prefix, suffix, onClick, disabled }] (기본값: [])
// variant: 'text' | 'icon' (기본값: 'text')
// bordered: 테두리 표시 여부 (기본값: true)
// divided: 구분선 표시 여부 (기본값: false)
// className: 추가 클래스명 (선택)
// children: 직접 ListItem을 children으로 전달하는 경우 (items 대신 사용)

// ===== ListItem 컴포넌트 Props 설명 =====
// children: 리스트 아이템 내용 (필수)
// icon: 아이콘 (이모지 또는 텍스트, 선택)
// prefix: 앞쪽 추가 콘텐츠 (선택)
// suffix: 뒤쪽 추가 콘텐츠 (선택)
// onClick: 클릭 핸들러 (선택, 제공 시 클릭 가능한 항목이 됨)
// disabled: 비활성화 여부 (기본값: false)
// className: 추가 클래스명 (선택)

// ===== 기본 텍스트 리스트 =====
const textItems = [
  { id: 1, content: "첫 번째 항목" },
  { id: 2, content: "두 번째 항목" },
  { id: 3, content: "세 번째 항목" },
];

<List items={textItems} variant="text" bordered />

// ===== 아이콘 리스트 =====
const iconItems = [
  { id: 1, content: "홈", icon: "🏠" },
  { id: 2, content: "검색", icon: "🔍" },
  { id: 3, content: "설정", icon: "⚙️" },
  { id: 4, content: "프로필", icon: "👤" },
];

<List items={iconItems} variant="icon" bordered />

// ===== 구분선 있는 리스트 (divided) =====
<List items={textItems} variant="text" bordered divided />

// ===== 클릭 가능한 리스트 =====
const clickableItems = [
  { 
    id: 1, 
    content: "항목 1", 
    onClick: () => console.log("항목 1 클릭") 
  },
  { 
    id: 2, 
    content: "항목 2", 
    onClick: () => console.log("항목 2 클릭") 
  },
  { 
    id: 3, 
    content: "비활성화 항목", 
    onClick: () => {},
    disabled: true 
  },
];

<List items={clickableItems} variant="text" bordered />

// ===== Prefix와 Suffix 사용 =====
const complexItems = [
  { 
    id: 1, 
    content: "알림", 
    icon: "🔔", 
    suffix: "3" 
  },
  { 
    id: 2, 
    content: "메시지", 
    icon: "💬", 
    suffix: "12" 
  },
  { 
    id: 3, 
    content: "이메일", 
    icon: "📧", 
    suffix: "읽지 않음" 
  },
];

<List items={complexItems} variant="icon" bordered />

// ===== 직접 ListItem 사용 (children 방식) =====
// items 배열 대신 children으로 ListItem을 직접 전달
<List variant="text" bordered>
  <ListItem icon="⭐" prefix="1.">
    첫 번째 항목
  </ListItem>
  <ListItem icon="⭐" prefix="2." suffix="완료">
    두 번째 항목
  </ListItem>
  <ListItem 
    icon="⭐" 
    prefix="3." 
    onClick={() => console.log("클릭")}
  >
    세 번째 항목 (클릭 가능)
  </ListItem>
  <ListItem 
    icon="⭐" 
    prefix="4." 
    onClick={() => {}}
    disabled
  >
    네 번째 항목 (비활성화)
  </ListItem>
</List>

// ===== 테두리 없는 리스트 =====
<List items={textItems} variant="text" bordered={false} />

// ===== 아이템 데이터 구조 =====
// items 배열의 각 객체는 다음 속성을 가질 수 있습니다:
const itemExample = {
  id: 1,                    // 고유 식별자 (필수, key로도 사용 가능)
  content: "항목 내용",     // 표시할 내용 (content, children, label 중 하나 사용 가능)
  icon: "🏠",              // 아이콘 (이모지, 텍스트 등)
  prefix: "1.",            // 앞쪽 추가 콘텐츠
  suffix: "완료",          // 뒤쪽 추가 콘텐츠
  onClick: () => {},        // 클릭 핸들러 (제공 시 클릭 가능한 항목)
  disabled: false,          // 비활성화 여부
};

// ===== 주의사항 =====
// 1. items 배열 사용 시 각 객체는 id 또는 key 속성을 가져야 함
// 2. content, children, label 중 하나를 사용하여 아이템 내용 지정
// 3. variant가 'icon'일 때는 icon 속성이 권장됨
// 4. onClick이 제공되면 자동으로 클릭 가능한 항목이 되며, 키보드 접근성 지원 (Enter, Space)
// 5. disabled가 true이면 클릭 및 키보드 이벤트가 비활성화됨
// 6. divided는 bordered가 true일 때만 효과적으로 작동
// 7. children과 items는 동시에 사용할 수 없음 (children 우선)
// 8. 접근성을 위해 클릭 가능한 항목은 role="button"과 aria-disabled 속성 자동 설정`,
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

// ===== Section 태그 사용 =====
<ListContainer
  tag="section"
  title="음료 메뉴"
  description="다양한 음료를 선택하실 수 있습니다."
  bordered
>
  <Card variant="product" title="아메리카노" price="4,500원" />
  <Card variant="product" title="카페라떼" price="5,000원" />
</ListContainer>

// ===== Article 태그 사용 =====
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
</ListContainer>

// ===== 구분선 스타일 (divided) =====
<ListContainer tag="section" divided>
  <div>첫 번째 아이템</div>
  <div>두 번째 아이템</div>
  <div>세 번째 아이템</div>
</ListContainer>

// ===== 테두리 스타일 (bordered) =====
<ListContainer tag="section" bordered>
  <div>테두리가 있는 컨테이너입니다.</div>
  <div>배경색과 테두리가 적용됩니다.</div>
</ListContainer>

// ===== Props 설명 =====
// tag: 'section' | 'article' (기본값: 'section')
// title: 섹션 제목 (선택)
// description: 섹션 설명 (선택)
// bordered: 테두리 표시 여부 (기본값: false)
// divided: 구분선 표시 여부 (기본값: false)
// className: 추가 클래스명 (선택)
// children: 리스트 아이템들`,
    PreviewComponent: ListContainerPreview,
  },
  {
    id: "form",
    label: "폼",
    title: "폼 컴포넌트",
    description:
      "레이블·플레이스홀더·보조텍스트와 함께 간단한 유효성 검사를 포함한 폼입니다. 이름, 휴대폰, 주소, 이메일, 비밀번호를 검증합니다.",
    code: `import { useState } from "react";
import Input from "./Input";
import Button from "./Button";

// ===== HTML 구조 =====
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

// ===== JavaScript 로직 =====
function Form() {
  const [form, setForm] = useState({ 
    name: "", 
    phone: "", 
    address: "", 
    email: "", 
    password: "" 
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  // 입력 필드 변경 핸들러
  const handleChange = (fieldName) => (e, value) => {
    setForm((prev) => ({ ...prev, [fieldName]: value }));
    setMessage("");
    // 에러가 있으면 입력 시 에러 메시지 제거
    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: "" }));
    }
  };

  // 유효성 검사 함수
  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) {
      nextErrors.name = "이름을 입력해주세요.";
    }
    if (!/^01[0-9]-?\d{3,4}-?\d{4}$/.test(form.phone)) {
      nextErrors.phone = "휴대폰 번호를 010-1234-5678 형식으로 입력해주세요.";
    }
    if (!form.address.trim()) {
      nextErrors.address = "주소를 입력해주세요.";
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      nextErrors.email = "유효한 이메일을 입력해주세요.";
    }
    if (form.password.length < 8) {
      nextErrors.password = "비밀번호는 8자 이상이어야 합니다.";
    }
    return nextErrors;
  };

  // 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setMessage("유효성 검사가 완료되었습니다!");
    }
  };

  return (
    // ... 위의 JSX 코드
  );
}

// ===== 스타일 =====
.form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 520px;
}

.form__success {
  margin: 8px 0 0 0;
  color: var(--color-accent);
  font-weight: 700;
  font-size: 13px;
}`,
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
  onClick={() => console.log("클릭됨")}
>
  클릭
</Button>

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

// ===== Props 설명 =====
// children: 내부 콘텐츠
// variant: 'rotate' | 'pulse' | 'gradient' (기본값: 'rotate')
// className: 추가 클래스명
// style: 인라인 스타일

// ===== 회전하는 그라데이션 보더 =====
<BorderAnimation variant="rotate">
  <div>
    <h3>회전 보더</h3>
    <p>그라데이션이 회전하는 보더 애니메이션</p>
  </div>
</BorderAnimation>

// ===== 펄스 보더 =====
<BorderAnimation variant="pulse">
  <div>
    <h3>펄스 보더</h3>
    <p>맥박처럼 뛰는 펄스 애니메이션</p>
  </div>
</BorderAnimation>

// ===== 그라데이션 보더 =====
<BorderAnimation variant="gradient">
  <div>
    <h3>그라데이션 보더</h3>
    <p>위에서 아래로 흐르는 그라데이션</p>
  </div>
</BorderAnimation>

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
import { useState } from "react";

// ===== Props 설명 =====
// message: 토스트에 표시할 메시지 (필수, 빈 문자열이면 렌더링 안 함)
// type: 토스트 타입 'info' | 'success' | 'warning' | 'error' (기본값: 'info')
// duration: 자동 닫힘 시간 (밀리초, 기본값: 3000)
// onClose: 토스트 닫기 핸들러 (필수, duration 후 자동 호출 또는 사용자 클릭 시 호출)

// ===== 기본 사용 =====
// 토스트는 상태 관리와 함께 사용됩니다.
const [toast, setToast] = useState({ message: "", type: "info" });

const showToast = (type, message) => {
  setToast({ message, type });
};

<Toast 
  message={toast.message} 
  type={toast.type} 
  onClose={() => setToast({ message: "", type: "info" })} 
/>

// ===== Type 옵션 =====
// info: 정보성 메시지 (기본값, 파란색)
<Toast 
  message="정보 메시지입니다." 
  type="info" 
  onClose={() => setToast({ message: "", type: "info" })} 
/>

// success: 성공 메시지 (초록색)
<Toast 
  message="작업이 완료되었습니다." 
  type="success" 
  onClose={() => setToast({ message: "", type: "info" })} 
/>

// warning: 경고 메시지 (노란색)
<Toast 
  message="주의가 필요합니다." 
  type="warning" 
  onClose={() => setToast({ message: "", type: "info" })} 
/>

// error: 에러 메시지 (빨간색)
<Toast 
  message="오류가 발생했습니다." 
  type="error" 
  onClose={() => setToast({ message: "", type: "info" })} 
/>

// ===== 자동 닫힘 시간 조정 =====
// duration prop으로 자동 닫힘 시간을 조정할 수 있습니다.
<Toast 
  message="5초 후 자동으로 닫힙니다." 
  type="info" 
  duration={5000}
  onClose={() => setToast({ message: "", type: "info" })} 
/>

// 영구적으로 표시하려면 duration을 매우 큰 값으로 설정
<Toast 
  message="수동으로 닫아야 합니다." 
  type="info" 
  duration={999999}
  onClose={() => setToast({ message: "", type: "info" })} 
/>

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
const [toasts, setToasts] = useState([]);

const addToast = (type, message) => {
  const id = Date.now();
  setToasts(prev => [...prev, { id, type, message }]);
  
  // 자동 제거
  setTimeout(() => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, 3000);
};

const removeToast = (id) => {
  setToasts(prev => prev.filter(toast => toast.id !== id));
};

// 렌더링
{toasts.map(toast => (
  <Toast
    key={toast.id}
    message={toast.message}
    type={toast.type}
    onClose={() => removeToast(toast.id)}
  />
))}

// ===== 전역 토스트 관리 =====
// Context API를 사용하여 전역에서 토스트를 관리할 수 있습니다.
const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ message: "", type: "info" });
  
  const showToast = (type, message) => {
    setToast({ message, type });
  };
  
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
const { showToast } = useContext(ToastContext);
showToast("success", "작업 완료!");

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
    label: "돗바",
    title: "하단 돗바 내비게이션",
    description:
      "모바일 하단 고정형 돗바 UI. 아이콘/라벨 목록을 props로 받아 활성 상태를 표시하며 onChange로 선택 값을 전달합니다.",
    code: `import BottomDock from "./BottomDock";
import { useState } from "react";

// ===== Props 설명 =====
// items: 내비게이션 아이템 배열 [{ key, label, icon }] (기본값: defaultItems)
// onChange: 아이템 선택 핸들러 (선택된 key를 인자로 받음)
// defaultActive: 기본 활성화된 아이템 key (기본값: "home")

// ===== 기본 사용 =====
const items = [
  { key: "home", label: "홈", icon: "🏠" },
  { key: "search", label: "검색", icon: "🔍" },
  { key: "bookmark", label: "즐겨찾기", icon: "⭐" },
  { key: "profile", label: "내 정보", icon: "👤" },
];

<BottomDock
  items={items}
  defaultActive="home"
  onChange={(key) => console.log("selected", key)}
/>

// ===== Controlled 컴포넌트로 사용 =====
// 외부에서 active 상태를 관리하고 싶을 때
const [activeTab, setActiveTab] = useState("home");

<BottomDock
  items={items}
  defaultActive={activeTab}
  onChange={(key) => {
    setActiveTab(key);
    // 페이지 이동 또는 다른 로직 처리
    console.log("탭 변경:", key);
  }}
/>

// ===== 커스텀 아이템 사용 =====
const customItems = [
  { key: "menu1", label: "메뉴 1", icon: "📱" },
  { key: "menu2", label: "메뉴 2", icon: "💬" },
  { key: "menu3", label: "메뉴 3", icon: "⚙️" },
  { key: "menu4", label: "메뉴 4", icon: "📊" },
  { key: "menu5", label: "메뉴 5", icon: "🔔" },
];

<BottomDock
  items={customItems}
  defaultActive="menu1"
  onChange={(key) => handleMenuChange(key)}
/>

// ===== 주의사항 =====
// 1. items 배열의 각 객체는 key, label, icon 속성을 가져야 함
// 2. key는 고유한 식별자로 사용되며, defaultActive와 일치해야 함
// 3. icon은 이모지, 텍스트, 또는 다른 형태의 아이콘을 사용할 수 있음
// 4. onChange 핸들러는 선택된 아이템의 key를 인자로 받음
// 5. active 상태는 컴포넌트 내부에서 관리되며, is-active 클래스가 자동으로 적용됨
// 6. 접근성을 위해 aria-label과 aria-pressed 속성이 자동으로 설정됨`,
    PreviewComponent: BottomDockPreview,
  },
  {
    id: "listsync",
    label: "리스트 동기화",
    title: "선택 리스트 연동",
    description:
      "좌측 버튼 리스트를 클릭하면 우측 리스트에 li로 추가되고, 삭제 버튼을 누르면 선택 목록에서 제거됩니다. onChange로 최신 선택 배열을 전달합니다.",
    code: `import ListSync from "./ListSync";
import { useState } from "react";

// ===== Props 설명 =====
// options: 선택 가능한 옵션 배열 [{ value, label }] (기본값: defaultOptions)
// onChange: 선택된 항목 변경 핸들러 (선택된 배열을 인자로 받음, 선택)

// ===== 기본 사용 =====
// ListSync는 두 개의 영역으로 구성됩니다:
// 1. 소스 영역: 추가할 수 있는 옵션들 (왼쪽)
// 2. 타겟 영역: 선택된 항목들 (오른쪽)
const options = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue.js" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
];

const [selected, setSelected] = useState([]);

<ListSync 
  options={options} 
  onChange={(selectedItems) => {
    setSelected(selectedItems);
    console.log("선택된 항목:", selectedItems);
  }} 
/>

// ===== 선택된 항목 추적 =====
// onChange 핸들러를 통해 선택된 항목을 외부에서 관리할 수 있습니다.
const [selectedItems, setSelectedItems] = useState([]);

const handleChange = (items) => {
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

// ===== Props 설명 =====
// scrollType: 'horizontal' | 'vertical' | 'both' (기본값: 'horizontal')
// headers: 테이블 헤더 배열
// rows: 테이블 데이터 배열

// ===== 타입 1: 가로 스크롤 · 열 고정 테이블 =====
// 가로 스크롤만 가능, 첫 번째 열 고정, 헤더 고정 없음
<Table 
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
<Table 
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
import { useState } from "react";
import Button from "./Button";

// ===== BasicPopup Props 설명 =====
// open: 팝업 열림/닫힘 상태 (boolean, 필수)
// onClose: 팝업 닫기 핸들러 (function, 필수)
// icon: 아이콘 (이모지, 텍스트 등, 기본값: "🔒")
// title: 팝업 제목 (string, 필수)
// description: 팝업 설명 (string, 선택)
// actions: 액션 버튼 배열 [{ label, variant, onClick }] (기본값: [])

// ===== BottomSheetPopup Props 설명 =====
// open: 팝업 열림/닫힘 상태 (boolean, 필수)
// onClose: 팝업 닫기 핸들러 (function, 필수)
// title: 팝업 제목 (string, 필수)
// description: 팝업 설명 (string, 선택)

// ===== FullscreenPopup Props 설명 =====
// open: 팝업 열림/닫힘 상태 (boolean, 필수)
// onClose: 팝업 닫기 핸들러 (function, 필수)
// title: 팝업 제목 (string, 필수)
// body: 팝업 본문 내용 (ReactNode, 필수)

// ===== BasicPopup 사용 =====
// 중앙에 표시되는 기본 팝업입니다.
const [isBasicOpen, setIsBasicOpen] = useState(false);

<BasicPopup
  open={isBasicOpen}
  onClose={() => setIsBasicOpen(false)}
  icon="🔒"
  title="알림"
  description="이 작업을 계속하시겠습니까?"
  actions={[
    {
      label: "취소",
      variant: "ghost",
      onClick: () => setIsBasicOpen(false),
    },
    {
      label: "확인",
      variant: "primary",
      onClick: () => {
        console.log("확인 클릭");
        setIsBasicOpen(false);
      },
    },
  ]}
/>

// 아이콘 없이 사용
<BasicPopup
  open={isBasicOpen}
  onClose={() => setIsBasicOpen(false)}
  title="알림"
  description="작업이 완료되었습니다."
  actions={[
    {
      label: "확인",
      variant: "primary",
      onClick: () => setIsBasicOpen(false),
    },
  ]}
/>

// ===== BottomSheetPopup 사용 =====
// 하단에서 올라오는 바텀시트 팝업입니다. 드래그로 닫을 수 있습니다.
const [isSheetOpen, setIsSheetOpen] = useState(false);

<BottomSheetPopup
  open={isSheetOpen}
  onClose={() => setIsSheetOpen(false)}
  title="옵션 선택"
  description="원하는 옵션을 선택하세요."
/>

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
const [isFullOpen, setIsFullOpen] = useState(false);

<FullscreenPopup
  open={isFullOpen}
  onClose={() => setIsFullOpen(false)}
  title="상세 정보"
  body={
    <div>
      <p>풀스크린 팝업 내용입니다.</p>
      <p>자유롭게 콘텐츠를 구성할 수 있습니다.</p>
    </div>
  }
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
// 풀스크린 팝업 헤더에 닫기 버튼(✕)이 있습니다.
// <button className="popup__close" onClick={onClose} aria-label="닫기">✕</button>

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
//       popup__header: 헤더 (제목 + 닫기 버튼)
//       popup__body: 본문 영역

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

// 3. 상세 정보 (풀스크린)
<FullscreenPopup
  open={isFullOpen}
  onClose={() => setIsFullOpen(false)}
  title="상품 상세 정보"
  body={<ProductDetail product={product} />}
/>

// ===== 주의사항 =====
// 1. open prop이 false이면 팝업이 렌더링되지 않습니다 (null 반환).
// 2. onClose는 필수이며, 팝업을 닫을 때 호출됩니다.
// 3. BasicPopup의 actions 배열이 비어있으면 액션 버튼이 표시되지 않습니다.
// 4. BottomSheetPopup은 드래그로 닫을 수 있으며, 임계값은 120px입니다.
// 5. BottomSheetPopup이 닫힐 때 offset과 startY 상태가 자동으로 초기화됩니다.
// 6. FullscreenPopup의 body는 ReactNode이므로 자유롭게 콘텐츠를 구성할 수 있습니다.
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
    description: "풀팝업 위에 이미지를 올려두고 핀치/휠로 확대·축소하는 예시입니다.",
    code: `import ImageZoomPopup from "./ImageZoomPopup";
import { useState } from "react";

// ===== Props 설명 =====
// src: 이미지 URL (필수)
// alt: 이미지 대체 텍스트 (기본값: "Zoom image")
// open: 팝업 열림/닫힘 상태 (boolean, 필수)
// onClose: 팝업 닫기 핸들러 (function, 필수)

// ===== 기본 사용 =====
const [isOpen, setIsOpen] = useState(false);

<button onClick={() => setIsOpen(true)}>
  이미지 확대 보기
</button>

<ImageZoomPopup
  src="https://example.com/image.jpg"
  alt="확대할 이미지"
  open={isOpen}
  onClose={() => setIsOpen(false)}
/>

// ===== 상태 관리 예제 =====
// 컴포넌트 내부에서 상태를 관리하여 팝업 열기/닫기 제어
const ImageViewer = () => {
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsZoomOpen(true);
  };

  return (
    <>
      <img 
        src="https://example.com/thumbnail.jpg" 
        onClick={() => handleImageClick("https://example.com/full-image.jpg")}
        alt="썸네일"
      />
      
      <ImageZoomPopup
        src={selectedImage}
        alt="확대 이미지"
        open={isZoomOpen}
        onClose={() => {
          setIsZoomOpen(false);
          setSelectedImage(null);
        }}
      />
    </>
  );
};

// ===== 확대/축소 기능 =====
// 1. 핀치 줌 (모바일/터치 디바이스)
//    - 두 손가락으로 터치하여 확대/축소
//    - 손가락 간 거리 변화에 따라 배율 조정
//    - 배율 범위: 1배 ~ 3배

// 2. 마우스 휠/트랙패드 (데스크탑)
//    - 휠을 위로 올리면 확대, 아래로 내리면 축소
//    - 트랙패드 제스처도 지원
//    - 배율 범위: 1배 ~ 3배

// ===== 배율 제한 =====
// clampScale 함수로 배율을 1 ~ 3 범위로 제한
// - 최소 배율: 1배 (원본 크기)
// - 최대 배율: 3배 (3배 확대)
// - 배율은 소수점 3자리까지 정밀하게 계산

// ===== 이미지 로딩 상태 =====
// 컴포넌트 내부에서 이미지 로딩 상태를 자동으로 관리
// - isLoading: true일 때 Loading 컴포넌트 표시
// - 이미지 로드 완료 시 isLoading: false로 변경
// - onLoad, onError 이벤트로 로딩 상태 업데이트

// ===== 이벤트 핸들러 =====
// handleWheel: 마우스 휠/트랙패드 이벤트 처리
//   - e.deltaY 값에 따라 확대/축소
//   - delta = -e.deltaY * 0.0015 (트랙패드/마우스 휠 지원)

// handleTouchStart: 터치 시작 (핀치 줌 시작)
//   - 두 손가락 터치 감지
//   - 시작 거리와 현재 배율 저장

// handleTouchMove: 터치 이동 (핀치 줌 중)
//   - 두 손가락 간 거리 변화 계산
//   - 거리 비율에 따라 배율 조정
//   - e.preventDefault()로 기본 스크롤 방지

// handleTouchEnd: 터치 종료 (핀치 줌 종료)
//   - pinchRef 초기화

// ===== 거리 계산 로직 =====
// getDistance 함수로 두 터치 포인트 간 거리 계산
// const getDistance = (touches) => {
//   const [a, b] = touches;
//   const dx = a.clientX - b.clientX;
//   const dy = a.clientY - b.clientY;
//   return Math.hypot(dx, dy);
// };

// 배율 계산: (시작 배율 * 현재 거리) / 시작 거리
// const next = (pinchRef.current.startScale * dist) / pinchRef.current.startDist;

// ===== 팝업 구조 =====
// popup-overlay--full: 풀스크린 오버레이
// popup--full: 풀스크린 팝업 컨테이너
// popup__header: 헤더 영역 (제목 + 닫기 버튼)
// popup__zoom-hint: 사용 안내 텍스트
// popup__image-viewport: 이미지 뷰포트 (확대/축소 이벤트 처리)
// popup__image-loading: 로딩 중 표시 영역
// popup__image-zoom-element: 확대/축소 가능한 이미지

// ===== 스타일링 =====
// transform: scale(scale) - CSS transform으로 확대/축소
// scale 값은 1 ~ 3 범위로 제한됨 (컴포넌트 내부 useState로 관리)
// 이미지는 Image 컴포넌트를 사용하여 로드 실패 시 폴백 이미지 표시
// 실제 사용: style={{ transform: \`scale(\${scale})\` }}

// ===== 접근성 =====
// - alt 속성으로 이미지 설명 제공
// - 닫기 버튼에 aria-label="닫기" 추가
// - 키보드로 닫기 가능 (ESC 키 등은 부모 컴포넌트에서 처리)

// ===== 주의사항 =====
// 1. open prop이 false이면 컴포넌트가 렌더링되지 않음 (조건부 렌더링)
// 2. 팝업 오버레이 클릭 시 onClose 호출 (배경 클릭으로 닫기)
// 3. 팝업 내부 클릭 시 이벤트 전파 방지 (e.stopPropagation())
// 4. 핀치 줌은 두 손가락 터치일 때만 작동
// 5. 터치 이동 시 e.preventDefault()로 기본 스크롤 방지
// 6. 배율은 소수점 3자리까지 정밀하게 계산 (toFixed(3))
// 7. 이미지 로드 실패 시 Image 컴포넌트의 폴백 이미지 표시
// 8. 로딩 중에는 Loading 컴포넌트가 표시됨
// 9. 핀치 줌 시작 정보는 useRef로 저장 (리렌더링 방지)
// 10. 배율 상태는 useState로 관리 (1 ~ 3 범위)`,
    PreviewComponent: () => {
      const [open, setOpen] = useState(false);
      return (
        <div className="guide-preview guide-preview--popup">
          <button className="btn btn--primary btn--sm" onClick={() => setOpen(true)}>
            이미지 풀팝업 열기
          </button>
          <ImageZoomPopup
            src="https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&w=1200"
            alt="샘플 이미지"
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
    description: "간단한 캘린더 UI로 날짜를 선택합니다. (센터 팝업 기반)",
    code: `import DatePicker from "./DatePicker";
import { useState } from "react";

// ===== DatePicker 컴포넌트 =====
// DatePicker는 react-day-picker 라이브러리를 기반으로 한 날짜 선택 컴포넌트입니다.
// 세 가지 모드를 지원합니다:
// 1. 단일 날짜 선택 (Single)
// 2. 날짜 범위 선택 (Range)
// 3. 멀티 캘린더 범위 선택 (Multi-month Range)

// ===== 기본 사용 =====
// DatePicker 컴포넌트는 내부적으로 상태를 관리하므로 별도의 상태 관리가 필요 없습니다.
<DatePicker />

// ===== 내부 상태 관리 =====
// 컴포넌트 내부에서 다음 상태를 관리합니다:
// - openSingle: 단일 날짜 선택 팝업 열림/닫힘
// - openRange: 날짜 범위 선택 팝업 열림/닫힘
// - openMulti: 멀티 캘린더 팝업 열림/닫힘
// - selected: 선택된 단일 날짜 (Date 객체 또는 null)
// - range: 선택된 날짜 범위 ({ from: Date | null, to: Date | null })
// - multiRange: 멀티 캘린더 선택된 범위 ({ from: Date | null, to: Date | null })

// ===== 단일 날짜 선택 =====
// 하나의 날짜를 선택할 수 있습니다.
// 날짜를 선택하면 selected 상태가 업데이트됩니다.
// formatDate 함수를 사용하여 "YYYY-MM-DD" 형식으로 표시됩니다.

// ===== 날짜 범위 선택 =====
// 시작일과 종료일을 선택할 수 있습니다.
// 날짜를 선택하면 range 상태가 업데이트됩니다.
// formatRange 함수를 사용하여 "YYYY-MM-DD ~ YYYY-MM-DD" 형식으로 표시됩니다.
// 범위가 완전히 선택되지 않으면 "YYYY-MM-DD ~ YYYY-MM-DD"로 표시됩니다.

// ===== 멀티 캘린더 범위 선택 =====
// 2개월 캘린더를 사용하여 날짜 범위를 선택할 수 있습니다.
// numberOfMonths={2}로 설정되어 2개월이 동시에 표시됩니다.
// pagedNavigation prop으로 페이지 네비게이션이 활성화됩니다.

// ===== 날짜 포맷팅 =====
// formatDate(date): 단일 날짜를 "YYYY-MM-DD" 형식으로 변환
// formatRange(range): 날짜 범위를 "YYYY-MM-DD ~ YYYY-MM-DD" 형식으로 변환
// 날짜가 없으면 "YYYY-MM-DD" 또는 "YYYY-MM-DD ~ YYYY-MM-DD"로 표시됩니다.

// ===== 팝업 열기/닫기 =====
// 각 날짜 선택 입력 필드를 클릭하면 해당 팝업이 열립니다.
// 팝업은 절대 위치로 표시되며, 입력 필드 바로 아래에 나타납니다.
// 외부를 클릭하면 자동으로 닫힙니다 (useEffect로 document 클릭 이벤트 감지).

// ===== 닫기 버튼 =====
// 각 팝업 하단에 "닫기" 버튼이 있습니다.
// Button 컴포넌트를 사용하며, variant="ghost", size="small"로 설정됩니다.
// 버튼 클릭 시 해당 팝업이 닫힙니다.

// ===== react-day-picker 설정 =====
// DayPicker 컴포넌트에 다음 props가 적용됩니다:
// - mode: "single" | "range" (선택 모드)
// - selected: 선택된 날짜 또는 범위
// - onSelect: 날짜 선택 핸들러
// - numberOfMonths: 표시할 월 개수 (멀티 캘린더에서 2)
// - pagedNavigation: 페이지 네비게이션 활성화 (멀티 캘린더)
// - weekStartsOn: 0 (일요일부터 시작)
// - locale: ko (한국어 로케일)
// - showOutsideDays: true (이전/다음 달 날짜 표시)
// - fixedWeeks: true (고정된 주 수)

// ===== 외부 클릭 감지 =====
// useEffect를 사용하여 팝업 외부 클릭을 감지합니다.
// containerRef를 사용하여 팝업 컨테이너를 참조합니다.
// document에 mousedown 이벤트 리스너를 등록하고, 외부 클릭 시 모든 팝업을 닫습니다.

// ===== UI 구조 =====
// date-picker: 최상위 컨테이너
//   date-picker__group: 각 날짜 선택 그룹
//     date-picker__group-title: 그룹 제목
//     date-picker__input: 날짜 입력 필드 (클릭 가능)
//       date-picker__icon: 캘린더 아이콘
//     date-picker__popover: 팝업 컨테이너
//       DayPicker 컴포넌트
//       date-picker__close: 닫기 버튼

// ===== 접근성 =====
// - 팝업에 role="dialog" 및 aria-modal="true" 제공
// - 닫기 버튼에 적절한 aria-label 제공
// - 키보드 접근성 지원 (react-day-picker 내장)

// ===== 스타일링 =====
// react-day-picker의 기본 스타일을 오버라이드하여 커스터마이징합니다.
// --rdp-cell-size: 36px (날짜 셀 크기)
// 한국어 로케일을 사용하여 요일과 월 이름이 한글로 표시됩니다.

// ===== 날짜 선택 동작 =====
// 단일 날짜: 날짜를 클릭하면 selected 상태가 업데이트됩니다.
// 범위 선택: 첫 번째 날짜 클릭 시 from이 설정되고, 두 번째 날짜 클릭 시 to가 설정됩니다.
// 범위 선택 시 중간 날짜들은 자동으로 하이라이트됩니다.

// ===== 주의사항 =====
// 1. DatePicker는 내부적으로 상태를 관리하므로 외부에서 제어하려면 컴포넌트를 수정해야 합니다.
// 2. 날짜 선택 후 자동으로 팝업이 닫히지 않으며, 닫기 버튼을 클릭해야 합니다.
// 3. 외부 클릭 시 모든 팝업이 닫히므로, 여러 팝업을 동시에 열 수 없습니다.
// 4. react-day-picker 라이브러리의 스타일을 오버라이드하여 디자인을 맞춥니다.
// 5. 한국어 로케일(ko)을 사용하므로 date-fns/locale/ko를 import해야 합니다.
// 6. 날짜 포맷은 "YYYY-MM-DD" 형식으로 고정되어 있습니다.
// 7. 멀티 캘린더는 2개월만 지원하며, 더 많은 월을 표시하려면 numberOfMonths를 조정해야 합니다.
// 8. 팝업은 절대 위치로 표시되므로 부모 요소의 overflow 설정에 주의해야 합니다.
// 9. 날짜 범위가 완전히 선택되지 않으면 "YYYY-MM-DD ~ YYYY-MM-DD"로 표시됩니다.
// 10. 컴포넌트를 재사용하려면 props로 상태와 핸들러를 받도록 수정하는 것을 권장합니다.`,
    PreviewComponent: DatePicker,
  },
  {
    id: "tooltip",
    label: "툴팁",
    title: "툴팁 컴포넌트",
    description: "물음표 아이콘을 클릭하면 툴팁이 토글되는 UI입니다. top/right/bottom/left 위치를 지원합니다.",
    code: `import Tooltip from "./Tooltip";

// ===== Props 설명 =====
// label: 트리거 버튼의 aria-label (기본값: "도움말")
// text: 툴팁에 표시할 텍스트 내용 (기본값: "툴팁 내용")
// placement: 툴팁 위치 'top' | 'right' | 'bottom' | 'left' (기본값: 'top')

// ===== 기본 사용 =====
// 물음표 아이콘 버튼을 클릭하면 툴팁이 토글됩니다.
<Tooltip 
  text="이것은 툴팁 내용입니다." 
  placement="top" 
/>

// ===== Placement 옵션 =====
// top: 트리거 버튼 위쪽에 표시
<Tooltip text="위쪽 툴팁" placement="top" />

// right: 트리거 버튼 오른쪽에 표시
<Tooltip text="오른쪽 툴팁" placement="right" />

// bottom: 트리거 버튼 아래쪽에 표시
<Tooltip text="아래쪽 툴팁" placement="bottom" />

// left: 트리거 버튼 왼쪽에 표시
<Tooltip text="왼쪽 툴팁" placement="left" />

// ===== 여러 툴팁 배치 =====
<div className="tooltip-row">
  <Tooltip text="위쪽 툴팁" placement="top" />
  <Tooltip text="오른쪽 툴팁" placement="right" />
  <Tooltip text="아래쪽 툴팁" placement="bottom" />
  <Tooltip text="왼쪽 툴팁" placement="left" />
</div>

// ===== 커스텀 레이블 =====
// 트리거 버튼의 접근성 레이블을 커스터마이징할 수 있습니다.
<Tooltip 
  label="도움말 보기" 
  text="이 기능에 대한 자세한 설명입니다." 
  placement="top" 
/>

// ===== 내부 상태 관리 =====
// 컴포넌트 내부에서 open 상태를 관리합니다:
// const [open, setOpen] = useState(false);
//
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
    code: `import Draggable from "react-draggable";
import { useState } from "react";

// ===== 드래그 앤 드롭 리스트 =====
// react-draggable 라이브러리를 사용하여 리스트 아이템의 순서를 변경할 수 있습니다.
// 세로 방향(axis="y")으로만 드래그가 가능하며, 드래그 종료 시 순서가 재정렬됩니다.

// ===== 기본 상태 관리 =====
const [items, setItems] = useState([
  { id: 1, title: "아이템 1" },
  { id: 2, title: "아이템 2" },
  { id: 3, title: "아이템 3" },
  { id: 4, title: "아이템 4" },
]);

const itemHeight = 80; // 각 아이템의 높이 (px)

// ===== 순서 재정렬 함수 =====
// startIndex에서 targetIndex로 아이템을 이동시킵니다.
const reorder = (startIndex, targetIndex) => {
  if (startIndex === targetIndex) return;
  
  const newItems = [...items];
  const [removed] = newItems.splice(startIndex, 1);
  newItems.splice(targetIndex, 0, removed);
  setItems(newItems);
};

// ===== clamp 유틸리티 함수 =====
// 값을 min과 max 사이로 제한합니다.
const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};

// ===== 드래그 종료 핸들러 =====
// 드래그가 끝났을 때 호출되는 함수입니다.
// data.y는 드래그된 거리(픽셀)를 나타냅니다.
// deltaIndex는 이동한 아이템 개수를 계산합니다.
const handleStop = (startIndex, data) => {
  const deltaIndex = Math.round(data.y / itemHeight);
  const target = clamp(startIndex + deltaIndex, 0, items.length - 1);
  reorder(startIndex, target);
};

// ===== Draggable 컴포넌트 사용 =====
// axis="y": 세로 방향으로만 드래그 가능
// onStop: 드래그 종료 시 호출되는 핸들러
//   - e: 이벤트 객체
//   - data: { x, y, deltaX, deltaY, lastX, lastY } 드래그 정보
return (
  <div className="drag-drop-list">
    {items.map((item, index) => (
      <Draggable
        key={item.id}
        axis="y"
        onStop={(e, data) => handleStop(index, data)}
        handle=".drag-handle" // 드래그 핸들 영역 지정 (선택)
      >
        <div className="card">
          <div className="drag-handle">⋮⋮</div>
          <h3>{item.title}</h3>
          <p>드래그하여 순서를 변경할 수 있습니다.</p>
        </div>
      </Draggable>
    ))}
  </div>
);

// ===== 드래그 핸들 =====
// handle prop을 사용하여 특정 영역만 드래그 가능하도록 할 수 있습니다.
// handle=".drag-handle"로 설정하면 .drag-handle 클래스를 가진 요소만 드래그할 수 있습니다.
<Draggable
  axis="y"
  onStop={(e, data) => handleStop(index, data)}
  handle=".drag-handle"
>
  <div className="card">
    <div className="drag-handle">드래그 영역</div>
    <div>이 영역은 드래그할 수 없습니다.</div>
  </div>
</Draggable>

// ===== 드래그 제약 =====
// bounds prop을 사용하여 드래그 범위를 제한할 수 있습니다.
<Draggable
  axis="y"
  onStop={(e, data) => handleStop(index, data)}
  bounds={{ top: -100, bottom: 100 }} // 위아래 100px 범위로 제한
>
  <div className="card">...</div>
</Draggable>

// ===== 드래그 시작/진행 이벤트 =====
// onStart: 드래그 시작 시 호출
// onDrag: 드래그 중 호출 (실시간)
const handleStart = (e, data) => {
  console.log("드래그 시작:", data);
};

const handleDrag = (e, data) => {
  console.log("드래그 중:", data);
};

<Draggable
  axis="y"
  onStart={handleStart}
  onDrag={handleDrag}
  onStop={(e, data) => handleStop(index, data)}
>
  <div className="card">...</div>
</Draggable>

// ===== 드래그 비활성화 =====
// disabled prop을 사용하여 드래그를 비활성화할 수 있습니다.
<Draggable
  axis="y"
  disabled={isEditing} // 편집 모드일 때 드래그 비활성화
  onStop={(e, data) => handleStop(index, data)}
>
  <div className="card">...</div>
</Draggable>

// ===== 그리드 스냅 =====
// grid prop을 사용하여 그리드에 맞춰 스냅할 수 있습니다.
<Draggable
  axis="y"
  grid={[0, itemHeight]} // [x, y] 그리드 크기
  onStop={(e, data) => handleStop(index, data)}
>
  <div className="card">...</div>
</Draggable>

// ===== 드래그 중 스타일 =====
// 드래그 중인 아이템에 시각적 피드백을 제공할 수 있습니다.
const [draggingIndex, setDraggingIndex] = useState(null);

const handleStart = (index) => {
  setDraggingIndex(index);
};

const handleStop = (startIndex, data) => {
  setDraggingIndex(null);
  const deltaIndex = Math.round(data.y / itemHeight);
  const target = clamp(startIndex + deltaIndex, 0, items.length - 1);
  reorder(startIndex, target);
};

<Draggable
  axis="y"
  onStart={() => handleStart(index)}
  onStop={(e, data) => handleStop(index, data)}
>
  <div className={\`card \${draggingIndex === index ? 'is-dragging' : ''}\`}>
    ...
  </div>
</Draggable>

// ===== 접근성 =====
// - 드래그 가능한 요소에 aria-label 제공
// - 키보드 접근성 고려 (드래그 대신 위/아래 화살표 키로 순서 변경)
// - 스크린 리더 사용자를 위한 안내 제공

// ===== 성능 최적화 =====
// 많은 아이템이 있을 경우 가상화를 고려해야 합니다.
// react-window나 react-virtualized를 사용하여 렌더링 성능을 개선할 수 있습니다.

// ===== 주의사항 =====
// 1. react-draggable 라이브러리를 설치해야 합니다: npm install react-draggable
// 2. axis="y"로 설정하면 세로 방향으로만 드래그 가능합니다.
// 3. itemHeight는 각 아이템의 실제 높이와 일치해야 정확한 순서 변경이 가능합니다.
// 4. Math.round()를 사용하여 가장 가까운 아이템 위치로 스냅합니다.
// 5. clamp 함수로 인덱스가 배열 범위를 벗어나지 않도록 제한해야 합니다.
// 6. 드래그 중에는 다른 상호작용(클릭 등)이 방해될 수 있으므로 주의해야 합니다.
// 7. 모바일 환경에서는 터치 이벤트가 제대로 작동하는지 테스트해야 합니다.
// 8. 드래그 핸들을 제공하면 사용자가 더 쉽게 드래그할 수 있습니다.
// 9. 드래그 중인 아이템에 시각적 피드백을 제공하면 UX가 개선됩니다.
// 10. 순서 변경 후 서버에 저장하는 로직을 추가해야 합니다.`,
    PreviewComponent: DragDropList,
  },
  {
    id: "carousel",
    label: "캐러셀",
    title: "Swiper 캐러셀",
    description:
      "react + swiper 캐러셀. 기본 네비게이션/페이지네이션 + loop/간격 옵션을 사용하며, breakpoints로 반응형 슬라이드 수를 조절합니다. fade, cube, coverflow, flip 등 다양한 전환 효과도 제공합니다.",
    code: `import Carousel from "./Carousel";

// ===== Props 설명 =====
// slides: 슬라이드 데이터 배열 [{ id, title, desc, description, image }] (기본값: defaultSlides)
// showOptionsPanel: 옵션 패널 표시 여부 (기본값: false)

// ===== 기본 사용 =====
// 기본 데이터를 사용하여 캐러셀 표시
<Carousel />

// ===== 커스텀 슬라이드 데이터 =====
const customSlides = [
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
const singleSlide = [
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
const defaultSlides = [
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
const options = [
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
const [selectedOption, setSelectedOption] = useState(null);

<Dropdown
  options={options}
  onChange={(option) => {
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

// ===== Props 설명 =====
// items: [{ id, label, description }] - 탭 아이템 배열 (필수)
// type: 'default' | 'scroll' | 'swiper' (기본값: 'default')
// scrollContainerId: 스크롤 컨테이너 ID (type이 'scroll'일 때 필수)
// onChange: (activeTabId) => void - 탭 변경 핸들러 (선택)
// className: 추가 클래스명 (선택)

// ===== 기본 타입 (Default) =====
const defaultItems = [
  { id: "detail", label: "상세", description: "상세 정보를 표시합니다." },
  { id: "review", label: "리뷰", description: "리뷰를 표시합니다." },
  { id: "qa", label: "Q&A", description: "질문과 답변을 표시합니다." },
];

<Tabs items={defaultItems} type="default" />

// ===== 스크롤 타입 (Scroll) =====
// 부모 스크롤바를 이용한 가운데 정렬
// scrollContainerId는 필수이며, 해당 ID를 가진 요소가 스크롤 컨테이너가 됩니다.
<div id="tabs-scroll-container" style={{ overflowX: "auto" }}>
  <Tabs 
    items={defaultItems} 
    type="scroll" 
    scrollContainerId="tabs-scroll-container"
  />
</div>

// ===== Swiper 타입 =====
// Swiper.js를 이용한 가운데 정렬 및 스와이프 제스처 지원
<Tabs 
  items={defaultItems} 
  type="swiper"
  onChange={(activeTabId) => console.log("선택된 탭:", activeTabId)}
/>

// ===== 탭 변경 이벤트 처리 =====
const [activeTab, setActiveTab] = useState("detail");

<Tabs 
  items={defaultItems} 
  type="default"
  onChange={(activeTabId) => {
    setActiveTab(activeTabId);
    console.log("탭 변경:", activeTabId);
  }}
/>

// ===== 주의사항 =====
// 1. scroll 타입 사용 시 scrollContainerId는 필수
// 2. scrollContainerId는 실제 DOM에 존재하는 ID여야 함
// 3. Swiper 타입은 스와이프 제스처로도 탭 변경 가능
// 4. 탭 클릭 시 active 클래스가 즉시 적용됨
// 5. Swiper 타입에서 onSlideChange로 스와이프 제스처 감지
// 6. items 배열의 첫 번째 아이템이 기본 선택됨
// 7. description은 탭 패널에 표시되는 내용`,
    PreviewComponent: TabsPreview,
  },
  {
    id: "image",
    label: "이미지",
    title: "이미지 컴포넌트",
    description:
      "이미지 로드 실패 시 자동으로 'noimage' 이미지를 표시하고, 원본 이미지의 가로/세로 비율에 따라 자동으로 클래스를 부여합니다.",
    code: `import Image from "./Image";

// ===== Props 설명 =====
// src: 이미지 URL (필수)
// alt: 이미지 대체 텍스트 (기본값: "")
// className: 추가 클래스명 (선택)
// width: 이미지 너비 (문자열 또는 숫자, 선택)
// height: 이미지 높이 (문자열 또는 숫자, 선택)
// fallbackSrc: 커스텀 폴백 이미지 URL (선택, 사용되지 않음 - 내장 폴백 사용)
// showFallback: 폴백 이미지 표시 여부 (기본값: true)
// onLoad: 이미지 로드 완료 핸들러 (선택)
// onError: 이미지 로드 실패 핸들러 (선택)

// ===== 기본 사용 =====
<Image
  src="https://example.com/image.jpg"
  alt="이미지 설명"
/>

// ===== 크기 지정 =====
<Image
  src="https://example.com/image.jpg"
  alt="이미지 설명"
  width="300"
  height="200"
/>

// 숫자로도 지정 가능
<Image
  src="https://example.com/image.jpg"
  alt="이미지 설명"
  width={300}
  height={200}
/>

// ===== 이미지 로드 이벤트 핸들러 =====
const handleImageLoad = () => {
  console.log("이미지 로드 완료");
};

const handleImageError = () => {
  console.log("이미지 로드 실패");
};

<Image
  src="https://example.com/image.jpg"
  alt="이미지 설명"
  onLoad={handleImageLoad}
  onError={handleImageError}
/>

// ===== 폴백 이미지 비활성화 =====
// showFallback이 false이면 로드 실패 시 아무것도 렌더링하지 않음
<Image
  src="https://invalid-url.com/image.jpg"
  alt="이미지 설명"
  showFallback={false}
/>

// ===== 자동 비율 클래스 =====
// 이미지의 가로/세로 비율에 따라 자동으로 클래스가 적용됨
// - ratio > 1.1: image--landscape (가로형)
// - ratio < 0.9: image--portrait (세로형)
// - 0.9 <= ratio <= 1.1: image--square (정사각형)

// 가로형 이미지 (예: 1920x1080)
<Image
  src="https://example.com/landscape.jpg"
  alt="가로형 이미지"
  className="image--landscape" // 자동 적용됨
/>

// 세로형 이미지 (예: 1080x1920)
<Image
  src="https://example.com/portrait.jpg"
  alt="세로형 이미지"
  className="image--portrait" // 자동 적용됨
/>

// 정사각형 이미지 (예: 1000x1000)
<Image
  src="https://example.com/square.jpg"
  alt="정사각형 이미지"
  className="image--square" // 자동 적용됨
/>

// ===== 로드 상태 클래스 =====
// 이미지 로드 상태에 따라 자동으로 클래스가 적용됨
// - image--loading: 로딩 중
// - image--loaded: 로드 완료 (자동 제거됨)
// - image--error: 로드 실패
// - image--fallback: 폴백 이미지 표시 중

// ===== 폴백 이미지 =====
// 이미지 로드 실패 시 자동으로 내장된 "noimage" SVG 이미지가 표시됨
// showFallback이 true일 때만 표시됨 (기본값: true)

<Image
  src="https://invalid-url.com/image.jpg"
  alt="로드 실패 이미지"
  showFallback={true} // 기본값
/>

// ===== 커스텀 클래스 추가 =====
<Image
  src="https://example.com/image.jpg"
  alt="이미지 설명"
  className="my-custom-image"
/>

// ===== 이미지 로드 상태 관리 =====
// 컴포넌트 내부에서 이미지 로드 상태를 자동으로 관리합니다:
// 1. 초기 상태: "loading"
// 2. 로드 성공: "loaded"
// 3. 로드 실패: "error"

// useEffect를 사용하여 이미지 로드를 미리 검증하고
// 비율을 계산하여 적절한 클래스를 적용합니다.

// ===== 비율 판단 로직 =====
// 이미지의 naturalWidth와 naturalHeight를 사용하여 비율 계산
// const ratio = img.naturalWidth / img.naturalHeight;
// - ratio > 1.1: landscape (가로형)
// - ratio < 0.9: portrait (세로형)
// - 0.9 <= ratio <= 1.1: square (정사각형)

// ===== 주의사항 =====
// 1. src가 없거나 빈 문자열이면 즉시 error 상태로 설정됨
// 2. 이미지 로드 실패 시 showFallback이 true이면 내장 폴백 이미지 표시
// 3. showFallback이 false이면 로드 실패 시 null 반환 (아무것도 렌더링하지 않음)
// 4. 비율 판단은 이미지의 naturalWidth/naturalHeight를 사용 (표시 크기가 아님)
// 5. onLoad 핸들러는 이미지가 실제로 로드된 후에 호출됨
// 6. onError 핸들러는 이미지 로드 실패 시 호출됨
// 7. 접근성을 위해 alt 속성 제공 권장
// 8. 폴백 이미지는 SVG 형식의 data URL로 내장되어 있음
// 9. 이미지 로드 전에 비율을 미리 계산하기 위해 임시 img 요소를 생성함
// 10. aspectRatio 클래스는 이미지 로드 완료 후에만 적용됨`,
    PreviewComponent: ImagePreview,
  },
  {
    id: "loading",
    label: "로딩",
    title: "로딩 인디케이터",
    description:
      "로딩 상태를 명확히 알려주는 스피너형 인디케이터입니다. size와 thickness로 크기를 조절하고, label로 접근성 텍스트를 제공합니다.",
    code: `import Loading from "./Loading";

// ===== Props 설명 =====
// size: 스피너 크기 (px, 기본값: 48)
// thickness: 스피너 테두리 두께 (px, 기본값: 4)
// label: 접근성용 라벨 텍스트 (기본값: "로딩 중...")

// ===== 기본 사용 =====
// 기본 크기와 두께로 로딩 인디케이터를 표시합니다.
<Loading />

// ===== 크기 조정 =====
// size prop으로 스피너 크기를 조정할 수 있습니다.
<Loading size={32} />  // 작은 크기
<Loading size={48} />  // 기본 크기
<Loading size={64} />  // 큰 크기
<Loading size={96} />  // 매우 큰 크기

// ===== 두께 조정 =====
// thickness prop으로 스피너 테두리 두께를 조정할 수 있습니다.
<Loading size={48} thickness={2} />  // 얇은 테두리
<Loading size={48} thickness={4} />  // 기본 두께
<Loading size={48} thickness={6} />  // 두꺼운 테두리

// ===== 라벨 커스터마이징 =====
// label prop으로 접근성 텍스트를 변경할 수 있습니다.
<Loading label="데이터를 불러오는 중..." />
<Loading label="처리 중입니다. 잠시만 기다려주세요." />
<Loading label="로딩" />

// 라벨을 숨기려면 빈 문자열을 전달할 수 있습니다.
<Loading label="" />

// ===== 크기와 두께 조합 =====
// size와 thickness를 조합하여 다양한 스타일을 만들 수 있습니다.
<Loading size={32} thickness={3} label="작은 로딩" />
<Loading size={48} thickness={4} label="기본 로딩" />
<Loading size={64} thickness={5} label="큰 로딩" />

// ===== 사용 사례 =====
// 1. 페이지 로딩
{isLoading ? (
  <Loading size={64} thickness={5} label="페이지를 불러오는 중..." />
) : (
  <PageContent />
)}

// 2. 버튼 로딩
<button disabled={isSubmitting}>
  {isSubmitting ? (
    <>
      <Loading size={16} thickness={2} label="" />
      <span>제출 중...</span>
    </>
  ) : (
    "제출"
  )}
</button>

// 3. 리스트 로딩
{isLoading ? (
  <div style={{ textAlign: "center", padding: "40px" }}>
    <Loading size={48} label="목록을 불러오는 중..." />
  </div>
) : (
  <ItemList items={items} />
)}

// 4. 모달 로딩
<Modal>
  {isLoading ? (
    <Loading size={48} label="처리 중입니다." />
  ) : (
    <ModalContent />
  )}
</Modal>

// ===== 인라인 스타일 =====
// Loading 컴포넌트는 size와 thickness를 인라인 스타일로 적용합니다.
// const style = {
//   width: size,
//   height: size,
//   borderWidth: thickness,
// };

// ===== UI 구조 =====
// loading: 최상위 컨테이너 (div)
//   loading__spinner: 스피너 요소 (span, 인라인 스타일 적용)
//   loading__label: 라벨 텍스트 (span, label이 있을 때만 표시)

// ===== 접근성 =====
// - role="status" 제공 (스크린 리더에 상태 변경 알림)
// - aria-live="polite" 제공 (스크린 리더가 우선순위 낮게 읽음)
// - aria-label={label} 제공 (접근성 라벨)
// - label prop으로 사용자에게 로딩 상태를 알립니다.

// ===== 스피너 애니메이션 =====
// 스피너는 CSS 애니메이션으로 회전합니다.
// border-top-color만 색상이 다르게 설정되어 회전 효과를 만듭니다.
// 애니메이션은 무한 반복됩니다.

// ===== 주의사항 =====
// 1. size는 픽셀 단위이며, 숫자로 전달합니다.
// 2. thickness는 픽셀 단위이며, 숫자로 전달합니다.
// 3. label은 접근성을 위해 제공하는 것을 권장합니다.
// 4. label이 빈 문자열이면 라벨 요소가 렌더링되지 않습니다.
// 5. 로딩이 완료되면 즉시 Loading 컴포넌트를 제거해야 합니다.
// 6. 여러 로딩 인디케이터를 동시에 표시할 때는 각각 다른 label을 제공하는 것이 좋습니다.
// 7. 버튼 내부에 사용할 때는 작은 크기(size={16})를 사용하는 것이 좋습니다.
// 8. 전체 페이지 로딩에는 큰 크기(size={64} 이상)를 사용하는 것이 좋습니다.
// 9. 스피너는 항상 중앙 정렬로 표시하는 것이 일반적입니다.
// 10. 로딩 시간이 길 경우 진행률 표시를 고려해야 합니다.`,
    PreviewComponent: LoadingPreview,
  },
  {
    id: "accordion",
    label: "아코디언",
    title: "Accordion 컴포넌트",
    description:
      "여러 항목을 접었다 펼칠 수 있는 아코디언 컴포넌트입니다. Exclusive 타입(하나만 열림)과 Independent 타입(독립적으로 열림) 두 가지 모드를 지원합니다. CSS transition을 사용하여 부드러운 애니메이션 효과를 제공하며, 콘텐츠 클릭 시 아코디언이 닫히지 않도록 이벤트 전파를 방지합니다.",
    code: `import Accordion from "./Accordion";

// ===== Props 설명 =====
// items: [{ id, label, content }] - 아코디언 아이템 배열 (필수)
// type: 'exclusive' | 'independent' (기본값: 'exclusive')
// defaultOpenFirst: 첫 번째 아이템 기본 열림 여부 (기본값: false)
// className: 추가 클래스명 (선택)

// ===== Exclusive 타입 (하나만 열림) =====
// 하나를 클릭하면 나머지는 모두 닫힘 (토글 방식)
const exclusiveItems = [
  { id: "1", label: "에피타이저", content: "에피타이저 메뉴입니다." },
  { id: "2", label: "메인 음식", content: "메인 음식 메뉴입니다." },
  { id: "3", label: "디저트", content: "디저트 메뉴입니다." },
];

<Accordion items={exclusiveItems} type="exclusive" />

// ===== Independent 타입 (독립적으로 열림) =====
// 각각 독립적으로 열고 닫을 수 있음 (여러 개 동시에 열 수 있음)
const independentItems = [
  { id: "4", label: "음료", content: "음료 메뉴입니다." },
  { id: "5", label: "셀러드", content: "셀러드 메뉴입니다." },
  { id: "6", label: "일식", content: "일식 메뉴입니다." },
];

<Accordion items={independentItems} type="independent" />

// ===== 첫 번째 아이템 기본 열림 =====
<Accordion 
  items={exclusiveItems} 
  type="exclusive" 
  defaultOpenFirst={true} 
/>

// ===== React 컴포넌트를 content로 사용 =====
const itemsWithComponent = [
  {
    id: "1",
    label: "복잡한 콘텐츠",
    content: (
      <div>
        <h4>제목</h4>
        <p>설명</p>
        <button>액션 버튼</button>
      </div>
    ),
  },
];

<Accordion items={itemsWithComponent} type="independent" />

// ===== 주의사항 =====
// 1. items 배열의 각 객체는 id, label, content 속성을 가져야 함
// 2. content는 문자열 또는 React 컴포넌트가 될 수 있음
// 3. Exclusive 타입: 하나만 열림 (토글 방식)
// 4. Independent 타입: 여러 개 동시에 열 수 있음
// 5. 콘텐츠 클릭 시 아코디언이 닫히지 않도록 이벤트 전파 방지
// 6. max-height를 사용한 CSS transition 애니메이션
// 7. defaultOpenFirst가 true이면 첫 번째 아이템이 기본으로 열림`,
    PreviewComponent: AccordionPreview,
  },
  {
    id: "badge",
    label: "뱃지",
    title: "뱃지 컴포넌트",
    description:
      "상태, 카테고리, 라벨 등을 표시하는 작은 뱃지 컴포넌트입니다. 다양한 variant와 size, outlined 스타일을 지원합니다.",
    code: `import Badge from "./Badge";

// ===== Props 설명 =====
// children: 뱃지에 표시할 텍스트 (필수)
// variant: 뱃지 스타일 'default' | 'success' | 'warning' | 'error' | 'info' (기본값: 'default')
// size: 뱃지 크기 'small' | 'medium' | 'large' (기본값: 'medium')
// outlined: 아웃라인 스타일 여부 (기본값: false)
// className: 추가 클래스명 (선택)

// ===== 기본 사용 =====
// children으로 텍스트를 전달합니다.
<Badge>기본</Badge>

// ===== Variant 옵션 =====
// default: 기본 스타일 (회색)
<Badge variant="default">기본</Badge>

// success: 성공 상태 (초록색)
<Badge variant="success">성공</Badge>
<Badge variant="success">완료</Badge>
<Badge variant="success">승인</Badge>

// warning: 경고 상태 (노란색)
<Badge variant="warning">경고</Badge>
<Badge variant="warning">주의</Badge>
<Badge variant="warning">대기</Badge>

// error: 오류 상태 (빨간색)
<Badge variant="error">오류</Badge>
<Badge variant="error">실패</Badge>
<Badge variant="error">거부</Badge>

// info: 정보 상태 (파란색)
<Badge variant="info">정보</Badge>
<Badge variant="info">신규</Badge>
<Badge variant="info">알림</Badge>

// ===== Outlined 스타일 =====
// outlined={true}로 설정하면 배경 없이 테두리만 표시됩니다.
<Badge variant="success" outlined>성공</Badge>
<Badge variant="warning" outlined>경고</Badge>
<Badge variant="error" outlined>오류</Badge>
<Badge variant="info" outlined>정보</Badge>

// ===== Size 옵션 =====
// small: 작은 크기
<Badge size="small">Small</Badge>
<Badge variant="success" size="small">작은 뱃지</Badge>

// medium: 중간 크기 (기본값)
<Badge size="medium">Medium</Badge>
<Badge variant="warning" size="medium">중간 뱃지</Badge>

// large: 큰 크기
<Badge size="large">Large</Badge>
<Badge variant="error" size="large">큰 뱃지</Badge>

// ===== Variant, Size, Outlined 조합 =====
// 모든 옵션을 조합하여 사용할 수 있습니다.
<Badge variant="error" size="small" outlined>HOT</Badge>
<Badge variant="success" size="large" outlined>NEW</Badge>
<Badge variant="info" size="medium">SALE</Badge>

// ===== 사용 사례 =====
// 1. 상태 표시
<div>
  <span>주문 상태: </span>
  <Badge variant="success">완료</Badge>
</div>

// 2. 카테고리 표시
<div>
  <span>카테고리: </span>
  <Badge variant="info" outlined>전자제품</Badge>
</div>

// 3. 알림 뱃지 (숫자)
<Badge variant="error" size="small">3</Badge>

// 4. 라벨 표시
<Badge variant="warning" size="small">인기</Badge>
<Badge variant="error" size="small">할인</Badge>
<Badge variant="info" size="small">신상품</Badge>

// 5. 버튼과 함께 사용
<button>
  알림
  <Badge variant="error" size="small">5</Badge>
</button>

// ===== UI 구조 =====
// badge: 최상위 컨테이너 (span 태그)
//   badge--{variant}: variant별 클래스 (default, success, warning, error, info)
//   badge--{size}: size별 클래스 (small, medium, large)
//   badge--outlined: outlined 스타일 클래스 (outlined={true}일 때)

// ===== 스타일링 =====
// 각 variant는 고유한 색상을 가집니다:
// - default: 회색 계열
// - success: 초록색 계열
// - warning: 노란색 계열
// - error: 빨간색 계열
// - info: 파란색 계열
//
// outlined 스타일은 배경이 투명하고 테두리만 표시됩니다.
// size에 따라 폰트 크기와 패딩이 조정됩니다.

// ===== 접근성 =====
// Badge는 span 태그로 렌더링되므로 시맨틱한 의미를 전달합니다.
// 상태를 나타낼 때는 적절한 variant를 사용하여 색상으로 의미를 전달합니다.
// 스크린 리더 사용자를 위해 추가 설명이 필요할 수 있습니다.

// ===== 주의사항 =====
// 1. children은 필수이며, 텍스트나 숫자를 전달합니다.
// 2. variant는 'default', 'success', 'warning', 'error', 'info' 중 하나여야 합니다.
// 3. size는 'small', 'medium', 'large' 중 하나여야 합니다.
// 4. outlined는 boolean 값이며, 기본값은 false입니다.
// 5. className을 추가하여 커스텀 스타일을 적용할 수 있습니다.
// 6. Badge는 인라인 요소이므로 텍스트와 함께 사용할 수 있습니다.
// 7. 숫자 뱃지는 보통 작은 크기(small)를 사용합니다.
// 8. 여러 뱃지를 나란히 배치할 때는 gap을 조정해야 할 수 있습니다.
// 9. outlined 스타일은 배경이 투명하므로 배경색이 있는 요소 위에 사용하는 것이 좋습니다.
// 10. 접근성을 위해 색상만으로 의미를 전달하지 말고 텍스트로도 의미를 전달해야 합니다.`,
    PreviewComponent: BadgePreview,
  },
  {
    id: "search-field",
    label: "서치 필드",
    title: "검색 필드 컴포넌트",
    description:
      "검색 아이콘, 입력 필드, 클리어 버튼, 검색 버튼을 포함한 검색 입력 컴포넌트입니다. Enter 키로 검색할 수 있으며, 다양한 size와 variant를 지원합니다.",
    code: `import SearchField from "./SearchField";
import { useState } from "react";

// ===== Props 설명 =====
// placeholder: 플레이스홀더 텍스트 (기본값: "검색어를 입력하세요")
// value: 입력 값 (controlled 모드, 선택)
// onChange: 값 변경 핸들러 (e, newValue) => void (선택)
// onSearch: 검색 실행 핸들러 (Enter 키 또는 검색 버튼 클릭 시, value를 인자로 받음, 선택)
// onClear: 클리어 핸들러 (클리어 버튼 클릭 시, 선택)
// showClearButton: 클리어 버튼 표시 여부 (기본값: true)
// size: 'small' | 'medium' | 'large' (기본값: 'medium')
// variant: 'default' | 'filled' | 'outlined' (기본값: 'default')
// disabled: 비활성화 여부 (기본값: false)
// className: 추가 클래스명 (선택)

// ===== 기본 사용 (Uncontrolled) =====
// value prop을 제공하지 않으면 내부 상태로 관리
<SearchField
  placeholder="검색어를 입력하세요"
  onChange={(e, value) => console.log("입력값:", value)}
/>

// ===== Controlled 모드 =====
// value와 onChange를 함께 제공하여 외부에서 상태 관리
const [searchValue, setSearchValue] = useState("");

<SearchField
  placeholder="상품명, 브랜드명을 입력하세요"
  value={searchValue}
  onChange={(e, value) => setSearchValue(value)}
  onClear={() => setSearchValue("")}
/>

// ===== 검색 버튼 포함 =====
// onSearch prop을 제공하면 검색 버튼이 표시됨
// Enter 키를 누르거나 검색 버튼을 클릭하면 onSearch 호출
const [query, setQuery] = useState("");

<SearchField
  placeholder="검색어를 입력하세요"
  value={query}
  onChange={(e, value) => setQuery(value)}
  onSearch={(value) => {
    console.log("검색 실행:", value);
    // 검색 API 호출 등
    performSearch(value);
  }}
  onClear={() => setQuery("")}
/>

// ===== Enter 키로 검색 =====
// onSearch가 제공되면 Enter 키를 누르면 자동으로 검색 실행
// handleKeyDown에서 e.key === "Enter" 체크
// e.preventDefault()로 기본 폼 제출 방지
<SearchField
  placeholder="검색어를 입력하세요"
  value={query}
  onChange={(e, value) => setQuery(value)}
  onSearch={(value) => {
    console.log("Enter 키로 검색:", value);
  }}
/>

// ===== 클리어 버튼 =====
// showClearButton={true}이고 값이 있을 때만 표시
// 클리어 버튼 클릭 시:
// 1. 값 초기화 (controlled/uncontrolled 자동 처리)
// 2. onChange 호출 (빈 문자열)
// 3. onClear 호출 (제공된 경우)
// 4. input에 포커스 이동 (inputRef.current.focus())

<SearchField
  placeholder="검색어를 입력하세요"
  value={query}
  onChange={(e, value) => setQuery(value)}
  onClear={() => {
    console.log("검색어가 지워졌습니다");
    // 추가 로직 (예: 검색 결과 초기화)
    clearSearchResults();
  }}
/>

// 클리어 버튼 숨기기
<SearchField
  placeholder="검색어를 입력하세요"
  showClearButton={false}
  onChange={(e, value) => setQuery(value)}
/>

// ===== Size 옵션 =====
// small: 작은 크기
<SearchField
  size="small"
  placeholder="Small size"
  onChange={(e, value) => console.log(value)}
/>

// medium: 중간 크기 (기본값)
<SearchField
  size="medium"
  placeholder="Medium size"
  onChange={(e, value) => console.log(value)}
/>

// large: 큰 크기
<SearchField
  size="large"
  placeholder="Large size"
  onChange={(e, value) => console.log(value)}
/>

// ===== Variant 옵션 =====
// default: 기본 스타일
<SearchField
  variant="default"
  placeholder="Default variant"
  onChange={(e, value) => console.log(value)}
/>

// filled: 채워진 배경
<SearchField
  variant="filled"
  placeholder="Filled variant"
  onChange={(e, value) => console.log(value)}
/>

// outlined: 외곽선만
<SearchField
  variant="outlined"
  placeholder="Outlined variant"
  onChange={(e, value) => console.log(value)}
/>

// ===== Size & Variant 조합 =====
<SearchField size="small" variant="default" placeholder="Small default" />
<SearchField size="medium" variant="filled" placeholder="Medium filled" />
<SearchField size="large" variant="outlined" placeholder="Large outlined" />

// ===== 비활성화 상태 =====
// disabled={true}: 입력 불가, 클리어 버튼 숨김, 검색 버튼 비활성화
<SearchField
  placeholder="비활성화된 검색 필드"
  disabled
  value="수정 불가"
/>

// ===== 검색 기능 구현 예제 =====
const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query) => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    try {
      const results = await fetchSearchResults(query);
      setSearchResults(results);
    } catch (error) {
      console.error("검색 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <div>
      <SearchField
        placeholder="상품명, 브랜드명을 입력하세요"
        value={searchQuery}
        onChange={(e, value) => setSearchQuery(value)}
        onSearch={handleSearch}
        onClear={handleClear}
      />
      
      {isLoading && <div>검색 중...</div>}
      {searchResults.length > 0 && (
        <div>
          {searchResults.map((item) => (
            <div key={item.id}>{item.name}</div>
          ))}
        </div>
      )}
    </div>
  );
};

// ===== Controlled vs Uncontrolled =====
// Controlled: value prop 제공, 외부에서 상태 관리
const [value, setValue] = useState("");
<SearchField
  value={value}
  onChange={(e, newValue) => setValue(newValue)}
/>

// Uncontrolled: value prop 미제공, 내부 상태로 관리
<SearchField
  onChange={(e, newValue) => console.log("입력값:", newValue)}
/>

// isControlled 체크 로직:
// const isControlled = controlledValue !== undefined;
// const value = isControlled ? controlledValue : internalValue;

// ===== 이벤트 핸들러 =====
// handleChange: 입력 값 변경 시
// - Uncontrolled: setInternalValue(newValue)
// - Controlled: onChange만 호출
// - onChange는 항상 (e, newValue) 형태로 호출

// handleClear: 클리어 버튼 클릭 시
// - Uncontrolled: setInternalValue("")
// - Controlled: onChange({ target: { value: "" } }, "")
// - onClear 호출 (제공된 경우)
// - input에 포커스 이동

// handleSearch: 검색 실행 시
// - value.trim() 체크 (빈 문자열이면 실행 안 함)
// - onSearch(value) 호출

// handleKeyDown: 키보드 이벤트
// - Enter 키: e.preventDefault() + handleSearch()

// ===== 조건부 렌더링 =====
// 클리어 버튼: showClearButton && hasValue && !disabled
// - showClearButton: prop으로 제어
// - hasValue: value && value.length > 0
// - !disabled: 비활성화 상태가 아닐 때

// 검색 버튼: onSearch && (항상 표시, disabled || !hasValue일 때 비활성화)
// - onSearch prop이 제공되면 표시
// - disabled이거나 값이 없으면 버튼 비활성화

// ===== UI 구조 =====
// search-field: 최상위 컨테이너
//   search-field--{size}: 크기 클래스 (small, medium, large)
//   search-field--{variant}: 스타일 클래스 (default, filled, outlined)
//   search-field--disabled: 비활성화 클래스
//   search-field__wrapper: 내부 래퍼
//     search-field__icon--search: 검색 아이콘 (항상 표시)
//     search-field__input: 입력 필드
//     search-field__icon--clear: 클리어 버튼 (조건부 표시)
//     search-field__button: 검색 버튼 (onSearch 제공 시 표시)

// ===== 접근성 =====
// - input에 aria-label="검색어 입력" 제공
// - 클리어 버튼에 aria-label="검색어 지우기" 제공
// - 검색 버튼에 aria-label="검색" 제공
// - disabled 상태에서 버튼 비활성화

// ===== 검색 아이콘 =====
// SVG 아이콘으로 구현 (검색 돋보기 모양)
// - width="20" height="20"
// - stroke="currentColor" (색상 상속)
// - 검색 아이콘은 항상 표시됨

// ===== 클리어 아이콘 =====
// SVG 아이콘으로 구현 (X 모양)
// - width="18" height="18"
// - stroke="currentColor" (색상 상속)
// - 값이 있고 disabled가 아닐 때만 표시

// ===== 주의사항 =====
// 1. Controlled 모드 사용 시 value와 onChange를 함께 제공해야 함
// 2. Uncontrolled 모드에서는 내부 상태로 관리되므로 value prop 제공 불필요
// 3. onChange는 항상 (e, newValue) 형태로 호출됨
// 4. onSearch는 value.trim()이 비어있지 않을 때만 호출됨
// 5. Enter 키를 누르면 자동으로 onSearch 호출 (onSearch 제공 시)
// 6. 클리어 버튼 클릭 시 input에 자동으로 포커스 이동
// 7. 검색 버튼은 값이 없거나 disabled일 때 비활성화됨
// 8. showClearButton={false}로 클리어 버튼 숨김 가능
// 9. size와 variant는 독립적으로 조합 가능
// 10. disabled 상태에서는 모든 상호작용 불가`,
    PreviewComponent: SearchFieldPreview,
  },
  {
    id: "notice",
    label: "공지사항",
    title: "공지사항 리스트",
    description:
      "타이틀/날짜/뱃지 형태의 공지사항 리스트 컴포넌트입니다. 기본 데이터가 내장되어 있으며 items로 교체 가능하며, 로딩 상태를 skeleton으로 표시할 수 있습니다.",
    code: `import Notice from "./Notice";

// ===== Props 설명 =====
// title: 공지사항 제목 (기본값: "공지사항")
// linkText: 더보기 버튼 텍스트 (기본값: "더보기")
// items: 공지사항 아이템 배열 [{ id, title, date, badge, href }] (기본값: defaultItems)
// onClickMore: 더보기 버튼 클릭 핸들러 (선택)
// loading: 로딩 상태 (기본값: false)
// skeletonCount: 로딩 시 표시할 스켈레톤 개수 (기본값: 3)

// ===== 기본 사용 (기본 데이터) =====
// 내장된 기본 데이터를 사용하여 공지사항 표시
<Notice />

// ===== 커스텀 제목과 더보기 텍스트 =====
<Notice 
  title="새 소식" 
  linkText="전체보기"
/>

// ===== 커스텀 데이터 사용 =====
const customItems = [
  { 
    id: 1, 
    title: "시스템 점검 안내", 
    date: "2025-01-23", 
    badge: "안내",
    href: "/notice/1"
  },
  { 
    id: 2, 
    title: "정책 변경 안내", 
    date: "2025-01-20", 
    badge: "중요",
    href: "/notice/2"
  },
  { 
    id: 3, 
    title: "이벤트 안내", 
    date: "2025-01-15",
    href: "/notice/3"
    // badge 없이도 사용 가능, href는 필수
  },
];

<Notice 
  title="새 소식" 
  linkText="전체보기" 
  items={customItems} 
/>

// ===== 더보기 버튼 클릭 핸들러 =====
const handleMoreClick = () => {
  console.log("더보기 클릭");
  // 전체 공지사항 페이지로 이동 등
};

<Notice 
  title="공지사항"
  linkText="더보기"
  items={customItems}
  onClickMore={handleMoreClick}
/>

// ===== 로딩 상태 (스켈레톤) =====
// 데이터를 불러오는 중일 때 스켈레톤 표시
<Notice 
  loading 
  skeletonCount={3} 
/>

// 스켈레톤 개수 조정
<Notice 
  loading 
  skeletonCount={5} 
/>

// ===== 아이템 데이터 구조 =====
// items 배열의 각 객체는 다음 속성을 가질 수 있습니다:
const itemExample = {
  id: 1,                          // 고유 식별자 (필수)
  title: "공지사항 제목",          // 공지사항 제목 (필수)
  date: "2025-01-23",             // 날짜 (필수)
  badge: "안내",                  // 뱃지 텍스트 (선택, "안내", "중요" 등)
  href: "/notice/1",              // 링크 URL (선택, 없으면 "#" 사용)
};

// ===== 기본 데이터 구조 =====
// 컴포넌트 내부에 기본 데이터가 내장되어 있습니다:
const defaultItems = [
  { 
    id: 1, 
    title: "시스템 점검 안내 (1/25 02:00~04:00)", 
    date: "2025-01-23", 
    badge: "안내",
    href: "#"
  },
  { 
    id: 2, 
    title: "개인정보 처리방침 개정 사전 안내", 
    date: "2025-01-20", 
    badge: "중요",
    href: "#"
  },
  { 
    id: 3, 
    title: "겨울 한정 메뉴 출시 안내", 
    date: "2025-01-15",
    href: "#"
  },
];

// ===== 로딩 상태와 데이터 표시 전환 =====
const [isLoading, setIsLoading] = useState(true);
const [noticeItems, setNoticeItems] = useState([]);

useEffect(() => {
  // 데이터 로드 시뮬레이션
  fetchNoticeData()
    .then((data) => {
      setNoticeItems(data);
      setIsLoading(false);
    })
    .catch((error) => {
      console.error("공지사항 로드 실패:", error);
      setIsLoading(false);
    });
}, []);

<Notice 
  title="공지사항"
  items={noticeItems}
  loading={isLoading}
  onClickMore={() => navigate("/notices")}
/>

// ===== 주의사항 =====
// 1. items 배열의 각 객체는 id, title, date 속성을 필수로 가져야 함
// 2. badge는 선택 사항이며, 제공되면 제목 앞에 표시됨
// 3. href는 선택 사항이며, 제공되지 않으면 "#"을 기본값으로 사용
// 4. 각 공지사항 항목은 a 태그로 감싸져 있어 클릭 가능한 링크로 동작
// 5. loading이 true이면 items는 무시되고 스켈레톤이 표시됨
// 6. skeletonCount는 로딩 중 표시할 스켈레톤 아이템의 개수
// 7. onClickMore가 제공되지 않으면 더보기 버튼은 클릭해도 동작하지 않음
// 8. Typography 컴포넌트를 사용하여 제목 스타일 일관성 유지
// 9. Button 컴포넌트를 사용하여 더보기 버튼 렌더링
// 10. 접근성을 위해 aria-label이 더보기 버튼에 자동 설정됨
// 11. SkeletonPlaceholder 컴포넌트를 사용하여 로딩 상태 표시`,
    PreviewComponent: NoticePreview,
  },
  {
    id: "skeleton-placeholder",
    label: "스켈레톤",
    title: "스켈레톤 플레이스홀더",
    description:
      "리스트·카드 로딩 상태에 자주 쓰는 아바타/텍스트/버튼 조합 스켈레톤을 즉시 렌더링하는 헬퍼입니다.",
    code: `import SkeletonPlaceholder from "./Skeleton/SkeletonPlaceholder";

// ===== Props 설명 =====
// lines: 표시할 텍스트 라인 수 (기본값: 3)
// withAvatar: 좌측 동그라미 아바타 표시 여부 (기본값: false)
// withActions: 우측 버튼 영역 스켈레톤 표시 여부 (기본값: false)

// ===== 기본 사용 =====
// 텍스트 3줄만 표시 (기본값)
<SkeletonPlaceholder />

// ===== 텍스트 라인 수 조정 =====
// lines prop으로 표시할 텍스트 라인 수를 지정할 수 있습니다.
<SkeletonPlaceholder lines={2} />  // 2줄
<SkeletonPlaceholder lines={5} />  // 5줄

// lines는 최소 1줄 이상이어야 합니다 (Math.max(1, lines)로 보장).

// ===== 아바타 포함 =====
// withAvatar={true}로 설정하면 좌측에 원형 아바타 스켈레톤이 표시됩니다.
<SkeletonPlaceholder withAvatar lines={2} />

// 아바타 크기: 40px × 40px
// 아바타는 Skeleton 컴포넌트의 circle prop을 사용하여 원형으로 렌더링됩니다.

// ===== 액션 버튼 포함 =====
// withActions={true}로 설정하면 우측에 버튼 스켈레톤이 표시됩니다.
<SkeletonPlaceholder withActions lines={3} />

// 액션 버튼: 72px × 32px 크기의 스켈레톤 2개
// 버튼들은 세로로 배치되며, gap: 6px로 간격이 설정됩니다.

// ===== 모든 옵션 조합 =====
// 아바타 + 텍스트 3줄 + 우측 버튼
<SkeletonPlaceholder withAvatar withActions lines={3} />

// ===== 내부 구조 =====
// SkeletonPlaceholder는 Skeleton 컴포넌트를 사용하여 구성됩니다:
// - skeleton-placeholder: 최상위 컨테이너 (flex, gap: 12px)
//   - skeleton-placeholder__avatar: 아바타 영역 (조건부 렌더링)
//     - Skeleton(width={40}, height={40}, circle)
//   - skeleton-placeholder__body: 텍스트 영역 (flex: 1)
//     - skeleton-placeholder__line: 각 텍스트 라인
//       - Skeleton(width={80 - idx * 8}%, height={14})
//   - skeleton-placeholder__actions: 액션 버튼 영역 (조건부 렌더링)
//     - Skeleton(width={72}, height={32}) × 2

// ===== 텍스트 라인 너비 =====
// 각 텍스트 라인의 너비는 점진적으로 줄어듭니다:
// - 첫 번째 라인: 80%
// - 두 번째 라인: 72% (80 - 8)
// - 세 번째 라인: 64% (80 - 16)
// - 네 번째 라인: 56% (80 - 24)
// - ...
//
// 이는 실제 텍스트의 자연스러운 길이 변화를 모방합니다.

// ===== 스켈레톤 애니메이션 =====
// Skeleton 컴포넌트는 shimmer 애니메이션을 사용합니다:
// - linear-gradient(90deg, #f2f3f5 25%, #e6e8ec 50%, #f2f3f5 75%)
// - background-size: 320% 100%
// - animation: skeleton-shimmer 1.6s ease infinite
//
// 애니메이션은 좌우로 이동하는 그라데이션 효과를 만듭니다.

// ===== 사용 사례 =====
// 1. 리스트 아이템 로딩 중
{isLoading ? (
  <SkeletonPlaceholder withAvatar lines={2} />
) : (
  <ListItem item={item} />
)}

// 2. 카드 콘텐츠 로딩 중
{isLoading ? (
  <SkeletonPlaceholder lines={3} />
) : (
  <CardContent content={content} />
)}

// 3. 프로필 정보 로딩 중
{isLoading ? (
  <SkeletonPlaceholder withAvatar withActions lines={4} />
) : (
  <ProfileInfo profile={profile} />
)}

// ===== 접근성 =====
// Skeleton 컴포넌트는 aria-hidden="true"로 설정되어
// 스크린 리더에서 무시됩니다.
// 이는 로딩 상태가 콘텐츠가 아니라는 것을 나타냅니다.

// ===== 성능 =====
// SkeletonPlaceholder는 가벼운 컴포넌트이며,
// 많은 수의 스켈레톤을 렌더링해도 성능에 큰 영향을 주지 않습니다.

// ===== 주의사항 =====
// 1. lines는 최소 1 이상이어야 하며, 0 이하의 값은 1로 보정됩니다.
// 2. withAvatar와 withActions는 독립적으로 사용할 수 있습니다.
// 3. 텍스트 라인의 너비는 자동으로 계산되며, 각 라인마다 8%씩 줄어듭니다.
// 4. 아바타는 항상 원형이며, 크기는 40px × 40px로 고정됩니다.
// 5. 액션 버튼은 항상 2개가 표시되며, 크기는 72px × 32px로 고정됩니다.
// 6. 스켈레톤은 실제 콘텐츠의 레이아웃과 유사하게 배치하는 것이 좋습니다.
// 7. 로딩이 완료되면 즉시 실제 콘텐츠로 교체해야 합니다.
// 8. 스켈레톤의 색상은 테마에 맞게 조정할 수 있습니다 (Skeleton 컴포넌트 스타일 수정).
// 9. 많은 스켈레톤을 렌더링할 경우 React.memo를 사용하여 최적화할 수 있습니다.
// 10. 모바일 환경에서도 스켈레톤이 자연스럽게 보이도록 반응형 디자인을 고려해야 합니다.`,
    PreviewComponent: SkeletonPlaceholderPreview,
  },
  {
    id: "empty-state",
    label: "빈 상태",
    title: "Empty State 컴포넌트",
    description:
      "데이터가 없을 때 표시하는 빈 상태 UI 컴포넌트입니다. 아이콘, 제목, 설명, 액션 버튼을 포함할 수 있으며, 다양한 variant를 지원합니다.",
    code: `import EmptyState from "./EmptyState";
import Button from "./Button";

// ===== Props 설명 =====
// title: 제목 텍스트 (기본값: "데이터가 없습니다")
// description: 설명 텍스트 (선택)
// icon: 아이콘 (이모지, SVG, 컴포넌트 등, 선택)
// action: 액션 버튼/링크 (ReactNode, 선택)
// variant: 스타일 변형 'default' | 'minimal' | 'illustration' (기본값: 'default')
// className: 추가 클래스명 (선택)

// ===== 기본 사용 =====
// 필수 prop인 title만 제공하면 기본 스타일로 표시됩니다.
<EmptyState
  title="데이터가 없습니다"
/>

// ===== 설명 추가 =====
// description prop으로 추가 설명을 제공할 수 있습니다.
<EmptyState
  title="데이터가 없습니다"
  description="표시할 데이터가 없습니다."
/>

// ===== 아이콘 추가 =====
// icon prop으로 이모지, SVG, 또는 React 컴포넌트를 전달할 수 있습니다.
<EmptyState
  title="데이터가 없습니다"
  description="표시할 데이터가 없습니다."
  icon="📭"
/>

// SVG 아이콘 사용
<EmptyState
  title="데이터가 없습니다"
  icon={
    <svg width="64" height="64" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
    </svg>
  }
/>

// ===== 액션 버튼 포함 =====
// action prop으로 버튼이나 링크를 추가할 수 있습니다.
<EmptyState
  title="검색 결과가 없습니다"
  description="다른 검색어로 시도해보세요."
  icon="🔍"
  action={
    <Button onClick={() => console.log("검색 초기화")}>
      검색 초기화
    </Button>
  }
/>

// 여러 액션 버튼
<EmptyState
  title="장바구니가 비어있습니다"
  description="상품을 추가해보세요."
  icon="🛒"
  action={
    <div style={{ display: "flex", gap: "8px" }}>
      <Button variant="primary" onClick={() => navigateToProducts()}>
        쇼핑하기
      </Button>
      <Button variant="ghost" onClick={() => navigateToHome()}>
        홈으로
      </Button>
    </div>
  }
/>

// ===== Variant 옵션 =====
// default: 기본 스타일 (아이콘, 제목, 설명이 세로로 배치)
<EmptyState
  variant="default"
  title="데이터가 없습니다"
  description="표시할 데이터가 없습니다."
  icon="📭"
/>

// minimal: 최소한의 스타일 (간결한 디자인)
<EmptyState
  variant="minimal"
  title="리스트가 비어있습니다"
/>

// illustration: 일러스트레이션 스타일 (큰 아이콘, 강조된 디자인)
<EmptyState
  variant="illustration"
  title="장바구니가 비어있습니다"
  description="상품을 추가해보세요."
  icon="🛒"
/>

// ===== 사용 사례 =====
// 1. 빈 리스트
{items.length === 0 ? (
  <EmptyState
    title="아이템이 없습니다"
    description="새로운 아이템을 추가해보세요."
    icon="📋"
    action={
      <Button onClick={handleAddItem}>아이템 추가</Button>
    }
  />
) : (
  <ItemList items={items} />
)}

// 2. 검색 결과 없음
{searchResults.length === 0 && searchQuery ? (
  <EmptyState
    title="검색 결과가 없습니다"
    description="다른 검색어로 시도해보세요."
    icon="🔍"
    action={
      <Button onClick={handleClearSearch}>검색 초기화</Button>
    }
  />
) : null}

// 3. 장바구니 비어있음
{cartItems.length === 0 ? (
  <EmptyState
    variant="illustration"
    title="장바구니가 비어있습니다"
    description="맛있는 상품을 추가해보세요."
    icon="🛒"
    action={
      <Button variant="primary" onClick={navigateToProducts}>
        쇼핑하기
      </Button>
    }
  />
) : (
  <CartList items={cartItems} />
)}

// 4. 즐겨찾기 없음
{favorites.length === 0 ? (
  <EmptyState
    variant="minimal"
    title="즐겨찾기가 없습니다"
    description="관심 있는 상품을 즐겨찾기에 추가해보세요."
  />
) : (
  <FavoriteList items={favorites} />
)}

// ===== UI 구조 =====
// empty-state: 최상위 컨테이너 (div)
//   empty-state--{variant}: variant별 클래스 (default, minimal, illustration)
//   empty-state__icon: 아이콘 영역 (조건부 렌더링)
//   empty-state__title: 제목 (Typography h3)
//   empty-state__description: 설명 (Typography body, 조건부 렌더링)
//   empty-state__action: 액션 영역 (조건부 렌더링)

// ===== Typography 사용 =====
// EmptyState는 내부적으로 Typography 컴포넌트를 사용합니다:
// - title: Typography variant="h3", size="small"
// - description: Typography variant="body", size="small", color="muted"

// ===== 접근성 =====
// - 시맨틱한 HTML 구조 사용 (div, Typography)
// - 제목은 h3 태그로 렌더링되어 스크린 리더에서 제목으로 인식됩니다.
// - 설명은 body 텍스트로 렌더링됩니다.
// - 액션 버튼은 적절한 aria-label을 제공해야 합니다.

// ===== 주의사항 =====
// 1. title은 필수이며, 기본값이 "데이터가 없습니다"입니다.
// 2. description, icon, action은 선택 사항입니다.
// 3. icon은 이모지, SVG, React 컴포넌트 등 다양한 형태를 지원합니다.
// 4. action은 단일 요소 또는 여러 요소를 포함하는 ReactNode입니다.
// 5. variant는 'default', 'minimal', 'illustration' 중 하나여야 합니다.
// 6. EmptyState는 조건부 렌더링과 함께 사용하는 것이 일반적입니다.
// 7. 데이터가 있을 때는 EmptyState를 표시하지 않아야 합니다.
// 8. action 버튼은 Button 컴포넌트를 사용하는 것을 권장합니다.
// 9. variant에 따라 레이아웃과 스타일이 달라집니다.
// 10. 접근성을 위해 의미 있는 title과 description을 제공해야 합니다.`,
    PreviewComponent: EmptyStatePreview,
  },
  {
    id: "error-state",
    label: "에러 상태",
    title: "Error / NoData 컴포넌트",
    description:
      "에러 발생 시 표시하는 공통 에러 화면 컴포넌트입니다. error, nodata, network, notfound 타입을 지원하며, 재시도 버튼 등을 포함할 수 있습니다.",
    code: `import ErrorState from "./ErrorState";
import Button from "./Button";

// ===== Props 설명 =====
// type: 에러 타입 'error' | 'nodata' | 'network' | 'notfound' (기본값: 'error')
// title: 제목 텍스트 (선택, type별 기본값 제공)
// message: 에러 메시지 (선택, type별 기본값 제공)
// icon: 아이콘 (이모지, SVG, 컴포넌트 등, 선택, type별 기본값 제공)
// action: 액션 버튼/링크 (ReactNode, 선택)
// className: 추가 클래스명 (선택)

// ===== 기본 사용 =====
// type만 제공하면 해당 타입의 기본 제목, 메시지, 아이콘이 표시됩니다.
<ErrorState type="error" />

// ===== Type별 기본값 =====
// error: 일반 오류
//   - title: "오류가 발생했습니다"
//   - message: "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
//   - icon: "⚠️"
<ErrorState type="error" />

// nodata: 데이터 없음
//   - title: "데이터를 불러올 수 없습니다"
//   - message: "데이터를 불러오는 중 문제가 발생했습니다."
//   - icon: "📭"
<ErrorState type="nodata" />

// network: 네트워크 오류
//   - title: "네트워크 오류"
//   - message: "인터넷 연결을 확인하고 다시 시도해주세요."
//   - icon: "📡"
<ErrorState type="network" />

// notfound: 페이지 없음
//   - title: "페이지를 찾을 수 없습니다"
//   - message: "요청하신 페이지가 존재하지 않습니다."
//   - icon: "🔍"
<ErrorState type="notfound" />

// ===== 재시도 버튼 포함 =====
// action prop으로 재시도 버튼을 추가할 수 있습니다.
<ErrorState
  type="error"
  action={
    <Button onClick={() => {
      console.log("재시도");
      retryOperation();
    }}>
      다시 시도
    </Button>
  }
/>

// 여러 액션 버튼
<ErrorState
  type="network"
  action={
    <div style={{ display: "flex", gap: "8px" }}>
      <Button variant="primary" onClick={handleRetry}>
        다시 시도
      </Button>
      <Button variant="ghost" onClick={handleGoHome}>
        홈으로
      </Button>
    </div>
  }
/>

// ===== 커스텀 메시지 =====
// title, message, icon을 커스터마이징할 수 있습니다.
<ErrorState
  type="error"
  title="서버 오류"
  message="서버에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요."
  icon="⚠️"
/>

// 타입은 유지하되 메시지만 변경
<ErrorState
  type="network"
  message="인터넷 연결이 불안정합니다. Wi-Fi 또는 모바일 데이터를 확인해주세요."
/>

// ===== 사용 사례 =====
// 1. API 에러 처리
{error ? (
  <ErrorState
    type="error"
    action={
      <Button onClick={handleRetry}>다시 시도</Button>
    }
  />
) : (
  <DataDisplay data={data} />
)}

// 2. 네트워크 에러
{networkError ? (
  <ErrorState
    type="network"
    action={
      <Button onClick={checkConnection}>연결 확인</Button>
    }
  />
) : null}

// 3. 404 페이지
<ErrorState
  type="notfound"
  action={
    <Button onClick={() => navigate("/")}>홈으로 이동</Button>
  }
/>

// 4. 데이터 로드 실패
{loadError ? (
  <ErrorState
    type="nodata"
    message="데이터를 불러오지 못했습니다. 페이지를 새로고침해주세요."
    action={
      <Button onClick={() => window.location.reload()}>
        새로고침
      </Button>
    }
  />
) : (
  <DataList data={data} />
)}

// ===== 내부 동작 =====
// ErrorState는 type에 따라 defaultConfig에서 기본값을 가져옵니다.
// props로 전달된 값이 있으면 그것을 사용하고, 없으면 기본값을 사용합니다.
// const config = defaultConfig[type] || defaultConfig.error;
// const displayTitle = title || config.title;
// const displayMessage = message || config.message;
// const displayIcon = icon !== undefined ? icon : config.icon;

// ===== UI 구조 =====
// error-state: 최상위 컨테이너 (div)
//   error-state--{type}: type별 클래스 (error, nodata, network, notfound)
//   error-state__icon: 아이콘 영역
//   error-state__title: 제목 (Typography h3)
//   error-state__message: 메시지 (Typography body, 조건부 렌더링)
//   error-state__action: 액션 영역 (조건부 렌더링)

// ===== Typography 사용 =====
// ErrorState는 내부적으로 Typography 컴포넌트를 사용합니다:
// - title: Typography variant="h3", size="small"
// - message: Typography variant="body", size="small", color="muted"

// ===== 접근성 =====
// - 시맨틱한 HTML 구조 사용 (div, Typography)
// - 제목은 h3 태그로 렌더링되어 스크린 리더에서 제목으로 인식됩니다.
// - 메시지는 body 텍스트로 렌더링됩니다.
// - 액션 버튼은 적절한 aria-label을 제공해야 합니다.

// ===== 에러 타입 선택 가이드 =====
// - error: 일반적인 서버 오류, 예상치 못한 오류
// - nodata: 데이터를 불러올 수 없는 경우
// - network: 네트워크 연결 문제
// - notfound: 404 페이지, 리소스를 찾을 수 없는 경우

// ===== 주의사항 =====
// 1. type은 필수이며, 'error', 'nodata', 'network', 'notfound' 중 하나여야 합니다.
// 2. title, message, icon은 선택 사항이며, type별 기본값이 제공됩니다.
// 3. icon이 undefined가 아닌 경우에만 props의 icon을 사용합니다 (null도 기본값 사용).
// 4. action은 선택 사항이며, 재시도 버튼 등을 포함할 수 있습니다.
// 5. ErrorState는 조건부 렌더링과 함께 사용하는 것이 일반적입니다.
// 6. 에러가 없을 때는 ErrorState를 표시하지 않아야 합니다.
// 7. action 버튼은 Button 컴포넌트를 사용하는 것을 권장합니다.
// 8. type에 따라 적절한 기본 메시지가 제공되므로, 커스터마이징이 필요할 때만 props를 제공합니다.
// 9. 접근성을 위해 의미 있는 title과 message를 제공해야 합니다.
// 10. 재시도 기능이 있는 경우 action으로 버튼을 제공하는 것이 좋습니다.`,
    PreviewComponent: ErrorStatePreview,
  },
  {
    id: "lottie",
    label: "로티",
    title: "Lottie 애니메이션",
    description:
      "After Effects에서 제작한 애니메이션을 JSON 형식으로 내보내 웹에서 재생할 수 있는 Lottie 애니메이션 컴포넌트입니다. 반복 재생, 재생 속도, 자동 재생 등을 제어할 수 있습니다.",
    code: `import LottieAnimation from "./Lottie";
import { useState } from "react";

// ===== Props 설명 =====
// animationData: Lottie JSON 데이터 객체 또는 URL 문자열 (필수)
// loop: 반복 재생 여부 (기본값: true)
// autoplay: 자동 재생 여부 (기본값: true)
// speed: 재생 속도 (기본값: 1, 0.5 ~ 2 범위 권장)
// className: 추가 CSS 클래스 (선택)
// width: 너비 (px, 선택)
// height: 높이 (px, 선택)
// onComplete: 애니메이션 완료 시 콜백 함수 (선택)
// onLoopComplete: 루프 완료 시 콜백 함수 (선택)

// ===== 기본 사용법 (JSON 객체) =====
// 로컬 JSON 데이터를 직접 전달
const animationData = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 60,
  w: 200,
  h: 200,
  nm: "Loading Circle",
  ddd: 0,
  assets: [],
  layers: [
    // ... Lottie JSON 구조
  ]
};

<LottieAnimation
  animationData={animationData}
  loop={true}
  autoplay={true}
  speed={1}
  width={200}
  height={200}
/>

// ===== URL에서 로드 =====
// animationData가 문자열(URL)인 경우 자동으로 fetch하여 로드
// 로딩 중에는 "로딩 중..." 메시지 표시
// 로드 실패 시 "애니메이션을 불러올 수 없습니다." 메시지 표시
<LottieAnimation
  animationData="https://assets5.lottiefiles.com/packages/lf20_jcikwtux.json"
  loop={true}
  autoplay={true}
  speed={1}
  width={200}
  height={200}
/>

// ===== 반복 재생 제어 =====
// loop={false}: 한 번만 재생
<LottieAnimation
  animationData={animationData}
  loop={false}
  autoplay={true}
  onComplete={() => console.log("애니메이션 완료")}
/>

// loop={true}: 무한 반복 재생
<LottieAnimation
  animationData={animationData}
  loop={true}
  autoplay={true}
  onLoopComplete={() => console.log("루프 완료")}
/>

// ===== 재생 속도 제어 =====
// speed 값에 따라 재생 속도 조절
// - 0.5: 절반 속도 (느리게)
// - 1: 정상 속도
// - 2: 2배 속도 (빠르게)
const [speed, setSpeed] = useState(1);

<LottieAnimation
  animationData={animationData}
  speed={speed}
  loop={true}
  autoplay={true}
/>

// 슬라이더로 속도 조절
<input
  type="range"
  min="0.5"
  max="2"
  step="0.1"
  value={speed}
  onChange={(e) => setSpeed(parseFloat(e.target.value))}
/>

// ===== 자동 재생 제어 =====
// autoplay={false}: 자동 재생하지 않음 (수동으로 재생 시작 필요)
const [isPlaying, setIsPlaying] = useState(false);

<LottieAnimation
  animationData={animationData}
  autoplay={isPlaying}
  loop={true}
/>

<button onClick={() => setIsPlaying(!isPlaying)}>
  {isPlaying ? "일시정지" : "재생"}
</button>

// ===== 크기 지정 =====
// width, height로 애니메이션 크기 지정
<LottieAnimation
  animationData={animationData}
  width={300}
  height={300}
  loop={true}
  autoplay={true}
/>

// ===== 이벤트 콜백 =====
// onComplete: 애니메이션이 완료되었을 때 호출 (loop={false}일 때만)
// onLoopComplete: 루프가 완료되었을 때 호출 (loop={true}일 때)
<LottieAnimation
  animationData={animationData}
  loop={true}
  autoplay={true}
  onComplete={() => {
    console.log("애니메이션 완료");
  }}
  onLoopComplete={() => {
    console.log("루프 완료");
  }}
/>

// ===== 상태 관리 예제 =====
// 애니메이션 제어를 위한 상태 관리
const LottieController = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [loop, setLoop] = useState(true);
  const animationUrl = "https://assets5.lottiefiles.com/packages/lf20_jcikwtux.json";

  return (
    <div>
      <LottieAnimation
        animationData={animationUrl}
        loop={loop}
        autoplay={isPlaying}
        speed={speed}
        width={200}
        height={200}
        onComplete={() => console.log("완료")}
        onLoopComplete={() => console.log("루프 완료")}
      />
      
      <div>
        <label>
          <input
            type="checkbox"
            checked={isPlaying}
            onChange={(e) => setIsPlaying(e.target.checked)}
          />
          자동 재생
        </label>
        
        <label>
          <input
            type="checkbox"
            checked={loop}
            onChange={(e) => setLoop(e.target.checked)}
          />
          반복 재생
        </label>
        
        <label>
          재생 속도: {speed}x
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
  );
};

// ===== 로딩 상태 처리 =====
// URL에서 로드하는 경우 자동으로 로딩 상태 관리
// - isLoading: true일 때 "로딩 중..." 메시지 표시
// - error: 로드 실패 시 "애니메이션을 불러올 수 없습니다." 메시지 표시
// - animationJson: 로드된 JSON 데이터

// 컴포넌트 내부에서 자동 처리:
// useEffect(() => {
//   if (typeof animationData === "string") {
//     setIsLoading(true);
//     fetch(animationData)
//       .then(res => res.json())
//       .then(data => {
//         setAnimationJson(data);
//         setIsLoading(false);
//       })
//       .catch(err => {
//         setError(err);
//         setIsLoading(false);
//       });
//   }
// }, [animationData]);

// ===== speed 변경 처리 =====
// speed prop이 변경되면 자동으로 애니메이션 속도 업데이트
// useEffect(() => {
//   if (lottieRef.current && lottieRef.current.setSpeed) {
//     lottieRef.current.setSpeed(speed);
//   }
// }, [speed]);

// ===== Lottie JSON 형식 =====
// After Effects에서 Bodymovin 플러그인으로 내보낸 JSON 파일
// 필수 필드:
// - v: Lottie 버전
// - fr: 프레임 레이트
// - ip: 시작 프레임
// - op: 종료 프레임
// - w: 너비
// - h: 높이
// - assets: 에셋 배열
// - layers: 레이어 배열

// ===== 주의사항 =====
// 1. animationData가 없으면 null 반환 (아무것도 렌더링하지 않음)
// 2. URL에서 로드하는 경우 CORS 정책 확인 필요
// 3. speed는 lottie-react의 setSpeed 메서드를 사용하여 동적으로 변경 가능
// 4. loop={false}일 때만 onComplete 호출됨
// 5. loop={true}일 때는 onLoopComplete가 각 루프마다 호출됨
// 6. URL 로드 실패 시 에러 메시지 표시 (에러 상태 관리)
// 7. 로딩 중에는 "로딩 중..." 메시지 표시
// 8. width, height를 지정하지 않으면 컨테이너 크기에 맞춰짐
// 9. className으로 추가 스타일링 가능
// 10. lottie-react 라이브러리를 사용하므로 해당 라이브러리 설치 필요`,
    PreviewComponent: LottiePreview,
  },
  {
    id: "typography",
    label: "타이포그래피",
    title: "Typography 컴포넌트",
    description:
      "일관된 타이포그래피 시스템을 제공하는 컴포넌트입니다. 제목(h1-h6), 본문(body), 캡션(caption), 오버라인(overline) 스타일을 지원하며, 폰트 크기, 행간, 자간이 최적화되어 있습니다. 색상, 굵기, 정렬, 말줄임표 등 다양한 옵션을 제공합니다.",
    code: `import Typography from "./Typography";

// ===== Props 설명 =====
// variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption' | 'overline' (기본값: 'body')
// size: 'small' | 'medium' | 'large' (variant에 따라 기본값 다름)
// as: 실제 렌더링할 HTML 태그 (기본값: variant에 따라 자동 결정)
// color: 'default' | 'muted' | 'accent' | 'inherit' (기본값: 'default')
// weight: 'normal' | 'medium' | 'semibold' | 'bold'
// align: 'left' | 'center' | 'right' | 'justify'
// truncate: boolean - 텍스트 말줄임표 표시 (기본값: false)
// lineClamp: number - 최대 줄 수 (1-4)

// ===== 제목 스타일 =====
<Typography variant="h1">Heading 1</Typography>
<Typography variant="h2">Heading 2</Typography>
<Typography variant="h3">Heading 3</Typography>
<Typography variant="h4">Heading 4</Typography>
<Typography variant="h5">Heading 5</Typography>
<Typography variant="h6">Heading 6</Typography>

// ===== 본문 스타일 =====
<Typography variant="body">기본 본문 텍스트</Typography>
<Typography variant="body" size="small">작은 본문</Typography>
<Typography variant="body" size="large">큰 본문</Typography>

// ===== 캡션 & 오버라인 =====
<Typography variant="caption">캡션 텍스트</Typography>
<Typography variant="overline">오버라인 텍스트</Typography>

// ===== 색상 변형 =====
<Typography variant="body" color="default">기본 색상</Typography>
<Typography variant="body" color="muted">약한 색상</Typography>
<Typography variant="body" color="accent">강조 색상</Typography>
<Typography variant="body" color="inherit">상속 색상</Typography>

// ===== 폰트 굵기 =====
<Typography variant="body" weight="normal">Normal (400)</Typography>
<Typography variant="body" weight="medium">Medium (500)</Typography>
<Typography variant="body" weight="semibold">Semibold (600)</Typography>
<Typography variant="body" weight="bold">Bold (700)</Typography>

// ===== 텍스트 정렬 =====
<Typography variant="body" align="left">왼쪽 정렬</Typography>
<Typography variant="body" align="center">가운데 정렬</Typography>
<Typography variant="body" align="right">오른쪽 정렬</Typography>
<Typography variant="body" align="justify">양쪽 정렬</Typography>

// ===== 말줄임표 =====
// 한 줄 말줄임표
<Typography variant="body" truncate style={{ maxWidth: "200px" }}>
  긴 텍스트가 자동으로 말줄임표로 표시됩니다
</Typography>

// 다중 줄 말줄임표
<Typography variant="body" lineClamp={2} style={{ maxWidth: "200px" }}>
  여러 줄의 텍스트가 표시되다가 지정된 줄 수를 넘으면 자동으로 말줄임표가 표시됩니다
</Typography>

// ===== 커스텀 태그 =====
<Typography variant="h3" as="div">h3 스타일을 div 태그로</Typography>
<Typography variant="body" as="span">body 스타일을 span 태그로</Typography>

// ===== 주의사항 =====
// 1. variant에 따라 기본 태그가 자동 결정됨 (h1-h6는 해당 태그, body는 p, caption/overline은 span)
// 2. as prop으로 태그를 커스터마이징할 수 있음
// 3. 각 variant별로 최적화된 폰트 크기, 행간, 자간이 설정됨
// 4. 제목은 음수 자간, 본문/캡션은 양수 자간 사용
// 5. truncate와 lineClamp는 동시에 사용할 수 없음 (lineClamp 우선)
// 6. 폰트 스케일은 CSS 변수 --font-scale을 통해 전체적으로 조정 가능`,
    PreviewComponent: TypographyPreview,
  },
  {
    id: "color",
    label: "컬러",
    title: "Color & Theme 컴포넌트",
    description:
      "브랜드 컬러와 상태 컬러(success/warn/error/info)를 시각적으로 표시하는 컴포넌트입니다. 라이트 모드와 다크 모드에서의 컬러 차이를 비교할 수 있으며, CSS 변수명도 함께 표시됩니다. 컬러 팔레트와 테마 비교 기능을 제공합니다.",
    code: `import Color, { ColorPalette, ColorTheme } from "./Color";

// ===== Props 설명 =====
// Color 컴포넌트:
//   variant: 'swatch' | 'palette' | 'theme' (기본값: 'swatch')
//   name: 컬러 이름
//   value: 컬러 값 (hex, rgb, CSS 변수 등)
//   description: 컬러 설명
//   showVariable: CSS 변수명 표시 여부 (기본값: true)

// ColorPalette 컴포넌트:
//   title: 팔레트 제목
//   colors: 컬러 배열 [{ name, value, description, showVariable }]

// ColorTheme 컴포넌트:
//   colors: 테마 비교용 컬러 배열 [{ name, light, dark, variable }]

// ===== 단일 컬러 스와치 =====
<Color
  name="Primary"
  value="#0c7c59"
  description="메인 브랜드 컬러"
  showVariable={true}
/>

// ===== 컬러 팔레트 =====
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
  },
];

<ColorPalette title="브랜드 컬러" colors={brandColors} />

// ===== 상태 컬러 팔레트 =====
const statusColors = [
  { name: "Success", value: "#22c55e", description: "성공 상태" },
  { name: "Warning", value: "#fbbf24", description: "경고 상태" },
  { name: "Error", value: "#ef4444", description: "에러 상태" },
  { name: "Info", value: "#3b82f6", description: "정보 상태" },
];

<ColorPalette title="상태 컬러" colors={statusColors} />

// ===== 테마 비교 (라이트/다크) =====
const themeColors = [
  {
    name: "Background",
    light: "#f5f6f7",
    dark: "#111315",
    variable: "--color-bg",
  },
  {
    name: "Text",
    light: "#1b1b1f",
    dark: "#f8f8fa",
    variable: "--color-text",
  },
];

<ColorTheme colors={themeColors} />

// ===== CSS 변수 사용 =====
// CSS 변수로 컬러를 정의하면 다크모드에서 자동으로 변경됩니다
:root {
  --color-success: #22c55e;
  --color-warning: #fbbf24;
  --color-error: #ef4444;
  --color-info: #3b82f6;
}

:root[data-theme="dark"] {
  --color-success: #4ade80;
  --color-warning: #fcd34d;
  --color-error: #f87171;
  --color-info: #60a5fa;
}

// ===== 주의사항 =====
// 1. value는 hex, rgb, rgba, CSS 변수 등 모든 형식 지원
// 2. CSS 변수를 사용하면 다크모드 자동 지원
// 3. ColorTheme은 라이트/다크 모드 비교에 최적화됨
// 4. hover 시 컬러 미리보기 확대 효과 제공
// 5. 모든 컬러는 접근성을 고려한 대비율 준수`,
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
    code: `import { useState, useEffect } from "react";

// ===== 페이지네이션 상태 관리 =====
// 현재 페이지와 전체 아이템 정보를 관리합니다.
const [currentPage, setCurrentPage] = useState(1);
const [items, setItems] = useState([]);
const [totalItems, setTotalItems] = useState(0);
const [isLoading, setIsLoading] = useState(false);

const itemsPerPage = 10; // 한 페이지에 표시할 아이템 개수
const totalPages = Math.ceil(totalItems / itemsPerPage); // 전체 페이지 수

// ===== 페이지 변경 핸들러 =====
// 페이지 번호를 변경하고 해당 페이지의 데이터를 로드합니다.
const handlePageChange = (page) => {
  // 유효한 페이지 범위 확인
  if (page >= 1 && page <= totalPages) {
    setCurrentPage(page);
    // 데이터 로드 로직
    loadPageData(page);
    // 페이지 상단으로 스크롤 (선택)
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

// ===== 페이지 데이터 로드 =====
// 특정 페이지의 데이터를 서버에서 가져옵니다.
const loadPageData = async (page) => {
  setIsLoading(true);
  try {
    const response = await fetch(\`/api/items?page=\${page}&limit=\${itemsPerPage}\`);
    const data = await response.json();
    setItems(data.items);
    setTotalItems(data.total);
  } catch (error) {
    console.error("데이터 로드 실패:", error);
  } finally {
    setIsLoading(false);
  }
};

// ===== 초기 데이터 로드 =====
// 컴포넌트 마운트 시 첫 페이지 데이터를 로드합니다.
useEffect(() => {
  loadPageData(currentPage);
}, []);

// ===== 페이지네이션 UI 렌더링 (기본) =====
// 모든 페이지 번호를 버튼으로 표시합니다.
const renderPagination = () => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <button
        key={i}
        onClick={() => handlePageChange(i)}
        className={currentPage === i ? "active" : ""}
        aria-label={\`페이지 \${i}로 이동\`}
        aria-current={currentPage === i ? "page" : undefined}
      >
        {i}
      </button>
    );
  }
  return pages;
};

// ===== 이전/다음 버튼 =====
// 이전 페이지와 다음 페이지로 이동하는 버튼을 추가합니다.
const handlePrev = () => {
  if (currentPage > 1) {
    handlePageChange(currentPage - 1);
  }
};

const handleNext = () => {
  if (currentPage < totalPages) {
    handlePageChange(currentPage + 1);
  }
};

<div className="pagination">
  <button
    onClick={handlePrev}
    disabled={currentPage === 1}
    aria-label="이전 페이지"
  >
    이전
  </button>
  {renderPagination()}
  <button
    onClick={handleNext}
    disabled={currentPage === totalPages}
    aria-label="다음 페이지"
  >
    다음
  </button>
</div>

// ===== 페이지 범위 표시 =====
// 현재 표시 중인 아이템 범위를 표시합니다.
const startIndex = (currentPage - 1) * itemsPerPage + 1;
const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

<div className="pagination-info">
  {startIndex}-{endIndex} / {totalItems}개
</div>

// ===== 페이지 번호 범위 제한 =====
// 페이지가 많을 경우 일부만 표시하고 생략 표시를 추가합니다.
const getVisiblePages = () => {
  const maxVisible = 5; // 표시할 최대 페이지 수
  const half = Math.floor(maxVisible / 2);
  
  let start = Math.max(1, currentPage - half);
  let end = Math.min(totalPages, start + maxVisible - 1);
  
  // 끝에서 시작하는 경우 조정
  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1);
  }
  
  const pages = [];
  
  // 첫 페이지와 생략 표시
  if (start > 1) {
    pages.push(
      <button key={1} onClick={() => handlePageChange(1)}>1</button>
    );
    if (start > 2) {
      pages.push(<span key="ellipsis-start">...</span>);
    }
  }
  
  // 가시적 페이지 범위
  for (let i = start; i <= end; i++) {
    pages.push(
      <button
        key={i}
        onClick={() => handlePageChange(i)}
        className={currentPage === i ? "active" : ""}
      >
        {i}
      </button>
    );
  }
  
  // 마지막 페이지와 생략 표시
  if (end < totalPages) {
    if (end < totalPages - 1) {
      pages.push(<span key="ellipsis-end">...</span>);
    }
    pages.push(
      <button key={totalPages} onClick={() => handlePageChange(totalPages)}>
        {totalPages}
      </button>
    );
  }
  
  return pages;
};

// ===== URL 쿼리 파라미터와 동기화 =====
// URL의 쿼리 파라미터와 페이지 상태를 동기화합니다.
useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const page = parseInt(params.get("page")) || 1;
  if (page !== currentPage) {
    setCurrentPage(page);
  }
}, []);

const handlePageChange = (page) => {
  setCurrentPage(page);
  // URL 업데이트 (히스토리 API 사용)
  const url = new URL(window.location);
  url.searchParams.set("page", page);
  window.history.pushState({}, "", url);
  loadPageData(page);
};

// ===== 클라이언트 사이드 페이지네이션 =====
// 모든 데이터를 한 번에 로드하고 클라이언트에서 페이지를 나눕니다.
const [allItems, setAllItems] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 10;

const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const currentItems = allItems.slice(startIndex, endIndex);
const totalPages = Math.ceil(allItems.length / itemsPerPage);

// ===== 접근성 =====
// - 각 페이지 버튼에 aria-label 제공
// - 현재 페이지에 aria-current="page" 제공
// - 이전/다음 버튼에 aria-label 제공
// - disabled 상태일 때 aria-disabled 제공
// - 키보드 접근성 지원 (Tab, Enter, Space)

// ===== 스타일링 =====
// - 현재 페이지는 다른 스타일로 강조 표시
// - disabled 상태의 버튼은 시각적으로 구분
// - 호버 효과 제공
// - 모바일 환경에서는 터치 친화적인 크기 유지

// ===== 주의사항 =====
// 1. currentPage는 1부터 시작하는 것이 일반적입니다 (0이 아님).
// 2. totalPages는 Math.ceil()을 사용하여 올림 처리해야 합니다.
// 3. 페이지 변경 시 데이터를 다시 로드해야 합니다.
// 4. 페이지가 많을 경우 범위 제한을 고려해야 합니다.
// 5. URL 쿼리 파라미터와 동기화하면 북마크 및 공유가 가능합니다.
// 6. 로딩 상태를 표시하여 사용자 경험을 개선해야 합니다.
// 7. 첫 페이지와 마지막 페이지에서는 이전/다음 버튼을 비활성화해야 합니다.
// 8. 페이지 번호는 고유한 key를 가져야 합니다 (React 리스트 렌더링).
// 9. 접근성을 위해 적절한 ARIA 속성을 제공해야 합니다.
// 10. 모바일 환경에서는 페이지 번호 대신 이전/다음 버튼만 표시하는 것도 고려할 수 있습니다.`,
    PreviewComponent: PaginationPreview,
  },
];

// 1뎁스 그룹 구성 (LNB용) - ㄱ~ㅎ 순서로 정렬
const guideGroups = [
  {
    id: "navigation-group",
    label: "네비게이션",
    items: ["accordion", "dock", "pagination", "tab"],
  },
  {
    id: "data-display-group",
    label: "데이터 표시",
    items: ["table"],
  },
  {
    id: "design-system-group",
    label: "디자인 시스템",
    items: ["color", "icon", "layout", "spacing", "typography"],
  },
  {
    id: "layout-group",
    label: "레이아웃",
    items: ["footer", "header"],
  },
  {
    id: "list-card-group",
    label: "리스트 & 카드",
    items: ["card", "list", "list-container", "notice"],
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
    items: ["badge", "empty-state", "error-state", "loading", "skeleton-placeholder"],
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
    items: ["dnd", "listsync", "more"],
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
          const navElement = document.querySelector('.app-nav');
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
  const handleNavClick = (sectionId) => {
    // 먼저 활성 섹션을 업데이트해서 우측 패널이 즉시 변경되도록
    setActiveSection(sectionId);
    setIsMobileLnbOpen(false);

    // 렌더 후 스크롤 이동 시도 (DOM 생성 시점을 고려)
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (!element) return;

      const navElement = document.querySelector('.app-nav');
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
      })).filter(section => section.element);

      if (sections.length === 0) return;

      // 상단 네비게이션 바 높이 계산
      const navElement = document.querySelector('.app-nav');
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
      const modal = document.querySelector('.publishing-guide__mobile-lnb-modal');
      if (!modal) return;

      const activeLink = modal.querySelector('.publishing-guide__lnb-link.is-active');
      if (!activeLink) return;

      const modalBody = modal.querySelector('.publishing-guide__mobile-lnb-body');
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
                      <CodeBlock code={currentSection.code} />
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



