const { DataTypes, Sequelize } = require('sequelize');

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
    login_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0, // Set the default value to 0 for newly created profile signup
      },
},
{
    timestamps: false
},);

// Ensure the table is created or updated
sequelize.sync()
  .then(() => {
    console.log(" ");
  })
  .catch(err => {
    console.error('Error creating user credentials table:', err);
  });

module.exports = user_credential;
