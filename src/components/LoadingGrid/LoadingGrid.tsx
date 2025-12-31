import Skeleton from "../Skeleton/Skeleton";
import "./LoadingGrid.scss";

function LoadingGrid({ count = 12, columns = 5, className = "" }) {
  const items = Array.from({ length: count });

  return (
    <div
      className={`loading-grid ${className}`.trim()}
      data-columns={columns}
    >
      {items.map((_, idx) => (
        <div key={idx} className="loading-grid__card">
          <div className="loading-grid__thumb">
            <Skeleton
              width="100%"
              height="100%"
              style={{ borderRadius: 12, display: "block" }}
            />
          </div>
          <div className="loading-grid__lines">
            <Skeleton width="80%" height={12} style={{ display: "block" }} />
            <Skeleton width="70%" height={10} style={{ display: "block" }} />
            <Skeleton width="60%" height={10} style={{ display: "block" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default LoadingGrid;
