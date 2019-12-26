const { gql } = require('apollo-server-express')

module.exports = gql`
  type User {
    firstName: String!,
    lastName: String,
    password: String!,
    email: String!
  }

  type Company {
    id: String,
    companyName: String!,
    email: String!,
    addressOne: String,
    addressTwo: String,
    city: String,
    state: String,
    zipcode: String,
  }

  type Store {
    id: String,
    storeName: String
  }
    
  type Query {
    getUsers(firstName: String): [User!]
    getUser(email: String): User!
    getCompany(companyName: String, id: String): Company!
    getStore(storeName: String): Store!
  }
    
  type Mutation {
    register(
      firstName: String!,
      lastName: String, 
      password: String!, 
      email: String!
    ): User!

    login(
      email: String!,
      password: String!
    ): LoginResponse!

    updateUser(
      firstName: String, 
      lastName: String, 
      password: String,
      email: String
    ): User!

    deleteUser(password: String!): User

    createCompany(
      companyName: String!,
      email: String!,
      addressOne: String,
      addressTwo: String,
      city: String,
      state: String,
      zipcode: String
    ): Company!

    updateCompany(
      companyName: String!,
      email: String,
      addressOne: String,
      addressTwo: String,
      city: String,
      state: String,
      zipcode: String
    ): Company!

    deleteCompany(
      companyName: String!
    ): Company

    createStore(
      companyName: String!,
      storeName: String!
    ): Store

  }
  
  type LoginResponse {
    token: String
    user: User
  }`