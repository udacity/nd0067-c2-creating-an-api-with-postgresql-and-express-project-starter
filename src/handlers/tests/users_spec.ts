import supertest from "supertest";
import { User } from "../../models/user";
import app from "../../server";

const request = supertest(app);

export const fakeUser: User = {
  id: undefined,
  firstname: "Adel",
  lastname: "Monrocq",
  password: "password"
}

describe("Test users endpoint responses", () => {
  
  let token: string;

  it("should auth a user", (done) => {
    request.post("/signin").send(fakeUser).then((response: supertest.Response) => {
      expect(response.status).toBe(200);
      token = response.body
      done();
    });
  });

  it("should gets the show endpoint", (done) => {
    request.get("/users/1").set('Authorization', `Barear ${token}`).then((response: supertest.Response) => {
      expect(response.status).toBe(200);
      done();
    });
  });

  it("should gets the index endpoint", (done) => {
    request.get("/users").set('Authorization', `Barear ${token}`).then((response: supertest.Response) => {
      expect(response.status).toBe(200);
      done();
    });
  });

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