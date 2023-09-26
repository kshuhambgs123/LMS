const { DataTypes, Sequelize } = require('sequelize');
const books = require('./book');

const sequelize = new Sequelize('shubhamkumar', 'shubhamkumar', 'shubham123', {
  host: 'localhost',
  dialect: 'postgres',
});

const Bookcopy = sequelize.define('book_copies', {
  copy_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'copy_id' },
//   isbn: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     unique: true,
//   },
 },
 {  
  timestamps: false,
});

Bookcopy.belongsTo(books, {foreignKey: 'book_id'});

// Sync the model with the database to create the table
sequelize.sync()
  .then(() => {
    console.log('Book_Copies table created successfully.');
  })
  .catch(err => {
    console.error('Error creating Book_Copies table:', err);
  });

module.exports = Bookcopy;
