import { api } from "@/src/services/api";
import { Budget } from "@/src/types/budget";

export async function budgetUpdate(updatedBudget: Budget) {
  const { id, createdAt, updatedAt, ...data } = updatedBudget;
  await api.patch(`/budgets/update/${id}`, data);
}
