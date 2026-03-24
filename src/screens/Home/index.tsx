import { BudgetCard } from "@/src/components/BudgetCard";
import { FilterModal } from "@/src/components/FilterModal";
import { SearchInput } from "@/src/components/SearchInput";
import { colors } from "@/src/themes/colors";
import { Budget } from "@/src/types/budget";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { SlidersHorizontal } from "lucide-react-native";
import { useRef } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../../components/Header";

const mockData: Budget[] = [
  {
    id: "1",
    title: "Serviço 1",
    client: "Cliente 1",
    items: [
      {
        id: "1",
        description: "Serviço 1",
        quantity: 1,
        price: 100,
      },
    ],
    discount: 0,
    status: "approved",
    totalPrice: 100,
    createdAt: "2022-01-01",
    updatedAt: "2022-01-01",
  },
  {
    id: "2",
    title: "Serviço 2",
    client: "Cliente 2",
    items: [
      {
        id: "2",
        description: "Serviço 2",
        quantity: 1,
        price: 100,
      },
    ],
    discount: 0,
    status: "rejected",
    totalPrice: 100,
    createdAt: "2022-01-01",
    updatedAt: "2022-01-01",
  },
];

export function Home() {
  const filterModalRef = useRef<BottomSheetModal>(null);

  function handleOpenFilter() {
    filterModalRef.current?.present();
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <Header title="Orçamentos" />

      <View className="h-[1px] bg-base-gray300 w-full my-4" />
      <View className="w-full px-6 my-6">
        <View className="flex-row items-center gap-3 w-full">
          <SearchInput placeholder="Buscar serviço" />
          <TouchableOpacity
            className="bg-base-gray200 w-12 h-12 rounded-xl items-center justify-center"
            onPress={handleOpenFilter}
          >
            <SlidersHorizontal size={24} color={colors.main.purpleBase} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={mockData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <BudgetCard data={item} />}
        contentContainerStyle={{
          gap: 12,
          paddingBottom: 24,
          marginHorizontal: 22,
        }}
        showsVerticalScrollIndicator={false}
      />

      <FilterModal ref={filterModalRef} />
    </SafeAreaView>
  );
}
