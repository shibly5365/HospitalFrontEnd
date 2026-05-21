import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const location = useLocation();

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
    let appliedTheme = "light";

    if (location.pathname.startsWith("/patient")) {
      appliedTheme = theme === "system" ? getSystemTheme() : theme;
    }

    document.documentElement.setAttribute("data-theme", appliedTheme);

    localStorage.setItem("theme", theme);
  }, [theme, location.pathname]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
