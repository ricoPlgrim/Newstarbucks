import Image from "../Image/Image";
import Badge from "../Badge/Badge";
import Typography from "../Typography/Typography";
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
  // 카드 타입 확인 (상품 카드인지 콘텐츠 카드인지)
  const isProduct = variant === "product";
  // 클릭 가능한 카드인지 확인
  const isClickable = !!onClick;

  // 키보드 접근성: Enter 또는 Space 키로 클릭 가능
  const handleKeyDown = (e) => {
    if (isClickable && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick?.(e);
    }
  };

  return (
    <div
      className={`card card--${variant} ${hoverable ? "card--hoverable" : ""} ${
        isClickable ? "card--clickable" : ""
      } ${className}`}
      onClick={onClick}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={handleKeyDown}
    >
      {/* 이미지 영역 */}
      {image && (
        <div className="card__image">
          <Image src={image} alt={imageAlt || title || ""} className="card__image-element" />
          {/* 뱃지 표시 (이미지 위에 오버레이) */}
          {badge && (
            <div className="card__badge">
              <Badge variant={badgeVariant} size="small">
                {badge}
              </Badge>
            </div>
          )}
        </div>
      )}

      {/* 카드 콘텐츠 영역 */}
      <div className="card__content">
        {/* 카드 제목 */}
        {title && (
          <Typography variant="h4" size="small" className="card__title">
            {title}
          </Typography>
        )}
        {/* 카드 설명 */}
        {description && (
          <Typography variant="body" size="small" color="muted" className="card__description">
            {description}
          </Typography>
        )}
        {/* 가격 표시 (상품 카드일 때만) */}
        {price && <div className="card__price">{price}</div>}
        {/* 추가 콘텐츠 */}
        {children}
      </div>
    </div>
  );
};

export default Card;

