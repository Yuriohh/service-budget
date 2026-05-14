import { AuthStackParamList } from "@/src/@types/navigation";
import { Button } from "@/src/components/Button";
import { Input } from "@/src/components/Input";
import { useAuth } from "@/src/contexts/AuthContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type SignInNavigation = NativeStackNavigationProp<AuthStackParamList, "SignIn">;

export function SignIn() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { signIn } = useAuth();
  const navigation = useNavigation<SignInNavigation>();

  async function handleSignIn() {
    if (!email.trim() || !senha.trim()) {
      return Alert.alert("Atenção", "Preencha e-mail e senha.");
    }
    try {
      setIsLoading(true);
      await signIn(email.trim(), senha);
    } catch (error) {
      Alert.alert(
        "Erro ao entrar",
        error instanceof Error ? error.message : "Não foi possível fazer login."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-base-gray100">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View className="flex-1 justify-center px-6 gap-6">
          <View className="items-center gap-1">
            <Text className="text-title-lg font-bold text-main-purpleBase">
              Service Budget
            </Text>
            <Text className="text-text-sm text-base-gray500">
              Gerencie seus orçamentos
            </Text>
          </View>

          <View className="gap-3">
            <Input
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
              className="px-4"
            />
            <Input
              placeholder="Senha"
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
              className="px-4"
            />
          </View>

          <Button
            title={isLoading ? "Entrando..." : "Entrar"}
            onPress={handleSignIn}
            disabled={isLoading}
          />

          <TouchableOpacity
            onPress={() => navigation.navigate("SignUp")}
            activeOpacity={0.7}
            className="items-center"
          >
            <Text className="text-text-sm text-base-gray500">
              Não tem conta?{" "}
              <Text className="text-main-purpleBase font-bold">Cadastre-se</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
