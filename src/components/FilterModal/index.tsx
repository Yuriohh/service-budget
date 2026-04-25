import { colors } from "@/src/themes/colors";
import { BudgetStatus, SortOption } from "@/src/types/budget";
import { cn } from "@/src/utils/cn";
import {
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { Check, X } from "lucide-react-native";
import { forwardRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { StatusBadge } from "../BudgetStatus";
import { Button } from "../Button";
import { HorizontalLine } from "../HorizontalLine";

const SORT_OPTIONS: SortOption[] = [
  { label: "Mais Recente", value: "newest" },
  { label: "Mais Antigo", value: "oldest" },
  { label: "Maior Valor", value: "highest" },
  { label: "Menor Valor", value: "lowest" },
];

const STATUS_OPTIONS: BudgetStatus[] = [
  "draft",
  "sent",
  "approved",
  "rejected",
];

type FilterModalProps = {
  onApplyFilters: (statuses: BudgetStatus[]) => void;
  onOrderOptions: (sort: SortOption) => void;
};

export const FilterModal = forwardRef<BottomSheetModal, FilterModalProps>(
  ({ onApplyFilters, onOrderOptions }, ref) => {
    const snapPoints = ["70%"];
    const { dismiss } = useBottomSheetModal();

    const [selectStatuses, setSelectStatues] = useState<BudgetStatus[]>([]);
    const [sortBy, setSortBy] = useState<SortOption>({
      value: "newest",
      label: "Mais Recente",
    });

    function toggleStatus(status: BudgetStatus) {
      if (selectStatuses.includes(status)) {
        setSelectStatues((prev) => prev.filter((s) => s !== status));
      } else {
        setSelectStatues((prev) => [...prev, status]);
      }
    }

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        handleIndicatorStyle={{ backgroundColor: colors.base.gray500 }}
      >
        <BottomSheetView className="flex-1 p-6">
          <View className="flex-row justify-between items-center">
            <Text className="text-title-lg font-bold">Filtrar e ordenar</Text>
            <TouchableOpacity onPress={() => dismiss()}>
              <X size={24} color={colors.base.gray600} />
            </TouchableOpacity>
          </View>

          <HorizontalLine className="my-6" />

          <Text className="text-title-sm mb-4">Status</Text>

          {STATUS_OPTIONS.map((statusOption) => {
            const isChecked = selectStatuses.includes(statusOption);

            return (
              <TouchableOpacity
                key={statusOption}
                activeOpacity={0.7}
                onPress={() => toggleStatus(statusOption)}
                className="flex-row items-center gap-3 mb-4"
              >
                <View
                  className={cn(
                    "w-6 h-6 rounded-md items-center justify-center border-2",
                    isChecked
                      ? "bg-main-purpleBase border-main-purpleBase"
                      : "bg-transparent border-base-gray400",
                  )}
                >
                  {isChecked && (
                    <Check size={16} color="#fff" strokeWidth={2} />
                  )}
                </View>
                <StatusBadge status={statusOption} />
              </TouchableOpacity>
            );
          })}

          <Text className="text-title-sm mb-4 mt-4">Ordenar por</Text>

          {SORT_OPTIONS.map((option) => {
            const isSelected = sortBy?.value === option.value;

            return (
              <TouchableOpacity
                key={option.label}
                activeOpacity={0.7}
                onPress={() => setSortBy(option)}
                className="flex-row items-center gap-3 mb-4"
              >
                <View
                  className={cn(
                    "w-6 h-6 rounded-full items-center justify-center border-2",
                    isSelected
                      ? "border-main-purpleBase"
                      : "border-base-gray400",
                  )}
                >
                  {isSelected && (
                    <View className="w-3 h-3 rounded-full bg-main-purpleBase" />
                  )}
                </View>
                <Text className="text-text-md text-base-gray600">
                  {option.label}
                </Text>
              </TouchableOpacity>
            );
          })}

          <HorizontalLine className="my-6" />

          <View className="flex-row items-center justify-center gap-4 mt-2">
            <Button
              title="Resetar filtros"
              variant="outline"
              onPress={() => {
                setSelectStatues([]);
                setSortBy({ value: "newest", label: "Mais Recente" });
              }}
            />
            <Button
              title="Aplicar"
              variant="solid"
              icon={<Check size={18} color="#fff" />}
              onPress={() => {
                onApplyFilters(selectStatuses);
                onOrderOptions(sortBy!);
                dismiss();
              }}
            />
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);
