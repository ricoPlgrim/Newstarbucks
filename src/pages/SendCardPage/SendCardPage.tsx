import { useState, useRef, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { DayPicker } from "react-day-picker";
import { ko } from "date-fns/locale/ko";
import "react-day-picker/dist/style.css";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import Typography from "../../components/Typography/Typography";
import Input from "../../components/Input/Input";
import Textarea from "../../components/Textarea/Textarea";
import Radio from "../../components/Radio/Radio";
import Image from "../../components/Image/Image";
import "./SendCardPage.scss";

const SendCardPage = () => {
  const navigate = useNavigate();
  const [selectedRecipient, setSelectedRecipient] = useState("Terry 이** 동교로점");
  const [selectedCard, setSelectedCard] = useState(1);
  const [showMessageInput, setShowMessageInput] = useState(false);
  const [message, setMessage] = useState("");
  const [sendOption, setSendOption] = useState<"immediate" | "scheduled">("immediate");
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(undefined);
  const [scheduledTime, setScheduledTime] = useState("");
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const [selectedMinute, setSelectedMinute] = useState<number | null>(null);
  // 썸네일 버튼 참조
  const thumbnailRefs = useRef<Record<number, HTMLButtonElement | null>>({});
  // 썸네일 컨테이너 참조
  const thumbnailsContainerRef = useRef<HTMLDivElement | null>(null);
  // 날짜 선택기 참조
  const datePickerRef = useRef<HTMLDivElement | null>(null);
  // 시간 선택기 참조
  const timePickerRef = useRef<HTMLDivElement | null>(null);

  // 카드 썸네일 데이터
  const cardThumbnails = [
    { 
      id: 1, 
      image: `${process.env.PUBLIC_URL || ''}/temp/@temp-img01.png`, 
      label: "커피잔",
      title: "Cheers",
      message: "즐겁고 따뜻한 순간들로 가득한,<br />반짝이는 겨울 되세요."
    },
    { 
      id: 2, 
      image: `${process.env.PUBLIC_URL || ''}/temp/@temp-img02.png`, 
      label: "샴페인",
      title: "Celebration",
      message: "새해를 맞이하며 행복한 시간 보내세요."
    },
    { 
      id: 3, 
      image: `${process.env.PUBLIC_URL || ''}/temp/@temp-img01.png`, 
      label: "Thank you",
      title: "Thank You",
      message: "항상 감사한 마음을 전합니다."
    },
    { 
      id: 4, 
      image: `${process.env.PUBLIC_URL || ''}/temp/@temp-img01.png`, 
      label: "추상",
      title: "Beautiful Day",
      message: "아름다운 하루 되세요."
    },
    { 
      id: 5, 
      image: `${process.env.PUBLIC_URL || ''}/temp/@temp-img01.png`, 
      label: "크리스마스",
      title: "Merry Christmas",
      message: "메리 크리스마스! 따뜻한 연말 보내세요."
    },
  ];

  // 선택된 카드의 이미지 경로
  const selectedCardImage = cardThumbnails.find(card => card.id === selectedCard)?.image || cardThumbnails[0].image;
  
  // 선택된 카드의 제목
  const selectedCardTitle = cardThumbnails.find(card => card.id === selectedCard)?.title || cardThumbnails[0].title;
  
  // 선택된 카드의 메시지
  const selectedCardMessage = cardThumbnails.find(card => card.id === selectedCard)?.message || cardThumbnails[0].message;

  // 미리 작성된 메시지
  const defaultMessage = "즐겁고 따뜻한 순간들로 가득한, 반짝이는 겨울 되세요.";

  // <br /> 태그를 실제 줄바꿈으로 변환하는 함수
  const renderMessageWithBreaks = (text: string) => {
    if (!text) return null;
    const parts = text.split(/<br\s*\/?>/i);
    return parts.map((part, index) => (
      <React.Fragment key={index}>
        {part}
        {index < parts.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleRemoveRecipient = () => {
    setSelectedRecipient("");
  };

  const handleMessageInputClick = () => {
    setShowMessageInput(true);
  };

  const handleSendClick = () => {
    handleFinalSend();
  };

  // 라디오 버튼 변경 핸들러 (스크롤 방지)
  const handleSendOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setSendOption(e.target.value as "immediate" | "scheduled");
  };

  // 라디오 버튼 클릭 핸들러 (스크롤 방지)
  const handleSendOptionClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // 스크롤 방지: 현재 스크롤 위치 유지
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    // 라디오 버튼 클릭 후 스크롤 위치 복원
    requestAnimationFrame(() => {
      window.scrollTo({
        top: currentScrollTop,
        behavior: 'auto'
      });
    });
  };

  // 날짜 포맷 함수
  const formatDate = (date: Date | undefined): string => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // 날짜 선택 핸들러
  const handleDateSelect = (date: Date | undefined) => {
    setScheduledDate(date);
    if (date) {
      setIsDatePickerOpen(false);
    }
  };

  const handleHourSelect = (hour: number) => {
    setSelectedHour(hour);
  };

  const handleMinuteSelect = (minute: number) => {
    setSelectedMinute(minute);
  };

  const handleTimeConfirm = () => {
    if (selectedHour !== null && selectedMinute !== null) {
      const hourStr = selectedHour.toString().padStart(2, "0");
      const minuteStr = selectedMinute.toString().padStart(2, "0");
      setScheduledTime(`${hourStr}:${minuteStr}`);
      setIsTimePickerOpen(false);
    }
  };

  const formatTime = (time: string) => {
    if (!time) return "";
    const [hour, minute] = time.split(":");
    const hourNum = parseInt(hour, 10);
    if (isNaN(hourNum) || minute === undefined) return "";
    const period = hourNum < 12 ? "오전" : "오후";
    const displayHour = hourNum === 0 ? 12 : hourNum > 12 ? hourNum - 12 : hourNum;
    return `${period} ${displayHour}시 ${minute}분`;
  };

  // 외부 클릭 감지 (날짜 선택기)
  useEffect(() => {
    if (!isDatePickerOpen) return;
    
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      // 팝오버 내부 클릭은 무시
      const popover = document.querySelector('.send-card-page__date-picker-popover');
      if (popover && popover.contains(target)) {
        return;
      }
      // 날짜 선택기 영역 외부 클릭 시 닫기
      if (datePickerRef.current && !datePickerRef.current.contains(target)) {
        setIsDatePickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isDatePickerOpen]);

  // 외부 클릭 감지 (시간 선택기)
  useEffect(() => {
    if (!isTimePickerOpen) return;
    
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      // 팝오버 내부 클릭은 무시
      const popover = document.querySelector('.send-card-page__time-picker-popover');
      if (popover && popover.contains(target)) {
        return;
      }
      // 시간 선택기 영역 외부 클릭 시 닫기
      if (timePickerRef.current && !timePickerRef.current.contains(target)) {
        setIsTimePickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isTimePickerOpen]);

  // 썸네일 클릭 핸들러: 카드 선택 + 스크롤 가운데 정렬 + 페이지 상단으로 이동
  const handleThumbnailClick = (cardId: number) => {
    // 카드 선택
    setSelectedCard(cardId);
    
    // 페이지 상단으로 스크롤
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // 썸네일 컨테이너에서 선택된 버튼을 가운데로 스크롤
    requestAnimationFrame(() => {
      const targetElement = thumbnailRefs.current[cardId];
      const container = thumbnailsContainerRef.current;
      
      if (!targetElement || !container) return;
      
      // 컨테이너와 타겟 요소의 위치 정보 가져오기
      const containerRect = container.getBoundingClientRect();
      const targetRect = targetElement.getBoundingClientRect();
      
      // 가운데 정렬을 위한 스크롤 위치 계산
      const targetScrollLeft = Math.max(0, container.scrollLeft + targetRect.left - containerRect.left - (containerRect.width / 2) + (targetRect.width / 2));
      const startScrollLeft = container.scrollLeft;
      const distance = targetScrollLeft - startScrollLeft;
      const duration = 300;
      const startTime = performance.now();
      
      // 300ms 동안 부드러운 스크롤 애니메이션
      const animateScroll = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // easeOutCubic 함수 적용
        const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
        const easedProgress = easeOutCubic(progress);
        
        container.scrollLeft = startScrollLeft + distance * easedProgress;
        
        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };
      
      requestAnimationFrame(animateScroll);
    });
  };

  const handleFinalSend = () => {
    console.log("카드 발송:", {
      recipient: selectedRecipient,
      card: selectedCard,
      message,
      sendOption,
      scheduledDate,
      scheduledTime,
    });
    // 실제 발송 로직
    alert("카드가 발송되었습니다!");
    navigate(-1);
  };

  // 메시지 입력 화면
  if (showMessageInput) {
    return (
      <div className="send-card-page">
        <Header
          variant="sub"
          categoryName="누구에게 보낼까요?"
          onBack={() => setShowMessageInput(false)}
          showUtilities={false}
          sticky={true}
        />
        <div className="send-card-page__content">
          {/* 수신자 선택 영역 */}
          <div className="send-card-page__recipient-section">
            <div className="send-card-page__recipient-header">
              <Typography variant="h4" size="small" weight="bold">
                누구에게 보낼까요?
              </Typography>
              <Button variant="ghost" size="small">
                파트너 찾기
              </Button>
            </div>
            {selectedRecipient && (
              <div className="send-card-page__recipient-selected">
                <Typography variant="body" size="small">
                  To. {selectedRecipient}
                </Typography>
                <button
                  className="send-card-page__recipient-remove"
                  onClick={handleRemoveRecipient}
                  aria-label="수신자 제거"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* 메시지 입력 카드 (일러스트 + 입력 영역 통합) */}
          <Card variant="content" className="send-card-page__message-card">
            <div className="send-card-page__card-content">
              {/* 상단 일러스트 영역 */}
              <div className="send-card-page__message-illustration">
                <Image 
                  src={selectedCardImage} 
                  alt="카드 일러스트"
                  className="send-card-page__message-illustration-image"
                />
              </div>
              
              {/* 하단 메시지 입력 영역 */}
              <div className="send-card-page__message-input-section">
                <div className="send-card-page__message-textarea-wrapper">
                  {!message && (
                    <Typography variant="body" size="small" className="send-card-page__message-hint">
                      따뜻한 마음을 전해주세요.
                    </Typography>
                  )}
                  <Textarea
                    value={message}
                    onChange={(e, value) => setMessage(value)}
                    placeholder=""
                    rows={5}
                    maxByte={800}
                    showByteCounter={true}
                    className="send-card-page__message-input"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* 미리 작성된 메시지 */}
          <div className="send-card-page__default-message">
            <Typography variant="h4" size="small" weight="bold" className="send-card-page__default-title">
              {selectedCardTitle}
            </Typography>
            <div className="send-card-page__message-text">
              {renderMessageWithBreaks(selectedCardMessage)}
            </div>
          </div>

          {/* 카드 썸네일 */}
          <div className="send-card-page__card-thumbnails" ref={thumbnailsContainerRef}>
            {cardThumbnails.map((card) => (
              <div key={card.id} className="send-card-page__thumbnail-wrapper">
                {selectedCard === card.id && (
                  <div className="send-card-page__thumbnail-arrow">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 6L18 12L12 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
                <button
                  ref={(el) => {
                    thumbnailRefs.current[card.id] = el;
                  }}
                  className={`send-card-page__thumbnail ${selectedCard === card.id ? "send-card-page__thumbnail--selected" : ""}`}
                  onClick={() => handleThumbnailClick(card.id)}
                  aria-label={`${card.label} 카드 선택`}
                  type="button"
                >
                  <div className="send-card-page__thumbnail-image">
                    <Image 
                      src={card.image} 
                      alt={card.label}
                      className="send-card-page__thumbnail-img"
                    />
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 발송 옵션 */}
        <div className="send-card-page__send-options">
          <Typography variant="h5" size="small" className="send-card-page__options-title">
            발송 옵션
          </Typography>

          <div className="send-card-page__options-radio-group">
            <Radio
              name="sendOption"
              value="immediate"
              label="즉시 발송"
              checked={sendOption === "immediate"}
              onChange={handleSendOptionChange}
            />
            <Radio
              name="sendOption"
              value="scheduled"
              label="예약 발송"
              checked={sendOption === "scheduled"}
              onChange={handleSendOptionChange}
            />
          </div>

          {/* 예약 발송 옵션 */}
          {sendOption === "scheduled" && (
            <div className="send-card-page__scheduled-options">
              <div className="send-card-page__scheduled-date" ref={datePickerRef}>
                <div className="send-card-page__input-wrapper">
                  <Input
                    type="text"
                    value={formatDate(scheduledDate)}
                    onChange={(e, value) => {
                      // 직접 입력은 허용하지 않고, 캘린더로만 선택
                    }}
                    placeholder="2026-12-12"
                    showClearButton={false}
                    className="send-card-page__scheduled-input"
                    readOnly
                  />
                  <button 
                    className="send-card-page__calendar-button" 
                    aria-label="날짜 선택"
                    onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                    type="button"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M3 8h14M7 2v4M13 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              </div>
              {isDatePickerOpen && (
                <>
                  <div 
                    className="send-card-page__date-picker-dimmed"
                    onClick={() => setIsDatePickerOpen(false)}
                  />
                  <div className="send-card-page__date-picker-popover">
                    <DayPicker
                      mode="single"
                      selected={scheduledDate}
                      onSelect={handleDateSelect}
                      locale={ko}
                      weekStartsOn={0}
                      showOutsideDays
                      fixedWeeks
                    />
                    <Button
                      variant="ghost"
                      size="small"
                      onClick={() => setIsDatePickerOpen(false)}
                      className="send-card-page__date-picker-close"
                    >
                      닫기
                    </Button>
                  </div>
                </>
              )}
              <div className="send-card-page__scheduled-time" ref={timePickerRef}>
                <div className="send-card-page__input-wrapper">
                  <Input
                    type="text"
                    value={formatTime(scheduledTime) || scheduledTime}
                    onChange={(e, value) => {
                      // 직접 입력은 허용하지 않고, 시간 선택기로만 선택
                    }}
                    placeholder="17:30"
                    showClearButton={false}
                    className="send-card-page__scheduled-input"
                    readOnly
                  />
                  <button 
                    className="send-card-page__time-button" 
                    aria-label="시간 선택"
                    onClick={() => setIsTimePickerOpen(!isTimePickerOpen)}
                    type="button"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M10 5v5l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
                {isTimePickerOpen && (
                  <>
                    <div 
                      className="send-card-page__time-picker-dimmed"
                      onClick={() => setIsTimePickerOpen(false)}
                    />
                    <div className="send-card-page__time-picker-popover">
                      <div className="send-card-page__time-picker-section">
                        <Typography variant="body" size="small" className="send-card-page__time-picker-label">
                          시간
                        </Typography>
                        <div className="send-card-page__time-picker-grid">
                          {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                            <button
                              key={hour}
                              type="button"
                              className={`send-card-page__time-picker-btn ${selectedHour === hour ? "is-selected" : ""}`}
                              onClick={() => handleHourSelect(hour)}
                            >
                              {hour < 12 ? `오전 ${hour === 0 ? 12 : hour}시` : `오후 ${hour === 12 ? 12 : hour - 12}시`}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="send-card-page__time-picker-section">
                        <Typography variant="body" size="small" className="send-card-page__time-picker-label">
                          분
                        </Typography>
                        <div className="send-card-page__time-picker-minutes">
                          {[0, 15, 30, 45].map((minute) => (
                            <button
                              key={minute}
                              type="button"
                              className={`send-card-page__time-picker-btn ${selectedMinute === minute ? "is-selected" : ""}`}
                              onClick={() => handleMinuteSelect(minute)}
                            >
                              {minute}분
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="send-card-page__time-picker-actions">
                        <Button
                          variant="ghost"
                          size="small"
                          onClick={() => setIsTimePickerOpen(false)}
                        >
                          취소
                        </Button>
                        <Button
                          variant="primary"
                          size="small"
                          onClick={handleTimeConfirm}
                          disabled={selectedHour === null || selectedMinute === null}
                        >
                          확인
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 하단 보내기 버튼 */}
        <div className="send-card-page__footer">
          <Button 
            variant="primary" 
            size="large" 
            onClick={handleSendClick} 
            className="send-card-page__send-button"
            disabled={!message.trim()}
          >
            보내기
          </Button>
        </div>
      </div>
    );
  }

  // 메인 화면
  return (
    <div className="send-card-page">
      <Header 
      variant="sub"
       categoryName="카드 보내기" 
       onBack={handleBack} 
       showUtilities={false} 
       sticky={true}
    />

      <div className="send-card-page__content">
        {/* 수신자 선택 영역 */}
        <div className="send-card-page__recipient-section">
          <div className="send-card-page__recipient-header">
            <Typography variant="h5" size="small" > 
              누구에게 보낼까요?
            </Typography>
            <Button variant="ghost" size="small">
              파트너 찾기
            </Button>
          </div>
          {selectedRecipient && (
            <div className="send-card-page__recipient-selected">
              <Typography variant="body" size="small">
                To. {selectedRecipient}
              </Typography>
              <button
                className="send-card-page__recipient-remove"
                onClick={handleRemoveRecipient}
                aria-label="수신자 제거"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* 일러스트레이션 카드 */}
        <Card variant="content" className="send-card-page__illustration-card">
          <div className="send-card-page__illustration">
            <div className="send-card-page__illustration-placeholder">
              <Image 
                src={selectedCardImage} 
                alt="카드 일러스트"
                className="send-card-page__illustration-image"
              />
            </div>
          </div>
          <Button
            variant="ghost"
            className="send-card-page__message-button"
            onClick={handleMessageInputClick}
          >
            메세지 입력하기
          </Button>
        </Card>

        {/* 미리 작성된 메시지 */}
        <div className="send-card-page__default-message">
          <Typography variant="h5" size="small" weight="bold" className="send-card-page__default-title">
            {selectedCardTitle}
          </Typography>
          <div className="send-card-page__message-text">
            {renderMessageWithBreaks(selectedCardMessage)}
          </div>
        </div>
      </div>

        {/* 카드 썸네일 선택 */}
        <div className="send-card-page__card-thumbnails" ref={thumbnailsContainerRef}>
          {cardThumbnails.map((card) => (
            <div key={card.id} className="send-card-page__thumbnail-wrapper">
              <button
                ref={(el) => {
                  thumbnailRefs.current[card.id] = el;
                }}
                className={`send-card-page__thumbnail ${selectedCard === card.id ? "send-card-page__thumbnail--selected" : ""}`}
                onClick={() => handleThumbnailClick(card.id)}
                aria-label={`${card.label} 카드 선택`}
              >
                <div className="send-card-page__thumbnail-image">
                  <Image 
                    src={card.image} 
                    alt={card.label}
                    className="send-card-page__thumbnail-img"
                  />
                </div>
              </button>
              {selectedCard === card.id && (
                <div className="send-card-page__thumbnail-arrow">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 6L18 12L12 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

      {/* 발송 옵션 */}
      <div className="send-card-page__send-options">
        <Typography variant="h5" size="small"  className="send-card-page__options-title">
          발송 옵션
        </Typography>

        <div className="send-card-page__options-radio-group" onClick={handleSendOptionClick}>
          <Radio
            name="sendOption"
            value="immediate"
            label="즉시 발송"
            checked={sendOption === "immediate"}
            onChange={handleSendOptionChange}
          />
          <Radio
            name="sendOption"
            value="scheduled"
            label="예약 발송"
            checked={sendOption === "scheduled"}
            onChange={handleSendOptionChange}
          />
        </div>

        {/* 예약 발송 옵션 */}
        {sendOption === "scheduled" && (
          <div className="send-card-page__scheduled-options">
            <div className="send-card-page__scheduled-date" ref={datePickerRef}>
              <div className="send-card-page__input-wrapper">
                <Input
                  type="text"
                  value={formatDate(scheduledDate)}
                  onChange={(e, value) => {
                    // 직접 입력은 허용하지 않고, 캘린더로만 선택
                  }}
                  placeholder="2026-12-12"
                  showClearButton={false}
                  className="send-card-page__scheduled-input"
                  readOnly
                />
                <button 
                  className="send-card-page__calendar-button" 
                  aria-label="날짜 선택"
                  onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                  type="button"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M3 8h14M7 2v4M13 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
              {isDatePickerOpen && (
                <>
                  <div 
                    className="send-card-page__date-picker-dimmed"
                    onClick={() => setIsDatePickerOpen(false)}
                  />
                  <div className="send-card-page__date-picker-popover">
                  <DayPicker
                    mode="single"
                    selected={scheduledDate}
                    onSelect={handleDateSelect}
                    locale={ko}
                    weekStartsOn={0}
                    showOutsideDays
                    fixedWeeks
                  />
                  <Button
                    variant="ghost"
                    size="small"
                    onClick={() => setIsDatePickerOpen(false)}
                    className="send-card-page__date-picker-close"
                  >
                    닫기
                  </Button>
                  </div>
                </>
              )}
            </div>
            <div className="send-card-page__scheduled-time" ref={timePickerRef}>
              <div className="send-card-page__input-wrapper">
                <Input
                  type="text"
                  value={formatTime(scheduledTime) || scheduledTime}
                  onChange={(e, value) => {
                    // 직접 입력은 허용하지 않고, 시간 선택기로만 선택
                  }}
                  placeholder="17:30"
                  showClearButton={false}
                  className="send-card-page__scheduled-input"
                  readOnly
                />
                <button 
                  className="send-card-page__time-button" 
                  aria-label="시간 선택"
                  onClick={() => setIsTimePickerOpen(!isTimePickerOpen)}
                  type="button"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M10 5v5l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
              {isTimePickerOpen && (
                <>
                  <div 
                    className="send-card-page__time-picker-dimmed"
                    onClick={() => setIsTimePickerOpen(false)}
                  />
                  <div className="send-card-page__time-picker-popover">
                    <div className="send-card-page__time-picker-section">
                      <Typography variant="body" size="small" className="send-card-page__time-picker-label">
                        시간
                      </Typography>
                      <div className="send-card-page__time-picker-grid">
                        {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                          <button
                            key={hour}
                            type="button"
                            className={`send-card-page__time-picker-btn ${selectedHour === hour ? "is-selected" : ""}`}
                            onClick={() => handleHourSelect(hour)}
                          >
                            {hour < 12 ? `오전 ${hour === 0 ? 12 : hour}시` : `오후 ${hour === 12 ? 12 : hour - 12}시`}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="send-card-page__time-picker-section">
                      <Typography variant="body" size="small" className="send-card-page__time-picker-label">
                        분
                      </Typography>
                      <div className="send-card-page__time-picker-minutes">
                        {[0, 15, 30, 45].map((minute) => (
                          <button
                            key={minute}
                            type="button"
                            className={`send-card-page__time-picker-btn ${selectedMinute === minute ? "is-selected" : ""}`}
                            onClick={() => handleMinuteSelect(minute)}
                          >
                            {minute}분
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="send-card-page__time-picker-actions">
                      <Button
                        variant="ghost"
                        size="small"
                        onClick={() => setIsTimePickerOpen(false)}
                      >
                        취소
                      </Button>
                      <Button
                        variant="primary"
                        size="small"
                        onClick={handleTimeConfirm}
                        disabled={selectedHour === null || selectedMinute === null}
                      >
                        확인
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 하단 보내기 버튼 */}
      <div className="send-card-page__footer">
        <Button 
          variant="primary" 
          size="large" 
          onClick={handleSendClick} 
          className="send-card-page__send-button"
          disabled={!message.trim()}
        >
          보내기
        </Button>
      </div>
    </div>
  );
};

export default SendCardPage;

