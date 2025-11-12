// /src/pages/_app.js
import { useState, useEffect } from "react";
import { CartProvider } from "@/context/CartContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import SolunaSourceWidget from "@/components/SolunaSourceWidget"; // ⬅️ add this
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "inkspresso");
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <FavoritesProvider>
          <Navbar toggleCart={() => setCartOpen(!cartOpen)} />
          <CartDrawer
            isOpen={cartOpen}
            toggleCart={() => setCartOpen(false)}
          />
          <main className="pt-20">
            <Component {...pageProps} />
          </main>

          {/* 🌙 Soluna Source */}
          <SolunaSourceWidget />

          <Footer />
        </FavoritesProvider>
      </CartProvider>
    </AuthProvider>
  );
}
