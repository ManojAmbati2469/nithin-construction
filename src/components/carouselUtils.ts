
import React from "react";

type CarouselImageStyleOpts = {
  displayIndices: number[];
  idx: number;
  activeIdx: number;
  highlightW: number;
  inactiveW: number;
  highlightHeight: number;
  inactiveScale: number;
  spacing: number;
};

export function getDisplayIndices(total: number, activeIdx: number): number[] {
  if (total <= 1) return [activeIdx];
  if (total === 2) {
    return [
      (activeIdx + total - 1) % total,
      activeIdx,
    ];
  }
  if (total === 3) {
    return [
      (activeIdx + total - 1) % total,
      activeIdx,
      (activeIdx + 1) % total,
    ];
  }
  if (total === 4) {
    return [
      (activeIdx + total - 2) % total,
      (activeIdx + total - 1) % total,
      activeIdx,
      (activeIdx + 1) % total
    ];
  }
  // 5 or more: 2 left, center, 2 right
  const getIdx = (idx: number) => (idx + total) % total;
  return [
    getIdx(activeIdx - 2),
    getIdx(activeIdx - 1),
    activeIdx,
    getIdx(activeIdx + 1),
    getIdx(activeIdx + 2),
  ];
}

// Enhanced style logic to prevent visual glitches during wrap-around
export function getImageStyle(opts: CarouselImageStyleOpts): React.CSSProperties {
  const {
    displayIndices,
    idx,
    activeIdx,
    highlightW,
    inactiveW,
    highlightHeight,
    inactiveScale,
    spacing,
  } = opts;

  const posInDisplay = displayIndices.indexOf(idx);

  if (posInDisplay === -1) {
    return {
      visibility: "hidden",
      opacity: 0,
      pointerEvents: "none",
      position: "absolute",
      zIndex: -1
    };
  }

  const displayLen = displayIndices.length;
  const centerIdx = Math.floor(displayLen / 2);
  const rel = posInDisplay - centerIdx;

  let baseX = 0;
  let s = 1.0;
  let w = highlightW;
  let h = highlightHeight;
  let filter = "none";
  let op = 1;
  let bs = "0 18px 38px rgba(0,0,0,0.16)";
  let z = 20 - Math.abs(rel);

  if (rel === 0) {
    // Active/center image
    baseX = 0;
    s = 1.0;
    w = highlightW;
    h = highlightHeight;
    filter = "none";
    op = 1;
    bs = "0 18px 38px rgba(0,0,0,0.16)";
    z = 40; // Highest z-index for active image
  } else if (Math.abs(rel) === 1) {
    // First level adjacent images
    baseX = rel * (spacing * 1.6);
    s = inactiveScale + 0.18;
    w = inactiveW + 60;
    h = highlightHeight * 0.88;
    filter = "grayscale(0.58) brightness(0.88)";
    op = 0.93;
    bs = "0 4px 18px rgba(20,18,38,0.13)";
    z = 15;
  } else if (Math.abs(rel) === 2) {
    // Second level adjacent images
    baseX = rel * (spacing * 2.05);
    s = inactiveScale + 0.04;
    w = inactiveW + 16;
    h = highlightHeight * 0.73;
    filter = "grayscale(0.92) brightness(0.77)";
    op = 0.77;
    bs = "0 1px 12px rgba(20,18,38,0.09)";
    z = 7;
  } else {
    // Hide images that are too far from center
    return {
      visibility: "hidden",
      opacity: 0,
      pointerEvents: "none",
      position: "absolute",
      zIndex: -1
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
    background: "#141235",
    // Prevent visual glitches during transitions
    backfaceVisibility: "hidden",
    perspective: "1000px",
    willChange: "transform, opacity"
  };
}
