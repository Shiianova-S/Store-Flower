const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BouquetList extends Model {
    static associate({ Bouquet }) {
      this.belongsTo(Bouquet, { foreignKey: 'bouquet_id' });
    }
  }
  BouquetList.init({
    bouquet_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Bouquets',
        key: 'id',
      },
    },
    count: {
      type: DataTypes.INTEGER,
    },
    order_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Orders',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'BouquetList',
  });
  return BouquetList;
};
