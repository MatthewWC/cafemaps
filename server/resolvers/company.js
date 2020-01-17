const { UnknownError } = require('../errors')

module.exports = {
  Query: {
    getCompany: async (_, args, context, info) => {
      try{
        //handle auth
        context.auth('PUBLIC')
        // return company
        switch(Object.keys(args)[0]){
          case 'companyName':
              return await context.models.Company.findOne({
                where: { 
                  companyName: args.companyName         
                }
              })
          case 'id':
              return await context.models.Company.findOne({
                where: { 
                  id: args.id      
                }
              })
          default:
            break
        }
      } catch (error) {
        throw new UnknownError
      }
    }
  },
  Mutation: {
    createCompany: async (_, args, context, info) => {
      // handle auth
      await context.auth('ADMIN')
      // create company
      return await context.models.Company.create({
        companyName: args.companyName,
        email: args.email,
        addressOne: args.addressOne || '',
        addressTwo: args.addressTwo || '',
        city: args.city || '',
        state: args.state || '',
        zipcode: args.zipcode || ''
      })
    },
    updateCompany: async (_, args, context, info) => {
      // handle auth
      await context.auth('ADMIN')
      // get company
      const company = await context.models.Company.findOne({
        where: { companyName: args.companyName }
      })
      // cant be null
      if(company === null){
        throw new Error('That company does not exist.')
      }
      // update company
      return await company.update({
        email: args.email || company.dataValues.email,
        addressOne: args.addressOne || company.dataValues.addressOne,
        addressTwo: args.addressTwo || company.dataValues.addressTwo,
        city: args.city || company.dataValues.city,
        state: args.state || company.dataValues.state,
        zipcode: args.zipcode || company.dataValues.zipcode
      })
    },
    deleteCompany: async (_, { companyName }, context, info) => {
      await context.auth('ADMIN')
      // get company
      const company = await context.models.Company.findOne({
        where: { companyName: companyName }
      })
      // delete company
      await company.destroy({ force: true })
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