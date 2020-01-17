require('dotenv').config()
const { ApolloServer } = require('apollo-server-express')
const resolvers = require('./resolvers')
const typeDefs = require('./config/typeDefs')
const { models, connection } = require('./config/sequelize')
const express = require('express')
const authMiddleware = require('./middleware/auth-middleware')
const cors = require('cors')
const { imageUpload } = require('./config/imageUpload')
const { Router } = require('express')
const multer = require('multer')
const upload = multer()
// express instance
const app = express()
app.use(cors())

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

this.router = new Router()
authMiddleware(this.router)

app.post('/upload', this.router.access.user, upload.single('file'), imageUpload)

// start server on localhost, port 4000
app.listen({ 
  host: 'localhost',
  port: 4000 }, () => {
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
})

// const createAdmin = async () => {
//   const { hashPassword } = require('./middleware/util')
//   let hash
//   hash = await hashPassword('admin')
//   models.User.create({
//     role: 'ADMIN',
//     email: 'noseelol.mc@gmail.com',
//     firstName: 'Matthew',
//     lastName: 'Cook',
//     passwordHash: hash
//   })
//   }
//   createAdmin()

