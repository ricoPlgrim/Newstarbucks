import "./Skeleton.scss";

function Skeleton({ width = "100%", height = 16, circle = false, className = "", style = {} }) {
  const inlineStyle = {
    width,
    height,
    borderRadius: circle ? "50%" : 6,
    ...style,
  };

  return <span className={`skeleton ${circle ? "skeleton--circle" : ""} ${className}`.trim()} style={inlineStyle} aria-hidden="true" />;
}

export default Skeleton;

