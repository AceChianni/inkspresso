// /components/Navbar.js
import { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <nav
      className={`navbar p-4 flex justify-between items-center ${
        theme === "dark"
          ? "bg-[#1a202c] text-white"
          : "bg-[#f4e2b4] text-[#485613]"
      }`}
    >
      {/* Navigation Links */}
      <div className="flex space-x-6">
        <Link href="/" className="link hover:text-[#D27848]">
          Home
        </Link>
        <Link href="/menu" className="link hover:text-[#D27848]">
          Menu
        </Link>
        <Link href="/cart" className="link hover:text-[#D27848]">
          Cart
        </Link>
        <Link href="/contact" className="link hover:text-[#D27848]">
          Contact Us
        </Link>
      </div>

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="p-2 border rounded-full hover:bg-gray-300 dark:hover:bg-gray-600"
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>
    </nav>
  );
};

export default Navbar;
