import { useState } from "react";
import "./Header.scss";

function Header({ currentPage, onPageChange }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});

  // 메뉴 토글
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
            ✕
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
                    <span className="header__nav-arrow">
                      {expandedItems[menu.id] ? "▼" : "▶"}
                    </span>
                  </button>

                  {/* 2뎁스 메뉴 */}
                  {expandedItems[menu.id] && menu.children && (
                    <ul className="header__nav-sublist">
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
                                <span className="header__nav-arrow">
                                  {expandedItems[submenu.id] ? "▼" : "▶"}
                                </span>
                              </button>

                              {/* 3뎁스 메뉴 */}
                              {expandedItems[submenu.id] && submenu.children && (
                                <ul className="header__nav-sublist header__nav-sublist--depth3">
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
