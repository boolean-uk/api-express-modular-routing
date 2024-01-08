const supertest = require("supertest")
let app
const { film1 } = require("../../fixtures/filmData.js")

describe("Films extension endpoints", () => {
  beforeEach(() => {
    app = require("../../../src/server.js")
  })
  
  describe("GET /films", () => {
    fit("will return 404 when getting a film that does not exist", async () => {
      const response = await supertest(app).get("/films/999")
      expect(response.status).toEqual(404)
      expect(response.body.error).toEqual('A film with provided ID does not exist')
    })
  })

  describe("POST /films", () => {
    fit("will return 400 when trying to create a film with missing fields", async () => {
      const response = await supertest(app).post("/films").send({})
      expect(response.status).toEqual(400)
      expect(response.body.error).toEqual('Missing fields in request body')
    })
    fit("will return 409 when creating a film with an already in-use title", async () => {
      const response = await supertest(app)
        .post("/films")
        .send({ title: "Bonnie and Clyde", director: "Arthur Penn" })

      expect(response.status).toEqual(409)
      expect(response.body.error).toEqual('A film with the provided title already exists')
    })
  })

  xdescribe("PUT /films", () => {
    it("will return 404 when trying to update a film that does not exist", async () => {
      const response = await supertest(app).put("/films/999").send(film1)
      expect(response.status).toEqual(404)
      expect(response.body.error).toEqual('A film with provided ID does not exist')
    })

    it("will return 409 when trying to update a films title to a title already in use", async () => {
      const response = await supertest(app)
        .put("/films/2")
        .send({ title: "Bonnie and Clyde", director: "Arthur Penn" })

      expect(response.status).toEqual(409)
      expect(response.body.error).toEqual('A film with the provided title already exists')
    })
  })

  xdescribe("PATCH /films", () => {
    it("will return 404 when trying to update a film that does not exist", async () => {
      const response = await supertest(app).patch("/films/999").send(film1)
      expect(response.status).toEqual(404)
      expect(response.body.error).toEqual('A film with provided ID does not exist')
    })

    it("will return 409 when trying to update a films title to a title already in use", async () => {
      const response = await supertest(app)
        .patch("/films/2")
        .send({ title: "Bonnie and Clyde" })

      expect(response.status).toEqual(409)
      expect(response.body.error).toEqual('A film with the provided title already exists')
    })
  })

  describe("DELETE /films", () => {
    it("will return 404 when trying to delete a film that does not exist", async () => {
      const response = await supertest(app).delete("/films/999")
      expect(response.status).toEqual(404)
      expect(response.body.error).toEqual('A film with provided ID does not exist')
    })
  })

 xdescribe("GET /films?director=", () => {
    it('will get films by a specific director', async () => {
      const response = await supertest(app).get("/films?director=Arthur%20Penn")
      expect(response.status).toEqual(200)
      expect(response.body.films.length).toEqual(1)
      expect(response.body.films[0].title).toEqual('Bonnie and Clyde')
    })
  })
})
