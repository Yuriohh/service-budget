import { budgetCreate } from "../budgetCreate";
import { api } from "@/src/services/api";
import { makeBudget, makeBudgetItem } from "@/src/test/factories/budget";

jest.mock("@/src/services/api");

const mockedApi = api as jest.Mocked<typeof api>;

describe("budgetCreate", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedApi.post.mockResolvedValue({ data: {} });
  });

  it("chama api.post no endpoint correto", async () => {
    const budget = makeBudget();
    await budgetCreate(budget);
    expect(mockedApi.post).toHaveBeenCalledWith(
      "/budgets/new-budget",
      expect.any(Object)
    );
  });

  it("omite id, createdAt e updatedAt do body", async () => {
    const budget = makeBudget();
    await budgetCreate(budget);

    const [, body] = mockedApi.post.mock.calls[0];
    expect(body).not.toHaveProperty("id");
    expect(body).not.toHaveProperty("createdAt");
    expect(body).not.toHaveProperty("updatedAt");
  });

  it("envia os campos obrigatórios no body", async () => {
    const budget = makeBudget();
    await budgetCreate(budget);

    const [, body] = mockedApi.post.mock.calls[0];
    expect(body).toMatchObject({
      client: budget.client,
      title: budget.title,
      items: budget.items,
      status: budget.status,
      totalPrice: budget.totalPrice,
    });
  });

  it("envia status 'draft' para novos orçamentos", async () => {
    const budget = makeBudget({ status: "draft" });
    await budgetCreate(budget);

    const [, body] = mockedApi.post.mock.calls[0];
    expect(body.status).toBe("draft");
  });

  it("envia os itens de serviço corretamente", async () => {
    const items = [
      makeBudgetItem({ quantity: 3, price: 200 }),
      makeBudgetItem({ quantity: 1, price: 500 }),
    ];
    const budget = makeBudget({ items });
    await budgetCreate(budget);

    const [, body] = mockedApi.post.mock.calls[0];
    expect(body.items).toHaveLength(2);
    expect(body.items).toEqual(items);
  });

  it("envia desconto quando informado", async () => {
    const budget = makeBudget({ discount: 15 });
    await budgetCreate(budget);

    const [, body] = mockedApi.post.mock.calls[0];
    expect(body.discount).toBe(15);
  });

  it("propaga erro da API quando criação falha", async () => {
    mockedApi.post.mockRejectedValueOnce(new Error("Erro de rede"));
    const budget = makeBudget();
    await expect(budgetCreate(budget)).rejects.toThrow("Erro de rede");
  });

  it("propaga erro de validação do servidor", async () => {
    mockedApi.post.mockRejectedValueOnce(
      new Error("Client é obrigatório.")
    );
    const budget = makeBudget();
    await expect(budgetCreate(budget)).rejects.toThrow(
      "Client é obrigatório."
    );
  });
});
