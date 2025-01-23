// src/components/NavBar.js
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";

const Navbar = () => {
  const [theme, setTheme] = useState("sunset");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    if (theme === "dim") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "sunset" ? "dim" : "sunset"));
  };

  return (
    <nav className="navbar bg-primary text-secondary p-4 flex justify-between items-center">
      <div className="flex space-x-6">
        <a href="/" className="hover:underline">
          Home
        </a>
        <a href="/products" className="hover:underline">
          Menu
        </a>
        <a href="/cart/cart" className="hover:underline">
          Cart
        </a>
        <a href="/auth/signin" className="hover:underline">
          Sign In
        </a>
      </div>
      <button
        className="themeToggle bg-accent text-base-content px-4 py-2 rounded font-semibold"
        onClick={toggleTheme}
      >
        {theme === "sunset" ? (
          <BsFillSunFill className="w-6 h-6 text-yellow-500" />
        ) : (
          <BsFillMoonFill className="w-6 h-6 text-white" />
        )}
      </button>
    </nav>
  );
};

export default Navbar;
