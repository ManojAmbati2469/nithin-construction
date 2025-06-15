
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
  spacing = 110,
  highlightHeight = 370,
  inactiveScale = 0.78
}) => {
  const [activeIdx, setActiveIdx] = useState(initialIndex);

  const total = images.length;
  const baseSpacing = spacing;
  const highlightW = 350;
  const inactiveW = 220;

  // Get style for each image based on its position
  const getImageStyle = (idx: number): React.CSSProperties => {
    let delta = idx - activeIdx;

    if (total === 2) {
      if (delta > 1) delta -= total;
      if (delta < -1) delta += total;
    } else if (total === 3) {
      if (delta > 1) delta -= total;
      if (delta < -1) delta += total;
    }

    // For >3 images: allow up to 3 peeking images at left/right, rest hidden
    if (total > 3) {
      if (delta < -3 || delta > 3) {
        return {
          visibility: 'hidden',
          opacity: 0,
          pointerEvents: "none",
          position: "absolute"
        };
      }
    }

    // Z-index logic: highlight on top, sides below
    const zIndex = 30 - Math.abs(delta);

    if (delta === 0) {
      // Highlighted image
      return {
        zIndex,
        transform: `translateX(0px) scale(1.0)`,
        filter: "none",
        width: `${highlightW}px`,
        height: `${highlightHeight}px`,
        boxShadow: "0 18px 38px rgba(0,0,0,0.16)",
        opacity: 1,
      };
    } else if (total <= 3) {
      // For 2 or 3 images, always have two images peek left/right of center, no hiding
      const peekDistance = highlightW * 0.63;
      return {
        zIndex,
        transform: `translateX(${(delta === -1 ? -1 : 1) * peekDistance}px) scale(${inactiveScale})`,
        filter: "grayscale(1) brightness(0.74)",
        width: `${inactiveW}px`,
        height: `${highlightHeight * 0.70}px`,
        opacity: 0.96,
        boxShadow: "0 2px 12px rgba(20,18,38,0.13)",
      };
    } else {
      // For >=4 images, peeking: up to 3 left/right, fixed spacing
      const peekDistance = baseSpacing * delta;
      return {
        zIndex,
        transform: `translateX(${peekDistance}px) scale(${inactiveScale})`,
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
