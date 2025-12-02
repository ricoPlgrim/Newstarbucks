import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Image.scss";

const Image = ({
  src,
  alt = "",
  className = "",
  width,
  height,
  fallbackSrc,
  showFallback = true,
  onLoad,
  onError,
  ...props
}) => {
  const [imageStatus, setImageStatus] = useState("loading");
  const [aspectRatio, setAspectRatio] = useState(null);

  // 기본 noimage 이미지 URL - 더 예쁜 디자인
  const noImageUrl = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiByeD0iMTIiIGZpbGw9IiNGMEY0RjQiLz4KPGNpcmNsZSBjeD0iMTAwIiBjeT0iMTAwIiByPSI0NSIgZmlsbD0iI0U5RUNGRiIvPgo8cGF0aCBkPSJtMTAwIDY1IDMwIDMwTDk1IDk1bC0yMCAyMGwtMzAtMzBaIiBmaWxsPSIjQzRDNURGIi8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iNDAiIHN0cm9rZT0iI0M0QzVEQiIHN0cm9rZS13aWR0aD0iNCIgZmlsbD0ibm9uZSIvPgo8cGF0aCBkPSJtODAgMTIwIDI0IDI0IiBzdHJva2U9IiNDNEM1REIiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBmaWxsPSJub25lIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTgwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5Q0E0QUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtd2VpZ2h0PSI2MDAiPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4="; // 더 예쁜 "No Image" 디자인

  useEffect(() => {
    if (!src) {
      setImageStatus("error");
      return;
    }

    // 이미지 로드를 위한 임시 img 요소 생성
    const img = document.createElement('img');
    img.onload = () => {
      setImageStatus("loaded");

      // 이미지의 가로/세로 비율에 따라 클래스 결정
      const ratio = img.naturalWidth / img.naturalHeight;
      if (ratio > 1.1) {
        setAspectRatio("landscape");
      } else if (ratio < 0.9) {
        setAspectRatio("portrait");
      } else {
        setAspectRatio("square");
      }

      onLoad?.(img);
    };

    img.onerror = () => {
      setImageStatus("error");
      onError?.();
    };

    img.src = src;
  }, [src, onLoad, onError]);

  const handleImageError = () => {
    setImageStatus("error");
    onError?.();
  };

  const handleImageLoad = () => {
    setImageStatus("loaded");
    onLoad?.();
  };

  // 클래스 조합
  const classes = [
    "image",
    imageStatus === "loading" && "image--loading",
    imageStatus === "error" && "image--error",
    aspectRatio && `image--${aspectRatio}`,
    className
  ].filter(Boolean).join(" ");

  if (imageStatus === "error" && !showFallback) {
    return null;
  }

  if (imageStatus === "error" && showFallback) {
    return (
      <div
        className={`${classes} image--fallback`}
        style={{ width, height }}
        role="img"
        aria-label={alt || "이미지를 불러올 수 없습니다"}
        {...props}
      >
        <div className="image__fallback-content">
          <div className="image__fallback-text">noimage</div>
        </div>
      </div>
    );
  }

  return (
    <>
      {imageStatus !== "error" && (
        <img
          src={src}
          alt={alt}
          className={classes}
          width={width}
          height={height}
          onLoad={handleImageLoad}
          onError={handleImageError}
          {...props}
        />
      )}
      {imageStatus === "error" && showFallback && (
        <img
          src={noImageUrl}
          alt={alt || "이미지를 불러올 수 없습니다"}
          className={`${classes} image--fallback`}
          width={width}
          height={height}
          role="img"
          {...props}
        />
      )}
    </>
  );
};

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fallbackSrc: PropTypes.string,
  showFallback: PropTypes.bool,
  onLoad: PropTypes.func,
  onError: PropTypes.func
};

export default Image;
