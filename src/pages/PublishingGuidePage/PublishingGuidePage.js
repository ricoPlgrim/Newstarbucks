import { useState, useEffect } from "react";
import PageTemplate from "../../components/PageTemplate/PageTemplate";
import Image from "../../components/Image/Image";
import Header from "../../components/Header/Header";
import FileUpload from "../../components/FileUpload/FileUpload";
import FormSample from "../../components/FormSample/FormSample";
import Tabs from "../../components/Tabs/Tabs";
import TableDemo from "../../components/TableDemo/TableDemo";
import DatePicker from "../../components/DatePicker/DatePicker";
import Tooltip from "../../components/Tooltip/Tooltip";
import DragDropList from "../../components/DragDropList/DragDropList";
import Carousel from "../../components/Carousel/Carousel";
import Dropdown from "../../components/Dropdown/Dropdown";
import ImageZoomPopup from "../../components/Popup/ImageZoomPopup";
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

const LayoutPreview = () => {
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
  );
};

const ButtonPreview = () => (
  <div className="guide-preview guide-preview--buttons">
    <h4 className="button-list__title">버튼 사이즈 가이드</h4>
    <ul className="button-list">
      <li className="button-list__item">
        <div className="button-list__label">Small</div>
        <div className="button-list__actions">
          <button type="button" className="btn btn--primary btn--sm">Primary</button>
          <button type="button" className="btn btn--secondary btn--sm">Secondary</button>
          <button type="button" className="btn btn--ghost btn--sm">Ghost</button>
        </div>
      </li>
      <li className="button-list__item">
        <div className="button-list__label">Medium</div>
        <div className="button-list__actions">
          <button type="button" className="btn btn--primary btn--md">Primary</button>
          <button type="button" className="btn btn--secondary btn--md">Secondary</button>
          <button type="button" className="btn btn--ghost btn--md">Ghost</button>
        </div>
      </li>
      <li className="button-list__item">
        <div className="button-list__label">Large</div>
        <div className="button-list__actions">
          <button type="button" className="btn btn--primary btn--lg">Primary</button>
          <button type="button" className="btn btn--secondary btn--lg">Secondary</button>
          <button type="button" className="btn btn--ghost btn--lg">Ghost</button>
        </div>
      </li>
    </ul>
  </div>
);

const TogglePreview = () => {
  const [states, setStates] = useState({
    wifi: true,
    push: false,
    marketing: false,
  });

  const handleChange = (key, next) => {
    setStates((prev) => ({ ...prev, [key]: next }));
  };

  return (
    <div className="guide-preview guide-preview--toggle">
      <Toggle
        label="Wi-Fi 자동 연결"
        description="보안이 약한 네트워크는 자동 연결하지 않습니다."
        defaultOn={states.wifi}
        onChange={(next) => handleChange("wifi", next)}
      />
      <Toggle
        label="푸시 알림"
        description="중요 공지와 업데이트 소식을 받아봅니다."
        defaultOn={states.push}
        onChange={(next) => handleChange("push", next)}
      />
      <Toggle
        label="마케팅 수신 동의"
        description="이벤트와 혜택 정보를 이메일로 받아봅니다."
        defaultOn={states.marketing}
        onChange={(next) => handleChange("marketing", next)}
      />
      <div className="toggle-status">
        <span>현재 상태: </span>
        <code>Wi-Fi {states.wifi ? "ON" : "OFF"} · Push {states.push ? "ON" : "OFF"} · Marketing {states.marketing ? "ON" : "OFF"}</code>
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
      </div>
    </div>
  );
};

