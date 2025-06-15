
import React, { useState } from "react";

type ScreenshotCarouselProps = {
  images: { label: string; img: string }[];
  initialIndex?: number;
  spacing?: number; // px to separate images for "overlap" effect
  highlightHeight?: number; // height px for active image
  inactiveScale?: number; // scale for inactive images
};

const ScreenshotCarousel: React.FC<ScreenshotCarouselProps> = ({
  images,
  initialIndex = 0,
  spacing = 64, // more spacing for partial overlap
  highlightHeight = 260, // taller highlighted image
  inactiveScale = 0.78 // smaller inactive images
}) => {
  const [activeIdx, setActiveIdx] = useState(initialIndex);

  // Calculate style for each image
  const getImageStyle = (idx: number) => {
    if (idx === activeIdx) {
      return {
        zIndex: 30,
        transform: "translateX(0) scale(1.0)",
        filter: "none",
        width: "334px",
        height: `${highlightHeight}px`,
      };
    }
    const delta = idx - activeIdx;
    // Partial overlap: shift left/right with visible overlay, but not fully covered
    const overlap = spacing;
    return {
      zIndex: 20 - Math.abs(delta),
      transform: `translateX(${delta * overlap * 0.75}px) scale(${inactiveScale})`,
      filter: "grayscale(1) brightness(0.72)",
      width: "210px",
      height: `${highlightHeight * 0.68}px`,
      opacity: 0.89,
    };
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="relative flex justify-center w-full" style={{ height: `${highlightHeight + 24}px` }}>
        {images.map((img, idx) => (
          <div
            key={img.label + idx}
            className={`absolute left-1/2 top-2 cursor-pointer transition-all duration-500 rounded-2xl shadow-lg border-4 
              ${idx === activeIdx ? "border-primary" : "border-muted"}
            `}
            style={{
              ...getImageStyle(idx),
              transition: "all 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
              transform: `${getImageStyle(idx).transform} translateX(-50%)`,
              boxShadow:
                idx === activeIdx
                  ? "0 14px 34px rgba(0,0,0,0.14)"
                  : "0 2px 14px rgba(13,12,34,0.11)",
              cursor: idx === activeIdx ? "default" : "pointer",
              filter: getImageStyle(idx).filter,
              opacity: getImageStyle(idx).opacity || 1,
              width: getImageStyle(idx).width,
              height: getImageStyle(idx).height,
            }}
            onClick={() => idx !== activeIdx && setActiveIdx(idx)}
          >
            <img
              src={img.img}
              alt={img.label}
              className="w-full h-full object-cover rounded-2xl user-select-none"
              draggable={false}
            />
            <div
              className={`absolute bottom-2 left-1/2 -translate-x-1/2 text-[1rem] font-semibold px-3 py-1 rounded-lg bg-card/80 shadow`}
              style={{
                color: idx === activeIdx ? "#fff" : "#b5b8c5",
                background: idx === activeIdx ? "rgb(var(--primary))" : "rgba(28,28,28,0.77)",
                pointerEvents: "none",
                whiteSpace: "nowrap"
              }}
            >
              {img.label}
            </div>
          </div>
        ))}
      </div>
      {/* Dots navigation */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {images.map((img, idx) => (
          <button
            key={img.label + "_dot_" + idx}
            className={`h-2 w-2 rounded-full transition-all ${idx === activeIdx ? "bg-primary scale-110" : "bg-muted"}`}
            aria-label={img.label}
            style={{ outline: "none", border: "none" }}
            onClick={() => setActiveIdx(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default ScreenshotCarousel;
