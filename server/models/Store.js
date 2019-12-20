module.exports = (sequelize, DataTypes) => {
  const Store = sequelize.define('Store', {
    storeName: DataTypes.STRING
  })

  Store.order = 0

  return Store
}
