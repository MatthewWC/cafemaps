const { hashPassword, comparePassword, createBearerToken, verifyBearerToken } = require('../middleware/util')
const { ForbiddenError, UnauthorizedError } = require('../errors')

//TODO: on account delete, send email
//TODO: email verify
//TODO: limit update frequency, and create acc
module.exports = {
  Query: {
    getUser: async (_, args, context, info) => {
      // handle auth
      try{
        await context.auth('USER')
      }
      catch (error){
        await context.auth('ADMIN')
      }
      // return user associated with token
      return context.req.user
    },
    getUsers: async (_, args, context, info) => {
      // handle auth
      await context.auth('ADMIN')
      // return array of users matching search
      return await context.models.User.findAll({
        where: { firstName: args.firstName }
      })
    }
  },
  Mutation: {
    register: async (_, args, context, info) => {
      try{
        // handle auth
        context.auth('PUBLIC')
        // get hash
        let hash = await hashPassword(args.password)
        // create user
        return await context.models.User.create({
          role: 'USER',
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
        context.auth('PUBLIC')
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
        let token
        let newPassword
        // handle auth
        try{
          await context.auth('USER')
        }
        catch(error){
          if(error.name === 'ForbiddenError'){
            await context.auth('ADMIN')
          }
        }
        // get user
        const user = context.req.user
        // hash new password
        if(args.password){
          newPassword = await hashPassword(args.password)
        }
        // update user
        await context.req.user.update({
          imageUrl: args.imageUrl || context.req.user.dataValues.imageUrl,
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
      return { token, user }
    },
    deleteUser: async (_, args, context, info) => {
      let user
      try{
        // handle auth
        await context.auth('USER')
        // get reference to user
        user = context.req.user
        //check password
        await comparePassword(args.password, user.dataValues.passwordHash)
        // delete user
        await context.req.user.destroy({ force: true })
      } catch (error) {
        throw error
      }
      return user
    }
  }
}