import { api } from "../api/axios";

export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    return response.data;
  },

  profile: async () => {
    const response = await api.get("/auth/profile");

    return response.data;
  },

  refresh: async (refreshToken: string) => {
    const response = await api.post("/auth/refresh", {
      refreshToken,
    });

    return response.data;
  },
};