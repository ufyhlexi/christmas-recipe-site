"use client";

import { Toaster } from "react-hot-toast";

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-center"
      containerClassName="toast-center"
      toastOptions={{
        duration: 3000,
        style: {
          background: "#fff",
          color: "#333",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        },
        success: {
          iconTheme: {
            primary: "#d32f2f",
            secondary: "#fff",
          },
        },
        error: {
          iconTheme: {
            primary: "#d32f2f",
            secondary: "#fff",
          },
        },
      }}
    />
  );
}

