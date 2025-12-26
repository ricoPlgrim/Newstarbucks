import Typography from "../Typography/Typography";
import "./ListContainer.scss";

/**
 * ListContainer 컴포넌트
 * section/article 태그를 사용하는 리스트 컨테이너
 * @param {string} tag - 'section' | 'article' (기본값: 'section')
 * @param {ReactNode} children - 리스트 아이템들
 * @param {string} className - 추가 클래스명
 * @param {string} title - 섹션 제목 (선택)
 * @param {string} description - 섹션 설명 (선택)
 * @param {boolean} bordered - 테두리 표시 여부 (기본값: false)
 * @param {boolean} divided - 구분선 표시 여부 (기본값: false)
 * @param {object} ...props - 기타 HTML 속성
 */
const ListContainer = ({
  tag = "section",
  children,
  className = "",
  title,
  description,
  bordered = false,
  divided = false,
  ...props
}) => {
  // 클래스명 조합: 기본 클래스 + 옵션 클래스 + 커스텀 클래스
  const classes = [
    "list-container",
    bordered && "list-container--bordered",
    divided && "list-container--divided",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // 동적 태그 선택 (section 또는 article)
  const ContainerTag = tag;

  return (
    <ContainerTag className={classes} {...props}>
      {/* 헤더 영역 (제목 또는 설명이 있을 때만 표시) */}
      {(title || description) && (
        <div className="list-container__header">
          {/* 섹션 제목 */}
          {title && (
            <Typography variant="h2" size="small" className="list-container__title">
              {title}
            </Typography>
          )}
          {/* 섹션 설명 */}
          {description && (
            <Typography variant="body" size="small" color="muted" className="list-container__description">
              {description}
            </Typography>
          )}
        </div>
      )}
      {/* 리스트 아이템 영역 */}
      <div className="list-container__body">{children}</div>
    </ContainerTag>
  );
};

export default ListContainer;

