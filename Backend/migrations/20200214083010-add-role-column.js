module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users','role', {
      type: Sequelize.ENUM,
      values: [
        'USER',
        'ADMIN',
        'SUPER_ADMIN'
      ],
      allowNull: false,
      defaultValue : 'USER' 
    });
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('users','role'),
      queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_users_role";')
    ])
  }
}