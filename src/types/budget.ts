export type BudgetStatus = "draft" | "sent" | "approved" | "rejected";

export interface BudgetItem {
  id: string;
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
  createdAt: string;
  updatedAt: string;
}
