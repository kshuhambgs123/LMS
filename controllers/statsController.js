// statsController.js

const Record = require('../models/record');
const Book = require('../models/book');
const User = require('../models/user');
const moment = require('moment');
const user_auth = require("../models/user_authentication")
const { Pool } = require('pg');
const pool = new Pool({
  dialect: 'postgres',
  host: 'localhost',
  username: 'shubhamkumar',
  password: 'shubham123',
  database: 'shubhamkumar',
  port: 5432,
});

// Get library statistics based on a specified time span
const getLibraryStatistics = async (req, res) => {
  try {
    const { timespan } = req.params;

    // Calculate start date based on the specified time span
    const startDate = moment().subtract(timespan, 'days').toDate();

    // Calculate statistics
    const highestLentBook = await getHighestLentBook(startDate);
    const mostActiveUser = await getMostActiveUser(startDate);
    const oldestBook = await getOldestBook();
    const newestBook = await getNewestBook();
    const mostAvailableBook = await getMostAvailableBook();
    const totalUsers = await User.countDocuments();
    const totalBooks = await Book.countDocuments();
    const totalLentBooks = await Record.countDocuments({ lending_date: { $gte: startDate } });

    // Return the statistics
    res.json({
      highestLentBook,
      mostActiveUser,
      oldestBook,
      newestBook,
      mostAvailableBook,
      totalUsers,
      totalBooks,
      totalLentBooks,
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Helper function to get the highest lent book
const getHighestLentBook = async (startDate) => {
  const result = await Record.aggregate([
    { $match: { lending_date: { $gte: startDate } } },
    { $group: { _id: '$book_id', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 1 },
    { $lookup: { from: 'books', localField: '_id', foreignField: '_id', as: 'book' } },
    { $unwind: '$book' },
    { $project: { title: '$book.title', count: 1 } },
  ]);

  return result[0];
};

// Helper function to get the most active user
const getMostActiveUser = async (req,res) => {
  // const result = await Record.aggregate([
  //   { $match: { lending_date: { $gte: startDate } } },
  //   { $group: { _id: '$user_id', count: { $sum: 1 } } },
  //   { $sort: { count: -1 } },
  //   { $limit: 1 },
  //   { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } },
  //   { $unwind: '$user' },
  //   { $project: { username: '$user.username', count: 1 } },
  // ]);
  const query = 'select * from user_credentials order by login_count desc';
  const resp = await pool.query(query);
  // console.log("result->", resp.rows);
  const result = resp.rows[0];

  res.status(200).json(result);  
};

// Helper function to get the oldest book
const getOldestBook = async () => {
  return Book.findOne().sort({ publication_date: 1 });
};

// Helper function to get the newest book
const getNewestBook = async () => {
  return Book.findOne().sort({ publication_date: -1 });
};

// Helper function to get the most available book
const getMostAvailableBook = async () => {
  return Book.findOne().sort({ available_copies: -1 });
};

// get total users
const getTotalUser = async (req, res) => {
  const query = 'select count(*) from user_credentials';
  const resp = await pool.query(query);
  console.log("result->", resp.rows);
  const result = resp.rows[0];
  res.status(200).json(result);
}

module.exports = {
  getLibraryStatistics,
  getMostActiveUser,
  getTotalUser,
};
