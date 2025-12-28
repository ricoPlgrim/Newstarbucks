import "./Loading.scss";

function Loading({ size = 48, thickness = 4, label = "로딩 중..." }) {
  const style = {
    width: size,
    height: size,
    borderWidth: thickness,
  };

  return (
    <div className="loading" role="status" aria-live="polite" aria-label={label}>
      <span className="loading__spinner" style={style} />
      {label && <span className="loading__label">{label}</span>}
    </div>
  );
}

export default Loading;
