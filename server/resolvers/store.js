const { UnknownError } = require('../errors')

module.exports = {
  Query: {
    getStore: async (_, args, context, info) => {
      // handle auth
      await context.auth('USER')
      // return store
      return await context.models.Store.findOne({
        where: { id: args.id }
      })
    }
  },
  Mutation: {
    createStore: async (_, args, context, info) => {
      // handle auth
      context.auth('ADMIN')
      const company = await context.models.Company.findOne({
        where: { companyName: args.companyName }
      })
      // throw if doesnt exist
      if(company === null){
        throw new Error('That company does not exist.')
      }
      // create store
      return await context.models.Store.create({
        email: args.email || company.dataValues.email,
        storeName: args.storeName,
        companyId: company.dataValues.id,
        imageUrl: args.imageUrl,
        addressOne: args.addressOne,
        addressTwo: args.addressTwo,
        city: args.city,
        state: args.state,
        zipcode: args.zipcode,
        moHours: args.moHours,
        tuHours: args.tuHours,
        weHours: args.weHours,
        thHours: args.thHours,
        frHours: args.frHours,
        saHours: args.saHours,
        suHours: args.suHours,
        rating: args.rating,
        wifi: args.wifi,
        bakery: args.bakery,
        milkAlt: args.milkAlt,
        indoorSeating: args.indoorSeating,
        driveThru: args.driveThru,
        clubCard: args.clubCard
      })
    },
    updateStore: async (_, args, context, info) => {
      // handle auth
      context.auth('ADMIN')
      // get store
      const store = await context.models.Store.findOne({
        where: { id: args.id }
      })
      if(store == null){
        throw new Error('That store does not exist.')
      }
      // update store
      await store.update({
        email: args.email || store.dataValues.email,
        storeName: args.storeName || store.dataValues.storeName,
        imageUrl: args.imageUrl || store.dataValues.imageUrl,
        addressOne: args.addressOne || store.dataValues.addressOne,
        addressTwo: args.addressTwo || store.dataValues.addressTwo,
        city: args.city || store.dataValues.city,
        state: args.state || store.dataValues.state,
        zipcode: args.zipcode || store.dataValues.zipcode,
        moHours: args.moHours || store.dataValues.moHours,
        tuHours: args.tuHours || store.dataValues.tuHours,
        weHours: args.weHours || store.dataValues.weHours,
        thHours: args.thHours || store.dataValues.thHours,
        frHours: args.frHours || store.dataValues.frHours,
        saHours: args.saHours || store.dataValues.saHours,
        suHours: args.suHours || store.dataValues.suHours,
        rating: args.rating || store.dataValues.rating,
        wifi: args.wifi || store.dataValues.wifi,
        bakery: args.bakery || store.dataValues.bakery,
        milkAlt: args.milkAlt || store.dataValues.milkAlt,
        indoorSeating: args.indoorSeating || store.dataValues.indoorSeating,
        driveThru: args.driveThru || store.dataValues.driveThru,
        clubCard: args.clubCard || store.dataValues.clubCard
      })
      return store
    },
    deleteStore: async (_, args, context, info) => {
      // handle auth
      context.auth('ADMIN')
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
