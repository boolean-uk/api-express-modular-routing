const supertest = require("supertest")
let app
const { book1, book2, book3 } = require("../../fixtures/bookData.js")

xdescribe("Books Endpoint", () => {
  beforeEach(() => {
    app = require("../../../src/server.js")
  })
  describe("GET /books", () => {
    it("will list all books", async () => {
      const response = await supertest(app).get("/books")

      expect(response.status).toEqual(200)
      expect(response.body.books).not.toEqual(undefined)
      expect(response.body.books.length).toEqual(4)
    })

    it("will list a book", async () => {
      const response = await supertest(app).get("/books/1")

      expect(response.status).toEqual(200)
      expect(response.body.book).not.toEqual(undefined)
      expect(response.body.book.id).toEqual(1)
      expect(response.body.book.title).toEqual("1984")
    })
  })

  describe("POST /books", () => {

    it("will create a new book", async () => {
      const response = await supertest(app).post("/books").send(book1)

      expect(response.status).toEqual(201)
      expect(response.body.book).not.toEqual(undefined)
      expect(response.body.book.title).toEqual(book1.title)
      expect(response.body.book.type).toEqual(book1.type)
      expect(response.body.book.author).toEqual(book1.author)

      for (prop in book1) {
        expect(response.body.book[prop]).toEqual(book1[prop])
      }
    })
  })

  describe("PUT /books", () => {
    it("will update a book", async () => {
      const response = await supertest(app).put("/books/1").send(book3)

      expect(response.status).toEqual(200)
      expect(response.body.book).not.toEqual(undefined)
      expect(response.body.book.id).toEqual(1)
      for (prop in book3) {
        expect(response.body.book[prop]).toEqual(book3[prop])
      }
    })
  })

  describe("DELETE /books", () => {
    it("will return the deleted the book", async () => {
      const response = await supertest(app).delete("/books/1")

      expect(response.status).toEqual(200)
      expect(response.body.book).not.toEqual(undefined)
      expect(response.body.book.id).toEqual(1)
    })

    it("will remove the book", async () => {
      const responseBefore = await supertest(app).get("/books")
      await supertest(app).delete("/books/1")
      const responseAfter = await supertest(app).get("/books")

      expect(responseBefore.body.books.length).toEqual(4)
      expect(responseAfter.body.books.length).toEqual(3)
    })
  })
})
