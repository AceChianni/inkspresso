// /src/pages/_app.js

import { useState } from "react";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import { FavoritesProvider } from "@/context/FavoritesContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <CartProvider>
      <FavoritesProvider>
      <Navbar toggleCart={() => setCartOpen(!cartOpen)} />
      <CartDrawer isOpen={cartOpen} toggleCart={() => setCartOpen(false)} />
      <main className="pt-20">
        <Component {...pageProps} />
      </main>
      <Footer />
      </FavoritesProvider>
    </CartProvider>
  );
}
