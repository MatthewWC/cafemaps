module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: () => uuid()
    },
    companyName: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      unique: true,
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
      type: DataTypes.INTEGER
    },
    phoneNumber: {
      unique: true,
      type: DataTypes.INTEGER
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    }
  })

  Company.associate = (models) => {
    Company.hasMany(models.Store, {
      foreignKey: 'companyId'
    })
  }

  Company.order = 1

  return Company
}
