import { BudgetCard } from "@/src/components/BudgetCard";
import { FilterModal } from "@/src/components/FilterModal";
import { SearchInput } from "@/src/components/SearchInput";
import { budgetGetAll } from "@/src/storage/budget/budgetGetAll";
import { colors } from "@/src/themes/colors";
import { Budget } from "@/src/types/budget";
import { searchByTitle } from "@/src/utils/searchByTitle";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useFocusEffect } from "@react-navigation/native";
import { SlidersHorizontal } from "lucide-react-native";
import { useCallback, useRef, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../../components/Header";

export function Home() {
  const filterModalRef = useRef<BottomSheetModal>(null);

  const [budgets, setBudgets] = useState<Budget[]>([]);

  const [search, setSearch] = useState("");

  function handleOpenFilter() {
    filterModalRef.current?.present();
  }

  async function fetchData() {
    try {
      const data = await budgetGetAll();

      setBudgets(data);
    } catch (error) {
      console.log(error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, []),
  );

  const budgetToDisplay =
    search === "" ? budgets : searchByTitle(budgets, search);

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <Header title="Orçamentos" />

      <View className="h-[1px] bg-base-gray300 w-full my-4" />
      <View className="w-full px-6 my-6">
        <View className="flex-row items-center gap-3 w-full">
          <SearchInput
            placeholder="Buscar orçamento"
            value={search}
            onChangeText={setSearch}
          />
          <TouchableOpacity
            className="bg-base-gray200 w-12 h-12 rounded-xl items-center justify-center"
            onPress={handleOpenFilter}
          >
            <SlidersHorizontal size={24} color={colors.main.purpleBase} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={budgetToDisplay}
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
