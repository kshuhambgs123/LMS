// config/database.js

const { response } = require('express');

const Pool = require('pg').Pool;
const pool = new Pool({
  dialect: 'postgres', // Use the PostgreSQL dialect
  host: 'localhost', // Your database host
  username: 'shubhamkumar', // Your database username
  password: 'shubham123', // Your database password
  database: 'shubhamkumar', // Your database name
  port:5432
});

module.export={
    pool
}
