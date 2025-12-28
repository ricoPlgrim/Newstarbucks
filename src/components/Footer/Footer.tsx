import Typography from "../Typography/Typography";
import "./Footer.scss";

// 기본 네비게이션 메뉴 데이터
const defaultNav = [
  { label: "회사소개", href: "#" },
  { label: "개인정보처리방침", href: "#" },
  { label: "FAQ", href: "#" },
  { label: "문의하기", href: "#" },
];

// 기본 회사 정보 데이터
const defaultInfo = {
  address: "서울시 어딘가 123, 스타벅스코리아",
  contact: "고객센터 1234-5678 | support@starbucks.co.kr",
};

// 기본 소셜 미디어 링크 데이터
const defaultSns = ["Instagram", "Facebook", "Youtube"];

/**
 * Footer 컴포넌트
 * 사이트의 공통 하단 영역으로, 회사 정보·고객센터·SNS 링크 등을 담습니다.
 * 
 * @param {Array} nav - 네비게이션 메뉴 배열 [{ label, href }]
 * @param {Object} info - 회사 정보 객체 { address, contact }
 * @param {Array} sns - 소셜 미디어 링크 배열
 * @param {string} logo - 로고 텍스트
 */
function Footer({ nav = defaultNav, info = defaultInfo, sns = defaultSns, logo = "스타벅스" }) {
  return (
    <footer className="footer">
      {/* 상단 영역: 로고 + 네비게이션 메뉴 */}
      <div className="footer__top">
        {/* 로고 */}
        <div className="footer__logo">{logo}</div>
        {/* 네비게이션 메뉴 */}
        <nav className="footer__nav" aria-label="푸터 메뉴">
          {nav.map((item) => (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
      {/* 하단 영역: 회사 정보 + 소셜 링크 */}
      <div className="footer__bottom">
        {/* 회사 정보 영역 */}
        <div className="footer__info">
          {/* 주소 정보 */}
          <Typography variant="body" size="small" color="muted">
            {info.address}
          </Typography>
          {/* 연락처 정보 */}
          <Typography variant="body" size="small" color="muted">
            {info.contact}
          </Typography>
        </div>
        {/* 소셜 미디어 링크 영역 */}
        <div className="footer__sns" aria-label="소셜 링크">
          {sns.map((name) => (
            <span key={name}>{name}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;

