const { hashPassword, comparePassword, createBearerToken, verifyBearerToken } = require('../middleware/util')
const { UnknownError, ForbiddenError, UnauthorizedError } = require('../errors')

//TODO: on account delete, send email
//TODO: email verify

module.exports = {
  Query: {
    getUser: async (_, args, context, info) => {
      try {
        // handle auth
        await context.auth('USER')
        // return user associated with token
        return context.req.user
      } catch (error) {
        throw new UnknownError
      }
    },
    getUsers: async (_, args, context, info) => {
      try{
        // handle auth
        await context.auth('ADMIN')
        // return array of users matching search
        return await context.models.User.findAll({
          where: {
            firstName: args.firstName
          }
        })
      } catch (error) {
         throw new UnknownError
      }
    }
  },
  Mutation: {
    register: async (_, args, context, info) => {
      try{
        context.auth('public')
        // get hash
        let hash = await hashPassword(args.password)
        // create user
        return await context.models.User.create({
          role: 'USER',
          firstName: args.firstName,
          lastName: args.lastName,
          passwordHash: hash,
          email: args.email
        })
      } catch (error){
        throw new ForbiddenError({
            message: 'Email is already in use.'
        })
      }
    },
    login: async (_, { email, password }, context, info) => {
      let token
      let user
      try{
        // handle auth
        context.auth('public')
        // get user
        context.req.user = await context.models.User.findOne({ where: { email: email }})
        user = context.req.user
        // check password
        await comparePassword(password, context.req.user.dataValues.passwordHash)
        // Create token
        token = createBearerToken({
          role: context.req.user.dataValues.role,
          id: context.req.user.dataValues.id,
          email: context.req.user.dataValues.email
        }, context.req.user.role)
      } catch (error) {
        throw new UnauthorizedError({
          message: 'Invalid email or password.'
        })
      }
      return { token, user }
    },
    updateUser: async (_, args, context, info) => {
      // TODO: create new token after update
      let newPassword
      let token
      let user
      try{
        // check login
        await context.auth('USER')
        // get user
        user = context.req.user
        // hash new password
        if(args.password){
          newPassword = await hashPassword(args.password)
        }
        // update user
        await context.req.user.update({
          firstName: args.firstName || context.req.user.dataValues.firstName,
          lastName: args.lastName || context.req.user.dataValues.lastName,
          email: args.email || context.req.user.dataValues.email,
          passwordHash: newPassword || context.req.user.dataValues.passwordHash
        })
        // create new token if email change
        if(args.email) {
          token = createBearerToken({
            role: context.req.user.role,
            id: context.req.user.dataValues.id,
            email: context.req.user.dataValues.email
          }, context.req.user.role)
        }
      } catch (error) {
        throw new UnknownError
      }
      return { token, user }
    },
    deleteUser: async (_, args, context, info) => {
      let user
      try{
        // get user
        await context.auth('USER')
        user = context.req.user
        //check password
        await comparePassword(args.password, user.dataValues.passwordHash)
        // delete user
        await context.req.user.destroy({ force: true })
      } catch (error) {
        throw new UnknownError
      }
      return user
    }
  }
}