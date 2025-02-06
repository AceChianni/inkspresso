// /pages/library/index.js
import { useState, useEffect } from 'react';
import Link from 'next/link';

const Library = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch(`/api/books`)
      .then(res => res.json())
      .then(data => setBooks(data));
  }, []);

  const searchBooks = async () => {
    const res = await fetch(`/api/books/search?query=${query}`);
    const data = await res.json();
    setBooks(data);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Library</h1>
      <input
        type="text"
        placeholder="Search books..."
        className="border p-2"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={searchBooks} className="ml-2 bg-blue-500 text-white p-2">Search</button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {books.map(book => (
          <div key={book._id} className="border p-4">
            <h3 className="text-xl font-semibold">{book.title}</h3>
            <p className="text-gray-600">{book.author}</p>
            <Link href={`/library/${book._id}`} className="text-blue-500">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Library;
