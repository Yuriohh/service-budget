import { cn } from "@/src/utils/cn";
import { View } from "react-native";

export function HorizontalLine({ className }: { className?: string }) {
  return (
    <View className={cn("h-[1px] w-[150%] bg-base-gray200 -ml-6", className)} />
  );
}
