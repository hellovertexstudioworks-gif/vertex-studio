import type { Metadata } from "next";

import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import Story from "./components/sections/Story";
import Menu from "./components/sections/Menu";
import SignatureDishes from "./components/sections/SignatureDishes";
import Experience from "./components/sections/Experience";
import Gallery from "./components/sections/Gallery";
import Testimonials from "./components/sections/Testimonials";
import Reservation from "./components/sections/Reservation";
import Contact from "./components/sections/Contact";
import Footer from "./components/layout/Footer";

/* =====================================================
   LUNA BISTRO SEO
===================================================== */

export const metadata: Metadata = {
  title: "Luna Bistro Restaurant Website Design",

  description:
    "A premium restaurant website designed by Vertex Studio Works for Luna Bistro. The experience combines elegant dining, seasonal cuisine, restaurant storytelling, menu presentation, and table reservations.",

  keywords: [
    "restaurant website design",
    "restaurant website development",
    "restaurant web design",
    "restaurant website",
    "restaurant reservation website",
    "fine dining website",
    "restaurant branding website",
    "restaurant menu website",
    "hospitality website design",
    "premium restaurant website",
    "Luna Bistro",
    "Vertex Studio Works",
  ],

  alternates: {
    canonical:
      "https://www.vertexstudioworks.com/work/lunabistro",
  },

  openGraph: {
    title:
      "Luna Bistro Restaurant Website | Vertex Studio Works",

    description:
      "A premium restaurant website designed around elegant dining, seasonal cuisine, storytelling, menu presentation, and reservations.",

    url:
      "https://www.vertexstudioworks.com/work/lunabistro",

    siteName: "Vertex Studio Works",

    locale: "en_US",

    type: "website",

    images: [
      {
        url: "/projects/restaurant.png",
        width: 1200,
        height: 630,
        alt:
          "Luna Bistro Restaurant Website designed by Vertex Studio Works",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Luna Bistro Restaurant Website | Vertex Studio Works",

    description:
      "Premium restaurant website design focused on dining, storytelling, menu presentation, and reservations.",

    images: ["/projects/restaurant.png"],
  },
};

/* =====================================================
   LUNA BISTRO PAGE
===================================================== */

export default function LunaBistroPage() {
  return (
    <>
      {/* =====================================================
          PROJECT STRUCTURED DATA
      ===================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",

            "@type": "CreativeWork",

            name: "Luna Bistro Restaurant Website",

            description:
              "A premium restaurant website designed by Vertex Studio Works around elegant dining, seasonal cuisine, storytelling, menu presentation, and table reservations.",

            url:
              "https://www.vertexstudioworks.com/work/lunabistro",

            image:
              "https://www.vertexstudioworks.com/projects/restaurant.png",

            creator: {
              "@type": "Organization",

              name: "Vertex Studio Works",

              url:
                "https://www.vertexstudioworks.com/",
            },

            about: {
              "@type": "Thing",

              name: "Restaurant Website Design",
            },
          }),
        }}
      />

      <Navbar />

      <main>
        <Hero />

        <Story />

        <Menu />

        <SignatureDishes />

        <Experience />

        <Gallery />

        <Testimonials />

        <Reservation />

        <Contact />
      </main>

      <Footer />
    </>
  );
}