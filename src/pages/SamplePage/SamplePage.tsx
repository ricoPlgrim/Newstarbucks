import { useEffect, useState } from "react";
import CommonLayout from "../../components/CommonLayout/CommonLayout";
import Skeleton from "../../components/Skeleton/Skeleton";
import LoadingGrid from "../../components/LoadingGrid/LoadingGrid";
import Typography from "../../components/Typography/Typography";
import Tabs from "../../components/Tabs/Tabs";
import Header from "../../components/Header/Header";
import "./SamplePage.scss";
// import { fetchMockSamplePage } from "../../mocks/mockData"; // 필요시 주석 해제

/**
 * 기본 퍼블리싱 페이지 템플릿 (예시용)
 * 
 * ⚠️ 이 파일은 참고용 예시입니다.
 * 실제 페이지를 만들 때는 이 구조를 그대로 사용하지 않고,
 * 프로젝트에 맞게 자유롭게 구조를 변경하세요!
 * 
 * 사용 방법:
 * 1. 이 파일을 복사하여 src/pages/YourPage/YourPage.js 생성
 * 2. 파일명과 컴포넌트명을 변경
 * 3. customClass prop을 사용하여 고유한 클래스명 지정 (CSS 충돌 방지)
 * 4. contents 클래스는 공통으로 사용 가능
 * 5. 나머지 구조는 프로젝트에 맞게 자유롭게 변경
 * 6. App.js에 페이지 등록
 * 
 * @param {string} customClass - CSS 충돌 방지를 위한 커스텀 클래스명 (기본값: "sample-page")
 */

const PlaceholderCard = ({ title, desc }) => (
  <div className="sample-page__card">
    <h4>{title}</h4>
    <p>{desc}</p>
  </div>
);

