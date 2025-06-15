
import React from "react";
import ScreenshotCarousel from "@/components/ScreenshotCarousel";
import { screenshotImages, planImages } from "@/utils/flatsUtils";

const FlatCarouselsSection: React.FC = () => (
  <>
    <div className="mb-16">
      <h2 className="text-3xl font-bold mb-2 gradient-text">2BHK Flat Plan</h2>
      <ScreenshotCarousel
        images={planImages["2BHK"]}
        initialIndex={0}
        spacing={56}
      />

      <div className="mt-10">
        <h3 className="text-xl font-bold mb-2">Sample Screenshots</h3>
        <ScreenshotCarousel
          images={screenshotImages["2BHK"]}
          initialIndex={2}
          spacing={80}
        />
      </div>
    </div>
    <div className="mb-16">
      <h2 className="text-3xl font-bold mb-2 gradient-text">3BHK Flat Plan</h2>
      <ScreenshotCarousel
        images={planImages["3BHK"]}
        initialIndex={0}
        spacing={56}
      />

      <div className="mt-10">
        <h3 className="text-xl font-bold mb-2">Sample Screenshots</h3>
        <ScreenshotCarousel
          images={screenshotImages["3BHK"]}
          initialIndex={1}
          spacing={80}
        />
      </div>
    </div>
  </>
);

export default FlatCarouselsSection;
