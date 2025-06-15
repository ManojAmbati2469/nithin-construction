
import { useEffect, useState } from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption } from "@/components/ui/table";
import { Loader2, AlertTriangle } from "lucide-react";

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
    <section className="min-h-screen flex items-center justify-center py-20 bg-background">
      <div className="container mx-auto max-w-5xl px-4">
        <h1 className="text-4xl font-bold gradient-text mb-8 text-center">Flats Available for Sale</h1>
        <p className="text-center text-muted-foreground mb-10">
          Latest availability as per our records.
        </p>
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
