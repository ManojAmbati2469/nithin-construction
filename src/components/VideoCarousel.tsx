
import React, { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";

type VideoCarouselProps = {
  videos: Array<{ src: string; title: string; thumbnail?: string }>;
  spacing?: number;
};

const VideoCarousel: React.FC<VideoCarouselProps> = ({ videos, spacing = 80 }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoClick = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
      setIsPlaying(false);
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
  };

  const getVideoStyle = (index: number) => {
    const distance = Math.abs(index - activeIndex);
    const isActive = index === activeIndex;
    
    if (distance > 2) {
      return {
        display: "none"
      };
    }

    const offset = (index - activeIndex) * spacing;
    const scale = isActive ? 1 : 0.8 - (distance * 0.1);
    const opacity = isActive ? 1 : 0.7 - (distance * 0.2);
    const zIndex = isActive ? 10 : 10 - distance;

    return {
      transform: `translateX(${offset}px) translateX(-50%) scale(${scale})`,
      opacity,
      zIndex,
      transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      position: "absolute" as const,
      left: "50%",
      top: "0"
    };
  };

  if (!videos.length) return null;

  return (
    <div className="relative h-80 overflow-hidden rounded-xl">
      <div className="relative h-full">
        {videos.map((video, index) => (
          <div
            key={index}
            className="cursor-pointer"
            style={getVideoStyle(index)}
            onClick={() => handleVideoClick(index)}
          >
            <div className="relative w-96 h-72 rounded-xl overflow-hidden border-4 border-primary/20 hover:border-primary/50 transition-colors">
              <video
                ref={index === activeIndex ? videoRef : undefined}
                className="w-full h-full object-cover"
                muted={isMuted}
                loop
                poster={video.thumbnail}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              >
                <source src={video.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Video Controls Overlay */}
              {index === activeIndex && (
                <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="flex gap-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlay();
                      }}
                      className="p-3 bg-white/90 rounded-full hover:bg-white transition-colors"
                    >
                      {isPlaying ? (
                        <Pause className="w-6 h-6 text-primary" />
                      ) : (
                        <Play className="w-6 h-6 text-primary" />
                      )}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMute();
                      }}
                      className="p-3 bg-white/90 rounded-full hover:bg-white transition-colors"
                    >
                      {isMuted ? (
                        <VolumeX className="w-6 h-6 text-primary" />
                      ) : (
                        <Volume2 className="w-6 h-6 text-primary" />
                      )}
                    </button>
                  </div>
                </div>
              )}
              
              {/* Video Title */}
              <div className="absolute bottom-3 left-3 right-3">
                <div className="bg-black/70 rounded-lg px-3 py-2">
                  <p className="text-white text-sm font-medium truncate">{video.title}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={() => handleVideoClick(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === activeIndex ? "bg-primary" : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoCarousel;
