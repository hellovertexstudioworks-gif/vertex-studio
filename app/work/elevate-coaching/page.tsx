import type { Metadata } from "next";

import Navbar from "./components/layout/Navbar";

import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Programs from "./components/sections/Programs";
import Process from "./components/sections/Process";
import Results from "./components/sections/Results";
import Testimonials from "./components/sections/Testimonials";
import FAQ from "./components/sections/FAQ";
import Contact from "./components/sections/Contact";

import Footer from "./components/layout/Footer";

/* =====================================================
   ELEVATE COACHING SEO
===================================================== */

export const metadata: Metadata = {
  title: "Elevate Coaching Website Design",

  description:
    "A premium coaching website designed by Vertex Studio Works to build trust, communicate personal growth programs, showcase results, and turn visitors into potential clients.",

  keywords: [
    "coaching website design",
    "coach website design",
    "life coach website",
    "business coach website",
    "personal development website",
    "coaching website development",
    "personal growth website",
    "coach landing page",
    "coaching business website",
    "professional coaching website",
    "Elevate Coaching",
    "Vertex Studio Works",
  ],

  alternates: {
    canonical:
      "https://www.vertexstudioworks.com/work/elevate-coaching",
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
      "Elevate Coaching Website | Vertex Studio Works",

    description:
      "A premium coaching website designed around personal growth, trust, programs, results, and client conversion.",

    url:
      "https://www.vertexstudioworks.com/work/elevate-coaching",

    siteName: "Vertex Studio Works",

    locale: "en_US",

    type: "website",

    images: [
      {
        url: "/projects/elevate.png",
        width: 1200,
        height: 630,
        alt:
          "Elevate Coaching website designed by Vertex Studio Works",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Elevate Coaching Website | Vertex Studio Works",

    description:
      "Premium coaching website design focused on trust, personal growth, programs, and client conversion.",

    images: ["/projects/elevate.png"],
  },
};

/* =====================================================
   ELEVATE COACHING STRUCTURED DATA
===================================================== */

const structuredData = {
  "@context": "https://schema.org",

  "@type": "CreativeWork",

  name: "Elevate Coaching Website",

  description:
    "A premium coaching website designed by Vertex Studio Works to build trust, communicate personal growth programs, showcase results, and turn visitors into potential clients.",

  url:
    "https://www.vertexstudioworks.com/work/elevate-coaching",

  image:
    "https://www.vertexstudioworks.com/projects/elevate.png",

  creator: {
    "@type": "Organization",

    name: "Vertex Studio Works",

    url:
      "https://www.vertexstudioworks.com/",
  },

  about: {
    "@type": "Thing",

    name: "Coaching Website Design",
  },
};

/* =====================================================
   ELEVATE COACHING PAGE
===================================================== */

export default function ElevateCoachingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div className="min-h-screen overflow-x-hidden bg-[#f4f0e9]">
        <Navbar />

        <main>
          <Hero />

          <About />

          <Programs />

          <Process />

          <Results />

          <Testimonials />

          <FAQ />

          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
}