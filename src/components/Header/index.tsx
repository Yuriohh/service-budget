import { useNavigation } from "@react-navigation/native";
import { Plus, UserCircle } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { colors } from "@/src/themes/colors";

type HeaderProps = {
  title: string;
  subtitle?: string;
  showProfileButton?: boolean;
};

export function Header({ title, subtitle, showProfileButton }: HeaderProps) {
  const navigation = useNavigation();

  return (
    <View className="flex-row justify-between items-center w-full px-6">
      <View>
        <Text className="text-title-lg font-bold text-main-purpleBase">
          {title}
        </Text>
        <Text className="text-title-sm text-base-gray500">{subtitle}</Text>
      </View>
      <View className="flex-row items-center gap-3">
        {showProfileButton && (
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <UserCircle size={32} color={colors.main.purpleBase} />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          className="flex-row items-center gap-2 bg-main-purpleBase px-4 py-3 rounded-full"
          onPress={() => navigation.navigate("BudgetForm")}
        >
          <Plus size={24} color="#fff" />
          <Text className="text-text-sm text-white">Novo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
