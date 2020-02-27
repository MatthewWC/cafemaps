// https://pontaku-tools.com/english/ great tool for sequelize

const { UnknownError } = require('../errors')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = {
  Query: {
    getStore: async (_, args, context, info) => {
      // handle auth
      await context.auth('PUBLIC')
      // return store
      return await context.models.Store.findOne({
        where: {
          [Op.or]: 
            [
              {id: {[Op.eq]: args.id}},
              {storeName: {[Op.eq]: args.storeName}}
            ]
        }
      })
    },
    getStores: async (_, args, context, info) => {
      // handle auth
      await context.auth('PUBLIC')
      // find stores
      return await context.models.Store.findAll()
      // return stores
    }
  },
  Mutation: {
    createStore: async (_, args, context, info) => {
      // handle auth
      await context.auth('ADMIN')
      // create store
      return await context.models.Store.create({
        storeName: args.storeName,
        latitude: args.latitude,
        longitude: args.longitude,
        addressOne: args.addressOne,
        phoneNumber: args.phoneNumber,
        email: args.email,
        imageUrl: args.imageUrl
      })
    },
    updateStore: async (_, args, context, info) => {
      // handle auth
      context.auth('ADMIN')
      // get store
      const store = await context.models.Store.findOne({
        where: {
          [Op.or]: 
            [
              {id: {[Op.eq]: args.id}},
              {storeName: {[Op.eq]: args.storeName}}
            ]
        }
      })
      if(store == null){
        throw new Error('That store does not exist.')
      }
      // update store
      await store.update({
        storeName: args.storeName || store.dataValues.storeName,
        latitude: args.latitude || store.dataValues.latitude,
        longitude: args.longitude || store.dataValues.longitude,
        addressOne: args.addressOne || store.dataValues.addressOne,
        phoneNumber: args.phoneNumber || store.dataValues.phoneNumber,
        email: args.email || store.dataValues.email,
        imageUrl: args.imageUrl || store.dataValues.imageUrl
      })
      return store
    },
    deleteStore: async (_, args, context, info) => {
      // handle auth
      await context.auth('ADMIN')
      //get store
      const store = await context.models.Store.findOne({
        where: { id: args.id }
      })
      //if null
      if(store === null){ throw new Error('That store does not exist.')}
      // delete store
      await store.destroy({ force: true })
      return store
    }
  }
}
