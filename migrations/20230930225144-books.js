'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Create the books table
    await queryInterface.createTable('books', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      author: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isbn: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
      subject: {
        type: Sequelize.STRING,
      },
      copies_available: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      lent_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      publication_date: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      // Add any other fields here
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
