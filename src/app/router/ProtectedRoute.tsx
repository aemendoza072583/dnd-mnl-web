import { Navigate, useLocation } from "react-router";
import type { ReactNode } from "react";
import { getAccessToken } from "@/shared/api/token";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const location = useLocation();

  // ACCESS TOKEN
  const token = getAccessToken();

  // NOT LOGGED IN
  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // LOGGED IN
  return <>{children}</>;
}