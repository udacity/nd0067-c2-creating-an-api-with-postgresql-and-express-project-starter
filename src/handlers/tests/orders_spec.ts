import supertest from "supertest";
import app from "../../server";
import { fakeUser } from "./users_spec";

const request = supertest(app);

describe("Test orders endpoint responses", () => {
  let token: string;

  it("should create a user", (done) => {
    request.post("/signup").send(fakeUser).then((response: supertest.Response) => {
      expect(response.status).toBe(200);
      token = response.body;
      done();
    });
  });

  it("should gets the current endpoint", (done) => {
    request.get("/orders/1/active").set('Authorization', `Barear ${token}`).then((response: supertest.Response) => {
      expect(response.status).toBe(200);
      done();
    });
  });

  it("NOT gets the completed endpoint", (done) => {
    request.get("/orders/1/completed").set('Authorization', `Barear ${token}`).then((response: supertest.Response) => {
      expect(response.status).toBe(200);
      done();
    });
  });

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