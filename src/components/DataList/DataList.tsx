import { useEffect, useState } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import Loading from "../Loading/Loading";
import ErrorState from "../ErrorState/ErrorState";
import EmptyState from "../EmptyState/EmptyState";
import "./DataList.scss";

/**
 * DataList 컴포넌트
 * 목업 API를 통해 데이터를 가져와서 리스트 형태로 표시하는 범용 컴포넌트
 * 
 * @param {Function} fetchData - 데이터를 가져오는 비동기 함수 (Promise 반환)
 * @param {Function} renderItem - 각 아이템을 렌더링하는 함수 (item, index) => ReactNode
 * @param {Function} renderEmpty - 데이터가 없을 때 렌더링하는 함수 (선택, 기본 EmptyState 사용)
 * @param {Function} renderError - 에러 발생 시 렌더링하는 함수 (선택, 기본 ErrorState 사용)
 * @param {Function} renderLoading - 로딩 중 렌더링하는 함수 (선택, 기본 Loading 사용)
 * @param {string} emptyMessage - 데이터가 없을 때 표시할 메시지 (기본값: "데이터가 없습니다.")
 * @param {string} errorMessage - 에러 발생 시 표시할 메시지 (기본값: "데이터를 불러오지 못했습니다.")
 * @param {string} loadingLabel - 로딩 중 표시할 메시지 (기본값: "데이터를 불러오는 중...")
 * @param {string} className - 추가 클래스명
 * @param {Object} containerProps - 컨테이너 div에 전달할 추가 props
 */
type DataListProps<T = any> = {
  fetchData?: () => Promise<T[] | T>;
  renderItem?: (item: T, index: number) => ReactNode;
  renderEmpty?: () => ReactNode;
  renderError?: (error: any) => ReactNode;
  renderLoading?: () => ReactNode;
  emptyMessage?: string;
  errorMessage?: string;
  loadingLabel?: string;
  className?: string;
  containerProps?: HTMLAttributes<HTMLDivElement>;
};

function DataList<T = any>({
  fetchData,
  renderItem,
  renderEmpty,
  renderError,
  renderLoading,
  emptyMessage = "데이터가 없습니다.",
  errorMessage = "데이터를 불러오지 못했습니다.",
  loadingLabel = "데이터를 불러오는 중...",
  className = "",
  containerProps = {},
}: DataListProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!fetchData) {
      setIsLoading(false);
      return;
    }

    const load = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await fetchData();
        // 배열이 아닌 경우 배열로 변환
        const dataArray = Array.isArray(result) ? result : [result];
        setData(dataArray);
      } catch (err) {
        console.error("데이터 로드 실패:", err);
        setError((err as any)?.message || errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [fetchData, errorMessage]);

  // 로딩 상태
  if (isLoading) {
    if (renderLoading) {
      return renderLoading();
    }
    return (
      <div className={`data-list data-list--loading ${className}`} {...containerProps}>
        <Loading size={48} label={loadingLabel} />
      </div>
    );
  }

  // 에러 상태
  if (error) {
    if (renderError) {
      return renderError(error);
    }
    return (
      <div className={`data-list data-list--error ${className}`} {...containerProps}>
        <ErrorState type="error" message={error} />
      </div>
    );
  }

  // 데이터가 없는 경우
  if (!data || data.length === 0) {
    if (renderEmpty) {
      return renderEmpty();
    }
    return (
      <div className={`data-list data-list--empty ${className}`} {...containerProps}>
        <EmptyState message={emptyMessage} />
      </div>
    );
  }

  // 데이터 렌더링
  return (
    <div className={`data-list ${className}`} {...containerProps}>
      {data.map((item, index) => {
        const itemKey = (item as any)?.id ?? (item as any)?.key ?? index;
        return (
          <div key={itemKey} className="data-list__item">
            {renderItem?.(item, index)}
          </div>
        );
      })}
    </div>
  );
}

export default DataList;

