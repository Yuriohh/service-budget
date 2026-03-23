import { Budget } from "@/src/types/budget";
import { cn } from "@/src/utils/cn";
import { Text, View } from "react-native";

type BudgetCardProps = {
  data: Budget;
};

const STATUS_STYLE = {
  draft: {
    bg: "bg-base-gray300",
    dot: "bg-base-gray500",
    text: "text-base-gray600",
    label: "Rascunho",
  },
  approved: {
    bg: "bg-feedback-successLight",
    dot: "bg-feedback-successBase",
    text: "text-feedback-successDark",
    label: "Aprovado",
  },
  rejected: {
    bg: "bg-feedback-dangerLight",
    dot: "bg-feedback-dangerBase",
    text: "text-feedback-dangerDark",
    label: "Recusado",
  },
  sent: {
    bg: "bg-feedback-infoLight",
    dot: "bg-feedback-infoBase",
    text: "text-feedback-infoDark",
    label: "Enviado",
  },
};

export function BudgetCard({ data }: BudgetCardProps) {
  const statusInfo = STATUS_STYLE[data.status];
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
        <View
          className={cn(
            "flex-row items-center gap-1 px-2 py-1 rounded-full",
            statusInfo.bg,
          )}
        >
          <View className={cn("w-2 h-2 rounded-full", statusInfo.dot)} />
          <Text className={cn("text-text-xs font-bold", statusInfo.text)}>
            {statusInfo.label}
          </Text>
        </View>
        <Text className="text-text-md font-bold">{formattedPrice}</Text>
      </View>
    </View>
  );
}
