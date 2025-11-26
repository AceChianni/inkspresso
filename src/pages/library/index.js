// /src/pages/library/index.js
import { useState, useEffect } from "react";
import BookCard from "@/components/BookCard";

export default function LibraryPage() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (!query) {
      setBooks([]);
      return;
    }

    const delay = setTimeout(() => {
      fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=21`
      )
        .then((res) => res.json())
        .then((data) => setBooks(data.items || []))
        .catch(console.error);
    }, 450);

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 bg-[#F5F1EB] text-neutral">
      <h1 className="text-4xl font-heading tracking-tight mb-8 text-center text-[#5A4632]">
        The Inkspresso Library
      </h1>

      {/* 🪶 Search Bar */}
      <div className="flex justify-center mb-10">
        <div className="flex w-full max-w-md bg-[#E8E3DA] border border-[#C7A269]/40 rounded-full overflow-hidden shadow-sm focus-within:ring-2 ring-[#C7A269]/40 transition">
          <input
            type="text"
            placeholder="Search books, authors, or genres..."
            className="px-5 py-3 w-full bg-transparent text-neutral placeholder:text-neutral/70 focus:outline-none text-sm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="px-5 bg-[#796544] text-base-100 hover:bg-[#C7A269] hover:text-neutral transition">
            🔍
          </button>
        </div>
      </div>

      {/* 📚 Book Results */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {books.length === 0 ? (
          <p className="text-center text-neutral/70 col-span-full">
            Start typing to explore ✨
          </p>
        ) : (
          books.map((book) => <BookCard key={book.id} book={book} />)
        )}
      </div>
    </div>
  );
}
