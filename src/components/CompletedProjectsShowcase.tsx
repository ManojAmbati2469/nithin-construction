
import React, { useState } from "react";
import ScreenshotCarousel from "@/components/ScreenshotCarousel";
import { completedProjectsDetails, completedProjectsScreenshots, completedProjectsPlans } from "@/utils/flatsUtils";
import { Building2, Images, MapPin, CheckCircle } from "lucide-react";

const CompletedProjectsShowcase: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const selectedProject = completedProjectsDetails[selectedIdx];

  return (
    <div className="space-y-8">
      {/* Project Selector */}
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <CheckCircle className="w-6 h-6 text-green-600" />
          <h2 className="text-2xl font-bold text-green-600">Successfully Delivered</h2>
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          {completedProjectsDetails.map((project, idx) => (
            <button
              key={project.name}
              onClick={() => setSelectedIdx(idx)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all border-2 transform hover:scale-105
                ${selectedIdx === idx 
                  ? "bg-primary text-white border-primary shadow-lg" 
                  : "bg-card text-primary border-border hover:border-primary/50 hover:bg-primary/5"
                }
               `}
            >
              {project.name}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Project Details */}
      <div className="bg-gradient-to-br from-card to-muted/20 rounded-xl p-6 border border-border/50 shadow-lg">
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 rounded-lg bg-primary/10">
            <Building2 className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-primary mb-2">{selectedProject.name}</h3>
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <MapPin className="w-4 h-4" />
              <span>{selectedProject.address}</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
              <CheckCircle className="w-4 h-4" />
              Project Completed & Sold Out
            </div>
          </div>
        </div>
        <p className="text-card-foreground leading-relaxed">{selectedProject.description}</p>
      </div>

      {/* Floor Plans Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-secondary/10">
            <Building2 className="w-6 h-6 text-secondary" />
          </div>
          <h3 className="text-xl font-bold gradient-text">Floor Plans & Layouts</h3>
        </div>
        <div className="bg-muted/30 rounded-xl p-6">
          <ScreenshotCarousel
            images={completedProjectsPlans[selectedProject.name] || []}
            initialIndex={0}
            spacing={48}
          />
        </div>
      </div>

      {/* Actual Photos Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Images className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold gradient-text">Delivered Interiors</h3>
        </div>
        <div className="bg-muted/30 rounded-xl p-6">
          <ScreenshotCarousel
            images={completedProjectsScreenshots[selectedProject.name] || []}
            initialIndex={0}
            spacing={60}
          />
        </div>
      </div>

      {/* Success Message */}
      <div className="text-center py-8">
        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-xl p-6 max-w-2xl mx-auto">
          <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
          <p className="text-green-800 dark:text-green-200 font-medium">
            These photos and plans are from our completed project: <span className="font-bold">{selectedProject.name}</span>
          </p>
          <p className="text-green-700 dark:text-green-300 text-sm mt-2">
            All units have been successfully delivered to happy homeowners!
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompletedProjectsShowcase;
