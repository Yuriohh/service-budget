import { api } from "@/src/services/api";
import { Budget } from "@/src/types/budget";

export async function budgetGetAll(): Promise<Budget[]> {
  const response = await api.get<Budget[]>("/budgets");
  return response.data;
}
