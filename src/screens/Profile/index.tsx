import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function Profile() {
  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <View className="flex-1 items-center justify-center">
        <Text className="text-title-lg font-bold text-main-purpleBase">
          Perfil
        </Text>
      </View>
    </SafeAreaView>
  );
}
