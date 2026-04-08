import { StatusBadge } from "@/src/components/BudgetStatus";
import { Button } from "@/src/components/Button";
import { HorizontalLine } from "@/src/components/HorizontalLine";
import { colors } from "@/src/themes/colors";
import { formatCurrency } from "@/src/utils/formatCurrency";
import { useNavigation } from "@react-navigation/native";
import {
  ChevronLeft,
  Copy,
  FileText,
  Pencil,
  Send,
  Store,
  Trash2,
  Wallet,
} from "lucide-react-native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const mockBudgetDetails = {
  id: "1",
  title: "Desenvolvimento de app",
  client: "Yuriohh",
  createdAt: "22/08/2024",
  updatedAt: "22/08/2025",
};

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

export function BudgetDetails() {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <View className="flex-row items-center px-6 py-4 bg-white border-b border-base-gray200">
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <ChevronLeft size={24} color={colors.base.gray600} />
        </TouchableOpacity>

        <Text className="text-title-md font-bold text-center mr-20 flex-1">
          Orçamento {mockBudgetDetails.id}
        </Text>
        <StatusBadge status="sent" />
      </View>

      <ScrollView className="flex-1 px-6 pt-6">
        <View className="bg-white border border-base-gray200 rounded-xl p-4 mb-4">
          <View className="flex-row items-center gap-4 mb-6">
            <View className="w-12 h-12 rounded-xl bg-main-purpleLight items-center justify-center">
              <Store size={24} color={colors.main.purpleBase} />
            </View>
            <Text className="flex-1 text-title-md font-bold text-base-gray600">
              {mockBudgetDetails.title}
            </Text>
          </View>

          <HorizontalLine className="my-4" />

          <View className="mb-4">
            <Text className="text-text-sm text-base-gray500 mb-1">Cliente</Text>
            <Text className="text-text-md text-base-gray600 font-bold">
              {mockBudgetDetails.client}
            </Text>
          </View>
          <View className="flex-row">
            <View className="w-1/2">
              <Text className="text-text-sm text-base-gray500 mb-1">
                Criado em
              </Text>
              <Text className="text-text-md text-base-gray600">
                {mockBudgetDetails.createdAt}
              </Text>
            </View>
            <View className="w-1/2">
              <Text className="text-text-sm text-base-gray500 mb-1">
                Atualizado em
              </Text>
              <Text className="text-text-md text-base-gray600">
                {mockBudgetDetails.updatedAt}
              </Text>
            </View>
          </View>
        </View>

        <View className="bg-white border border-base-gray200 rounded-xl p-4 mb-4">
          <View className="flex-row items-center gap-2">
            <FileText size={20} color={colors.main.purpleBase} />
            <Text className="text-title-sm text-base-gray500">
              Serviços inclusos
            </Text>
          </View>

          <HorizontalLine className="my-4" />

          {mockServices.map((service, index) => (
            <View key={service.id}>
              <View className="flex-row justify-between mb-2 mt-4">
                <View className="flex-1 pr-4">
                  <Text className="text-text-md font-bold text-base-gray600">
                    {service.title}
                  </Text>
                  <Text className="text-text-sm text-base-gray500 mt-1">
                    {service.description}
                  </Text>
                </View>
                <View className="items-end">
                  <Text className="text-text-md font-bold text-base-gray600">
                    {formatCurrency(service.price)}
                  </Text>
                  <Text className="text-text-sm text-base-gray500 mt-1">
                    Qt: {service.quantity}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View className="bg-white border border-base-gray200 rounded-xl p-4 mb-24 flex-row">
          <View className="w-12 h-12 rounded-xl bg-main-purpleLight items-center justify-center mr-4">
            <Wallet size={24} color={colors.main.purpleBase} />
          </View>
          <View className="flex-1 justify-center">
            <View className="flex-row justify-between items-center mb-1">
              <Text className="text-text-md text-base-gray500">Subtotal</Text>
              <Text className="text-text-sm text-base-gray400 line-through">
                {formatCurrency(4050)}
              </Text>
            </View>
            <View className="flex-row justify-between items-center mb-6">
              <View className="flex-row items-center gap-2">
                <Text className="text-text-md text-base-gray500">Desconto</Text>
                <View className="bg-green-100 px-2 py-0.5 rounded-md">
                  <Text className="text-green-700 font-bold text-[10px]">
                    5% OFF
                  </Text>
                </View>
              </View>
              <Text className="text-text-sm text-feedback-successBase font-bold">
                - {formatCurrency(200)}
              </Text>
            </View>
            <View className="flex-row justify-between items-end mt-2">
              <Text className="text-text-md font-bold text-base-gray600">
                Investimento total
              </Text>
              <Text className="text-title-sm font-bold text-base-gray600">
                {formatCurrency(3847.5)}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="px-6 py-4 bg-white border-t border-base-gray200 flex-row justify-between">
        <View className="flex-row gap-3">
          <TouchableOpacity className="w-12 h-12 rounded-full border border-feedback-dangerBase items-center justify-center">
            <Trash2 size={24} color={colors.feedback.dangerBase} />
          </TouchableOpacity>
          <TouchableOpacity className="w-12 h-12 rounded-full border border-base-gray300 items-center justify-center">
            <Copy size={24} color={colors.main.purpleBase} />
          </TouchableOpacity>
          <TouchableOpacity
            className="w-12 h-12 rounded-full border border-base-gray300 items-center justify-center"
            onPress={() =>
              navigation.navigate("BudgetForm", { id: mockBudgetDetails.id })
            }
          >
            <Pencil size={24} color={colors.main.purpleBase} />
          </TouchableOpacity>
        </View>

        <View>
          <Button
            title="Compartilhar"
            variant="solid"
            className="flex-1"
            icon={<Send size={20} color="#fff" />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
