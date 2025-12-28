import "./Layout.scss";

/**
 * Container 컴포넌트 - 컨테이너 폭 표시
 * @param {string} name - 컨테이너 이름
 * @param {number} width - 컨테이너 폭 (px)
 * @param {string} description - 설명
 * @param {string} className - 추가 클래스명
 */
const Container = ({ name, width, description, className = "" }) => {
  return (
    <div className={`layout-container ${className}`}>
      <div className="layout-container__info">
        <div className="layout-container__name">{name}</div>
        <div className="layout-container__width">{width}px ({width / 16}rem)</div>
        {description && (
          <div className="layout-container__description">{description}</div>
        )}
      </div>
      <div className="layout-container__preview">
        <div className="layout-container__visual" style={{ maxWidth: `${width}px`, width: '100%' }}>
          <div className="layout-container__content"></div>
        </div>
      </div>
    </div>
  );
};

/**
 * ContainerScale 컴포넌트 - 컨테이너 폭 스케일 표시
 */
export const ContainerScale = ({ title, containers, className = "" }) => {
  return (
    <div className={`container-scale ${className}`}>
      {title && <h4 className="container-scale__title">{title}</h4>}
      <div className="container-scale__list">
        {containers.map((container, index) => (
          <Container
            key={index}
            name={container.name}
            width={container.width}
            description={container.description}
          />
        ))}
      </div>
    </div>
  );
};

/**
 * Grid 컴포넌트 - 그리드 시스템 표시
 * @param {number} columns - 컬럼 수
 * @param {number} gap - 간격 (px)
 * @param {string} name - 그리드 이름
 * @param {string} className - 추가 클래스명
 */
const Grid = ({ columns, gap, name, className = "" }) => {
  return (
    <div className={`layout-grid ${className}`}>
      <div className="layout-grid__info">
        <div className="layout-grid__name">{name || `${columns} Columns`}</div>
        <div className="layout-grid__specs">
          {columns} columns · {gap}px gap
        </div>
      </div>
      <div 
        className="layout-grid__preview" 
        style={{ 
          gridTemplateColumns: `repeat(${columns}, 1fr)`, 
          gap: `${gap}px`
        }}
      >
        {Array.from({ length: columns }).map((_, index) => (
          <div key={index} className="layout-grid__item">
            <span className="layout-grid__label">{index + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * GridSystem 컴포넌트 - 그리드 시스템 그룹 표시
 */
export const GridSystem = ({ title, grids, className = "" }) => {
  return (
    <div className={`grid-system ${className}`}>
      {title && <h4 className="grid-system__title">{title}</h4>}
      <div className="grid-system__list">
        {grids.map((grid, index) => (
          <Grid
            key={index}
            columns={grid.columns}
            gap={grid.gap}
            name={grid.name}
          />
        ))}
      </div>
    </div>
  );
};

export default Container;

