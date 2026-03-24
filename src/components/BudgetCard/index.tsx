import { Budget } from "@/src/types/budget";
import { Text, View } from "react-native";
import { StatusBadge } from "../BudgetStatus";

type BudgetCardProps = {
  data: Budget;
};

export function BudgetCard({ data }: BudgetCardProps) {
  const formattedPrice = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(data.totalPrice);

  return (
    <View className="flex-row justify-between bg-base-gray200 p-4 rounded-xl mb-3 h-[104px]">
      <View className="flex-1 justify-between mr-4 pt-1">
        <Text className="text-text-md font-bold" numberOfLines={2}>
          {data.title}
        </Text>
        <Text className="text-text-sm text-base-gray600">{data.client}</Text>
      </View>

      <View className="flex-col items-end justify-between">
        <StatusBadge status={data.status} />
        <Text className="text-text-md font-bold">{formattedPrice}</Text>
      </View>
    </View>
  );
}
