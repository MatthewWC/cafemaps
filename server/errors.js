const { createError } = require('apollo-errors')

// mask internal errors
exports.UnknownError = createError('UnknownError', {
  message: 'Something bad happened. Contact support.'
})

// user should be logged in but isn't
exports.UnauthorizedError = createError('UnauthorizedError', {
  message: 'You need to be logged in to do that!'
})

// user is already logged in
exports.AlreadyAuthenticatedError = createError('AlreadyAuthenticatedError', {
  message: 'You are already logged in.'
})

// user is trying to perform an admin function
exports.ForbiddenError = createError('ForbiddenError', {
  message: 'You are not allowed to do that.'
})