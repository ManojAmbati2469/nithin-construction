
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { useSearchParams } from "react-router-dom";
import { parseTableFromHtml, projectDetailsList } from "@/utils/flatsUtils";
import ProjectDetailsSection from "@/components/ProjectDetailsSection";
import FlatCarouselsSection from "@/components/FlatCarouselsSection";
import FlatsTableSection from "@/components/FlatsTableSection";
import CompletedProjectsShowcase from "@/components/CompletedProjectsShowcase";
import { FlatEntry } from "@/utils/flatsUtils";

const FlatsAvailable = () => {
  const [searchParams] = useSearchParams();
  const variant = searchParams.get("variant") === "completed" ? "completed" : "available";

  const [flats, setFlats] = useState<FlatEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (variant === "completed") {
      setLoading(false);
      setFlats([]);
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

  return (
    <>
      <Header />
      <section className="min-h-screen flex flex-col items-center justify-center pt-24 pb-16 bg-background">
        <div className="container mx-auto max-w-5xl px-4">
          <h1 className="text-4xl font-bold gradient-text mb-6 text-center">
            {variant === "completed" ? "Completed Projects" : "Flats Available for Sale"}
          </h1>
          <p className="text-center text-muted-foreground mb-6">
            {variant === "completed"
              ? "Browse our completed projects with a glimpse into their rooms and floor plans."
              : "Latest availability as per our records."
            }
          </p>
          {variant === "completed" ? (
            <CompletedProjectsShowcase />
          ) : (
            <>
              <ProjectDetailsSection />
              <FlatCarouselsSection />
              <FlatsTableSection
                loading={loading}
                error={error}
                variant={variant}
                flats={flats}
              />
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default FlatsAvailable;
