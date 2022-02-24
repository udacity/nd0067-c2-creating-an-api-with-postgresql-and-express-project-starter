import { Order, OrderStore } from "../order";
import { testUser } from "./user_spec";

const store = new OrderStore();

export const testOrder: Order = {
  id: 1,
  completed: false,
  user: testUser,
  products: new Map<Number, Number>([
    [1, 3]
  ])
}

describe("Order Model", () => {
  

  it("should create an order", async () => {
    const result = await store.create(testOrder);
    expect(result).toEqual(result);
  })

  it("should get the completed orders", async () => {
    const result = await store.current(testOrder.id, true);
    expect(result).toEqual([]);
  })

  it("should get the current orders", async () => {
    const result = await store.current(testOrder.user.id as number, false);
    expect(result[0].id).toEqual(testOrder.id);
  })
})