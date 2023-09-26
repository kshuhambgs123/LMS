// BookRoute.js
const express = require('express');
const router = express.Router();
const { Book } = require('../models/book');
const bookCont = require('../controllers/books'); // Replace with the correct path
const bookCopy = require('../controllers/copies'); // Replace with the correct path

/* ------------------ BOOK ROUTES BELOW FOR GET , GET BY ID , POST , UPDATE BY ID , DELETE BY ID */

// 1) GET all books - GET
router.get('/', bookCont.getAllBooks);

// 2) Define the route for getting a book by ID - GET
router.get('/:id', bookCont.getBookById);

// 3) Insert a  book - POST
router.post('/', bookCont.addBook);

// 4) DELETE a book by id - DELETE
router.delete('/:id', bookCont.deleteBook);

// 5) Update a book by id - PUT
router.put('/:id',bookCont.updateBookById);


// Add more routes for CRUD operations --------- FOR Multiple Copes of A Book -----------------
// 1) GET :  all bookcopy
// router.get('/copies', bookCopy.getAllBookCopy);

// 2) Get : Define the route for getting a bookcopy by copy_id
router.get('/copies/:id', bookCopy.getBookCopyById);

// 3) Post : Insert Bookcopy
router.post('/copies', bookCopy.addCopies);

// 4) DELETE : bookcopy by copy_id
router.delete('/copies/:id', bookCopy.deleteBookByCopyId);

module.exports = router;

