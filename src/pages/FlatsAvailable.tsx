import { useEffect, useState } from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption } from "@/components/ui/table";
import { Loader2, AlertTriangle } from "lucide-react";
import ScreenshotCarousel from "@/components/ScreenshotCarousel";
import Header from "@/components/Header";
import { useSearchParams } from "react-router-dom";

// Project information can be extended or replaced with real data.
const projectDetailsList = [
  {
    name: "Nithin Residency",
    address: "Plot No. 45, Main Road, Hyderabad, Telangana, India",
    description: "Premium 2BHK & 3BHK Apartments with modern amenities.",
    status: "Ongoing" // or "Completed"
  },
  {
    name: "Nithin Heights",
    address: "Survey No. 12/3, Kukatpally, Hyderabad, Telangana, India",
    description: "Spacious 3BHK Apartments in a vibrant community.",
    status: "Completed"
  }
];

type FlatEntry = {
  project: string;
  flatNo: string;
  type: string;
  size: string;
  facing: string;
  status: string;
};

function parseTableFromHtml(html: string): FlatEntry[] {
  // This approach parses the specific table from the fetched HTML
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  // Find the table - assume it's the 1st or only table
  const table = doc.querySelector("table");
  if (!table) return [];

  const rows = Array.from(table.querySelectorAll("tr"));
  // First row is headers
  const dataRows = rows.slice(1);

  return dataRows.map((row) => {
    const cells = Array.from(row.querySelectorAll("td")).map((el) => el.textContent?.trim() || "");
    // Map columns by visual inspection of the source site
    // [Project, Flat No, Type, Size, Facing, Status]
    return {
      project: cells[0] || "",
      flatNo: cells[1] || "",
      type: cells[2] || "",
      size: cells[3] || "",
      facing: cells[4] || "",
      status: cells[5] || "",
    };
  });
}

// Use images that correspond to the title/label accordingly
const screenshotImages = {
  "2BHK": [
    { label: "Living Room", img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80" },
    { label: "Bedroom", img: "https://images.unsplash.com/photo-1465101178521-c1a9136a3fd4?auto=format&fit=crop&w=600&q=80" },
    { label: "Kitchen", img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80" },
    { label: "Balcony", img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80" },
    { label: "Dining Area", img: "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=600&q=80" },
    { label: "Washroom", img: "https://images.unsplash.com/photo-1549187774-b4e9b0445b06?auto=format&fit=crop&w=600&q=80" },
    { label: "Kids Room", img: "https://images.unsplash.com/photo-1487252665478-49b61b47f302?auto=format&fit=crop&w=600&q=80" },
    { label: "Study", img: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=600&q=80" }
  ],
  "3BHK": [
    { label: "Living Room", img: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80" },
    { label: "Bedroom", img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80" },
    { label: "Kitchen", img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80" },
    { label: "Balcony", img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80" },
    { label: "Dining Area", img: "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=600&q=80" },
    { label: "Washroom", img: "https://images.unsplash.com/photo-1465101178521-c1a9136a3fd4?auto=format&fit=crop&w=600&q=80" },
    { label: "Guest Room", img: "https://images.unsplash.com/photo-1467242040243-dcc2ac1a7295?auto=format&fit=crop&w=600&q=80" },
    { label: "Pooja Room", img: "https://images.unsplash.com/photo-1465101069803-c602c69c8a0b?auto=format&fit=crop&w=600&q=80" } // A decorative/Indian pooja room - replace as needed
  ]
};

const planImages: Record<string, { label: string; img: string }[]> = {
  "2BHK": [
    { label: "2BHK Main Plan", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80" },
    { label: "2BHK Floor Layout", img: "https://images.unsplash.com/photo-1441057206919-63d19fac2369?auto=format&fit=crop&w=800&q=80" },
    { label: "2BHK Overall View", img: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&q=80" }
  ],
  "3BHK": [
    { label: "3BHK Main Plan", img: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80" },
    { label: "3BHK Floor Layout", img: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?auto=format&fit=crop&w=800&q=80" },
    { label: "3BHK Site Direction", img: "https://images.unsplash.com/photo-1439886183900-e79ec0057170?auto=format&fit=crop&w=800&q=80" }
  ]
};

const FlatsAvailable = () => {
  // Detect variant by URL param, default is "available"
  const [searchParams] = useSearchParams();
  const variant = searchParams.get("variant") === "completed" ? "completed" : "available";

  const [flats, setFlats] = useState<FlatEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (variant === "completed") {
      setLoading(false);
      setFlats([]); // For demo, no detailed data for completed yet
      return;
    }
    async function fetchAndParse() {
      setLoading(true);
      setError(null);
      try {
        const proxyUrl = "https://api.allorigins.win/get?url=" + encodeURIComponent("https://nithinconstructions.in/Flats_Ava.html");
        const resp = await fetch(proxyUrl);
        const data = await resp.json();
        const html = data.contents;
        const flatsData = parseTableFromHtml(html);
        setFlats(flatsData);
      } catch (e) {
        setError("Could not load flats availability. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchAndParse();
  }, [variant]);

  // Decide what project(s) to display. Could later be based on params/props.
  const projectInfo = projectDetailsList.map(detail => (
    <div key={detail.name} className="mb-3 px-4 py-4 rounded-xl border bg-background flex flex-col gap-1 md:flex-row md:items-center md:gap-6 shadow-none">
      <div className="font-bold text-xl text-primary">{detail.name}</div>
      <div className="text-base text-muted-foreground">{detail.address}</div>
      <div className="font-medium text-xs md:text-sm px-2 py-1 rounded bg-muted ml-0 md:ml-3" style={{width: "fit-content"}}>
        {detail.status}
      </div>
      <div className="text-sm text-card-foreground mt-2 md:mt-0">{detail.description}</div>
    </div>
  ));

  return (
    <>
      <Header />
      <section className="min-h-screen flex flex-col items-center justify-center pt-24 pb-16 bg-background">
        <div className="container mx-auto max-w-5xl px-4">
          <h1 className="text-4xl font-bold gradient-text mb-6 text-center">
            {variant === "completed" ? "Completed Projects" : "Flats Available for Sale"}
          </h1>
          <p className="text-center text-muted-foreground mb-6">
            {variant === "completed" ?
              "Browse our completed projects and their highlights."
              : "Latest availability as per our records."
            }
          </p>
          
          {/* Project details at top */}
          <div className="mb-8">
            {projectInfo}
          </div>

          {/* Carousels (NO card/border/shadow, just spacing) */}
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

          {/* Flats Table or Completed Info */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="animate-spin w-10 h-10 mb-4 text-primary" />
              <span>Loading {variant === "completed" ? "projects" : "flats"} data...</span>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-16 text-destructive">
              <AlertTriangle className="w-8 h-8 mb-2" />
              <span>{error}</span>
            </div>
          ) : (variant === "completed") ? (
            <div className="text-center py-12 text-muted-foreground">All projects listed here are completed and sold out.
              <br />
              Contact us for information on new launches.
            </div>
          ) : flats.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">Currently, there are no flats available for sale. Please check back later or contact us for latest updates.</div>
          ) : (
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
          )}
        </div>
      </section>
    </>
  );
};

export default FlatsAvailable;
