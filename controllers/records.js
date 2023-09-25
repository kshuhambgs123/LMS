const { Pool } = require('pg');
const pool = new Pool({
  dialect: 'postgres',
  host: 'localhost',
  username: 'shubhamkumar',
  password: 'shubham123',
  database: 'shubhamkumar',
  port: 5432,
});

// Controller function to fetch list of records
const getAllRecords = async (req, res) => {
  try {
    const query = `select * from records`;
    const { rows } = await pool.query(query);
    // console.log(rows);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching records:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to create/insert a new record
const createRecord = async (req,res) =>{
    try{
        // console.log(reqBody.body);
        const reqBody = req.body;
        console.log("reqbody",reqBody);
        const result  = await pool.query(
            "insert into records (issue_date, return_date, isbn, id) values($1, $2, $3, $4)", [reqBody.issue_date, reqBody.return_date, reqBody.isbn, reqBody.id], (error,results)=>{
              if (error) {
                if (error.constraint === "records_isbn_fkey") {
                  // Handle the foreign key constraint violation
                  res.status(400).send("The provided ISBN does not exist in the referenced table.");
                } else {
                  // Handle other errors
                  console.error('Error creating data:', error);
                  res.status(500).send("An error occurred while creating the record.");
                }
              } else {
                res.status(201).send("Record created successfully.");
              }
            }
          );
        } catch (error) {
          console.error('Error creating data:', error);
          res.status(500).send("Error occurred while creating the record.");
        }
}

// Controller function to fetch a record by its ID
const getRecordById = async (req, res) => {
  const recordId = req.params.id;
  try {
    const query = `
      SELECT
        records.recordId,
        records.issue_date,
        records.return_date,
        books.isbn,
        users.id
      FROM
        records
      INNER JOIN
        books ON records.isbn = books.isbn
      INNER JOIN
        users ON records.id = users.id
      WHERE
        records.recordId = $1
    `;
    const values = [recordId];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Record not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching record by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to update a record by its ID
const updateRecordById = async (req, res) => {
  const recordId = req.params.id;
  const { issue_date, return_date, isbn, id } = req.body;
  try {
    const checkQuery = 'SELECT * FROM records WHERE recordId = $1';
    const checkValues = [recordId];
    const checkResult = await pool.query(checkQuery, checkValues);

    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: 'Record not found' });
    }

    const updateQuery = `
      UPDATE
        records
      SET
        issue_date = $1,
        return_date = $2,
        isbn = $3,
        id = $4
      WHERE
        recordId = $5
    `;
    const updateValues = [issue_date, return_date, isbn, id, recordId];
    await pool.query(updateQuery, updateValues);

    res.json({ message: 'Record updated successfully' });
  } catch (error) {
    console.error('Error updating record by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to delete a record by its ID
const deleteRecordById = async (req, res) => {
  const recordId = req.params.id;

  try {
    const checkQuery = 'SELECT * FROM records WHERE recordId = $1';
    const checkValues = [recordId];
    const checkResult = await pool.query(checkQuery, checkValues);

    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: 'Record not found' });
    }

    const deleteQuery = 'DELETE FROM records WHERE recordId = $1';
    const deleteValues = [recordId];
    await pool.query(deleteQuery, deleteValues);

    res.json({ message: 'Record deleted successfully' });
} catch (error) {
console.error('Error deleting record by ID:', error);
res.status(500).json({ error: 'Internal server error' });
}
};

module.exports = {
getAllRecords,
createRecord,
getRecordById,
updateRecordById,
deleteRecordById,
};
