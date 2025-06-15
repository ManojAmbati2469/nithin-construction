
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { useSearchParams } from "react-router-dom";
import { parseTableFromHtml, projectDetailsList } from "@/utils/flatsUtils";
import ProjectDetailsSection from "@/components/ProjectDetailsSection";
import FlatCarouselsSection from "@/components/FlatCarouselsSection";
import FlatsTableSection from "@/components/FlatsTableSection";
import CompletedProjectsShowcase from "@/components/CompletedProjectsShowcase";
import { FlatEntry } from "@/utils/flatsUtils";
import { Building, Home } from "lucide-react";

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
      <section className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background pt-24 pb-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Hero Header */}
          <div className="text-center mb-12 space-y-6">
            <div className="flex justify-center mb-6">
              {variant === "completed" ? (
                <div className="p-4 rounded-full bg-green-100 dark:bg-green-900/20">
                  <Building className="w-8 h-8 text-green-600" />
                </div>
              ) : (
                <div className="p-4 rounded-full bg-primary/10">
                  <Home className="w-8 h-8 text-primary" />
                </div>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text">
              {variant === "completed" ? "Completed Projects" : "Flats Available for Sale"}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {variant === "completed"
                ? "Explore our successfully delivered projects showcasing quality construction and satisfied homeowners."
                : "Discover your dream home from our latest collection of premium apartments with modern amenities."
              }
            </p>
            {variant === "available" && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Live Availability
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="space-y-12">
            {variant === "completed" ? (
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 md:p-8 shadow-xl">
                <CompletedProjectsShowcase />
              </div>
            ) : (
              <>
                {/* Project Details */}
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 md:p-8 shadow-xl">
                  <div className="mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-2">Our Projects</h2>
                    <p className="text-muted-foreground">Premium residential developments in prime locations</p>
                  </div>
                  <ProjectDetailsSection />
                </div>

                {/* Floor Plans & Samples */}
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 md:p-8 shadow-xl">
                  <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-2">Floor Plans & Interior Samples</h2>
                    <p className="text-muted-foreground">Explore our thoughtfully designed spaces and premium finishes</p>
                  </div>
                  <FlatCarouselsSection />
                </div>

                {/* Availability Table */}
                {/* <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 md:p-8 shadow-xl">
                  <div className="mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-2">Current Availability</h2>
                    <p className="text-muted-foreground">Real-time status of available units - Updated regularly</p>
                  </div>
                  <FlatsTableSection
                    loading={loading}
                    error={error}
                    variant={variant}
                    flats={flats}
                  />
                </div> */}
              </>
            )}
          </div>

          {/* Call to Action */}
          {/* <div className="mt-16 text-center">
            <div className="bg-gradient-construction rounded-2xl p-8 md:p-12 text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                {variant === "completed" ? "Ready for Your Next Home?" : "Ready to Visit?"}
              </h3>
              <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
                {variant === "completed" 
                  ? "Contact us to learn about our upcoming projects and be the first to know about new launches."
                  : "Schedule a site visit to experience the quality and craftsmanship of our constructions firsthand."
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-3 bg-white text-primary font-semibold rounded-xl hover:bg-gray-100 transition-colors">
                  Contact Us
                </button>
                <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-colors">
                  {variant === "completed" ? "View New Projects" : "Schedule Visit"}
                </button>
              </div>
            </div>
          </div> */}
        </div>
      </section>
    </>
  );
};

export default FlatsAvailable;
