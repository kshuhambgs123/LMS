const express = require('express');
const router = express.Router();
const bookCopy = require('../controllers/copies'); // Replace with the correct path
//const { getAllBooks } = require('../controllers/bookController');
// GET all books
router.get('/copies', bookCopy.getAllBookCopy);

// router.get('/',bookCopy.getAllBooks);

// Define the route for getting a book by ID
router.get('/copies/:id', bookCopy.getBookCopyById);

router.post('/copies', bookCopy.addCopies);

// DELETE /books/:id
router.delete('/copies/:id', bookCopy.deleteBookByCopyId);

// Add more routes as needed
// router.put('/:id',bookCopy.updateBookById);

// Add more routes for CRUD operations





// Define routes for CRUD operations on books
// router.get('/', bookController.getAllBooks);
// router.get('/:id', bookController.getBookById);
// router.post('/', bookController.createBook);
// router.put('/:id', bookController.updateBook);
// router.delete('/:id', bookController.deleteBook);


const { Book } = require('../models/book');
const bookCont = require('../controllers/books'); // Replace with the correct path
//const { getAllBooks } = require('../controllers/bookController');
// GET all books
router.get('/', bookCont.getAllBooks);

// router.get('/',bookCont.getAllBooks);

// Define the route for getting a book by ID
router.get('/:id', bookCont.getBookById);

router.post('/', bookCont.addBook);

// DELETE /books/:id
router.delete('/:id', bookCont.deleteBook);

// Add more routes as needed
router.put('/:id',bookCont.updateBookById);

// Add more routes for CRUD operations

module.exports = router;


//module.exports = router;
