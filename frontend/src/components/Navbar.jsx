// /src/components/Navbar.jsx
import { useState, useEffect } from "react";
import Link from "next/link";
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
      {/* Navigation Links */}
      <div className="flex space-x-6">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <Link href="/products" className="hover:underline">
          Menu
        </Link>
        <Link href="/cart/cart" className="hover:underline">
          Cart
        </Link>
        <Link href="/auth/signin" className="hover:underline">
          Sign In
        </Link>
      </div>

      {/* Theme Toggle Button */}
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
