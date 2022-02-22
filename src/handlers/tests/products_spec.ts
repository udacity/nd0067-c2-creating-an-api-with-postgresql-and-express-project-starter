import supertest from "supertest";
import app from "../../server";

const request = supertest(app);

describe("Test products endpoint responses", () => {
  it("gets the index endpoint", (done) => {
    request.get("/products").then((response: supertest.Response) => {
      expect(response.status).toBe(200);
      done();
    });
  });

  it("gets the show endpoint", (done) => {
    request.get("/products/1").then((response: supertest.Response) => {
      expect(response.status).toBe(200);
      done();
    });
  });

  it("NOT create a product without be authed", (done) => {
    request.post("/products").then((response: supertest.Response) => {
      expect(response.status).toBe(401);
      done();
    });
  });
});