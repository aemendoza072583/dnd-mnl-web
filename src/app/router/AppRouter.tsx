import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "../../styles/toast.css";

import ProtectedRoute from "./ProtectedRoute"
import RoleGuard from "./RoleGuard";

// ORDERING
import OrderingRoutes from "@/apps/ordering/routes/OrderingRoutes";

// INVENTORY
import InventoryRoutes from "@/apps/inventory/routes/InventoryRoutes";

// POS
import POSRoutes from "@/apps/pos/routes/POSRoutes";

// AUTH
import LoginPage from "@/apps/auth/pages/LoginPage";
import UnauthorizedPage from "@/apps/auth/pages/UnauthorizedPage";
import NotFoundPage from "@/apps/auth/pages/NotFoundPage";

export default function AppRouter() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          {/* =========================================
            DEFAULT REDIRECT
          ========================================= */}
          <Route path="/" element={<Navigate to="/order" replace />} />

          {/* =========================================
            PUBLIC ORDERING SYSTEM
            NO LOGIN REQUIRED
          ========================================= */}
          <Route path="/order/*" element={<OrderingRoutes />} />

          {/* =========================================
            LOGIN
          ========================================= */}
          <Route path="/login" element={<LoginPage />} />

          {/* =========================================
            INVENTORY SYSTEM
            LOGIN REQUIRED
          ========================================= */}
          <Route
            path="/inventory/*"
            element={
              <ProtectedRoute>
                <RoleGuard allowedRoles={["ADMIN", "STAFF"]}>
                  <InventoryRoutes />
                </RoleGuard>
              </ProtectedRoute>
            }
          />

          {/* =========================================
            POS SYSTEM
            LOGIN REQUIRED
          ========================================= */}
          <Route
            path="/pos/*"
            element={
              <ProtectedRoute>
                <RoleGuard allowedRoles={["ADMIN", "CASHIER"]}>
                  <POSRoutes />
                </RoleGuard>
              </ProtectedRoute>
            }
          />

          {/* =========================================
            UNAUTHORIZED
          ========================================= */}
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          {/* =========================================
            404
          ========================================= */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
    </>
  );
}