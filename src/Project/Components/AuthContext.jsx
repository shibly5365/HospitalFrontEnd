import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
  });
  const [loading, setLoading] = useState(true); // 🟢 Add loading flag

  const setCookie = (name, value, days = 7) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(
      value
    )}; expires=${expires}; path=/; SameSite=Lax`;
  };

  const getCookie = (name) => {
    const match = document.cookie.match(
      new RegExp("(^| )" + name + "=([^;]+)")
    );
    return match ? decodeURIComponent(match[2]) : null;
  };

  const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`;
  };

  useEffect(() => {
    const token = getCookie("authToken");
    const userStr = getCookie("user");

    if (token && userStr) {
      try {
        setAuth({
          isAuthenticated: true,
          user: JSON.parse(userStr),
        });
      } catch {
        setAuth({ isAuthenticated: false, user: null });
      }
    }
    setLoading(false); // 🟢 Mark done loading after check
  }, []);

  const login = (user, jwtToken) => {
    setCookie("authToken", jwtToken);
    setCookie("user", JSON.stringify(user));
    localStorage.setItem("user", JSON.stringify(user));
    setAuth({ isAuthenticated: true, user });
  };

  const logout = () => {
    deleteCookie("authToken");
    deleteCookie("user");
    localStorage.clear();
    sessionStorage.clear();
    setAuth({ isAuthenticated: false, user: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
