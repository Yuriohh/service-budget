import { api, registerSignOut } from "@/src/services/api";
import { AUTH_TOKEN_KEY, AUTH_USER_KEY } from "@/src/storage/storageConfig";
import * as SecureStore from "expo-secure-store";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type User = {
  id: string;
  name: string;
  email: string;
};

type SignInResponse = {
  token: string;
  user: User;
};

type AuthContextData = {
  user: User | null;
  isLoadingUser: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (name: string) => Promise<void>;
};

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  async function signIn(email: string, password: string) {
    const { data } = await api.post<SignInResponse>("/user/login", {
      email,
      password,
    });
    await SecureStore.setItemAsync(AUTH_TOKEN_KEY, data.token);
    await SecureStore.setItemAsync(AUTH_USER_KEY, JSON.stringify(data.user));
    setUser(data.user);
  }

  async function updateUser(name: string) {
    await api.patch("/user/update", { name });
    const updated = { ...user!, name };
    await SecureStore.setItemAsync(AUTH_USER_KEY, JSON.stringify(updated));
    setUser(updated);
  }

  const signOut = useCallback(async () => {
    await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
    await SecureStore.deleteItemAsync(AUTH_USER_KEY);
    setUser(null);
  }, []);

  useEffect(() => {
    registerSignOut(signOut);
  }, [signOut]);

  useEffect(() => {
    async function loadStoredUser() {
      try {
        const [token, userData] = await Promise.all([
          SecureStore.getItemAsync(AUTH_TOKEN_KEY),
          SecureStore.getItemAsync(AUTH_USER_KEY),
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
    <AuthContext.Provider value={{ user, isLoadingUser, signIn, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
