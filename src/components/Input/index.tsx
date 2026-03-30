import { colors } from "@/src/themes/colors";
import { cn } from "@/src/utils/cn";
import { TextInput, TextInputProps } from "react-native";

export function Input({ className, ...rest }: TextInputProps) {
  return (
    <TextInput
      className={cn(
        "h-12 w-full rounded-2xl border border-base-gray200 bg-white px-4 text-text-md text-base-gray600",
        className,
      )}
      placeholderTextColor={colors.base.gray400}
      {...rest}
    />
  );
}
