module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    companyName: DataTypes.STRING
  })

  Company.associate = (models) => {
    Company.hasMany(models.Store, {
      foreignKey: 'companyId'
    })
  }

  Company.order = 1

  return Company
}
