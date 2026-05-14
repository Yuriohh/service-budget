import { AuthStackParamList } from "@/src/@types/navigation";
import { Button } from "@/src/components/Button";
import { Input } from "@/src/components/Input";
import { useAuth } from "@/src/contexts/AuthContext";
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

const signInSchema = z.object({
  email: z.string().min(1, "E-mail obrigatório").email("E-mail inválido"),
  senha: z.string().min(1, "Senha obrigatória"),
});

type SignInFormData = z.infer<typeof signInSchema>;

type SignInNavigation = NativeStackNavigationProp<AuthStackParamList, "SignIn">;

export function SignIn() {
  const { signIn } = useAuth();
  const navigation = useNavigation<SignInNavigation>();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  async function handleSignIn({ email, senha }: SignInFormData) {
    try {
      await signIn(email, senha);
    } catch (error) {
      Alert.alert(
        "Erro ao entrar",
        error instanceof Error ? error.message : "Não foi possível fazer login.",
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
              Service Budget
            </Text>
            <Text className="text-text-sm text-base-gray500">
              Gerencie seus orçamentos
            </Text>
          </View>

          <View className="gap-3">
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
                name="senha"
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
              {errors.senha && (
                <Text className="text-text-xs text-red-500 px-1">
                  {errors.senha.message}
                </Text>
              )}
            </View>
          </View>

          <Button
            title={isSubmitting ? "Entrando..." : "Entrar"}
            onPress={handleSubmit(handleSignIn)}
            disabled={isSubmitting}
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
