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

import Footer from "@/components/layout/Footer";

/* =====================================================
   HOMEPAGE SEO
===================================================== */

export const metadata: Metadata = {
  title: "Premium Website Design & Development",

  description:
    "Vertex Studio Works creates premium, affordable websites for startups, entrepreneurs, and small businesses. Get a modern, fast, mobile-friendly, and SEO-ready website designed to help your business grow online.",

  keywords: [
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
    "Vertex Studio Works",
  ],

  alternates: {
    canonical: "https://www.vertexstudioworks.com/",
  },

  openGraph: {
    title:
      "Premium Website Design & Development | Vertex Studio Works",

    description:
      "Premium websites at affordable pricing. Modern, fast, mobile-friendly websites built to help businesses grow online.",

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
          "Vertex Studio Works — Premium Website Design & Development",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Premium Website Design & Development | Vertex Studio Works",

    description:
      "Premium websites at affordable pricing for startups, entrepreneurs, and growing businesses.",

    images: ["/vertex-preview.png"],
  },
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
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",

            "@id":
              "https://www.vertexstudioworks.com/#website",

            name: "Vertex Studio Works",

            url: "https://www.vertexstudioworks.com/",

            description:
              "Premium website design and development for startups, entrepreneurs, and growing businesses.",

            publisher: {
              "@id":
                "https://www.vertexstudioworks.com/#organization",
            },

            inLanguage: "en-US",
          }),
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
    </>
  );
}