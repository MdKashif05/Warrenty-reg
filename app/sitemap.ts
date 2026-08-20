import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.thermallexum.com";

  const routes = [
    "",
    "/products",
    "/about",
    "/founder",
    "/contact",
    "/faq",
    "/warranty-terms",
    "/privacy",
    "/terms",
    "/warranty/register",
    "/warranty/lookup",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
