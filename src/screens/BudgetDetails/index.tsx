import { StatusBadge } from "@/src/components/BudgetStatus";
import { Button } from "@/src/components/Button";
import { HorizontalLine } from "@/src/components/HorizontalLine";
import { Input } from "@/src/components/Input";
import { RadioButton } from "@/src/components/RadioButton";
import { colors } from "@/src/themes/colors";
import { BudgetStatus } from "@/src/types/budget";
import { formatCurrency } from "@/src/utils/formatCurrency";
import { useNavigation } from "@react-navigation/native";
import {
  BriefcaseBusiness,
  ChevronLeft,
  FileText,
  Pencil,
  Plus,
  Tag,
  Wallet,
} from "lucide-react-native";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const STATUS_OPTIONS: BudgetStatus[] = [
  "draft",
  "sent",
  "approved",
  "rejected",
];

const mockServices = [
  {
    id: "1",
    title: "Design de interfaces",
    description: "Criação de wireframes e protóti...",
    price: 3847.5,
    quantity: 1,
  },
  {
    id: "2",
    title: "Implantação e suporte",
    description: "Publicação nas lojas de aplicativ...",
    price: 3847.5,
    quantity: 1,
  },
];

export function BudgetdDetails() {
  const navigation = useNavigation<any>();
  const [selectedStatus, setSelectedStatus] = useState<BudgetStatus>("draft");

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <View className="flex-row items-center px-6 py-4 border-b border-base-gray200 bg-white">
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          className="mr-6"
        >
          <ChevronLeft size={24} color={colors.base.gray600} />
        </TouchableOpacity>
        <Text className="text-title-md font-bold text-start flex-1">
          Orçamento
        </Text>
      </View>

      <ScrollView
        className="flex-1 px-6 pt-6"
        showsVerticalScrollIndicator={false}
      >
        <View className="bg-white border border-base-gray200 rounded-xl p-4 mb-4">
          <View className="flex-row items-center gap-2">
            <BriefcaseBusiness size={20} color={colors.main.purpleBase} />
            <Text className="text-title-sm text-base-gray500">
              Informações Gerais
            </Text>
          </View>

          <HorizontalLine className="my-4" />

          <View className="gap-3">
            <Input placeholder="Título" />
            <Input placeholder="Cliente" />
          </View>
        </View>

        <View className="bg-white border border-base-gray200 rounded-xl p-4 mb-4">
          <View className="flex-row items-center gap-2">
            <Tag size={20} color={colors.main.purpleBase} />
            <Text className="text-title-sm text-base-gray500">Status</Text>
          </View>

          <HorizontalLine className="my-4" />

          <View className="flex-row flex-wrap gap-y-4">
            {STATUS_OPTIONS.map((statusOp) => (
              <View
                key={statusOp}
                className="flex-row items-center gap-3 w-1/2"
              >
                <RadioButton
                  isSelected={selectedStatus === statusOp}
                  onPress={() => setSelectedStatus(statusOp)}
                />
                <StatusBadge status={statusOp} />
              </View>
            ))}
          </View>
        </View>

        <View className="bg-white -border border-base-gray200 rounded-xl p-4 mb-4">
          <View className="flex-row items-center gap-2">
            <FileText size={20} color={colors.main.purpleBase} />
            <Text className="text-title-sm text-base-gray500">
              Serviços Inclusos
            </Text>
          </View>

          <HorizontalLine className="my-4" />

          {mockServices.map((service) => (
            <View key={service.id} className="mb-4">
              <View className="flex-row justify-between">
                <View className="flex-1 pr-4">
                  <Text
                    className="text-text-md font-bold text-base-gray600"
                    numberOfLines={1}
                  >
                    {service.title}
                  </Text>
                  <Text className="text-text-sm text-base-gray500 mt-1">
                    {service.description}
                  </Text>
                </View>

                <View className="flex-row items-center gap-4">
                  <View className="items-end">
                    <Text className="text-text-md font-bold text-base-gray600">
                      {formatCurrency(service.price)}
                    </Text>
                    <Text className="text-text-sm text-base-gray500 mt-1">
                      Qt: {service.quantity}
                    </Text>
                  </View>

                  <TouchableOpacity activeOpacity={0.7}>
                    <Pencil size={20} color={colors.main.purpleBase} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
          <Button
            title="Adicionar Serviço"
            variant="dashed"
            icon={<Plus size={20} color={colors.main.purpleBase} />}
            className="w-full mt-2"
          />
        </View>

        <View className="bg-white border border-base-gray200 rounded-xl p-4 mb-24">
          <View className="flex-row items-center gap-2 mb-4">
            <Wallet size={20} color={colors.main.purpleBase} />
            <Text className="text-title-sm text-base-gray500">
              Investimentos
            </Text>
          </View>

          <HorizontalLine className="my-4" />

          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-text-md font-bold text-base-gray600">
              Subtotal
            </Text>
            <View className="flex-row items-center gap-3">
              <Text className="text-text-sm text-base-gray500">2 Itens</Text>
              <Text className="text-text-md text-base-gray600">
                {formatCurrency(7695)}
              </Text>
            </View>
          </View>

          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-text-md text-base-gray600">Desconto</Text>
            <View className="flex-row items-center gap-3">
              <View className="flex-row items-center border border-base-gray200 rounded-2xl px-3 bg-white h-10 gap-1">
                <Input
                  className="h-full border-0 p-0 rounded-none w-8 text-center"
                  placeholder="8"
                  keyboardType="numeric"
                />
                <Text className="text-text-md text-base-gray600">%</Text>
              </View>
              <Text className="text-text-md text-feedback-dangerLight">
                -{formatCurrency(615.6)}
              </Text>
            </View>
          </View>

          <HorizontalLine className="mb-4" />

          <View className="flex-row justify-between items-end">
            <Text className="text-text-md text-base-gray600">Valor Total</Text>
            <View className="items-end justify-center">
              <Text className="text-title-lg font-bold">
                {formatCurrency(7079.4)}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="justify-center px-6 py-4 border-t border-base-gray200 bg-white flex-row gap-4">
        <Button title="Cancelar" variant="outline" className="" />
        <Button title="Salvar" variant="solid" className="" />
      </View>
    </SafeAreaView>
  );
}
