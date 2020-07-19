module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('posts', {
      id: {
        allowNull: false,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
        type: Sequelize.UUID
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      user_id: {
        type: Sequelize.UUID,
        onDelete: "CASCADE",
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('posts');
  }
};
