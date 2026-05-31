import { Navigate } from "react-router";
import type { ReactNode } from "react";
import { getUserRoles } from "@/shared/api/user";

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: string[];
}

export default function RoleGuard({
  children,
  allowedRoles,
}: RoleGuardProps) {

  // GET USER ROLES
  const userRoles = getUserRoles();

  // ROLE NOT ALLOWED
  if (!userRoles || !userRoles.some((role: string) => allowedRoles.includes(role))) {
    return <Navigate to="/unauthorized" replace />;
  }

  // ROLE ALLOWED
  return <>{children}</>;
}