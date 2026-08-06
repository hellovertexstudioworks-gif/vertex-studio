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


export default function Home() {

  return (

    <main className="overflow-x-hidden bg-[#050816]">


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

  );

}