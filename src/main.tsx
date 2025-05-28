import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import { AuthProvider } from "./Component/Context/AuthContext";  // <-- Import your AuthProvider

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>         {/* <-- Wrap AuthProvider here */}
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
