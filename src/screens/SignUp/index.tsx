import { AuthStackParamList } from "@/src/@types/navigation";
import { Button } from "@/src/components/Button";
import { Input } from "@/src/components/Input";
import { api } from "@/src/services/api";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
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

type SignUpNavigation = NativeStackNavigationProp<AuthStackParamList, "SignUp">;

export function SignUp() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation<SignUpNavigation>();

  async function handleSignUp() {
    if (!nome.trim() || !email.trim() || !senha.trim()) {
      return Alert.alert("Atenção", "Preencha todos os campos.");
    }
    try {
      setIsLoading(true);
      await api.post("/user/register", {
        nome: nome.trim(),
        email: email.trim(),
        senha,
      });
      Alert.alert("Conta criada!", "Faça login para continuar.", [
        { text: "OK", onPress: () => navigation.navigate("SignIn") },
      ]);
    } catch (error) {
      Alert.alert(
        "Erro ao cadastrar",
        error instanceof Error
          ? error.message
          : "Não foi possível criar a conta.",
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
              Criar Conta
            </Text>
            <Text className="text-text-sm text-base-gray500">
              Preencha seus dados para começar
            </Text>
          </View>

          <View className="gap-3">
            <Input
              placeholder="Nome"
              autoCapitalize="words"
              autoCorrect={false}
              value={nome}
              onChangeText={setNome}
              className="px-4"
            />
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
            title={isLoading ? "Cadastrando..." : "Cadastrar"}
            onPress={handleSignUp}
            disabled={isLoading}
          />

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
            className="items-center"
          >
            <Text className="text-text-sm text-base-gray500">
              Já tem conta?{" "}
              <Text className="text-main-purpleBase font-bold">Entrar</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
