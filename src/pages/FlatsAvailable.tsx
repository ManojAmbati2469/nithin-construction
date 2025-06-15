import { useEffect, useState } from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption } from "@/components/ui/table";
import { Loader2, AlertTriangle } from "lucide-react";
import ScreenshotCarousel from "@/components/ScreenshotCarousel";

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

const placeholder2BHK =
  "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=600&q=80";
const placeholder3BHK =
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80";

// Placeholder images for flat types
const screenshotImages = {
  "2BHK": [
    {
      label: "Living Room",
      img: "https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80"
    },
    {
      label: "Bedroom",
      img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
    },
    {
      label: "Kitchen",
      img: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=400&q=80"
    },
  ],
  "3BHK": [
    {
      label: "Living Room",
      img: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80"
    },
    {
      label: "Bedroom",
      img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80"
    },
    {
      label: "Kitchen",
      img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80"
    },
  ]
};

const planImages: Record<string, string> = {
  "2BHK": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80",
  "3BHK": "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=400&q=80"
};

const FlatsAvailable = () => {
  const [flats, setFlats] = useState<FlatEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAndParse() {
      setLoading(true);
      setError(null);
      try {
        // Use a CORS proxy since direct fetch may fail; for production use a backend solution.
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
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center py-16 bg-background">
      <div className="container mx-auto max-w-5xl px-4">
        <h1 className="text-4xl font-bold gradient-text mb-8 text-center">Flats Available for Sale</h1>
        <p className="text-center text-muted-foreground mb-10">
          Latest availability as per our records.
        </p>

        {/* Plans + Screenshots: 2BHK */}
        <div className="mb-16 bg-card/60 rounded-2xl p-8 shadow-md border border-border">
          <h2 className="text-3xl font-bold mb-2 gradient-text">2BHK Flat Plan</h2>
          <div className="flex flex-col md:flex-row items-start gap-8">
            <img
              src={planImages["2BHK"]}
              alt="2BHK Plan"
              className="rounded-xl shadow-xl w-full md:w-1/2 object-cover"
            />
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">Sample Screenshots</h3>
              {/* Carousel */}
              <ScreenshotCarousel images={screenshotImages["2BHK"]} initialIndex={1} />
            </div>
          </div>
        </div>

        {/* Plans + Screenshots: 3BHK */}
        <div className="mb-16 bg-card/60 rounded-2xl p-8 shadow-md border border-border">
          <h2 className="text-3xl font-bold mb-2 gradient-text">3BHK Flat Plan</h2>
          <div className="flex flex-col md:flex-row items-start gap-8">
            <img
              src={planImages["3BHK"]}
              alt="3BHK Plan"
              className="rounded-xl shadow-xl w-full md:w-1/2 object-cover"
            />
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">Sample Screenshots</h3>
              {/* Carousel */}
              <ScreenshotCarousel images={screenshotImages["3BHK"]} initialIndex={1} />
            </div>
          </div>
        </div>

        {/* Available Flats Table */}
        {/* Loading, error, empty, or table */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="animate-spin w-10 h-10 mb-4 text-primary" />
            <span>Loading flats data...</span>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16 text-destructive">
            <AlertTriangle className="w-8 h-8 mb-2" />
            <span>{error}</span>
          </div>
        ) : flats.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">No flats data available.</div>
        ) : (
          <div className="rounded-lg shadow-lg border border-border overflow-x-auto bg-card">
            <Table>
              <TableCaption>Contact us for the most up-to-date information or to schedule a site visit.</TableCaption>
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
                  <TableRow key={idx} className={flat.status?.toLowerCase().includes("sold") ? "bg-destructive/10" : ""}>
                    <TableCell>{flat.project}</TableCell>
                    <TableCell>{flat.flatNo}</TableCell>
                    <TableCell>{flat.type}</TableCell>
                    <TableCell>{flat.size}</TableCell>
                    <TableCell>{flat.facing}</TableCell>
                    <TableCell>
                      <span className={flat.status?.toLowerCase().includes("sold")
                        ? "text-destructive font-semibold"
                        : "text-green-600 font-semibold"
                      }>
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
  );
};

export default FlatsAvailable;
