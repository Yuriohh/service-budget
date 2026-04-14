import { Budget } from "@/src/types/budget";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BUDGETS_COLLECTION } from "../storageConfig";
import { budgetGetAll } from "./budgetGetAll";

export async function budgetUpdate(updatedBudget: Budget) {
  try {
    const storage = await budgetGetAll();
    const updatedStorage = storage.map((item) =>
      item.id === updatedBudget.id ? updatedBudget : item,
    );

    await AsyncStorage.setItem(
      BUDGETS_COLLECTION,
      JSON.stringify(updatedStorage),
    );
  } catch (error) {
    throw error;
  }
}
