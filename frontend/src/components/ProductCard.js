// /components/ProductCard.js
import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  // Check if product has sizes
  const hasSizes = product.sizes && product.sizes.length > 0;
  const defaultSize = hasSizes ? product.sizes[0].size : "Standard";
  const defaultPrice = hasSizes ? product.sizes[0].price : product.price || 0;

  const [selectedSize, setSelectedSize] = useState(defaultSize);
  const [price, setPrice] = useState(defaultPrice);

  const handleSizeChange = (e) => {
    const selected = e.target.value;
    const sizeData = product.sizes.find((s) => s.size === selected);
    setSelectedSize(selected);
    setPrice(sizeData ? sizeData.price : 0);
  };

  return (
    <div className="bg-white border rounded-lg p-4 shadow-lg">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover mb-4 rounded"
      />
      <h3 className="text-xl font-semibold">{product.name}</h3>

      {/* Show size selection only if sizes exist */}
      {hasSizes && (
        <div className="mt-2">
          <label htmlFor={`size-${product._id}`} className="block text-sm font-medium">
            Choose a size:
          </label>
          <select
            id={`size-${product._id}`}
            value={selectedSize}
            onChange={handleSizeChange}
            className="p-2 border w-full"
          >
            {product.sizes.map((size) => (
              <option key={size.size} value={size.size}>
                {size.size} - ${size.price.toFixed(2)}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Display price */}
      <p className="mt-2 text-lg">Price: ${price.toFixed(2)}</p>

      {/* Add to Cart Button */}
      <button
        onClick={() => addToCart(product, selectedSize, price)}
        className="mt-4 bg-orange-500 text-white py-2 px-4 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;


// import { useState } from "react";

// const ProductCard = ({ product }) => {
//   // Ensure sizes array exists and has at least one element
//   const defaultSize = product.sizes?.[0] || { size: "N/A", price: 0 };
//   const [selectedSize, setSelectedSize] = useState(defaultSize.size);
//   const [price, setPrice] = useState(defaultSize.price);

//   const handleSizeChange = (e) => {
//     const selected = e.target.value;
//     const sizeData = product.sizes.find((s) => s.size === selected);
//     setSelectedSize(selected);
//     setPrice(sizeData ? sizeData.price : 0);
//   };

//   return (
//     <div className="bg-white border rounded-lg p-4 shadow-lg">
//       <img
//         src={product.image}
//         alt={product.name}
//         className="w-full h-48 object-cover mb-4 rounded"
//       />
//       <h3 className="text-xl font-semibold">{product.name}</h3>

//       {product.sizes?.length > 0 ? (
//         <div className="mt-2">
//           <label htmlFor={`size-${product._id}`} className="block text-sm font-medium">
//             Choose a size:
//           </label>
//           <select
//             id={`size-${product._id}`}
//             value={selectedSize}
//             onChange={handleSizeChange}
//             className="p-2 border w-full"
//             aria-label={`Select size for ${product.name}`}
//           >
//             {product.sizes.map((size) => (
//               <option key={size.size} value={size.size}>
//                 {size.size} - ${size.price.toFixed(2)}
//               </option>
//             ))}
//           </select>
//         </div>
//       ) : (
//         <p className="text-red-500 mt-2">No sizes available</p>
//       )}

//       <p className="mt-2 text-lg">Price: ${price.toFixed(2)}</p>

//       <button
//         className="mt-4 bg-orange-500 text-white py-2 px-4 rounded disabled:opacity-50"
//         disabled={!product.sizes?.length}
//       >
//         Add to Cart
//       </button>
//     </div>
//   );
// };

// export default ProductCard;

// // import { useState } from "react";

// // const ProductCard = ({ product }) => {
// //   const [selectedSize, setSelectedSize] = useState(product.sizes[0].size);
// //   const [price, setPrice] = useState(product.sizes[0].price);

// //   const handleSizeChange = (e) => {
// //     const selected = e.target.value;
// //     const sizeData = product.sizes.find((s) => s.size === selected);
// //     setSelectedSize(selected);
// //     setPrice(sizeData.price);
// //   };

// //   return (
// //     <div className="bg-white border rounded-lg p-4 shadow-lg">
// //       <img
// //         src={product.image}
// //         alt={product.name}
// //         className="w-full h-48 object-cover mb-4 rounded"
// //       />
// //       <h3 className="text-xl font-semibold">{product.name}</h3>
// //       <div className="mt-2">
// //         <select
// //           value={selectedSize}
// //           onChange={handleSizeChange}
// //           className="p-2 border"
// //         >
// //           {product.sizes.map((size) => (
// //             <option key={size.size} value={size.size}>
// //               {size.size} - ${size.price}
// //             </option>
// //           ))}
// //         </select>
// //       </div>
// //       <p className="mt-2 text-lg">Price: ${price}</p>
// //       <button className="mt-4 bg-orange-500 text-white py-2 px-4 rounded">
// //         Add to Cart
// //       </button>
// //     </div>
// //   );
// // };

// // export default ProductCard;
