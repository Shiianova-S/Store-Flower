const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate({ Bouquet }) {
      this.hasMany(Bouquet, { foreignKey: 'category_id' });
    }
  }
  Category.init({
    name: {
      type: DataTypes.STRING,
    },
    icon: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};
