const { gql } = require('apollo-server-express')

module.exports = gql`
  type User {
    role: Role!
    imageUrl: String
    firstName: String,
    lastName: String,
    password: String!,
    email: String!
  }

  type Store {
    id: String,
    storeName: String!,
    latitude: String!,
    longitude: String!,
    addressOne: String!,
    phoneNumber: String!,
    email: String!,
    imageUrl: String!,
  }

  type Coffee {
    id: String!,
    storeId: String!,
    coffeeName: String!,
    imageUrl: String!,
    description: String!
  }

  type Query {
    getUser(email: String): User!
    getUsers(firstName: String): [User!]
    getStore(id: String, storeName: String): Store!
    getStores: [Store!]
    getCoffee(id: String!): Coffee!
    getCoffees(storeId: String!): [Coffee!]
  }
    
  type Mutation {
    register(
      password: String!, 
      email: String!
    ): User!

    login(
      email: String!,
      password: String!
    ): LoginResponse!

    updateUser(
      imageUrl: String,
      firstName: String, 
      lastName: String, 
      password: String,
      email: String
    ): LoginResponse!

    deleteUser(password: String!): User

    createStore(
      storeName: String!,
      latitude: Float!,
      longitude: Float,
      addressOne: String!,
      phoneNumber: String!,
      email: String!,
      imageUrl: String!,
    ): Store!
    
    updateStore(
      storeName: String!,
      latitude: Float,
      longitude: Float,
      addressOne: String,
      phoneNumber: String,
      email: String,
      imageUrl: String,
    ): Store!

    deleteStore(
      id: String!,
    ): Store!

    createCoffee(
      storeName: String!,
      coffeeName: String!,
      imageUrl: String!,
      description: String! 
    ): Coffee!

    updateCoffee(
      coffeeName: String!,
      imageUrl: String,
      description: String,
    ): Coffee!

    deleteCoffee(
      id: String!
    ): Coffee!
  }

  type LoginResponse {
    token: String
    user: User
  }
  
  enum Role{
    ADMIN
    USER
  }`