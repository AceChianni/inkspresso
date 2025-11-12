// /src/context/AuthContext.js

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("inkspresso_user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const signup = (email, password, name) => {
    const newUser = { email, name };
    setUser(newUser);
    localStorage.setItem("inkspresso_user", JSON.stringify(newUser));
  };

  const login = (email, password) => {
    const saved = localStorage.getItem("inkspresso_user");

    if (saved) {
      const existing = JSON.parse(saved);

      // If it matches the user email, log them in with stored name
      if (existing.email === email) {
        setUser(existing);
        return;
      }
    }

    // Otherwise fallback to basic login
    const fallback = { email, name: email.split("@")[0] };
    setUser(fallback);
    localStorage.setItem("inkspresso_user", JSON.stringify(fallback));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("inkspresso_user");
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
