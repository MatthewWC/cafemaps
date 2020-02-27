const { uuid }= require('uuidv4')

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
    latitude: {
      type: DataTypes.DECIMAL(9, 7)
    },
    longitude: {
      type: DataTypes.DECIMAL(10, 7)
    },
    addressOne: {
      type: DataTypes.STRING
    },
    phoneNumber: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    imageUrl: {
      type: DataTypes.STRING
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

  Store.associate = (models) => {
    Store.hasMany(models.Coffee, {
      foreignKey: 'storeId'
    })
  }

  Store.order = 1

  return Store
}
