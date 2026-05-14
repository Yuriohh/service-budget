import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "@/src/services/api";
import { AUTH_TOKEN_KEY, AUTH_USER_KEY } from "@/src/storage/storageConfig";

type User = {
  id: string;
  nome: string;
  email: string;
};

type SignInResponse = {
  token: string;
  user: User;
};

type AuthContextData = {
  user: User | null;
  isLoadingUser: boolean;
  signIn: (email: string, senha: string) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  async function signIn(email: string, senha: string) {
    const { token, user } = await api.post<SignInResponse>("/users/login", {
      email,
      senha,
    });
    await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
    await AsyncStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    setUser(user);
  }

  async function signOut() {
    await AsyncStorage.multiRemove([AUTH_TOKEN_KEY, AUTH_USER_KEY]);
    setUser(null);
  }

  useEffect(() => {
    async function loadStoredUser() {
      try {
        const [token, userData] = await Promise.all([
          AsyncStorage.getItem(AUTH_TOKEN_KEY),
          AsyncStorage.getItem(AUTH_USER_KEY),
        ]);
        if (token && userData) {
          setUser(JSON.parse(userData));
        }
      } finally {
        setIsLoadingUser(false);
      }
    }
    loadStoredUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoadingUser, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
