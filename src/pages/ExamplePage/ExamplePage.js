import PageTemplate from "../../components/PageTemplate/PageTemplate";
import "./ExamplePage.scss";

function ExamplePage() {
  return (
    <PageTemplate title="예시 페이지">
      <section className="example-section">
        <h2 className="example-section__title">섹션 제목</h2>
        <p className="example-section__text">
          이 페이지는 템플릿 사용 예시입니다. 오른쪽의 접근성 도우미를 통해
          다크모드와 큰글씨 모드를 테스트할 수 있습니다.
        </p>

        <div className="example-section__font-demo">
          <h3 className="example-font__title">글꼴 크기 테스트</h3>
          <p className="example-font__description">
            오른쪽 접근성 도우미에서 글꼴 크기를 변경하면 <strong>메인 컨텐츠 영역의 텍스트</strong>가 실시간으로 변경됩니다.
            아래 예시 텍스트들을 확인해보세요.
          </p>
          
          <div className="example-font__live-demo">
            <div className="example-font__demo-item">
              <h4 className="example-font__demo-title">제목 텍스트 (24px)</h4>
              <p className="example-font__demo-text">
                이것은 본문 텍스트입니다. 글꼴 크기를 변경하면 이 텍스트의 크기가 함께 변경됩니다.
                오른쪽 접근성 도우미에서 "작게", "보통", "크게", "아주 크게"를 선택해보세요.
              </p>
            </div>
            
            <div className="example-font__demo-item">
              <h4 className="example-font__demo-title">카드 제목 (18px)</h4>
              <p className="example-font__demo-text">
                카드 내용 텍스트 (14px)입니다. 모든 텍스트가 선택한 글꼴 크기에 맞춰 자동으로 조정됩니다.
              </p>
            </div>
          </div>

          <div className="example-font__samples">
            <div className="example-font__sample">
              <span className="example-font__label">작게 (12px):</span>
              <span className="example-font__text example-font__text--small">
                작은 크기의 텍스트입니다. 가독성을 확인해보세요.
              </span>
            </div>
            
            <div className="example-font__sample">
              <span className="example-font__label">보통 (14px):</span>
              <span className="example-font__text example-font__text--normal">
                보통 크기의 텍스트입니다. 기본 폰트 크기입니다.
              </span>
            </div>
            
            <div className="example-font__sample">
              <span className="example-font__label">크게 (16px):</span>
              <span className="example-font__text example-font__text--large">
                큰 크기의 텍스트입니다. 더 읽기 쉬워집니다.
              </span>
            </div>
            
            <div className="example-font__sample">
              <span className="example-font__label">아주 크게 (18px):</span>
              <span className="example-font__text example-font__text--xlarge">
                아주 큰 크기의 텍스트입니다. 최대 가독성을 제공합니다.
              </span>
            </div>
          </div>

          <div className="example-font__info">
            <p className="example-font__info-text">
              <strong>현재 적용된 글꼴 크기:</strong> 오른쪽 접근성 도우미에서 선택한 크기에 따라
              <strong>메인 컨텐츠 영역의 텍스트</strong>가 <code>--font-scale</code> 변수를 통해 자동으로 조정됩니다.
              위의 제목과 본문 텍스트를 확인해보세요! (헤더와 접근성 도우미는 제외됩니다)
            </p>
          </div>
        </div>

        <div className="example-section__card">
          <h3 className="example-card__title">카드 제목</h3>
          <p className="example-card__text">
            카드 내용이 여기에 표시됩니다. px-to-rem 믹스인을 사용하여
            피그마 수치값을 그대로 적용하면 자동으로 rem 단위로 변환됩니다.
          </p>
          <button className="example-card__button" type="button">
            버튼 예시
          </button>
        </div>

        <div className="example-section__grid">
          <div className="example-grid__item">
            <div className="example-grid__image" aria-label="예시 이미지 1">
              <span className="example-grid__placeholder">300 × 200</span>
            </div>
            <p className="example-grid__caption">이미지 설명 1</p>
          </div>
          <div className="example-grid__item">
            <div className="example-grid__image" aria-label="예시 이미지 2">
              <span className="example-grid__placeholder">300 × 200</span>
            </div>
            <p className="example-grid__caption">이미지 설명 2</p>
          </div>
        </div>
      </section>
    </PageTemplate>
  );
}

export default ExamplePage;

