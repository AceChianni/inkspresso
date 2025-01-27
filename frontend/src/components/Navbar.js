// /components/Navbar.js
import { useState, useEffect } from "react";
import Link from "next/link";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import styles from "../styles/bars.module.css";

const Navbar = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.body.classList.add(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.classList.remove(theme);
    document.body.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContent}>
        <div className={styles.brand}>Inkspresso</div>
        <div className={styles.navLinks}>
          {[
            "Home",
            "About",
            "Menu",
            "Cart",
            "Contact Us",
            "Sign In/Sign Up",
          ].map((item, idx) => (
            <Link
              key={idx}
              href={
                item === "Home"
                  ? "/"
                  : `/${item.toLowerCase().replace(/ /g, "")}`
              }
              className={styles.navLink}
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Theme Toggle Button */}
        <button
          className="themeToggle bg-accent text-base-content px-4 py-2 rounded font-semibold"
          onClick={toggleTheme}
        >
          {theme === "light" ? (
            <BsFillSunFill className="w-6 h-6 text-yellow-500" />
          ) : (
            <BsFillMoonFill className="w-6 h-6 text-white" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
