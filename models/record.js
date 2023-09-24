const { DataTypes, Sequelize } = require('sequelize');
const book = require('./book');
const user = require('./user')

const sequelize = new Sequelize('shubhamkumar', 'shubhamkumar', 'shubham123', {
  host: 'localhost',
  dialect: 'postgres',
});

const Record = sequelize.define('records', {
  recordId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'recordId' },
  issue_date: {
    type: DataTypes.STRING, // Store date as a string
    allowNull: false,
    get() {
      // Custom getter method to format date when retrieving it
      const rawDate = this.getDataValue('issue_date');
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
          this.setDataValue('issue_date', `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
        }
      }
    },
  },
  return_date: {
    type: DataTypes.STRING, // Store date as a string
    allowNull: false,
    get() {
      // Custom getter method to format date when retrieving it
      const rawDate = this.getDataValue('return_date');
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
          this.setDataValue('return_date', `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
        }
      }
    },
  }
}, {
  // tableName: 'records',
  timestamps: false,
});
// Define the many-to-one (belongsTo) relationship
Record.belongsTo(book, { foreignKey: 'isbn' });
Record.belongsTo(user, {foreignKey: 'id'});

// Ensure the table is created or updated
sequelize.sync()
  .then(() => {
    console.log('Record table created successfully.');
  })
  .catch(err => {
    console.error('Error creating Record table:', err);
  });

module.exports = Record;
