const { UnknownError } = require('../errors')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = {
  Query: {
    getCoffee: async (_, args, context, info) => {
      // handle auth
      await context.auth('PUBLIC')
      // return coffee
      return await context.models.Coffee.findOne({
        where: {
          [Op.or]: 
            [
              {id: {[Op.eq]: args.id}},
              {storeId: {[Op.eq]: args.storeId}}
            ]
        }
      })
    },
    getCoffees: async (_, args, context, info) => {
      // handle auth
      await context.auth('PUBLIC')
      // return coffee
      return await context.models.Coffee.findAll({
        where: {
          [Op.or]: 
            [
              {id: {[Op.eq]: args.id}},
              {storeId: {[Op.eq]: args.storeId}}
            ]
        }
      })
    }
  },
  Mutation: {
    createCoffee: async (_, args, context, info) => {
      // handle auth
      await context.auth('ADMIN')
      const store = await context.models.Store.findOne({
        where: { storeName: args.storeName }
      })
      // throw if doesnt exist
      if(store === null){
        throw new Error('That store does not exist')
      }
      // create coffee
      return await context.models.Coffee.create({
        storeId: store.dataValues.id,
        coffeeName: args.coffeeName,
        imageUrl: args.imageUrl,
        description: args.description,
      })
    },
    updateCoffee: async (_, args, context, info) => {
      // handle auth
      await context.auth('ADMIN')
      // get coffee
      const coffee = await context.models.Coffee.findOne({
        where: { coffeeName: args.coffeeName }
      })
      if(coffee === null){
        throw new Error('That coffee does not exist')
      }
      await coffee.update({
        coffeeName: args.coffeeName || coffee.dataValues.coffeeName,
        imageUrl: args.imageUrl || coffee.dataValues.imageUrl,
        description: args.description || coffee.dataValues.description
      })
      return coffee
    },
    deleteCoffee: async (_, args, context, info) => {
      // handle auth
      await context.auth('ADMIN')
      // get coffee
      const coffee = await context.models.Coffee.findOne({
        where: { id: args.id }
      })
      //if null
      if(coffee === null){
        throw new Error('That coffee does not exist.')
      }
      await coffee.destroy({ force: true })
      return coffee
    }
  }
}


// Another good way to make dynamic getters

// var whereClause = {}
// try{
//   var argKey = Object.keys(args)[0];
//   if(!argKey)
//     return

//   whereClause[argKey] = args[argKey];
//   company = await context.models.Company.findOne({ where: whereClause })
// } catch (err) {
//   throw new AuthenticationError('Something bad happened. Contact support.')
// }