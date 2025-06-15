
import React from "react";
import ScreenshotCarousel from "@/components/ScreenshotCarousel";
import VideoCarousel from "@/components/VideoCarousel";
import { screenshotImages, planImages } from "@/utils/flatsUtils";
import { Building2, Images, Video } from "lucide-react";

// Sample video data - replace with actual video URLs
const sampleVideos = {
  "2BHK": [
    {
      src: "/lovable-uploads/sample-video-1.mp4",
      title: "2BHK Living Room Tour",
      thumbnail: "/lovable-uploads/58a4c73a-fe50-4e0b-b127-51d2bd9dde86.png"
    },
    {
      src: "/lovable-uploads/sample-video-2.mp4", 
      title: "2BHK Kitchen & Dining",
      thumbnail: "/lovable-uploads/814e0956-9165-478c-b85c-e334a39182f9.png"
    },
    {
      src: "/lovable-uploads/sample-video-3.mp4",
      title: "2BHK Bedroom & Bathroom",
      thumbnail: "/lovable-uploads/image.png"
    }
  ],
  "3BHK": [
    {
      src: "/lovable-uploads/sample-video-4.mp4",
      title: "3BHK Complete Walkthrough",
      thumbnail: "/lovable-uploads/58a4c73a-fe50-4e0b-b127-51d2bd9dde86.png"
    },
    {
      src: "/lovable-uploads/sample-video-5.mp4",
      title: "3BHK Master Bedroom Suite",
      thumbnail: "/lovable-uploads/814e0956-9165-478c-b85c-e334a39182f9.png"
    },
    {
      src: "/lovable-uploads/sample-video-6.mp4",
      title: "3BHK Modern Kitchen Tour",
      thumbnail: "/lovable-uploads/image.png"
    }
  ]
};

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

      <div className="bg-muted/30 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Video className="w-5 h-5 text-muted-foreground" />
          <h3 className="text-lg font-semibold text-muted-foreground">Video Tours</h3>
        </div>
        <VideoCarousel
          videos={sampleVideos["2BHK"]}
          spacing={100}
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

      <div className="bg-muted/30 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Video className="w-5 h-5 text-muted-foreground" />
          <h3 className="text-lg font-semibold text-muted-foreground">Video Tours</h3>
        </div>
        <VideoCarousel
          videos={sampleVideos["3BHK"]}
          spacing={100}
        />
      </div>
    </div>
  </div>
);

export default FlatCarouselsSection;
