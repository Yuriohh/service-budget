import { faker } from "@faker-js/faker";
import { Budget, BudgetItem, BudgetStatus } from "@/src/types/budget";

export function makeBudgetItem(overrides: Partial<BudgetItem> = {}): BudgetItem {
  return {
    id: faker.string.uuid(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    quantity: faker.number.int({ min: 1, max: 10 }),
    price: faker.number.float({ min: 50, max: 5000, fractionDigits: 2 }),
    ...overrides,
  };
}

export function makeBudget(overrides: Partial<Budget> = {}): Budget {
  const items = overrides.items ?? [makeBudgetItem(), makeBudgetItem()];
  const totalPrice =
    overrides.totalPrice ??
    items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return {
    id: faker.string.uuid(),
    client: faker.person.fullName(),
    title: faker.commerce.productName(),
    items,
    discount: 0,
    status: "draft" as BudgetStatus,
    totalPrice,
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    ...overrides,
  };
}
