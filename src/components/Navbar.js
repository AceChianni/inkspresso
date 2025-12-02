import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function Navbar({ toggleCart }) {
  const { cart } = useCart();
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const bookshelfRoute = user
    ? "/profile/manageshelves"
    : "/library/checkout";

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-base-100/80 backdrop-blur-md shadow-sm border-b border-base-300">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="Inkspresso Logo" width={40} height={40} />
          <span className="font-heading text-2xl tracking-wide text-primary">
            Inkspresso
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/"><span className="nav-link">Home</span></Link>
          <Link href="/products"><span className="nav-link">Menu</span></Link>
          <Link href="/library"><span className="nav-link">Library</span></Link>

          {/* Bookshelf logic */}
          <Link href={bookshelfRoute} className="nav-link">
            Bookshelf
          </Link>

          {/* Profile */}
          <Link href={user ? "/profile" : "/auth"} className="nav-link">
            {user ? "Profile" : "Sign In"}
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {/* Cart */}
          <button
            onClick={toggleCart}
            className="relative font-body px-4 py-2 rounded-md border border-primary/40 
                     text-primary hover:bg-primary/10 transition"
          >
            Cart
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-base-100 
                                text-xs rounded-full px-2 py-[2px]">
                {itemCount}
              </span>
            )}
          </button>

          {/* Hamburger */}
          <button
            className="md:hidden p-2 rounded-md border border-primary/40 text-primary hover:bg-primary/10 transition"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-base-100/95 backdrop-blur-md border-t border-base-300 
                        shadow-inner px-6 py-4 space-y-4 text-center">

          <Link href="/" onClick={() => setMenuOpen(false)} className="block nav-link">Home</Link>
          <Link href="/products" onClick={() => setMenuOpen(false)} className="block nav-link">Menu</Link>
          <Link href="/library" onClick={() => setMenuOpen(false)} className="block nav-link">Library</Link>

          <Link
            href={bookshelfRoute}
            onClick={() => setMenuOpen(false)}
            className="block nav-link"
          >
            Bookshelf
          </Link>

          <Link
            href={user ? "/profile" : "/auth"}
            onClick={() => setMenuOpen(false)}
            className="block nav-link"
          >
            {user ? "Profile" : "Sign In"}
          </Link>

        </div>
      )}
    </header>
  );
}
