
import React, { useState } from "react";

// Accepts a list of screenshots: [{label, img}]
type ScreenshotCarouselProps = {
  images: { label: string; img: string }[];
  initialIndex?: number;
  spacing?: number; // px to separate images, for highlighting
};

const ScreenshotCarousel: React.FC<ScreenshotCarouselProps> = ({
  images,
  initialIndex = 0,
  spacing = 44, // default spacing between overlapped images
}) => {
  const [activeIdx, setActiveIdx] = useState(initialIndex);

  // Calculate zIndex, position, and style for stacking/overlapping
  const getImageStyle = (idx: number) => {
    if (idx === activeIdx) {
      return {
        zIndex: 30,
        transform: "translateX(0) scale(1.0)",
        filter: "none",
      };
    }
    // Stack left or right, more spread if spacing is higher
    const delta = idx - activeIdx;
    return {
      zIndex: 20 - Math.abs(delta),
      transform: `translateX(${delta * spacing}px) scale(0.85)`,
      filter: "grayscale(1) brightness(0.68)",
    };
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="relative w-full flex justify-center" style={{ height: "220px" }}>
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
              width: idx === activeIdx ? "244px" : "168px",
              height: idx === activeIdx ? "178px" : "128px",
              boxShadow:
                idx === activeIdx
                  ? "0 16px 36px rgba(0,0,0,0.18)"
                  : "0 3px 14px rgba(0,0,0,0.09)",
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
              className={`absolute bottom-2 left-1/2 -translate-x-1/2 text-[0.98rem] font-semibold px-3 py-1 rounded-lg bg-card/80 shadow`}
              style={{
                color: idx === activeIdx ? "#fff" : "#9ca3af",
                background: idx === activeIdx ? "rgb(var(--primary))" : "rgba(28,28,28,0.75)",
                pointerEvents: "none",
                whiteSpace: "nowrap"
              }}
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
