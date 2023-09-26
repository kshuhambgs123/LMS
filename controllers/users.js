const { Pool } = require('pg');

const pool = new Pool({
    dialect: 'postgres',
    host: 'localhost',
    username: 'shubhamkumar',
    password: 'shubham123',
    database: 'shubhamkumar',
    port: 5432,
});

// Controller function to get all users
const getAllUsers = async (req, res) => {
    try {
        const query = 'SELECT * FROM users';
        const { rows } = await pool.query(query);
        res.json(rows);
    } 
    catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function to create a new user
const createUser = async (req,res) =>{
    try{
        // console.log(reqBody.body);
        const reqBody = req.body;
        const result  = await pool.query(
            "insert into users (name, category, registration_date, user_id) values($1, $2, $3, $4)", [reqBody.name, reqBody.category, reqBody.registration_date, reqBody.user_id], (error,results)=>{
                if(error)throw error;
                res.status(201).send("user created successfully.")
            }
        );
    }
    catch (error) {
        console.error('Error creating data:', error);
        return error;
    }
};

// Controller function to get a user by their ID
const getUserById = async (req, res) => {
    const userId = req.params.id;

    try {
        const query = 'SELECT * FROM users WHERE id = $1';
        const values = [userId];
        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
        }

        res.json(result.rows[0]);
    }
    catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function to update a user by their ID
const updateUserById = async (req, res) => {
    const userId = req.params.id;
    const { name, category,registration_date, id} = req.body;

    try {
        const checkQuery = 'SELECT * FROM users WHERE id = $1';
        const checkValues = [userId];
        const checkResult = await pool.query(checkQuery, checkValues);

        if (checkResult.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
        }

        const updateQuery = 'UPDATE users SET name = $1, category = $2, registration_date = $3 WHERE id = $4';
        const updateValues = [name, category,registration_date, userId];
        await pool.query(updateQuery, updateValues);

        res.json({ message: 'User updated successfully' });
    } 
    catch (error) {
        console.error('Error updating user by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to delete a user by their ID
const deleteUserById = async (req, res) => {
    const userId = req.params.id;

    try {
        const checkQuery = 'SELECT * FROM users WHERE id = $1';
        const checkValues = [userId];
        const checkResult = await pool.query(checkQuery, checkValues);

        if (checkResult.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
        }

        const deleteQuery = 'DELETE FROM users WHERE id = $1';
        const deleteValues = [userId];
        await pool.query(deleteQuery, deleteValues);

        res.json({ message: 'User deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting user by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    updateUserById,
    deleteUserById,
};
