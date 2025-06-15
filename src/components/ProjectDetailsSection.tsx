
import React from "react";
import { projectDetailsList } from "@/utils/flatsUtils";

const ProjectDetailsSection: React.FC = () => (
  <div className="mb-8">
    {projectDetailsList.map(detail => (
      <div key={detail.name} className="mb-3 px-4 py-4 rounded-xl border bg-background flex flex-col gap-1 md:flex-row md:items-center md:gap-6 shadow-none">
        <div className="font-bold text-xl text-primary">{detail.name}</div>
        <div className="text-base text-muted-foreground">{detail.address}</div>
        <div className="font-medium text-xs md:text-sm px-2 py-1 rounded bg-muted ml-0 md:ml-3" style={{width: "fit-content"}}>
          {detail.status}
        </div>
        <div className="text-sm text-card-foreground mt-2 md:mt-0">{detail.description}</div>
      </div>
    ))}
  </div>
);

export default ProjectDetailsSection;
