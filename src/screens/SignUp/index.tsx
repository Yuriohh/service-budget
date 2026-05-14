import { AuthStackParamList } from "@/src/@types/navigation";
import { Button } from "@/src/components/Button";
import { Input } from "@/src/components/Input";
import { api } from "@/src/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

const signUpSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  email: z.string().min(1, "E-mail obrigatório").email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

type SignUpNavigation = NativeStackNavigationProp<AuthStackParamList, "SignUp">;

export function SignUp() {
  const navigation = useNavigation<SignUpNavigation>();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  async function handleSignUp({ name, email, password }: SignUpFormData) {
    try {
      await api.post("/user/register", { name, email, password });
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
            <View className="gap-1">
              <Controller
                control={control}
                name="name"
                render={({ field: { value, onChange, onBlur } }) => (
                  <Input
                    placeholder="Nome"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    className="px-4"
                  />
                )}
              />
              {errors.name && (
                <Text className="text-text-xs text-red-500 px-1">
                  {errors.name.message}
                </Text>
              )}
            </View>

            <View className="gap-1">
              <Controller
                control={control}
                name="email"
                render={({ field: { value, onChange, onBlur } }) => (
                  <Input
                    placeholder="E-mail"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    className="px-4"
                  />
                )}
              />
              {errors.email && (
                <Text className="text-text-xs text-red-500 px-1">
                  {errors.email.message}
                </Text>
              )}
            </View>

            <View className="gap-1">
              <Controller
                control={control}
                name="password"
                render={({ field: { value, onChange, onBlur } }) => (
                  <Input
                    placeholder="Senha"
                    secureTextEntry
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    className="px-4"
                  />
                )}
              />
              {errors.password && (
                <Text className="text-text-xs text-red-500 px-1">
                  {errors.password.message}
                </Text>
              )}
            </View>
          </View>

          <Button
            title={isSubmitting ? "Cadastrando..." : "Cadastrar"}
            onPress={handleSubmit(handleSignUp)}
            disabled={isSubmitting}
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
