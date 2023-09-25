const express = require('express');
const router = express.Router();

// Define routes for CRUD operations on books
// router.get('/', bookController.getAllBooks);
// router.get('/:id', bookController.getBookById);
// router.post('/', bookController.createBook);
// router.put('/:id', bookController.updateBook);
// router.delete('/:id', bookController.deleteBook);


const { Bookcopy } = require('../models/book_copies');
const bookCont = require('../controllers/copies'); // Replace with the correct path
//const { getAllBooks } = require('../controllers/bookController');
// GET all books
router.get('/copies', bookCont.getAllBookCopy);

// router.get('/',bookCont.getAllBooks);

// Define the route for getting a book by ID
router.get('/copies/:id', bookCont.getBookCopyById);

router.post('/copies', bookCont.addCopies);

// DELETE /books/:id
router.delete('copies/:id', bookCont.deleteBook);

// Add more routes as needed
// router.put('/:id',bookCont.updateBookById);

// Add more routes for CRUD operations

module.exports = router;


//module.exports = router;
