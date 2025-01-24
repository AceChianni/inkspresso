// /pages/_app.js

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState("sunset");
  const router = useRouter();

  // Load theme from localStorage or fallback to light
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "sunset";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "sunset" ? "dim" : "sunset";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div
      className={`main-container ${
        theme === "dim"
          ? "bg-base-dark text-base-content-dark"
          : "bg-base-100 text-base-content"
      }`}
      data-theme={theme}
    >
      <Navbar toggleTheme={toggleTheme} theme={theme} />
      <main className="pt-20">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}

export default MyApp;
