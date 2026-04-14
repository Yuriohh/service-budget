import { Budget } from "@/src/types/budget";
import { budgetGetAll } from "./budgetGetAll";

export async function budgetGetById(id: string): Promise<Budget | undefined> {
  try {
    const storage = await budgetGetAll();
    const budget = storage.find((item) => item.id === id);

    return budget;
  } catch (error) {
    throw error;
  }
}
