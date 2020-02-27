const coffeeResolvers = require('./coffee.js')
const storeResolvers = require('./store')
const userResolvers = require('./user')

module.exports = {
  Query: {
    ...coffeeResolvers.Query,
    ...storeResolvers.Query,
    ...userResolvers.Query
  },
  Mutation: {
    ...coffeeResolvers.Mutation,
    ...storeResolvers.Mutation,
    ...userResolvers.Mutation
  }
}
