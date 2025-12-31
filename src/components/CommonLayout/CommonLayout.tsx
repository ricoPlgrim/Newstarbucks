import { ReactNode } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import BottomDock from "../BottomDock/BottomDock";
import ScrollTop from "../ScrollTop/ScrollTop";
import "./CommonLayout.scss";

type CommonLayoutProps = {
  /** 레이아웃 내부에 표시할 컨텐츠 */
  children: ReactNode;
  // Header 관련 props
  /** 헤더 타입: "main" (메인 헤더) 또는 "sub" (서브 헤더) */
  headerVariant?: "main" | "sub";
  /** 서브 헤더에 표시할 카테고리명 */
  headerCategoryName?: string;
  /** 뒤로가기 버튼 클릭 시 실행할 함수 */
  headerOnBack?: () => void;
  /** 헤더 유틸리티 버튼 표시 여부 */
  headerShowUtilities?: boolean;
  /** 헤더 고정 여부 (sticky) */
  headerSticky?: boolean;
  /** 현재 선택된 페이지 */
  headerCurrentPage?: string;
  /** 페이지 변경 시 실행할 함수 */
  headerOnPageChange?: (page: string) => void;
  /** 장바구니 아이콘 클릭 시 실행할 함수 */
  headerOnCartClick?: () => void;
  /** 헤더 유틸리티 버튼 클릭 시 실행할 함수 */
  headerOnUtilityClick?: (key: string) => void;
  /** 알림 개수 (메인 헤더에서 사용) */
  headerNotificationCount?: number;
  /** 알림 클릭 핸들러 (메인 헤더에서 사용) */
  headerOnNotificationClick?: () => void;
  /** 로고 클릭 핸들러 (메인 헤더에서 사용) */
  headerOnLogoClick?: () => void;
  // Footer 관련 props
  /** 푸터 표시 여부 */
  showFooter?: boolean;
  /** 푸터 네비게이션 링크 배열 */
  footerNav?: Array<{ label: string; href: string }>;
  /** 푸터 정보 (주소, 연락처) */
  footerInfo?: { address: string; contact: string };
  /** 푸터 SNS 링크 배열 */
  footerSns?: string[];
  /** 푸터 로고 이미지 경로 */
  footerLogo?: string;
  // BottomDock 관련 props
  /** 하단 도크 표시 여부 */
  showBottomDock?: boolean;
  /** 하단 도크 아이템 배열 */
  bottomDockItems?: Array<{ key: string; label: string; icon: string }>;
  /** 하단 도크 아이템 변경 시 실행할 함수 */
  bottomDockOnChange?: (key: string) => void;
  /** 하단 도크 기본 활성화 아이템 키 */
  bottomDockDefaultActive?: string;
  /** 하단 도크 위치: "fixed" (고정) 또는 "relative" (상대) */
  bottomDockPosition?: "fixed" | "relative";
  // ScrollTop 관련 props
  /** 스크롤 탑 버튼 표시 여부 */
  showScrollTop?: boolean;
  /** 스크롤 탑 버튼이 나타날 스크롤 픽셀 값 */
  scrollTopShowAfter?: number;
  /** 스크롤 탑 버튼 부드러운 스크롤 사용 여부 */
  scrollTopSmooth?: boolean;
  // 커스텀 헤더 (Header 컴포넌트 대신 사용)
  /** 커스텀 헤더 컴포넌트 (Header 컴포넌트 대신 사용) */
  customHeader?: ReactNode;
  // 클래스명
  /** 추가 클래스명 */
  className?: string;
};

/**
 * CommonLayout 컴포넌트
 * 공통 레이아웃을 제공합니다.
 * Header, Content, Footer 구조를 포함합니다.
 */
const CommonLayout = ({
  children,
  // Header props
  headerVariant = "sub",
  headerCategoryName,
  headerOnBack,
  headerShowUtilities = false,
  headerSticky = true,
  headerCurrentPage,
  headerOnPageChange,
  headerOnCartClick,
  headerOnUtilityClick,
  headerNotificationCount,
  headerOnNotificationClick,
  headerOnLogoClick,
  // Footer props
  showFooter = false,
  footerNav,
  footerInfo,
  footerSns,
  footerLogo,
  // BottomDock props
  showBottomDock = false,
  bottomDockItems,
  bottomDockOnChange,
  bottomDockDefaultActive = "home",
  bottomDockPosition = "fixed",
  // ScrollTop props
  showScrollTop = false,
  scrollTopShowAfter = 100,
  scrollTopSmooth = true,
  // Custom
  customHeader,
  className = "",
}: CommonLayoutProps) => {
  return (
    <div className={`common-layout ${className}`.trim()}>
      {/* Header 영역 */}
      {customHeader ? (
        customHeader
      ) : (
        headerVariant && (
          <Header
            variant={headerVariant}
            categoryName={headerCategoryName}
            onBack={headerOnBack}
            showUtilities={headerShowUtilities}
            sticky={headerSticky}
            currentPage={headerCurrentPage}
            onPageChange={headerOnPageChange}
            onCartClick={headerOnCartClick}
            onUtilityClick={headerOnUtilityClick}
            notificationCount={headerNotificationCount}
            onNotificationClick={headerOnNotificationClick}
            onLogoClick={headerOnLogoClick}
          />
        )
      )}

      {/* Content 영역 */}
      <main className="common-layout__content">{children}</main>

      {/* Footer 영역 */}
      {showFooter && (
        <Footer nav={footerNav} info={footerInfo} sns={footerSns} logo={footerLogo} />
      )}

      {/* BottomDock 영역 */}
      {showBottomDock && (
        <BottomDock
          items={bottomDockItems}
          onChange={bottomDockOnChange}
          defaultActive={bottomDockDefaultActive}
          position={bottomDockPosition}
        />
      )}

      {/* ScrollTop 영역 */}
      {showScrollTop && (
        <ScrollTop showAfter={scrollTopShowAfter} smooth={scrollTopSmooth} />
      )}
    </div>
  );
};

export default CommonLayout;

