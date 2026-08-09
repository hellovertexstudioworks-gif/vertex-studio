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

export default function BrightSmilePage() {
  return (
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
  );
}