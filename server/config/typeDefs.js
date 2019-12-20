const { gql } = require('apollo-server-express')

module.exports = gql`
  type User {
    id: String,
    username: String
  }

  type Company {
    id: String,
    companyName: String
  }

  type Store {
    id: String,
    storeName: String
  }
    
  type Query {
    getUser(username: String): User!
    getCompany(companyName: String): Company!
    getStore(storeName: String): Store!
  }
    
  type Mutation {
    createUser(firstName: String, lastName: String): User!
    createCompany(companyName: String): Company!
    createStore(storeName: String): Store!
  }`