
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
  highlightHeight = 340, // even taller for highlight
  inactiveScale = 0.78
}) => {
  const [activeIdx, setActiveIdx] = useState(initialIndex);

  // Ensure proper overlap for edge images (every image "peeks")
  // We offset all images, center active in the middle, and spread rest left/right.
  const total = images.length;
  const overlap = spacing;

  // For each index, calculate proper "stack" positioning so that image at 0 and length-1 are visible even when not active
  // We'll center the active in the carousel, and push others left/right with visible overflow.

  // Calculate the position for each image so that all images peek out from behind the active one
  const getImageStyle = (idx: number): React.CSSProperties => {
    const delta = idx - activeIdx;

    // At edges, wrap so first/last images aren't fully hidden
    // For 3 images:
    // when activeIdx=1: show [0(left),1(active),2(right)]
    // when activeIdx=0: show [2(left edge),0(active),1(right)]
    // when activeIdx=2: show [1(left),2(active),0(right edge)]
    let realDelta = delta;

    if (total > 2) {
      // Make the carousel "infinite look" by wrapping indices for neighbors
      if (delta > 1) realDelta = delta - total;
      if (delta < -1) realDelta = delta + total;
    }

    // Active image - on top, large, no filter
    if (realDelta === 0) {
      return {
        zIndex: 30,
        transform: "translateX(0) scale(1.0)",
        filter: "none",
        width: "350px",
        height: `${highlightHeight}px`,
        boxShadow: "0 18px 38px rgba(0,0,0,0.16)",
        opacity: 1,
      };
    }

    // Side images: Peek out from left/right, never 100% hidden!
    // Each side is spread by overlap * realDelta, scale down side images, set grayscale
    return {
      zIndex: 20 - Math.abs(realDelta),
      transform: `translateX(${realDelta * overlap}px) scale(${inactiveScale})`,
      filter: "grayscale(1) brightness(0.74)",
      width: "220px",
      height: `${highlightHeight * 0.69}px`,
      opacity: 0.9,
      boxShadow: "0 2px 12px rgba(20,18,38,0.11)",
    };
  };

  return (
    <div className="relative w-full flex flex-col items-center select-none">
      <div 
        className="relative flex justify-center w-full"
        style={{
          height: `${highlightHeight + 28}px`,
          minWidth: "min(100%,340px)",
          maxWidth: "100vw",
          pointerEvents: "auto",
        }}
      >
        {images.map((img, idx) => (
          <div
            key={img.label + idx}
            className={`absolute left-1/2 top-2 cursor-pointer transition-all duration-500 rounded-2xl border-4
              ${idx === activeIdx ? "border-primary" : "border-muted"}
              group`}
            style={{
              ...getImageStyle(idx),
              transition: "all 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
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
