
import React from "react";

type ScreenshotCarouselImageProps = {
  label: string;
  img: string;
  style: React.CSSProperties;
  isActive: boolean;
  onClick?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  tabIndex?: number;
  borderActiveClass?: string;
  borderInactiveClass?: string;
};

const ScreenshotCarouselImage: React.FC<ScreenshotCarouselImageProps> = ({
  label,
  img,
  style,
  isActive,
  onClick,
  onKeyDown,
  tabIndex = 0,
  borderActiveClass = "border-primary",
  borderInactiveClass = "border-muted"
}) => (
  <div
    className={`
      absolute left-1/2 top-2 cursor-pointer transition-all duration-500 rounded-2xl border-4
      ${isActive ? borderActiveClass : borderInactiveClass}
      group
    `}
    style={{
      ...style,
      transition: "all 0.55s cubic-bezier(0.4, 0, 0.2, 1)",
      cursor: isActive ? "default" : "pointer"
    }}
    onClick={onClick}
    aria-label={label}
    aria-current={isActive ? "true" : undefined}
    tabIndex={tabIndex}
    onKeyDown={onKeyDown}
  >
    <img
      src={img}
      alt={label}
      className="w-full h-full object-cover rounded-2xl user-select-none"
      draggable={false}
    />
    <div
      className={`absolute bottom-2 left-1/2 -translate-x-1/2 text-[1rem] font-semibold px-3 py-1 rounded-lg bg-card/80 shadow`}
      style={{
        color: isActive ? "#fff" : "#b5b8c5",
        background: isActive ? "rgb(var(--primary))" : "rgba(28,28,28,0.77)",
        pointerEvents: "none",
        whiteSpace: "nowrap"
      }}
    >
      {label}
    </div>
  </div>
);

export default ScreenshotCarouselImage;
