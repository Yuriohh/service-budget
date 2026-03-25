import { cn } from "@/src/utils/cn";
import { ReactNode } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

type ButtonProps = TouchableOpacityProps & {
  title: string;
  variant?: "solid" | "outline";
  icon?: ReactNode;
};

export function Button({
  title,
  variant = "solid",
  icon,
  className,
  ...rest
}: ButtonProps) {
  const isSolid = variant === "solid";

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={cn(
        "flex-row items-center justify-center rounded-full h-12 px-6 gap-2",
        isSolid
          ? "bg-main-purpleBase"
          : "bg-transparent border border-base-gray300",
        className,
      )}
      {...rest}
    >
      {icon && icon}
      <Text
        className={cn(
          "text-text-md font-bold",
          isSolid ? "text-white" : "text-main-purpleBase",
        )}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
