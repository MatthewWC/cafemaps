const bcrypt = require('bcrypt')

module.exports = {
  Query: {
    getUser: async (_, args, context, info) => {
      return context.models.User.findOne({
        where: {
          firstName: args.firstName
        }
      })
    }
  },
  Mutation: {
    createUser: async (_, args, context, info) => {
      return context.models.User.create({
        firstName: args.firstName,
        lastName: args.firstName
      })
    }
  }
}