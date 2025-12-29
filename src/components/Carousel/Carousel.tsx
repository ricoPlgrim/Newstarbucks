import { Navigation, Pagination, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import Image from "../Image/Image";
import Typography from "../Typography/Typography";
import "./Carousel.scss";

type CarouselSlide = {
  id: number | string;
  title?: string;
  desc?: string;
  description?: string;
  image?: string;
};

// 기본 슬라이드 데이터
const defaultSlides: CarouselSlide[] = [
  { id: 1, title: "배너 1", desc: "이곳에 주요 메시지를 노출하세요." },
  { id: 2, title: "배너 2", desc: "슬라이드를 넘겨 다양한 정보를 전달합니다." },
  { id: 3, title: "배너 3", desc: "모바일/데스크탑 반응형 지원." },
];

/**
 * Carousel 컴포넌트
 * Swiper를 사용한 캐러셀 슬라이더 컴포넌트
 * 
 * @param {Array} slides - 슬라이드 데이터 배열 [{ id, title, desc, description, image }]
 * @param {boolean} showOptionsPanel - 옵션 패널 표시 여부 (기본값: false)
 * @param {boolean} showNavigation - 좌우 네비게이션 버튼 표시 여부 (기본값: true)
 * @param {string} paginationColor - 페이지네이션 도트 색상 (기본값: 'var(--color-accent)')
 */
type CarouselProps = {
  slides?: CarouselSlide[];
  showOptionsPanel?: boolean;
  showNavigation?: boolean;
  paginationColor?: string;
};

const Carousel = ({ slides = defaultSlides, showOptionsPanel = false, showNavigation = true, paginationColor = "var(--color-accent)" }: CarouselProps) => {
  // 슬라이드 데이터가 없을 때 처리
  if (!slides || slides.length === 0) {
    return <div className="guide-preview guide-preview--carousel">슬라이드 데이터가 없습니다.</div>;
  }

  // 슬라이드가 1개 이하일 때는 스와이퍼 비활성화
  // 2개 이상일 때만 스와이퍼 기능 활성화
  const shouldUseSwiper = slides.length > 1;

  return (
    <div className={`guide-preview guide-preview--carousel ${!shouldUseSwiper ? "no-swiper" : ""}`}>
      {shouldUseSwiper ? (
        // 스와이퍼 활성화: 2개 이상의 슬라이드가 있을 때
        <Swiper
          modules={showNavigation ? [Navigation, Pagination, EffectFade] : [Pagination, EffectFade]}
          navigation={showNavigation}
          pagination={{ clickable: true }}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          spaceBetween={0}
          slidesPerView={1}
          loop
          style={{
            "--swiper-pagination-color": paginationColor,
          } as React.CSSProperties}
        >
          {slides.map((slide, idx) => (
            <SwiperSlide key={slide.id}>
              <div className="carousel-card">
                {/* 슬라이드 이미지 */}
                {slide.image && (
                  <div className="carousel-card__image">
                    <img
                      src={slide.image}
                      alt={slide.title || slide.description || "슬라이드 이미지"}
                      className="carousel-card__image-element"
                      loading={idx === 0 ? "eager" : "lazy"}
                    />
                  </div>
                )}
                {/* 슬라이드 콘텐츠 (제목, 설명) */}
                {(slide.title || slide.desc || slide.description) && (
                  <div className="carousel-card__content">
                    {slide.title && (
                      <Typography variant="h5" size="small">{slide.title}</Typography>
                    )}
                    {(slide.desc || slide.description) && (
                      <Typography variant="body" size="small" color="muted">
                        {slide.desc || slide.description}
                      </Typography>
                    )}
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        // 스와이퍼 비활성화: 1개 이하의 슬라이드일 때 (no-swiper 클래스 적용)
        <div className="carousel-card">
          {/* 단일 슬라이드 이미지 */}
          {slides[0].image && (
            <div className="carousel-card__image">
              <Image
                src={slides[0].image}
                alt={slides[0].title || slides[0].description || "슬라이드 이미지"}
                className="carousel-card__image-element"
              />
            </div>
          )}
          {/* 단일 슬라이드 콘텐츠 */}
          {(slides[0].title || slides[0].desc || slides[0].description) && (
            <div className="carousel-card__content">
              {slides[0].title && (
                <Typography variant="h4" size="small">{slides[0].title}</Typography>
              )}
              {(slides[0].desc || slides[0].description) && (
                <Typography variant="body" size="small" color="muted">
                  {slides[0].desc || slides[0].description}
                </Typography>
              )}
            </div>
          )}
        </div>
      )}
      {/* 옵션 패널 (showOptionsPanel이 true일 때만 표시) */}
      {showOptionsPanel && (
        <div className="carousel-options">
          <h5>사용 옵션</h5>
          <ul>
            <li><strong>modules</strong>: Navigation, Pagination</li>
            <li><strong>navigation</strong>: 좌·우 화살표 노출</li>
            <li><strong>pagination</strong>: bullet + clickable</li>
            <li><strong>spaceBetween</strong>: 슬라이드 간격 16px</li>
            <li><strong>slidesPerView</strong>: 기본 1장, 반응형 조정 가능</li>
            <li><strong>loop</strong>: 마지막 뒤로 순환</li>
          </ul>
          <div className="carousel-options__tip">
            breakpoints로 `slidesPerView`와 `spaceBetween`을 디바이스 폭에 맞춰 조정하세요.
          </div>
        </div>
      )}
    </div>
  );
};

export default Carousel;

