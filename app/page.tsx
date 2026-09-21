import type { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";

import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import WhyChoose from "@/components/sections/WhyChoose";
import Process from "@/components/sections/Process";
import Expect from "@/components/sections/Expect";
import Pricing from "@/components/sections/Pricing";
import Contact from "@/components/sections/Contact";
import Chatbot from "@/components/sections/Chatbot";

import Footer from "@/components/layout/Footer";

/* =====================================================
   HOMEPAGE SEO
===================================================== */

export const metadata: Metadata = {
  title: "Websites, E-Commerce & Business Systems",

  description:
    "Vertex Studio Works builds modern websites, e-commerce experiences, and custom business systems for startups, entrepreneurs, and growing businesses. Designed for growth and built around your business.",

  keywords: [
    "Vertex Studio Works",
    "Vertex Studio",

    // Websites
    "website design",
    "website development",
    "custom website design",
    "affordable website design",
    "small business website",
    "professional website design",
    "business website design",
    "SEO website design",
    "modern website design",
    "custom web development",
    "website design Philippines",

    // E-Commerce
    "e-commerce website design",
    "ecommerce development",
    "online store development",
    "e-commerce development",
    "custom online store",

    // Business Systems
    "business systems",
    "custom business systems",
    "digital business solutions",
    "custom web solutions",
    "business automation",

    // Growth
    "digital growth",
    "business growth",
    "marketing automation",
    "website maintenance",
    "website care",
  ],

  alternates: {
    canonical: "https://www.vertexstudioworks.com/",
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
      "Vertex Studio Works | Websites, E-Commerce & Business Systems",

    description:
      "Modern websites, e-commerce experiences, and custom business systems built around your business and designed for growth.",

    url: "https://www.vertexstudioworks.com/",

    siteName: "Vertex Studio Works",

    locale: "en_US",

    type: "website",

    images: [
      {
        url: "/vertex-preview.png",
        width: 1536,
        height: 1024,
        alt:
          "Vertex Studio Works — Websites, E-Commerce & Business Systems",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Vertex Studio Works | Websites, E-Commerce & Business Systems",

    description:
      "Modern websites, e-commerce experiences, and custom business systems built for growing businesses.",

    images: ["/vertex-preview.png"],
  },
};

/* =====================================================
   HOMEPAGE STRUCTURED DATA
===================================================== */

const structuredData = {
  "@context": "https://schema.org",

  "@graph": [
    {
      "@type": "Organization",

      "@id":
        "https://www.vertexstudioworks.com/#organization",

      name: "Vertex Studio Works",

      url:
        "https://www.vertexstudioworks.com/",

      logo:
        "https://www.vertexstudioworks.com/icon.png",

      description:
        "Vertex Studio Works builds modern websites, e-commerce experiences, and custom business systems for startups, entrepreneurs, and growing businesses.",

      image:
        "https://www.vertexstudioworks.com/vertex-preview.png",

      knowsAbout: [
        "Website Design",
        "Web Development",
        "E-Commerce",
        "Business Systems",
        "Digital Growth",
        "Marketing Automation",
        "Website Maintenance",
      ],
    },

    {
      "@type": "WebSite",

      "@id":
        "https://www.vertexstudioworks.com/#website",

      name: "Vertex Studio Works",

      url:
        "https://www.vertexstudioworks.com/",

      description:
        "Modern websites, e-commerce experiences, and custom business systems built for startups, entrepreneurs, and growing businesses.",

      publisher: {
        "@id":
          "https://www.vertexstudioworks.com/#organization",
      },

      inLanguage: "en-US",
    },

    {
      "@type": "WebPage",

      "@id":
        "https://www.vertexstudioworks.com/#webpage",

      url:
        "https://www.vertexstudioworks.com/",

      name:
        "Vertex Studio Works | Websites, E-Commerce & Business Systems",

      description:
        "Modern websites, e-commerce experiences, and custom business systems designed to help businesses launch, grow, and evolve.",

      isPartOf: {
        "@id":
          "https://www.vertexstudioworks.com/#website",
      },

      about: {
        "@id":
          "https://www.vertexstudioworks.com/#organization",
      },

      inLanguage: "en-US",
    },
  ],
};

/* =====================================================
   HOMEPAGE
===================================================== */

export default function Home() {
  return (
    <>
      {/* =====================================================
          WEBSITE STRUCTURED DATA
      ===================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <main
        id="main-content"
        className="overflow-x-hidden bg-[#050816]"
      >
        <Navbar />

        <Hero />

        <About />

        <Services />

        <Portfolio />

        <WhyChoose />

        <Process />

        <Expect />

        <Pricing />

        <Contact />

        <Footer />
      </main>

      {/* =====================================================
          VERTEX ASSISTANT
      ===================================================== */}

      <Chatbot />
    </>
  );
}