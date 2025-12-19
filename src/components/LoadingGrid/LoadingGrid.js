import Skeleton from "../Skeleton/Skeleton";
import "./LoadingGrid.scss";

function LoadingGrid({ count = 12, columns = 5, className = "" }) {
  const items = Array.from({ length: count });

  return (
    <div className={`loading-grid ${className}`.trim()} data-columns={columns}>
      {items.map((_, idx) => (
        <div key={idx} className="loading-grid__card">
          <Skeleton
            className="loading-grid__thumb"
            width="100%"
            height={110}
            style={{ borderRadius: 12 }}
          />
          <div className="loading-grid__lines">
            <Skeleton width="80%" height={12} />
            <Skeleton width="70%" height={10} />
            <Skeleton width="60%" height={10} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default LoadingGrid;
