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
const getHighestLentBook = async (req,res) => {
  // we can use select max(lent_count) from books
  const query = 'select * from books order by lent_count desc';
  const resp = await pool.query(query);
  // console.log("result->", resp.rows);
  const result = resp.rows[0];

  res.status(200).json(result);
};

// Helper function to get the most active user
const getMostActiveUser = async (req,res) => {
  const query = 'select * from user_credentials order by login_count desc';
  const resp = await pool.query(query);
  // console.log("result->", resp.rows);
  const result = resp.rows[0];

  res.status(200).json(result);  
};

// Helper function to get the oldest book
const getOldestBook = async (req, res) => {
  const query = 'select * from books order by publication_date asc';
  const resp = await pool.query(query);
  // console.log("result->", resp.rows);
  const result = resp.rows[0];

  res.status(200).json(result);
};

// Helper function to get the newest book
const getNewestBook = async (req,res) => {
  const query = 'select * from books order by publication_date desc';
  const resp = await pool.query(query);
  // console.log("result->", resp.rows);
  const result = resp.rows[0];

  res.status(200).json(result);
};

// Helper function to get the most available book
const getMostAvailableBook = async (req, res) => {
  const query = 'select * from books order by copies_available desc';
  const resp = await pool.query(query);
  // console.log("result->", resp.rows);
  const result = resp.rows[0];

  res.status(200).json(result);
};

// get total users
const getTotalUser = async (req, res) => {
  const query = 'select count(*) from user_credentials';
  const resp = await pool.query(query);
  console.log("result->", resp.rows);
  const result = resp.rows[0];
  res.status(200).json(result);
}

const getTotalBook = async (req, res)=>{
  const query = 'select sum(copies_available) from books';
  const resp = await pool.query(query);
  console.log("result->", resp.rows);
  const result = resp.rows[0];
  res.status(200).json(result);
}

module.exports = {
  getLibraryStatistics,
  getMostActiveUser,
  getTotalUser,
  getHighestLentBook,
  getOldestBook,
  getNewestBook,
  getMostAvailableBook,
  getTotalBook,
};
