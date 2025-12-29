import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import html2canvas from "html2canvas";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import Typography from "../../components/Typography/Typography";
import Toggle from "../../components/Toggle/Toggle";
import Image from "../../components/Image/Image";
import Icon from "../../components/Icon/Icon";
import "./ReceivedCardPage.scss";

const ReceivedCardPage = () => {
  const navigate = useNavigate();
  const [isCardPublic, setIsCardPublic] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);

  // 카드 데이터 (실제로는 props나 API에서 받아올 데이터)
  const cardData = {
    sender: {
      name: "Terry",
      id: "이**",
      location: "스타필드 고양 1F...",
      date: "2025-12-25",
    },
    card: {
      image: `${process.env.PUBLIC_URL || ''}/temp/@temp-img01.png`,
      title: "TIS THE SEASON TO BE JOYFUL",
      message: "안녕하세요. TERRY 🎁🎄 즐거운 연말...",
    },
    closing: {
      title: "Cheers",
      message: "즐겁고 따뜻한 순간들로 가득한, 반짝이는 겨울 되세요.",
    },
  };

  const handleCardPublicToggle = (checked: boolean) => {
    setIsCardPublic(checked);
    // 카드 공개 상태에 따라 화면 변경 로직
  };

  const handleDownloadImage = async () => {
    console.log('다운로드 버튼 클릭됨', { isCardPublic, letterRef: letterRef.current, cardRef: cardRef.current });
    
    // 카드 공개 시 편지지만 저장, 아니면 카드 컨테이너 저장
    let targetRef = isCardPublic ? letterRef : cardRef;
    
    // 카드 공개 상태인데 letterRef가 없으면 cardRef 사용 (fallback)
    if (isCardPublic && !letterRef.current) {
      console.warn('letterRef가 없어 cardRef를 사용합니다.');
      targetRef = cardRef;
    }
    
    if (!targetRef.current) {
      console.error('타겟 ref가 없습니다.');
      alert('이미지를 저장할 수 없습니다. 페이지를 새로고침해주세요.');
      return;
    }

    // 다운로드 버튼 숨기기
    const downloadButton = document.querySelector('.received-card-page__download-button') as HTMLElement;
    const originalDisplay = downloadButton?.style.display;
    if (downloadButton) {
      downloadButton.style.display = 'none';
    }

    try {
      // 편지지 또는 카드 영역만 캡처
      const canvas = await html2canvas(targetRef.current, {
        backgroundColor: '#fce4ec',
        scale: 2, // 고해상도
        logging: false,
        useCORS: true,
        allowTaint: true,
      } as any);

      // Canvas를 Blob으로 변환
      canvas.toBlob((blob) => {
        if (!blob) {
          // 다운로드 버튼 다시 보이기
          if (downloadButton) {
            downloadButton.style.display = originalDisplay || '';
          }
          return;
        }

        // 다운로드 링크 생성
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `card-${cardData.sender.date}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        // 다운로드 버튼 다시 보이기
        if (downloadButton) {
          downloadButton.style.display = originalDisplay || '';
        }
      }, "image/png");
    } catch (error) {
      console.error("이미지 저장 실패:", error);
      alert("이미지 저장에 실패했습니다.");
      
      // 에러 발생 시에도 버튼 다시 보이기
      if (downloadButton) {
        downloadButton.style.display = originalDisplay || '';
      }
    }
  };

  const handleReply = () => {
    // 답장하기 로직
    navigate("/send-card");
  };

  return (
    <div className="received-card-page">
      <Header
        variant="sub"
        categoryName="받은 카드"
        onBack={() => navigate(-1)}
        showUtilities={false}
        sticky={true}
      />
      
      <div className="received-card-page__content">
        <div className="received-card-page__content-inner">
          {/* 발신자 정보 */}
          <div className="received-card-page__sender-info">
            <Typography variant="body" size="small" className="received-card-page__sender-name">
              From. {cardData.sender.name} {cardData.sender.id}
            </Typography>
            <Typography variant="body" size="small" className="received-card-page__sender-location">
              {cardData.sender.location}
            </Typography>
            <Typography variant="body" size="small" className="received-card-page__sender-date">
              {cardData.sender.date}
            </Typography>
          </div>

          {/* 카드 영역 (이미지 저장 대상) */}
          <div className="received-card-page__card-container" ref={cardRef}>
          {!isCardPublic ? (
            <>
              {/* 카드 공개 안됨 - 카드 UI */}
              <div className="received-card-page__card">
                {/* 카드 이미지/일러스트 */}
                <div className="received-card-page__card-image">
                  <Image 
                    src={cardData.card.image}
                    alt="카드 일러스트"
                    className="received-card-page__card-image-element"
                  />
                </div>
                
                {/* 카드 메시지 버블 */}
                <div className="received-card-page__card-message">
                  <Typography variant="body" size="small" className="received-card-page__message-part">
                    안녕하세요.
                  </Typography>
                  <Typography variant="body" size="small" className="received-card-page__message-part">
                    TERRY 🎁🎄
                  </Typography>
                  <Typography variant="body" size="small" className="received-card-page__message-part">
                    즐거운 연말...
                  </Typography>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* 카드 공개됨 - 편지지 UI */}
              <div className="received-card-page__letter" ref={letterRef}>
                {/* 편지지 헤더 - 이미지 */}
                <div className="received-card-page__letter-header">
                  <Image 
                    src={cardData.card.image}
                    alt="카드 일러스트"
                    className="received-card-page__letter-header-image"
                  />
                </div>

                {/* 편지지 본문 */}
                <div className="received-card-page__letter-body">
                  <div className="received-card-page__letter-line">
                    <Typography variant="body" size="small" className="received-card-page__letter-message">
                      안녕하세요. TERRY
                    </Typography>
                  </div>
                  <div className="received-card-page__letter-line">
                    <Typography variant="body" size="small" className="received-card-page__letter-message">
                      🎁🎄 즐거운 연말 보내세요. 🍰🥂
                    </Typography>
                  </div>
                  <div className="received-card-page__letter-line">
                    <Typography variant="body" size="small" className="received-card-page__letter-message">
                      새로운 시작, 새로운 도전!
                    </Typography>
                  </div>
                  <div className="received-card-page__letter-line">
                    <Typography variant="body" size="small" className="received-card-page__letter-message">
                      2026년은 더 큰 기회와 행복이
                    </Typography>
                  </div>
                  <div className="received-card-page__letter-line">
                    <Typography variant="body" size="small" className="received-card-page__letter-message">
                      함께하는 해가 되길 바랍니다.
                    </Typography>
                  </div>
                  <div className="received-card-page__letter-line">
                    <Typography variant="body" size="small" className="received-card-page__letter-message">
                      해피 뉴이어!
                    </Typography>
                  </div>

                  {/* 이미지 저장 버튼 (아이콘) - 편지지 본문 내부 */}
                  <div className="received-card-page__actions">
                    <button
                      type="button"
                      onClick={handleDownloadImage}
                      className="received-card-page__download-button"
                      aria-label="이미지 저장"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 3V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M6 9L10 13L14 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3 15H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3 17H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* 닫는 메시지 - 항상 표시 */}
          <div className="received-card-page__closing">
            <Typography variant="h4" size="small" weight="bold" className="received-card-page__closing-title">
              {cardData.closing.title}
            </Typography>
            <Typography variant="body" size="small" className="received-card-page__closing-message">
              {cardData.closing.message}
            </Typography>
          </div>
          </div>
        </div>

        {/* 카드 공개 토글 */}
        <div className="received-card-page__public-toggle">
          <Typography variant="body" size="small" className="received-card-page__public-toggle-label">
            카드 공개
          </Typography>
          <div className="received-card-page__public-toggle-switch">
            <Toggle
              label=""
              description={undefined}
              defaultOn={isCardPublic}
              onChange={handleCardPublicToggle}
            />
          </div>
        </div>


        {/* 답장하기 버튼 */}
        <div className="received-card-page__footer">
          <Button
            variant="primary"
            size="large"
            onClick={handleReply}
            className="received-card-page__reply-button"
          >
            답장하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReceivedCardPage;

