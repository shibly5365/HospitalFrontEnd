import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const location = useLocation();

  // Get system theme
  const getSystemTheme = () => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  // Initial patient theme
  const getInitialTheme = () => {
    const saved = localStorage.getItem("theme");
    return saved || "system";
  };
  const getDoctorTheme = () => {
    return (
      localStorage.getItem(
        "doctor-theme",
      ) || "light"
    );
  };

  const [theme, setTheme] = useState(getInitialTheme);
  const [doctorTheme, setDoctorTheme] = useState(getDoctorTheme);

  useEffect(() => {
    const root = document.documentElement;

    // =========================
    // PATIENT SIDE THEMES
    // =========================
    if (location.pathname.startsWith("/patient")) {
      const appliedTheme = theme === "system" ? getSystemTheme() : theme;

      root.setAttribute("data-theme", appliedTheme);


      localStorage.setItem("theme", theme);
    }

    // =========================
    // DOCTOR SIDE THEMES
    else if (location.pathname.startsWith("/doctors")) {
      root.setAttribute(
        "data-theme",
        doctorTheme,
      );

      localStorage.setItem(
        "doctor-theme",
        doctorTheme,
      );
    }

    // =========================
    // OTHER PAGES
    // =========================
    else {
      root.removeAttribute("data-theme");
      root.classList.remove("dark");
    }
  }, [theme, doctorTheme, location.pathname]);

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, doctorTheme, setDoctorTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
