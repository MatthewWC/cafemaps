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
    companyId: String!,
    storeName: String!,
    email: String!,
    addressOne: String!,
    addressTwo: String,
    city: String!,
    state: String!,
    zipcode: Float!,
    wifi: Boolean!,
    bakery: Boolean!,
    milkAlt: Boolean!,
    indoorSeating: Boolean!,
    driveThru: Boolean!,
    clubCard: Boolean!
  }
    
  type Query {
    getUser(email: String): User!
    getUsers(firstName: String): [User!]
    getCompany(companyName: String, id: String): Company!
    getStore(id: String!): Store!
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
      email: String,
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
      email: String!,
      storeName: String!,
      addressOne: String!,
      addressTwo: String,
      city: String!,
      state: String!,
      zipcode: String!,
      rating: Float,
      wifi: Boolean,
      bakery: Boolean,
      milkAlt: Boolean,
      indoorSeating: Boolean,
      driveThru: Boolean,
      clubCard: Boolean
    ): Store!
    
    updateStore(
      id: String!,
      storeName: String,
      email: String,
      addressOne: String,
      addressTwo: String,
      city: String,
      state: String,
      zipcode: String,
      rating: Float,
      wifi: Boolean,
      bakery: Boolean,
      milkAlt: Boolean,
      indoorSeating: Boolean,
      driveThru: Boolean,
      clubCard: Boolean
    ): Store!

    deleteStore(
      id: String!,
    ): Store
  }
  
  type LoginResponse {
    token: String
    user: User
  }`