// /src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

// Default structure for every user (localStorage or Firebase)
const DEFAULT_USER_FIELDS = {
  name: "",
  email: "",
  avatar: "",
  phone: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
  country: "",
  createdAt: "",
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load stored user on refresh
  useEffect(() => {
    const saved = localStorage.getItem("inkspresso_user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  // --------------------------
  // SIGN UP
  // --------------------------
  const signup = (email, password, name) => {
    const newUser = {
      ...DEFAULT_USER_FIELDS,
      email,
      name,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setUser(newUser);
    localStorage.setItem("inkspresso_user", JSON.stringify(newUser));
  };

  // --------------------------
  // LOGIN
  // --------------------------
  const login = (email, password) => {
    const saved = localStorage.getItem("inkspresso_user");

    if (saved) {
      const existing = JSON.parse(saved);

      // If email matches, use existing user with correct name
      if (existing.email === email) {
        setUser(existing);
        return;
      }
    }

    // Fallback for first-time login
    const fallbackUser = {
      ...DEFAULT_USER_FIELDS,
      email,
      name: email.split("@")[0],
      createdAt: new Date().toISOString().split("T")[0],
    };

    setUser(fallbackUser);
    localStorage.setItem("inkspresso_user", JSON.stringify(fallbackUser));
  };

  // --------------------------
  // UPDATE PROFILE
  // --------------------------
  const updateProfile = (newData) => {
    if (!user) return;

    const updated = {
      ...user,
      ...newData,
    };

    setUser(updated);
    localStorage.setItem("inkspresso_user", JSON.stringify(updated));
  };

  // --------------------------
  // LOGOUT
  // --------------------------
  const logout = () => {
    setUser(null);
    localStorage.removeItem("inkspresso_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        login,
        updateProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
