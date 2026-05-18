import { AUTH_TOKEN_KEY } from "@/src/storage/storageConfig";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const BASE_URL =
  Platform.OS === "android"
    ? "http://10.0.2.2:3333"
    : "http://localhost:3333";

export const api = axios.create({ baseURL: BASE_URL });

const API_ERROR_MESSAGES: Record<string, string> = {
  "Invalid credentials": "Credenciais inválidas.",
  "Invalid password": "Senha incorreta.",
  "Email already exists": "E-mail já cadastrado.",
  "User already exists": "Usuário já cadastrado.",
  "Budget not found": "Orçamento não encontrado.",
  Unauthorized: "Não autorizado.",
};

let _signOut: (() => void) | null = null;

export function registerSignOut(fn: () => void) {
  _signOut = fn;
}

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
    const wasAuthenticated = !!error.config?.headers?.Authorization;
    if (error.response?.status === 401 && wasAuthenticated) {
      _signOut?.();
    }
    console.warn("[api] erro na resposta:", {
      status: error.response?.status,
      url: error.config?.url,
      method: error.config?.method,
      data: error.response?.data,
    });
    const data = error.response?.data;
    const rawMessage = data?.error ?? data?.message ?? "Erro inesperado. Tente novamente.";
    const message = API_ERROR_MESSAGES[rawMessage] ?? rawMessage;
    return Promise.reject(new Error(message));
  },
);
