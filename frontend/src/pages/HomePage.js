// src/pages/HomePage.js

import Hero from "../components/Hero";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { useState } from "react";

const HomePage = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Hero />
      <Footer />
    </div>
  );
};

export default HomePage;
