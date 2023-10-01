'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Create the users table
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [['Librarian', 'Student', 'Faculty']],
        },
      },
      registration_date: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      // Add any other fields here
    });

    // Add foreign key relationship to user_credentials table
    await queryInterface.addColumn('users', 'user_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'user_credentials',
        key: 'user_id',
      },
      allowNull: false,
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
