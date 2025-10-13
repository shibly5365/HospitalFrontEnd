import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRouting";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <Toaster
        position="top-right"
        toastOptions={{
          className: "rounded-lg shadow-lg text-sm font-medium",
          duration: 3000,
        }}
      />
    </BrowserRouter>
  );
}

export default App;
