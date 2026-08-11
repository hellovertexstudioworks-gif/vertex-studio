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

export default function LunaBistroPage() {
  return (
    <>
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