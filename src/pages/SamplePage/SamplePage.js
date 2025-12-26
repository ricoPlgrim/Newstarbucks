import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Skeleton from "../../components/Skeleton/Skeleton";
import LoadingGrid from "../../components/LoadingGrid/LoadingGrid";
import "./SamplePage.scss";
// import { fetchMockSamplePage } from "../../mocks/mockData"; // 필요시 주석 해제

/**
 * 기본 퍼블리싱 페이지 템플릿 (예시용)
 * 
 * ⚠️ 이 파일은 참고용 예시입니다.
 * 실제 페이지를 만들 때는 이 구조를 그대로 사용하지 않고,
 * 프로젝트에 맞게 자유롭게 구조를 변경하세요!
 * 
 * 사용 방법:
 * 1. 이 파일을 복사하여 src/pages/YourPage/YourPage.js 생성
 * 2. 파일명과 컴포넌트명을 변경
 * 3. customClass prop을 사용하여 고유한 클래스명 지정 (CSS 충돌 방지)
 * 4. contents 클래스는 공통으로 사용 가능
 * 5. 나머지 구조는 프로젝트에 맞게 자유롭게 변경
 * 6. App.js에 페이지 등록
 * 
 * @param {string} customClass - CSS 충돌 방지를 위한 커스텀 클래스명 (기본값: "sample-page")
 */

const PlaceholderCard = ({ title, desc }) => (
  <div className="sample-page__card">
    <h4>{title}</h4>
    <p>{desc}</p>
  </div>
);

function SamplePage({ customClass = "sample-page" }) {
  // 상태 관리 예시
  const [hero, setHero] = useState(null);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 데이터 로드 예시 (필요시 주석 해제)
  // useEffect(() => {
  //   fetchMockSamplePage()
  //     .then(({ hero: heroData, cards: cardData }) => {
  //       setHero(heroData);
  //       setCards(cardData);
  //     })
  //     .catch((err) => {
  //       console.error("데이터 로드 실패:", err);
  //       setError("데이터를 불러오지 못했습니다.");
  //     })
  //     .finally(() => setIsLoading(false));
  // }, []);

  // 로딩 상태 (필요시 주석 해제)
  // if (isLoading) {
  //   return (
  //     <div className="sample-page sample-page--loading">
  //       <Header currentPage="sample" onPageChange={() => {}} />
  //       <div className="contents">
  //         <section className="sample-page__hero">
  //           <div>
  //             <Skeleton width="100px" height={22} />
  //             <Skeleton width="240px" height={32} style={{ marginTop: 12 }} />
  //             <Skeleton width="320px" height={18} style={{ marginTop: 10 }} />
  //             <div className="sample-page__actions" style={{ marginTop: 16, display: "flex", gap: 8 }}>
  //               <Skeleton width="110px" height={38} />
  //               <Skeleton width="110px" height={38} />
  //             </div>
  //           </div>
  //           <div className="sample-page__hero-placeholder">
  //             <Skeleton width="160px" height={120} />
  //           </div>
  //         </section>
  //         <section className="sample-page__section">
  //           <div className="sample-page__section-head">
  //             <Skeleton width="140px" height={26} />
  //             <Skeleton width="220px" height={16} style={{ marginTop: 8 }} />
  //           </div>
  //           <LoadingGrid count={15} />
  //         </section>
  //       </div>
  //     </div>
  //   );
  // }

  // 에러 상태 (필요시 주석 해제)
  // if (error) {
  //   return (
  //     <div className="sample-page">
  //       <Header currentPage="sample" onPageChange={() => {}} />
  //       <div className="contents">
  //         <div className="sample-page--error">{error}</div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="sample-page">
      {/* Header 컴포넌트 - currentPage는 App.js에서 관리하는 페이지 ID와 일치시켜야 함 */}
      <Header currentPage="sample" onPageChange={() => {}} />

      <main className="contents">
        {/* 히어로 섹션 - 메인 비주얼 영역 */}
        <section className="sample-page__hero">
          <div>
            {/* 배지/태그 */}
            <p className="sample-page__badge">샘플</p>
            {/* 메인 타이틀 */}
            <h1>페이지 제목</h1>
            {/* 서브 타이틀/설명 */}
            <p className="sample-page__lead">페이지 설명을 여기에 작성하세요.</p>
            {/* CTA 버튼 영역 */}
            <div className="sample-page__actions">
              <button className="btn btn--primary btn--md">주요 액션</button>
              <button className="btn btn--secondary btn--md">보조 액션</button>
            </div>
          </div>
          {/* 비주얼 영역 - 배너/이미지/그래프 등 */}
          <div className="sample-page__hero-placeholder">
            <p className="sample-page__label">비주얼 영역</p>
            <p className="sample-page__hint">배너 / 이미지 / 그래프 등을 배치하세요.</p>
            {/* 예시: <Image src="..." alt="..." /> */}
          </div>
        </section>

        {/* 콘텐츠 섹션 - 메인 콘텐츠 영역 */}
        <section className="sample-page__section">
          <div className="sample-page__section-head">
            <h3>콘텐츠 영역</h3>
            <p>필요한 모듈을 자유롭게 배치할 공간입니다.</p>
          </div>
          {/* 그리드 레이아웃 예시 */}
          <div className="sample-page__grid">
            {/* 카드 컴포넌트 예시 */}
            <PlaceholderCard title="카드 제목 1" desc="카드 설명을 여기에 작성하세요." />
            <PlaceholderCard title="카드 제목 2" desc="카드 설명을 여기에 작성하세요." />
            <PlaceholderCard title="카드 제목 3" desc="카드 설명을 여기에 작성하세요." />
            {/* 동적 데이터 사용 예시 */}
            {/* {cards.map((card) => (
              <PlaceholderCard key={card.id} title={card.title} desc={card.desc} />
            ))} */}
          </div>
        </section>

        {/* CTA 섹션 - 행동 유도 영역 */}
        <section className="sample-page__section">
          <div>
            <h3>CTA 영역</h3>
            <p>프로젝트별 목표 행동을 넣어주세요.</p>
          </div>
          <div className="sample-page__actions">
            <button className="btn btn--primary btn--md">주요 액션</button>
            <button className="btn btn--ghost btn--md">보조 액션</button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default SamplePage;

