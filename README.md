# Express Router

In this exercise, you are going to practice working with routes, parameters and array methods in [Express](https://expressjs.com/).

## Setup

1. Fork this repository
2. Clone the forked repository onto your local machines
3. In the root directory, type `npm install`, which installs dependencies for the project
4. Finally, type `npm start`, which starts a development server that runs your server. That server will reload whenever you make any changes to source files

## Instructions

- Take a look at `src/resources/users/router.js` and notice the hardcoded array of users and how it's used with the routes.
- In the `films` and `books` resources you will find similar harcoded arrays.

For the the `films` router create a route:

- to `get` all the films
- to `get` a single film by id **using params**
- to `get` a list of films by a director **using params** ie. a url like `/films/director/quentin-tarantino`
- to create (`post`) a film an add it to the array BUT return a single film

For the the `books` router create a route:

- to `get` all the books
- to `get` a single book by id **using params**
- to `get` a list of books by type **using params** ie. a url like `/books/type/fiction`
- to create (`post`) a film an add it to the array BUT return a single film

## Tips

- Practice using array methods: find and filter

## Challenge

- Have a look at [req.query](https://expressjs.com/en/4x/api.html#req.query) and use that to modify some of the routes above, i.e. use a query to get all of Quentin Tarantino's films.
