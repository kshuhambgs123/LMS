
const express = require("express");
// const db1 = require('./config/database')
// const db = require('./databasepg')
const app = express();
const bodyParser = require('body-parser'); 
// const bookController = require('./controllers/books.js')

const booksRouter = require('./routes/book')
const usersRouter = require('./routes/user')
const recordRouter = require('./routes/record')

app.use(bodyParser.urlencoded({extended:true})) // MIDDLEWARE FN.
app.use(bodyParser.json())

app.use('/books', booksRouter);
app.use('/users',usersRouter);
app.use('/records',recordRouter);





const port = 1000;
const server = app.listen(port, () => {
    console.log("SERVER STARTED SUCCESSFULLY");
});

