import { AuthStackParamList } from "@/src/@types/navigation";
import { Input } from "@/src/components/Input";
import { useAuth } from "@/src/contexts/AuthContext";
import { api } from "@/src/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommonActions, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

const schema = z
  .object({
    password: z.string().min(8, "Mínimo 8 caracteres"),
    confirmPassword: z.string().min(1, "Confirme a senha"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;
type Navigation = NativeStackNavigationProp<AuthStackParamList, "ResetPassword">;
type Route = RouteProp<AuthStackParamList, "ResetPassword">;

export function ResetPassword() {
  const navigation = useNavigation<Navigation>();
  const { params } = useRoute<Route>();
  const { user, signOut } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function handleReset({ password }: FormData) {
    try {
      await api.post("/user/reset-password", { token: params.token, password, confirmPassword: password });
      if (user) {
        signOut();
      } else {
        navigation.dispatch(
          CommonActions.reset({ index: 0, routes: [{ name: "SignIn" }] }),
        );
      }
    } catch (error) {
      Alert.alert(
        "Erro",
        error instanceof Error
          ? error.message
          : "Não foi possível redefinir a senha.",
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
              Redefinir senha
            </Text>
            <Text className="text-text-sm text-base-gray500 text-center">
              Escolha uma nova senha para sua conta
            </Text>
          </View>

          <View className="gap-3">
            <View className="gap-1">
              <Controller
                control={control}
                name="password"
                render={({ field: { value, onChange, onBlur } }) => (
                  <Input
                    placeholder="Nova senha"
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

            <View className="gap-1">
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { value, onChange, onBlur } }) => (
                  <Input
                    placeholder="Confirmar senha"
                    secureTextEntry
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    className="px-4"
                  />
                )}
              />
              {errors.confirmPassword && (
                <Text className="text-text-xs text-red-500 px-1">
                  {errors.confirmPassword.message}
                </Text>
              )}
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleSubmit(handleReset)}
            disabled={isSubmitting}
            className="h-12 rounded-2xl bg-main-purpleBase items-center justify-center"
          >
            {isSubmitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white font-bold text-text-md">
                Redefinir senha
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
