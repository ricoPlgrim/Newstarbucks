import "./Color.scss";

/**
 * Color 컴포넌트 - 컬러 팔레트 및 테마 표시
 * @param {string} variant - 'swatch' | 'palette' | 'theme' (기본값: 'swatch')
 * @param {string} name - 컬러 이름
 * @param {string} value - 컬러 값 (hex, rgb, CSS 변수 등)
 * @param {string} description - 컬러 설명
 * @param {boolean} showVariable - CSS 변수명 표시 여부 (기본값: true)
 * @param {string} className - 추가 클래스명
 */
const Color = ({
  variant = "swatch",
  name,
  value,
  description,
  showVariable = true,
  className = "",
}) => {
  if (variant === "swatch") {
    return (
      <div className={`color-swatch ${className}`}>
        <div className="color-swatch__preview" style={{ backgroundColor: value }}>
          <span className="color-swatch__check" aria-hidden="true">
            ✓
          </span>
        </div>
        <div className="color-swatch__info">
          <div className="color-swatch__name">{name}</div>
          {showVariable && value && (
            <div className="color-swatch__value">{value}</div>
          )}
          {description && (
            <div className="color-swatch__description">{description}</div>
          )}
        </div>
      </div>
    );
  }

  return null;
};

/**
 * ColorPalette 컴포넌트 - 컬러 팔레트 그룹 표시
 */
export const ColorPalette = ({ title, colors, className = "" }) => {
  return (
    <div className={`color-palette ${className}`}>
      {title && <h4 className="color-palette__title">{title}</h4>}
      <div className="color-palette__grid">
        {colors.map((color, index) => (
          <Color
            key={index}
            variant="swatch"
            name={color.name}
            value={color.value}
            description={color.description}
            showVariable={color.showVariable !== false}
          />
        ))}
      </div>
    </div>
  );
};

/**
 * ColorTheme 컴포넌트 - 라이트/다크 테마 비교 표시
 */
export const ColorTheme = ({ colors, className = "" }) => {
  return (
    <div className={`color-theme ${className}`}>
      <div className="color-theme__header">
        <h4 className="color-theme__title">테마 비교</h4>
        <div className="color-theme__modes">
          <span className="color-theme__mode">라이트 모드</span>
          <span className="color-theme__mode">다크 모드</span>
        </div>
      </div>
      <div className="color-theme__grid">
        {colors.map((color, index) => (
          <div key={index} className="color-theme__item">
            <div className="color-theme__name">{color.name}</div>
            <div className="color-theme__swatches">
              <div
                className="color-theme__swatch color-theme__swatch--light"
                style={{ backgroundColor: color.light }}
              >
                <span className="color-theme__check" aria-hidden="true">✓</span>
              </div>
              <div
                className="color-theme__swatch color-theme__swatch--dark"
                style={{ backgroundColor: color.dark }}
              >
                <span className="color-theme__check" aria-hidden="true">✓</span>
              </div>
            </div>
            <div className="color-theme__values">
              <div className="color-theme__value">{color.light}</div>
              <div className="color-theme__value">{color.dark}</div>
            </div>
            {color.variable && (
              <div className="color-theme__variable">{color.variable}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Color;

