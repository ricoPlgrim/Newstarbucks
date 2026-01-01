import { useState } from "react";
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
      </div>
    </CommonLayout>
  );
};

export default GreenApronCardPage;

