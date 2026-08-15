import type { Metadata } from "next";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Hero from "./components/sections/Hero";
import Trust from "./components/sections/Trust";
import About from "./components/sections/About";
import Services from "./components/sections/Services";
import Projects from "./components/sections/Projects";
import WhyChooseUs from "./components/sections/WhyChooseUs";
import Testimonials from "./components/sections/Testimonials";
import CTA from "./components/sections/CTA";
import Contact from "./components/sections/Contact";

/* =====================================================
   FORGEBUILD SEO
===================================================== */

export const metadata: Metadata = {
  title: "ForgeBuild Construction Website Design",

  description:
    "A professional construction website designed by Vertex Studio Works for ForgeBuild. The experience focuses on project presentation, credibility, construction services, and generating qualified business inquiries.",

  keywords: [
    "construction website design",
    "construction company website",
    "construction website development",
    "contractor website design",
    "builder website design",
    "construction business website",
    "construction company web design",
    "contractor website development",
    "professional construction website",
    "construction lead generation website",
    "ForgeBuild Construction",
    "Vertex Studio Works",
  ],

  alternates: {
    canonical:
      "https://www.vertexstudioworks.com/work/forgebuild",
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
      "ForgeBuild Construction Website | Vertex Studio Works",

    description:
      "A professional construction website designed to showcase projects, establish credibility, and generate qualified business inquiries.",

    url:
      "https://www.vertexstudioworks.com/work/forgebuild",

    siteName: "Vertex Studio Works",

    locale: "en_US",

    type: "website",

    images: [
      {
        url: "/projects/construction.png",
        width: 1200,
        height: 630,
        alt:
          "ForgeBuild Construction website designed by Vertex Studio Works",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "ForgeBuild Construction Website | Vertex Studio Works",

    description:
      "Professional construction website design focused on projects, credibility, services, and business inquiries.",

    images: ["/projects/construction.png"],
  },
};

/* =====================================================
   FORGEBUILD PAGE
===================================================== */

export default function Home() {
  return (
    <>
      {/* =====================================================
          FORGEBUILD STRUCTURED DATA
      ===================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",

            "@type": "CreativeWork",

            name: "ForgeBuild Construction Website",

            description:
              "A professional construction website designed by Vertex Studio Works to showcase projects, establish credibility, present construction services, and generate qualified business inquiries.",

            url:
              "https://www.vertexstudioworks.com/work/forgebuild",

            image:
              "https://www.vertexstudioworks.com/projects/construction.png",

            creator: {
              "@type": "Organization",

              name: "Vertex Studio Works",

              url:
                "https://www.vertexstudioworks.com/",
            },

            about: {
              "@type": "Thing",

              name: "Construction Website Design",
            },
          }),
        }}
      />

      <main className="overflow-x-hidden">
        <Navbar />

        <Hero />

        <Trust />

        <About />

        <Services />

        <Projects />

        <WhyChooseUs />

        <Testimonials />

        <CTA />

        <Contact />

        <Footer />
      </main>
    </>
  );
}