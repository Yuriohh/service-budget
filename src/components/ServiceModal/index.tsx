import { colors } from "@/src/themes/colors";
import {
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { Check, Trash2, X } from "lucide-react-native";
import { forwardRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Button } from "../Button";
import { HorizontalLine } from "../HorizontalLine";
import { Input } from "../Input";
import { Stepper } from "../Stepper";

export const ServiceModal = forwardRef<BottomSheetModal>((props, ref) => {
  const snapPoints = ["75%"];
  const { dismiss } = useBottomSheetModal();

  const [quantity, setQuantity] = useState(1);

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      handleIndicatorStyle={{ backgroundColor: colors.base.gray500 }}
    >
      <BottomSheetView className="flex-1 p-6 pb-8">
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-title-lg font-bold">Serviço</Text>
          <TouchableOpacity onPress={() => dismiss()}>
            <X size={24} color={colors.base.gray600} />
          </TouchableOpacity>
        </View>

        <View className="flex-1 gap-4">
          <Input placeholder="Título do serviço" className="pl-4" />
          <Input
            placeholder="Descrição"
            multiline={true}
            numberOfLines={4}
            textAlignVertical="top"
            className="!h-auto min-h-[120px] py-4 pl-4 rounded-xl"
          />

          <View className="flex-row items-center gap-4">
            <Input
              prefix="R$"
              placeholder="0,00"
              keyboardType="numeric"
              className="flex-1 pl-4"
            />
            <Stepper
              value={quantity}
              onIncrement={() => setQuantity((q) => q + 1)}
              onDecrement={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
            />
          </View>

          <View className="mt-8">
            <HorizontalLine className="mb-6 w-[200%]" />

            <View className="flex-row items-center justify-center gap-4">
              <TouchableOpacity
                activeOpacity={0.7}
                className="w-12 h-12 rounded-full border border-feedback-dangerBase items-center justify-center bg-white"
              >
                <Trash2 size={24} color={colors.feedback.dangerBase} />
              </TouchableOpacity>

              <Button
                title="Salvar"
                variant="solid"
                className=""
                icon={
                  <Check size={20} color="#fff" onPress={() => dismiss()} />
                }
              />
            </View>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});
