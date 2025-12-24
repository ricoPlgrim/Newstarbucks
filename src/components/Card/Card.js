import Image from "../Image/Image";
import Badge from "../Badge/Badge";
import "./Card.scss";

/**
 * Card 컴포넌트
 * @param {string} variant - 'product' | 'content' (기본값: 'content')
 * @param {string} image - 이미지 URL
 * @param {string} imageAlt - 이미지 alt 텍스트
 * @param {string} title - 카드 제목
 * @param {string} description - 카드 설명
 * @param {string} price - 가격 (상품 카드용)
 * @param {string} badge - 뱃지 텍스트
 * @param {string} badgeVariant - 뱃지 variant
 * @param {ReactNode} children - 추가 콘텐츠
 * @param {function} onClick - 클릭 핸들러
 * @param {boolean} hoverable - hover 효과 활성화 (기본값: true)
 * @param {string} className - 추가 클래스명
 */
const Card = ({
  variant = "content",
  image,
  imageAlt,
  title,
  description,
  price,
  badge,
  badgeVariant = "default",
  children,
  onClick,
  hoverable = true,
  className = "",
}) => {
  const isProduct = variant === "product";
  const isClickable = !!onClick;

  return (
    <div
      className={`card card--${variant} ${hoverable ? "card--hoverable" : ""} ${
        isClickable ? "card--clickable" : ""
      } ${className}`}
      onClick={onClick}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={(e) => {
        if (isClickable && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick?.(e);
        }
      }}
    >
      {image && (
        <div className="card__image">
          <Image src={image} alt={imageAlt || title || ""} className="card__image-element" />
          {badge && (
            <div className="card__badge">
              <Badge variant={badgeVariant} size="small">
                {badge}
              </Badge>
            </div>
          )}
        </div>
      )}

      <div className="card__content">
        {title && <h4 className="card__title">{title}</h4>}
        {description && <p className="card__description">{description}</p>}
        {price && <div className="card__price">{price}</div>}
        {children}
      </div>
    </div>
  );
};

export default Card;

