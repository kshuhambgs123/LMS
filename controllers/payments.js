const Pool = require('pg').Pool;

const pool = new Pool({
    dialect: 'postgres', // Use the PostgreSQL dialect
    host: 'localhost', // Your database host
    username: 'shubhamkumar', // Your database username
    password: 'shubham123', // Your database password
    database: 'shubhamkumar', // Your database name
    port:5432
});

// Controller function to create a new payment
const createPayment = async (req, res) => {
    try {
        const reqBody = req.body;
        const result = await pool.query(
            "INSERT INTO payments (amount, payment_date, book_id, users_id) VALUES ($1, $2, $3, $4)",
            [reqBody.amount, reqBody.payment_date, reqBody.book_id, reqBody.users_id]
        );
        res.status(201).json({ message: 'Payment created successfully.' });
    } 
    catch (error) {
        console.error('Error creating payment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function to fetch list of  payments
const getAllPayments = async (req, res) => {
    try {
        const query = 'SELECT * FROM payments';
        const { rows } = await pool.query(query);
        res.json(rows);
    }
    catch (error) {
        console.error('Error fetching payments:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function to fetch a payment by ID
const getPaymentById = async (req, res) => {
    const paymentId = parseInt(req.params.id);

    try {
        const query = 'SELECT * FROM payments WHERE paymentid = $1';
        const values = [paymentId];
        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Payment not found' });
        }

        res.status(200).json(result.rows[0]);
    } 
    catch (error) {
        console.error('Error fetching payment by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function to update a payment by ID
const updatePaymentById = async (req, res) => {
    const paymentId = parseInt(req.params.id);
    const { amount, payment_date, book_id, users_id } = req.body;

    try {
        const query = 'UPDATE payments SET amount = $1, payment_date = $2, book_id = $3, users_id = $4 WHERE paymentid = $5';
        const values = [amount, payment_date, book_id, users_id, paymentId];
        await pool.query(query, values);

        res.status(200).json({ message: 'Payment updated successfully' });
    } catch (error) {
        console.error('Error updating payment by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function to delete a payment by ID
const deletePaymentById = async (req, res) => {
    const paymentId = parseInt(req.params.id);

    try {
        const query = 'DELETE FROM payments WHERE paymentid = $1';
        const values = [paymentId];
        await pool.query(query, values);

        res.json({ message: 'Payment deleted successfully' });
    } 
    catch (error) {
        console.error('Error deleting payment by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createPayment,
    getAllPayments,
    getPaymentById,
    updatePaymentById,
    deletePaymentById,
};
