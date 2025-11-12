// /src/pages/library/checkout.js

import { useFavorites } from "@/context/FavoritesContext";
import Link from "next/link";
import Image from "next/image";

export default function LibraryCheckout() {
  const { favorites, removeFromFavorites } = useFavorites();

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 text-[#3a2e23]">
      {/* 🪶 Header */}
      <div className="text-center mb-14">
        <h1 className="font-heading text-5xl mb-3 text-[#5A4632] drop-shadow-sm">
          Welcome to Your Bookshelf
        </h1>
        <p className="text-neutral/70 text-sm tracking-wide">
          Your personal corner of the Inkspresso Library — where stories steep slowly 
        </p>
      </div>

      {/* 🕯️ Empty State */}
      {favorites.length === 0 ? (
        <div className="text-center mt-20">
          <p className="text-neutral/70 mb-5 italic">
            Your shelf is empty... time to brew up a new story ✨
          </p>
          <Link
            href="/library"
            className="inline-block px-8 py-2 rounded-full border border-[#A07C43] text-[#5A4632] hover:bg-[#C7A269] hover:text-base-100 font-medium tracking-wide transition-all duration-300"
          >
            Explore the Library
          </Link>
        </div>
      ) : (
        <>
          {/* 📚 Bookshelf Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {favorites.map((book) => {
              const info = book.volumeInfo || {};
              const image =
                info.imageLinks?.thumbnail ||
                info.imageLinks?.smallThumbnail ||
                "/placeholder-book.jpg";

              return (
                <div
                  key={book.id}
                  className="flex flex-col items-center bg-[#F5F1EB] border border-[#C7A269]/40 rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 overflow-hidden"
                >
                  {/* 📖 Cover Image Wrapper */}
                  <div className="relative w-full h-72 bg-gradient-to-t from-[#5A4632]/10 to-transparent overflow-hidden group">
                    <Image
                      src={image}
                      alt={info.title}
                      width={240}
                      height={340}
                      className="object-contain mx-auto mt-4 transition-transform duration-700 group-hover:scale-105"
                      unoptimized
                    />

                    {/* 🌫️ Hover Description only over image */}
                    {info.description && (
                      <div className="absolute inset-0 flex items-end justify-center text-center px-5 pb-6 bg-gradient-to-t from-[#5A4632]/90 via-[#0C0803]/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out">
                        <p className="text-[#ffe6b8] text-xs leading-snug animate-[rise_1.2s_ease-out_forwards] drop-shadow-md line-clamp-5">
                          {info.description}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* 📘 Book Info */}
                  <div className="p-4 flex flex-col flex-grow justify-between text-center">
                    <div>
                      <h3 className="font-heading text-lg text-[#000000] mb-1 line-clamp-2">
                        {info.title}
                      </h3>
                      <p className="text-sm text-[#473724]">
                        {info.authors?.join(", ") || "Unknown Author"}
                      </p>
                    </div>

                    {/* 🪞 Action Buttons */}
                    <div className="mt-4 flex flex-col gap-2">
                      <button
                        className="px-4 py-1.5 rounded-full text-xs font-medium border border-[#A07C43] text-[#5A4632] hover:bg-[#C7A269] hover:text-base-100 transition-all duration-300"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => removeFromFavorites(book)}
                        className="px-4 py-1.5 rounded-full text-xs font-medium border border-[#A07C43]/60 text-[#7B6E5F] hover:bg-[#C7A269] hover:text-[#382302] transition-all duration-300"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 🪞 Checkout Footer */}
<div className="text-center mt-16">
  <Link
    href="/checkout"
    className="inline-block px-10 py-3 rounded-full bg-[#966e47] text-base-100 font-medium tracking-wide hover:bg-[#C7A269] hover:text-neutral shadow-md transition-all duration-300"
  >
     Confirm Checkout
  </Link>
</div>

        </>
      )}

      {/* Steam Animation */}
      <style jsx>{`
        @keyframes rise {
          0% {
            opacity: 0;
            transform: translateY(10px);
            filter: blur(3px);
          }
          60% {
            opacity: 1;
            transform: translateY(-2px);
            filter: blur(0);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
