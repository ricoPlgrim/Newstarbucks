import { useState, useEffect, useRef, useCallback } from "react";
import CommonLayout from "../CommonLayout/CommonLayout";
import Loading from "../Loading/Loading";
import "./InfiniteScrollList.scss";

type InfiniteScrollListProps = {
  /** 초기 로드할 아이템 개수 */
  initialLoad?: number;
  /** 한 번에 추가로 로드할 아이템 개수 */
  itemsPerLoad?: number;
  /** 전체 아이템 데이터 */
  items: Array<{
    id: number | string;
    title: string;
    description?: string;
    image?: string;
    [key: string]: any;
  }>;
  /** 아이템 렌더링 함수 */
  renderItem?: (item: any, index: number) => React.ReactNode;
  /** 로딩 중일 때 표시할 컴포넌트 */
  loadingComponent?: React.ReactNode;
  /** 모든 아이템을 로드했을 때 표시할 메시지 */
  endMessage?: string;
  /** 헤더 variant */
  headerVariant?: "main" | "sub";
  /** 헤더 카테고리명 */
  headerCategoryName?: string;
  /** 뒤로가기 핸들러 */
  headerOnBack?: () => void;
  /** 추가 클래스명 */
  className?: string;
};

/**
 * InfiniteScrollList 컴포넌트
 * CommonLayout을 사용하여 인피니티 스크롤 리스트를 제공합니다.
 * 스크롤이 하단에 도달하면 자동으로 더 많은 데이터를 로드합니다.
 */
const InfiniteScrollList = ({
  initialLoad = 10,
  itemsPerLoad = 10,
  items = [],
  renderItem,
  loadingComponent,
  endMessage = "모든 데이터를 불러왔습니다.",
  headerVariant = "sub",
  headerCategoryName = "리스트",
  headerOnBack,
  className = "",
}: InfiniteScrollListProps) => {
  const [visibleItems, setVisibleItems] = useState<number>(initialLoad);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // 더 많은 아이템이 있는지 확인
  useEffect(() => {
    setHasMore(visibleItems < items.length);
  }, [visibleItems, items.length]);

  // 더 많은 데이터 로드
  const handleLoadMore = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    // 시뮬레이션: 실제로는 API 호출
    setTimeout(() => {
      setVisibleItems((prev) => {
        const next = prev + itemsPerLoad;
        return Math.min(next, items.length);
      });
      setIsLoading(false);
    }, 800);
  }, [isLoading, hasMore, itemsPerLoad, items.length]);

  // Intersection Observer를 사용하여 스크롤 감지
  useEffect(() => {
    if (!hasMore || isLoading || !loadMoreRef.current) {
      if (observerRef.current && loadMoreRef.current) {
        observerRef.current.unobserve(loadMoreRef.current);
      }
      return;
    }

    // 스크롤 컨테이너 찾기
    const scrollContainer = scrollContainerRef.current;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore && !isLoading) {
          handleLoadMore();
        }
      },
      {
        root: scrollContainer,
        rootMargin: "100px",
        threshold: 0.1,
      }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current && loadMoreRef.current) {
        observerRef.current.unobserve(loadMoreRef.current);
      }
    };
  }, [hasMore, isLoading, handleLoadMore]);

  // 표시할 아이템들
  const displayedItems = items.slice(0, visibleItems);

  // 기본 아이템 렌더링 함수
  const defaultRenderItem = (item: any, index: number) => (
    <div key={item.id} className="infinite-scroll-list__item">
      <div className="infinite-scroll-list__item-number">{index + 1}</div>
      <div className="infinite-scroll-list__item-content">
        <h4 className="infinite-scroll-list__item-title">{item.title}</h4>
        {item.description && (
          <p className="infinite-scroll-list__item-description">{item.description}</p>
        )}
      </div>
    </div>
  );

  return (
    <CommonLayout
      headerVariant={headerVariant}
      headerCategoryName={headerCategoryName}
      headerOnBack={headerOnBack}
      className={`infinite-scroll-list ${className}`}
    >
      <div ref={scrollContainerRef} className="infinite-scroll-list__scroll-container">
        <div className="infinite-scroll-list__content">
          {displayedItems.length > 0 ? (
            displayedItems.map((item, index) =>
              renderItem ? renderItem(item, index) : defaultRenderItem(item, index)
            )
          ) : (
            <div style={{ padding: "40px", textAlign: "center", color: "var(--muted)" }}>
              데이터가 없습니다.
            </div>
          )}

          {/* 로딩 및 더보기 영역 */}
          {hasMore && displayedItems.length > 0 && (
            <div ref={loadMoreRef} className="infinite-scroll-list__load-more">
              {isLoading && (
                <div className="infinite-scroll-list__loading">
                  {loadingComponent || <Loading size={32} />}
                </div>
              )}
            </div>
          )}
          {!hasMore && displayedItems.length > 0 && (
            <div className="infinite-scroll-list__load-more">
              <div className="infinite-scroll-list__end-message">{endMessage}</div>
            </div>
          )}
        </div>
      </div>
    </CommonLayout>
  );
};

export default InfiniteScrollList;

