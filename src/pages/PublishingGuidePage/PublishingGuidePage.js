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
import Loading from "../../components/Loading/Loading";
import LottieAnimation from "../../components/Lottie/Lottie";

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
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <Skeleton width="80px" height={32} />
          <Skeleton width="80px" height={32} />
          <Skeleton width="80px" height={32} />
        </div>
        <Skeleton width="100%" height={48} />
      </div>
    );
  }
  if (error) return <div className="guide-preview guide-preview--tabs">{error}</div>;

  return (
    <div className="guide-preview guide-preview--tabs">
      <Tabs items={items} />
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
    title: "파일 첨부 UI",
    description:
      "이미지와 PDF만 허용하며 최대 300MB까지 첨부할 수 있는 기본 파일 업로드 UI입니다. 허용되지 않는 타입은 얼럿으로 안내합니다.",
    code: `const MAX_SIZE = 300 * 1024 * 1024; // 300MB
const allowed = (file) => file.type.startsWith("image/") || file.type === "application/pdf";

const handleFileChange = (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  if (file.size > MAX_SIZE) {
    alert("최대 300MB까지 첨부할 수 있습니다.");
    e.target.value = "";
    return;
  }
  if (!allowed(file)) {
    alert("지원하지 않는 파일입니다. (허용: 이미지, PDF)");
    e.target.value = "";
  }
};`,
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
    title: "탭 인터페이스",
    description:
      "탭은 버튼 역할을 하며, `aria-selected`와 `role=\"tablist\"` 속성을 설정합니다.",
    code: `<div role="tablist" aria-label="콘텐츠 탭">
  <button role="tab" aria-selected="true">상세</button>
  <button role="tab" aria-selected="false">리뷰</button>
  <button role="tab" aria-selected="false">Q&A</button>
</div>`,
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
    items: ["header", "footer"], // 레이아웃 전용
  },
  {
    id: "input-group",
    label: "폼 요소",
    items: ["file-upload", "form"],
  },
  {
    id: "ui-group",
    label: "UI 컴포넌트",
    items: [
      "more",           // 더보기
      "datepicker",     // 데이터피커
      "dock",           // 돗바
      "dnd",            // 드래그앤드랍
      "dropdown",       // 드롭다운
      "loading",        // 로딩
      "lottie",         // 로티
      "listsync",       // 리스트 동기화
      "button",         // 버튼
      "icon",           // 아이콘
      "image",          // 이미지
      "image-zoom",     // 이미지 줌 팝업
      "carousel",       // 캐러셀
      "tab",            // 탭
      "table",          // 테이블
      "toggle",         // 토글
      "toast",          // 토스트
      "tooltip",        // 툴팁
      "popup",          // 팝업
      "pagination",     // 페이지네이션
    ],
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


