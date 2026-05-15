import { api } from "@/src/services/api";

export async function budgetRemove(id: string) {
  await api.delete(`/budgets/delete/${id}`);
}
