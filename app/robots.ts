import { MetadataRoute } from "next";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://wordassassins.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
