// src/components/Hero.jsx

import Button from "./Button";
import { useRouter } from "next/router";

const HeroSection = () => {
  const router = useRouter();

  const navigateToMenu = () => {
    router.push("/products"); //
  };

  return (
    <section
      className="hero bg-cover bg-center h-96 flex justify-center items-center text-center text-white relative"
      style={{ backgroundImage: "url(/coffeeshop.jpg)" }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative z-10">
        <h2 className="text-4xl font-bold">Fuel Your Imagination</h2>
        <p className="mt-4 text-lg">
          Where the coffee is always fresh and the books are always good.
        </p>
        <Button label="Order Now" handleClick={navigateToMenu} />
      </div>
    </section>
  );
};

export default Hero;
