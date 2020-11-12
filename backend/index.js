const express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const bodyParser = require('body-parser');
const path = require('path');
const schema = require('./schema.js')
const user_model = require('./user_model')

require('dotenv').config({ path: path.join(__dirname, '.env') });


const port = process.env.NODE_ENV || 3000;

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

// test request
app.use(
    '/graphql',
    graphqlHTTP({
      schema,
      graphiql: true,
    })
  );

app.get('/health', (req, res) => res.send({ message: 'ok' }));
/*
  route to add new user
*/
app.post('/user', (req, res) => {
  user_model.createUser(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

const server = app.listen(port, () => {
    console.log(`THM App running on port ${port}.`);
});
module.exports = server;
