import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonLayout from "../../components/CommonLayout/CommonLayout";
import Header from "../../components/Header/Header";
import Card from "../../components/Card/Card";
import Badge from "../../components/Badge/Badge";
import Typography from "../../components/Typography/Typography";
import StepProgress from "../../components/StepProgress/StepProgress";
import "./MaintenancePage.scss";

// 임시 로고 이미지 (실제로는 assets에서 가져와야 함)
const loginLogo = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23fff' d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z'/%3E%3C/svg%3E";

const MaintenancePage = () => {
  const navigate = useNavigate();
  const [notificationCount] = useState(3);
  const [currentPage, setCurrentPage] = useState(0);

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

  // 대시보드 카드 데이터
  const dashboardCards = [
    {
      id: 1,
      icon: "📄",
      label: "수선요청서 작성",
      count: null,
    },
    {
      id: 2,
      icon: "🔧",
      label: "진행현황",
      count: 2,
    },
    {
      id: 3,
      icon: "💻",
      label: "확인요청",
      count: 14,
    },
  ];

  // 수선 요청 카드 데이터
  const maintenanceRequests = [
    {
      id: 1,
      title: "[수선] 가구(전시선반)조명관련",
      tags: ["긴급", "재요청"],
      status: "공사(수선)완료/청구금액저장",
      invoiceAmount: "55,000원",
      steps: [
        { label: "수선요청" },
        { label: "업체접수" },
        { label: "수선완료", subLabel: "청구" },
        { label: "확인완료", subLabel: "전표발행" },
      ],
      currentStep: 2,
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
          titleText="MAINTENANCE APP"
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
              icon: "👔",
              label: "Green Apron Card",
              onClick: () => {
                console.log("Green Apron Card 클릭");
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
      bottomDockDefaultActive="maintenance"
    >
      <div className="maintenance-page">
        {/* 위치 및 인사 배너 */}
        <div className="maintenance-page__banner">
          <div className="maintenance-page__location">
            <Typography variant="body" size="medium" weight="medium">
              여의도IFC몰(L2)STREET
            </Typography>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="maintenance-page__separator"></div>
          <div className="maintenance-page__greeting">
            <span className="maintenance-page__greeting-emoji">😊</span>
            <Typography variant="body" size="medium" weight="medium">
              셀리님 안녕하세요!
            </Typography>
          </div>
        </div>

        {/* 대시보드 상태 카드 */}
        <Card variant="content" className="maintenance-page__dashboard">
          {dashboardCards.map((card) => (
            <div key={card.id} className="maintenance-page__dashboard-item">
              <div className="maintenance-page__dashboard-icon">{card.icon}</div>
              <Typography variant="body" size="small" className="maintenance-page__dashboard-label">
                {card.label}
              </Typography>
              {card.count !== null && (
                <Typography variant="body" size="small" className="maintenance-page__dashboard-count">
                  {card.count}건
                </Typography>
              )}
            </div>
          ))}
        </Card>

        {/* 사용 가능 금액 섹션 */}
        <Card variant="content" className="maintenance-page__amount-card">
          <div className="maintenance-page__amount-content">
            <div className="maintenance-page__amount-left">
              <Typography variant="body" size="medium" weight="medium">
                사용 가능 금액
              </Typography>
              <Typography variant="body" size="small" color="muted">
                (연간 사용 가능 금액 - 전월까지 사용한 금액)
              </Typography>
            </div>
            <div className="maintenance-page__amount-right">
              <Typography variant="h3" size="medium" weight="bold" className="maintenance-page__amount-value">
                623,000원
              </Typography>
            </div>
          </div>
        </Card>

        {/* 수선 요청 상세 카드 */}
        {maintenanceRequests.map((request) => (
          <Card key={request.id} variant="content" className="maintenance-page__request-card">
            <div className="maintenance-page__request-header">
              <Typography variant="h4" size="medium" weight="bold" className="maintenance-page__request-title">
                {request.title}
              </Typography>
              <div className="maintenance-page__request-tags">
                {request.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant={tag === "긴급" ? "danger" : "success"}
                    size="small"
                    className="maintenance-page__request-tag"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="maintenance-page__request-details">
              <div className="maintenance-page__request-detail-row">
                <Typography variant="body" size="small" color="muted">
                  상태
                </Typography>
                <Typography variant="body" size="small" weight="medium">
                  {request.status}
                </Typography>
              </div>
              <div className="maintenance-page__request-detail-row">
                <Typography variant="body" size="small" color="muted">
                  청구금액
                </Typography>
                <Typography variant="body" size="small" weight="bold" className="maintenance-page__request-amount">
                  {request.invoiceAmount}
                </Typography>
              </div>
            </div>

            {/* StepProgress 컴포넌트 */}
            <div className="maintenance-page__progress">
              <StepProgress
                steps={request.steps}
                current={request.currentStep}
                currentIcon={<img src={loginLogo} alt="Starbucks" style={{ width: "100%", height: "100%" }} />}
                showTicks={true}
                tickCount={20}
              />
            </div>

            {/* 페이지네이션 도트 */}
            <div className="maintenance-page__pagination">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  className={`maintenance-page__pagination-dot ${
                    index === currentPage ? "maintenance-page__pagination-dot--active" : ""
                  }`}
                  onClick={() => setCurrentPage(index)}
                  aria-label={`페이지 ${index + 1}`}
                />
              ))}
            </div>
          </Card>
        ))}

        {/* 추가 메뉴 섹션 */}
        <div className="maintenance-page__menu-section">
          {/* 왼쪽 컬럼 */}
          <div className="maintenance-page__menu-left">
            {/* 완료내역 카드 */}
            <Card variant="content" className="maintenance-page__menu-card">
              <div className="maintenance-page__menu-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="4" y="4" width="16" height="12" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                  <rect x="6" y="7" width="12" height="8" rx="0.5" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M9 11L11 13L15 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <Typography variant="body" size="medium" weight="bold">
                완료내역
              </Typography>
            </Card>

            {/* 지역수선증빙 카드 */}
            <Card variant="content" className="maintenance-page__menu-card">
              <div className="maintenance-page__menu-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <Typography variant="body" size="medium" weight="bold">
                지역수선증빙
              </Typography>
            </Card>
          </div>

          {/* 오른쪽 컬럼 */}
          <Card variant="content" className="maintenance-page__menu-right-card">
            {/* 장비점검 일정관리 */}
            <div className="maintenance-page__menu-item">
              <div className="maintenance-page__menu-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* 클립보드 */}
                  <rect x="6" y="4" width="12" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M9 4V3C9 2.44772 9.44772 2 10 2H14C14.5523 2 15 2.44772 15 3V4" stroke="currentColor" strokeWidth="1.5"/>
                  {/* 체크리스트 */}
                  <circle cx="9" cy="9" r="1" fill="currentColor"/>
                  <path d="M12 9L14 11L18 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="9" cy="13" r="1" fill="currentColor"/>
                  <path d="M12 13L14 15L18 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  {/* 손가락 포인터 */}
                  <path d="M16 6L18 4M18 4L20 6M18 4L20 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <Typography variant="body" size="medium" weight="bold">
                장비점검 일정관리
              </Typography>
            </div>

            {/* 구분선 */}
            <div className="maintenance-page__menu-divider"></div>

            {/* 세척 일정관리 */}
            <div className="maintenance-page__menu-item">
              <div className="maintenance-page__menu-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* 클립보드 */}
                  <rect x="5" y="4" width="10" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M8 4V3C8 2.44772 8.44772 2 9 2H11C11.5523 2 12 2.44772 12 3V4" stroke="currentColor" strokeWidth="1.5"/>
                  {/* 체크리스트 */}
                  <circle cx="7" cy="8" r="0.8" fill="currentColor"/>
                  <path d="M9.5 8L11 9.5L14 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="7" cy="11" r="0.8" fill="currentColor"/>
                  <path d="M9.5 11L11 12.5L14 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  {/* 휴지통 */}
                  <rect x="16" y="6" width="4" height="5" rx="0.5" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M15 6H21M17 6V5C17 4.44772 17.4477 4 18 4H18.5C19.0523 4 19.5 4.44772 19.5 5V6" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M16 9V15M18 9V15M20 9V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <Typography variant="body" size="medium" weight="bold">
                세척 일정관리
              </Typography>
            </div>
          </Card>
        </div>
      </div>
    </CommonLayout>
  );
};

export default MaintenancePage;

