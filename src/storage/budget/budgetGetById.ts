import { api } from "@/src/services/api";
import { Budget } from "@/src/types/budget";

export async function budgetGetById(id: string): Promise<Budget | undefined> {
  const response = await api.get<Budget>(`/budgets/${id}`);
  return response.data;
}
