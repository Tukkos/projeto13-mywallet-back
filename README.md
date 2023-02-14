# projeto13-mywallet-back

## Getting Started with node and mongodb

First clone backend repository and run: 

### `npm i`

Create an .env with:

`PORT=5000` <br>
`MONGO_URI=mongodb://localhost:27017`

Start Mongo server running:

### `mongod --dbpath ~/.mongo`

In another terminal window execute Mongo running:

### `mongo`

Create a database running: 

### `use myWallet`

Create the collections:

### `db.createCollection(transactions)`
### `db.createCollection(users)`
### `db.createCollection(sessions)`

Then, in another terminal window, start backend running:

### `node src/index.js`
