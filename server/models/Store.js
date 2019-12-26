const { uuid }= require('uuidv4')

// apple pay
// samsung pay

module.exports = (sequelize, DataTypes) => {
  const Store = sequelize.define('Store', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: () => uuid()
    },
    storeName: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    addressOne: {
      type: DataTypes.STRING
    },
    addressTwo: {
      type: DataTypes.STRING
    },
    city: {
      type: DataTypes.STRING
    },
    state: {
      type: DataTypes.STRING
    },
    zipcode: {
      type: DataTypes.STRING(5)
    },
    rating: {
      type: DataTypes.FLOAT
    },
    wifi: {
      type: DataTypes.BOOLEAN
    },
    bakery: {
      type: DataTypes.BOOLEAN
    },
    milkAlt: {
      type: DataTypes.BOOLEAN
    },
    indoorSeating: {
      type: DataTypes.BOOLEAN
    },
    driveThru: {
      type: DataTypes.BOOLEAN
    },
    clubCard: {
      type: DataTypes.BOOLEAN
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    }
  })

  Store.order = 0

  return Store
}
