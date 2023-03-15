const supertest = require("supertest");
let app;
const { user1 } = require("../../fixtures/userData.js");

describe("Users extension endpoints", () => {
  beforeEach(() => {
    app = require("../../../src/server.js");
  });
  describe("GET /users", () => {
    fit("will return 404 when getting a user that does not exist", async () => {
      const response = await supertest(app).get("/users/999");
      expect(response.status).toEqual(404);
      expect(response.body.error).toEqual(
        "A user with the provided ID does not exist"
      );
    });
  });

  describe("POST /users", () => {
    fit("will return 400 when trying to create a user with missing fields", async () => {
      const response = await supertest(app).post("/users").send({});
      expect(response.status).toEqual(400);
      expect(response.body.error).toEqual("Missing fields in request body");
    });
    fit("will return 409 when creating a user with an already in-use email", async () => {
      const response = await supertest(app)
        .post("/users")
        .send({ email: "edward@mail.com" });

      expect(response.status).toEqual(409);
      expect(response.body.error).toEqual(
        "A user with the provided email already exists"
      );
    });
  });

  describe("PUT /users", () => {
    fit("will return 404 when trying to update a user that does not exist", async () => {
      const response = await supertest(app).put("/users/999").send(user1);
      expect(response.status).toEqual(404);
      expect(response.body.error).toEqual(
        "A user with the provided ID does not exist"
      );
    });

    fit("will return 409 when trying to update a users email address to an address already in use", async () => {
      const response = await supertest(app)
        .put("/users/2")
        .send({ email: "edward@mail.com" });

      expect(response.status).toEqual(409);
      expect(response.body.error).toEqual(
        "A user with the provided email already exists"
      );
    });
  });

  describe("DELETE /users", () => {
    fit("will return 404 when trying to delete a user that does not exist", async () => {
      const response = await supertest(app).delete("/users/999");
      expect(response.status).toEqual(404);
      expect(response.body.error).toEqual(
        "A user with the provided ID does not exist"
      );
    });
  });
});
