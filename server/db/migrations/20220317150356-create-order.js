module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      delivery_date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      delivery_street: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      delivery_house: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      delivery_apartment: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      delivery_method: {
        type: Sequelize.STRING,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
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
    await queryInterface.dropTable('Orders');
  },
};
