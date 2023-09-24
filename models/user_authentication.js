const { DataTypes, Sequelize } = require('sequelize');
//const sequelize = require('./connection/conn'); // Import your Sequelize connection

const sequelize = new Sequelize('shubhamkumar', 'shubhamkumar', 'shubham123', {
  host: 'localhost',
  dialect: 'postgres',
});

const user_credential  = sequelize.define('user_credentials', {
    userid: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'user_id' },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        isEmail: true, //checks for email format
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
},{timestamps: false},)

// Ensure the table is created or updated
sequelize.sync()
  .then(() => {
    console.log('User credentials table created successfully.');
  })
  .catch(err => {
    console.error('Error creating user credentials table:', err);
  });

module.exports = user_credential;
