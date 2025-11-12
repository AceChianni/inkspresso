import { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // 🪄 Load saved favorites from localStorage (guest shelf)
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  // 💾 Persist to localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (book) => {
    if (!favorites.some((fav) => fav.id === book.id)) {
      setFavorites([...favorites, book]);
    }
  };

  const removeFromFavorites = (book) => {
    setFavorites(favorites.filter((fav) => fav.id !== book.id));
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
// /src/context/FavoritesContext.js

// import { createContext, useContext, useState } from "react";

// const FavoritesContext = createContext();

// export function FavoritesProvider({ children }) {
//   const [favorites, setFavorites] = useState([]);

//   const toggleFavorite = (book) => {
//     setFavorites((prev) =>
//       prev.some((b) => b.id === book.id)
//         ? prev.filter((b) => b.id !== book.id)
//         : [...prev, book]
//     );
//   };

//   return (
//     <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
//       {children}
//     </FavoritesContext.Provider>
//   );
// }

// export const useFavorites = () => useContext(FavoritesContext);
