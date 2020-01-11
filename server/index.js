require('dotenv').config()
const { ApolloServer } = require('apollo-server-express')
const resolvers = require('./resolvers')
const typeDefs = require('./config/typeDefs')
const jwt = require('jsonwebtoken')
const { models, connection } = require('./config/sequelize')
const express = require('express')
const authMiddleware = require('./middleware/auth-middleware')

// express instance
const app = express()

// forms relations between data tables, ran in here to avoid ordering issues
connection.sync()

const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  //In GraphQL, a context is an object shared by all the resolvers of a specific execution.
  // custom context building function
  context: ({req, res}) => ({
      // access to middleware functions
      auth: authMiddleware.graphql(req, res),
      // access to sequelize functions, datamodels, ect.
      models,
      // request made to server
      req,
      // response sent from server
      res,
  })
})

// apply express to server instance
server.applyMiddleware({ app })

// start server on localhost, port 4000
app.listen({ 
  host: 'localhost',
  port: 4000 }, () => {
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
})

/* const createAdmin = async () => {
const { hashPassword } = require('./auth/util')
let hash
hash = await hashPassword('admin')
models.User.create({
  role: 'ADMIN',
  email: 'noseelol.mc@gmail.com',
  firstName: 'Matthew',
  lastName: 'Cook',
  passwordHash: hash
})
}
createAdmin()
*/
