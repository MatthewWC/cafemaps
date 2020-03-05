const Sequelize = require('sequelize')
const { readdirSync } = require('fs')
const { join } = require('path')

require('dotenv').config()
const isProd = process.env.NODE_ENV === 'production'

const connection = new Sequelize(
  process.env.POSTGRES_DATABASE,
  process.env.POSTGRES_USERNAME,
  process.env.POSTGRES_PASS,
  {
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  ssl: isProd,
  dialect: 'postgres',
  dialectOptions: {
    ssl: isProd
  },
  logging: true,
  pool: {
    max: 100,
    min: 0,
    idle: 200000,
    acquire: 1000000,
  },
  logging: process.env.LOGLEVEL === 'debug' ? null : false
})

const models = {}

const directory = join(__dirname, '../models')
  readdirSync(directory)
  .filter(file => file.endsWith('.js'))
  .map(file => {
    const model = require(join(directory, file))(
      connection,
      Sequelize.DataTypes
    )
    models[model.name] = model
    return model
})
.sort((a, b) => {
  if (a.order < b.order) return -1
  if (a.order === b.order) return 0
  if (a.order > b.order) return 1
})
.forEach(model => {
  if ('associate' in model) model.associate(models)
})


module.exports = { models, connection }