import { Budget } from "@/src/types/budget";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BUDGETS_COLLECTION } from "../storageConfig";
import { budgetGetAll } from "./budgetGetAll";

export async function budgetCreate(newBudget: Budget) {
  try {
    const storedBudgets = await budgetGetAll();
    const storage = JSON.stringify([newBudget, ...storedBudgets]);

    await AsyncStorage.setItem(BUDGETS_COLLECTION, storage);
  } catch (error) {
    throw error;
  }
}
