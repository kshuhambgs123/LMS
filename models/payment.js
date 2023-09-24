const { DataTypes, Sequelize } = require('sequelize');

const sequelize = new Sequelize('shubhamkumar', 'shubhamkumar', 'shubham123', {
  host: 'localhost',
  dialect: 'postgres', // Change this to the appropriate dialect if using a different database
});

const Payment = sequelize.define('payments', {
  paymentId: {
    type: DataTypes.STRING,
    unique: true,
    primaryKey: true, // Assuming paymentId is the primary key
  },
  userId: DataTypes.STRING,
  amount: DataTypes.NUMERIC(10, 2),
  paymentDate: DataTypes.DATE,
}, {
  // Define table name if you want it to be different from the model name
  tableName: 'payments',
  timestamps: false, // Set to true if you want to include timestamps (createdAt, updatedAt)
});

// Sync the model with the database to create the table
sequelize.sync()
  .then(() => {
    console.log('Payment table created successfully.');
  })
  .catch(err => {
    console.error('Error creating Payment table:', err);
  });

module.exports = Payment;
