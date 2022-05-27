#### GET /films
Parameter | Value | Required?
-|-|-
`director` | String | no

Use [req.query](https://expressjs.com/en/4x/api.html#req.query).

Example Request
```sh
curl localhost:3030/films?director=Quentin%20Tarantino
```
Example Response
```json
{
  "films": [
    {
      "id": 2,
      "title": "Reservoir Dogs",
      "director": "Quentin Tarantino"
    },
    {
      "id": 4,
      "title": "Django Unchained",
      "director": "Quentin Tarantino"
    }
  ]
}
```

#### PATCH /books/:id
Parameter | Value | Required?
-|-|-
 N/A | N/A | N/A

Example Request
```sh
curl -X PATCH localhost:3030/books/1 \
-H 'Content-Type: application/json' \
-d '{"type":"non-fiction"}'
```
Example Response
```json
{
  "book": {
    "id": 1,
    "title": "1984",
    "type": "non-fiction",
    "author": "George Orwell"
  }
}
```

#### PATCH /films/:id
Parameter | Value | Required?
-|-|-
 N/A | N/A | N/A

Example Request
```sh
curl -X PATCH localhost:3030/films/5 \
-H 'Content-Type: application/json' \
-d '{"director":"Neil Armstrong"}'
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


### Errors
In each scenario have your API return an appropriate HTTP response code and error message. Use the express documentation to find out how to return different HTTP response codes.

#### Scenario 1
The client should not be able to get, delete, or update a film that doesn't exist

Example Request
```sh
curl localhost:3030/users/10
```

Example Response
Returns a [404](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404) status code
```json
{
  "error": "film id: 10 does not exist"
}
```

#### Scenario 2
The client should not be able to add a film or book if one with the same title already exists

Example Request
```sh
curl -X POST localhost:3030/books \
-H 'Content-Type: application/json' \
-d '{"title":"The Life of Pi","author":"Yann Martel","type":"fiction"}'
```

Example Response - returns a [409](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/409) status code
```json
{
  "error": "A book with title 'The Life of Pi' already exists"
}
```

#### Scenario 3
When making a POST request, the client must specify a value for all required fields

Example Request
```sh
curl -X POST localhost:3030/books \
-H 'Content-Type: application/json' \
-d '{"title":"The Life of Pi","type":"fiction"}'
```

Example Response - returns a [400](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400) status code
```json
{
  "error": "Missing fields: author"
}
```
