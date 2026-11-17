import type { MetadataRoute } from "next";

// Makes the site installable. Icons are added once the logo files exist.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Veresies Training Center",
    short_name: "Veresies",
    description: "Guided self-discovery and personal growth.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf8f3",
    theme_color: "#2f5a62",
  };
}
