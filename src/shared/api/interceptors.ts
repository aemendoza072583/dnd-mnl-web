import axios from "axios";
import { api } from "./axios";

import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
  clearTokens,
} from "./token";
import { removeUserInfo } from "./user";

const API_URL = import.meta.env.VITE_API_URL;

let isRefreshing = false;

export const setupInterceptors = () => {
  // -----------------------------------
  // REQUEST
  // -----------------------------------
  api.interceptors.request.use((config) => {
    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  // -----------------------------------
  // RESPONSE
  // -----------------------------------
  api.interceptors.response.use(
    (response) => response,

    async (error) => {
      const originalRequest = error.config;

      if (
        error.response?.status === 401 && 
        error.response?.data?.code === "TOKEN_EXPIRED" &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        if (isRefreshing) {
          return Promise.reject(error);
        }

        isRefreshing = true;

        try {
          const refreshToken = getRefreshToken();

          if (!refreshToken) {
            throw new Error("No refresh token");
          }

          const response = await axios.post(
            `${API_URL}/auth/refresh`,
            {
              refreshToken,
            }
          );

          const newAccessToken =
            response.data.accessToken;

          const newRefreshToken =
            response.data.refreshToken;

          setAccessToken(newAccessToken);
          setRefreshToken(newRefreshToken);

          originalRequest.headers.Authorization =
            `Bearer ${newAccessToken}`;

          return api(originalRequest);
        } catch (err) {
          clearTokens();
          removeUserInfo();

          window.location.href = "/login";

          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );
};