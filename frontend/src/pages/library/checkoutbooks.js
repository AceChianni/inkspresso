// /pages/library/checkoutbooks.js
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import styles from "../../styles/books.module.css";

const CheckoutBooks = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const { user } = useAuth();
  const { addToCart, cartItems } = useContext(CartContext);
  const router = useRouter();

  // Fetch books from API or your own books data
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(`/api/books?q=${query}`);
        const data = await res.json();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [query]); // Refetch when query changes

  // Handle checkout
  const handleCheckout = () => {
    if (!user) {
      router.push("/sign/signin"); // Redirect to sign-in page if not logged in
    } else if (cartItems.length === 0) {
      alert("Your cart is empty. Add books to the cart first!");
    } else {
      router.push("/checkout"); // Proceed to checkout if user is logged in and cart has items
    }
  };

  return (
    <div className={styles.container}>
      <h1 className="text-2xl font-bold mb-4">Browse Books</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search books..."
        className="border px-4 py-2 rounded w-full mb-4"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className={styles.bookGrid}>
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book.id} className={`${styles.bookCard} relative`}>
              <img
                src={book.cover}
                alt={book.title}
                className="w-32 h-48 object-cover"
              />
              <h2 className="text-lg font-semibold">{book.title}</h2>
              <p className="text-sm text-gray-600">{book.author}</p>
              <p className="text-xs text-gray-500">
                {book.description.slice(0, 100)}...
              </p>

              {/* Add to Cart Button */}
              <button
                className="absolute top-2 right-2 rounded-full p-2 bg-blue-500 text-white shadow hover:bg-blue-600"
                onClick={() => addToCart(book)}
              >
                {cartItems.some((item) => item.id === book.id) ? "Added" : "+"}
              </button>
            </div>
          ))
        ) : (
          <p>Loading books...</p>
        )}
      </div>

      {/* Checkout Button */}
      <button
        className={`mt-6 px-6 py-3 rounded ${
          user ? "bg-green-500" : "bg-orange-900"
        } text-white font-bold`}
        onClick={handleCheckout}
        disabled={cartItems.length === 0}
      >
        {user ? "Proceed to Checkout" : "Sign In to Checkout"}
      </button>
    </div>
  );
};

export default CheckoutBooks;

// import { useState, useEffect, useContext } from "react";
// import { useRouter } from "next/router";
// import { useAuth } from "../../context/AuthContext";
// import { CartContext } from "../../context/CartContext"; // Import CartContext
// import styles from "../../styles/books.module.css";

// const CheckoutBooks = () => {
//   const [books, setBooks] = useState([]);
//   const [query, setQuery] = useState("");
//   const { user } = useAuth();
//   const { addToCart, cartItems } = useContext(CartContext); // Use CartContext
//   const router = useRouter();

//   // Fetch books from Google Books API
//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const res = await fetch(`/api/books?q=${query}`);
//         const data = await res.json();
//         setBooks(data);
//       } catch (error) {
//         console.error("Error fetching books:", error);
//       }
//     };

//     fetchBooks();
//   }, [query]); // Refetch when query changes

//   // Handle checkout
//   const handleCheckout = () => {
//     if (!user) {
//       router.push("/sign/signin");
//     } else if (cartItems.length === 0) {
//       alert("Your cart is empty. Add books to the cart first!");
//     } else {
//       router.push("/checkout");
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <h1 className="text-2xl font-bold mb-4">Browse Books</h1>

//       {/* Search Input */}
//       <input
//         type="text"
//         placeholder="Search books..."
//         className="border px-4 py-2 rounded w-full mb-4"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//       />

//       <div className={styles.bookGrid}>
//         {books.length > 0 ? (
//           books.map((book) => (
//             <div key={book.id} className={`${styles.bookCard} relative`}>
//               <img
//                 src={book.cover}
//                 alt={book.title}
//                 className="w-32 h-48 object-cover"
//               />
//               <h2 className="text-lg font-semibold">{book.title}</h2>
//               <p className="text-sm text-gray-600">{book.author}</p>
//               <p className="text-xs text-gray-500">
//                 {book.description.slice(0, 100)}...
//               </p>

//               {/* Add to Cart Button */}
//               <button
//                 className="absolute top-2 right-2 rounded-full p-2 bg-blue-500 text-white shadow hover:bg-blue-600"
//                 onClick={() => addToCart(book)} // Add book to cart
//               >
//                 {cartItems.some((item) => item.id === book.id) ? "Added" : "+"}
//               </button>
//             </div>
//           ))
//         ) : (
//           <p>Loading books...</p>
//         )}
//       </div>

//       {/* Checkout Button */}
//       <button
//         className={`mt-6 px-6 py-3 rounded ${user ? "bg-green-500" : "bg-orange-900"} text-white font-bold`}
//         onClick={handleCheckout}
//         disabled={cartItems.length === 0}
//       >
//         {user ? "Proceed to Checkout" : "Sign In to Checkout"}
//       </button>
//     </div>
//   );
// };

// export default CheckoutBooks;
