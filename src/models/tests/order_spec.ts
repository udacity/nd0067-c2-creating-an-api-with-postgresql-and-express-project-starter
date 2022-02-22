import { Order, OrderStore } from "../order";
import { testUser } from "./user_spec";

const store = new OrderStore();

describe("Order Model", () => {
  const testOrder: Order = {
    id: 1,
    completed: false,
    user: testUser,
    products: new Map<Number, Number>([
      [1, 3]
    ])
  }

  beforeAll(async () => {
    const result = await store.create(testOrder);
    expect(result).not.toThrowError();
  })

  afterAll(async () => {
    const result = await store.current(testOrder.id);
    expect(result).toEqual(result);
  })
})