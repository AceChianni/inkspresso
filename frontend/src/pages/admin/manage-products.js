import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

const ManageProducts = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editProductId, setEditProductId] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user === undefined) return;
    if (!user || !user.isAdmin) {
      router.push("/");
    } else {
      fetchProducts();
    }
  }, [user]);

  const handleEditClick = (product) => {
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
    });
    setEditProductId(product._id);
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append("name", formData.name);
    formDataObj.append("price", formData.price);
    formDataObj.append("description", formData.description);
    if (formData.image) formDataObj.append("image", formData.image);

    try {
      let response;
      if (isEditing) {
        response = await fetch(`/api/products/${editProductId}`, {
          method: "PUT",
          body: formDataObj,
          headers: { Authorization: `Bearer ${user.token}` },
        });
      } else {
        response = await fetch("/api/products", {
          method: "POST",
          body: formDataObj,
          headers: { Authorization: `Bearer ${user.token}` },
        });
      }

      if (!response.ok) throw new Error("Failed to submit product");

      resetForm();
      fetchProducts(); // Refresh the list
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (!response.ok) throw new Error("Failed to delete product");
      fetchProducts();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditProductId(null);
    setFormData({ name: "", price: "", description: "", image: null });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Products</h1>

      <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-100 rounded">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
          className="block w-full p-2 mb-2 border rounded"
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          required
          className="block w-full p-2 mb-2 border rounded"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="block w-full p-2 mb-2 border rounded"
        ></textarea>

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="block w-full p-2 mb-2 border rounded"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          {isEditing ? "Update Product" : "Add Product"}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={resetForm}
            className="bg-gray-500 text-white p-2 rounded w-full mt-2"
          >
            Cancel
          </button>
        )}
      </form>

      <table className="w-full bg-white border rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="text-center">
              <td className="p-2 border">{product.name}</td>
              <td className="p-2 border">${product.price}</td>
              <td className="p-2 border">
                <button
                  onClick={() => handleEditClick(product)}
                  className="bg-yellow-500 text-white p-1 rounded mx-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 text-white p-1 rounded mx-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProducts;

// /pages/admin/manage-products.js
// import { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import { useAuth } from "@/context/AuthContext";

// const ManageProducts = () => {
//   const { user } = useAuth();
//   const router = useRouter();
//   const [products, setProducts] = useState([]);
//   const [formData, setFormData] = useState({
//     name: "",
//     price: "",
//     description: "",
//     image: null,
//   });
//   const [isEditing, setIsEditing] = useState(false);

//   const fetchProducts = async () => {
//     try {
//       const res = await fetch("/api/products");
//       if (!res.ok) throw new Error("Failed to fetch products");
//       const data = await res.json();
//       setProducts(data.products || []);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     if (!router.query.id) return;
//     const fetchProduct = async () => {
//       try {
//         const response = await fetch(`/api/products/${router.query.id}`);
//         if (!response.ok) throw new Error("Failed to fetch product");
//         const data = await response.json();
//         setFormData({
//           name: data.name,
//           price: data.price,
//           description: data.description,
//         });
//         setIsEditing(true);
//       } catch (error) {
//         console.error(error.message);
//       }
//     };
//     fetchProduct();
//   }, [router.query.id]);

//   useEffect(() => {
//     if (user === undefined) return;
//     if (!user || !user.isAdmin) {
//       router.push("/");
//     } else {
//       fetchProducts();
//     }
//   }, [user]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formDataObj = new FormData();
//     formDataObj.append("name", formData.name);
//     formDataObj.append("price", formData.price);
//     formDataObj.append("description", formData.description);
//     if (formData.image) formDataObj.append("image", formData.image);

//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       };
//       let response;
//       if (isEditing) {
//         response = await fetch(`/api/products/${router.query.id}`, {
//           method: "PUT",
//           body: formDataObj,
//           headers: config.headers,
//         });
//       } else {
//         response = await fetch("/api/products", {
//           method: "POST",
//           body: formDataObj,
//           headers: config.headers,
//         });
//       }

//       if (!response.ok) throw new Error("Failed to submit product");

//       resetForm();
//       fetchProducts();
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const response = await fetch(`/api/products/${id}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       });
//       if (!response.ok) throw new Error("Failed to delete product");
//       fetchProducts();
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   const handleEditClick = (product) => {
//     router.push(`/admin/manage-products?id=${product._id}`);
//   };

//   const handleChange = (e) => {
//     if (e.target.name === "image") {
//       setFormData({ ...formData, image: e.target.files[0] });
//     } else {
//       setFormData({ ...formData, [e.target.name]: e.target.value });
//     }
//   };

//   const resetForm = () => {
//     setIsEditing(false);
//     setFormData({ name: "", price: "", description: "", image: null });
//     router.push("/admin/manage-products");
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Manage Products</h1>

//       <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-100 rounded">
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           placeholder="Product Name"
//           required
//           className="block w-full p-2 mb-2 border rounded"
//         />
//         <input
//           type="number"
//           name="price"
//           value={formData.price}
//           onChange={handleChange}
//           placeholder="Price"
//           required
//           className="block w-full p-2 mb-2 border rounded"
//         />
//         <textarea
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           placeholder="Description"
//           required
//           className="block w-full p-2 mb-2 border rounded"
//         ></textarea>

//         <input
//           type="file"
//           name="image"
//           accept="image/*"
//           onChange={handleChange}
//           className="block w-full p-2 mb-2 border rounded"
//         />

//         <button
//           type="submit"
//           className="bg-blue-500 text-white p-2 rounded w-full"
//         >
//           {isEditing ? "Update Product" : "Add Product"}
//         </button>
//         {isEditing && (
//           <button
//             type="button"
//             onClick={resetForm}
//             className="bg-gray-500 text-white p-2 rounded w-full mt-2"
//           >
//             Cancel
//           </button>
//         )}
//       </form>

//       <table className="w-full bg-white border rounded">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="p-2 border">Name</th>
//             <th className="p-2 border">Price</th>
//             <th className="p-2 border">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((product) => (
//             <tr key={product._id} className="text-center">
//               <td className="p-2 border">{product.name}</td>
//               <td className="p-2 border">${product.price}</td>
//               <td className="p-2 border">
//                 <button
//                   onClick={() => handleEditClick(product)}
//                   className="bg-yellow-500 text-white p-1 rounded mx-1"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(product._id)}
//                   className="bg-red-500 text-white p-1 rounded mx-1"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ManageProducts;
