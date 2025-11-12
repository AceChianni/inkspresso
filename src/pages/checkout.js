// /src/pages/checkout.js
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import Image from "next/image";
import Link from "next/link";

export default function CheckoutPage() {
  const { cart, removeFromCart } = useCart();
  const { favorites, removeFromFavorites } = useFavorites();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="font-heading text-4xl mb-10 text-center text-[#5A4632]">
        Your Checkout Experience
      </h1>

      {/* ☕ ORDER SUMMARY */}
      <section className="mb-16">
        <h2 className="font-heading text-2xl mb-6 text-center text-[#796544]">
         Order Summary
        </h2>

        {cart.length === 0 ? (
          <div className="text-center">
            <p className="text-neutral/70 mb-6">Your cart is empty.</p>
            <Link
              href="/products"
              className="px-6 py-2 rounded-full border border-[#A07C43] text-[#5A4632] hover:bg-[#C7A269] hover:text-base-100 transition"
            >
              Back to Menu
            </Link>
          </div>
        ) : (
          <div className="border border-base-300 rounded-lg p-6 bg-base-100/90 shadow-sm">
            <div className="divide-y divide-base-300">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex items-center justify-between py-3"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-md object-cover border border-base-300 shadow-sm"
                    />
                    <div>
                      <p className="font-medium text-neutral">{item.name}</p>
                      {item.size && (
                        <p className="text-sm text-neutral/60">Size: {item.size}</p>
                      )}
                      <p className="text-sm text-neutral/70">
                        ${item.price.toFixed(2)} × {item.quantity}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <p className="text-[#796544] font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="text-xs text-[#A07C43] hover:text-[#C7A269] mt-1"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-6 font-body text-lg">
              <span>Subtotal:</span>
              <span className="font-semibold text-[#5A4632]">
                ${subtotal.toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </section>

      {/* 📚 BOOKSHELF SUMMARY */}
      <section className="mb-16">
        <h2 className="font-heading text-2xl mb-6 text-center text-[#796544]">
           Your Bookshelf
        </h2>

        {favorites.length === 0 ? (
          <div className="text-center">
            <p className="text-neutral/70 mb-6">No books saved yet.</p>
            <Link
              href="/library"
              className="px-6 py-2 rounded-full border border-[#A07C43] text-[#5A4632] hover:bg-[#C7A269] hover:text-base-100 transition"
            >
              Explore Library
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {favorites.map((book) => {
              const info = book.volumeInfo || {};
              const image =
                info.imageLinks?.thumbnail ||
                info.imageLinks?.smallThumbnail ||
                "/placeholder-book.jpg";

              return (
                <div
                  key={book.id}
                  className="flex flex-col items-center text-center border border-base-300 rounded-lg bg-base-100 shadow-sm hover:shadow-md transition p-4"
                >
                  <div className="relative w-full h-64 bg-[#F5F1EB] flex justify-center items-center overflow-hidden rounded-md mb-4">
                    <Image
                      src={image}
                      alt={info.title}
                      width={240}
                      height={360}
                      className="object-contain"
                      unoptimized
                    />
                  </div>

                  <h3 className="font-heading text-lg text-neutral mb-1 line-clamp-2">
                    {info.title}
                  </h3>
                  <p className="text-sm text-neutral/70 mb-2">
                    {info.authors?.join(", ") || "Unknown Author"}
                  </p>

                  <button
                    onClick={() => removeFromFavorites(book)}
                    className="px-4 py-1.5 rounded-full text-xs border border-[#A07C43] text-[#5A4632] hover:bg-[#C7A269] hover:text-base-100 transition"
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 💳 PAYMENT + CONFIRMATION */}
      {(cart.length > 0 || favorites.length > 0) && (
        <div className="border border-base-300 rounded-lg p-6 bg-base-100/90 shadow-sm text-center">
          <h2 className="font-heading text-2xl mb-4 text-[#5A4632]">Confirm Order</h2>
          <p className="text-neutral/70 mb-6 max-w-lg mx-auto">
            Review your order and saved books. Once signed in, your shelf and purchases
            will sync automatically.
          </p>

          <button className="px-8 py-2 rounded-full font-medium text-base-100 bg-[#6F7C56] hover:bg-[#C7A269] hover:text-neutral shadow-sm transition-all duration-300">
            Confirm Checkout
          </button>
        </div>
      )}
    </div>
  );
}
