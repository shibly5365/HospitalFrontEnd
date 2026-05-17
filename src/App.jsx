import React from "react";
import AppRoutes from "./AppRouting";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <AppRoutes />

      <Toaster
        position="top-right"
        toastOptions={{
          className: "rounded-lg shadow-lg text-sm font-medium",
          duration: 3000,
        }}
      />
    </ThemeProvider>
  );
}

export default App;