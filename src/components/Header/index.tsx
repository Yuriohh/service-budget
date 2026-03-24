import { Plus } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

type HeaderProps = {
  title: string;
  subtitle?: string;
};

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <View className="flex-row justify-between items-center w-full px-6">
      <View>
        <Text className="text-title-lg font-bold text-main-purpleBase">
          {title}
        </Text>
        <Text className="text-title-sm text-base-gray500">{subtitle}</Text>
      </View>
      <TouchableOpacity className="flex-row items-center gap-2 bg-main-purpleBase px-4 py-3 rounded-xl">
        <Plus size={24} color="#fff" />
        <Text className="text-text-sm text-white">Novo</Text>
      </TouchableOpacity>
    </View>
  );
}
