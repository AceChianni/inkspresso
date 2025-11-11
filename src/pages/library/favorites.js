// /src/pages/library/favorites.js

import { useFavorites } from "@/context/FavoritesContext";
import BookCard from "@/components/BookCard";

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-heading tracking-tight text-center text-primary-focus">
        Saved Books
      </h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10">
        {favorites.length === 0 ? (
          <p className="text-neutral/70 text-center w-full">No saved books yet ✨</p>
        ) : (
          favorites.map((book) => <BookCard key={book.id} book={book} />)
        )}
      </div>
    </div>
  );
}

