require('dotenv').config()
const express = require('express')
const app = express()
const { ApolloServer} = require('apollo-server-express')
const resolvers = require('./resolvers')
const typeDefs = require('./config/typeDefs')
const jwt = require('jsonwebtoken')
const { models, connection } = require('./config/sequelize')

connection.sync()

const getUser = token => {
  try {
    if (token) {
      return jwt.verify(token, process.env.TOKEN)
    }
    return null
  } catch (err) {
    return null
  }
}

app.get('/', (req, res) => res.send('INDEX'))

const server = new ApolloServer({ 
  typeDefs, 
  resolvers, 
  context: ({req}) => {
    const tokenWithBearer = req.headers.authorization || ''

    const token = tokenWithBearer.split(' ')[1]
    const user = getUser(token)
    return {
      user,
      models
    }
  }
})

server.applyMiddleware({ app })

app.listen({ port: 4000 }, () => {
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
})
