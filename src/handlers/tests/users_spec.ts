import supertest from "supertest";
import app from "../../server";

const request = supertest(app);

describe("Test users endpoint responses", () => {
  it("NOT gets the index endpoint", (done) => {
    request.get("/users").then((response: supertest.Response) => {
      expect(response.status).toBe(401);
      done();
    });
  });

  it("NOT gets the show endpoint", (done) => {
    request.get("/users/1").then((response: supertest.Response) => {
      expect(response.status).toBe(401);
      done();
    });
  });

  it("NOT create a user", (done) => {
    request.post("/signup").then((response: supertest.Response) => {
      expect(response.status).toBe(400);
      done();
    });
  });

  it("NOT auth a user", (done) => {
    request.post("/signin").then((response: supertest.Response) => {
      expect(response.status).toBe(400);
      done();
    });
  });
});