import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../../components/Header";

export function Home() {
  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <Header title="Title" subtitle="Subtitle" />
      <View className="h-[1px] bg-base-gray200 w-full my-4" />
      <Text className="text-3xl font-bold text-blue-700">Service Budget</Text>
      <Text className="text-gray-600 mt-2 text-lg">Esta é a @HomeScreen</Text>
    </SafeAreaView>
  );
}
