
import React, { useRef, useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

// Accepts a list of screenshots: [{label, img}]
type ScreenshotCarouselProps = {
  images: { label: string; img: string }[];
  initialIndex?: number;
};

const ScreenshotCarousel: React.FC<ScreenshotCarouselProps> = ({
  images,
  initialIndex = 1, // highlight second (center) by default for 3 images
}) => {
  const [activeIdx, setActiveIdx] = useState(initialIndex);
  const [api, setApi] = useState<any>(null);

  // When `activeIdx` changes, scroll to the new one
  useEffect(() => {
    if (api && typeof api.scrollTo === "function") {
      api.scrollTo(activeIdx);
    }
  }, [activeIdx, api]);

  // When carousel is manually swiped, update highlight
  useEffect(() => {
    if (!api) return;
    api.on("select", () => {
      setActiveIdx(api.selectedScrollSnap());
    });
    // Cleanup
    return () => {
      api.off("select", () => {});
    };
  }, [api]);

  return (
    <div className="relative w-full py-2">
      <Carousel
        opts={{
          align: "center",
          loop: false,
          skipSnaps: true,
        }}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent>
          {images.map((s, idx) => {
            const isActive = idx === activeIdx;
            return (
              <CarouselItem
                key={s.label}
                className="basis-2/5 md:basis-1/4 relative flex flex-col items-center cursor-pointer"
                onClick={() => setActiveIdx(idx)}
              >
                <div
                  className={`transition-all duration-500 rounded-2xl shadow-lg border-4 ${
                    isActive
                      ? "border-primary scale-110 z-20"
                      : "border-transparent scale-95 brightness-75 grayscale z-10"
                  }`}
                  style={{
                    boxShadow: isActive
                      ? "0 10px 32px rgba(0,0,0,0.28)"
                      : "none",
                  }}
                >
                  <img
                    src={s.img}
                    alt={s.label}
                    className="rounded-2xl object-cover w-40 h-32 md:w-52 md:h-40"
                  />
                </div>
                <div className={`mt-2 text-center text-base font-semibold ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                  {s.label}
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="-left-3 md:-left-7" />
        <CarouselNext className="-right-3 md:-right-7" />
      </Carousel>
    </div>
  );
};

export default ScreenshotCarousel;

