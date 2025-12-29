import { useState } from "react";
import React from "react";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import Badge from "../../components/Badge/Badge";
import Typography from "../../components/Typography/Typography";
import Notice from "../../components/Notice/Notice";
import Icon from "../../components/Icon/Icon";
import Carousel from "../../components/Carousel/Carousel";
import BorderAnimation from "../../components/BorderAnimation/BorderAnimation";
import { BottomSheetPopup } from "../../components/Popup/Popup";
import christmasPromo1 from "../../assets/images/christmas-promo-1.jpg";
import "./MobileOfficeHomePage.scss";

const MobileOfficeHomePage = () => {
  const [notificationCount] = useState(3);
  const [hideNotice, setHideNotice] = useState(false);
  const [isBottomPopupOpen, setIsBottomPopupOpen] = useState(false);

  // 3x3 그리드 메뉴 데이터
  const menuItems = [
    { id: 1, icon: "✏️", label: "편집" },
    { id: 2, icon: "🔧", label: "수선요청서 작성" },
    { id: 3, icon: "👔", label: "카드보내기" },
    { id: 4, icon: "📊", label: "진행현황" },
    { id: 5, icon: "📅", label: "장비점검 일정관리" },
    { id: 6, icon: "📞", label: "지원센터<br />접수" },
    { id: 7, icon: "📋", label: "유지보수 이력조회" },
    { id: 8, icon: "📨", label: "받은카드" },
    { id: 9, icon: "📨", label: "받은카드" },
  ];

  // 문자열의 <br /> 태그를 실제 줄바꿈으로 변환하는 함수
  const renderLabelWithBreaks = (label: string) => {
    const parts = label.split(/<br\s*\/?>/i);
    if (parts.length === 1) {
      return label;
    }
    return parts.map((part, index) => (
      <React.Fragment key={index}>
        {part}
        {index < parts.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  // 공지사항 데이터
  const noticeData = {
    title: "[공지]유지보수 시스템 점검안내",
    content: "9월 25일 AM 6:00 ~ AM 9:00 서비스 업그레이드 예정",
    hideText: "오늘 하루 보지않기",
  };

  // 프로모션 슬라이드 데이터
  const promoSlides = [
    { 
      id: 1, 
      title: "크리스마스를 기다리는 설레임",
      image: christmasPromo1
    },
    { 
      id: 2, 
      title: "크리스마스를 기다리는 설레임",
      image: christmasPromo1
    },
    { 
      id: 3, 
      title: "크리스마스를 기다리는 설레임",
      image: christmasPromo1
    },
  ];

  return (
    <div className="mobile-office-home">
      {/* 커스텀 헤더 (MOBILE OFFICE + 알림) */}
      <div className="mobile-office-home__custom-header">
        {/* 햄버거 메뉴 */}
        <button
          className="mobile-office-home__hamburger"
          onClick={() => console.log("메뉴 열기")}
          aria-label="메뉴 열기"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <button
          className="mobile-office-home__logo-section"
          onClick={() => setIsBottomPopupOpen(true)}
          aria-label="MOBILE OFFICE 메뉴 열기"
        >
          <div className="mobile-office-home__logo">스타벅스</div>
          <div className="mobile-office-home__title">
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
        <button
          className="mobile-office-home__notification"
          onClick={() => console.log("알림 클릭")}
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
            <span className="mobile-office-home__notification-badge">{notificationCount}</span>
          )}
        </button>
      </div>

      {/* 환영 배너 */}
      <div className="mobile-office-home__welcome-banner">
        <Typography variant="body" size="medium" weight="medium" align="center">
          [숭례문타워점]셀리님 안녕하세요! 😊💚
        </Typography>
      </div>

      {/* 3x3 그리드 메뉴 */}
      <div className="mobile-office-home__menu-grid">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className="mobile-office-home__menu-item"
            onClick={() => console.log(`${item.label} 클릭`)}
          >
            <div className="mobile-office-home__menu-icon">{item.icon}</div>
            <div className="mobile-office-home__menu-label">
              {renderLabelWithBreaks(item.label)}
            </div>
          </button>
        ))}
      </div>

      {/* 공지사항 카드 */}
      {!hideNotice && (
        <BorderAnimation variant="rotate" className="mobile-office-home__notice-wrapper">
          <div className="mobile-office-home__notice-card">
            <button
              className="mobile-office-home__notice-close"
              onClick={() => setHideNotice(true)}
              aria-label="공지사항 닫기"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="mobile-office-home__notice-header">
              <Typography variant="h5" size="small" weight="bold" className="mobile-office-home__notice-title">
                {noticeData.title}
              </Typography>
            </div>
            <Typography variant="body" size="small" className="mobile-office-home__notice-content">
              {noticeData.content}
            </Typography>
            <button
              className="mobile-office-home__notice-hide"
              onClick={() => setHideNotice(true)}
            >
              {noticeData.hideText}
            </button>
          </div>
        </BorderAnimation>
      )}

      {/* 정보 카드 섹션 */}
      <div className="mobile-office-home__info-cards">
        {/* 왼쪽 컬럼: 날씨 카드 + 이용안내 카드 */}
        <div className="mobile-office-home__info-cards-left">
          {/* 날씨 카드 */}
          <Card variant="content" className="mobile-office-home__weather-card">
            <div className="mobile-office-home__weather-content">
              <div className="mobile-office-home__weather-top">
                <div className="mobile-office-home__weather-icon">☀️</div>
                <Typography variant="h4" size="medium" weight="bold" className="mobile-office-home__weather-temp">
                  20°
                </Typography>
              </div>
              <Typography variant="body" size="small" color="muted" className="mobile-office-home__weather-text">
                일부 맑음
              </Typography>
            </div>
          </Card>

          {/* 이용안내 카드 */}
          <Card variant="content" className="mobile-office-home__guide-card">
            <div className="mobile-office-home__guide-content">
              <Typography variant="h4" size="small" weight="bold" className="mobile-office-home__guide-logo">
                STARBUCKS
              </Typography>
              <Typography variant="body" size="small">
                모바일오피스 이용안내
              </Typography>
            </div>
          </Card>
        </div>

        {/* 오른쪽 컬럼: 프로모션 카드 (스와이퍼 영역) */}
        <div className="mobile-office-home__info-cards-right">
          <Card variant="content" className="mobile-office-home__promo-card">
            <Carousel slides={promoSlides} showNavigation={false} paginationColor="#fff" />
          </Card>
        </div>
      </div>

      {/* 하단 네비게이션 */}
      <nav className="mobile-office-home__bottom-nav">
        <button className="mobile-office-home__nav-item">
          <Icon name="maintenance" size="medium">🔧</Icon>
          <Typography variant="caption" size="small">유지보수</Typography>
        </button>
        <button className="mobile-office-home__nav-item mobile-office-home__nav-item--active">
          <div className="mobile-office-home__nav-icon-wrapper">
            <Icon name="home" size="medium">🏠</Icon>
          </div>
          <Typography variant="caption" size="small">홈</Typography>
        </button>
        <button className="mobile-office-home__nav-item">
          <Icon name="green-apron" size="medium">👔</Icon>
          <Typography variant="caption" size="small">그린에이프런</Typography>
        </button>
      </nav>

      {/* 바텀 팝업 */}
      <BottomSheetPopup
        open={isBottomPopupOpen}
        onClose={() => setIsBottomPopupOpen(false)}
        className="custom-bottom-sheet" 
        options={[
          {
            icon: "🔧",
            label: "Maintenance App",
            onClick: () => console.log("Maintenance App 클릭"),
          },
          {
            icon: "👔",
            label: "Green Apron Card",
            onClick: () => console.log("Green Apron Card 클릭"),
          },
        ]}
      />
    </div>
  );
};

export default MobileOfficeHomePage;
