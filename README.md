# client-screen

## Description
Backend service to help search a user using OFAC API. A full name, birth year, and country param is provided to the service, and it will take those params and search the OFAC API. The OFAC API will return matched individuals (if any) using the keywords. If any of the individuals match the provided params, the service will return an JSON object showing which params was matched. All fields are to be provided for the API to work.

## Setup
`For local dev environment`
1. Clone the repo
2. Run yarn install
3. Run yarn start:dev

`For prod environment`
1. Clone the repo
2. Run yarn install
3. Run yarn build
4. Run yarn start:prod

Server should be available at `http://localhost:3000` <br>
A hosted version of the service is available at `https://client-screen-service.onrender.com`

## API
There is one POST endpoint at `{url}/server`

### Params
- The API takes `{ name: string, birthyear: number, country: string }` in the body of the POST request
- The name should be the full name of the user
- The birthyear should be a number representing the year of birth (e.g. 1980)
- The country should be the country of citizenship for the user
- All fields must be provided, or else an error will be thrown

### Response
- The response is a JSON object in the form `{ name: boolean, dob: boolean, citizenship: boolean }
- Each property will tell you which one of the params from the POST request body was matched to an individual from the OFAC API

## Tests
- Run the entire suite of tests with `yarn test`
- In the interest of time, only one basic test was written for `App.ts`

## Optimizations
- A couple of things not implemented, but nice to haves if there's more time
- HTTP caching or database caching of repeated requests
- If someone spams the API with the same request, return the cached response
- Rate limiting to prevent overloading third party API (OFAC)
- Completed unit tests for each file to catch edge cases
- Logging setup to help debug errors`
