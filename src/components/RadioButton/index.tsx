import { cn } from "@/src/utils/cn";
import {
    Text,
    TouchableOpacity,
    TouchableOpacityProps,
    View,
} from "react-native";

type RadioButtonProps = TouchableOpacityProps & {
  isSelected: boolean;
  label?: string;
};

export function RadioButton({
  isSelected,
  label,
  className,
  ...rest
}: RadioButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={cn("flex-row items-center gap-3", className)}
      {...rest}
    >
      <View
        className={cn(
          "w-6 h-6 rounded-full items-center justify-center border-2",
          isSelected ? "border-main-purpleBase" : "border-base-gray400",
        )}
      >
        {isSelected && (
          <View className="w-3 h-3 rounded-full bg-main-purpleBase" />
        )}
      </View>
      {label && <Text className="text-text-md text-base-gray600">{label}</Text>}
    </TouchableOpacity>
  );
}
