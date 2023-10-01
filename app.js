const express = require("express");
const { DataTypes, Sequelize } = require('sequelize');

const sequelize = new Sequelize('shubhamkumar', 'shubhamkumar', 'shubham123', {
  host: 'localhost',
  dialect: 'postgres',
});
const app = express();
require("dotenv").config();
const bodyParser = require('body-parser'); 
const authenticate = require('./middleware/authenticate');

const usercredRouter = require('./routes/user_authentication');
const usersRouter = require('./routes/user');
const booksRouter = require('./routes/book');
const recordRouter = require('./routes/record');
const paymentRouter = require('./routes/payment');
const statsRouter = require('./routes/statistics');

app.use(bodyParser.urlencoded({extended:true})); // MIDDLEWARE FN.
app.use(bodyParser.json());

app.use('/profile',usercredRouter);
app.use('/users',authenticate.authenticateToken, usersRouter);
app.use('/books', authenticate.authenticateToken , booksRouter);
app.use('/records',authenticate.authenticateToken, recordRouter);
app.use('/payments', authenticate.authenticateToken, paymentRouter);
app.use('/stats', authenticate.authenticateToken, statsRouter);
sequelize.sync();

const port = 1000;
const server = app.listen(port, () => {
    console.log("SERVER STARTED SUCCESSFULLY");
});