const CarouselPreview = () => {
  const [slides, setSlides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return <Carousel slides={slides} showOptionsPanel />;
};

const TableDemoPreview = () => {
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

  return <TableDemo wideHeaders={wideHeaders} wideRows={wideRows} />;
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

      {/* Basic Center Popup */}
      {isBasicOpen && (
        <div className="popup-overlay" onClick={() => setIsBasicOpen(false)}>
          <div className="popup popup--basic" onClick={(e) => e.stopPropagation()}>
            <div className="popup__image">
              <span className="popup__image-icon">🔒</span>
            </div>
            <div className="popup__body popup__body--center">
              <h4>Setting my friends data</h4>
              <p>You can chat freely after a privacy my chatroom by chatting data</p>
            </div>
            <div className="popup__dots" aria-hidden="true">
              <span className="is-active"></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="popup__actions popup__actions--stack">
              <button className="popup__btn popup__btn--ghost" onClick={() => setIsBasicOpen(false)}>
                Cancel
              </button>
              <button className="popup__btn popup__btn--primary" onClick={() => setIsBasicOpen(false)}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}

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

  return (
    <div className="guide-preview guide-preview--header">
      <div className="header-demo">
        <div className="header-demo__description">
          <p>모바일 햄버거 버튼을 눌러 사이드 메뉴를 열고, 2·3뎁스 펼침을 확인하세요.</p>
          <p>실제 Header 컴포넌트를 그대로 사용해 동작을 시연합니다.</p>
        </div>

        {/* 실제 Header 컴포넌트를 포함한 데모 프레임 */}
        <div className="header-demo__mobile-frame">
          <div className="header-demo__mobile-screen">
            <Header currentPage={currentPage} onPageChange={handlePageChange} />
            <div className="header-demo__mobile-content">
              <h4>모바일 헤더 데모</h4>
              <p>현재 페이지: <strong>{currentPage === "guide" ? "퍼블리싱 가이드" : "URL 관리"}</strong></p>
              <p>우측 햄버거 버튼을 눌러 2·3뎁스 메뉴를 펼쳐보세요.</p>
              <p>사이드 메뉴는 슬라이드 인/아웃으로 동작합니다.</p>
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
      <div style={{ marginBottom: "24px" }}>
        <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: 700 }}>
          Exclusive 타입 (하나만 열림)
        </h4>
        <Accordion items={exclusiveItems} type="exclusive" />
      </div>
      <div>
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

// 가이드 섹션 정의
const guideSections = [
  {
    id: "header",
    label: "헤더",
    title: "모바일 헤더 레이아웃",
    description:
      "모바일 환경을 위한 반응형 헤더 디자인입니다. 햄버거 버튼으로 사이드 메뉴를 열 수 있으며, 3뎁스 메뉴 구조를 지원합니다.",
    code: `// 모바일 헤더 컴포넌트 구조
function Header({ currentPage, onPageChange }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});

  // 햄버거 버튼 토글
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // 2뎁스, 3뎁스 메뉴 토글
  const toggleExpanded = (key) => {
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // 메뉴 클릭 시 닫기
  const closeMenu = () => {
    setIsMenuOpen(false);
    setExpandedItems({});
  };

  return (
    <header className="header">
      {/* 햄버거 버튼 */}
      <button className="header__hamburger" onClick={toggleMenu}>
        <span></span><span></span><span></span>
      </button>

      {/* 사이드 메뉴 */}
      <aside className={\`header__aside \${isMenuOpen ? 'is-open' : ''}\`}>
        {/* 3뎁스 메뉴 구조 */}
        <nav className="header__nav">
          {/* 메뉴 아이템들 */}
        </nav>
      </aside>
    </header>
  );
}`,
    PreviewComponent: HeaderPreview,
  },
  {
    id: "footer",
    label: "푸터",
    title: "푸터 레이아웃",
    description:
      "사이트의 공통 하단 영역으로, 회사 정보·고객센터·SNS 링크 등을 담습니다. 명확한 링크와 대비를 유지하고, 모바일에서도 읽기 쉬운 여백을 확보합니다.",
    code: `<footer class="site-footer">
  <div class="site-footer__top">
    <div class="logo">Brand</div>
    <nav class="footer-nav">
      <a href="#company">회사소개</a>
      <a href="#policy">개인정보처리방침</a>
      <a href="#faq">FAQ</a>
      <a href="#contact">문의하기</a>
    </nav>
  </div>
  <div class="site-footer__bottom">
    <p>서울시 어딘가 123, 브랜드코리아</p>
    <p>고객센터 1234-5678 | support@example.com</p>
  </div>
</footer>`,
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

// ===== 컴포넌트 내부 동작 =====
// 1. 파일 선택 시 자동으로 이미지 파일만 필터링
// 2. 최대 3개까지 업로드 가능 (초과 시 경고)
// 3. 각 파일 최대 300MB 제한 (초과 시 경고)
// 4. 이미지 미리보기 URL 자동 생성 (Blob URL)
// 5. 이미지 로드 완료 전까지 Loading 컴포넌트 표시
// 6. 각 이미지에 삭제 버튼 제공
// 7. 전체 삭제 버튼 제공

// ===== 파일 제한 사항 =====
// - 허용 타입: image/* (이미지 파일만)
// - 최대 개수: 3개
// - 최대 크기: 300MB (파일당)
// - PDF는 현재 지원하지 않음

// ===== 내부 상태 관리 =====
// 컴포넌트 내부에서 다음 상태를 관리합니다:
// - files: 업로드된 파일 배열 [{ id, file, name, size, type, preview }]
// - loadingFiles: 로딩 중인 파일 ID Set

// ===== 메모리 관리 =====
// 파일 삭제 시 자동으로 Blob URL을 해제하여 메모리 누수 방지
// (URL.revokeObjectURL() 자동 호출)

// ===== 주의사항 =====
// 1. 현재는 이미지 파일만 지원 (PDF 제외)
// 2. 최대 3개까지만 업로드 가능
// 3. 파일 삭제 시 Blob URL이 자동으로 해제됨
// 4. Image 컴포넌트를 사용하여 자동으로 비율 판단 (landscape/portrait/square)
// 5. 이미지 로드 실패 시에도 로딩 표시가 제거됨`,
    PreviewComponent: FileUpload,
  },
  {
    id: "more",
    label: "더보기",
    title: "더보기 레이아웃",
    description:
      "더보기 버튼으로 대량의 리스트 데이터를 점진적으로 로드합니다. 초기 제한된 개수부터 시작해 사용자의 필요에 따라 추가 데이터를 불러옵니다.",
    code: `// 더보기 기능 구현
const [visibleItems, setVisibleItems] = useState(5);
const totalItems = 20;

// 더보기 핸들러
const handleLoadMore = () => {
  setVisibleItems(prev => Math.min(prev + 5, totalItems));
};

// 현재 표시할 아이템들
const displayedItems = items.slice(0, visibleItems);

return (
  <div className="layout-list">
    {displayedItems.map(item => (
      <div key={item.id} className="layout-item">
        {/* 아이템 내용 */}
      </div>
    ))}

    {visibleItems < totalItems && (
      <button onClick={handleLoadMore}>
        더보기 ({Math.min(visibleItems + 5, totalItems) - visibleItems}개)
      </button>
    )}
  </div>
);`,
    PreviewComponent: LayoutPreview,
  },
  {
    id: "icon",
    label: "아이콘",
    title: "아이콘 사용 가이드",
    description:
      "라인 아이콘과 솔리드 아이콘을 구분하고, 접근성 텍스트(`aria-label`)를 반드시 제공하세요.",
    code: `<button class="icon-button" aria-label="알림">
  <svg width="20" height="20" aria-hidden="true">
    <!-- icon -->
  </svg>
</button>`,
    PreviewComponent: IconPreview,
  },
  {
    id: "toggle",
    label: "토글",
    title: "토글 스위치",
    description:
      "접근성을 고려한 role=\"switch\" 기반 토글입니다. 라벨과 설명을 함께 제공하고, 상태 변화는 onChange 이벤트로 전달합니다.",
    code: `<Toggle
  label="푸시 알림"
  description="중요 공지와 업데이트 소식을 받아봅니다."
  defaultOn={false}
  onChange={(next) => console.log(next)}
/>`,
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

// 텍스트 리스트
const items = [
  { id: 1, content: "첫 번째 항목" },
  { id: 2, content: "두 번째 항목" },
];
<List items={items} variant="text" bordered />

// 아이콘 리스트
const iconItems = [
  { id: 1, content: "홈", icon: "🏠" },
  { id: 2, content: "검색", icon: "🔍" },
];
<List items={iconItems} variant="icon" bordered />

// 구분선 있는 리스트
<List items={items} variant="text" bordered divided />

// 클릭 가능한 리스트
const clickableItems = [
  { id: 1, content: "항목 1", onClick: () => console.log("클릭") },
];
<List items={clickableItems} variant="text" bordered />

// 직접 ListItem 사용
<List variant="text" bordered>
  <ListItem icon="⭐" prefix="1.">첫 번째 항목</ListItem>
  <ListItem icon="⭐" suffix="완료">두 번째 항목</ListItem>
</List>`,
    PreviewComponent: ListPreview,
  },
  {
    id: "form",
    label: "폼",
    title: "폼 요소",
    description:
      "레이블·플레이스홀더·보조텍스트와 함께 간단한 유효성 검사를 포함한 폼입니다. 이름, 휴대폰, 주소, 이메일, 비밀번호를 검증합니다.",
    code: `<form onSubmit={handleSubmit}>
  <label class="field">
    <span class="field__label">이름</span>
    <input name="name" type="text" placeholder="홍길동" />
  </label>
  <label class="field">
    <span class="field__label">휴대폰 번호</span>
    <input name="phone" type="tel" placeholder="010-1234-5678" />
  </label>
  <label class="field">
    <span class="field__label">주소</span>
    <input name="address" type="text" placeholder="도로명 주소" />
  </label>
  <label class="field">
    <span class="field__label">이메일</span>
    <input name="email" type="email" placeholder="name@example.com" />
  </label>
  <label class="field">
    <span class="field__label">비밀번호</span>
    <input name="password" type="password" placeholder="8자 이상 입력" />
  </label>
  <button type="submit" class="btn btn--primary btn--md">유효성 검사</button>
</form>`,
    PreviewComponent: FormSample,
  },
  {
    id: "button",
    label: "버튼",
    title: "버튼 타입",
    description:
      "Primary/Secondary/Ghost 버튼을 rem 단위와 사이즈 토큰(S, M, L)으로 제공합니다.",
    code: `<button class="btn btn--primary btn--sm">Primary Small</button>
<button class="btn btn--secondary btn--sm">Secondary Small</button>
<button class="btn btn--ghost btn--sm">Ghost Small</button>

<button class="btn btn--primary btn--md">Primary Medium</button>
<button class="btn btn--secondary btn--md">Secondary Medium</button>
<button class="btn btn--ghost btn--md">Ghost Medium</button>

<button class="btn btn--primary btn--lg">Primary Large</button>
<button class="btn btn--secondary btn--lg">Secondary Large</button>
<button class="btn btn--ghost btn--lg">Ghost Large</button>`,
    PreviewComponent: ButtonPreview,
  },
  {
    id: "toast",
    label: "토스트",
    title: "토스트 알림",
    description:
      "성공/경고/에러 등 상태에 따라 색상이 바뀌는 토스트 알림입니다. 지정된 시간 후 자동으로 사라지며 닫기 버튼을 제공합니다.",
    code: `const [toast, setToast] = useState({ message: "", type: "info" });

const showToast = (type, message) => {
  setToast({ message, type });
};

<Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: "", type: "info" })} />`,
    PreviewComponent: ToastPreview,
  },
  {
    id: "dock",
    label: "돗바",
    title: "하단 돗바 내비게이션",
    description:
      "모바일 하단 고정형 돗바 UI. 아이콘/라벨 목록을 props로 받아 활성 상태를 표시하며 onChange로 선택 값을 전달합니다.",
    code: `const items = [
  { key: "home", label: "홈", icon: "🏠" },
  { key: "search", label: "검색", icon: "🔍" },
  { key: "bookmark", label: "즐겨찾기", icon: "⭐" },
  { key: "profile", label: "내 정보", icon: "👤" },
];

<BottomDock
  items={items}
  defaultActive="home"
  onChange={(key) => console.log("selected", key)}
/>`,
    PreviewComponent: BottomDockPreview,
  },
  {
    id: "listsync",
    label: "리스트 동기화",
    title: "선택 리스트 연동",
    description:
      "좌측 버튼 리스트를 클릭하면 우측 리스트에 li로 추가되고, 삭제 버튼을 누르면 선택 목록에서 제거됩니다. onChange로 최신 선택 배열을 전달합니다.",
    code: `const options = [{ value: "react", label: "React" }, ...];
const [selected, setSelected] = useState([]);

<ListSync options={options} onChange={setSelected} />`,
    PreviewComponent: ListSyncPreview,
  },
  {
    id: "table",
    label: "테이블",
    title: "가로 스크롤 · 열 고정 테이블",
    description: "좌우 스크롤 시 첫 두 열(번호·제목)을 고정해 식별성을 유지합니다. `position: sticky`와 고정 너비를 사용합니다.",
    code: `<div class="table-wrap is-scrollable">
  <table class="table is-wide is-freeze">
    <thead>
      <tr>
        <th class="is-sticky is-sticky--first">번호</th>
        <th class="is-sticky is-sticky--second">제목</th>
        <th>등록일</th>
        <th>첨부</th>
        <th>조회수</th>
        <th>경쟁률</th>
        <th>상태</th>
        <th>분류</th>
        <th>담당자</th>
        <th>마감일</th>
        <th>비고</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="is-sticky is-sticky--first">1</td>
        <td class="is-sticky is-sticky--second">데이터 분석가 채용</td>
        <td>2025-01-07</td>
        <td>jd.pdf</td>
        <td>3,210</td>
        <td>15:1</td>
        <td>진행중</td>
        <td>채용</td>
        <td>홍길동</td>
        <td>2025-02-01</td>
        <td>온라인 면접</td>
      </tr>
    </tbody>
  </table>
</div>

/* 핵심 스타일 */
.is-freeze {
  width: max-content;
}
.is-freeze .is-sticky { position: sticky; background: #fff; z-index: 2; }
.is-freeze .is-sticky--first { left: 0; min-width: 90px; z-index: 3; }
.is-freeze .is-sticky--second { left: 90px; min-width: 240px; }`,
    PreviewComponent: TableDemoPreview,
  },
  {
    id: "popup",
    label: "팝업",
    title: "팝업 UI",
    description:
      "Basic 중앙 팝업, 바텀시트(드래그로 닫기), 풀스크린 팝업을 제공합니다.",
    code: `// 상태
const [isBasicOpen, setIsBasicOpen] = useState(false);
const [isSheetOpen, setIsSheetOpen] = useState(false);
const [isFullOpen, setIsFullOpen] = useState(false);

// 바텀시트 드래그 종료 시
if (dragDistance > threshold) closeSheet();`,
    PreviewComponent: PopupPreview,
  },
  {
    id: "image-zoom",
    label: "이미지 줌 팝업",
    title: "풀스크린 이미지 확대",
    description: "풀팝업 위에 이미지를 올려두고 핀치/휠로 확대·축소하는 예시입니다.",
    code: `<ImageZoomPopup
  src="https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&w=1200"
  open={open}
  onClose={() => setOpen(false)}
/>`,
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
    code: `<DatePicker />`,
    PreviewComponent: DatePicker,
  },
  {
    id: "tooltip",
    label: "툴팁",
    title: "툴팁 컴포넌트",
    description: "물음표 아이콘을 클릭하면 툴팁이 토글되는 UI입니다. top/right/bottom/left 위치를 지원합니다.",
    code: `<div class="tooltip-row">
  <Tooltip text="위쪽 툴팁" placement="top" />
  <Tooltip text="오른쪽 툴팁" placement="right" />
  <Tooltip text="아래쪽 툴팁" placement="bottom" />
  <Tooltip text="왼쪽 툴팁" placement="left" />
</div>`,
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

const handleStop = (startIndex, data) => {
  const deltaIndex = Math.round(data.y / itemHeight);
  const target = clamp(startIndex + deltaIndex, 0, items.length - 1);
  reorder(startIndex, target);
};

<Draggable axis="y" onStop={(e, data) => handleStop(index, data)}>
  <div className="card">...</div>
</Draggable>`,
    PreviewComponent: DragDropList,
  },
  {
    id: "carousel",
    label: "캐러셀",
    title: "Swiper 캐러셀",
    description:
      "react + swiper 캐러셀. 기본 네비게이션/페이지네이션 + loop/간격 옵션을 사용하며, breakpoints로 반응형 슬라이드 수를 조절합니다.",
    code: `import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

<Swiper
  modules={[Navigation, Pagination]}
  navigation               // 좌·우 화살표
  pagination={{ clickable: true }} // bullet + 클릭 이동
  loop                     // 마지막 뒤로 순환
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
</Swiper>`,
    PreviewComponent: CarouselPreview,
  },
  {
    id: "dropdown",
    label: "드롭다운",
    title: "드롭다운 UI",
    description: "클릭으로 열고 닫는 기본/filled/ghost 드롭다운. 선택 값 표시와 선택 이벤트 예시를 포함합니다.",
    code: `import Dropdown from "./Dropdown";

<Dropdown options={options} />
<Dropdown options={options} variant="filled" />
<Dropdown options={options} variant="ghost" />`,
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
    code: `<Image
  src="https://example.com/image.jpg"
  alt="이미지 설명"
  width="300"
  height="200"
  onLoad={() => console.log('이미지 로드됨')}
  onError={() => console.log('이미지 로드 실패')}
/>`,
    PreviewComponent: ImagePreview,
  },
  {
    id: "loading",
    label: "로딩",
    title: "로딩 인디케이터",
    description:
      "로딩 상태를 명확히 알려주는 스피너형 인디케이터입니다. size와 thickness로 크기를 조절하고, label로 접근성 텍스트를 제공합니다.",
    code: `import Loading from "./Loading";

// 로딩 상태에서 표시
<Loading size={48} thickness={4} label="불러오는 중..." />`,
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

// 기본 사용
<Badge>기본</Badge>

// Variant
<Badge variant="default">기본</Badge>
<Badge variant="success">성공</Badge>
<Badge variant="warning">경고</Badge>
<Badge variant="error">오류</Badge>
<Badge variant="info">정보</Badge>

// Outlined 스타일
<Badge variant="success" outlined>성공</Badge>

// Size
<Badge size="small">Small</Badge>
<Badge size="medium">Medium</Badge>
<Badge size="large">Large</Badge>

// 조합
<Badge variant="error" size="small" outlined>HOT</Badge>`,
    PreviewComponent: BadgePreview,
  },
  {
    id: "search-field",
    label: "서치 필드",
    title: "검색 필드 컴포넌트",
    description:
      "검색 아이콘, 입력 필드, 클리어 버튼, 검색 버튼을 포함한 검색 입력 컴포넌트입니다. Enter 키로 검색할 수 있으며, 다양한 size와 variant를 지원합니다.",
    code: `import SearchField from "./SearchField";

// 기본 사용
<SearchField
  placeholder="검색어를 입력하세요"
  onChange={(e, value) => console.log(value)}
/>

// 검색 버튼 포함
<SearchField
  placeholder="검색어를 입력하세요"
  onSearch={(value) => console.log("검색:", value)}
  onClear={() => console.log("지움")}
/>

// Controlled 컴포넌트
const [value, setValue] = useState("");
<SearchField
  value={value}
  onChange={(e, newValue) => setValue(newValue)}
/>

// Size & Variant
<SearchField size="small" variant="default" />
<SearchField size="medium" variant="filled" />
<SearchField size="large" variant="outlined" />

// 비활성화
<SearchField disabled />`,
    PreviewComponent: SearchFieldPreview,
  },
  {
    id: "notice",
    label: "공지사항",
    title: "공지사항 리스트",
    description:
      "타이틀/날짜/뱃지 형태의 공지사항 리스트 컴포넌트입니다. 기본 데이터가 내장되어 있으며 items로 교체 가능하며, 로딩 상태를 skeleton으로 표시할 수 있습니다.",
    code: `import Notice from "./Notice";

// 기본 데이터 사용
<Notice />

// 커스텀 데이터 사용
const items = [
  { id: 1, title: "시스템 점검 안내", date: "2025-01-23", badge: "안내" },
  { id: 2, title: "정책 변경 안내", date: "2025-01-20", badge: "중요" },
];

<Notice title="새 소식" linkText="전체보기" items={items} />

// 로딩 상태 (스켈레톤)
<Notice loading skeletonCount={3} />`,
    PreviewComponent: NoticePreview,
  },
  {
    id: "skeleton-placeholder",
    label: "스켈레톤",
    title: "스켈레톤 플레이스홀더",
    description:
      "리스트·카드 로딩 상태에 자주 쓰는 아바타/텍스트/버튼 조합 스켈레톤을 즉시 렌더링하는 헬퍼입니다.",
    code: `import SkeletonPlaceholder from "./Skeleton/SkeletonPlaceholder";

// 기본: 텍스트 3줄
<SkeletonPlaceholder />

// 아바타 + 텍스트 2줄
<SkeletonPlaceholder withAvatar lines={2} />

// 아바타 + 텍스트 3줄 + 우측 버튼
<SkeletonPlaceholder withAvatar withActions lines={3} />`,
    PreviewComponent: SkeletonPlaceholderPreview,
  },
  {
    id: "empty-state",
    label: "빈 상태",
    title: "Empty State 컴포넌트",
    description:
      "데이터가 없을 때 표시하는 빈 상태 UI 컴포넌트입니다. 아이콘, 제목, 설명, 액션 버튼을 포함할 수 있으며, 다양한 variant를 지원합니다.",
    code: `import EmptyState from "./EmptyState";

// 기본 사용
<EmptyState
  title="데이터가 없습니다"
  description="표시할 데이터가 없습니다."
  icon="📭"
/>

// 액션 버튼 포함
<EmptyState
  title="검색 결과가 없습니다"
  description="다른 검색어로 시도해보세요."
  icon="🔍"
  action={
    <button onClick={() => console.log("검색 초기화")}>
      검색 초기화
    </button>
  }
/>

// Variant
<EmptyState variant="minimal" title="리스트가 비어있습니다" />
<EmptyState variant="illustration" title="장바구니가 비어있습니다" />`,
    PreviewComponent: EmptyStatePreview,
  },
  {
    id: "error-state",
    label: "에러 상태",
    title: "Error / NoData 컴포넌트",
    description:
      "에러 발생 시 표시하는 공통 에러 화면 컴포넌트입니다. error, nodata, network, notfound 타입을 지원하며, 재시도 버튼 등을 포함할 수 있습니다.",
    code: `import ErrorState from "./ErrorState";

// 기본 에러
<ErrorState type="error" />

// 재시도 버튼 포함
<ErrorState
  type="error"
  action={
    <button onClick={() => console.log("재시도")}>
      다시 시도
    </button>
  }
/>

// 타입별 사용
<ErrorState type="nodata" />
<ErrorState type="network" />
<ErrorState type="notfound" />

// 커스텀 메시지
<ErrorState
  type="error"
  title="서버 오류"
  message="서버에 일시적인 문제가 발생했습니다."
  icon="⚠️"
/>`,
    PreviewComponent: ErrorStatePreview,
  },
  {
    id: "lottie",
    label: "로티",
    title: "Lottie 애니메이션",
    description:
      "After Effects에서 제작한 애니메이션을 JSON 형식으로 내보내 웹에서 재생할 수 있는 Lottie 애니메이션 컴포넌트입니다. 반복 재생, 재생 속도, 자동 재생 등을 제어할 수 있습니다.",
    code: `import LottieAnimation from "./Lottie";

// 기본 사용법
<LottieAnimation
  animationData={animationJson}
  loop={true}
  autoplay={true}
  speed={1}
  width={200}
  height={200}
/>

// URL에서 로드
<LottieAnimation
  animationData="https://example.com/animation.json"
  loop={false}
  onComplete={() => console.log("완료")}
/>`,
    PreviewComponent: LottiePreview,
  },
  {
    id: "script",
    label: "스크립트",
    title: "JavaScript 인터랙션",
    description:
      "React의 이벤트 핸들링, 상태 관리, API 연동을 포함한 인터랙션 구현 패턴입니다. 사용자 입력에 따라 UI가 동적으로 변화합니다.",
    code: `// 상태 관리
const [count, setCount] = useState(0);

// 이벤트 핸들러
const handleClick = () => {
  setCount(prev => prev + 1);
};

// 비동기 데이터 로드
const loadData = async () => {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    setData(data);
  } catch (error) {
    console.error('데이터 로드 실패:', error);
  }
};

// 폼 제출
const handleSubmit = (event) => {
  event.preventDefault();
  // 폼 데이터 처리
  console.log('폼 제출됨');
};`,
    PreviewComponent: ScriptPreview,
  },
  {
    id: "pagination",
    label: "페이지네이션",
    title: "페이지네이션 레이아웃",
    description:
      "대량의 데이터를 여러 페이지로 나누어 표시하는 네비게이션 컴포넌트입니다. 현재 페이지 표시와 이전/다음 이동 기능을 제공하며, 긴 목록을 효율적으로 탐색할 수 있습니다.",
    code: `// 페이지네이션 상태 관리
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 10;
const totalPages = Math.ceil(totalItems / itemsPerPage);

// 페이지 변경 핸들러
const handlePageChange = (page) => {
  if (page >= 1 && page <= totalPages) {
    setCurrentPage(page);
    // 데이터 로드 로직
    loadPageData(page);
  }
};

// 페이지네이션 UI 렌더링
const renderPagination = () => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <button
        key={i}
        className={i === currentPage ? 'active' : ''}
        onClick={() => handlePageChange(i)}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        이전
      </button>
      {pages}
      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        다음
      </button>
    </div>
  );
};`,
    PreviewComponent: PaginationPreview,
  },
];

// 1뎁스 그룹 구성 (LNB용)
const guideGroups = [
  {
    id: "layout-group",
    label: "레이아웃",
    items: ["header", "footer"],
  },
  {
    id: "input-group",
    label: "입력 컴포넌트",
    items: ["input", "select", "textarea", "file-upload", "search-field"],
  },
  {
    id: "selection-group",
    label: "선택 컴포넌트",
    items: ["checkbox", "radio"],
  },
  {
    id: "list-card-group",
    label: "리스트 & 카드",
    items: ["card", "list", "notice"],
  },
  {
    id: "navigation-group",
    label: "네비게이션",
    items: ["tab", "pagination", "accordion", "dock"],
  },
  {
    id: "feedback-group",
    label: "피드백",
    items: ["toast", "tooltip", "popup"],
  },
  {
    id: "media-group",
    label: "미디어",
    items: ["image", "image-zoom", "carousel", "lottie"],
  },
  {
    id: "status-group",
    label: "상태 & 로딩",
    items: ["loading", "skeleton-placeholder", "badge", "empty-state", "error-state"],
  },
  {
    id: "other-group",
    label: "기타 UI",
    items: [
      "button",
      "toggle",
      "dropdown",
      "datepicker",
      "table",
      "icon",
      "more",
      "listsync",
      "dnd",
    ],
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
  const [activeSection, setActiveSection] = useState(guideGroups[0].items[0]);
  const [isMobileLnbOpen, setIsMobileLnbOpen] = useState(false);

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
                      <p className="guide-section__code-label">예시 코드</p>
                      <pre>
                        <code>{currentSection.code}</code>
                      </pre>
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


