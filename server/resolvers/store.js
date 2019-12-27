const { AuthenticationError } = require('apollo-server-express')

module.exports = {
  Query: {
    getStore: async (_, args, context, info) => {
      let store

      store = await context.models.Store.findOne({
        where: { id: args.id }
      })

      return store
    }
  },
  Mutation: {
    createStore: async (_, args, context, info) => {
      let company
      let store
      // get company
      try{
        company = await context.models.Company.findOne({
          where: {
            companyName: args.companyName
          }
        })
      } catch (err) {
        throw new AuthenticationError('Something bad has happened. Contact support.')
      }
      // throw if doesnt exist
      if(company == null){
        throw new AuthenticationError('That company does not exist')
      }
      // create store
      try{
        store = await context.models.Store.create({
          email: args.email || company.dataValues.email,
          storeName: args.storeName,
          companyId: company.dataValues.id,
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
      } catch (err) {
        throw new AuthenticationError('Something bad has happened. Contact support')
      }
      return store
    },
    updateStore: async (_, args, context, info) => {
      let store
      // get store
      try{
        store = await context.models.Store.findOne({
          where: {
            id: args.id
          }
        })
      } catch (err) {
        throw new AuthenticationError('Something bad has happened. Contact support.')
      }
      if(store == null){
        throw new AuthenticationError('That store does not exist.')
      }
      // update
      try{
        await store.update({
          email: args.email || store.dataValues.email,
          storeName: args.storeName || store.dataValues.storeName,
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
      } catch (err) {
        throw new AuthenticationError('Something bad has happened. Contact support.')
      }
      return store
    },
    deleteStore: async (_, args, context, info) => {
      let store
      //get store
      try{
        store = await context.models.Store.findOne({
          where: {
            id: args.id
          }
        })
      } catch (err) {
        throw new AuthenticationError('Something bad has happened. Contact support.')
      }
      //if null
      if(store == null){
        throw new AuthenticationError('That store does not exist.')
      }
      // delete store
      try{
        await store.destroy({
          force: true
        })
      } catch (err) {
        throw new AuthenticationError('Something bad has happened. Contact support.')
      }
      return store
    }
  }
}
