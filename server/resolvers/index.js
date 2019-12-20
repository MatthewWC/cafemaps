const companyResolvers = require('./company.js')
const storeResolvers = require('./store')
const userResolvers = require('./user')

module.exports = {
  Query: {
    ...companyResolvers.Query,
    ...storeResolvers.Query,
    ...userResolvers.Query
  },
  Mutation: {
    ...companyResolvers.Mutation,
    ...storeResolvers.Mutation,
    ...userResolvers.Mutation
  }
}
