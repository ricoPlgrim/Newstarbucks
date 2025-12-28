import SkeletonPlaceholder from "../Skeleton/SkeletonPlaceholder";
import Typography from "../Typography/Typography";
import Button from "../Button/Button";
import "./Notice.scss";

// 기본 공지사항 아이템 데이터
type NoticeItem = {
  id: number | string;
  title: string;
  date: string;
  badge?: string;
  href?: string;
};

type NoticeProps = {
  title?: string;
  linkText?: string;
  items?: NoticeItem[];
  onClickMore?: () => void;
  loading?: boolean;
  skeletonCount?: number;
};

const defaultItems: NoticeItem[] = [
  { id: 1, title: "시스템 점검 안내 (1/25 02:00~04:00)", date: "2025-01-23", badge: "안내", href: "#" },
  { id: 2, title: "개인정보 처리방침 개정 사전 안내", date: "2025-01-20", badge: "중요", href: "#" },
  { id: 3, title: "겨울 한정 메뉴 출시 안내", date: "2025-01-15", href: "#" },
];

/**
 * Notice 컴포넌트
 * 공지사항 목록을 표시하는 컴포넌트
 * 
 * @param {string} title - 공지사항 제목 (기본값: "공지사항")
 * @param {string} linkText - 더보기 버튼 텍스트 (기본값: "더보기")
 * @param {Array} items - 공지사항 아이템 배열 [{ id, title, date, badge, href }]
 * @param {function} onClickMore - 더보기 버튼 클릭 핸들러
 * @param {boolean} loading - 로딩 상태 (기본값: false)
 * @param {number} skeletonCount - 로딩 시 표시할 스켈레톤 개수 (기본값: 3)
 */
function Notice({
  title = "공지사항",
  linkText = "더보기",
  items = defaultItems,
  onClickMore = () => {},
  loading = false,
  skeletonCount = 3,
}: NoticeProps) {
  return (
    <div className="notice">
      {/* 헤더 영역: 제목 + 더보기 버튼 */}
      <div className="notice__head">
        {/* 공지사항 제목 */}
        <Typography variant="h3" size="small">{title}</Typography>
        {/* 더보기 버튼 */}
        <Button
          variant="ghost"
          size="small"
          className="notice__more"
          onClick={onClickMore}
          aria-label={`${title} 더보기`}
        >
          {linkText}
        </Button>
      </div>

      {/* 로딩 상태: 스켈레톤 표시 */}
      {loading ? (
        <div className="notice__skeleton">
          {Array.from({ length: skeletonCount }).map((_, idx) => (
            <SkeletonPlaceholder key={idx} withActions lines={2} />
          ))}
        </div>
      ) : (
        // 공지사항 목록
        <ul className="notice__list">
          {items.map((item) => (
            <li key={item.id} className="notice__item">
              <a href={item.href || "#"} className="notice__item-link">
                {/* 공지사항 제목 영역 (뱃지 + 제목) */}
                <div className="notice__title">
                  {item.badge && <span className="notice__badge">{item.badge}</span>}
                  <span>{item.title}</span>
                </div>
                {/* 공지사항 날짜 */}
                <span className="notice__date">{item.date}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Notice;


