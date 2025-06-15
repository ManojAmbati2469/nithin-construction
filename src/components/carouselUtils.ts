
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

// Returns styles for each image as per position in displayIndices.
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
    z = 30;
  } else if (Math.abs(rel) === 1) {
    // 1-away: main peekers, overlap over 2-away when present, clickability
    baseX = rel * (spacing * 2.5);
    s = inactiveScale + 0.17;
    w = inactiveW + 54;
    h = highlightHeight * 0.88;
    filter = "grayscale(0.58) brightness(0.88)";
    op = 0.93;
    bs = "0 4px 18px rgba(20,18,38,0.13)";
    z = 25;
  } else if (Math.abs(rel) === 2) {
    // 2-away: smaller, more peeking for click area
    baseX = rel * (spacing * 4.35); // More width, easier to see/click
    s = inactiveScale + 0.11;
    w = inactiveW + 38;
    h = highlightHeight * 0.74;
    filter = "grayscale(0.92) brightness(0.77)";
    op = 0.82;
    bs = "0 1px 12px rgba(20,18,38,0.09)";
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
}
