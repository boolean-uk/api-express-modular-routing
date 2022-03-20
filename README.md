# Express Modular Routing

In this exercise, you are going to extend the REST APIs you have been building to handle DELETE and PUT requests. You will also learn how to make your route handling more modular in express using express.Router.

## Learning Objectives
- Use Express.Router to encapsulate routing behavior for different resources
- Explain and build a CRUD RESTful JSON API including PUT and DELETE

## Setup
1. Fork this repository
2. Clone the forked repository onto your local machines
3. In the root directory, type `npm install`, which installs dependencies for the project
4. Finally, type `npm start`, which starts a development server that will reload whenever you make any changes to source files

## Demo
Your instructor will demonstrate how to encapsulate route parameters for the `/users` endpoints using [express.Router](https://expressjs.com/en/guide/routing.html) and also implement the `PUT` and `DELETE` endpoints for user.

## Standard Criteria
- Implement the `films` and `books` endpoints for this API according to the [API spec](#api-spec)

## Extended Criteria
- Implement a `PATCH` method on `books` and `films` so that the client can update a subset of fields, rather than all of them.
- Implement the following validation rules:
  - The client should not be able to get, delete, or update a film that doesn't exist
  - The client should not be able to add a film or book if one with the same title already exists
  - When making a POST request, the client must specify a value for all required fields
- When any of these checks fail, have your API return an appropriate HTTP response code and error message. 
- Use the express documentation to find out how to return different HTTP response codes.

# API spec

## Users endpoint

### GET /users

Example Request
```sh
curl localhost:3030/users
```
Example Response
```json
{
  "users": [
    {
      "id": 1,
      "email": "edward@mail.com"
    },
    {
      "id": 2,
      "email": "nathan@mail.com"
    },
    {
      "id": 3,
      "email": "mike@mail.com"
    }
  ]
}
```

### GET /users/:id
Example Request
```sh
curl localhost:3030/users/2
```
Example Response
```json
{
  "user": {
    "id": 2,
    "email": "nathan@mail.com"
  }
}
```

### POST /users
*For Windows users, replace the `\` with `^`*

Example Request
```sh
curl -X POST localhost:3030/users \
-H 'Content-Type: application/json' \
-d '{"email":"test@test.com"}'
```

Example Response
```json
{
  "user": {
    "email": "test@test.com",
    "id": 4
  }
}
```


### DELETE /users/:id
Example Request
```sh
curl -X DELETE localhost:3030/users/4
```

Example Response
```json
{
  "user": {
    "email": "test@test.com",
    "id": 4
  }
}
```


### PUT /users/:id
Example Request
```sh
curl -X PUT localhost:3030/users/4 \
-H 'Content-Type: application/json' \
-d '{"email":"test@test.com"}'
```

Example Response
```json
{
  "user": {
    "email": "test@test.com",
    "id": 4
  }
}
```


## Films endpoint

### GET /films

Example Request
```sh
curl localhost:3030/films
```
Example Response
```json
{
  "films": [
    {
      "id": 1,
      "title": "Bonnie and Clyde",
      "director": "Arthur Penn"
    },
    {
      "id": 2,
      "title": "Reservoir Dogs",
      "director": "Quentin Tarantino"
    },
    {
      "id": 3,
      "title": "Inception",
      "director": "Christopher Nolan"
    },
    {
      "id": 4,
      "title": "Django Unchained",
      "director": "Quentin Tarantino"
    }
  ]
}
```

### GET /films/:id
Example Request
```sh
curl localhost:3030/films/3
```
Example Response
```json
{
  "film": {
    "id": 3,
    "title": "Inception",
    "director": "Christopher Nolan"
  }
}
```

### POST /films
*For Windows users, replace the `\` with `^`*

Example Request
```sh
curl -X POST localhost:3030/films \
-H 'Content-Type: application/json' \
-d '{"title":"Maleficent","director":"Robert Stromberg"}'
```

Example Response
```json
{
  "film": {
    "id": 5,
    "title": "Maleficent",
    "director": "Robert Stromberg"
  }
}
```


### DELETE /films/:id
Example Request
```sh
curl -X DELETE localhost:3030/films/5
```

Example Response
```json
{
  "film": {
    "id": 5,
    "title": "Maleficent",
    "director": "Robert Stromberg"
  }
}
```

### PUT /films/:id

Example Request
```sh
curl -X PUT localhost:3030/films/5 \
-H 'Content-Type: application/json' \
-d '{"title":"Maleficent","director":"Robert Stromberg"}'
```

Example Response
```json
{
  "film": {
    "id": 5,
    "title": "Maleficent",
    "director": "Robert Stromberg"
  }
}
```


## Books endpoint

### GET /books

Example Request
```sh
curl localhost:3030/books
```
Example Response
```json
{
  "users": [
    {
      "id": 1,
      "title": "1984",
      "type": "fiction",
      "author": "George Orwell"
    },
    {
      "id": 2,
      "title": "Life of Pi",
      "type": "fiction",
      "author": "Yann Martel"
    },
    {
      "id": 3,
      "title": "How to Win Friends and Influence People",
      "type": "non-fiction",
      "author": "Dale Carnegie"
    },
    {
      "id": 4,
      "title": "The Lean Startup",
      "type": "non-fiction",
      "author": "Eric Reis"
    }
  ]
}
```

### GET /books/:id
Example Request
```sh
curl localhost:3030/books/1
```
Example Response
```json
{
  "book": {
    "id": 1,
    "title": "1984",
    "type": "fiction",
    "author": "George Orwell"
  }
}
```

### POST /books
*For Windows users, replace the `\` with `^`*

Example Request
```sh
curl -X POST localhost:3030/books \
-H 'Content-Type: application/json' \
-d '{"title":"The Name Of The Wind","type":"fantasy", "author":"Patrick Rothfuss"}'
```

Example Response
```json
{
  "book": {
    "id": 4,
    "title": "The Name Of The Wind",
    "type": "fantasy",
    "author": "Patrick Rothfuss"
  }
}
```

### DELETE /books/:id
Example Request
```sh
curl -X DELETE localhost:3030/books/4
```

Example Response
```json
{
  "book": {
    "id": 4,
    "title": "The Name Of The Wind",
    "type": "fantasy",
    "author": "Patrick Rothfuss"
  }
}
```

### PUT /books/:id

Example Request
```sh
curl -X PUT localhost:3030/books/4 \
-H 'Content-Type: application/json' \
-d '{"title":"The Name Of The Wind","type":"fantasy", "author":"Patrick Rothfuss"}'
```

Example Response
```json
{
  "book": {
    "id": 4,
    "title": "The Name Of The Wind",
    "type": "fantasy",
    "author": "Patrick Rothfuss"
  }
}
```