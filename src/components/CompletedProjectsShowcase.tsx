
import React, { useState } from "react";
import ScreenshotCarousel from "@/components/ScreenshotCarousel";
import { completedProjectsDetails, completedProjectsScreenshots, completedProjectsPlans } from "@/utils/flatsUtils";

const CompletedProjectsShowcase: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const selectedProject = completedProjectsDetails[selectedIdx];

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        {completedProjectsDetails.map((project, idx) => (
          <button
            key={project.name}
            onClick={() => setSelectedIdx(idx)}
            className={`px-4 py-2 rounded-xl font-bold transition-all border 
              ${selectedIdx === idx ? "bg-primary text-white border-primary shadow" : "bg-muted text-primary border-border"}
             `}
          >
            {project.name}
          </button>
        ))}
      </div>
      <div className="mb-6 px-4 py-4 rounded-xl border bg-background flex flex-col gap-2 shadow">
        <div className="font-bold text-2xl text-primary">{selectedProject.name}</div>
        <div className="text-base text-muted-foreground">{selectedProject.address}</div>
        <div className="font-medium text-xs md:text-sm px-2 py-1 rounded bg-muted ml-0 mt-1 md:ml-3 w-fit">
          Completed
        </div>
        <div className="text-sm text-card-foreground mt-2">{selectedProject.description}</div>
      </div>
      <div className="mb-12">
        <h3 className="text-xl font-bold mb-2 gradient-text">Floor Plan</h3>
        <ScreenshotCarousel
          images={completedProjectsPlans[selectedProject.name] || []}
          initialIndex={0}
          spacing={48}
        />
      </div>
      <div className="mb-16">
        <h3 className="text-xl font-bold mb-2 gradient-text">Actual Room Photos</h3>
        <ScreenshotCarousel
          images={completedProjectsScreenshots[selectedProject.name] || []}
          initialIndex={0}
          spacing={60}
        />
      </div>
      <div className="text-center text-muted-foreground py-4">
        <span className="bg-primary/10 px-3 py-2 rounded-full font-medium">
          These sample rooms and plans are from our completed project: <span className="font-bold">{selectedProject.name}</span>. All units are now sold out!
        </span>
      </div>
    </div>
  );
};

export default CompletedProjectsShowcase;
