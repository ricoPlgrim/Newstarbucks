import { useState, useRef, useEffect } from "react";
import "./Header.scss";

function Header({ currentPage, onPageChange }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});
  // 각 서브메뉴의 DOM 참조 (2뎁스, 3뎁스 애니메이션용)
  const submenuRefs = useRef({});

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
   */
  const toggleExpanded = (key) => {
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  /**
   * 메뉴 클릭 시 사이드 메뉴 닫기
   * 링크 클릭 시 호출됨
   */
  const closeMenu = () => {
    setIsMenuOpen(false);
    setExpandedItems({});
  };

  /**
   * 서브메뉴의 max-height 설정 (아코디언 애니메이션용)
   * expandedItems가 변경될 때마다 실행됨
   */
  useEffect(() => {
    // 모든 서브메뉴에 대해 max-height 업데이트
    Object.keys(submenuRefs.current).forEach((key) => {
      const ref = submenuRefs.current[key];
      if (ref) {
        if (expandedItems[key]) {
          // 열려있으면 실제 콘텐츠 높이만큼 max-height 설정
          ref.style.maxHeight = ref.scrollHeight + "px";
        } else {
          // 닫혀있으면 max-height를 0으로 설정 (CSS transition으로 애니메이션)
          ref.style.maxHeight = "0";
        }
      }
    });
  }, [expandedItems]);

  // GNB 메뉴 데이터 (3뎁스 구조)
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

  return (
    <header className="header">
      <div className="header__inner">
        {/* 로고 */}
        <div className="header__logo">
          <h1>스타벅스</h1>
        </div>

        {/* 햄버거 버튼 */}
        <button
          className={`header__hamburger ${isMenuOpen ? "is-active" : ""}`}
          onClick={toggleMenu}
          aria-label="메뉴 열기"
          aria-expanded={isMenuOpen}
        >
          <span className="header__hamburger-line"></span>
          <span className="header__hamburger-line"></span>
          <span className="header__hamburger-line"></span>
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
                    onClick={() => toggleExpanded(menu.id)}
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
                      ref={(el) => (submenuRefs.current[menu.id] = el)}
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
                                  ref={(el) => (submenuRefs.current[submenu.id] = el)}
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
