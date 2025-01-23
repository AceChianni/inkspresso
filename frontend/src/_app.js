// pages/_app.js
import { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import "../styles/globals.css";
import "../styles/tailwind.css";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  // Toggle theme between light and dark modes
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <div
        className={`main-container ${
          theme === "dark"
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
    </ThemeProvider>
  );
}

export default MyApp;
