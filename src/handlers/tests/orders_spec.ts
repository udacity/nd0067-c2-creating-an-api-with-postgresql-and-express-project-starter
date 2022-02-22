import supertest from "supertest";
import app from "../../server";

const request = supertest(app);

describe("Test orders endpoint responses", () => {
  it("NOT gets the create endpoint", (done) => {
    request.post("/orders").then((response: supertest.Response) => {
      expect(response.status).toBe(401);
      done();
    });
  });

  it("NOT gets the current endpoint", (done) => {
    request.get("/orders/1/active").then((response: supertest.Response) => {
      expect(response.status).toBe(401);
      done();
    });
  });

  it("NOT gets the completed endpoint", (done) => {
    request.get("/orders/1/completed").then((response: supertest.Response) => {
      expect(response.status).toBe(401);
      done();
    });
  });
});