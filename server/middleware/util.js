const jwt = require('jsonwebtoken')
const { hash, compare } = require('bcrypt')

const PW_SALT_ROUNDS = 10

exports.hashPassword = function (password) {
  return new Promise((resolve, reject) => {
    hash(password, PW_SALT_ROUNDS, function (err, hash) {
      if (err) return reject(err)
      return resolve(hash)
    })
  })
}

exports.comparePassword = function (password, hash) {
  return new Promise((resolve, reject) => {
    compare(password, hash, function (err, res) {
      if (err) return reject(err)
      if (!res) return reject(res)
      return resolve(res)
    })
  })
}

exports.createBearerToken = function (tokenData, role = 'user') {
  let secret
  switch (role) {
    case 'admin':
      secret = process.env.JWT_TOKEN_ADMIN_SECRET
      break
    case 'user':
    default:
      secret = process.env.JWT_TOKEN_USER_SECRET
      break
  }
  return jwt.sign(tokenData, secret, {
    expiresIn: process.env.JWT_TOKEN_EXPIRES
  })
}

exports.verifyBearerToken = function (token, role = 'user') {
  return new Promise((resolve, reject) => {
    let secret
    switch (role) {
      case 'admin':
        secret = process.env.JWT_TOKEN_ADMIN_SECRET
        break
      case 'user':
      default:
        secret = process.env.JWT_TOKEN_USER_SECRET
        break
    }
    jwt.verify(token, secret, (err, res) => {
      if (err) return reject(err)
      return resolve(res)
    })
  })
}