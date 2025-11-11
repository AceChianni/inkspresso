// /src/components/Navbar.js
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function Navbar({ toggleCart }) {
  const { cart } = useCart();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-base-100/80 backdrop-blur-md shadow-sm border-b border-base-300">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">

        {/* Brand */}
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="Inkspresso Logo" width={40} height={40} />
          <span className="font-heading text-2xl tracking-wide text-primary">
            Inkspresso
          </span>
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/"><span className="nav-link">Home</span></Link>
          <Link href="/products"><span className="nav-link">Menu</span></Link>
          <Link href="/library"><span className="nav-link">Library</span></Link>
        </div>

        {/* Cart */}
        <button
          onClick={toggleCart}
          className="relative font-body px-4 py-2 rounded-md border border-primary/40 text-primary hover:bg-primary/10 transition"
        >
          Cart
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-base-100 text-xs rounded-full px-2 py-[2px]">
              {itemCount}
            </span>
          )}
        </button>
      </nav>
    </header>
  );
}
