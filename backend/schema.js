const graphql = require('graphql');
const graphqlIsoDate = require('graphql-iso-date');
const pgp = require('pg-promise')(); //postgres http client
const db = pgp("postgres://thminsight:coding_test_password@localhost:5432/thm_database");


db.connect()
    .then(obj => {
        // Can check the server version here (pg-promise v10.1.0+):
        const serverVersion = obj.client.serverVersion;

        obj.done(); // success, release the connection;
    })
    .catch(error => {
        console.log('ERROR:', error.message || error);
});
//types provided by GraphQL
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const  {
  GraphQLDate,
  GraphQLTime,
  GraphQLDateTime
} = graphqlIsoDate;

const UsersType = new GraphQLObjectType({
  name: 'users',
  fields: () => ({
    id: { type: GraphQLID },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString},
    password: { type: GraphQLString},
    country: { type: GraphQLString},
    city: { type: GraphQLString},
    position: { type: GraphQLString},
    phone_number: { type: GraphQLString},
    email: { type: GraphQLString},
    created_at: { type: GraphQLDate },
    updated_at: { type: GraphQLDate },
  })
})

const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    users: {
      type: UsersType,
      args: { id: { type: GraphQLID } },
      resolve(obj, args) { //parent, arguments, context, info
        return db.one(
          'SELECT * FROM users WHERE id = $1',[args.id]
        )
      }
    },

  }
})

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UsersType,
      args: {
        first_name: { type: GraphQLNonNull(GraphQLString)},
        last_name: { type: GraphQLNonNull(GraphQLString)},
        phone_number: { type: GraphQLNonNull(GraphQLString)},
        city: { type: GraphQLNonNull(GraphQLString)},
        email: { type: GraphQLNonNull(GraphQLString)},
        country: { type: GraphQLNonNull(GraphQLString)}
      },
      resolve(parent, args) { //parent, arguments, context, info
        return db.one(
          `INSERT INTO users(first_name, last_name, phone_number, city,
                            email, country)
          VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
          [args.first_name, args.last_name, args.phone_number, args.city,
             args.email, args.country]
        )
      }
    }
  }
})

module.exports = new GraphQLSchema({query, mutation})
