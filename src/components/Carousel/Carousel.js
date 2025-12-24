import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "../Image/Image";
import Loading from "../Loading/Loading";
import "./Carousel.scss";

const defaultSlides = [
  { id: 1, title: "배너 1", desc: "이곳에 주요 메시지를 노출하세요." },
  { id: 2, title: "배너 2", desc: "슬라이드를 넘겨 다양한 정보를 전달합니다." },
  { id: 3, title: "배너 3", desc: "모바일/데스크탑 반응형 지원." },
];

const Carousel = ({ slides = defaultSlides, showOptionsPanel = false }) => {
  if (!slides || slides.length === 0) {
    return <div className="guide-preview guide-preview--carousel">슬라이드 데이터가 없습니다.</div>;
  }

  return (
    <div className="guide-preview guide-preview--carousel">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={16}
        slidesPerView={1}
        loop
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="carousel-card">
              {slide.image && (
                <div className="carousel-card__image">
                  <Image
                    src={slide.image}
                    alt={slide.title || slide.description || "슬라이드 이미지"}
                    className="carousel-card__image-element"
                  />
                </div>
              )}
              {(slide.title || slide.desc || slide.description) && (
                <div className="carousel-card__content">
                  {slide.title && <h4>{slide.title}</h4>}
                  {(slide.desc || slide.description) && <p>{slide.desc || slide.description}</p>}
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
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

