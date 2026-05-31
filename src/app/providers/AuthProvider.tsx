import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { authService } from "../../shared/auth/authService";

import {
  setAccessToken,
  setRefreshToken,
  getAccessToken,
  clearTokens,
} from "../../shared/api/token";
import { removeUserInfo, setUserInfo } from "@/shared/api/user";

type User = {
  id: string;
  fullName: string;
  email: string;
  roles: string[];
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<
  AuthContextType | undefined
>(undefined);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(
    null
  );

  const [loading, setLoading] = useState(true);

  // -------------------------
  // LOGIN
  // -------------------------
  const login = async (
    email: string,
    password: string
  ) => {
    const data = await authService.login(
      email,
      password
    );

    setAccessToken(data.accessToken);
    setRefreshToken(data.refreshToken);

    const profile = await authService.profile();
    setUserInfo(JSON.stringify(profile));
    setUser(profile);
  };

  // -------------------------
  // LOGOUT
  // -------------------------
  const logout = () => {
    clearTokens();
    removeUserInfo();
    setUser(null);
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        const token = getAccessToken();

        if (!token) return;

        const profile = await authService.profile();
        setUserInfo(JSON.stringify(profile));
        setUser(profile);
      } catch {
        clearTokens();
        removeUserInfo();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};