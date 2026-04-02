import { colors } from "@/src/themes/colors";
import { Minus, Plus } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

type StepperPorps = {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

export function Stepper({ value, onIncrement, onDecrement }: StepperPorps) {
  return (
    <View className="h-12 flex-row items-center justify-between border border-base-gray200 rounded-2xl px-3 min-w-[100px]">
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onDecrement}
        className="p-1"
      >
        <Minus size={20} color={colors.main.purpleBase} />
      </TouchableOpacity>
      <Text className="text-text-md text-base-gray600 font-bold">{value}</Text>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onIncrement}
        className="p-1"
      >
        <Plus size={20} color={colors.main.purpleBase} />
      </TouchableOpacity>
    </View>
  );
}
