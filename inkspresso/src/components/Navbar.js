// /components/Navbar.js
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <nav
      className={`p-4 flex justify-between items-center ${
        darkMode
          ? "bg-drabDarkBrown text-sunset"
          : "bg-cornsilk text-darkMossGreen"
      }`}
    >
      <div className="text-xl font-bold">Inkspresso</div>
      <div className="flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/cart">Cart</Link>
        <Link href="/contact">Contact Us</Link>
        <Link href="/auth">Sign In/Sign Up</Link>
      </div>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="p-2 border rounded-full hover:bg-gray-300 dark:hover:bg-gray-600"
      >
        {darkMode ? "🌙" : "☀️"}
      </button>
    </nav>
  );
}
