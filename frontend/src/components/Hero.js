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
      className="hero bg-cover bg-center h-screen flex justify-center items-center text-center text-white relative"
      style={{ backgroundImage: "url('/coffeeshop.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative z-10">
        <h2 className="text-5xl font-bold text-sunset">
          Fuel Your Imagination
        </h2>
        <p className="mt-4 text-lg text-sunset">
          Where the coffee is always fresh and the books are always good.
        </p>
        <Button label="Order Now" handleClick={navigateToMenu} />
      </div>
    </section>
  );
};

export default Hero;
