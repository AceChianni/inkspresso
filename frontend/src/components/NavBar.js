// components/NavBar.js
import Link from "next/link";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";

const Navbar = ({ theme, toggleTheme }) => {
  return (
    <nav className="navbar bg-copper text-cornsilk p-4 flex justify-between items-center">
      <div className="flex space-x-6">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <Link href="/products" className="hover:underline">
          Menu
        </Link>
        <Link href="/cart" className="hover:underline">
          Cart
        </Link>
        <Link href="/auth/signin" className="hover:underline">
          Sign In
        </Link>
      </div>
      <button
        className="themeToggle bg-sunset text-base-content px-4 py-2 rounded font-semibold"
        onClick={toggleTheme}
      >
        {theme === "light" ? (
          <BsFillSunFill className="w-6 h-6 text-yellow-500" />
        ) : (
          <BsFillMoonFill className="w-6 h-6 text-white" />
        )}
      </button>
    </nav>
  );
};

export default Navbar;
