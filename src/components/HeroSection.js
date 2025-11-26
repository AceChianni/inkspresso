// /src/components/HeroSection.js

import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      className="relative min-h-[55vh] w-full bg-cover bg-center flex items-center justify-center text-center px-6"
      style={{ backgroundImage: "url('/inkspresso.png')" }}
    >
      {/* Soft dark overlay for readability */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>

      <div className="relative px-4 py-6">
        <h1 className="font-heading text-4xl md:text-5xl text-[#F3EFE8] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
          Fuel Your Imagination
        </h1>

        <p className="font-body text-[#E8E2D9] text-base md:text-lg mt-3 max-w-lg mx-auto drop-shadow-[0_2px_3px_rgba(0,0,0,0.55)]">
          Where stories are sipped, crafted, and savored.
        </p>

        <Link
          href="/products"
          className="inline-block btn rounded-full normal-case px-8 mt-6 bg-[#a5713d] text-[#F5F1EB] hover:bg-[#3F2F22] transition"
        >
          Browse Menu
        </Link>
      </div>
    </section>
  );
}
