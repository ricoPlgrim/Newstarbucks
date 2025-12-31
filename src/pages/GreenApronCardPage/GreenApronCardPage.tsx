import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 200'%3E%3Crect fill='%23dc2626' width='400' height='200'/%3E%3Ctext x='200' y='100' text-anchor='middle' fill='white' font-size='20'%3E크리스마스 프로모션%3C/text%3E%3C/svg%3E",
    },
    {
      id: 2,
      title: "따스한 연말 홀리데이 혜택",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 200'%3E%3Crect fill='%23165f3e' width='400' height='200'/%3E%3Ctext x='200' y='100' text-anchor='middle' fill='white' font-size='20'%3E홀리데이 혜택%3C/text%3E%3C/svg%3E",
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
              김**님 외 1명에게 새로운 카드가 도착했어요.
            </Typography>
          </div>
          <div className="green-apron-card-page__notice-action">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <Typography variant="body" size="small" color="muted">
              확인
            </Typography>
          </div>
        </Card>

        {/* 프로모션 카드 (가로 스크롤) */}
        <div className="green-apron-card-page__promo-section">
          <Carousel slides={promoSlides} showNavigation={false} paginationColor="#fff" />
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

