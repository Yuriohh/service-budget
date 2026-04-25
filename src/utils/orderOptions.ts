import { Budget } from "../types/budget";
import { parseDate } from "./parseDate";

export function orderOptions(option: string, budgets: Budget[]) {
  switch (option) {
    case "newest":
      return [...budgets].sort(
        (a, b) => parseDate(b.createdAt) - parseDate(a.createdAt),
      );
    case "oldest":
      return [...budgets].sort(
        (a, b) => parseDate(a.createdAt) - parseDate(b.createdAt),
      );
    case "highest":
      return [...budgets].sort((a, b) => b.totalPrice - a.totalPrice);
    case "lowest":
      return [...budgets].sort((a, b) => a.totalPrice - b.totalPrice);
    default:
      return budgets;
  }
}
