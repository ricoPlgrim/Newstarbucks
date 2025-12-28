import "./Spacing.scss";

/**
 * Spacing 컴포넌트 - 간격 토큰 표시
 * @param {number} value - 간격 값 (px)
 * @param {string} name - 간격 이름 (선택)
 * @param {string} className - 추가 클래스명
 */
const Spacing = ({ value, name, className = "" }) => {
  const remValue = (value / 16).toFixed(2);
  // 시각적 표현을 실제 값에 비례하되, 카드 내에서 보기 좋게 조정
  const displayWidth = Math.min(value, 100);

  return (
    <div className={`spacing-token ${className}`}>
      <div className="spacing-token__visual" style={{ width: `${displayWidth}px`, height: `${displayWidth}px`, maxWidth: '100%' }}>
        <span className="spacing-token__label">{value}px</span>
      </div>
      <div className="spacing-token__info">
        <div className="spacing-token__name">{name || `${value}px`}</div>
        <div className="spacing-token__value">{value}px ({remValue}rem)</div>
      </div>
    </div>
  );
};

/**
 * SpacingScale 컴포넌트 - 간격 스케일 그룹 표시
 */
export const SpacingScale = ({ title, values, className = "" }) => {
  return (
    <div className={`spacing-scale ${className}`}>
      {title && <h4 className="spacing-scale__title">{title}</h4>}
      <div className="spacing-scale__grid">
        {values.map((spacing, index) => (
          <Spacing
            key={index}
            value={spacing.value}
            name={spacing.name}
          />
        ))}
      </div>
    </div>
  );
};

/**
 * SpacingExample 컴포넌트 - 간격 사용 예시
 */
export const SpacingExample = ({ title, examples, className = "" }) => {
  return (
    <div className={`spacing-example ${className}`}>
      {title && <h4 className="spacing-example__title">{title}</h4>}
      <div className="spacing-example__list">
        {examples.map((example, index) => (
          <div key={index} className="spacing-example__item">
            <div className="spacing-example__label">{example.label}</div>
            <div className="spacing-example__preview" style={{ gap: `${example.value}px` }}>
              <div className="spacing-example__box"></div>
              <div className="spacing-example__box"></div>
              <div className="spacing-example__box"></div>
            </div>
            <div className="spacing-example__code">{example.code}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Spacing;

