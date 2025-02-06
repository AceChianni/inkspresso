// // /components/Navbar.js
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/bars.module.css";

const Navbar = () => {
  const [theme, setTheme] = useState("light");
  const { user } = useAuth();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.body.classList.add(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.classList.remove(theme);
    document.body.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <nav className={`${styles.navbar} flex items-center justify-between px-6 py-4`}>
      <div className="flex items-center space-x-2">
        <Image src="/logo.png" alt="Inkspresso Logo" width={40} height={40} />
        <span className="text-xl font-bold">Inkspresso</span>
      </div>

      <div className="flex space-x-6">
        {[ { name: "Home", path: "/" },
           { name: "Menu", path: "/products" },
           { name: "Cart", path: "/cart" },
           { name: "Books", path: "/library/checkoutbooks" },
           { name: "Sign In", path: "/sign/signin" }
        ].map((item, idx) => (
          <Link key={idx} href={item.path} className={styles.navLink}>
            {item.name}
          </Link>
        ))}

        {/* Only show if user is an admin */}
        {user?.isAdmin && (
          <Link href="/admin/manage-products" className={styles.navLink}>
            Manage Products
          </Link>
        )}
      </div>

      <div className="ml-6">
        <button className={`${styles.themeToggle} px-4 py-2 rounded font-semibold`} onClick={toggleTheme}>
          {theme === "light" ? <BsFillSunFill className="w-6 h-6 text-yellow-500" /> : <BsFillMoonFill className="w-6 h-6 text-white" />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
// import styles from "../styles/bars.module.css";

// const Navbar = () => {
//   const [theme, setTheme] = useState("light");

//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme") || "light";
//     setTheme(savedTheme);
//     document.body.classList.add(savedTheme);
//   }, []);

//   const toggleTheme = () => {
//     const newTheme = theme === "light" ? "dark" : "light";
//     setTheme(newTheme);
//     document.body.classList.remove(theme);
//     document.body.classList.add(newTheme);
//     localStorage.setItem("theme", newTheme);
//   };

//   return (
//     <nav className={`${styles.navbar} flex items-center justify-between px-6 py-4`}>
//       {/* Left Side: Logo & Brand Name */}
//       <div className="flex items-center space-x-2">
//         <Image src="/logo.png" alt="Inkspresso Logo" width={40} height={40} />
//         <span className="text-xl font-bold">Inkspresso</span>
//       </div>

//       {/* Center: Navigation Links */}
//       <div className="flex space-x-6">
//         {[
//           { name: "Home", path: "/" },
//           { name: "Menu", path: "/products" },
//           { name: "Cart", path: "/cart" },
//           { name: "Books", path: "/library/checkoutbooks" },
//           { name: "Sign In", path: "/sign/signin" },
//         ].map((item, idx) => (
//           <Link key={idx} href={item.path} className={styles.navLink}>
//             {item.name}
//           </Link>
//         ))}
//       </div>

//       {/* Right Side: Theme Toggle Button */}
//       <div className="ml-6">
//         <button
//           className={`${styles.themeToggle} px-4 py-2 rounded font-semibold`}
//           onClick={toggleTheme}
//         >
//           {theme === "light" ? (
//             <BsFillSunFill className="w-6 h-6 text-yellow-500" />
//           ) : (
//             <BsFillMoonFill className="w-6 h-6 text-white" />
//           )}
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
