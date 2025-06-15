
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
export const projectDetailsList = [
  {
    name: "Nithin Residency",
    address: "Plot No. 45, Main Road, Hyderabad, Telangana, India",
    description: "Premium 2BHK & 3BHK Apartments with modern amenities and thoughtful design.",
    status: "Ongoing"
  },
  {
    name: "Nithin Heights",
    address: "Survey No. 12/3, Kukatpally, Hyderabad, Telangana, India",
    description: "Spacious 3BHK Apartments in a vibrant community with excellent connectivity.",
    status: "Completed"
  }
];

// --- Completed Projects Data (For Showcase) ---
export const completedProjectsDetails = [
  {
    name: "RC GreenFields",
    address: "Hitech City Road, Hyderabad",
    description: "Modern gated community with abundant greenery, premium amenities, and eco-friendly construction practices.",
  },
  {
    name: "NC Sunrise",
    address: "Kukatpally, Hyderabad",
    description: "Sun-lit apartments featuring energy-efficient design, scenic views, and contemporary architecture.",
  },
  {
    name: "RC Diamond",
    address: "Miyapur, Hyderabad",
    description: "Luxury 3BHK apartments with top-tier interiors, modern fixtures, and premium location.",
  },
];

// Construction-themed plans for each completed project
export const completedProjectsPlans: Record<string, { label: string; img: string }[]> = {
  "RC GreenFields": [
    { label: "3BHK Floor Plan", img: "https://images.unsplash.com/photo-1439337153520-7082a56a81f4?auto=format&fit=crop&w=800&q=80" },
    { label: "Site Master Plan", img: "https://images.unsplash.com/photo-1497604401993-f2e922e5cb0a?auto=format&fit=crop&w=800&q=80" },
    { label: "Building Elevation", img: "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?auto=format&fit=crop&w=800&q=80" },
  ],
  "NC Sunrise": [
    { label: "2BHK Layout Plan", img: "https://images.unsplash.com/photo-1460574283810-2aab119d8511?auto=format&fit=crop&w=800&q=80" },
    { label: "Block Layout", img: "https://images.unsplash.com/photo-1431576901776-e539bd916ba2?auto=format&fit=crop&w=800&q=80" },
    { label: "Site Development Plan", img: "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?auto=format&fit=crop&w=800&q=80" },
  ],
  "RC Diamond": [
    { label: "Luxury Floor Plan", img: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&w=800&q=80" },
    { label: "Overall Development", img: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800&q=80" },
    { label: "Construction Plan", img: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=800&q=80" },
  ]
};

// High-quality interior room images for each completed project
export const completedProjectsScreenshots: Record<string, { label: string; img: string }[]> = {
  "RC GreenFields": [
    { label: "Spacious Living Room", img: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=800&q=80" },
    { label: "Modern Dining Area", img: "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=800&q=80" },
    { label: "Master Bedroom Suite", img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80" },
    { label: "Premium Kitchen", img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80" },
  ],
  "NC Sunrise": [
    { label: "Bright Drawing Room", img: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80" },
    { label: "Comfortable Guest Bedroom", img: "https://images.unsplash.com/photo-1467242040243-dcc2ac1a7295?auto=format&fit=crop&w=800&q=80" },
    { label: "Scenic Balcony View", img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80" },
    { label: "Modern Bathroom", img: "https://images.unsplash.com/photo-1549187774-b4e9b0445b06?auto=format&fit=crop&w=800&q=80" },
  ],
  "RC Diamond": [
    { label: "Elegant Hall", img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" },
    { label: "Children's Bedroom", img: "https://images.unsplash.com/photo-1487252665478-49b61b47f302?auto=format&fit=crop&w=800&q=80" },
    { label: "Designer Kitchen", img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80" },
    { label: "Study Room", img: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=800&q=80" },
  ]
};

// Sample interior images for available flats
export const screenshotImages = {
  "2BHK": [
    { label: "Living Room", img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80" },
    { label: "Master Bedroom", img: "https://images.unsplash.com/photo-1465101178521-c1a9136a3fd4?auto=format&fit=crop&w=600&q=80" },
    { label: "Modern Kitchen", img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80" },
    { label: "Balcony View", img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80" },
    { label: "Dining Space", img: "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=600&q=80" },
    { label: "Bathroom", img: "https://images.unsplash.com/photo-1549187774-b4e9b0445b06?auto=format&fit=crop&w=600&q=80" },
    { label: "Kids Room", img: "https://images.unsplash.com/photo-1487252665478-49b61b47f302?auto=format&fit=crop&w=600&q=80" },
    { label: "Study Corner", img: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=600&q=80" }
  ],
  "3BHK": [
    { label: "Spacious Living Room", img: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80" },
    { label: "Master Bedroom", img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80" },
    { label: "Premium Kitchen", img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80" },
    { label: "Large Balcony", img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80" },
    { label: "Formal Dining", img: "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=600&q=80" },
    { label: "Guest Bathroom", img: "https://images.unsplash.com/photo-1465101178521-c1a9136a3fd4?auto=format&fit=crop&w=600&q=80" },
    { label: "Guest Bedroom", img: "https://images.unsplash.com/photo-1467242040243-dcc2ac1a7295?auto=format&fit=crop&w=600&q=80" },
    { label: "Pooja Room", img: "https://images.unsplash.com/photo-1465101069803-c602c69c8a0b?auto=format&fit=crop&w=600&q=80" }
  ]
};

// Construction and architectural plan images
export const planImages: Record<string, { label: string; img: string }[]> = {
  "2BHK": [
    { label: "2BHK Floor Plan", img: "https://images.unsplash.com/photo-1439337153520-7082a56a81f4?auto=format&fit=crop&w=800&q=80" },
    { label: "Layout Design", img: "https://images.unsplash.com/photo-1497604401993-f2e922e5cb0a?auto=format&fit=crop&w=800&q=80" },
    { label: "Building Section", img: "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?auto=format&fit=crop&w=800&q=80" }
  ],
  "3BHK": [
    { label: "3BHK Floor Plan", img: "https://images.unsplash.com/photo-1460574283810-2aab119d8511?auto=format&fit=crop&w=800&q=80" },
    { label: "Detailed Layout", img: "https://images.unsplash.com/photo-1431576901776-e539bd916ba2?auto=format&fit=crop&w=800&q=80" },
    { label: "Architectural Plan", img: "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?auto=format&fit=crop&w=800&q=80" }
  ]
};
