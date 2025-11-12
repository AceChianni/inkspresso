// /src/context/CartContext.js
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState(null); // 🌟 Toast message

  // 🛒 Add item to cart
  const addToCart = (product, size, price) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id && item.size === size
      );
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, size, price, quantity: 1 }];
    });
    showToast(`✨ Added ${product.name} to your cart`);
  };

  // ❌ Remove item
  const removeFromCart = (productId, size) => {
    const item = cart.find((i) => i.id === productId && i.size === size);
    setCart((prev) =>
      prev.filter((i) => !(i.id === productId && i.size === size))
    );
    if (item) showToast(`☕ Removed ${item.name} from cart`);
  };

  // 🔄 Update quantity
  const updateQuantity = (productId, size, amount) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId && item.size === size
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  // 🌸 Toast System
  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  };

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        itemCount,
        toast,
      }}
    >
      {children}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-primary text-base-100 px-4 py-2 rounded-lg shadow-lg animate-fadeIn z-[999] border border-primary/50">
          {toast}
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
