import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "./Tabs.scss";

const defaultTabItems = [
  { id: "detail", label: "상세", description: "상품 이미지, 설명, 원두 정보 등을 제공합니다." },
  { id: "review", label: "리뷰", description: "구매자 후기와 평점을 정렬/필터링하여 보여줍니다." },
  { id: "qa", label: "Q&A", description: "자주 묻는 질문과 답변을 탭 안에서 바로 확인할 수 있습니다." },
];

/**
 * Tabs 컴포넌트
 * @param {Array} items - 탭 아이템 배열 [{ id, label, description, contentId? }]
 * @param {string} type - 'default' | 'scroll' | 'swiper' (기본값: 'default')
 * @param {string} scrollContainerId - 스크롤 컨테이너 ID (type이 'scroll'일 때 사용)
 * @param {function} onChange - 탭 변경 핸들러 (activeTabId) => void
 * @param {string} className - 추가 클래스명
 */
function Tabs({
  items = defaultTabItems,
  type = "default",
  scrollContainerId,
  onChange,
  className = "",
}) {
  // 현재 활성화된 탭 ID 상태
  const [activeTab, setActiveTab] = useState(items[0]?.id);
  // Swiper 인스턴스 참조 (swiper 타입일 때 사용)
  const swiperRef = useRef(null);
  // 각 탭 버튼의 DOM 참조 (scroll 타입일 때 스크롤 위치 계산용)
  const tabRefs = useRef({});
  // 스크롤 컨테이너 참조 (scroll 타입일 때 사용)
  const scrollContainerRef = useRef(null);

  /**
   * items 배열이 변경되면 첫 번째 탭으로 초기화
   */
  useEffect(() => {
    // 새로운 데이터가 들어오면 첫 번째 탭으로 초기화
    setActiveTab(items[0]?.id);
  }, [items]);

  /**
   * scroll 타입일 때 스크롤 컨테이너 요소 찾기
   */
  useEffect(() => {
    // scrollContainerId가 있으면 해당 요소 찾기
    if (type === "scroll" && scrollContainerId) {
      scrollContainerRef.current = document.getElementById(scrollContainerId);
    }
  }, [type, scrollContainerId]);

  if (!items || items.length === 0) {
    return <div className="tabs-demo__empty">탭 데이터가 없습니다.</div>;
  }

  /**
   * 탭 클릭 이벤트 핸들러
   * 탭 버튼 클릭 시 호출됨
   * @param {string} itemId - 클릭된 탭의 ID
   * @param {number} index - 클릭된 탭의 인덱스 (swiper 타입에서 사용)
   */
  const handleTabClick = (itemId, index) => {
    // 상태를 먼저 업데이트하여 active 클래스가 즉시 적용되도록 함
    setActiveTab(itemId);
    // 외부 onChange 핸들러 호출
    onChange?.(itemId);

    if (type === "scroll") {
      // Scroll 타입: 부모 스크롤바를 이용한 가운데 정렬 이동
      const targetElement = tabRefs.current[itemId];
      if (targetElement && scrollContainerId) {
        const container = document.getElementById(scrollContainerId);
        if (container) {
          // 컨테이너와 타겟 요소의 위치 정보 가져오기
          const containerRect = container.getBoundingClientRect();
          const targetRect = targetElement.getBoundingClientRect();
          // 가운데 정렬을 위한 스크롤 위치 계산
          // (타겟 요소가 컨테이너 중앙에 오도록 스크롤 위치 계산)
          const scrollLeft = container.scrollLeft + targetRect.left - containerRect.left - (containerRect.width / 2) + (targetRect.width / 2);
          
          // 부드러운 스크롤 애니메이션으로 이동
          container.scrollTo({
            left: scrollLeft,
            behavior: "smooth",
          });
        }
      }
    } else if (type === "swiper" && swiperRef.current) {
      // Swiper 타입: Swiper를 이용한 가운데 정렬
      // slideTo 전에 상태를 업데이트했으므로 active 클래스가 즉시 적용됨
      // 300ms 애니메이션으로 해당 슬라이드로 이동
      swiperRef.current.slideTo(index, 300);
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
            freeMode={{
              enabled: true,
              sticky: false,
            }}
            slidesPerView="auto"
            spaceBetween={8}
            centeredSlides={true}
            centeredSlidesBounds={true}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              // Swiper 슬라이드 변경 시 activeTab 업데이트 (스와이프 제스처로 변경된 경우)
              // realIndex를 사용하여 실제 슬라이드 인덱스 가져오기 (loop 모드에서도 정확한 인덱스)
              const realIndex = swiper.realIndex;
              // 인덱스가 유효하고 현재 activeTab과 다르면 업데이트
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
        {activeItem && (
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
        <div className="tabs__scroll-container" id={scrollContainerId || undefined}>
          <div className="tabs__tablist" role="tablist" aria-label="스크롤 탭 메뉴">
            {items.map((item, index) => (
              <button
                key={item.id}
                ref={(el) => (tabRefs.current[item.id] = el)}
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
        {activeItem && (
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

  // Default 타입 (기존 방식)
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
      {activeItem && (
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

