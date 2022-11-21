const supertest = require("supertest")
const app = require("../../../src/server.js")
const { pet1, pet2 } = require("../../fixtures/petData.js")
const createPet = require("../../helpers/createPet.js")

describe("Pets Endpoint", () => {
  describe("POST /pets", () => {

    it("will create a new pet", async () => {
      const response = await supertest(app).post("/pets").send(pet1)

      expect(response.status).toEqual(201)
      expect(response.body.pet).not.toEqual(undefined)
      expect(response.body.pet.id).not.toEqual(undefined)

      for (prop in pet1) {
        expect(response.body.pet[prop]).toEqual(pet1[prop])
      }

    })
  })

  describe("GET /pets", () => {
    beforeEach(async () => {
      await createPet(Object.values(pet1))
      await createPet(Object.values(pet2))
    })

    it("will list all pets", async () => {
      const response = await supertest(app).get("/pets")

      expect(response.status).toEqual(200)
      expect(response.body.pets).not.toEqual(undefined)
      expect(response.body.pets.length).toEqual(2)
    })

    it("will list a pet", async () => {
      const response = await supertest(app).get("/pets/1")

      expect(response.status).toEqual(200)
      expect(response.body.pet).not.toEqual(undefined)
      expect(response.body.pet.id).not.toEqual(undefined)

      for (prop in pet1) {
        expect(response.body.pet[prop]).toEqual(pet1[prop])
      }
    })
  })

  describe("PUT /pets", () => {
    beforeEach(async () => {
      await createPet(Object.values(pet1))
    })

    it("will update a pets", async () => {
      const response = await supertest(app).put("/pets/1").send(pet2)

      expect(response.status).toEqual(201)
      expect(response.body.pet).not.toEqual(undefined)
      expect(response.body.pet.id).not.toEqual(undefined)

      for (prop in pet2) {
        expect(response.body.pet[prop]).toEqual(pet2[prop])
      }
    })
  })

  describe("DELETE /pets", () => {
    beforeEach(async () => {
      await createPet(Object.values(pet1))
    })

    it("will return the deleted the pet", async () => {
      const response = await supertest(app).delete("/pets/1")

      expect(response.status).toEqual(201)
      expect(response.body.pet).not.toEqual(undefined)
      expect(response.body.pet.id).not.toEqual(undefined)

      for (prop in pet1) {
        expect(response.body.pet[prop]).toEqual(pet1[prop])
      }
    })
  })
})
