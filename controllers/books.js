// const Book = require('../models/book');
const Pool = require('pg').Pool;
const pool = new Pool({
  dialect: 'postgres', // Use the PostgreSQL dialect
  host: 'localhost', // Your database host
  username: 'shubhamkumar', // Your database username
  password: 'shubham123', // Your database password
  database: 'shubhamkumar', // Your database name
  port:5432
});

// Controller function to fetch  a list of book
const getAllBooks = async (req, res) => {
    try {
      const query = 'SELECT * FROM books';
      const { rows } = await pool.query(query);
      
      // Check if there are no books
    if (!rows || rows.length === 0) {
        return res.status(404).json({ message: 'No books found' });
    }
      res.json(rows);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// Controller function to get a book by ID
const getBookById = async (req, res) => {
  const bookId = parseInt(req.params.id); // Extract the book ID from the request parameters

  try {
    // Query the database to get the book by ID
    const query = 'SELECT * FROM books WHERE id = $1';
    const values = [bookId];
    const result = await pool.query(query, values);
    
    if (result.rows.length === 0) {
      // If no book with the specified ID is found, return a 404 response
      return res.status(404).json({ error: 'Book not found' });
    }

    // If a book with the specified ID is found, return it as JSON
    res.status(200).json(result.rows[0]);
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error('Error fetching book by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Controller function to Insert a book 
const addBook = async (req,res) =>{
    try{
        // console.log(reqBody.body);
        const reqBody = req.body;
        const result  = await pool.query(
            "insert into books (title, author, isbn, subject, publication_date) values($1, $2, $3, $4, $5)", [reqBody.title, reqBody.author, reqBody.isbn, reqBody.subject, reqBody.publication_date], (error,results)=>{
                if(error) throw error; 
                res.status(201).send("book created successfully.")
            }
        );
    }catch (error) {
      console.error('Error creating data:', error);
      return error;
    }
}



// Controller function to delete a book by ID
const deleteBook = async (req, res) => {
    const bookId = req.params.id;
  
    try {
      const client = await pool.connect();
      await client.query('BEGIN'); // Start a transaction
  
      // Check if the book exists
      const bookExistsQuery = 'SELECT * FROM books WHERE id = $1';
      const bookExistsResult = await client.query(bookExistsQuery, [bookId]);
  
      if (bookExistsResult.rows.length === 0) {
        await client.query('ROLLBACK'); // Rollback the transaction
        return res.status(404).json({ error: 'Book not found' });
      }
  
      // Delete the book 
      const deleteQuery = 'DELETE FROM books WHERE id = $1';
      await client.query(deleteQuery, [bookId]);
  
      await client.query('COMMIT'); // Commit the transaction
      res.json({ message: 'Book deleted successfully' });
    } catch (error) {
      console.error('Error deleting book:', error);
      res.status(500).json({ error: 'Internal server error' });
    //  } finally {
    //   client.release(); // Release the client back to the pool
     }
  };


// Controller function to update a book by ID
  const updateBookById = async (req, res) => {
  const bookId = req.params.id; // Extract the book ID from the request parameters
  const { title, author, isbn, subject, publication_date} = req.body; // Assuming you're sending the updated book data in the request body

  try {
    // Check if the book with the specified ID exists
    const checkQuery = 'SELECT * FROM books WHERE id = $1';
    const checkValues = [bookId];
    const checkResult = await pool.query(checkQuery, checkValues);

    if (checkResult.rows.length === 0) {
      // If no book with the specified ID is found, return a 404 response
      return res.status(404).json({ error: 'Book not found' });
    }

    // Update the book in the database
    const updateQuery = 'UPDATE books SET title = $1, author = $2, isbn = $3, subject = $4, publication_date = $5 WHERE id = $6';
    const updateValues = [title, author, isbn, subject, publication_date, bookId];
    await pool.query(updateQuery, updateValues);

    res.status(200).json({ message: 'Book updated successfully' });
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error('Error updating book by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports={
    getAllBooks,
    addBook,
    getBookById,
    deleteBook,
    updateBookById
}