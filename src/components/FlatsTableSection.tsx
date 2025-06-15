
import React from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption } from "@/components/ui/table";
import { Loader2, AlertTriangle } from "lucide-react";
import { FlatEntry } from "@/utils/flatsUtils";

type FlatsTableSectionProps = {
  loading: boolean;
  error: string | null;
  variant: string;
  flats: FlatEntry[];
};

const FlatsTableSection: React.FC<FlatsTableSectionProps> = ({
  loading, error, variant, flats
}) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Loader2 className="animate-spin w-10 h-10 mb-4 text-primary" />
        <span>Loading {variant === "completed" ? "projects" : "flats"} data...</span>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-destructive">
        <AlertTriangle className="w-8 h-8 mb-2" />
        <span>{error}</span>
      </div>
    );
  }
  if (variant === "completed") {
    return (
      <div className="text-center py-12 text-muted-foreground">
        All projects listed here are completed and sold out.
        <br />
        Contact us for information on new launches.
      </div>
    );
  }
  if (!flats.length) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Currently, there are no flats available for sale. Please check back later or contact us for latest updates.
      </div>
    );
  }

  return (
    <div className="rounded-lg shadow-lg border border-border overflow-x-auto bg-card">
      <Table>
        <TableCaption>
          Contact us for the most up-to-date information or to schedule a site visit.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Project</TableHead>
            <TableHead>Flat No</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Facing</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {flats.map((flat, idx) => (
            <TableRow key={idx} className={
              flat.status?.toLowerCase().includes("sold") ? "bg-destructive/10" :
                flat.status?.toLowerCase().includes("available") ? "bg-green-50 dark:bg-green-950/10" : ""
            }>
              <TableCell>{flat.project}</TableCell>
              <TableCell>{flat.flatNo}</TableCell>
              <TableCell>{flat.type}</TableCell>
              <TableCell>{flat.size}</TableCell>
              <TableCell>{flat.facing}</TableCell>
              <TableCell>
                <span
                  className={
                    flat.status?.toLowerCase().includes("sold")
                      ? "text-destructive font-semibold"
                      : flat.status?.toLowerCase().includes("available")
                        ? "text-green-600 font-semibold"
                        : "text-slate-600 font-medium"
                  }
                >
                  {flat.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default FlatsTableSection;
