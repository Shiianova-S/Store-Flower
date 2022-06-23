module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BouquetLists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      bouquet_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Bouquets',
          key: 'id',
        },
      },
      count: {
        type: Sequelize.INTEGER,
      },
      order_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Orders',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('BouquetLists');
  },
};
