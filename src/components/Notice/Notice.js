import SkeletonPlaceholder from "../Skeleton/SkeletonPlaceholder";
import "./Notice.scss";

const defaultItems = [
  { id: 1, title: "시스템 점검 안내 (1/25 02:00~04:00)", date: "2025-01-23", badge: "안내" },
  { id: 2, title: "개인정보 처리방침 개정 사전 안내", date: "2025-01-20", badge: "중요" },
  { id: 3, title: "겨울 한정 메뉴 출시 안내", date: "2025-01-15" },
];

function Notice({
  title = "공지사항",
  linkText = "더보기",
  items = defaultItems,
  onClickMore,
  loading = false,
  skeletonCount = 3,
}) {
  return (
    <div className="notice">
      <div className="notice__head">
        <h3>{title}</h3>
        <button
          type="button"
          className="notice__more"
          onClick={onClickMore}
          aria-label={`${title} 더보기`}
        >
          {linkText}
        </button>
      </div>

      {loading ? (
        <div className="notice__skeleton">
          {Array.from({ length: skeletonCount }).map((_, idx) => (
            <SkeletonPlaceholder key={idx} withActions lines={2} />
          ))}
        </div>
      ) : (
        <ul className="notice__list">
          {items.map((item) => (
            <li key={item.id} className="notice__item">
              <div className="notice__title">
                {item.badge && <span className="notice__badge">{item.badge}</span>}
                <span>{item.title}</span>
              </div>
              <span className="notice__date">{item.date}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Notice;


