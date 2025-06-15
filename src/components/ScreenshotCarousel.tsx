
import React, { useRef, useEffect, useState } from "react";

// Accepts a list of screenshots: [{label, img}]
type ScreenshotCarouselProps = {
  images: { label: string; img: string }[];
  initialIndex?: number;
};

const ScreenshotCarousel: React.FC<ScreenshotCarouselProps> = ({
  images,
  initialIndex = 0,
}) => {
  const [activeIdx, setActiveIdx] = useState(initialIndex);

  // Calculate zIndex and position for stacking/overlapping
  const getImageStyle = (idx: number) => {
    if (idx === activeIdx) {
      return {
        zIndex: 30,
        transform: "translateX(0) scale(1.0)",
        filter: "none",
      };
    }
    // Stack left or right, slightly offset
    const delta = idx - activeIdx;
    return {
      zIndex: 20 - Math.abs(delta),
      transform: `translateX(${delta * 32}px) scale(0.85)`,
      filter: "grayscale(1) brightness(0.7)",
    };
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="relative w-full flex justify-center" style={{height: "210px"}}>
        {images.map((img, idx) => (
          <div
            key={img.label + idx}
            className={`absolute left-1/2 top-4 cursor-pointer transition-all duration-500 rounded-2xl shadow-lg border-4 
              ${idx === activeIdx ? "border-primary scale-105" : "border-muted scale-85"}
            `}
            style={{
              ...getImageStyle(idx),
              transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              // Center on left-1/2
              transform: `${getImageStyle(idx).transform} translateX(-50%)`,
              width: idx === activeIdx ? "230px" : "170px",
              height: idx === activeIdx ? "160px" : "120px",
              boxShadow:
                idx === activeIdx
                  ? "0 12px 36px rgba(0,0,0,0.30)"
                  : "0 4px 20px rgba(0,0,0,0.07)",
              cursor: idx === activeIdx ? "default" : "pointer",
              filter: getImageStyle(idx).filter,
              opacity: idx === activeIdx ? 1 : 0.92,
            }}
            onClick={() => idx !== activeIdx && setActiveIdx(idx)}
          >
            <img
              src={img.img}
              alt={img.label}
              className="w-full h-full object-cover rounded-2xl"
              draggable={false}
            />
            <div
              className={`absolute bottom-1 left-1/2 -translate-x-1/2 text-sm font-semibold px-2 py-0.5 rounded-lg
                ${idx === activeIdx ? "bg-primary text-white shadow" : "bg-card/80 text-muted-foreground"}
              `}
              style={{whiteSpace: "nowrap", pointerEvents: "none"}}
            >
              {img.label}
            </div>
          </div>
        ))}
      </div>
      {/* Optionally, dots navigation */}
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
