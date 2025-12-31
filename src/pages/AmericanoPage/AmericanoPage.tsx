import { useState } from "react";
import CommonLayout from "../../components/CommonLayout/CommonLayout";
import Image from "../../components/Image/Image";
import Carousel from "../../components/Carousel/Carousel";
import Toast from "../../components/Toast/Toast";
import LottieAnimation from "../../components/Lottie/Lottie";
import "./AmericanoPage.scss";

// 아메리카노 메뉴 데이터
const americanoMenu = [
  {
    id: "americano-1",
    name: "아메리카노",
    description: "진한 에스프레소에 물을 더한 클래식한 커피",
    price: "4,500원",
    image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=300&fit=crop",
    size: "Tall",
    calories: "5kcal",
  },
  {
    id: "americano-2",
    name: "아이스 아메리카노",
    description: "시원하게 즐기는 아메리카노",
    price: "4,500원",
    image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=300&fit=crop",
    size: "Tall",
    calories: "5kcal",
  },
  {
    id: "americano-3",
    name: "카라멜 아메리카노",
    description: "달콤한 카라멜 시럽이 들어간 아메리카노",
    price: "5,000원",
    image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=300&fit=crop",
    size: "Tall",
    calories: "85kcal",
  },
  {
    id: "americano-4",
    name: "바닐라 아메리카노",
    description: "부드러운 바닐라 시럽이 들어간 아메리카노",
    price: "5,000원",
    image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=300&fit=crop",
    size: "Tall",
    calories: "80kcal",
  },
  {
    id: "americano-5",
    name: "헤이즐넛 아메리카노",
    description: "고소한 헤이즐넛 시럽이 들어간 아메리카노",
    price: "5,000원",
    image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=300&fit=crop",
    size: "Tall",
    calories: "90kcal",
  },
  {
    id: "americano-6",
    name: "콜드브루 아메리카노",
    description: "차갑게 우려낸 부드러운 콜드브루",
    price: "5,500원",
    image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=300&fit=crop",
    size: "Tall",
    calories: "5kcal",
  },
];


function AmericanoPage() {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [toast, setToast] = useState({ message: "", type: "info", key: 0 });

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
    setToast({
      message: `${menu.name}을(를) 선택했습니다.`,
      type: "success",
      key: Date.now(),
    });
  };

  const clearToast = () => {
    setToast({ message: "", type: "info", key: toast.key });
  };

  // 캐러셀 슬라이드 데이터 (아메리카노 이미지들)
  const carouselSlides = [
    {
      id: 1,
      title: "아메리카노",
      description: "진한 에스프레소의 깊은 맛",
      image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800&h=400&fit=crop",
    },
    {
      id: 2,
      title: "아이스 아메리카노",
      description: "시원하게 즐기는 커피",
      image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800&h=400&fit=crop",
    },
    {
      id: 3,
      title: "콜드브루 아메리카노",
      description: "부드러운 콜드브루의 맛",
      image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800&h=400&fit=crop",
    },
  ];

  return (
    <CommonLayout
      headerVariant="sub"
      headerCategoryName="아메리카노"
      headerOnBack={() => window.history.back()}
      headerShowUtilities={true}
      headerOnCartClick={() => console.log("장바구니 클릭")}
      headerOnUtilityClick={(key) => console.log(`${key} 클릭`)}
    >
      <div className="americano-page">
        <main className="americano-main">
        {/* 히어로 섹션 */}
        <section className="americano-hero">
          <div className="americano-hero__text">
            <p className="badge">메뉴</p>
            <h1>아메리카노</h1>
            <p className="lead">
              진한 에스프레소에 물을 더해 깔끔하고 부드러운 맛을 낸 클래식한 커피입니다.
              다양한 사이즈와 시럽 옵션으로 나만의 아메리카노를 즐겨보세요.
            </p>
            <div className="actions">
              <button className="btn btn--primary btn--md">주문하기</button>
              <button className="btn btn--secondary btn--md">매장 찾기</button>
            </div>
          </div>
          <div className="americano-hero__visual">
            <Image
              src="https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=600&h=400&fit=crop"
              alt="아메리카노"
              width="400"
              height="300"
            />
          </div>
        </section>

        {/* 캐러셀 섹션 */}
        <section className="americano-section">
          <div className="section-head">
            <h3>아메리카노 시리즈</h3>
            <p>다양한 아메리카노 메뉴를 확인해보세요</p>
          </div>
          <Carousel slides={carouselSlides} showOptionsPanel={false} />
        </section>

        {/* Lottie 애니메이션 섹션 */}
        <section className="americano-section americano-lottie">
          <div className="section-head">
            <h3>커피 추출 애니메이션</h3>
            <p>아메리카노가 만들어지는 과정을 확인해보세요</p>
          </div>
          <div className="americano-lottie__container">
            <LottieAnimation
              animationData="https://assets5.lottiefiles.com/packages/lf20_jcikwtux.json"
              loop={true}
              autoplay={true}
              speed={1}
              width={300}
              height={300}
            />
          </div>
        </section>

        {/* 메뉴 리스트 섹션 */}
        <section className="americano-section">
          <div className="section-head">
            <h3>메뉴 선택</h3>
            <p>원하시는 아메리카노를 선택해주세요</p>
          </div>
          <div className="americano-grid">
            {americanoMenu.map((menu) => (
              <div
                key={menu.id}
                className={`americano-card ${selectedMenu?.id === menu.id ? "is-selected" : ""}`}
                onClick={() => handleMenuClick(menu)}
              >
                <div className="americano-card__image">
                  <Image
                    src={menu.image}
                    alt={menu.name}
                    width="200"
                    height="150"
                  />
                </div>
                <div className="americano-card__content">
                  <h4>{menu.name}</h4>
                  <p className="americano-card__desc">{menu.description}</p>
                  <div className="americano-card__meta">
                    <span className="americano-card__size">{menu.size}</span>
                    <span className="americano-card__calories">{menu.calories}</span>
                  </div>
                  <div className="americano-card__price">{menu.price}</div>
                  <button className="btn btn--primary btn--sm">선택하기</button>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* CTA 섹션 */}
        <section className="americano-section americano-cta">
          <div>
            <h3>지금 주문하세요</h3>
            <p>선택한 메뉴를 바로 주문할 수 있습니다</p>
          </div>
          <div className="actions">
            <button className="btn btn--primary btn--md">장바구니에 추가</button>
            <button className="btn btn--ghost btn--md">다른 메뉴 보기</button>
          </div>
        </section>
        </main>

        {/* Toast 알림 */}
        {toast.message && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={clearToast}
          />
        )}
      </div>
    </CommonLayout>
  );
}

export default AmericanoPage;

