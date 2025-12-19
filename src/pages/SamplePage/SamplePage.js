import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Skeleton from "../../components/Skeleton/Skeleton";
import LoadingGrid from "../../components/LoadingGrid/LoadingGrid";
import "./SamplePage.scss";
import { fetchMockSamplePage } from "../../mocks/mockData";

const PlaceholderCard = ({ title, desc }) => (
  <div className="sample-card">
    <h4>{title}</h4>
    <p>{desc}</p>
  </div>
);

function SamplePage() {
  const [hero, setHero] = useState(null);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMockSamplePage()
      .then(({ hero: heroData, cards: cardData }) => {
        setHero(heroData);
        setCards(cardData);
      })
      .catch((err) => {
        console.error("샘플 페이지 데이터 로드 실패:", err);
        setError("데이터를 불러오지 못했습니다.");
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="sample-page sample-page--loading">
        <div className="sample-main">
          <section className="sample-hero">
            <div className="sample-hero__text">
              <Skeleton width="100px" height={22} />
              <Skeleton width="240px" height={32} style={{ marginTop: 12 }} />
              <Skeleton width="320px" height={18} style={{ marginTop: 10 }} />
              <div className="actions" style={{ marginTop: 16, display: "flex", gap: 8 }}>
                <Skeleton width="110px" height={38} />
                <Skeleton width="110px" height={38} />
              </div>
            </div>
            <div className="sample-hero__placeholder">
              <Skeleton width="160px" height={120} />
            </div>
          </section>
          <section className="sample-section">
            <div className="section-head">
              <Skeleton width="140px" height={26} />
              <Skeleton width="220px" height={16} style={{ marginTop: 8 }} />
            </div>
            <LoadingGrid count={15} />
          </section>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="sample-page sample-page--error">{error}</div>;
  }

  return (
    <div className="sample-page">
      <Header currentPage="sample" onPageChange={() => {}} />

      <main className="sample-main">
        <section className="sample-hero">
          <div className="sample-hero__text">
            <p className="badge">{hero?.badge}</p>
            <h1>{hero?.title}</h1>
            <p className="lead">{hero?.lead}</p>
            <div className="actions">
              <button className="btn btn--primary btn--md">{hero?.primaryCta}</button>
              <button className="btn btn--secondary btn--md">{hero?.secondaryCta}</button>
            </div>
          </div>
          <div className="sample-hero__placeholder">
            <p className="label">비주얼 영역</p>
            <p className="hint">배너 / 이미지 / 그래프 등을 배치하세요.</p>
          </div>
        </section>

        <section className="sample-section">
          <div className="section-head">
            <h3>콘텐츠 영역</h3>
            <p>필요한 모듈을 자유롭게 배치할 공간입니다.</p>
          </div>
          <div className="sample-grid">
            {cards.map((card) => (
              <PlaceholderCard key={card.id} title={card.title} desc={card.desc} />
            ))}
          </div>
        </section>

        <section className="sample-section sample-cta">
          <div>
            <h3>CTA 영역</h3>
            <p>프로젝트별 목표 행동을 넣어주세요.</p>
          </div>
          <div className="actions">
            <button className="btn btn--primary btn--md">주요 액션</button>
            <button className="btn btn--ghost btn--md">보조 액션</button>
          </div>
        </section>
      </main>
      
    </div>
  );
}

export default SamplePage;

