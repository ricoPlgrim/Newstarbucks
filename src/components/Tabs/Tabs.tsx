import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "./Tabs.scss";
import type { ReactNode } from "react";

type TabsType = "default" | "scroll" | "swiper";

type TabItem = {
  id: string;
  label: string;
  description?: ReactNode;
  contentId?: string;
};

type TabsProps = {
  items?: TabItem[];
  type?: TabsType;
  scrollContainerId?: string;
  className?: string;
  showContent?: boolean;

  /** controlled mode */
  activeTabId?: string;
  onChange?: (activeTabId: string) => void;
};

const defaultTabItems: TabItem[] = [
  { id: "detail", label: "상세", description: "상품 이미지, 설명, 원두 정보 등을 제공합니다." },
  { id: "review", label: "리뷰", description: "구매자 후기와 평점을 정렬/필터링하여 보여줍니다." },
  { id: "qa", label: "Q&A", description: "자주 묻는 질문과 답변을 탭 안에서 바로 확인할 수 있습니다." },
];

function Tabs({
  items = defaultTabItems,
  type = "default",
  scrollContainerId,
  onChange,
  className = "",
  showContent = true,
  activeTabId,
}: TabsProps) {
  const [activeTab, setActiveTab] = useState<string>(items[0]?.id ?? "");

  const swiperRef = useRef<any>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const scrollContainerRef = useRef<HTMLElement | null>(null);

  /**
   * scroll 타입일 때 스크롤 컨테이너 요소 찾기 (참조만 보관)
   */
  useEffect(() => {
    if (type === "scroll" && scrollContainerId) {
      scrollContainerRef.current = document.getElementById(scrollContainerId);
    }
  }, [type, scrollContainerId]);

  /**
   * ✅ 외부 제어(activeTabId) 지원 + items 변경 대응
   */
  useEffect(() => {
    const firstId = items[0]?.id ?? "";
    if (!firstId) return;

    if (activeTabId) {
      const exists = items.some((it) => it.id === activeTabId);
      setActiveTab(exists ? activeTabId : firstId);
      return;
    }

    const exists = items.some((it) => it.id === activeTab);
    if (!exists) setActiveTab(firstId);
  }, [items, activeTabId]);

  /**
   * ✅ scroll 타입: activeTab이 바뀔 때도(드롭다운/외부 제어 포함) 스크롤 가운데 정렬 이동
   */
  const scrollToActiveTab = (itemId: string) => {
    if (type !== "scroll") return;
    if (!scrollContainerId) return;

    requestAnimationFrame(() => {
      const targetElement = tabRefs.current[itemId];
      if (!targetElement) return;

      // ⚠️ id 중복을 피하기 위해, Tabs 내부에서 찍은 id(tabs__scroll-container)만 쓰는 걸 권장
      let container: HTMLElement | null = document.getElementById(scrollContainerId);

      // 외부 컨테이너를 찾았다면 내부 tabs__scroll-container를 찾기
      if (container && !container.classList.contains("tabs__scroll-container")) {
        container = container.querySelector(".tabs__scroll-container");
      }

      // 못 찾았으면 주변 DOM에서 tabs__scroll-container 탐색
      if (!container) {
        container =
          targetElement.closest(".tabs--scroll")?.querySelector(".tabs__scroll-container") ?? null;
      }

      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const targetRect = targetElement.getBoundingClientRect();

      const targetScrollLeft = Math.max(
        0,
        container.scrollLeft +
          targetRect.left -
          containerRect.left -
          containerRect.width / 2 +
          targetRect.width / 2
      );

      const startScrollLeft = container.scrollLeft;
      const distance = targetScrollLeft - startScrollLeft;
      const duration = 300;
      const startTime = performance.now();

      const animateScroll = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        container!.scrollLeft = startScrollLeft + distance * easeOutCubic;

        if (progress < 1) requestAnimationFrame(animateScroll);
      };

      requestAnimationFrame(animateScroll);
    });
  };

  useEffect(() => {
    if (type === "scroll" && activeTab) {
      scrollToActiveTab(activeTab);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, activeTab]);

  if (!items || items.length === 0) {
    return <div className="tabs-demo__empty">탭 데이터가 없습니다.</div>;
  }

  const handleTabClick = (itemId: string, index?: number) => {
    setActiveTab(itemId);
    onChange?.(itemId);

    if (type === "scroll") {
      scrollToActiveTab(itemId);
    } else if (type === "swiper" && swiperRef.current) {
      const nextIndex =
        typeof index === "number" ? index : items.findIndex((item) => item.id === itemId);
      if (nextIndex >= 0) swiperRef.current.slideTo(nextIndex, 300);
    }
  };

  const activeItem = items.find((item) => item.id === activeTab);

  // Swiper 타입
  if (type === "swiper") {
    return (
      <div className={`tabs tabs--swiper ${className}`}>
        <div className="tabs__wrapper">
          <Swiper
            modules={[FreeMode]}
            freeMode={{ enabled: true, sticky: false }}
            slidesPerView="auto"
            spaceBetween={8}
            centeredSlides={true}
            centeredSlidesBounds={true}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              const realIndex = swiper.realIndex;
              if (items[realIndex] && activeTab !== items[realIndex].id) {
                setActiveTab(items[realIndex].id);
                onChange?.(items[realIndex].id);
              }
            }}
            className="tabs__swiper"
          >
            {items.map((item, index) => (
              <SwiperSlide key={item.id} className="tabs__slide">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === item.id}
                  onClick={() => handleTabClick(item.id, index)}
                  className={`tabs__button ${activeTab === item.id ? "is-active" : ""}`}
                >
                  {item.label}
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {showContent && activeItem && (
          <div
            className="tabs__tabpanel"
            role="tabpanel"
            aria-live="polite"
            aria-label={`${activeItem.label} 탭 내용`}
          >
            {activeItem.description ?? "내용이 없습니다."}
          </div>
        )}
      </div>
    );
  }

  // Scroll 타입
  if (type === "scroll") {
    return (
      <div className={`tabs tabs--scroll ${className}`}>
        {/* ✅ 이 요소에만 id를 부여하세요. (부모에서 같은 id를 또 주면 document.getElementById가 꼬일 수 있음) */}
        <div className="tabs__scroll-container" id={scrollContainerId || undefined}>
          <div className="tabs__tablist" role="tablist" aria-label="스크롤 탭 메뉴">
            {items.map((item, index) => (
              <button
                key={item.id}
                ref={(el) => {
                  tabRefs.current[item.id] = el;
                }}
                type="button"
                role="tab"
                aria-selected={activeTab === item.id}
                onClick={() => handleTabClick(item.id, index)}
                className={`tabs__button ${activeTab === item.id ? "is-active" : ""}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {showContent && activeItem && (
          <div
            className="tabs__tabpanel"
            role="tabpanel"
            aria-live="polite"
            aria-label={`${activeItem.label} 탭 내용`}
          >
            {activeItem.description ?? "내용이 없습니다."}
          </div>
        )}
      </div>
    );
  }

  // Default 타입
  return (
    <div className={`tabs tabs--default ${className}`}>
      <div className="tabs__tablist" role="tablist" aria-label="콘텐츠 탭 예시">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={activeTab === item.id}
            onClick={() => handleTabClick(item.id)}
            className={`tabs__button ${activeTab === item.id ? "is-active" : ""}`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {showContent && activeItem && (
        <div
          className="tabs__tabpanel"
          role="tabpanel"
          aria-live="polite"
          aria-label={`${activeItem.label} 탭 내용`}
        >
          {activeItem.description ?? "내용이 없습니다."}
        </div>
      )}
    </div>
  );
}

export default Tabs;
