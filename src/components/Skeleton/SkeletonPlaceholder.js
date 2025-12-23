import Skeleton from "./Skeleton";
import "./SkeletonPlaceholder.scss";

/**
 * SkeletonPlaceholder
 * 자주 쓰는 스켈레톤 조합을 손쉽게 렌더링할 수 있는 헬퍼 컴포넌트입니다.
 *
 * Props:
 * - lines: 표시할 텍스트 라인 수 (기본값: 3)
 * - withAvatar: 좌측 동그라미 아바타 표시 여부
 * - withActions: 우측 버튼 영역 스켈레톤 표시 여부
 */
function SkeletonPlaceholder({ lines = 3, withAvatar = false, withActions = false }) {
  const safeLines = Math.max(1, lines);

  return (
    <div className="skeleton-placeholder">
      {withAvatar && (
        <div className="skeleton-placeholder__avatar">
          <Skeleton width={40} height={40} circle />
        </div>
      )}

      <div className="skeleton-placeholder__body">
        {Array.from({ length: safeLines }).map((_, idx) => (
          <Skeleton
            key={idx}
            width={`${80 - idx * 8}%`}
            height={14}
            className="skeleton-placeholder__line"
          />
        ))}
      </div>

      {withActions && (
        <div className="skeleton-placeholder__actions">
          <Skeleton width={72} height={32} />
          <Skeleton width={72} height={32} />
        </div>
      )}
    </div>
  );
}

export default SkeletonPlaceholder;

