const Book_Copy = require('../models/book_copies');
const Pool = require('pg').Pool;
const pool = new Pool({
  dialect: 'postgres', // Use the PostgreSQL dialect
  host: 'localhost', // Your database host
  username: 'shubhamkumar', // Your database username
  password: 'shubham123', // Your database password
  database: 'shubhamkumar', // Your database name
  port:5432
});


// Controller function to fetch  a list of bookcopy
const getAllBookCopy = async (req, res) => {
    try {
      const query = 'SELECT * FROM book_copies';
      const { rows } = await pool.query(query);
      
      // Check if there are no books
    if (!rows || rows.length === 0) {
        return res.status(404).json({ message: 'No book Copy found' });
    }
      res.json(rows);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


// Controller function to get a bookcopy by book_id
const getBookCopyById = async (req, res) => {
    const bookId = parseInt(req.params.id); // Extract the book ID from the request parameters
  
    try {
      // Query the database to get the book by ID
      const query = 'SELECT * FROM book_copies WHERE book_id = $1';
      const values = [bookId];
      const result = await pool.query(query, values);
      
      if (result.rows.length === 0) {
        // If no book with the specified ID is found, return a 404 response
        return res.status(404).json({ error: 'Book Copy not found' });
      }
  
      // If a book with the specified ID is found, return it as JSON
      res.status(200).json(result.rows[0]);
    } catch (error) {
      // Handle any errors that occur during the database query
      console.error('Error fetching bookcopy by book_id:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  


// Controller function to Insert a book_copy
const addCopies = async (req,res) =>{
    try{
        // console.log(reqBody.body);
        const reqBody = req.body;
        const result  = await pool.query(
            "insert into book_copies (isbn, book_id) values($1, $2)", [reqBody.isbn, reqBody.book_id], (error,results)=>{
                if(error) throw error; 
                res.status(201).send("book_copies created successfully.")
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
      const bookExistsQuery = 'SELECT * FROM book_copies WHERE copy_id = $1';
      const bookExistsResult = await client.query(bookExistsQuery, [bookId]);
  
      if (bookExistsResult.rows.length === 0) {
        await client.query('ROLLBACK'); // Rollback the transaction
        return res.status(404).json({ error: 'Book not found' });
      }
  
      // Delete the book 
      const deleteQuery = 'DELETE FROM book_copies WHERE copy_id = $1';
      await client.query(deleteQuery, [bookId]);
  
      await client.query('COMMIT'); // Commit the transaction
      res.json({ message: 'Book_Copy deleted successfully' });
    } catch (error) {
      console.error('Error deleting book:', error);
      res.status(500).json({ error: 'Internal server error' });
    //  } finally {
    //   client.release(); // Release the client back to the pool
     }
  };


module.exports={
    getAllBookCopy,
    addCopies,
    getBookCopyById,
    deleteBook
}