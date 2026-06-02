import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ThemeContext = createContext();

export const ThemeProvider = ({
  children,
  patientEmail,
}) => {
  const location = useLocation();

  const getSystemTheme = () => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const getInitialTheme = () => {
    if (!patientEmail) return "system";

    return (
      localStorage.getItem(
        `theme_${patientEmail}`
      ) || "system"
    );
  };

  const getDoctorTheme = () => {
    return (
      localStorage.getItem("doctor-theme") ||
      "light"
    );
  };

  const [theme, setTheme] = useState(getInitialTheme);
  const [doctorTheme, setDoctorTheme] =
    useState(getDoctorTheme);

  useEffect(() => {
    setTheme(getInitialTheme());
  }, [patientEmail]);

  useEffect(() => {
    const root = document.documentElement;

    // PATIENT
    if (location.pathname.startsWith("/patient")) {
      const appliedTheme =
        theme === "system"
          ? getSystemTheme()
          : theme;

      root.setAttribute(
        "data-theme",
        appliedTheme
      );

      if (patientEmail) {
        localStorage.setItem(
          `theme_${patientEmail}`,
          theme
        );
      }
    }

    // DOCTOR
    else if (
      location.pathname.startsWith("/doctors")
    ) {
      root.setAttribute(
        "data-theme",
        doctorTheme
      );

      localStorage.setItem(
        "doctor-theme",
        doctorTheme
      );
    }

    // OTHER
    else {
      root.removeAttribute("data-theme");
      root.classList.remove("dark");
    }
  }, [
    theme,
    doctorTheme,
    location.pathname,
    patientEmail,
  ]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        doctorTheme,
        setDoctorTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () =>
  useContext(ThemeContext);