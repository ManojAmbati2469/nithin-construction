
import React from "react";
import ScreenshotCarousel from "@/components/ScreenshotCarousel";
import { screenshotImages, planImages } from "@/utils/flatsUtils";
import { Building2, Images } from "lucide-react";

const FlatCarouselsSection: React.FC = () => (
  <div className="space-y-16">
    {/* 2BHK Section */}
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <Building2 className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-3xl font-bold gradient-text">2BHK Apartment Plan</h2>
      </div>
      
      <div className="bg-muted/30 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4 text-muted-foreground">Floor Plan Layouts</h3>
        <ScreenshotCarousel
          images={planImages["2BHK"]}
          initialIndex={0}
          spacing={80}
        />
      </div>

      <div className="bg-muted/30 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Images className="w-5 h-5 text-muted-foreground" />
          <h3 className="text-lg font-semibold text-muted-foreground">Interior Samples</h3>
        </div>
        <ScreenshotCarousel
          images={screenshotImages["2BHK"]}
          initialIndex={2}
          spacing={80}
        />
      </div>
    </div>

    {/* 3BHK Section */}
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-secondary/10">
          <Building2 className="w-6 h-6 text-secondary" />
        </div>
        <h2 className="text-3xl font-bold gradient-text">3BHK Apartment Plan</h2>
      </div>
      
      <div className="bg-muted/30 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4 text-muted-foreground">Floor Plan Layouts</h3>
        <ScreenshotCarousel
          images={planImages["3BHK"]}
          initialIndex={0}
          spacing={80}
        />
      </div>

      <div className="bg-muted/30 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Images className="w-5 h-5 text-muted-foreground" />
          <h3 className="text-lg font-semibold text-muted-foreground">Interior Samples</h3>
        </div>
        <ScreenshotCarousel
          images={screenshotImages["3BHK"]}
          initialIndex={1}
          spacing={80}
        />
      </div>
    </div>
  </div>
);

export default FlatCarouselsSection;
