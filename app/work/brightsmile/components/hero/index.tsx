import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroStats from "./HeroStats";
import HeroVisual from "./HeroVisual";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-28 lg:py-32">
      {/* Background */}
      <HeroBackground />

      {/* Hero Container */}
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-14 sm:gap-16 lg:grid-cols-2 lg:gap-20">

          {/* Left Side */}
          <div>
            <HeroContent />

            <HeroStats />
          </div>

          {/* Right Side */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <HeroVisual />
          </div>

        </div>
      </div>
    </section>
  );
}