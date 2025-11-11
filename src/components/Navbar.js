// // /src/components/Navbar.js

// import Link from "next/link";
// import Image from "next/image";
// import { useContext } from "react";
// import { CartContext } from "@/context/CartContext";

// export default function Navbar({ toggleCart }) {
//   const { cart } = useContext(CartContext);

//   // Count total items
//   const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

//   return (
//     <nav className="navbar bg-base-100 border-b border-base-300 px-6 py-4 sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto w-full flex justify-between items-center">

//         {/* Logo */}
//         <Link href="/" className="flex items-center gap-3">
//           <Image src="/logo.png" alt="Inkspresso Logo" width={38} height={38} />
//           <span className="font-heading text-xl text-neutral">Inkspresso</span>
//         </Link>

//         {/* Nav Links */}
//         <div className="flex gap-6 font-body text-neutral">
//           <Link href="/">Home</Link>
//           <Link href="/products">Menu</Link>
//           <Link href="/library/checkoutbooks">Books</Link>
//         </div>

//         {/* Cart Button */}
//         <button onClick={toggleCart} className="relative btn btn-ghost">
//           🛍️
//           {itemCount > 0 && (
//             <span className="badge badge-primary badge-sm absolute -top-1 -right-1">
//               {itemCount}
//             </span>
//           )}
//         </button>
//       </div>
//     </nav>
//   );
// }
// /src/components/Navbar.js
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function Navbar({ toggleCart }) {
  const { itemCount } = useCart(); // ✅ safe access

  return (
    <nav className="w-full fixed top-0 left-0 bg-white/90 backdrop-blur-sm shadow-sm px-6 py-3 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.png" alt="Inkspresso Logo" width={36} height={36} />
          <span className="text-xl font-semibold tracking-tight">Inkspresso</span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">
          <Link href="/products" className="hover:opacity-75">Menu</Link>
          <Link href="/library" className="hover:opacity-75">Library</Link>

          {/* Cart Button */}
          <button onClick={toggleCart} className="relative hover:opacity-80">
            🛍️
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {itemCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </nav>
  );
}
