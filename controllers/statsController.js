// statsController.js
const { Pool } = require('pg');

const pool = new Pool({
    dialect: 'postgres',
    host: 'localhost',
    username: 'shubhamkumar',
    password: 'shubham123',
    database: 'shubhamkumar',
    port: 5432,
});

// Helper function to get the highest lent book
const getHighestLentBook = async (req,res) => {
    // we can use select max(lent_count) from books
    const query = 'select * from books order by lent_count desc';
    const resp = await pool.query(query);
    const result = resp.rows[0];
    res.status(200).json(result);
};

// Helper function to get the most active user
const getMostActiveUser = async (req,res) => {
    const query = 'select * from user_credentials order by login_count desc';
    const resp = await pool.query(query);
    const result = resp.rows[0];
    res.status(200).json(result);  
};

// Helper function to get the oldest book
const getOldestBook = async (req, res) => {
    const query = 'select * from books order by publication_date asc';
    const resp = await pool.query(query);
    const result = resp.rows[0];
    res.status(200).json(result);
};

// Helper function to get the newest book
const getNewestBook = async (req,res) => {
    const query = 'select * from books order by publication_date desc';
    const resp = await pool.query(query);
    const result = resp.rows[0];
    res.status(200).json(result);
};

// Helper function to get the most available book
const getMostAvailableBook = async (req, res) => {
    const query = 'select * from books order by copies_available desc';
    const resp = await pool.query(query);
    const result = resp.rows[0];
    res.status(200).json(result);
};

// Helper function to get get total users
const getTotalUser = async (req, res) => {
    const query = 'select count(*) from user_credentials';
    const resp = await pool.query(query);
    const result = resp.rows[0];
    res.status(200).json(result);
}

// Helper function to get total book
const getTotalBook = async (req, res)=>{
    const query = 'select sum(copies_available) from books';
    const resp = await pool.query(query);
    const result = resp.rows[0];
    res.status(200).json(result);
}

// Helper function to get total lent book
const getTotalLentBook = async (req, res)=>{
    const query = 'select sum(lent_count) from books';
    const resp = await pool.query(query);
    const result = resp.rows[0];
    res.status(200).json(result);
}

module.exports = {
    getMostActiveUser,
    getTotalUser,
    getHighestLentBook,
    getOldestBook,
    getNewestBook,
    getMostAvailableBook,
    getTotalBook,
    getTotalLentBook
};
