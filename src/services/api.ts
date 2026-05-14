import { AUTH_TOKEN_KEY } from "@/src/storage/storageConfig";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const BASE_URL =
  Platform.OS === "android"
    ? "http://10.0.2.2:3333"
    : "http://localhost:3333";

export const api = axios.create({ baseURL: BASE_URL });

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ?? "Erro inesperado. Tente novamente.";
    return Promise.reject(new Error(message));
  },
);
