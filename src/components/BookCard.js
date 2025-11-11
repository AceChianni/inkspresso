// /src/components/BookCard.js

import { useFavorites } from "@/context/FavoritesContext";

export default function BookCard({ book }) {
  const info = book.volumeInfo;
  const { favorites, toggleFavorite } = useFavorites();
  const isFav = favorites.some((f) => f.id === book.id);

  const cover =
    info.imageLinks?.large ||
    info.imageLinks?.medium ||
    info.imageLinks?.thumbnail ||
    "/placeholder-book.jpg";

  return (
    <div className="bg-base-200 border border-base-300 rounded-xl p-4 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-200">
      <img
        src={cover}
        alt={info.title}
        className="w-full h-72 object-cover rounded-md"
      />

      <h3 className="font-heading text-lg text-primary-focus tracking-tight mt-3 line-clamp-2">
        {info.title}
      </h3>

      <p className="text-sm text-neutral/70 mt-1">
        {info.authors?.join(", ") || "Unknown Author"}
      </p>

      <div className="flex justify-between mt-4">
        <button
          className="btn btn-sm bg-base-300 text-neutral hover:bg-base-100"
          onClick={() => window.open(info.infoLink, "_blank")}
        >
          View
        </button>

        <button className="btn btn-sm" onClick={() => toggleFavorite(book)}>
          {isFav ? "💗 Saved" : "🤍 Save"}
        </button>
      </div>
    </div>
  );
}
