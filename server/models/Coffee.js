const { uuid } = require('uuidv4')

module.exports = (sequelize, DataTypes) => {
  const Coffee = sequelize.define('Coffee', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: () => uuid()
    },
    coffeeName: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    imageUrl: {
      type: DataTypes.STRING
    },
    description: {
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

  Coffee.order = 0

  return Coffee
}
