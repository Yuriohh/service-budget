import { BudgetStatus } from "@/src/types/budget";
import { cn } from "@/src/utils/cn";
import { Text, View } from "react-native";

type BudgetStatusProps = {
  status: BudgetStatus;
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

export function StatusBadge({ status }: BudgetStatusProps) {
  const statusInfo = STATUS_STYLE[status];

  return (
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
  );
}
