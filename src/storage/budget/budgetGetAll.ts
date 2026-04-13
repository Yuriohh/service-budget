import { Budget } from "@/src/types/budget";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BUDGETS_COLLECTION } from "../storageConfig";

export async function budgetGetAll(): Promise<Budget[]> {
  try {
    const storage = await AsyncStorage.getItem(BUDGETS_COLLECTION);
    const budgets: Budget[] = storage ? JSON.parse(storage) : [];
    return budgets;
  } catch (error) {
    throw error;
  }
}
