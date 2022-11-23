const supertest = require("supertest")
const app = require("../../../src/server.js")
const { user1 } = require("../../fixtures/userData.js")

describe("Users extension endpoints", () => {
  describe("GET /users", () => {
    it("will return 404 when getting a user that does not exist", async () => {
      const response = await supertest(app).get("/users/999")
      expect(response.status).toEqual(404)
      expect(response.body.error).not.toEqual(undefined)
    })
  })

  describe("POST /users", () => {
    it("will return 400 when trying to create a user with missing fields", async () => {
      const response = await supertest(app).post("/users").send({})
      expect(response.status).toEqual(400)
      expect(response.body.error).not.toEqual(undefined)
    })
    it("will return 409 when creating a user with an already in-use email", async () => {
      const response = await supertest(app)
        .post("/users")
        .send({ email: "edward@mail.com" })

      expect(response.status).toEqual(409)
      expect(response.body.error).not.toEqual(undefined)
    })
  })

  describe("PUT /users", () => {
    it("will return 404 when trying to update a user that does not exist", async () => {
      const response = await supertest(app).put("/users/999").send(user1)
      expect(response.status).toEqual(404)
      expect(response.body.error).not.toEqual(undefined)
    })

    it("will return 409 when trying to update a users email address to an address already in use", async () => {
      const response = await supertest(app)
        .put("/users/2")
        .send({ email: "edward@mail.com" })

      expect(response.status).toEqual(409)
      expect(response.body.error).not.toEqual(undefined)
    })
  })

  describe("DELETE /users", () => {
    it("will return 404 when trying to delete a user that does not exist", async () => {
      const response = await supertest(app).delete("/users/999")
      expect(response.status).toEqual(404)
      expect(response.body.error).not.toEqual(undefined)
    })
  })
})
