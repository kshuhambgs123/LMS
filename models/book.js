const { DataTypes, Sequelize } = require('sequelize');

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
    defaultValue: 1, // Set the default value to 1 for newly created bookcopy
  },
  lent_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0, // Set the default value to 0 for newly created lent books
  },
publication_date: {
  type: DataTypes.STRING, // Store date as a string
  allowNull: false,
  get() {
    // Custom getter method to format date when retrieving it in dd-mm-yyy
    const rawDate = this.getDataValue('publication_date');
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
        this.setDataValue('publication_date', `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
      }
    }
  },
},

 },
 {  
  timestamps: false,
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
