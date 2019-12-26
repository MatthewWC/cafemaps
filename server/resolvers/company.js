const { AuthenticationError } = require('apollo-server-express')

module.exports = {
  Query: {
    getCompany: async (_, args, context, info) => {
      let company
      // get company
      try{
        switch(Object.keys(args)[0]){
          case 'companyName':
              company = await context.models.Company.findOne({
                where: { 
                  companyName: args.companyName         
                }
              })
            break
          case 'id':
              company = await context.models.Company.findOne({
                where: { 
                  id: args.id      
                }
              })
            break
          default:
            break
        }
      } catch (err) {
        throw new AuthenticationError('Something bad happened. Contact support.')
      }
      // if doesnt exist
      if(company == null){
        throw new AuthenticationError('That company does not exist.')
      }
      return company
    }
  },
  Mutation: {
    createCompany: async (_, args, context, info) => {
      let company
      // create
      try{
        company = await context.models.Company.create({
          companyName: args.companyName,
          email: args.email,
          addressOne: args.addressOne || '',
          addressTwo: args.addressTwo || '',
          city: args.city || '',
          state: args.state || '',
          zipcode: args.zipcode || ''
        })
      } catch (err) {
        throw new AuthenticationError('Something bad happened. Contact support.')
      }
      return company
    },
    updateCompany: async (_, args, context, info) => {
      let company
      // get company
      try{
        company = await context.models.Company.findOne({
          where: {
            companyName: args.companyName,
          }
        })
      } catch (err) {
        throw new AuthenticationError('Something bad happened. Contact support.')
      }
      if(company == null){
        throw new AuthenticationError('That company does not exist.')
      }
      // update company
      try{
        await company.update({
          email: args.email || company.dataValues.email,
          addressOne: args.addressOne || company.dataValues.addressOne,
          addressTwo: args.addressTwo || company.dataValues.addressTwo,
          city: args.city || company.dataValues.city,
          state: args.state || company.dataValues.state,
          zipcode: args.zipcode || company.dataValues.zipcode
        })
      } catch (err) {
        throw new AuthenticationError('Something bad happened. Contact support.')
      }
      return company
    },
    deleteCompany: async (_, args, context, info) => {
      let company
      // get company
      try{
        company = await context.models.Company.findOne({
          where: {
            companyName: args.companyName
          }
        })
      } catch (err) {
        throw new AuthenticationError('Something bad happened. Contact support.')
      }
      if(company == null){
        throw new AuthenticationError('That company does not exist.')
      }
      // delete company
      try{
        await company.destroy({
          force: true
        })
      } catch (err) {
        throw new AuthenticationError('Something bad happened. Contact support.')
      }
      return company
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