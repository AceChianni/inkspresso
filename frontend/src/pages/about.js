// /pages/about.js
import Image from "next/image";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      {/* Hero Section */}
      <div className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center">
        <Image
          src="/coffee-books-hero.jpg"
          alt="Cozy bookstore coffee shop"
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
        <div className="absolute bg-black bg-opacity-50 text-white text-center p-4 rounded-md">
          <h1 className="text-3xl md:text-5xl font-semibold">About Inkspresso</h1>
          <p className="text-lg md:text-xl mt-2">Where books & coffee create magic</p>
        </div>
      </div>

      {/* About Content */}
      <div className="max-w-3xl text-center mt-12">
        <h2 className="text-2xl font-semibold text-emerald-600">Our Story</h2>
        <p className="mt-4 text-[#AF7B3A]-500 dark:text-gray-300">
          Inkspresso was born from a love of coffee and literature, designed to be a cozy
          retreat where book lovers and coffee enthusiasts can come together.
          Whether you're here for a quiet reading nook, a great cup of coffee, or a bit of both,
          Inkspresso is a place to indulge in stories and flavors.
        </p>
      </div>

      {/* Values Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl text-center">
        {[
          { title: "Quality Coffee", desc: "Only the finest, ethically sourced beans." },
          { title: "Community", desc: "A space to share, learn, and create." },
          { title: "Sustainability", desc: "Eco-friendly practices for a better future." },
        ].map((item, idx) => (
          <div key={idx} className="p-6 bg-white dark:bg-gray-800 rounded-md shadow-md">
            <h3 className="text-xl font-semibold text-emerald-600">{item.title}</h3>
            <p className="mt-2 text-gray-700 dark:text-gray-300">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
