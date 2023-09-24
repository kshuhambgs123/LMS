const { DataTypes } = require('sequelize');
const Sequelize = require('sequelize');


const sequelize = new Sequelize('shubhamkumar', 'shubhamkumar', 'shubham123', {
  host: 'localhost',
  dialect: 'postgres',
});

const Book = sequelize.define('books', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'id' },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isbn: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  subject: {
    type: DataTypes.STRING,
  }, copies_available: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0, // Set the default value to 0 for newly created books
  },
 },
 {   timestamps: false,

});

// Sync the model with the database to create the table
sequelize.sync()
  .then(() => {
    console.log('Book table created successfully.');
  })
  .catch(err => {
    console.error('Error creating Book table:', err);
  });

module.exports = Book;
