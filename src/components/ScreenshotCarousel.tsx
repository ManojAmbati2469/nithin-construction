
import React, { useState, useEffect, useRef } from "react";
import ScreenshotCarouselImage from "./ScreenshotCarouselImage";
import { getDisplayIndices, getImageStyle } from "./carouselUtils";

type ScreenshotCarouselProps = {
  images: { label: string; img: string }[];
  initialIndex?: number;
  spacing?: number;
  highlightHeight?: number;
  inactiveScale?: number;
};

const ScreenshotCarousel: React.FC<ScreenshotCarouselProps> = ({
  images,
  initialIndex = 0,
  spacing = 110,
  highlightHeight = 370,
  inactiveScale = 0.78
}) => {
  const [activeIdx, setActiveIdx] = useState(initialIndex);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const total = images.length;
  const highlightW = 350;
  const inactiveW = 220;

  // Get indices to display (ensuring consistency)
  const displayIndices = getDisplayIndices(total, activeIdx);

  // Enhanced auto-advance logic with smoother transitions
  const autoChangeRef = useRef<NodeJS.Timeout | null>(null);

  const handleIndexChange = (newIndex: number) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setActiveIdx(newIndex);
    
    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 600); // Slightly longer than CSS transition duration
  };

  useEffect(() => {
    if (isPaused || total <= 1 || isTransitioning) return;
    
    autoChangeRef.current = setTimeout(() => {
      const nextIndex = (activeIdx + 1) % total;
      handleIndexChange(nextIndex);
    }, 4000);
    
    return () => {
      if (autoChangeRef.current) clearTimeout(autoChangeRef.current);
    };
  }, [activeIdx, isPaused, total, isTransitioning]);

  const carouselAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const area = carouselAreaRef.current;
    if (!area) return;
    const onEnter = () => setIsPaused(true);
    const onLeave = () => setIsPaused(false);

    area.addEventListener("mouseenter", onEnter);
    area.addEventListener("focusin", onEnter);
    area.addEventListener("mouseleave", onLeave);
    area.addEventListener("focusout", onLeave);

    return () => {
      area.removeEventListener("mouseenter", onEnter);
      area.removeEventListener("focusin", onEnter);
      area.removeEventListener("mouseleave", onLeave);
      area.removeEventListener("focusout", onLeave);
    };
  }, []);

  return (
    <div
      className="relative w-full flex flex-col items-center select-none"
      ref={carouselAreaRef}
      tabIndex={-1}
      aria-label="Image Carousel"
    >
      <div
        className="relative flex justify-center w-full overflow-hidden"
        style={{
          height: `${highlightHeight + 32}px`,
          minWidth: "min(100%,340px)",
          maxWidth: "100vw",
          pointerEvents: "auto"
        }}
      >
        {images.map((img, idx) => (
          <ScreenshotCarouselImage
            key={img.label + idx}
            label={img.label}
            img={img.img}
            style={getImageStyle({
              displayIndices,
              idx,
              activeIdx,
              highlightW,
              inactiveW,
              highlightHeight,
              inactiveScale,
              spacing
            })}
            isActive={idx === activeIdx}
            onClick={() => idx !== activeIdx && !isTransitioning && handleIndexChange(idx)}
            onKeyDown={e => {
              if ((e.key === "Enter" || e.key === " ") && idx !== activeIdx && !isTransitioning) {
                handleIndexChange(idx);
              }
            }}
            tabIndex={0}
          />
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
            onClick={() => !isTransitioning && handleIndexChange(idx)}
            disabled={isTransitioning}
          />
        ))}
      </div>
    </div>
  );
};

export default ScreenshotCarousel;
