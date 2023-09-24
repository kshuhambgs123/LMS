
const express = require("express");
// const db1 = require('./config/database')
// const db = require('./databasepg')
const app = express();
require("dotenv").config();
const bodyParser = require('body-parser'); 
const authenticate = require('./middleware/authenticate')
// const bookController = require('./controllers/books.js')

const booksRouter = require('./routes/book')
const usersRouter = require('./routes/user')
const recordRouter = require('./routes/record')
const paymentRouter = require('./routes/payment')
const usercredRouter = require('./routes/user_authentication')

app.use(bodyParser.urlencoded({extended:true})) // MIDDLEWARE FN.
app.use(bodyParser.json())

app.use('/books', authenticate.authenticateToken , booksRouter);
app.use('/users',authenticate.authenticateToken, usersRouter);
app.use('/records',authenticate.authenticateToken, recordRouter);
app.use('/payments', authenticate.authenticateToken, paymentRouter);
app.use('/profile',usercredRouter);


const port = 1000;
const server = app.listen(port, () => {
    console.log("SERVER STARTED SUCCESSFULLY");
});

