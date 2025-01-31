import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://wordassassins.app";

  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/sign-in`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sign-up`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ] as const;

  return [...staticRoutes];
}
