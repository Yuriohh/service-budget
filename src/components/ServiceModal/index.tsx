import { colors } from "@/src/themes/colors";
import { BudgetItem } from "@/src/types/budget";
import {
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { Check, Trash2, X } from "lucide-react-native";
import { forwardRef, useEffect, useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import uuid from "react-native-uuid";
import { Button } from "../Button";
import { HorizontalLine } from "../HorizontalLine";
import { Input } from "../Input";
import { Stepper } from "../Stepper";

type ServiceModalProps = {
  onAddService: (newService: BudgetItem) => void;
  serviceToEdit?: BudgetItem | null;
  onEditingService: (service: BudgetItem) => void;
  onRemoveService: (service: BudgetItem) => void;
};

export const ServiceModal = forwardRef<BottomSheetModal, ServiceModalProps>(
  ({ onAddService, serviceToEdit, onEditingService, onRemoveService }, ref) => {
    const snapPoints = useMemo(() => ["70%"], []);
    const { dismiss } = useBottomSheetModal();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
      if (serviceToEdit) {
        setTitle(serviceToEdit.title);
        setDescription(serviceToEdit.description);
        setPrice(serviceToEdit.price.toString());
        setQuantity(serviceToEdit.quantity);
      } else {
        setTitle("");
        setDescription("");
        setPrice("");
        setQuantity(1);
      }
    }, [serviceToEdit]);

    function handleSave() {
      if (!title || !price) return;

      if (serviceToEdit) {
        const updatedService: BudgetItem = {
          id: serviceToEdit.id,
          title,
          description,
          quantity,
          price: Number(price.replace(",", ".")),
        };

        onEditingService(updatedService);

        setTitle("");
        setDescription("");
        setPrice("");
        setQuantity(1);

        dismiss();
      } else {
        const generatedService: BudgetItem = {
          id: uuid.v4() as string,
          title,
          description,
          quantity,
          price: Number(price.replace(",", ".")),
        };

        onAddService(generatedService);
        setTitle("");
        setDescription("");
        setPrice("");
        setQuantity(1);

        dismiss();
      }
    }

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        handleIndicatorStyle={{ backgroundColor: colors.base.gray500 }}
        enableDynamicSizing={false}
      >
        <BottomSheetView className="flex-1 p-6 pb-8">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-title-lg font-bold">Serviço</Text>
            <TouchableOpacity onPress={() => dismiss()}>
              <X size={24} color={colors.base.gray600} />
            </TouchableOpacity>
          </View>

          <View className="flex-1 gap-4">
            <Input
              placeholder="Título do serviço"
              className="pl-4"
              value={title}
              onChangeText={setTitle}
            />
            <Input
              placeholder="Descrição"
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
              className="!h-auto min-h-[120px] py-4 pl-4 rounded-xl"
              value={description}
              onChangeText={setDescription}
            />

            <View className="flex-row items-center gap-4">
              <Input
                prefix="R$"
                placeholder="0,00"
                keyboardType="numeric"
                className="flex-1 pl-4"
                value={price}
                onChangeText={setPrice}
              />
              <Stepper
                value={quantity}
                onIncrement={() => setQuantity((q) => q + 1)}
                onDecrement={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
              />
            </View>

            <HorizontalLine className="mb-6 w-[200%]" />

            <View className="flex-row items-center justify-center gap-4">
              <TouchableOpacity
                activeOpacity={0.7}
                className="w-12 h-12 rounded-full border border-feedback-dangerBase items-center justify-center bg-white"
                onPress={() => {
                  if (serviceToEdit) {
                    onRemoveService(serviceToEdit);
                  }
                  dismiss();
                }}
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
                onPress={handleSave}
              />
            </View>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);
