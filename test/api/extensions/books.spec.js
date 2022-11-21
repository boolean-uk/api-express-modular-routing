const supertest = require("supertest")
const app = require("../../../src/server.js")
const { book1, book2, book3 } = require("../../fixtures/bookData.js")
const createBook = require("../../helpers/createBook.js")
const insertBooks = require("../../helpers/insertBooks.js")

describe("Books Endpoint", () => {
  describe("GET /books", () => {
    beforeEach(async () => {
      await createBook(Object.values(book1))
      await createBook(Object.values(book2))
    })

    it("will return a 404 status with message if no book", async () => {
      const response = await supertest(app).get("/books/3")

      expect(response.status).toEqual(404)
      expect(response.body.error).toEqual('no book with id: 3')
    })
  })

  describe("GET /books by author", () => {
    beforeEach(async () => {
      await createBook(Object.values(book1))
      await createBook(Object.values(book2))
    })

    it("will return books by author", async () => {
      const response = await supertest(app).get(`/books?author=${book1.author}`)

      expect(response.status).toEqual(200)
      expect(response.body.books).not.toEqual(undefined)
      expect(response.body.books.length).toEqual(1)
      const expectedBooks = [book1]
      response.body.books.forEach((retrievedBook, index) => {
        expect(retrievedBook.title).toEqual(expectedBooks[index].title)
      })
    })
  })

  describe("GET /books Pagination", () => {
    beforeEach(async () => {
      await insertBooks()
    })

    it("response has pagination properties", async () => {
      const response = await supertest(app).get(`/books?page=2&perPage=30`)

      expect(response.status).toEqual(200)
      expect(response.body.books).not.toEqual(undefined)
      expect(response.body.page).toEqual(2)
      expect(response.body.per_page).toEqual(30)
    })

    it("will return page 2 only of 30 books", async () => {
      const response = await supertest(app).get(`/books?page=2&perPage=30`)

      expect(response.status).toEqual(200)
      expect(response.body.books).not.toEqual(undefined)
      expect(response.body.books.length).toEqual(30)
      expect(response.body.books[0].id).toEqual(31)
      expect(response.body.books[response.body.books.length-1].id).toEqual(60)
    })

    it("will return 400 if pagination parameters are invalid", async () => {
      const response = await supertest(app).get(`/books?page=1&perPage=9`)

      expect(response.status).toEqual(400)
      expect(response.body.error).toEqual(`parameter invalid perPage: 9 not valid. Accepted range is 10 - 50`)
    })

    it("will return 400 if pagination parameters are invalid", async () => {
      const response = await supertest(app).get(`/books?page=1&perPage=51`)

      expect(response.status).toEqual(400)
      expect(response.body.error).toEqual(`parameter invalid perPage: 51 not valid. Accepted range is 10 - 50`)
    })

    it("pagination parameters are optional, have default values", async () => {
      const response = await supertest(app).get(`/books`)

      expect(response.status).toEqual(200)
      expect(response.body.books).not.toEqual(undefined)
      expect(response.body.books.length).toEqual(20)
      expect(response.body.books[0].id).toEqual(1)
      expect(response.body.books[response.body.books.length-1].id).toEqual(20)
    })

    it("pagination parameters can be used with author parameter", async () => {
      const response = await supertest(app).get(`/books?author=Nick%20Labadie&page=1&perPage=30`)

      expect(response.status).toEqual(200)
      expect(response.body.books).not.toEqual(undefined)
      expect(response.body.books.length).toEqual(3)
    })
  })

  describe("PUT /books", () => {
    beforeEach(async () => {
      await createBook(Object.values(book1))
      await createBook(Object.values(book2))
    })

    it("will return a 404 status with message if no book", async () => {
      const response = await supertest(app).put("/books/9").send(book3)

      expect(response.status).toEqual(404)
      expect(response.body.error).toEqual('no book with id: 9')
    })

    it("will return a 409 status with message if title already exists", async () => {
      const response = await supertest(app).put("/books/1").send(book2)

      expect(response.status).toEqual(409)
      expect(response.body.error).toEqual(`A book with the title: ${book2.title} already exists`)
    })
  })

  describe("DELETE /books", () => {
    beforeEach(async () => {
      await createBook(Object.values(book1))
    })

    it("will return a 404 status with message if no book", async () => {
      await supertest(app).delete("/books/1")
      const response = await supertest(app).delete("/books/1")

      expect(response.status).toEqual(404)
      expect(response.body.error).toEqual('no book with id: 1')
    })
  })
})
