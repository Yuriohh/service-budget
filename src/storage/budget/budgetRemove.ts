import AsyncStorage from "@react-native-async-storage/async-storage";
import { BUDGETS_COLLECTION } from "../storageConfig";
import { budgetGetAll } from "./budgetGetAll";

export async function budgetRemove(id: string) {
  try {
    const storage = await budgetGetAll();
    const filteredStorage = storage.filter((item) => item.id !== id);

    await AsyncStorage.setItem(
      BUDGETS_COLLECTION,
      JSON.stringify(filteredStorage),
    );
  } catch (error) {
    throw error;
  }
}
