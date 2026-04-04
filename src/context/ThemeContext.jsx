import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  let location;

  // ✅ SAFE: prevent crash if router not ready
  try {
    location = useLocation();
  } catch (err) {
    location = { pathname: "/" };
  }

  const getSystemTheme = () => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const getInitialTheme = () => {
    const saved = localStorage.getItem("theme");
    return saved || "system";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    let appliedTheme = "light"; // default for landing

    // ✅ apply theme ONLY after login routes
    if (
      location.pathname.startsWith("/patient")
    ) {
      appliedTheme =
        theme === "system" ? getSystemTheme() : theme;
    }

    document.documentElement.className = appliedTheme;
  }, [theme, location.pathname]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);