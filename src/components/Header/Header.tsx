import { useState, useRef, useEffect } from "react";
import Typography from "../Typography/Typography";
import Icon from "../Icon/Icon";
import "./Header.scss";

type HeaderVariant = "main" | "sub";

type HeaderProps = {
  currentPage?: string;
  onPageChange?: (page: string) => void;
  variant?: HeaderVariant;
  categoryName?: string;
  onBack?: () => void;
  onCartClick?: () => void;
  onUtilityClick?: (key: string) => void;
  sticky?: boolean; // sticky 활성화 여부 (기본값: false)
  showUtilities?: boolean; // 서브 헤더에서 유틸리티 버튼 표시 여부 (기본값: true)
  showMoreButton?: boolean; // 더보기 버튼 표시 여부 (기본값: true)
  // 메인 헤더 전용 props
  notificationCount?: number; // 알림 개수
  onLogoClick?: () => void; // 로고 클릭 핸들러
  onNotificationClick?: () => void; // 알림 클릭 핸들러
};

// GNB 메뉴 데이터 (3뎁스 구조) - 컴포넌트 외부로 이동하여 모든 함수에서 사용 가능하도록
const gnbMenu = [
  {
    id: "menu1",
    label: "메뉴 1",
    children: [
      {
        id: "submenu1-1",
        label: "서브메뉴 1-1",
        children: [
          { id: "depth3-1-1", label: "3뎁스 1-1-1", href: "#" },
          { id: "depth3-1-2", label: "3뎁스 1-1-2", href: "#" }
        ]
      },
      {
        id: "submenu1-2",
        label: "서브메뉴 1-2",
        children: [
          { id: "depth3-1-3", label: "3뎁스 1-2-1", href: "#" },
          { id: "depth3-1-4", label: "3뎁스 1-2-2", href: "#" }
        ]
      }
    ]
  },
  {
    id: "menu2",
    label: "메뉴 2",
    children: [
      {
        id: "submenu2-1",
        label: "서브메뉴 2-1",
        children: [
          { id: "depth3-2-1", label: "3뎁스 2-1-1", href: "#" },
          { id: "depth3-2-2", label: "3뎁스 2-1-2", href: "#" }
        ]
      },
      {
        id: "submenu2-2",
        label: "서브메뉴 2-2",
        children: [
          { id: "depth3-2-3", label: "3뎁스 2-2-1", href: "#" }
        ]
      }
    ]
  },
  {
    id: "menu3",
    label: "메뉴 3",
    children: [
      {
        id: "submenu3-1",
        label: "서브메뉴 3-1",
        href: "#"
      },
      {
        id: "submenu3-2",
        label: "서브메뉴 3-2",
        href: "#"
      }
    ]
  }
];

