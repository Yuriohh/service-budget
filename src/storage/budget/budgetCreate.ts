import { api } from "@/src/services/api";
import { Budget } from "@/src/types/budget";

export async function budgetCreate(newBudget: Budget) {
  const { id, createdAt, updatedAt, ...data } = newBudget;
  await api.post("/budgets/new-budget", data);
}
