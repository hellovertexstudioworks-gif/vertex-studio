import type { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";
import ShowcaseHeader from "./components/ShowcaseHeader";
import ProjectOverview from "./components/ProjectOverview";
import Hero from "./components/hero";
import Trust from "./components/Trust";
import Services from "./components/Services";
import About from "./components/About";
import WhyChooseUs from "./components/WhyChooseUs";
import Doctors from "./components/Doctors";
import Testimonials from "./components/Testimonials";
import Gallery from "./components/Gallery";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

/* =====================================================
   BRIGHTSMILE SEO
===================================================== */

export const metadata: Metadata = {
  title: "BrightSmile Dental Website Design",

  description:
    "A modern dental website designed by Vertex Studio Works for BrightSmile Dental. The website focuses on patient trust, dental services, professional presentation, and convenient appointment booking.",

  keywords: [
    "dental website design",
    "dentist website design",
    "dental clinic website",
    "healthcare website design",
    "dentist website development",
    "dental appointment website",
    "medical website design",
    "BrightSmile Dental",
    "Vertex Studio Works",
    "custom healthcare website",
  ],

  alternates: {
    canonical:
      "https://www.vertexstudioworks.com/work/brightsmile",
  },

  openGraph: {
    title:
      "BrightSmile Dental Website | Vertex Studio Works",

    description:
      "A modern dental website designed to build patient trust, showcase services, and make appointments easier.",

    url:
      "https://www.vertexstudioworks.com/work/brightsmile",

    siteName: "Vertex Studio Works",

    locale: "en_US",

    type: "website",

    images: [
      {
        url: "/projects/clinic.png",
        width: 1200,
        height: 630,
        alt:
          "BrightSmile Dental Website designed by Vertex Studio Works",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "BrightSmile Dental Website | Vertex Studio Works",

    description:
      "Modern dental website design focused on trust, services, and appointment booking.",

    images: ["/projects/clinic.png"],
  },
};

/* =====================================================
   BRIGHTSMILE PAGE
===================================================== */

export default function BrightSmilePage() {
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

            name: "BrightSmile Dental Website",

            description:
              "A modern dental website designed by Vertex Studio Works with a focus on patient trust, dental services, professional presentation, and convenient appointment booking.",

            url:
              "https://www.vertexstudioworks.com/work/brightsmile",

            image:
              "https://www.vertexstudioworks.com/projects/clinic.png",

            creator: {
              "@type": "Organization",

              name: "Vertex Studio Works",

              url:
                "https://www.vertexstudioworks.com/",
            },

            about: {
              "@type": "Thing",

              name: "Dental Website Design",
            },
          }),
        }}
      />

      <main className="min-h-screen overflow-x-hidden bg-white">

        {/* ORIGINAL VERTEX NAVBAR */}
        <Navbar />

        {/* BRIGHTSMILE PORTFOLIO BAR */}
        <ShowcaseHeader />

        {/* PROJECT OVERVIEW */}
        <ProjectOverview />

        {/* BRIGHTSMILE WEBSITE */}
        <Hero />

        <Trust />

        <Services />

        <About />

        <WhyChooseUs />

        <Doctors />

        <Testimonials />

        <Gallery />

        <CTA />

        {/* BRIGHTSMILE FOOTER */}
        <Footer />

      </main>
    </>
  );
}