# httpstatus

A simple service that can be configured to return specific HTTP status codes for various routes.

# Usage

```bash
npm start
curl -v http://localhost:3000/404
```

## Configuring routes.yml

You configure specific routes to return specific error codes, you can create a `routes.yml` file. This
file has a single top-level key `routes` that points to a list of dictionaries that have the keys
`route` and `code`.

An example:

```yaml
routes:
  - route: /foo
    code: 502
  - route: /bar
    code: 404
  - route: /baz
    code: 200
```
