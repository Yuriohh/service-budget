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
  try {
    const token = await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.warn("[api] não foi possível ler o token:", error);
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.warn("[api] erro na resposta:", {
      status: error.response?.status,
      url: error.config?.url,
      method: error.config?.method,
      data: error.response?.data,
    });
    const message =
      error.response?.data?.message ?? "Erro inesperado. Tente novamente.";
    return Promise.reject(new Error(message));
  },
);
