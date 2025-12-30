import { ReactNode } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import BottomDock from "../BottomDock/BottomDock";
import "./CommonLayout.scss";

type CommonLayoutProps = {
  children: ReactNode;
  // Header 관련 props
  headerVariant?: "main" | "sub";
  headerCategoryName?: string;
  headerOnBack?: () => void;
  headerShowUtilities?: boolean;
  headerSticky?: boolean;
  headerCurrentPage?: string;
  headerOnPageChange?: (page: string) => void;
  headerOnCartClick?: () => void;
  headerOnUtilityClick?: (key: string) => void;
  // Footer 관련 props
  showFooter?: boolean;
  footerNav?: Array<{ label: string; href: string }>;
  footerInfo?: { address: string; contact: string };
  footerSns?: string[];
  footerLogo?: string;
  // BottomDock 관련 props
  showBottomDock?: boolean;
  bottomDockItems?: Array<{ key: string; label: string; icon: string }>;
  bottomDockOnChange?: (key: string) => void;
  bottomDockDefaultActive?: string;
  // 커스텀 헤더 (Header 컴포넌트 대신 사용)
  customHeader?: ReactNode;
  // 클래스명
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
        />
      )}
    </div>
  );
};

export default CommonLayout;

