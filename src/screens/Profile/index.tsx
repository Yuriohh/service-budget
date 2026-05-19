import { useAuth } from "@/src/contexts/AuthContext";
import { colors } from "@/src/themes/colors";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeft, LogOut, Pencil } from "lucide-react-native";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function Profile() {
  const navigation = useNavigation();
  const { user, signOut } = useAuth();

  const nameInitial = user?.name?.charAt(0).toUpperCase() ?? "?";

  function handleSignOut() {
    Alert.alert("Sair", "Deseja mesmo sair da sua conta?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Sair", style: "destructive", onPress: signOut },
    ]);
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <View className="flex-row items-center px-6 py-4 bg-white border-b border-base-gray200">
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color={colors.base.gray600} />
        </TouchableOpacity>
        <Text className="text-title-md font-bold flex-1 text-center mr-6">
          Perfil
        </Text>
      </View>

      <View className="flex-1 px-6 pt-10">
        <View className="items-center mb-8">
          <View className="w-20 h-20 rounded-full bg-main-purpleBase items-center justify-center mb-4">
            <Text className="text-white font-bold text-3xl">{nameInitial}</Text>
          </View>
          <Text className="text-title-md font-bold text-base-gray700">
            {user?.name}
          </Text>
          <Text className="text-text-md text-base-gray500 mt-1">
            {user?.email}
          </Text>
        </View>

        <View className="bg-white border border-base-gray200 rounded-xl overflow-hidden">
          <TouchableOpacity
            activeOpacity={0.7}
            className="flex-row items-center gap-4 px-4 py-4"
          >
            <View className="w-10 h-10 rounded-full bg-main-purpleLight items-center justify-center">
              <Pencil size={18} color={colors.main.purpleBase} />
            </View>
            <Text className="flex-1 text-text-md font-bold text-base-gray600">
              Editar nome
            </Text>
            <ChevronLeft
              size={20}
              color={colors.base.gray400}
              style={{ transform: [{ rotate: "180deg" }] }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View className="px-6 pb-6">
        <TouchableOpacity
          activeOpacity={0.7}
          className="flex-row items-center gap-4 px-4 py-4 bg-white border border-base-gray200 rounded-xl"
          onPress={handleSignOut}
        >
          <View className="w-10 h-10 rounded-full bg-feedback-dangerLight items-center justify-center">
            <LogOut size={18} color={colors.feedback.dangerBase} />
          </View>
          <Text className="flex-1 text-text-md font-bold text-feedback-dangerBase">
            Sair da conta
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
