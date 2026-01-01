import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import CommonLayout from "../../components/CommonLayout/CommonLayout";
import Header from "../../components/Header/Header";
import Card from "../../components/Card/Card";
import Badge from "../../components/Badge/Badge";
import Typography from "../../components/Typography/Typography";
import Carousel from "../../components/Carousel/Carousel";
import "./GreenApronCardPage.scss";

const GreenApronCardPage = () => {
  const navigate = useNavigate();
  const [notificationCount] = useState(3);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  
  // 새 카드 알림 데이터
  const [newCardNotice] = useState<{
    name: string;
    count: number;
  } | null>({
    name: "김**",
    count: 1,
  });

  //널값 테스트
  //const [newCardNotice] = useState<{
  //   name: string;
  //   count: number;
  // } | null>(null);


  // 하단 네비게이션 변경 핸들러
  const handleBottomDockChange = (key: string) => {
    if (key === "home") {
      navigate("/mobile-office");
    } else if (key === "maintenance") {
      navigate("/maintenance");
    } else if (key === "green-apron") {
      navigate("/green-apron");
    }
  };

  // 배지 데이터
  const [badges] = useState([
    { id: 1, name: "온기의 시작", earned: true, image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='%23e0f2fe' width='200' height='200'/%3E%3Ctext x='100' y='100' text-anchor='middle' fill='%233b82f6' font-size='40'%3E☕%3C/text%3E%3C/svg%3E" },
    { id: 2, name: "따뜻한 심장", earned: false, image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='%23fce7f3' width='200' height='200'/%3E%3Ctext x='100' y='100' text-anchor='middle' fill='%23ec4899' font-size='40'%3E💙%3C/text%3E%3C/svg%3E" },
    { id: 3, name: "셀럽 파트너", earned: false, image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='%23f3f4f6' width='200' height='200'/%3E%3Ctext x='100' y='100' text-anchor='middle' fill='%236b7280' font-size='40'%3E🥂%3C/text%3E%3C/svg%3E" },
    { id: 4, name: "말보다 카드", earned: false, image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='%23f3f4f6' width='200' height='200'/%3E%3Ctext x='100' y='100' text-anchor='middle' fill='%236b7280' font-size='40'%3E✉️%3C/text%3E%3C/svg%3E" },
    { id: 5, name: "인싸의 시작", earned: false, image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='%23f3f4f6' width='200' height='200'/%3E%3Ctext x='100' y='100' text-anchor='middle' fill='%236b7280' font-size='40'%3E🎉%3C/text%3E%3C/svg%3E" },
    { id: 6, name: "100개의 심장", earned: false, image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='%23f3f4f6' width='200' height='200'/%3E%3Ctext x='100' y='100' text-anchor='middle' fill='%236b7280' font-size='40'%3E💕%3C/text%3E%3C/svg%3E" },
  ]);

  // 배지 획득 팝업 표시 여부
  const [showBadgePopup, setShowBadgePopup] = useState(true);
  // 팝업 위치 상태
  const [popupPosition, setPopupPosition] = useState<{ top: number; left: number } | null>(null);
  const badgeSectionRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  // 마지막 획득 배지의 위치 계산
  useEffect(() => {
    if (!showBadgePopup || !badgeSectionRef.current) return;

    const updatePopupPosition = () => {
      const section = badgeSectionRef.current;
      const popup = popupRef.current;
      if (!section) return;

      // is-earned 클래스를 가진 모든 배지 아이템 찾기
      const earnedItems = section.querySelectorAll('.green-apron-card-page__badge-item.is-earned');
      
      if (earnedItems.length === 0) {
        setPopupPosition(null);
        return;
      }

      // 마지막 획득 배지
      const lastEarnedItem = earnedItems[earnedItems.length - 1] as HTMLElement;
      const sectionRect = section.getBoundingClientRect();
      const itemRect = lastEarnedItem.getBoundingClientRect();

      // 마지막 획득 배지의 하단 아래 위치 계산
      let top = itemRect.bottom - sectionRect.top + 12;
      let left = itemRect.left - sectionRect.left + (itemRect.width / 2);

      // 팝업이 렌더링된 후 크기를 측정하여 경계 체크
      if (popup) {
        const popupRect = popup.getBoundingClientRect();
        const popupWidth = popupRect.width;
        const popupHeight = popupRect.height;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const sectionLeft = sectionRect.left;

        // 왼쪽 경계 체크 (팝업의 절반 너비 고려)
        const minLeft = popupWidth / 2;
        if (left < minLeft) {
          left = minLeft;
        }

        // 오른쪽 경계 체크
        const maxLeft = (sectionRect.width || viewportWidth - sectionLeft) - (popupWidth / 2);
        if (left > maxLeft) {
          left = maxLeft;
        }

        // 상단 경계 체크
        if (top < 0) {
          top = 12;
        }

        // 하단 경계 체크
        const maxTop = (sectionRect.height || viewportHeight) - popupHeight - 12;
        if (top > maxTop) {
          top = maxTop;
        }
      }

      setPopupPosition({ top, left });
    };

    // 팝업이 렌더링된 후 위치 계산
    const timeoutId = setTimeout(updatePopupPosition, 0);
    updatePopupPosition();

    // 리사이즈 시 위치 재계산
    window.addEventListener('resize', updatePopupPosition);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updatePopupPosition);
    };
  }, [showBadgePopup, badges]);

  // 프로모션 슬라이드 데이터
  const promoSlides = [
    {
      id: 1,
      title: "12월, 행운의 선물이 함께해요",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'%3E%3Cdefs%3E%3ClinearGradient id='redGrad' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23dc2626;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%238b1a1a;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23redGrad)' width='400' height='500'/%3E%3Ccircle cx='200' cy='150' r='80' fill='%23ffffff' opacity='0.1'/%3E%3Ctext x='200' y='420' text-anchor='middle' fill='white' font-size='18' font-weight='500'%3E12월, 행운의 선물이 함께해요%3C/text%3E%3C/svg%3E",
    },
    {
      id: 2,
      title: "따스한 연말 홀리데이 혜택",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'%3E%3Cdefs%3E%3ClinearGradient id='greenGrad' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23165f3e;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23000000;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23greenGrad)' width='400' height='500'/%3E%3Ccircle cx='200' cy='150' r='80' fill='%23ffffff' opacity='0.1'/%3E%3Ctext x='200' y='420' text-anchor='middle' fill='white' font-size='18' font-weight='500'%3E따스한 연말 홀리데이 혜택%3C/text%3E%3C/svg%3E",
    },
    {
      id: 3,
      title: "새해를 맞이하는 특별한 혜택",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'%3E%3Cdefs%3E%3ClinearGradient id='blueGrad' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%233b82f6;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%231e40af;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23blueGrad)' width='400' height='500'/%3E%3Ccircle cx='200' cy='150' r='80' fill='%23ffffff' opacity='0.1'/%3E%3Ctext x='200' y='420' text-anchor='middle' fill='white' font-size='18' font-weight='500'%3E새해를 맞이하는 특별한 혜택%3C/text%3E%3C/svg%3E",
    },
    {
      id: 4,
      title: "겨울 시즌 한정 프로모션",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'%3E%3Cdefs%3E%3ClinearGradient id='purpleGrad' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%238b5cf6;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%235b21b6;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23purpleGrad)' width='400' height='500'/%3E%3Ccircle cx='200' cy='150' r='80' fill='%23ffffff' opacity='0.1'/%3E%3Ctext x='200' y='420' text-anchor='middle' fill='white' font-size='18' font-weight='500'%3E겨울 시즌 한정 프로모션%3C/text%3E%3C/svg%3E",
    },
  ];

  return (
    <CommonLayout
      customHeader={
        <Header
          variant="main"
          sticky={true}
          notificationCount={notificationCount}
          onNotificationClick={() => console.log("알림 클릭")}
          logoText="STARBUCKS"
          titleText="GREEN APRON CARD"
          showChevron={true}
          bottomSheetOptions={[
            {
              icon: "🏠",
              label: "MOBILE OFFICE",
              onClick: () => {
                navigate("/mobile-office");
              },
            },
            {
              icon: "🔧",
              label: "Maintenance App",
              onClick: () => {
                navigate("/maintenance");
              },
            },
          ]}
          onBottomSheetOpenChange={setIsBottomSheetOpen}
        />
      }
      showBottomDock={true}
      bottomDockItems={[
        { key: "maintenance", label: "유지보수", icon: "🔧" },
        { key: "home", label: "홈", icon: "🏠" },
        { key: "green-apron", label: "그린에이프런", icon: "👔" },
      ]}
      bottomDockOnChange={handleBottomDockChange}
      bottomDockDefaultActive="green-apron"
    >
      <div className="green-apron-card-page">
        {/* 인사 배너 */}
        <div className="green-apron-card-page__greeting-banner">
          <Typography variant="body" size="medium" weight="medium" align="center">
            [숭례문타워점] 😊🎄 셀리님 안녕하세요! 💚
          </Typography>
        </div>

        {/* 카드 관리 섹션 */}
        <Card variant="content" className="green-apron-card-page__card-management">
          <div className="green-apron-card-page__card-section">
            <Typography variant="body" size="small" weight="bold" color="accent">
              INBOX
            </Typography>
            <Typography variant="h3" size="large" weight="bold" color="accent">
              89
            </Typography>
          </div>
          <div className="green-apron-card-page__card-section">
            <Typography variant="body" size="small" weight="bold" color="accent">
              SENT
            </Typography>
            <Typography variant="h3" size="large" weight="bold" color="accent">
              61
            </Typography>
          </div>
          <div className="green-apron-card-page__card-section green-apron-card-page__card-section--send">
            <Typography variant="body" size="medium" weight="bold">
              카드 보내기
            </Typography>
            <div className="green-apron-card-page__send-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </Card>

        {/* 새 카드 알림 */}
        {newCardNotice && (
          <Card variant="content" className="green-apron-card-page__new-card-notice">
            <div className="green-apron-card-page__notice-content">
              <div className="green-apron-card-page__notice-icon-wrapper">
                <div className="green-apron-card-page__notice-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <Badge variant="warning" size="small" outlined className="green-apron-card-page__new-badge">
                  New
                </Badge>
              </div>
              <Typography variant="body" size="medium" className="green-apron-card-page__notice-text">
                <span className="green-apron-card-page__notice-name">{newCardNotice.name}</span>님 외 <span className="green-apron-card-page__notice-count">{newCardNotice.count}명</span>에게<br />새로운 카드가 도착했어요.
              </Typography>
            </div>
            <Link to="/received-card" className="green-apron-card-page__notice-action">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <Typography variant="body" size="small" color="muted">
                확인
              </Typography>
            </Link>
          </Card>
        )}

        {/* 프로모션 카드 (가로 스크롤) */}
        <div className="green-apron-card-page__promo-section">
          <Carousel 
            slides={promoSlides} 
            showNavigation={false}
            showPagination={false}
            paginationColor="#fff"
            slidesPerView={2.05}
            spaceBetween={12}
            centeredSlides={false}
          />
        </div>

    

        {/* 파트너 어워드 섹션 */}
        <Card variant="content" className="green-apron-card-page__award-card">
          <div className="green-apron-card-page__award-content">
            <Typography variant="h4" size="medium" weight="bold" className="green-apron-card-page__award-title">
              파트너와 함께 하는 머그 어워드 위너
            </Typography>
            <Typography variant="body" size="small" className="green-apron-card-page__award-subtitle">
              [경기대섬] 한스타 매니저님
            </Typography>
            <Typography variant="body" size="small" className="green-apron-card-page__award-description">
              동료 파트너들에게 긍정의 마인드를 전합니다
            </Typography>
          </div>
        </Card>
        {/* My Apron Badge 섹션 */}
        <Card variant="content" className="green-apron-card-page__badge-section">
          <div ref={badgeSectionRef} className="green-apron-card-page__badge-content">
            <Typography variant="h4" size="medium" weight="bold" className="green-apron-card-page__badge-title">
              My Apron Badge
            </Typography>
            <div className="green-apron-card-page__badge-grid">
              {badges.map((badge) => (
                <div key={badge.id} className={`green-apron-card-page__badge-item ${badge.earned ? "is-earned" : ""}`}>
                  <div className="green-apron-card-page__badge-image-wrapper">
                    <img
                      src={badge.image}
                      alt={badge.name}
                      className="green-apron-card-page__badge-image"
                    />
                  </div>
                  <Typography variant="h5" size="small" className="green-apron-card-page__badge-name">
                    {badge.name}
                  </Typography>
                </div>
              ))}
            </div>
            
            {/* 배지 획득 팝업 */}
            {showBadgePopup && popupPosition && (
              <div 
                ref={popupRef}
                className="green-apron-card-page__badge-popup"
                style={{
                  top: `${popupPosition.top}px`,
                  left: `${popupPosition.left}px`,
                  transform: 'translateX(-50%)',
                }}
              >
                <Typography variant="body" size="medium" weight="medium" className="green-apron-card-page__badge-popup-text">
                  처음으로 카드를 보냈어요.<br />더 많은 파트너들과 마음을 나누어 보아요!
                </Typography>
              </div>
            )}
          </div>
        </Card>
      </div>
    </CommonLayout>
  );
};

export default GreenApronCardPage;

