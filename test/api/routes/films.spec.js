const supertest = require("supertest")
let app
const { film1, film2 } = require("../../fixtures/filmData.js")

describe("Films Endpoint", () => {
  beforeEach(() => {
    app = require("../../../src/server.js")
  })
  describe("GET /films", () => {
    it("will list all films", async () => {
      const response = await supertest(app).get("/films")

      expect(response.status).toEqual(200)
      expect(response.body.films).not.toEqual(undefined)
      expect(response.body.films.length).toEqual(4)
    })

    it("will list a film", async () => {
      const response = await supertest(app).get("/films/1")

      expect(response.status).toEqual(200)
      expect(response.body.film).not.toEqual(undefined)
      expect(response.body.film.id).toEqual(1)
      expect(response.body.film.title).toEqual("Bonnie and Clyde")
      expect(response.body.film.director).toEqual("Arthur Penn")
    })
  })

  describe("POST /films", () => {

    it("will create a new film", async () => {
      const response = await supertest(app).post("/films").send(film1)

      expect(response.status).toEqual(201)
      expect(response.body.film).not.toEqual(undefined)
      expect(response.body.film.id).toEqual(5)

      for (const prop in film1) {
        expect(response.body.film[prop]).toEqual(film1[prop])
      }
    })
  })

  describe("PUT /films", () => {
    it("will update a film", async () => {
      const response = await supertest(app).put("/films/1").send(film2)

      expect(response.status).toEqual(200)
      expect(response.body.film).not.toEqual(undefined)
      expect(response.body.film.id).toEqual(1)
      expect(response.body.film.title).toEqual("test2")
      expect(response.body.film.director).toEqual("test2")
    })
  })

  describe("DELETE /films", () => {
    it("will return the deleted the film", async () => {
      const response = await supertest(app).delete("/films/1")

      expect(response.status).toEqual(200)
      expect(response.body.film).not.toEqual(undefined)
      expect(response.body.film.id).toEqual(1)
      expect(response.body.film.title).toEqual("Bonnie and Clyde")
      expect(response.body.film.director).toEqual("Arthur Penn")
    })

    it("will remove the film", async () => {
      const responseBefore = await supertest(app).get("/films")
      await supertest(app).delete("/films/1")
      const responseAfter = await supertest(app).get("/films")

      expect(responseBefore.body.films.length).toEqual(4)
      expect(responseAfter.body.films.length).toEqual(3)
    })
  })
})
