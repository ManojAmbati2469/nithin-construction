
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

// Update: side images overlap under main image. Partially overlap (negative margin effect).
export function getImageStyle(opts: CarouselImageStyleOpts): React.CSSProperties {
  const {
    displayIndices,
    idx,
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
      position: "absolute"
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
    // Center
    baseX = 0;
    s = 1.0;
    w = highlightW;
    h = highlightHeight;
    filter = "none";
    op = 1;
    bs = "0 18px 38px rgba(0,0,0,0.16)";
    z = 40; // Highest
  } else if (Math.abs(rel) === 1) {
    // 1-away: main peekers - overlap under main by negative margin/translate
    baseX = rel * (spacing * 1.6); // overlap more tightly
    s = inactiveScale + 0.20;
    w = inactiveW + 70; // wider for peeking
    h = highlightHeight * 0.88;
    filter = "grayscale(0.58) brightness(0.88)";
    op = 0.93;
    bs = "0 4px 18px rgba(20,18,38,0.13)";
    z = 15; // Below main
  } else if (Math.abs(rel) === 2) {
    // 2-away: even more overlapped and thin
    baseX = rel * (spacing * 2.2); // closer in, more overlap
    s = inactiveScale + 0.08;
    w = inactiveW + 22;
    h = highlightHeight * 0.70;
    filter = "grayscale(0.92) brightness(0.77)";
    op = 0.79;
    bs = "0 1px 12px rgba(20,18,38,0.09)";
    z = 8;
  } else {
    return {
      visibility: "hidden",
      opacity: 0,
      pointerEvents: "none",
      position: "absolute"
    };
  }

  // Negative margin by `translateX(-50%)` and baseX
  // Lower z-index for side images, so main image always above for correct overlap

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
}
