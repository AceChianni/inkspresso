// src/components/Hero.js

import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const navigateToMenu = () => {
    navigate("/products");
  };

  return (
    <section
      className="hero bg-cover bg-center h-96 flex justify-center items-center text-center text-white relative"
      style={{ backgroundImage: "url('/coffeeshop.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>{" "}
      {/* Dark overlay for readability */}
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
