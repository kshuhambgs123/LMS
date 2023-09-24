const { DataTypes, Sequelize } = require('sequelize');
const user_credentials = require('./user_authentication');
//const sequelize = require('./connection/conn'); // Import your Sequelize connection

const sequelize = new Sequelize('shubhamkumar', 'shubhamkumar', 'shubham123', {
  host: 'localhost',
  dialect: 'postgres',
});
const User = sequelize.define('users', {
  userid: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'id' },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['Librarian', 'Student', 'Faculty']], // Enforce enum values
    },
  },
  registration_date: {
    type: DataTypes.STRING, // Store date as a string
    allowNull: false,
    get() {
      // Custom getter method to format date when retrieving it
      const rawDate = this.getDataValue('registration_date');
      if (rawDate) {
        const dateParts = rawDate.split('-'); // Assuming date is stored as "dd-mm-yyyy"
        if (dateParts.length === 3) {
          return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
        }
      }
      return rawDate;
    },
    set(value) {
      // Custom setter method to parse and store date in "dd-mm-yyyy" format
      if (value) {
        const dateParts = value.split('-');
        if (dateParts.length === 3) {
          this.setDataValue('registration_date', `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
        }
      }
    },
  },
}, {
  // tableName: 'users',
  timestamps: false,
});
User.belongsTo(user_credentials, {foreignKey: 'user_id'});


// Sync the model with the database to create the table
sequelize.sync()
  .then(() => {
    console.log('User table created successfully.');
  })
  .catch(err => {
    console.error('Error creating Book table:', err);
  });
module.exports = User;



