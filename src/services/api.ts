import { Platform } from "react-native";

const BASE_URL =
  Platform.OS === "android"
    ? "http://10.0.2.2:3333"
    : "http://localhost:3333";

async function post<T>(path: string, body: object): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message ?? "Erro inesperado. Tente novamente.");
  }

  return response.json();
}

export const api = { post };
