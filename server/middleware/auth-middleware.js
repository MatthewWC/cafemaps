const { verifyBearerToken } = require('./util')
const { models } = require('../config/sequelize')
const { UnauthorizedError, UnknownError, ForbiddenError } = require('../errors.js')

function accessBuilder(role) {
  return async (req, res, next) => {

    // if public resolver, skip auth
    if(role === 'public') return next()

    // get auth header
    const authHeader = req.header('Authorization')
    
    // if header exists split, link for better understanding.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split 
    const bearerHeader = authHeader ? authHeader.split('Bearer ')[1] : undefined

    // req.query.bearer <== restful api stuff, review later
    const bearer =  bearerHeader
    
    if(bearer){
      try{
        console.log(role)
        console.log(bearer)
        // await promise to verify users token, and save email.
        const { email } = await verifyBearerToken(bearer, role)
        // access data model and get user associated with email
        const account = await models.User.findOne({where: {
            email: email
          }
        })
        // if successful, attach user to request
        if(account) {
          req.user = account
          return next()
        }
      } 
      // if unsuccessful, throw to promise
      catch (error){
        switch(error.message){
          case 'invalid signature':
            return next(new ForbiddenError) 
          case 'jwt expired':
          default:
            return next(new UnauthorizedError)
        }
      }
    }
    return next(new UnknownError)
  }
}

// auth middleware for rest router, not using atm.
function authMiddleware(router){
  console.log(router)
}

// accessed through server context, when auth is called executes function
authMiddleware.graphql = (req, res) => {
  // what allows auth to accept a role, creates promise
  return role => new Promise((resolve, reject) => {
    // handle role, and token checks
    accessBuilder(role)(req, res, error => {
      if (error) return reject(error)
      return resolve()
    })
  })
}


module.exports = authMiddleware