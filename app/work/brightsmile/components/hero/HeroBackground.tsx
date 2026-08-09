export default function HeroBackground() {
  return (
    <>
      {/* Main Blue Glow */}
      <div
        className="
          absolute
          left-1/2
          top-0
          -z-10
          h-[420px]
          w-[420px]
          -translate-x-1/2
          rounded-full
          bg-blue-400/10
          blur-[120px]
          sm:h-[520px]
          sm:w-[520px]
          sm:bg-blue-400/12
          lg:h-[700px]
          lg:w-[700px]
          lg:bg-blue-400/15
          lg:blur-[150px]
        "
      />

      {/* Left Glow */}
      <div
        className="
          absolute
          -left-40
          top-32
          -z-10
          h-80
          w-80
          rounded-full
          bg-cyan-300/10
          blur-[120px]
          sm:h-96
          sm:w-96
          sm:bg-cyan-300/15
          sm:blur-[140px]
        "
      />

      {/* Right Glow */}
      <div
        className="
          absolute
          -right-40
          bottom-0
          -z-10
          h-96
          w-96
          rounded-full
          bg-blue-500/8
          blur-[140px]
          sm:h-[450px]
          sm:w-[450px]
          sm:bg-blue-500/10
          sm:blur-[160px]
        "
      />

      {/* Decorative Circles */}

      <div
        className="
          absolute
          left-10
          top-32
          h-3
          w-3
          rounded-full
          bg-blue-500/15
          sm:left-24
          sm:top-44
          sm:h-5
          sm:w-5
          sm:bg-blue-500/20
        "
      />

      <div
        className="
          absolute
          right-10
          top-44
          h-2
          w-2
          rounded-full
          bg-cyan-400/20
          sm:right-28
          sm:top-52
          sm:h-3
          sm:w-3
          sm:bg-cyan-400/30
        "
      />

      <div
        className="
          absolute
          bottom-24
          left-1/4
          h-4
          w-4
          rounded-full
          bg-blue-400/10
          sm:h-6
          sm:w-6
          sm:bg-blue-400/15
        "
      />

      {/* Grid Pattern */}
      <div
        className="
          absolute
          inset-0
          -z-10
          opacity-[0.02]
          sm:opacity-[0.03]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              #2563eb 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              #2563eb 1px,
              transparent 1px
            )
          `,
          backgroundSize: "70px 70px",
        }}
      />

      {/* Bottom Fade */}
      <div
        className="
          absolute
          bottom-0
          left-0
          h-32
          w-full
          bg-gradient-to-t
          from-white
          to-transparent
          sm:h-40
        "
      />
    </>
  );
}