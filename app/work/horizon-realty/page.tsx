import type { Metadata } from "next";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Hero from "./components/sections/Hero";
import FeaturedProperties from "./components/sections/FeaturedProperties";
import About from "./components/sections/About";
import Services from "./components/sections/Services";
import Agents from "./components/sections/Agents";
import Testimonials from "./components/sections/Testimonials";
import Contact from "./components/sections/Contact";

/* =====================================================
   HORIZON REALTY SEO
===================================================== */

export const metadata: Metadata = {
  title: "Horizon Realty Real Estate Website Design",

  description:
    "A premium real estate website designed by Vertex Studio Works for Horizon Realty. The experience focuses on luxury properties, property discovery, professional service, and high-end visual presentation.",

  keywords: [
    "real estate website design",
    "real estate website development",
    "real estate company website",
    "realtor website design",
    "real estate web design",
    "property website design",
    "real estate listing website",
    "luxury real estate website",
    "real estate agent website",
    "real estate business website",
    "Horizon Realty",
    "Vertex Studio Works",
  ],

  alternates: {
    canonical:
      "https://www.vertexstudioworks.com/work/horizon-realty",
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
      "Horizon Realty Real Estate Website | Vertex Studio Works",

    description:
      "A premium real estate experience designed around luxury properties, thoughtful service, property discovery, and high-end visual storytelling.",

    url:
      "https://www.vertexstudioworks.com/work/horizon-realty",

    siteName: "Vertex Studio Works",

    locale: "en_US",

    type: "website",

    images: [
      {
        url: "/projects/realestate.png",
        width: 1200,
        height: 630,
        alt:
          "Horizon Realty real estate website designed by Vertex Studio Works",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Horizon Realty Real Estate Website | Vertex Studio Works",

    description:
      "Premium real estate website design focused on luxury properties, discovery, service, and visual presentation.",

    images: ["/projects/realestate.png"],
  },
};

/* =====================================================
   HORIZON REALTY STRUCTURED DATA
===================================================== */

const structuredData = {
  "@context": "https://schema.org",

  "@type": "CreativeWork",

  name: "Horizon Realty Real Estate Website",

  description:
    "A premium real estate website designed by Vertex Studio Works around luxury properties, property discovery, professional service, and high-end visual storytelling.",

  url:
    "https://www.vertexstudioworks.com/work/horizon-realty",

  image:
    "https://www.vertexstudioworks.com/projects/realestate.png",

  creator: {
    "@type": "Organization",

    name: "Vertex Studio Works",

    url:
      "https://www.vertexstudioworks.com/",
  },

  about: {
    "@type": "Thing",

    name: "Real Estate Website Design",
  },
};

/* =====================================================
   HORIZON REALTY PAGE
===================================================== */

export default function HorizonRealtyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <main className="bg-[#F2F3EF]">
        <Navbar />

        <Hero />

        <FeaturedProperties />

        <About />

        <Services />

        <Agents />

        <Testimonials />

        <Contact />

        <Footer />
      </main>
    </>
  );
}