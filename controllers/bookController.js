const Book = require('../models/book');

// Get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new book
const createBook = async (req, res) => {
  try {
    const newBook = new Book(req.body);
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data provided' });
  }
};

// Other CRUD operations (getBookById, updateBook, deleteBook) can be implemented similarly
// Get a book by ID
const getBookById = async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
      res.json(book);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Update a book by ID
  const updateBook = async (req, res) => {
    try {
      const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!updatedBook) {
        return res.status(404).json({ error: 'Book not found' });
      }
      res.json(updatedBook);
    } catch (err) {
      res.status(400).json({ error: 'Invalid data provided' });
    }
  };
  
  // Delete a book by ID (soft delete)
  const deleteBook = async (req, res) => {
    try {
      const deletedBook = await Book.findByIdAndRemove(req.params.id);
      if (!deletedBook) {
        return res.status(404).json({ error: 'Book not found' });
      }
      res.json(deletedBook);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Remove a book by ID (permanent delete)
  const removeBook = async (req, res) => {
    try {
      const removedBook = await Book.findByIdAndDelete(req.params.id);
      if (!removedBook) {
        return res.status(404).json({ error: 'Book not found' });
      }
      res.json(removedBook);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  module.exports = {
    getAllBooks,
    createBook,
    getBookById,
    updateBook,
    deleteBook,
    removeBook,
  };
  