import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import AppRouter from "@/app/router/AppRouter";
import QueryProvider from "@/app/providers/QueryProvider";
import { AuthProvider } from "@/app/providers/AuthProvider";
import { ThemeProvider } from "@/app/providers/ThemeProvider";
import { setupInterceptors } from "@/shared/api/interceptors";
import { AppWrapper } from "@/shared/components/common/PageMeta";

import "./index.css";
import "swiper/swiper-bundle.css";
import "simplebar-react/dist/simplebar.min.css";
import "flatpickr/dist/flatpickr.css";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/toast.css";

// INIT AXIOS INTERCEPTORS
setupInterceptors();

// FORCE DARK MODE ONLY
document.documentElement.classList.add("dark");

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StrictMode>
      <ThemeProvider>
        <QueryProvider>
          <AuthProvider>
            <AppWrapper>
              <AppRouter />
            </AppWrapper>
          </AuthProvider>
        </QueryProvider>
      </ThemeProvider>
    </StrictMode>
  </React.StrictMode>
);
