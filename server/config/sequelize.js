const Sequelize = require('sequelize')
const { join } = require('path')
const { readdirSync } = require('fs')

const connection = new Sequelize('cafemaps', 'postgres', process.env.POSTGRES_PASS, {
  host: 'localhost',
  dialect: 'postgres',
  logging: process.env.LOGLEVEL === 'debug' ? null : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
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