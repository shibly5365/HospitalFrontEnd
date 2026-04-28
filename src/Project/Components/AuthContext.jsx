import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
  });

  const [loading, setLoading] = useState(true);

  // 🔥 UNIVERSAL USER FETCH
  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:4002/api/auth/me", {
        withCredentials: true,
      });

      setAuth({
        isAuthenticated: true,
        user: res.data.user,
      });
    } catch (error) {
      setAuth({
        isAuthenticated: false,
        user: null,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // ✅ ONLY CHECK AUTH ON PROTECTED ROUTES
    if (
      location.pathname.startsWith("/patient") ||
      location.pathname.startsWith("/admin") ||
      location.pathname.startsWith("/doctor") ||
      location.pathname.startsWith("/superadmin") ||
      location.pathname.startsWith("/receptionist")
    ) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [location.pathname]);

  // ✅ LOGIN
  const login = (user) => {
    setAuth({ isAuthenticated: true, user });
  };

  // ✅ LOGOUT
  const logout = async () => {
    await axios.post(
      "http://localhost:4002/api/auth/logout",
      {},
      { withCredentials: true },
    );

    setAuth({ isAuthenticated: false, user: null });
  };

  // ✅ 🔥 GLOBAL UPDATE (VERY IMPORTANT)
  const updateUser = (updatedUser) => {
    setAuth((prev) => ({
      ...prev,
      user: updatedUser,
    }));
  };

  return (
    <AuthContext.Provider
      value={{ auth, login, logout, loading, updateUser, fetchUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
