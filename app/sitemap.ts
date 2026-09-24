import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.vertexstudioworks.com";

  return [
    {
      url: baseUrl,
    },

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
  ];
}