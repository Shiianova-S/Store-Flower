const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate({ Bouquet, User, BouquetList }) {
      this.belongsToMany(Bouquet, { through: BouquetList, foreignKey: 'order_id', as: 'orderList' });
      this.belongsTo(User, { foreignKey: 'user_id' });
    }
  }
  Order.init(
    {
      delivery_date: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      delivery_street: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      delivery_house: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      delivery_apartment: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      delivery_method: {
        type: DataTypes.STRING,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'User',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Order',
    },
  );
  return Order;
};
