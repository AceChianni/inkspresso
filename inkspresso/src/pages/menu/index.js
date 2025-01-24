// /pages/menu/index.js

// src/pages/products/index.jsx

import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
// import Modal from '../../components/Modal';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [modalMessage, setModalMessage] = useState("");
  // const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/mocks/products.json");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = cart.findIndex(
      (item) => item._id === product._id
    );

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    setModalMessage(`${product.name} added to cart!`);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-base-100 dark:bg-base-dark text-base-content dark:text-base-content-dark">
      <header className="bg-primary text-white p-4 dark:bg-primary-dark">
        <h2 className="text-2xl text-center">Inkspresso Menu</h2>
      </header>
      <main className="container mx-auto p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              handleAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </main>

      {/* {showModal && <Modal message={modalMessage} onClose={closeModal} />} */}
    </div>
  );
};

export default Products;

// /pages/menu/index.js

// import { useEffect, useState } from "react";
// import ProductCard from "../../components/ProductCard";

// const MenuPage = () => {
//   const [products, setProducts] = useState([]);

//   const staticProducts = [
//     {
//       _id: "1",
//       name: "Espresso Shot",
//       description: "Rich and bold espresso shot to kickstart your day.",
//       basePrice: 2.5,
//       sizes: [
//         { size: "Small", price: 2.5 },
//         { size: "Medium", price: 3 },
//         { size: "Large", price: 3.5 },
//       ],
//       category: "Coffee",
//       imageUrl:
//         "https://res.cloudinary.com/demo/image/upload/v1234567890/espresso.jpg",
//     },
//     {
//       _id: "2",
//       name: "Iced Latte",
//       description: "Chilled latte with a smooth blend of espresso and milk.",
//       basePrice: 4.5,
//       sizes: [
//         { size: "Small", price: 4.5 },
//         { size: "Medium", price: 5 },
//         { size: "Large", price: 5.5 },
//       ],
//       category: "Coffee",
//       imageUrl:
//         "https://res.cloudinary.com/demo/image/upload/v1234567890/iced-latte.jpg",
//     },
//   ];

//   useEffect(() => {
//     setProducts(staticProducts); // Replace with API fetch call
//   }, []);

//   return (
//     <div className="min-h-screen flex flex-col bg-base-100 dark:bg-base-dark text-base-content dark:text-base-content-dark">
//       {/* Navbar - Keep this part for your navigation bar */}
//       <header className="bg-primary text-white py-4">
//         {/* Navbar content goes here */}
//         <nav className="flex justify-between px-6">
//           {/* Other navbar items (e.g., links) */}
//         </nav>
//       </header>

//       {/* Inkspresso Menu header (placed horizontally across the top) */}
//       <section className="bg-primary text-white py-6">
//         <h2 className="text-4xl text-center font-bold uppercase tracking-wider">
//           Inkspresso Menu
//         </h2>
//       </section>

//       {/* Product Grid (Centered and responsive grid) */}
//       <main className="container mx-auto p-8 mt-6">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
//           {products.map((product) => (
//             <ProductCard
//               key={product._id}
//               product={product}
//               handleAddToCart={() => {}}
//             />
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default MenuPage;

// /pages/menu/index.js

// import { useEffect, useState } from "react";
// import ProductCard from "../../components/ProductCard";
// import Modal from "../../components/Modal";

// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const [modalMessage, setModalMessage] = useState("");
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("/mocks/products.json");
//         if (!response.ok) throw new Error("Failed to fetch products");
//         const data = await response.json();
//         setProducts(data);
//       } catch (error) {
//         console.error(error.message);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleAddToCart = (product) => {
//     const cart = JSON.parse(localStorage.getItem("cart")) || [];
//     const existingProductIndex = cart.findIndex(
//       (item) => item._id === product._id
//     );

//     if (existingProductIndex !== -1) {
//       cart[existingProductIndex].quantity += 1;
//     } else {
//       cart.push({ ...product, quantity: 1 });
//     }

//     localStorage.setItem("cart", JSON.stringify(cart));

//     setModalMessage(`${product.name} added to cart!`);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-base-100 dark:bg-base-dark text-base-content dark:text-base-content-dark">
//       <header className="bg-primary text-white p-4 dark:bg-primary-dark">
//         <h2 className="text-2xl text-center">Inkspresso Menu</h2>
//       </header>
//       <main className="container mx-auto p-8">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {products.map((product) => (
//             <ProductCard
//               key={product._id}
//               product={product}
//               handleAddToCart={handleAddToCart}
//             />
//           ))}
//         </div>
//       </main>

//       {showModal && <Modal message={modalMessage} onClose={closeModal} />}
//     </div>
//   );
// };

// export default Products;
