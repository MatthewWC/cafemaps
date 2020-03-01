const Sequelize = require('sequelize')
const { join } = require('path')
const { readdirSync } = require('fs')

const connection = new Sequelize(
  process.env.POSTGRES_DATABASE,
  process.env.POSTGRES_USERNAME,
  process.env.POSTGRES_PASS,
  {
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  dialect: 'postgres',
  dialectOptions: { 
    ssl: {
      require:true
    } 
  },
  logging: true,
  force: true,
  pool: {
    max: 100,
    min: 0,
    idle: 200000,
    acquire: 1000000,
  },
  ssl: true,
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