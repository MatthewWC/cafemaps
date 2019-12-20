module.exports = {
  Query: {
    getCompany: async (_, args, context, info) => {
      return context.models.Company.findOne({
        where: { companyName: args.companyName }
      })
    }
  },
  Mutation: {
    createCompany: async (_, args, context, info) => {
      return context.models.Company.create({
        companyName: args.companyName
      })
    }
  }
}