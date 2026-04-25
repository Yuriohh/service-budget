export type BudgetStatus = "draft" | "sent" | "approved" | "rejected";
export type ValueSortOption = "newest" | "oldest" | "highest" | "lowest";
export type LabelSortOption =
  | "Mais Recente"
  | "Mais Antigo"
  | "Maior Valor"
  | "Menor Valor";

export interface BudgetItem {
  id: string;
  title: string;
  description: string;
  quantity: number;
  price: number;
}

export interface Budget {
  id: string;
  client: string;
  title: string;
  items: BudgetItem[];
  discount?: number;
  status: BudgetStatus;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface SortOption {
  value: ValueSortOption;
  label: LabelSortOption;
}
