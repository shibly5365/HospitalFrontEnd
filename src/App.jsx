import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRouting";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <BrowserRouter> {/* ✅ Router FIRST */}
      <ThemeProvider> {/* ✅ NOW SAFE */}
        <AppRoutes />
        <Toaster
          position="top-right"
          toastOptions={{
            className: "rounded-lg shadow-lg text-sm font-medium",
            duration: 3000,
          }}
        />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;