function Header({ 
  currentPage, 
  onPageChange, 
  variant = "main", // "main" | "sub"
  categoryName = "카테고리",
  onBack = () => {},
  onCartClick = () => {},
  onUtilityClick,
  sticky = false,
  showUtilities = true, // 서브 헤더에서 유틸리티 버튼 표시 여부
  showMoreButton = true, // 더보기 버튼 표시 여부
  // 메인 헤더 전용 props
  notificationCount = 0,
  onLogoClick,
  onNotificationClick
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});
  // 각 서브메뉴의 DOM 참조 (2뎁스, 3뎁스 애니메이션용)
  const submenuRefs = useRef({});
  // expandedItems의 최신 상태를 추적하기 위한 ref
  const expandedItemsRef = useRef(expandedItems);

  /**
   * 메뉴 토글 이벤트 핸들러
   * 햄버거 버튼 클릭 시 사이드 메뉴 열기/닫기
   */
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  /**
   * 2뎁스, 3뎁스 메뉴 토글 이벤트 핸들러
   * 서브메뉴 클릭 시 해당 메뉴 열기/닫기
   * @param {string} key - 메뉴 ID
   * @param {boolean} isMenu1Depth - 1뎁스 메뉴인지 여부
   */
  const toggleExpanded = (key, isMenu1Depth = false) => {
    setExpandedItems(prev => {
      const newState = { ...prev };
      
      // 1뎁스 메뉴를 클릭한 경우, 다른 1뎁스 메뉴와 그 하위 메뉴들을 모두 닫기
      if (isMenu1Depth) {
        // 모든 1뎁스 메뉴 ID 찾기
        const menu1DepthKeys = gnbMenu.map(menu => menu.id);
        
        // 현재 클릭한 메뉴를 제외한 다른 1뎁스 메뉴와 그 하위 메뉴들 닫기
        menu1DepthKeys.forEach(menuId => {
          if (menuId !== key) {
            // 다른 1뎁스 메뉴 닫기
            delete newState[menuId];
            
            // 해당 1뎁스 메뉴의 모든 2뎁스, 3뎁스 메뉴도 닫기
            const menu = gnbMenu.find(m => m.id === menuId);
            if (menu && menu.children) {
              menu.children.forEach(submenu => {
                delete newState[submenu.id];
              });
            }
          }
        });
      }
      
      // 현재 클릭한 메뉴 토글
      newState[key] = !prev[key];
      
      // 현재 클릭한 메뉴가 1뎁스이고 닫히는 경우, 하위 메뉴들도 모두 닫기
      if (isMenu1Depth && !newState[key]) {
        const menu = gnbMenu.find(m => m.id === key);
        if (menu && menu.children) {
          menu.children.forEach(submenu => {
            delete newState[submenu.id];
          });
        }
      }
      
      // ref에도 최신 상태 저장
      expandedItemsRef.current = newState;
      return newState;
    });
  };

  /**
   * 메뉴 클릭 시 사이드 메뉴 닫기
   * 링크 클릭 시 호출됨
   */
  const closeMenu = () => {
    setIsMenuOpen(false);
    setExpandedItems({});
  };

  // expandedItems의 이전 상태를 추적하기 위한 ref
  const prevExpandedItemsRef = useRef({});

  // expandedItems가 변경될 때마다 ref 업데이트
  useEffect(() => {
    expandedItemsRef.current = expandedItems;
  }, [expandedItems]);

  /**
   * 단일 메뉴의 정확한 높이를 측정하는 함수
   * transition을 일시적으로 비활성화하여 정확한 높이 측정
   * @param {HTMLElement} ref - 측정할 요소
   * @returns {number} - 실제 콘텐츠 높이
   */
  const measureHeight = (ref) => {
    if (!ref) return 0;
    
    // 현재 max-height 저장
    const originalMaxHeight = ref.style.maxHeight;
    
    // transition을 일시적으로 비활성화하여 높이 측정 중 애니메이션 방지
    ref.style.transition = "none";
    
    // max-height를 매우 큰 값으로 설정하여 제약 제거
    ref.style.maxHeight = "9999px";
    
    // 브라우저가 레이아웃을 재계산하도록 강제
    // offsetHeight 접근으로 reflow 발생
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    ref.offsetHeight;
    
    // scrollHeight 측정 (모든 콘텐츠 포함)
    const height = ref.scrollHeight;
    
    // max-height만 원래 값으로 복원 (transition은 그대로 none으로 유지)
    // transition은 recalculateAllHeights에서 높이 설정 시 활성화됨
    ref.style.maxHeight = originalMaxHeight;
    
    return height;
  };

  /**
   * 모든 열려있는 메뉴의 높이를 재계산하는 함수
   * @param {Object} expandedItemsState - 현재 expandedItems 상태
   * @param {Object} prevExpandedItemsState - 이전 expandedItems 상태 (변경 감지용)
   */
  const recalculateAllHeights = (expandedItemsState, prevExpandedItemsState = {}) => {
    // 먼저 닫혀있는 메뉴는 max-height를 0으로 설정
    Object.keys(submenuRefs.current).forEach((key) => {
      const ref = submenuRefs.current[key];
      if (ref && !expandedItemsState[key]) {
        // 이전에 열려있었던 경우에만 transition 활성화 (닫힐 때 애니메이션)
        if (prevExpandedItemsState[key]) {
          ref.style.removeProperty("transition");
          ref.style.maxHeight = "0";
        } else {
          // 처음부터 닫혀있던 경우 transition 없이 0으로 설정
          ref.style.setProperty("transition", "none", "important");
          ref.style.maxHeight = "0";
        }
      }
    });

    // 열려있는 메뉴를 3뎁스와 2뎁스로 분류
    const depth3Keys = []; // 3뎁스 메뉴 (submenu.id)
    const depth2Keys = []; // 2뎁스 메뉴 (menu.id)
    
    Object.keys(expandedItemsState).forEach((key) => {
      if (expandedItemsState[key]) {
        const parentId = findParentMenuId(key);
        if (parentId) {
          // 3뎁스 메뉴 (부모가 있음 = submenu.id)
          depth3Keys.push(key);
        } else {
          // 2뎁스 메뉴 (부모가 없음 = menu.id)
          depth2Keys.push(key);
        }
      }
    });

    // 1단계: 3뎁스 메뉴의 높이를 먼저 계산 (자식부터)
    depth3Keys.forEach((key) => {
      const ref = submenuRefs.current[key];
      if (ref) {
        const wasClosed = !prevExpandedItemsState[key];
        
        if (wasClosed) {
          // 열릴 때: transition 비활성화하고 0으로 설정
          // 실제 애니메이션은 useEffect에서 처리
          // 명시적으로 "none" 문자열로 설정하여 나중에 체크 가능하도록
          ref.style.setProperty("transition", "none", "important");
          ref.style.maxHeight = "0";
        } else {
          // 이미 열려있었던 경우: 높이만 재계산
          const height = measureHeight(ref);
          ref.style.removeProperty("transition");
          ref.style.maxHeight = height + "px";
        }
      }
    });

    // 2단계: 2뎁스 메뉴의 높이를 계산 (3뎁스 높이가 포함된 상태)
    depth2Keys.forEach((key) => {
      const ref = submenuRefs.current[key];
      if (ref) {
        const wasClosed = !prevExpandedItemsState[key];
        
        if (wasClosed) {
          // 열릴 때: transition 비활성화하고 0으로 설정
          // 실제 애니메이션은 useEffect에서 처리
          // 명시적으로 "none" 문자열로 설정하여 나중에 체크 가능하도록
          ref.style.setProperty("transition", "none", "important");
          ref.style.maxHeight = "0";
        } else {
          // 이미 열려있었던 경우: 높이만 재계산
          const height = measureHeight(ref);
          ref.style.removeProperty("transition");
          ref.style.maxHeight = height + "px";
        }
      }
    });
  };

  /**
   * 서브메뉴의 max-height 설정 (아코디언 애니메이션용)
   * expandedItems가 변경될 때마다 실행됨
   * 3뎁스가 열릴 때 2뎁스의 높이도 재계산되도록 처리
   */
  useEffect(() => {
    let rafId1 = null;
    let rafId2 = null;
    let rafId3 = null;
    let isCancelled = false;

    // 이전 상태 저장
    const prevExpandedItems = prevExpandedItemsRef.current;
    
    // requestAnimationFrame을 사용하여 DOM 업데이트 후 높이 재계산
    // 이중 requestAnimationFrame으로 브라우저 렌더링 완료 후 높이 계산
    const updateHeights = () => {
      // 취소되었으면 실행하지 않음
      if (isCancelled) return;

      // ref에서 최신 expandedItems 상태를 가져와서 일관성 보장
      const currentExpandedItems = expandedItemsRef.current;

      // 첫 번째 단계: DOM 업데이트 후 높이 재계산 (이전 상태와 함께 전달)
      recalculateAllHeights(currentExpandedItems, prevExpandedItems);

      // 두 번째 단계: 한 프레임 후 열릴 때 애니메이션 시작 (3뎁스 먼저)
      rafId2 = requestAnimationFrame(() => {
        if (isCancelled) return;
        
        const latestExpandedItems = expandedItemsRef.current;
        
        // 열릴 때 애니메이션 처리 (3뎁스 먼저)
        Object.keys(latestExpandedItems).forEach((key) => {
          if (latestExpandedItems[key] && !prevExpandedItems[key]) {
            const parentId = findParentMenuId(key);
            if (parentId) {
              // 3뎁스 메뉴인 경우
              const ref = submenuRefs.current[key];
              if (ref) {
                // transition이 "none"으로 설정되어 있는지 체크
                // getComputedStyle로 확인하거나 style 속성 직접 확인
                const styleTransition = ref.style.getPropertyValue("transition");
                const computedTransition = window.getComputedStyle(ref).transition;
                
                // transition이 none이거나 important로 설정된 경우
                if (styleTransition === "none" || computedTransition === "none" || computedTransition === "all 0s ease 0s") {
                  // 높이 측정
                  const height = measureHeight(ref);
                  
                  // transition을 활성화하고 높이 설정 (0에서 height로 애니메이션)
                  ref.style.removeProperty("transition");
                  ref.style.maxHeight = height + "px";
                }
              }
            }
          }
        });
        
        // 세 번째 단계: 3뎁스 애니메이션 후 2뎁스 높이 재계산 및 애니메이션
        rafId3 = requestAnimationFrame(() => {
          if (isCancelled) return;
          
          const finalExpandedItems = expandedItemsRef.current;
          
          // 열릴 때 애니메이션 처리 (2뎁스)
          Object.keys(finalExpandedItems).forEach((key) => {
            if (finalExpandedItems[key] && !prevExpandedItems[key]) {
              const parentId = findParentMenuId(key);
              if (!parentId) {
                // 2뎁스 메뉴인 경우
                const ref = submenuRefs.current[key];
                if (ref) {
                  // transition이 "none"으로 설정되어 있는지 체크
                  // getComputedStyle로 확인하거나 style 속성 직접 확인
                  const styleTransition = ref.style.getPropertyValue("transition");
                  const computedTransition = window.getComputedStyle(ref).transition;
                  
                  // transition이 none이거나 important로 설정된 경우
                  if (styleTransition === "none" || computedTransition === "none" || computedTransition === "all 0s ease 0s") {
                    // 높이 측정 (3뎁스 높이 포함)
                    const height = measureHeight(ref);
                    
                    // transition을 활성화하고 높이 설정 (0에서 height로 애니메이션)
                    ref.style.removeProperty("transition");
                    ref.style.maxHeight = height + "px";
                  }
                }
              }
            }
          });
          
          // 이미 열려있었던 메뉴들의 높이도 재계산 (3뎁스가 열릴 때 2뎁스 높이 변경)
          Object.keys(finalExpandedItems).forEach((key) => {
            if (finalExpandedItems[key] && prevExpandedItems[key]) {
              const parentId = findParentMenuId(key);
              if (!parentId) {
                // 2뎁스 메뉴이고 이미 열려있었던 경우
                const ref = submenuRefs.current[key];
                if (ref) {
                  const height = measureHeight(ref);
                  ref.style.removeProperty("transition");
                  ref.style.maxHeight = height + "px";
                }
              }
            }
          });
        });
      });
    };

    // DOM 업데이트 후 높이 재계산
    rafId1 = requestAnimationFrame(() => {
      requestAnimationFrame(updateHeights);
    });

    // 현재 상태를 이전 상태로 저장 (다음 변경 시 사용)
    prevExpandedItemsRef.current = { ...expandedItems };

    // cleanup 함수: 컴포넌트 언마운트 또는 의존성 변경 시 실행 중인 애니메이션 취소
    return () => {
      isCancelled = true;
      if (rafId1 !== null) {
        cancelAnimationFrame(rafId1);
      }
      if (rafId2 !== null) {
        cancelAnimationFrame(rafId2);
      }
      if (rafId3 !== null) {
        cancelAnimationFrame(rafId3);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expandedItems]);

  /**
   * 부모 메뉴 ID 찾기 (3뎁스의 경우 2뎁스 ID 반환)
   * @param {string} childId - 자식 메뉴 ID
   * @returns {string|null} - 부모 메뉴 ID 또는 null
   */
  const findParentMenuId = (childId) => {
    for (const menu of gnbMenu) {
      if (menu.children) {
        for (const submenu of menu.children) {
          if (submenu.id === childId) {
            // 3뎁스의 부모인 2뎁스(1뎁스) ID 반환
            return menu.id;
          }
        }
      }
    }
    return null;
  };

  // 서브 헤더 렌더링
  if (variant === "sub") {
    return (
      <header className={`header header--sub${sticky ? " header--sticky" : ""}`}>
        <div className="header__inner header__inner--sub">
          {/* 뒤로가기 버튼 */}
          <button
            className="header__back"
            onClick={onBack}
            aria-label="뒤로가기"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* 카테고리 이름 */}
          <Typography variant="h5" size="small" className="header__category">
            {categoryName}
          </Typography>

          {/* 오른쪽 유틸리티 버튼들 */}
          {showUtilities && (
            <div className="header__utilities">
              {/* 장바구니 버튼 */}
              <button
                className="header__utility-btn"
                onClick={onCartClick}
                aria-label="장바구니"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19C19.5304 16 20.0391 15.7893 20.4142 15.4142C20.7893 15.0391 21 14.5304 21 14V6H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* 검색 버튼 */}
              <button
                className="header__utility-btn"
                onClick={() => onUtilityClick && onUtilityClick("search")}
                aria-label="검색"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* 더보기 버튼 */}
              {showMoreButton && (
                <button
                  className="header__utility-btn"
                  onClick={() => onUtilityClick && onUtilityClick("more")}
                  aria-label="더보기"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <circle cx="12" cy="12" r="1" fill="currentColor"/>
                    <circle cx="19" cy="12" r="1" fill="currentColor"/>
                    <circle cx="5" cy="12" r="1" fill="currentColor"/>
                  </svg>
                </button>
              )}
            </div>
          )}
        </div>
      </header>
    );
  }

  // 메인 헤더 렌더링
  return (
    <header className={`header${sticky ? " header--sticky" : ""}`}>
      <div className="header__inner">
        {/* 햄버거 메뉴 */}
        <button
          className={`header__hamburger ${isMenuOpen ? "is-active" : ""}`}
          onClick={toggleMenu}
          aria-label="메뉴 열기"
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* 로고 섹션 */}
        <button
          className="header__logo-section"
          onClick={onLogoClick}
          aria-label="MOBILE OFFICE 메뉴 열기"
        >
          <div className="header__logo">스타벅스</div>
          <div className="header__title">
            <Typography variant="h4" size="medium" weight="bold">
              MOBILE OFFICE
            </Typography>
            <Icon name="chevron-down" size="small">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Icon>
          </div>
        </button>

        {/* 알림 버튼 */}
        <button
          className="header__notification"
          onClick={onNotificationClick}
          aria-label={`알림 ${notificationCount}개`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13.73 21a2 2 0 0 1-3.46 0"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {notificationCount > 0 && (
            <span className="header__notification-badge">{notificationCount}</span>
          )}
        </button>
      </div>

      {/* 모바일 사이드 메뉴 */}
      <aside className={`header__aside ${isMenuOpen ? "is-open" : ""}`}>
        <div className="header__aside-inner">
          {/* 닫기 버튼 */}
          <button
            className="header__aside-close"
            onClick={closeMenu}
            aria-label="메뉴 닫기"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* 메뉴 리스트 */}
          <nav className="header__nav">
            <ul className="header__nav-list">
              {/* GNB 메뉴 (3뎁스) */}
              {gnbMenu.map((menu) => (
                <li key={menu.id} className="header__nav-item header__nav-item--has-children">
                  <button
                    className="header__nav-link header__nav-link--expandable"
                    onClick={() => toggleExpanded(menu.id, true)}
                    aria-expanded={expandedItems[menu.id]}
                  >
                    {menu.label}
                    <span className="header__nav-arrow" aria-hidden="true">
                      <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.5 3L7.5 6L4.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </button>

                  {/* 2뎁스 메뉴 (아코디언 애니메이션) */}
                  {menu.children && (
                    <ul
                      ref={(el) => {
                        submenuRefs.current[menu.id] = el;
                      }}
                      className={`header__nav-sublist ${expandedItems[menu.id] ? "is-open" : ""}`}
                    >
                      {menu.children.map((submenu) => (
                        <li key={submenu.id} className="header__nav-subitem">
                          {submenu.children ? (
                            <>
                              <button
                                className="header__nav-sublink header__nav-sublink--expandable"
                                onClick={() => toggleExpanded(submenu.id)}
                                aria-expanded={expandedItems[submenu.id]}
                              >
                                {submenu.label}
                                <span className="header__nav-arrow" aria-hidden="true">
                                  <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.5 3L7.5 6L4.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </span>
                              </button>

                              {/* 3뎁스 메뉴 (아코디언 애니메이션) */}
                              {submenu.children && (
                                <ul
                                  ref={(el) => {
                                    submenuRefs.current[submenu.id] = el;
                                  }}
                                  className={`header__nav-sublist header__nav-sublist--depth3 ${expandedItems[submenu.id] ? "is-open" : ""}`}
                                >
                                  {submenu.children.map((depth3) => (
                                    <li key={depth3.id} className="header__nav-subitem">
                                      <a
                                        href={depth3.href}
                                        className="header__nav-sublink"
                                        onClick={closeMenu}
                                      >
                                        {depth3.label}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </>
                          ) : (
                            <a
                              href={submenu.href}
                              className="header__nav-sublink"
                              onClick={closeMenu}
                            >
                              {submenu.label}
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* 오버레이 */}
      {isMenuOpen && (
        <div
          className="header__overlay"
          onClick={closeMenu}
          aria-hidden="true"
        ></div>
      )}
    </header>
  );
}

export default Header;
