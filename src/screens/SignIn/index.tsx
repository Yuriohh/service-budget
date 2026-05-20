import { AuthStackParamList } from "@/src/@types/navigation";
import { Button } from "@/src/components/Button";
import { Input } from "@/src/components/Input";
import { useAuth } from "@/src/contexts/AuthContext";
import { api } from "@/src/services/api";
import { colors } from "@/src/themes/colors";
import {
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { X } from "lucide-react-native";
import { useMemo, useRef, useState } from "react";
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

const signInSchema = z.object({
  email: z.string().min(1, "E-mail obrigatório").email("E-mail inválido"),
  password: z.string().min(1, "Senha obrigatória"),
});

type SignInFormData = z.infer<typeof signInSchema>;

type SignInNavigation = NativeStackNavigationProp<AuthStackParamList, "SignIn">;

function ForgotPasswordSheet() {
  const { dismiss } = useBottomSheetModal();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    const trimmed = email.trim();
    if (!trimmed) {
      setError("Informe seu e-mail.");
      return;
    }
    setError("");
    setIsLoading(true);
    try {
      await api.post("/user/forgot-password", { email: trimmed });
      dismiss();
      Alert.alert(
        "E-mail enviado",
        "Um e-mail foi enviado para você com as instruções para recuperar a senha.",
      );
    } catch (err: any) {
      setError(err?.message ?? "Não foi possível enviar o e-mail. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <BottomSheetView className="p-6 pb-10 gap-4">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-title-lg font-bold text-base-gray700">
          Esqueci minha senha
        </Text>
        <TouchableOpacity onPress={() => dismiss()}>
          <X size={24} color={colors.base.gray600} />
        </TouchableOpacity>
      </View>

      <Text className="text-text-sm text-base-gray500">
        Informe seu e-mail para receber o link de redefinição de senha.
      </Text>

      <Input
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        className="px-4"
        value={email}
        onChangeText={(v) => {
          setEmail(v);
          setError("");
        }}
        autoFocus
      />

      {!!error && (
        <Text className="text-text-sm text-feedback-dangerBase">{error}</Text>
      )}

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleSubmit}
        disabled={isLoading}
        className="h-12 rounded-2xl bg-main-purpleBase items-center justify-center"
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white font-bold text-text-md">Enviar</Text>
        )}
      </TouchableOpacity>
    </BottomSheetView>
  );
}

export function SignIn() {
  const { signIn } = useAuth();
  const navigation = useNavigation<SignInNavigation>();
  const forgotPasswordRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["50%"], []);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  async function handleSignIn({ email, password }: SignInFormData) {
    try {
      await signIn(email, password);
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
            title={isSubmitting ? "Entrando..." : "Entrar"}
            onPress={handleSubmit(handleSignIn)}
            disabled={isSubmitting}
          />

          <TouchableOpacity
            onPress={() => forgotPasswordRef.current?.present()}
            activeOpacity={0.7}
            className="items-center"
          >
            <Text className="text-text-sm text-main-purpleBase font-bold">
              Esqueci minha senha
            </Text>
          </TouchableOpacity>

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

      <BottomSheetModal
        ref={forgotPasswordRef}
        snapPoints={snapPoints}
        handleIndicatorStyle={{ backgroundColor: colors.base.gray500 }}
        enableDynamicSizing={false}
      >
        <ForgotPasswordSheet />
      </BottomSheetModal>
    </SafeAreaView>
  );
}
