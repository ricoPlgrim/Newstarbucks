import { useEffect, useState, useRef } from "react";
import type { ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Typography from "../Typography/Typography";
import Button from "../Button/Button";
import Image from "../Image/Image";
import "./Popup.scss";

/**
 * BasicPopup 컴포넌트
 * 기본 팝업 형태의 모달 컴포넌트
 * 
 * @param {boolean} open - 팝업 열림/닫힘 상태
 * @param {function} onClose - 팝업 닫기 핸들러
 * @param {string} icon - 아이콘 (이모지, 텍스트 등, 기본값: "🔒", images가 없을 때 사용)
 * @param {Array} images - 이미지 URL 배열 (선택, images가 있으면 icon 대신 이미지 캐러셀 표시)
 * @param {string} title - 팝업 제목
 * @param {string} description - 팝업 설명
 * @param {Array} actions - 액션 버튼 배열 [{ label, variant, onClick }]
 */
export function BasicPopup({ open, onClose, icon = "🔒", images = [], title, description, actions = [] }) {
  // Swiper 인스턴스 참조
  const swiperRef = useRef(null);
  // 현재 슬라이드 인덱스
  const [currentIndex, setCurrentIndex] = useState(0);

  // 팝업이 닫혀있으면 렌더링하지 않음
  if (!open) return null;

  // 팝업이 열렸을 때 콘솔 출력 (조건부 return 이후이므로 open이 true일 때만 실행됨)
  console.log('팝업 열림: BasicPopup', { title, description });

  // 이미지가 2개 이상일 때만 Swiper 사용
  const shouldUseSwiper = images && images.length > 1;

  // 오버레이 클릭 시 팝업 닫기 핸들러
  const handleOverlayClick = () => {
    onClose?.();
  };

  // 팝업 내부 클릭 시 이벤트 전파 방지 (오버레이 클릭으로 인한 닫힘 방지)
  const handlePopupClick = (e) => {
    e.stopPropagation();
  };

  // 이전 슬라이드로 이동
  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  // 다음 슬라이드로 이동
  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  return (
    <div className="popup-overlay" onClick={handleOverlayClick}>
      <div className={`popup popup--basic ${shouldUseSwiper ? "" : "popup--no-swiper"}`} onClick={handlePopupClick}>
        {/* 이미지 영역: images가 있으면 캐러셀, 없으면 icon */}
        {images && images.length > 0 ? (
          <div className="popup__image">
            {shouldUseSwiper ? (
              // Swiper 캐러셀: 이미지가 2개 이상일 때
              <div className="popup__image-carousel">
                <Swiper
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                  }}
                  onSlideChange={(swiper) => {
                    setCurrentIndex(swiper.realIndex);
                  }}
                  spaceBetween={0}
                  slidesPerView={1}
                  loop={images.length > 2}
                  className="popup__swiper"
                >
                  {images.map((imageUrl, idx) => (
                    <SwiperSlide key={idx}>
                      <div className="popup__image-wrapper">
                        <img
                          src={imageUrl}
                          alt={`${title || "팝업"} 이미지 ${idx + 1}`}
                          className="popup__image-element"
                          loading={idx === 0 ? "eager" : "lazy"}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                {/* 커스텀 좌우 네비게이션 버튼 */}
                <button
                  type="button"
                  className="popup__nav-button popup__nav-button--prev"
                  onClick={handlePrev}
                  aria-label="이전 이미지"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button
                  type="button"
                  className="popup__nav-button popup__nav-button--next"
                  onClick={handleNext}
                  aria-label="다음 이미지"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            ) : (
              // 단일 이미지: 이미지가 1개일 때 (Swiper 미사용)
              <div className="popup__image-wrapper">
                <Image
                  src={images[0]}
                  alt={title || "팝업 이미지"}
                  className="popup__image-element"
                />
              </div>
            )}
          </div>
        ) : (
          // 아이콘 영역: images가 없을 때
          <div className="popup__image">
            <span className="popup__image-icon">{icon}</span>
          </div>
        )}
        {/* 팝업 본문 영역 */}
        <div className="popup__body popup__body--center">
          <Typography variant="h4" size="small">{title}</Typography>
          <Typography variant="body" size="small" color="muted">{description}</Typography>
        </div>
        {/* 액션 버튼 영역 */}
        <div className="popup__actions popup__actions--stack">
          {actions.map((action, idx) => (
            <Button
              key={idx}
              variant={action.variant || "ghost"}
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * BottomSheetPopup 컴포넌트
 * 하단에서 올라오는 바텀시트 형태의 모달 컴포넌트
 * 드래그로 닫을 수 있는 기능 포함
 * 
 * @param {boolean} open - 팝업 열림/닫힘 상태
 * @param {function} onClose - 팝업 닫기 핸들러
 * @param {string} title - 팝업 제목 (선택)
 * @param {string} description - 팝업 설명 (선택)
 * @param {Array} options - 옵션 리스트 [{ icon, label, onClick }] (선택)
 * @param {ReactNode} children - 커스텀 콘텐츠 (options가 없을 때 사용) (선택)
 * @param {string} className - 추가 CSS 클래스 (선택)
 */
export function BottomSheetPopup({ open, onClose, title, description, options = [], children, className = "" }: {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  options?: Array<{ icon?: string; label: string; onClick?: () => void }>;
  children?: ReactNode;
  className?: string;
}) {
  // 팝업 요소 참조
  const popupRef = useRef(null);
  // 팝업 높이 상태
  const [popupHeight, setPopupHeight] = useState(0);
  // 드래그 오프셋 상태 (팝업이 아래로 내려간 거리)
  // 초기값을 window.innerHeight로 설정하여 열릴 때 애니메이션이 작동하도록 함
  const [offset, setOffset] = useState(window.innerHeight);
  // 드래그 시작 Y 좌표
  const [startY, setStartY] = useState(null);
  // 닫기 애니메이션 중인지 여부
  const [isClosing, setIsClosing] = useState(false);
  // 최신 offset 값을 ref로 추적 (비동기 상태 업데이트 문제 해결)
  const offsetRef = useRef(window.innerHeight);

  // 팝업이 열릴 때 높이 측정 및 애니메이션
  useEffect(() => {
    if (open && popupRef.current) {
      // 레이아웃이 완전히 렌더링된 후 높이 측정
      const measureHeight = () => {
        if (popupRef.current) {
          const height = popupRef.current.offsetHeight;
          setPopupHeight(height);
          console.log('BottomSheetPopup 높이 측정:', height);
        }
      };
      
      // 즉시 측정
      measureHeight();
      // 다음 프레임에서도 측정 (레이아웃 완료 후)
      requestAnimationFrame(() => {
        requestAnimationFrame(measureHeight);
      });
      
      // 열릴 때 애니메이션: 초기에는 화면 밖 아래에 위치
      // DOM에 이미 존재하므로 즉시 offset 설정 가능
      const initialOffset = window.innerHeight;
      setOffset(initialOffset);
      offsetRef.current = initialOffset;
      
      // 다음 프레임에서 위로 올라오는 애니메이션 (닫힐 때와 동일한 타이밍)
      // requestAnimationFrame을 사용하여 브라우저가 렌더링할 때 애니메이션 시작
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setOffset(0);
          offsetRef.current = 0;
        });
      });
      
      setStartY(null);
      setIsClosing(false);
    } else if (!open && !isClosing) {
      // 팝업이 완전히 닫힌 후 상태 초기화 (다음 열림을 위해)
      // offset은 window.innerHeight로 유지하여 다음 열림 시 애니메이션이 작동하도록 함
      setStartY(null);
    }
  }, [open]);

  // 팝업이 열렸을 때 콘솔 출력
  if (open) {
    console.log('팝업 열림: BottomSheetPopup', { title, description });
  }

  // 드래그 임계값 (팝업 높이의 절반)
  const threshold = popupHeight / 2;

  // 닫기 애니메이션 공통 처리
  const closeWithAnimation = () => {
    if (isClosing) return;
    const height = popupRef.current?.offsetHeight || popupHeight || window.innerHeight;
    setIsClosing(true);
    setOffset(height);
    offsetRef.current = height;

    // transition 시간(0.25s) + 여유
    setTimeout(() => {
      onClose?.();
      // 닫기 완료 후 offset 초기화 (다음 열림을 위해)
      setOffset(window.innerHeight);
      offsetRef.current = window.innerHeight;
    }, 300);
  };

  // 드래그 시작 핸들러 (터치 또는 마우스)
  const onStart = (e) => {
    console.log('onStart 호출됨', { isClosing, e: e?.type });
    if (isClosing) {
      console.log('닫기 애니메이션 중 - 드래그 불가');
      return; // 닫기 애니메이션 중에는 드래그 불가
    }
    const y = e.touches ? e.touches[0].clientY : e.clientY;
    setStartY(y);
    console.log('드래그 시작:', { startY: y, popupHeight });
  };

  // 드래그 중 핸들러
  // 드래그 거리에 따라 팝업을 아래로 이동 (최대 팝업 높이까지)
  const onMove = (e) => {
    console.log('onMove 호출됨', { startY, isClosing, hasRef: !!popupRef.current });
    if (startY === null || isClosing || !popupRef.current) {
      console.log('onMove 조건 실패로 return');
      return;
    }
    const y = e.touches ? e.touches[0].clientY : e.clientY;
    const delta = y - startY;
    // 0 ~ 팝업 높이 범위로 제한
    const newOffset = Math.max(0, Math.min(delta, popupHeight));
    setOffset(newOffset);
    offsetRef.current = newOffset; // ref에도 저장
    
    // 드래그 비율 계산 및 콘솔 출력
    const dragRatio = popupHeight > 0 ? newOffset / popupHeight : 0;
    const isOver50 = dragRatio >= 0.5;
    console.log(`드래그 중: ${(dragRatio * 100).toFixed(1)}% (${newOffset}px / ${popupHeight}px) - ${isOver50 ? '50% 이상' : '50% 이하'}`);
  };

  // 드래그 종료 핸들러
  // 임계값 이상 드래그했으면 팝업을 완전히 내린 후 닫기
  const onEnd = (e) => {
    console.log('onEnd 호출됨', { isClosing, startY, e: e?.type });
    if (isClosing || startY === null) {
      console.log('onEnd 조건 실패로 return');
      return;
    }
    
    // 현재 드래그 위치를 다시 계산 (최신 값 보장)
    let currentOffset = offsetRef.current;
    
    // onEnd 이벤트에서 최신 위치 계산 (이벤트가 있으면)
    if (e) {
      const currentY = e.touches ? e.touches[0]?.clientY : e.clientY;
      if (currentY !== undefined && startY !== null) {
        const delta = currentY - startY;
        currentOffset = Math.max(0, Math.min(delta, popupHeight));
        offsetRef.current = currentOffset; // ref 업데이트
      }
    }
    
    // 드래그 비율 계산 (더 정확한 판단)
    const dragRatio = popupHeight > 0 ? currentOffset / popupHeight : 0;
    // 절반 이상(50%) 드래그했는지 확인
    const shouldClose = dragRatio >= 0.5;
    
    // 드래그 종료 시 콘솔 출력
    console.log(`드래그 종료: ${(dragRatio * 100).toFixed(1)}% (${currentOffset}px / ${popupHeight}px) - ${shouldClose ? '50% 이상 (닫기)' : '50% 이하 (복귀)'}`);
    
    if (shouldClose) {
      closeWithAnimation();
    } else {
      // 임계값 미만이면 원래 위치로 복귀
      setOffset(0);
      offsetRef.current = 0;
      setStartY(null);
    }
  };

  // 팝업이 완전히 닫혀있고 애니메이션이 끝난 경우에만 DOM에서 제거
  // offset이 window.innerHeight이고 닫혀있고 닫기 애니메이션도 아닐 때만 제거
  const shouldRender = open || isClosing || offset !== window.innerHeight;

  if (!shouldRender) {
    return null;
  }

  return (
    <div 
      className={`popup-overlay popup-overlay--sheet ${!open && !isClosing ? 'popup-overlay--hidden' : ''}`}
      onClick={closeWithAnimation}
      style={{ 
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }}
    >
      <div
        ref={popupRef}
        className={`popup popup--sheet ${className}`.trim()}
        style={{ transform: `translateY(${offset}px)` }}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={onStart}
        onMouseMove={onMove}
        onMouseUp={onEnd}
        onMouseLeave={onEnd}
        onTouchStart={onStart}
        onTouchMove={onMove}
        onTouchEnd={onEnd}
      >
        {/* 드래그 핸들 (시각적 표시) */}
        <div className="popup__handle" />
        {/* 팝업 본문 영역 */}
        <div className="popup__body">
          {title && (
            <Typography variant="h4" size="small" className="popup__title">{title}</Typography>
          )}
          {description && (
            <Typography variant="body" size="small" color="muted" className="popup__description">{description}</Typography>
          )}
          {/* 옵션 리스트 */}
          {options.length > 0 && (
            <div className="popup__options">
              {options.map((option, index) => (
                <button
                  key={index}
                  className="popup__option-item"
                  onClick={() => {
                    option.onClick?.();
                    closeWithAnimation();
                  }}
                >
                  {option.icon && <span className="popup__option-icon">{option.icon}</span>}
                  <span className="popup__option-label">{option.label}</span>
                </button>
              ))}
            </div>
          )}
          {/* 커스텀 children */}
          {children}
        </div>
        {/* 취소 버튼 */}
        <div className="popup__actions popup__actions--stack">
          <Button variant="ghost" onClick={closeWithAnimation}>취소</Button>
        </div>
      </div>
    </div>
  );
}

/**
 * FullscreenPopup 컴포넌트
 * 전체 화면을 덮는 풀스크린 모달 컴포넌트
 * 
 * @param {boolean} open - 팝업 열림/닫힘 상태
 * @param {function} onClose - 팝업 닫기 핸들러
 * @param {string} title - 팝업 제목
 * @param {ReactNode} body - 팝업 본문 내용
 * @param {string} description - 제목 아래에 표시할 설명 텍스트
 * @param {boolean} showHeaderClose - 헤더 오른쪽 X 버튼 표시 여부 (기본값: true)
 * @param {boolean} showBottomClose - 하단 닫기 버튼 표시 여부 (기본값: false)
 */
export function FullscreenPopup({
  open,
  onClose,
  title,
  body,
  description,
  showHeaderClose = true,
  showBottomClose = false,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  body?: ReactNode;
  description?: string;
  showHeaderClose?: boolean;
  showBottomClose?: boolean;
}) {
  // 팝업이 닫혀있으면 렌더링하지 않음
  if (!open) return null;

  // 팝업이 열렸을 때 콘솔 출력 (조건부 return 이후이므로 open이 true일 때만 실행됨)
  console.log('팝업 열림: FullscreenPopup', { title });

  return (
    <div className="popup-overlay popup-overlay--full">
      <div className="popup popup--full">
        {/* 헤더 영역: 제목 + 닫기 버튼 */}
        <div className="popup__header">
          <Typography variant="h4" size="small">{title}</Typography>
          {showHeaderClose && (
            <button className="popup__close" onClick={onClose} aria-label="닫기">✕</button>
          )}
        </div>
        {/* 본문 영역 */}
        <div className="popup__body">
          {description && (
            <Typography variant="body" size="small" color="muted">
              {description}
            </Typography>
          )}
          {body}
        </div>
        {/* 하단 닫기 버튼 영역 */}
        {showBottomClose && (
          <div className="popup__actions popup__actions--stack">
            <Button variant="primary" onClick={onClose}>닫기</Button>
          </div>
        )}
      </div>
    </div>
  );
}

