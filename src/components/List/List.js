import "./List.scss";

/**
 * ListItem 컴포넌트
 * @param {ReactNode} children - 리스트 아이템 내용
 * @param {string} icon - 아이콘 (이모지 또는 텍스트)
 * @param {string} prefix - 앞쪽 추가 콘텐츠
 * @param {string} suffix - 뒤쪽 추가 콘텐츠
 * @param {function} onClick - 클릭 핸들러
 * @param {boolean} disabled - 비활성화 여부
 * @param {string} className - 추가 클래스명
 */
export const ListItem = ({
  children,
  icon,
  prefix,
  suffix,
  onClick,
  disabled = false,
  className = "",
}) => {
  const isClickable = !!onClick && !disabled;

  const content = (
    <>
      {icon && <span className="list-item__icon" aria-hidden="true">{icon}</span>}
      {prefix && <span className="list-item__prefix">{prefix}</span>}
      <span className="list-item__content">{children}</span>
      {suffix && <span className="list-item__suffix">{suffix}</span>}
    </>
  );

  if (isClickable) {
    return (
      <li
        className={`list-item list-item--clickable ${disabled ? "list-item--disabled" : ""} ${className}`}
        onClick={onClick}
        role="button"
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (!disabled && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            onClick?.(e);
          }
        }}
        aria-disabled={disabled}
      >
        {content}
      </li>
    );
  }

  return (
    <li className={`list-item ${disabled ? "list-item--disabled" : ""} ${className}`}>
      {content}
    </li>
  );
};

/**
 * List 컴포넌트
 * @param {Array} items - 리스트 아이템 배열 [{ id, content, icon, prefix, suffix, onClick, disabled }]
 * @param {string} variant - 'text' | 'icon' (기본값: 'text')
 * @param {boolean} bordered - 테두리 표시 여부 (기본값: true)
 * @param {boolean} divided - 구분선 표시 여부 (기본값: false)
 * @param {string} className - 추가 클래스명
 * @param {ReactNode} children - 직접 ListItem을 children으로 전달하는 경우
 */
const List = ({
  items = [],
  variant = "text",
  bordered = true,
  divided = false,
  className = "",
  children,
}) => {
  return (
    <ul
      className={`list list--${variant} ${bordered ? "list--bordered" : ""} ${
        divided ? "list--divided" : ""
      } ${className}`}
    >
      {children ||
        items.map((item) => (
          <ListItem
            key={item.id || item.key}
            icon={item.icon}
            prefix={item.prefix}
            suffix={item.suffix}
            onClick={item.onClick}
            disabled={item.disabled}
          >
            {item.content || item.children || item.label}
          </ListItem>
        ))}
    </ul>
  );
};

export default List;

