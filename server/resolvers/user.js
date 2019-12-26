const { hashPassword, comparePassword, createBearerToken, verifyBearerToken } = require('../auth/util')
const { AuthenticationError } = require('apollo-server-express')

module.exports = {
  Query: {
    getUser: async (_, args, context, info) => {
      let user
      // get user
      try{
        user = await context.models.User.findOne({
          where: {
            email: args.email
          }
        })
      } catch (err){
        throw new AuthenticationError('Something bad happened. Contact support.')
      }
      if(user == null){
        throw new AuthenticationError('That user does not exist.')
      }
      return user
    },
    getUsers: async (_, args, context, info) => {
      try{
        return context.models.User.findAll({
          where: {
            firstName: args.firstName
          }
        })
      } catch (err) {
        throw new AuthenticationError('User does not exist')
      }
    }
  },
  Mutation: {
    register: async (_, args, context, info) => {
      // get hash
      let hash
      try{
        hash = await hashPassword(args.password)
      } catch(err){
        throw new InternalError('Something bad happened. Contact support.')
      }
      // create user
      try{
        return context.models.User.create({
          firstName: args.firstName,
          lastName: args.lastName,
          passwordHash: hash,
          email: args.email
        })
      } catch (err){
        throw  new AuthenticationError('Email is already in use.')
      }
    },
    login: async (_, args, context, info) => {
      const errMsg = 'Username or Password is invalid.'
      // Get user
      let user
      try {
      user = await context.models.User.findOne({
        where: { email: args.email }
      })
      } catch (err) {
        throw new AuthenticationError(errMsg)
      }
      // Check password
      try{
        await comparePassword(args.password, user.dataValues.passwordHash)  
      } catch (err) {
        throw new AuthenticationError(errMsg)
      }
      // Create token
      let token
      try {
        token = createBearerToken({
          id: user.dataValues.id,
          email: user.dataValues.email
        })
      } catch (err) {
        throw new AuthenticationError('Something bad happened. Contact support.')
      }
      return { token, user }
    },
    updateUser: async (_, args, context, info) => {
      let user
      let newPassword
      // get user
      try{
        user = await context.models.User.findOne({
          where: { email: context.user.email }
        })
      } catch (err) {
        throw new AuthenticationError('Please login first.')
      }
      // check password update
      if(args.password){
        try{
          newPassword = await hashPassword(args.password)
        } catch (err) {
          throw new AuthenticationError('Invalid password')
        }
      }
      // update user
      try{
        await user.update({
          firstName: args.firstName || user.dataValues.firstName,
          lastName: args.lastName || user.dataValues.lastName,
          email: args.email || user.dataValues.email,
          passwordHash: newPassword || user.dataValues.passwordHash
        })
      } catch (err) {
        throw new AuthenticationError('Something bad happened. Contact support.')
      }
      return user
    },
    deleteUser: async (_, args, context, info) => {
      let user
      // get user
      try{
        user = await context.models.User.findOne({
          where: {
            email: context.user.email
          }
        })
      } catch (err) {
        throw new AuthenticationError('Please login first.')
      }
      //check password
      try{
        await comparePassword(args.password, user.dataValues.passwordHash)
      } catch (err) {
        throw new AuthenticationError('Invalid password')
      }
      // delete user
      try{
        await user.destroy({
          force: true
        })
      } catch (err) {
        throw new AuthenticationError('Something bad happened. Contact support.')
      }
      return user
    }
  }
}