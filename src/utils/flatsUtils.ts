
export type FlatEntry = {
  project: string;
  flatNo: string;
  type: string;
  size: string;
  facing: string;
  status: string;
};

// Utility to parse table from HTML string
export function parseTableFromHtml(html: string): FlatEntry[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const table = doc.querySelector("table");
  if (!table) return [];

  const rows = Array.from(table.querySelectorAll("tr"));
  const dataRows = rows.slice(1);

  return dataRows.map((row) => {
    const cells = Array.from(row.querySelectorAll("td")).map((el) => el.textContent?.trim() || "");
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

// Project details data (used in both available/completed)
// You can extend these details as needed
export const projectDetailsList = [
  {
    name: "Nithin Residency",
    address: "Plot No. 45, Main Road, Hyderabad, Telangana, India",
    description: "Premium 2BHK & 3BHK Apartments with modern amenities.",
    status: "Ongoing"
  },
  {
    name: "Nithin Heights",
    address: "Survey No. 12/3, Kukatpally, Hyderabad, Telangana, India",
    description: "Spacious 3BHK Apartments in a vibrant community.",
    status: "Completed"
  }
];

// --- Completed Projects Data (For Showcase) ---
export const completedProjectsDetails = [
  {
    name: "RC GreenFields",
    address: "Hitech City Road, Hyderabad",
    description: "Modern gated community with greenery and premium amenities.",
  },
  {
    name: "NC Sunrise",
    address: "Kukatpally, Hyderabad",
    description: "Sun-lit apartments with energy-efficient design and scenic views.",
  },
  {
    name: "RC Diamond",
    address: "Miyapur, Hyderabad",
    description: "Luxury 3BHK apartments featuring top-tier interiors.",
  },
];

// Placeholder: Sample plans for each completed project
export const completedProjectsPlans: Record<string, { label: string; img: string }[]> = {
  "RC GreenFields": [
    { label: "3BHK Floor Plan", img: "https://images.unsplash.com/photo-1439886183900-e79ec0057170?auto=format&fit=crop&w=800&q=80" },
    { label: "Site Layout", img: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&q=80" },
  ],
  "NC Sunrise": [
    { label: "2BHK Layout Plan", img: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80" },
    { label: "Block Plan", img: "https://images.unsplash.com/photo-1441057206919-63d19fac2369?auto=format&fit=crop&w=800&q=80" },
  ],
  "RC Diamond": [
    { label: "Floor Plan", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80" },
    { label: "Overall Layout", img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80" },
  ]
};

// Placeholder: Actual room images for each completed project
export const completedProjectsScreenshots: Record<string, { label: string; img: string }[]> = {
  "RC GreenFields": [
    { label: "Living Room", img: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=800&q=80" },
    { label: "Dining Area", img: "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=800&q=80" },
    { label: "Master Bedroom", img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80" },
  ],
  "NC Sunrise": [
    { label: "Drawing Room", img: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80" },
    { label: "Guest Bedroom", img: "https://images.unsplash.com/photo-1467242040243-dcc2ac1a7295?auto=format&fit=crop&w=800&q=80" },
    { label: "Balcony", img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80" },
  ],
  "RC Diamond": [
    { label: "Hall", img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" },
    { label: "Children's Room", img: "https://images.unsplash.com/photo-1487252665478-49b61b47f302?auto=format&fit=crop&w=800&q=80" },
    { label: "Kitchen", img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80" },
  ]
};

// Carousel images (sample, update for your taste)
export const screenshotImages = {
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
    { label: "Pooja Room", img: "https://images.unsplash.com/photo-1465101069803-c602c69c8a0b?auto=format&fit=crop&w=600&q=80" }
  ]
};

export const planImages: Record<string, { label: string; img: string }[]> = {
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
