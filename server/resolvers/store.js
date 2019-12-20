module.exports = {
  Query: {
    getStore: async (_, args, context, info) => {
      return context.models.Store.findOne({
        where: { storeName: args.storeName }
      })
    }
  },
  Mutation: {
    createStore: async (_, args, context, info) => {
      console.log(context)
      return context.models.Store.create({
        storeName: args.storeName
      })
    }
  }
}
