import { colors } from "@/src/themes/colors";
import { cn } from "@/src/utils/cn";
import { Text, TextInput, TextInputProps, View } from "react-native";

type CustomInputProps = TextInputProps & {
  prefix?: string;
};

export function Input({ className, prefix, ...rest }: CustomInputProps) {
  return (
    <View
      className={cn(
        "h-12 w-full rounded-2xl border border-base-gray200 bg-white flex-row items-center",
        className,
      )}
    >
      {prefix && (
        <Text className="text-text-md text-base-gray600 mr-2">{prefix}</Text>
      )}
      <TextInput
        className="flex-1 text-text-md text-base-gray600 h-full"
        placeholderTextColor={colors.base.gray400}
        {...rest}
      />
    </View>
  );
}
