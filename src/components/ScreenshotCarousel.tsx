
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
  spacing = 110, // more spacing for better peeking
  highlightHeight = 370, // even taller for highlight
  inactiveScale = 0.78
}) => {
  const [activeIdx, setActiveIdx] = useState(initialIndex);

  const total = images.length;
  const baseSpacing = spacing;
  const highlightW = 350;
  const inactiveW = 220;

  // Improved getImageStyle for 2 or 3 images
  const getImageStyle = (idx: number): React.CSSProperties => {
    // For 2 or 3 images, "wrap" so all are visible beside the highlighted one
    let delta = idx - activeIdx;

    // Always wrap for small carousels
    if (total === 2) {
      /* 0(active) delta=0, 1: delta=1; 1(active) delta=0, 0:-1 */
      if (delta > 1) delta -= total;
      if (delta < -1) delta += total;
    } else if (total === 3) {
      // 3 images: left is delta=-1, right is delta=1, wrap correctly
      if (delta > 1) delta -= total;
      if (delta < -1) delta += total;
    } else {
      // 4+ images: wrap only far neighbors for infinite effect
      if (delta > 1) delta -= total;
      if (delta < -1) delta += total;
    }

    // Z-index logic: Always put highlighted in front, neighbors behind, etc
    const zIndex = delta === 0 ? 30 : 20 - Math.abs(delta);

    if (delta === 0) {
      return {
        zIndex,
        transform: `translateX(0px) scale(1.0)`,
        filter: "none",
        width: `${highlightW}px`,
        height: `${highlightHeight}px`,
        boxShadow: "0 18px 38px rgba(0,0,0,0.16)",
        opacity: 1,
      };
    } else {
      // Neighbors peek out left/right even for 2 or 3 images
      // For 2 or 3, force wider peeking since there are no far neighbors
      const peekDistance = total <= 3 ? highlightW * 0.60 : baseSpacing * delta;
      return {
        zIndex,
        transform: `translateX(${peekDistance * delta}px) scale(${inactiveScale})`,
        filter: "grayscale(1) brightness(0.74)",
        width: `${inactiveW}px`,
        height: `${highlightHeight * 0.70}px`,
        opacity: 0.92,
        boxShadow: "0 2px 12px rgba(20,18,38,0.11)",
      };
    }
  };

  return (
    <div className="relative w-full flex flex-col items-center select-none">
      <div
        className="relative flex justify-center w-full"
        style={{
          height: `${highlightHeight + 32}px`,
          minWidth: "min(100%,340px)",
          maxWidth: "100vw",
          pointerEvents: "auto",
        }}
      >
        {images.map((img, idx) => (
          <div
            key={img.label + idx}
            className={`
              absolute left-1/2 top-2 cursor-pointer transition-all duration-500 rounded-2xl border-4
              ${idx === activeIdx ? "border-primary" : "border-muted"}
              group
            `}
            style={{
              ...getImageStyle(idx),
              transition: "all 0.55s cubic-bezier(0.4, 0, 0.2, 1)",
              transform: `${getImageStyle(idx).transform} translateX(-50%)`,
              cursor: idx === activeIdx ? "default" : "pointer",
              background: "#141235",
            }}
            onClick={() => idx !== activeIdx && setActiveIdx(idx)}
            aria-label={img.label}
            aria-current={idx === activeIdx ? "true" : undefined}
            tabIndex={0}
            onKeyDown={e => {
              if ((e.key === "Enter" || e.key === " ") && idx !== activeIdx) setActiveIdx(idx);
            }}
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
