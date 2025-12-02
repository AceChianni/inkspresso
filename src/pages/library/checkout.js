// /src/pages/library/checkout.js
import { useFavorites } from "@/context/FavoritesContext";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import Image from "next/image";

export default function LibraryCheckout() {
  const { favorites, removeFromFavorites } = useFavorites();
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 text-[#3a2e23]">

      {/* Header */}
      <div className="text-center mb-14">
        <h1 className="font-heading text-5xl mb-3 text-[#5A4632] drop-shadow-sm">
          Your Bookshelf
        </h1>

        <p className="text-neutral/70 text-sm tracking-wide">
          Your personal corner of the Inkspresso Library — where stories steep slowly
        </p>

        {user ? (
          <Link
            href="/profile/manageshelves"
            className="mt-6 inline-block px-8 py-2 rounded-full bg-[#6F7C56] text-base-100 hover:bg-[#C7A269] hover:text-neutral transition shadow"
          >
            📚 Manage Shelves
          </Link>
        ) : (
          <p className="text-xs text-neutral/60 mt-3">
            <Link href="/auth" className="text-[#A07C43] hover:text-[#C7A269] underline">
              Sign in
            </Link>{" "}
            to organize books into shelves.
          </p>
        )}
      </div>

      {/* Empty state */}
      {favorites.length === 0 ? (
        <div className="text-center mt-20">
          <p className="text-neutral/70 mb-5 italic">
            Your shelf is empty... time to brew a new story ✨
          </p>

          <Link
            href="/library"
            className="inline-block px-8 py-2 rounded-full border border-[#A07C43] 
                       text-[#5A4632] hover:bg-[#C7A269] hover:text-base-100 transition"
          >
            Explore the Library
          </Link>
        </div>
      ) : (
        <>
          {/* Book Grid */}
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
                  className="flex flex-col bg-[#F5F1EB] border border-[#C7A269]/40 
                             rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.02] 
                             transition-all duration-300 overflow-hidden"
                >
                  {/* Image Container */}
                  <div className="relative w-full h-72 bg-gradient-to-t from-[#5A4632]/10 to-transparent overflow-hidden group">
                    <Image
                      src={image}
                      alt={info.title}
                      fill
                      className="object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                      unoptimized
                    />

                    {info.description && (
                      <div className="absolute inset-0 bg-gradient-to-t from-[#5A4632]/90 
                                      via-[#0C0803]/50 to-transparent opacity-0 
                                      group-hover:opacity-100 transition-all duration-700 
                                      flex items-end p-5">
                        <p className="text-[#ffe6b8] text-xs line-clamp-5">
                          {info.description}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* TEXT + BUTTON AREA */}
                  <div className="flex flex-col flex-grow p-4 text-center">

                    {/* Title + Author */}
                    <div>
                      <h3 className="font-heading text-lg mb-1 line-clamp-2">
                        {info.title}
                      </h3>

                      <p className="text-sm text-[#473724]">
                        {info.authors?.join(", ") || "Unknown Author"}
                      </p>
                    </div>

                    {/* Buttons anchored at bottom */}
                    <div className="mt-auto flex flex-col gap-2">

                      <button className="px-4 py-1.5 rounded-full text-xs font-medium
                                         border border-[#A07C43] text-[#5A4632] 
                                         hover:bg-[#C7A269] hover:text-base-100 
                                         transition">
                        View Details
                      </button>

                      <button
                        onClick={() => removeFromFavorites(book)}
                        className="px-4 py-1.5 rounded-full text-xs font-medium 
                                   border border-[#A07C43]/60 text-[#7B6E5F] 
                                   hover:bg-[#C7A269] hover:text-[#382302] transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Checkout CTA */}
          <div className="text-center mt-16">
            <Link
              href="/checkout"
              className="inline-block px-10 py-3 rounded-full bg-[#966e47] 
                         text-base-100 font-medium hover:bg-[#C7A269] hover:text-neutral 
                         shadow transition"
            >
              Confirm Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
