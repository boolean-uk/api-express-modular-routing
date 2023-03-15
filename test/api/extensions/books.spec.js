const supertest = require("supertest");
let app;
const { book1, book2, book3 } = require("../../fixtures/bookData.js");

describe("Books Extension Endpoint", () => {
  beforeEach(() => {
    app = require("../../../src/server.js");
  });
  describe("GET /books", () => {
    fit("will return 404 when getting a book that does not exist", async () => {
      const response = await supertest(app).get("/books/999");

      expect(response.status).toEqual(404);
      expect(response.body.error).toEqual(
        "A book the provided ID does not exist"
      );
    });
  });

  describe("POST /books", () => {
    fit("will return 400 when creating a book with missing body fields", async () => {
      const response = await supertest(app).post("/books").send({
        title: "test",
      });

      expect(response.status).toEqual(400);
      expect(response.body.error).toEqual("Missing fields in request body");
    });

    fit("will return 409 when creating a book with an already existing title", async () => {
      const response = await supertest(app).post("/books").send({
        title: "1984",
        type: "test1",
        author: "test1",
        topic: "test1",
        publicationDate: "2020-11-16T00:00:00.000Z",
        pages: 1,
      });

      expect(response.status).toEqual(409);
      expect(response.body.error).toEqual(
        "A book with the provided title already exists"
      );
    });
  });

  describe("PUT /books", () => {
    fit("will return 400 when updating a book with missing body fields", async () => {
      const response = await supertest(app).put("/books/999").send({
        title: "test1",
      });

      expect(response.status).toEqual(400);
      expect(response.body.error).toEqual("Missing fields in request body");
    });
    fit("will return 404 when updating a book that does not exist", async () => {
      const response = await supertest(app).put("/books/999").send({
        title: "test1",
        type: "test1",
        author: "test1",
        topic: "test1",
        publicationDate: "2020-11-16T00:00:00.000Z",
        pages: 1,
      });

      expect(response.status).toEqual(404);
      expect(response.body.error).toEqual(
        "A book the provided ID does not exist"
      );
    });
    fit("will return 409 when updating a book with title that already exists", async () => {
      const response = await supertest(app).put("/books/1").send({
        title: "1984",
        type: "test1",
        author: "test1",
        topic: "test1",
        publicationDate: "2020-11-16T00:00:00.000Z",
        pages: 1,
      });

      expect(response.status).toEqual(409);
      expect(response.body.error).toEqual(
        "A book with the provided title already exists"
      );
    });
  });

  describe("PATCH /books", () => {
    fit("will return 404 when updating a book that does not exist", async () => {
      const response = await supertest(app).put("/books/999").send({
        title: "test1",
        type: "test1",
        author: "test1",
        topic: "test1",
        publicationDate: "2020-11-16T00:00:00.000Z",
        pages: 1,
      });

      expect(response.status).toEqual(404);
      expect(response.body.error).toEqual(
        "A book the provided ID does not exist"
      );
    });
    fit("will return 404 when updating a book with title that already exists", async () => {
      const response = await supertest(app).put("/books/1").send({
        title: "1984",
        type: "test1",
        author: "test1",
        topic: "test1",
        publicationDate: "2020-11-16T00:00:00.000Z",
        pages: 1,
      });

      expect(response.status).toEqual(409);
      expect(response.body.error).toEqual(
        "A book with the provided title already exists"
      );
    });
  });

  describe("DELETE /books", () => {
    fit("will return 404 when updating a book that does not exist", async () => {
      const response = await supertest(app).delete("/books/999");

      expect(response.status).toEqual(404);
      expect(response.body.error).toEqual(
        "A book the provided ID does not exist"
      );
    });
  });
});
