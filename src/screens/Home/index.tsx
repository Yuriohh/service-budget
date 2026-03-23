import { SearchInput } from "@/src/components/SearchInput";
import { colors } from "@/src/themes/colors";
import { SlidersHorizontal } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../../components/Header";

export function Home() {
  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <Header title="Title" subtitle="Subtitle" />

      <View className="h-[1px] bg-base-gray300 w-full my-4" />
      <View className="w-full px-6 mt-6">
        <View className="flex-row items-center gap-3 w-full">
          <SearchInput placeholder="Buscar serviço" />
          <TouchableOpacity className="bg-base-gray200 w-12 h-12 rounded-xl items-center justify-center">
            <SlidersHorizontal size={24} color={colors.main.purpleBase} />
          </TouchableOpacity>
        </View>
      </View>

      <Text className="text-3xl font-bold text-blue-700">Service Budget</Text>
      <Text className="text-gray-600 mt-2 text-lg">Esta é a @HomeScreen</Text>
    </SafeAreaView>
  );
}
