// /pages/library/[id].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const BookDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/books/${id}`)
        .then(res => res.json())
        .then(data => setBook(data));
    }
  }, [id]);

  const checkoutBook = async () => {
    const res = await fetch(`/api/books/checkout/${id}`, { method: 'POST' });
    const data = await res.json();
    alert(data.message);
    router.push('/library');
  };

  if (!book) return <p>Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">{book.title}</h1>
      <p className="text-gray-600">By {book.author}</p>
      <p className="mt-4">{book.description}</p>
      <p className="mt-2 text-sm">Available Copies: {book.availableCopies}</p>
      {book.availableCopies > 0 ? (
        <button onClick={checkoutBook} className="mt-4 bg-green-500 text-white p-2">Checkout</button>
      ) : (
        <p className="text-red-500">Not available</p>
      )}
    </div>
  );
};

export default BookDetails;
