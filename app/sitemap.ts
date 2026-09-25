import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.vertexstudioworks.com";

  return [
    // Main site
    {
      url: baseUrl,
    },

    // Portfolio
    {
      url: `${baseUrl}/work/brightsmile`,
    },
    {
      url: `${baseUrl}/work/lunabistro`,
    },
    {
      url: `${baseUrl}/work/novahome`,
    },
    {
      url: `${baseUrl}/work/forgebuild`,
    },
    {
      url: `${baseUrl}/work/horizon-realty`,
    },
    {
      url: `${baseUrl}/work/elevate-coaching`,
    },

    // Resources
    {
      url: `${baseUrl}/resources`,
    },
    {
      url: `${baseUrl}/resources/how-much-does-a-business-website-cost-2026`,
    },
    {
      url: `${baseUrl}/resources/what-should-be-included-in-a-business-website`,
    },
    {
      url: `${baseUrl}/resources/website-redesign-signs`,
    },
    {
      url: `${baseUrl}/resources/website-vs-social-media`,
    },
    {
      url: `${baseUrl}/resources/crm-website-integration`,
    },
  ];
}