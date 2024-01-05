# Express Modular Routing
In this exercise, you are going to extend the REST APIs you have been building to handle DELETE and PUT requests. You will also learn how to make your route handling more modular in express using express.Router.

## Learning Objectives
- Use Express.Router to encapsulate routing behavior for different resources
- Explain and build a CRUD RESTful JSON API including PUT and DELETE
- Build an API to satisfy a specification

## Setup
1. Fork this repository
2. Clone the forked repository onto your local machines
3. In the root directory, type `npm install`, which installs dependencies for the project
4. Finally, type `npm start`, which starts a development server that will reload whenever you make any changes to source files

## General Requirements / Instructions
- For this exercise, you must follow a **"modular routing"** approach using the express.Router class -- read the [official documentation here](https://expressjs.com/en/guide/routing.html#express-router)
- Use the global variables exported from `/data/index.js` as your data stores

## Standard Criteria
- Implement the `users`, `films` and `books` endpoints for this API according to the [API spec](https://boolean-uk.github.io/api-express-modular-routing/)
- Make sure all tests are passing -- you can run them yourself using `npm run test`

## Extended Criteria
- Implement the 3 `EXTENSION` criteria as highlighted in the [API spec](https://boolean-uk.github.io/api-express-modular-routing/) -- they are the last few endpoints for the `films` and `books` resources
- Make sure all tests are passing -- you can run them yourself using `npm run test-extensions`
