import { budgetCreate } from "../budgetCreate";
import { api } from "@/src/services/api";
import { Budget } from "@/src/types/budget";

jest.mock("@/src/services/api");

const mockedApi = api as jest.Mocked<typeof api>;

const budget: Budget = {
  id: "1",
  client: "Cliente Teste",
  title: "Orçamento Teste",
  items: [
    {
      id: "item-1",
      title: "Serviço A",
      description: "Descrição do serviço",
      quantity: 2,
      price: 100,
    },
  ],
  discount: 0,
  status: "draft",
  totalPrice: 200,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

describe("budgetCreate", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("chama api.post com os dados corretos", async () => {
    mockedApi.post.mockResolvedValueOnce({ data: {} });

    await budgetCreate(budget);

    expect(mockedApi.post).toHaveBeenCalledWith("/budgets/new-budget", {
      client: budget.client,
      title: budget.title,
      items: budget.items,
      discount: budget.discount,
      status: budget.status,
      totalPrice: budget.totalPrice,
    });
  });

  it("propaga erro da API", async () => {
    mockedApi.post.mockRejectedValueOnce(new Error("Erro de rede"));

    await expect(budgetCreate(budget)).rejects.toThrow("Erro de rede");
  });
});
