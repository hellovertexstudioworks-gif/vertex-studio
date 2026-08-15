import type { Metadata } from "next";

/* =====================================================
   NOVA HOME SEO
===================================================== */

export const metadata: Metadata = {
  title: "Nova Home Furniture Ecommerce Website",

  description:
    "A premium furniture ecommerce website designed by Vertex Studio Works for Nova Home. The experience focuses on timeless furniture, modern interiors, product presentation, and refined ecommerce design.",

  keywords: [
    "furniture ecommerce website",
    "furniture website design",
    "furniture ecommerce design",
    "ecommerce website design",
    "furniture store website",
    "interior design website",
    "home furniture website",
    "premium ecommerce website",
    "modern ecommerce website",
    "ecommerce web development",
    "Nova Home",
    "Vertex Studio Works",
  ],

  alternates: {
    canonical:
      "https://www.vertexstudioworks.com/work/novahome",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title:
      "Nova Home Furniture Ecommerce Website | Vertex Studio Works",

    description:
      "A refined furniture ecommerce experience built around timeless design, thoughtful product presentation, and modern living.",

    url:
      "https://www.vertexstudioworks.com/work/novahome",

    siteName: "Vertex Studio Works",

    locale: "en_US",

    type: "website",

    images: [
      {
        url: "/projects/ecommerce.png",
        width: 1200,
        height: 630,
        alt:
          "Nova Home furniture ecommerce website designed by Vertex Studio Works",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Nova Home Furniture Ecommerce Website | Vertex Studio Works",

    description:
      "Premium furniture ecommerce website design focused on modern living and thoughtful product presentation.",

    images: ["/projects/ecommerce.png"],
  },
};

/* =====================================================
   NOVA HOME PAGE
===================================================== */

export default function NovaHomePage() {
  return (
    <>
      {/* =====================================================
          STRUCTURED DATA
      ===================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",

            "@type": "CreativeWork",

            name: "Nova Home Furniture Ecommerce Website",

            description:
              "A premium furniture ecommerce website designed by Vertex Studio Works around timeless design, thoughtful product presentation, and modern living.",

            url:
              "https://www.vertexstudioworks.com/work/novahome",

            image:
              "https://www.vertexstudioworks.com/projects/ecommerce.png",

            creator: {
              "@type": "Organization",

              name: "Vertex Studio Works",

              url:
                "https://www.vertexstudioworks.com/",
            },

            about: {
              "@type": "Thing",

              name:
                "Furniture Ecommerce Website Design",
            },
          }),
        }}
      />

      {/* =====================================================
          FULL-SCREEN NOVA HOME WEBSITE
      ===================================================== */}

      <main className="min-h-screen w-full overflow-hidden bg-[#f5f1ea]">

        <iframe
          src="https://nova-home-khaki.vercel.app"
          title="Nova Home Furniture Ecommerce Website"
          className="
            block
            h-screen
            min-h-screen
            w-full
            border-0
          "
          allow="fullscreen"
        />

      </main>
    </>
  );
}