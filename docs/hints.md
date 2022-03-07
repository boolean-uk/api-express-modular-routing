Take a look at `src/routers/users.js` and note it imports data from `data.js`. You'll need to do the same for the routers for resources `films` and `books`.

For the the `films` router create a route:

- To `get` all the films
- To `get` a single film by id **using params**
- To `get` a list of films by a director **using params** ie. a url like `/films/director/quentin-tarantino`
- To create (`post`) a film an add it to the array BUT return a single film

For the the `books` router create a route:

- To `get` all the books
- To `get` a single book by id **using params**
- To `get` a list of books by type **using params** ie. a url like `/books/type/fiction`
- To create (`post`) a film an add it to the array BUT return a single film
