const supertest = require("supertest");
let app;
const { user1, user2 } = require("../../fixtures/userData.js");

describe("Users Endpoint", () => {
  beforeEach(() => {
    app = require("../../../src/server.js");
  });
  describe("GET /users", () => {
    it("will list all users", async () => {
      const response = await supertest(app).get("/users");

      expect(response.status).toEqual(200);
      expect(response.body.users).not.toEqual(undefined);
      expect(response.body.users.length).toEqual(3);
    });

    it("will list a user", async () => {
      const response = await supertest(app).get("/users/1");

      expect(response.status).toEqual(200);
      expect(response.body.user).not.toEqual(undefined);
      expect(response.body.user.id).toEqual(1);
      expect(response.body.user.email).toEqual("edward@mail.com");
    });
  });

  describe("POST /users", () => {
    it("will create a new user", async () => {
      const response = await supertest(app).post("/users").send(user1);

      expect(response.status).toEqual(201);
      expect(response.body.user).not.toEqual(undefined);
      expect(response.body.user.id).toEqual(4);

      for (prop in user1) {
        expect(response.body.user[prop]).toEqual(user1[prop]);
      }
    });
  });

  describe("PUT /users", () => {
    it("will update a users", async () => {
      const response = await supertest(app).put("/users/1").send(user2);

      expect(response.status).toEqual(200);
      expect(response.body.user).not.toEqual(undefined);
      expect(response.body.user.id).toEqual(1);
      expect(response.body.user.email).toEqual("updateaddress@mail.com");
    });
  });

  describe("DELETE /users", () => {
    it("will return the deleted the user", async () => {
      const response = await supertest(app).delete("/users/1");

      expect(response.status).toEqual(200);
      expect(response.body.user).not.toEqual(undefined);
      expect(response.body.user.id).toEqual(1);
      expect(response.body.user.email).toEqual("edward@mail.com");
    });

    it("will remove the user", async () => {
      const responseBefore = await supertest(app).get("/users");
      await supertest(app).delete("/users/1");
      const responseAfter = await supertest(app).get("/users");

      expect(responseBefore.body.users.length).toEqual(3);
      expect(responseAfter.body.users.length).toEqual(2);
    });
  });
});
