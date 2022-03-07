#### GET /films
Parameter | Value | Required?
-|-|-
`director` | String | no

Example Request
```sh
curl localhost:3030/films?director=Quentin%20Tarantino
```
Example Response
```
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
