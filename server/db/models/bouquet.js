const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Bouquet extends Model {
    static associate({ Order, Category, BouquetList }) {
      this.belongsToMany(Order, { through: BouquetList, foreignKey: 'bouquet_id' });
      this.belongsTo(Category, { foreignKey: 'category_id' });
      this.hasOne(BouquetList, { foreignKey: 'bouquet_id', as: 'count' });
    }
  }
  Bouquet.init(
    {
      title: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.INTEGER,
      },
      img: {
        type: DataTypes.TEXT,
      },
      inStock: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      category_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Category',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Bouquet',
    },
  );
  return Bouquet;
};
