import { colors } from "@/src/themes/colors";
import { Search } from "lucide-react-native";
import { TextInput, TextInputProps, View } from "react-native";

export function SearchInput({ ...rest }: TextInputProps) {
  return (
    <View className="flex-row flex-1 items-center bg-base-gray200 rounded-xl px-4 py-3 h-12">
      <Search size={24} color={colors.base.gray600} />
      <TextInput
        className="flex-1 ml-2 text-text-md text-base-gray700 font-regular"
        placeholderTextColor={colors.base.gray400}
        {...rest}
      />
    </View>
  );
}
