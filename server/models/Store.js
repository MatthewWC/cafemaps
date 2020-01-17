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
    imageUrl: {
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
    moHours: {
      type: DataTypes.STRING
    },
    tuHours: {
      type: DataTypes.STRING
    },
    weHours: {
      type: DataTypes.STRING
    },
    thHours: {
      type: DataTypes.STRING
    },
    frHours: {
      type: DataTypes.STRING
    },
    saHours: {
      type: DataTypes.STRING
    },
    suHours: {
      type: DataTypes.STRING
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 5
    },
    wifi: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    bakery: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    milkAlt: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    indoorSeating: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    driveThru: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    clubCard: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
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

  // Store.associate = (models) => {
  //   Store.belongsTo(models.Company, {
  //     foreignId: 'companyId'
  //   })
  // }

  Store.order = 0

  return Store
}
