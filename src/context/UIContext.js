// /src/context/UIContext.js

import { createContext, useContext, useState } from "react";

const UIContext = createContext();
export const useUI = () => useContext(UIContext);

export const UIProvider = ({ children }) => {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <UIContext.Provider value={{ cartOpen, setCartOpen }}>
      {children}
    </UIContext.Provider>
  );
};
