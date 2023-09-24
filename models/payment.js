const { DataTypes, Sequelize } = require('sequelize');
const book = require('./book');
const user = require('./user')

const sequelize = new Sequelize('shubhamkumar', 'shubhamkumar', 'shubham123', {
  host: 'localhost',
  dialect: 'postgres', // Change this to the appropriate dialect if using a different database
});

const Payment = sequelize.define('payments', {
  paymentid: {
    type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'paymentid'
  },
  // userId: DataTypes.STRING,
  amount: DataTypes.NUMERIC(10, 2),
  payment_date: {
    type: DataTypes.STRING, // Store date as a string
    allowNull: false,
    get() {
      // Custom getter method to format date when retrieving it
      const rawDate = this.getDataValue('payment_date');
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
          this.setDataValue('payment_date', `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
        }
      }
    },
  },
}, {
  // Define table name if you want it to be different from the model name
  // tableName: 'payments',
  timestamps: false, // Set to true if you want to include timestamps (createdAt, updatedAt)
});


Payment.belongsTo(book, { foreignKey: 'isbn' });
Payment.belongsTo(user, {foreignKey: 'id'});
// Sync the model with the database to create the table
sequelize.sync()
  .then(() => {
    console.log('Payment table created successfully.');
  })
  .catch(err => {
    console.error('Error creating Payment table:', err);
  });

module.exports = Payment;
