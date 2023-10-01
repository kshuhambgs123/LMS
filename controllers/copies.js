const Pool = require('pg').Pool;

const pool = new Pool({
    dialect: 'postgres', // Use the PostgreSQL dialect
    host: 'localhost', // Your database host
    username: 'shubhamkumar', // Your database username
    password: 'shubham123', // Your database password
    database: 'shubhamkumar', // Your database name
    port:5432
});

// Controller function to get a bookcopy by copy_id
const getBookCopyById = async (req, res) => {
    const bookId = parseInt(req.params.id); // Extract the copy_id from the request parameters
  
    try {
        // Query the database to get the bookcopy by copy_id
        const query = 'SELECT * FROM book_copies WHERE copy_id = $1';
        const values = [bookId];
        const result = await pool.query(query, values);
        
        if (result.rows.length === 0) {
            // If no book with the specified ID is found, return a 404 response
            return res.status(404).json({ error: 'Book Copy not found' });
        }
    
        // If a book with the specified ID is found, return it as JSON
        res.status(200).json(result.rows);
    } 
    catch (error) {
        // Handle any errors that occur during the database query
        console.error('Error fetching bookcopy by book_id:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
  };
  
// Controller function to Insert a book_copy for particular book_id available
const addCopies = async (req,res) =>{
    try{
        const bookId = parseInt(req.body.book_id);
        const copies_avail = 'select copies_available from books where id=$1';
        const values = [bookId];
        const resp = await pool.query(copies_avail,values);
        const copies_available = resp.rows[0].copies_available
        const query = 'UPDATE books SET copies_available =  $1 WHERE id=$2';
        const new_values = [copies_available+1,bookId];
        const respp = await pool.query(query,new_values);

        console.log("updated count");
        const reqBody = req.body;
        const result  = await pool.query(
            "insert into book_copies (book_id) values($1)", [reqBody.book_id], (error,results)=>{
                if(error) throw error; 
                res.status(201).send("book_copies created successfully.")
            }
        );
    }
    catch (error) {
      console.error('Error creating data:', error);
      return error;
    }
};


// Controller function to delete a bookcopy by copy_id and update copies_availavle count for particular book_id in books table
const deleteBookByCopyId = async (req, res) => {
    const bookId = req.params.id;
  
    try {
        // const bookid = parseInt(req.body.book_id);
        const new_query = 'select book_id from book_copies where copy_id=$1';
        const new_value = [bookId];
        const response = await pool.query(new_query,new_value);
        const book_id = response.rows[0].book_id;
        const copies_avail = 'select copies_available from books where id=$1';
        const values = [book_id];
        const resp = await pool.query(copies_avail,values);
        const copies_available = resp.rows[0].copies_available
        const query = 'UPDATE books SET copies_available =  $1 WHERE id=$2';
        const new_values = [copies_available-1,book_id];
        const respp = await pool.query(query,new_values);
        
        console.log("updated count");

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
    } 
    catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ error: 'Internal server error' });
     }
  };

module.exports={
    // getAllBookCopy,
    addCopies,
    getBookCopyById,
    deleteBookByCopyId
};