function SamplePage({ customClass = "sample-page" }) {
  // 상태 관리 예시
  const [hero, setHero] = useState(null);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState("sample");
  const [activeDock, setActiveDock] = useState("home");
  const [activeLayoutType, setActiveLayoutType] = useState("type4");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const bottomDockItems = [
    { key: "home", label: "홈", icon: "🏠" },
    { key: "search", label: "검색", icon: "🔍" },
    { key: "profile", label: "프로필", icon: "👤" },
  ];
  
  const layoutTabs = [
    { id: "type4", label: "유형 1", description: "모든 요소 포함" },
    { id: "type1", label: "유형 2", description: "서브 헤더 + ScrollTop" },
    { id: "type2", label: "유형 3", description: "메인 헤더 + BottomDock + ScrollTop" },
    { id: "type3", label: "유형 4", description: "서브 헤더 + 푸터" },
  ];
  
  const handleMenuClick = (typeId: string) => {
    setActiveLayoutType(typeId);
    setIsMobileMenuOpen(false);
  };

  // 데이터 로드 예시 (필요시 주석 해제)
  // useEffect(() => {
  //   fetchMockSamplePage()
  //     .then(({ hero: heroData, cards: cardData }) => {
  //       setHero(heroData);
  //       setCards(cardData);
  //     })
  //     .catch((err) => {
  //       console.error("데이터 로드 실패:", err);
  //       setError("데이터를 불러오지 못했습니다.");
  //     })
  //     .finally(() => setIsLoading(false));
  // }, []);

  // 로딩 상태 (필요시 주석 해제)
  // if (isLoading) {
  //   return (
  //     <div className="sample-page sample-page--loading">
  //       <Header currentPage="sample" onPageChange={() => {}} />
  //       <div className="contents">
  //         <section className="sample-page__hero">
  //           <div>
  //             <Skeleton width="100px" height={22} />
  //             <Skeleton width="240px" height={32} style={{ marginTop: 12 }} />
  //             <Skeleton width="320px" height={18} style={{ marginTop: 10 }} />
  //             <div className="sample-page__actions" style={{ marginTop: 16, display: "flex", gap: 8 }}>
  //               <Skeleton width="110px" height={38} />
  //               <Skeleton width="110px" height={38} />
  //             </div>
  //           </div>
  //           <div className="sample-page__hero-placeholder">
  //             <Skeleton width="160px" height={120} />
  //           </div>
  //         </section>
  //         <section className="sample-page__section">
  //           <div className="sample-page__section-head">
  //             <Skeleton width="140px" height={26} />
  //             <Skeleton width="220px" height={16} style={{ marginTop: 8 }} />
  //           </div>
  //           <LoadingGrid count={15} />
  //         </section>
  //       </div>
  //     </div>
  //   );
  // }

  // 에러 상태 (필요시 주석 해제)
  // if (error) {
  //   return (
  //     <div className="sample-page">
  //       <Header currentPage="sample" onPageChange={() => {}} />
  //       <div className="contents">
  //         <div className="sample-page--error">{error}</div>
  //       </div>
  //     </div>
  //   );
  // }

  const renderLayout = (type: string) => {
    switch (type) {
      case "type1":
        return (
          <CommonLayout
            headerVariant="sub"
            headerCategoryName="샘플 페이지"
            headerOnBack={() => console.log("뒤로가기")}
            showScrollTop={true}
            scrollTopShowAfter={100}
          >
            <div className="sample-page__content">
              <Typography variant="body" size="medium">
                서브 헤더와 ScrollTop이 포함된 레이아웃입니다.
              </Typography>
              <div className="sample-page__grid">
                <PlaceholderCard title="카드 제목 1" desc="카드 설명을 여기에 작성하세요." />
                <PlaceholderCard title="카드 제목 2" desc="카드 설명을 여기에 작성하세요." />
                <PlaceholderCard title="카드 제목 3" desc="카드 설명을 여기에 작성하세요." />
              </div>
            </div>
          </CommonLayout>
        );
      
      case "type2":
        return (
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
            customHeader={
              <Header
                variant="main"
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
                notificationCount={3}
                onNotificationClick={() => console.log("알림 클릭")}
              />
            }
          >
            <div className="sample-page__content">
              <Typography variant="body" size="medium">
                메인 헤더와 하단 도크가 있는 레이아웃입니다.
              </Typography>
              <div className="sample-page__grid">
                <PlaceholderCard title="카드 제목 1" desc="카드 설명을 여기에 작성하세요." />
                <PlaceholderCard title="카드 제목 2" desc="카드 설명을 여기에 작성하세요." />
                <PlaceholderCard title="카드 제목 3" desc="카드 설명을 여기에 작성하세요." />
              </div>
            </div>
          </CommonLayout>
        );
      
      case "type3":
        return (
          <CommonLayout
            headerVariant="sub"
            headerCategoryName="샘플 페이지"
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
            <div className="sample-page__content">
              <Typography variant="body" size="medium">
                서브 헤더와 푸터가 포함된 레이아웃입니다.
              </Typography>
              <div className="sample-page__grid">
                <PlaceholderCard title="카드 제목 1" desc="카드 설명을 여기에 작성하세요." />
                <PlaceholderCard title="카드 제목 2" desc="카드 설명을 여기에 작성하세요." />
                <PlaceholderCard title="카드 제목 3" desc="카드 설명을 여기에 작성하세요." />
              </div>
            </div>
          </CommonLayout>
        );
      
      case "type4":
        return (
          <CommonLayout
            headerVariant="main"
            headerCurrentPage={currentPage}
            headerOnPageChange={(page) => setCurrentPage(page)}
            headerNotificationCount={3}
            headerOnNotificationClick={() => console.log("알림 클릭")}
            showBottomDock={true}
            bottomDockItems={bottomDockItems}
            bottomDockOnChange={(key) => setActiveDock(key)}
            bottomDockDefaultActive="home"
            bottomDockPosition="relative"
            showFooter={true}
            footerNav={[
              { label: "회사소개", href: "/company" },
              { label: "이용약관", href: "/terms" },
            ]}
            footerInfo={{
              address: "서울특별시 강남구",
              contact: "02-1234-5678",
            }}
            showScrollTop={true}
            scrollTopShowAfter={100}
          >
            <div className="sample-page__content">
              <Typography variant="body" size="medium">
                모든 요소가 포함된 완전한 레이아웃입니다.
              </Typography>
              <div className="sample-page__grid">
                <PlaceholderCard title="카드 제목 1" desc="카드 설명을 여기에 작성하세요." />
                <PlaceholderCard title="카드 제목 2" desc="카드 설명을 여기에 작성하세요." />
                <PlaceholderCard title="카드 제목 3" desc="카드 설명을 여기에 작성하세요." />
              </div>
            </div>
          </CommonLayout>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="sample-page">
      <div className="sample-page__layout">
        {/* 모바일 메뉴 토글 버튼 */}
        <div className="sample-page__mobile-toggle">
          <button onClick={() => setIsMobileMenuOpen(true)}>메뉴</button>
        </div>

        {/* 모바일 메뉴 모달 */}
        {isMobileMenuOpen && (
          <div className="sample-page__mobile-menu-overlay" onClick={() => setIsMobileMenuOpen(false)}>
            <div
              className="sample-page__mobile-menu-modal"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="레이아웃 유형 메뉴"
            >
              <div className="sample-page__mobile-menu-header">
                <h4>레이아웃 유형</h4>
                <button onClick={() => setIsMobileMenuOpen(false)} aria-label="닫기">✕</button>
              </div>
              <div className="sample-page__mobile-menu-body">
                <ul className="sample-page__menu-list">
                  {layoutTabs.map((tab) => {
                    const isActive = activeLayoutType === tab.id;
                    return (
                      <li key={tab.id}>
                        <button
                          className={`sample-page__menu-link${isActive ? " is-active" : ""}`}
                          aria-current={isActive ? "true" : undefined}
                          onClick={() => handleMenuClick(tab.id)}
                        >
                          <span className="sample-page__menu-label">{tab.label}</span>
                          <span className="sample-page__menu-desc">{tab.description}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 왼쪽 네비게이션 메뉴 */}
        <nav className="sample-page__lnb" aria-label="레이아웃 유형 메뉴">
          <ul className="sample-page__lnb-list">
            {layoutTabs.map((tab) => {
              const isActive = activeLayoutType === tab.id;
              return (
                <li key={tab.id}>
                  <button
                    className={`sample-page__lnb-link${isActive ? " is-active" : ""}`}
                    aria-current={isActive ? "true" : undefined}
                    onClick={() => handleMenuClick(tab.id)}
                  >
                    <span className="sample-page__lnb-label">{tab.label}</span>
                    <span className="sample-page__lnb-desc">{tab.description}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* 오른쪽 컨텐츠 영역 */}
        <div className="sample-page__content-area">
          <div className="sample-page__header">
            <Typography variant="h3" size="medium" className="sample-page__title">
              CommonLayout 유형별 예제
            </Typography>
            <Typography variant="body" size="small" color="muted" className="sample-page__subtitle">
              메뉴에서 유형을 선택하여 각 레이아웃을 확인하세요.
            </Typography>
          </div>
          
          <div className="sample-page__layout-preview">
            {renderLayout(activeLayoutType)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SamplePage;

