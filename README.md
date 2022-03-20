# Express Modular Routing

In this exercise, you are going to practice building an API to a specification. The API can handle GET and POST requests to different endpoints.

NB: For this exercise, the API spec does not include error responses.

## Setup

1. Fork this repository
2. Clone the forked repository onto your local machines
3. In the root directory, type `npm install`, which installs dependencies for the project
4. Finally, type `npm start`, which starts a development server that will reload whenever you make any changes to source files

## Standard Criteria

- [ ] Implement the `films` and `books` endpoints for this API according to the [API spec](#api-spec)

## Extended Criteria

- [ ] Use [req.query](https://expressjs.com/en/4x/api.html#req.query) to implement [this update](./docs/extension.md) to the API spec

# API spec

## Users endpoint
### GET /users

Example Request
```sh
curl localhost:3030/users
```
Example Response
```
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
```
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
```
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
```
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
```
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
```
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
```
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
```
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
```
{
  "book": {
    "id": 4,
    "title": "The Name Of The Wind",
    "type": "fantasy",
    "author": "Patrick Rothfuss"
  }
}
```
