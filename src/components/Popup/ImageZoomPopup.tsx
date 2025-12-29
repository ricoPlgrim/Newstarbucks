import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Zoom } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "../Image/Image";
import Loading from "../Loading/Loading";
import Typography from "../Typography/Typography";
import "./Popup.scss";

type ImageZoomPopupProps = {
  images: string | string[];
  alt?: string | string[];
  initialIndex?: number;
  open: boolean;
  onClose: () => void;
  headerAlign?: "left" | "center";
};

/**
 * ImageZoomPopup 컴포넌트
 * 이미지를 스와이퍼로 보여주고 각 이미지에 커스텀 줌 기능을 제공하는 풀스크린 팝업 컴포넌트
 * 핀치 줌, 더블 탭 줌, 마우스 휠 줌 지원
 * 
 * @param {string|string[]} images - 이미지 URL 또는 이미지 URL 배열
 * @param {string|string[]} alt - 이미지 대체 텍스트 또는 배열 (기본값: "Zoom image")
 * @param {number} initialIndex - 초기 표시할 이미지 인덱스 (기본값: 0)
 * @param {boolean} open - 팝업 열림/닫힘 상태
 * @param {function} onClose - 팝업 닫기 핸들러
 */
const ImageZoomPopup = ({ 
  images, 
  alt = "Zoom image", 
  initialIndex = 0,
  open, 
  onClose,
  headerAlign = "center",
}: ImageZoomPopupProps) => {
  const swiperRef = useRef<any>(null);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [imageList, setImageList] = useState<string[]>([]);
  const [isZoomed, setIsZoomed] = useState(false);

  // props로 받은 images를 동적으로 state로 반영
  useEffect(() => {
    const next = Array.isArray(images) ? images : images ? [images] : [];
    setImageList(next);
    // 이미지 소스가 바뀌면 인덱스와 로딩 상태 리셋
    setCurrentIndex(Math.min(initialIndex, Math.max(next.length - 1, 0)));
    const loading: { [key: number]: boolean } = {};
    next.forEach((_, idx) => {
      loading[idx] = true;
    });
    setIsLoading(loading);
  }, [images, initialIndex]);

  const altArray = Array.isArray(alt) ? alt : imageList.map((_, idx) => 
    typeof alt === 'string' ? `${alt} ${idx + 1}` : `Zoom image ${idx + 1}`
  );

  // 각 이미지의 로딩 상태
  const [isLoading, setIsLoading] = useState<{ [key: number]: boolean }>({});

  // 팝업이 열릴 때 초기 인덱스로 이동
  useEffect(() => {
    if (open && swiperRef.current && currentIndex < imageList.length) {
      swiperRef.current.slideTo(currentIndex);
    }
  }, [open, currentIndex, imageList.length]);

  // 이미지 로딩 상태 관리
  const handleImageLoad = (index: number) => {
    setIsLoading((prev) => ({ ...prev, [index]: false }));
  };

  const handleImageError = (index: number) => {
    setIsLoading((prev) => ({ ...prev, [index]: false }));
  };

  // 팝업이 닫혀있으면 렌더링하지 않음
  if (!open || imageList.length === 0) return null;

  return (
    <div className="popup-overlay popup-overlay--full" onClick={onClose}>
      <div className="popup popup--full popup--image-zoom" onClick={(e) => e.stopPropagation()}>
        {/* 헤더 영역: 제목 + 현재 인덱스 + 닫기 버튼 */}
        <div className={`popup__header ${headerAlign === "center" ? "popup__header--center" : ""}`}>
          <div className="popup__header-title">
            <Typography variant="h5" size="small" weight="bold">확대 보기</Typography>
          </div>
          <button className="popup__close" onClick={onClose} aria-label="닫기">✕</button>
        </div>
        {/* Swiper 이미지 뷰포트 영역 */}
        <div className="popup__image-viewport">
          <Swiper
            modules={[Navigation, Pagination, Zoom]}
            navigation={imageList.length > 1}
            pagination={imageList.length > 1 ? { 
              clickable: true,
              type: 'fraction'
            } : false}
            zoom={{ 
              maxRatio: 3, 
              minRatio: 1,
              toggle: true
            }}
            spaceBetween={0}
            slidesPerView={1}
            allowTouchMove={true}
            simulateTouch={true}
            touchStartPreventDefault={false}
            touchRatio={1}
            threshold={5}
            shortSwipes={true}
            longSwipes={true}
            longSwipesRatio={0.5}
            longSwipesMs={300}
            resistance={true}
            resistanceRatio={0.85}
            followFinger={true}
            initialSlide={initialIndex}
            onSwiper={(swiper) => {
              console.log('[ImageZoomPopup] Swiper 초기화:', swiper);
              console.log('[ImageZoomPopup] Swiper allowTouchMove:', swiper.allowTouchMove);
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              console.log('[ImageZoomPopup] 슬라이드 변경 완료:', swiper.activeIndex);
              setCurrentIndex(swiper.activeIndex);
              if (swiperRef.current) {
                swiperRef.current.allowTouchMove = true;
                console.log('[ImageZoomPopup] 슬라이드 변경 후 allowTouchMove:', swiperRef.current.allowTouchMove);
              }
            }}
            onTransitionEnd={(swiper) => {
              console.log('[ImageZoomPopup] Swiper 전환 종료:', {
                activeIndex: swiper.activeIndex,
                previousIndex: swiper.previousIndex
              });
            }}
            onTouchStart={(swiper, event) => {
              console.log('[ImageZoomPopup] Swiper onTouchStart:', event);
            }}
            onTouchMove={(swiper, event) => {
              console.log('[ImageZoomPopup] Swiper onTouchMove:', event);
            }}
            onTouchEnd={(swiper, event) => {
              console.log('[ImageZoomPopup] Swiper onTouchEnd:', event);
            }}
            onNavigationNext={(swiper) => {
              console.log('[ImageZoomPopup] 다음 버튼 클릭', {
                activeIndex: swiper.activeIndex,
                previousIndex: swiper.previousIndex,
                slides: swiper.slides.length,
                allowTouchMove: swiper.allowTouchMove
              });
            }}
            onNavigationPrev={(swiper) => {
              console.log('[ImageZoomPopup] 이전 버튼 클릭', {
                activeIndex: swiper.activeIndex,
                previousIndex: swiper.previousIndex,
                slides: swiper.slides.length,
                allowTouchMove: swiper.allowTouchMove
              });
            }}
            onTransitionStart={(swiper) => {
              console.log('[ImageZoomPopup] Swiper 전환 시작:', {
                activeIndex: swiper.activeIndex,
                previousIndex: swiper.previousIndex
              });
            }}
            onZoomChange={(swiper, scale) => {
              // scale이 1보다 크면 확대된 상태
              setIsZoomed(scale > 1);
            }}
            className={`popup__image-swiper ${isZoomed ? "is-zoomed" : ""}`}
          >
            {imageList.map((imageSrc, index) => {
              const isZoomed = false;
            
              return (
                <SwiperSlide key={index} className="popup__image-slide">
                  <div className="popup__image-zoom-container swiper-zoom-container">
                    {/* 이미지 로딩 중 표시 */}
                    {isLoading[index] !== false && (
                      <div className="popup__image-loading">
                        <Loading size={48} thickness={4} label="이미지 로딩 중..." />
                      </div>
                    )}
                    {/* 확대/축소 가능한 이미지 */}
                    <Image
                      src={imageSrc}
                      alt={altArray[index] || `Zoom image ${index + 1}`}
                      className="popup__image-zoom-element"
                      loading={index === 0 ? "eager" : "lazy"}
                      onLoad={() => handleImageLoad(index)}
                      onError={() => handleImageError(index)}
                      draggable={false}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ImageZoomPopup;

