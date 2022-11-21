const supertest = require("supertest")
const app = require("../../../src/server.js")
const { book1, book2 } = require("../../fixtures/bookData.js")

describe("Books Endpoint", () => {
  describe("POST /books", () => {

    it("will create a new book", async () => {
      const response = await supertest(app).post("/books").send(book1)

      expect(response.status).toEqual(201)
      expect(response.body.book).not.toEqual(undefined)
      expect(response.body.book.id).not.toEqual(undefined)

      for (prop in book1) {
        expect(response.body.book[prop]).toEqual(book1[prop])
      }
    })
  })

  describe("GET /books", () => {
    beforeEach(async () => {
      await createBook(Object.values(book1))
      await createBook(Object.values(book2))
    })

    it("will list all books", async () => {
      const response = await supertest(app).get("/books")

      expect(response.status).toEqual(200)
      expect(response.body.books).not.toEqual(undefined)
      expect(response.body.books.length).toEqual(2)
      const expectedBooks = [book1, book2]
      response.body.books.forEach((retrievedBook, index) => {
        expect(retrievedBook.title).toEqual(expectedBooks[index].title)
      })
    })

    it("will list a book", async () => {
      const response = await supertest(app).get("/books/1")

      expect(response.status).toEqual(200)
      expect(response.body.book).not.toEqual(undefined)
      expect(response.body.book.id).not.toEqual(undefined)

      for (prop in book1) {
        expect(response.body.book[prop]).toEqual(book1[prop])
      }
    })
  })

  describe("PUT /books", () => {
    beforeEach(async () => {
      await createBook(Object.values(book1))
    })

    it("will update a books", async () => {
      const response = await supertest(app).put("/books/1").send(book2)

      expect(response.status).toEqual(201)
      expect(response.body.book).not.toEqual(undefined)
      expect(response.body.book.id).not.toEqual(undefined)

      for (prop in book2) {
        expect(response.body.book[prop]).toEqual(book2[prop])
      }
    })
  })

  describe("DELETE /books", () => {
    beforeEach(async () => {
      await createBook(Object.values(book1))
    })

    it("will return the deleted the book", async () => {
      const response = await supertest(app).delete("/books/1")

      expect(response.status).toEqual(201)
      expect(response.body.book).not.toEqual(undefined)
      expect(response.body.book.id).not.toEqual(undefined)

      for (prop in book1) {
        expect(response.body.book[prop]).toEqual(book1[prop])
      }
    })
  })
})
