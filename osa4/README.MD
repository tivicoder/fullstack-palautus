# Usage

## Installation

Install node packages: `npm install`

Create `./.env`file and replace <DB_URI> and <DB_TEST_URI> with your own MongoDB URIs:

```
MONGODB_URI=<DB_URI>
TEST_MONGODB_URI=<DB_TEST_URI>
PORT = 3003
SECRET = SomeSecretPhraseHere
```

## Run server

`npm run dev`

You can then run rest queries in `./requests/.rest` with [Postman](https://www.getpostman.com/) or [VS Code Rest Plugin](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) to test your server.

## Run automated tests

`npm run test`
