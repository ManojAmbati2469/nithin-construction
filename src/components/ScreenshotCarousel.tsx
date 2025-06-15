import React, { useState, useEffect, useRef } from "react";

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

  const total = images.length;
  const highlightW = 350;
  const inactiveW = 220;

  // --- DISPLAY INDICES LOGIC ---
  const getDisplayIndices = () => {
    if (total <= 1) return [activeIdx];
    if (total === 2) {
      return [
        (activeIdx + total - 1) % total,
        activeIdx,
      ];
    }
    if (total === 3) {
      return [
        (activeIdx + total - 1) % total, // left
        activeIdx,
        (activeIdx + 1) % total // right
      ];
    }
    if (total === 4) {
      return [
        (activeIdx + total - 2) % total,
        (activeIdx + total - 1) % total,
        activeIdx,
        (activeIdx + 1) % total
      ]
    }
    // 5 or more: 2 left, center, 2 right
    const getIdx = (idx: number) => (idx + total) % total;
    let indices: number[] = [];
    indices.push(getIdx(activeIdx - 2));
    indices.push(getIdx(activeIdx - 1));
    indices.push(activeIdx);
    indices.push(getIdx(activeIdx + 1));
    indices.push(getIdx(activeIdx + 2));
    return indices;
  };
  const displayIndices = getDisplayIndices();

  // --- IMAGE STYLE LOGIC ---
  const getImageStyle = (idx: number): React.CSSProperties => {
    const posInDisplay = displayIndices.indexOf(idx);

    if (posInDisplay === -1) {
      return {
        visibility: "hidden",
        opacity: 0,
        pointerEvents: "none",
        position: "absolute"
      };
    }

    const displayLen = displayIndices.length;
    const centerIdx = Math.floor(displayLen / 2);
    const rel = posInDisplay - centerIdx;

    // Peeking and overlap logic
    let baseX = 0;
    let s = 1.0;
    let w = highlightW;
    let h = highlightHeight;
    let filter = "none";
    let op = 1;
    let bs = "0 18px 38px rgba(0,0,0,0.16)";
    let z = 20 - Math.abs(rel);

    if (rel === 0) {
      // Center
      baseX = 0;
      s = 1.0;
      w = highlightW;
      h = highlightHeight;
      filter = "none";
      op = 1;
      bs = "0 18px 38px rgba(0,0,0,0.16)";
      z = 30;
    } else if (Math.abs(rel) === 1) {
      // Immediate left/right (first peeking)
      baseX = rel * (spacing * 2.5); // wider peeking
      s = inactiveScale + 0.17;
      w = inactiveW + 54;
      h = highlightHeight * 0.88;
      filter = "grayscale(0.58) brightness(0.88)";
      op = 0.93;
      bs = "0 4px 18px rgba(20,18,38,0.13)";
      z = 25;
    } else if (Math.abs(rel) === 2) {
      // 2nd left/right (outermost, even wider peek & less shade)
      baseX = rel * (spacing * 4.1); // much more visible
      s = inactiveScale + 0.09;
      w = inactiveW + 28;
      h = highlightHeight * 0.78;
      filter = "grayscale(0.92) brightness(0.74)";
      op = 0.82;
      bs = "0 2px 12px rgba(20,18,38,0.11)";
      z = 22;
    } else {
      return {
        visibility: "hidden",
        opacity: 0,
        pointerEvents: "none",
        position: "absolute"
      };
    }

    return {
      zIndex: z,
      transform: `translateX(${baseX}px) scale(${s}) translateX(-50%)`,
      width: `${w}px`,
      height: `${h}px`,
      filter,
      opacity: op,
      boxShadow: bs,
      background: "#141235"
    };
  };

  // --- Auto-advance logic (pause on hover/focus) ---
  const autoChangeRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPaused || total <= 1) return;
    autoChangeRef.current = setTimeout(() => {
      setActiveIdx((prev) => (prev + 1) % total);
    }, 3000);

    return () => {
      if (autoChangeRef.current) clearTimeout(autoChangeRef.current);
    };
  }, [activeIdx, isPaused, total]);

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
        className="relative flex justify-center w-full"
        style={{
          height: `${highlightHeight + 32}px`,
          minWidth: "min(100%,340px)",
          maxWidth: "100vw",
          pointerEvents: "auto"
        }}
      >
        {/* Only show the images in displayIndices */}
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
              cursor: idx === activeIdx ? "default" : "pointer"
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
