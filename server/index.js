const { ApolloServer } = require('apollo-server-express')
const { Router } = require('express')
const express = require('express')
const multer = require('multer')
const cors = require('cors')

const { models, connection } = require('./config/sequelize')
const { serverStatus } = require('./config/serverStatus')
const { imageUpload } = require('./config/imageUpload')
const typeDefs = require('./config/typeDefs')
const resolvers = require('./resolvers')

const authMiddleware = require('./middleware/auth-middleware')

const upload = multer()
const app = express()
app.use(cors())

require('dotenv').config()

const isProd = process.env.NODE_ENV === 'production'
const port = isProd ? 8080 : 4000

// establish valid connection, sync tables correctly
async function connectToDatabase(){
  try {
    await connection.authenticate();
    connection.sync()
    console.log('Connection to database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
connectToDatabase()

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

// user auth needs fixed, can either do admin or user, but need both
app.post('/upload', this.router.access.admin, upload.single('file'), imageUpload)
app.get('/health', serverStatus)

app.listen({
  port: port
}, () => {
  console.log(`Server is live on port ${port}.`)
})


// const createAdmin = async () => {
//   const { hashPassword } = require('./middleware/util')
//   let hash
//   hash = await hashPassword('ADMIN')
//   models.User.create({
//     role: 'ADMIN',
//     email: 'noseelol.mc@gmail.com',
//     firstName: 'Matthew',
//     lastName: 'Cook',
//     passwordHash: hash
//   })
//   }
//   createAdmin()

