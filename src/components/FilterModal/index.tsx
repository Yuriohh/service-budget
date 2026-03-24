import { colors } from "@/src/themes/colors";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { forwardRef } from "react";
import { Text } from "react-native";

export const FilterModal = forwardRef<BottomSheetModal>((props, ref) => {
  const snapPoints = ["60%"];

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      handleIndicatorStyle={{ backgroundColor: colors.base.gray500 }}
    >
      <BottomSheetView className="flex-1 p-6">
        <Text className="text-title-lg font-bold">Filtrar e ordenar</Text>
      </BottomSheetView>
    </BottomSheetModal>
  );
});
