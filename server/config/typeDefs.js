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

  type Company {
    id: String,
    companyName: String!,
    email: String!,
    imageUrl: String!,
    addressOne: String,
    addressTwo: String,
    city: String,
    state: String,
    zipcode: String,
  }

  type Store {
    id: String,
    companyId: String!,
    latitude: String!,
    longitude: String!,
    storeName: String!,
    email: String!,
    imageUrl: String,
    addressOne: String!,
    addressTwo: String,
    city: String!,
    state: String!,
    zipcode: Float!,
    moHours: String!,
    tuHours: String!,
    weHours: String!,
    thHours: String!,
    frHours: String!,
    saHours: String!,
    suHours: String!,
    rating: String,
    wifi: Boolean!,
    bakery: Boolean!,
    milkAlt: Boolean!,
    indoorSeating: Boolean!,
    driveThru: Boolean!,
    roastery: Boolean!,
    clubCard: Boolean!
  }
    
  type Query {
    getUser(email: String): User!
    getUsers(firstName: String): [User!]
    getCompany(companyName: String, id: String): Company
    getStore(id: String!): Store!
    getStores(longitude: String!, latitude: String!): [Store!]
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

    createCompany(
      companyName: String!,
      email: String,
      imageUrl: String,
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
      latitude: Float!,
      longitude: Float!,
      storeName: String!,
      email: String,
      imageUrl: String,
      addressOne: String!,
      addressTwo: String,
      city: String!,
      state: String!,
      zipcode: String!,
      moHours: String!,
      tuHours: String!,
      weHours: String!,
      thHours: String!,
      frHours: String!,
      saHours: String!,
      suHours: String!,
      rating: String,
      wifi: Boolean,
      bakery: Boolean,
      milkAlt: Boolean,
      indoorSeating: Boolean,
      driveThru: Boolean,
      roastery: Boolean,
      clubCard: Boolean
    ): Store!
    
    updateStore(
      id: String!,
      latitude: String!,
      longitude: String!,
      storeName: String,
      email: String,
      imageUrl: String,
      addressOne: String,
      addressTwo: String,
      city: String,
      state: String,
      zipcode: String,
      moHours: String,
      tuHours: String,
      weHours: String,
      thHours: String,
      frHours: String,
      saHours: String,
      suHours: String,
      rating: String,
      wifi: Boolean,
      bakery: Boolean,
      milkAlt: Boolean,
      indoorSeating: Boolean,
      driveThru: Boolean,
      roastery: Boolean,
      clubCard: Boolean
    ): Store!

    deleteStore(
      id: String!,
    ): Store
  }

  type LoginResponse {
    token: String
    user: User
  }
  
  enum Role{
    ADMIN
    USER
  }`