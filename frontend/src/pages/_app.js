// // /pages/_app.js

// import { CartProvider } from "../context/CartContext";
// import { useState, useEffect } from "react";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import "../styles/globals.css";

// function MyApp({ Component, pageProps }) {
//   const [theme, setTheme] = useState("light");

//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme") || "light";
//     setTheme(savedTheme);
//     document.documentElement.setAttribute("data-theme", savedTheme);
//   }, []);

//   const toggleTheme = (newTheme) => {
//     setTheme(newTheme);
//     localStorage.setItem("theme", newTheme);
//     document.documentElement.setAttribute("data-theme", newTheme);
//   };

//   return (
//     <CartProvider>
//       <div data-theme={theme}>
//         <Navbar toggleTheme={toggleTheme} />
//         <main className="pt-20">
//           <Component {...pageProps} />
//         </main>
//         <Footer theme={theme} toggleTheme={toggleTheme} />
//       </div>
//     </CartProvider>
//   );
// }

// export default MyApp;

// /pages/_app.js

import { CartProvider } from "../context/CartContext";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <CartProvider>
      <div data-theme={theme}>
        <Navbar toggleTheme={toggleTheme} />
        <main className="pt-20">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default MyApp;
