const {Client} = require('pg');

const client = new Client({
    host: "localhost",
    user: "shubhamkumar",
    port: 5432,
    password: "shubham123",
    database: "shubhamkumar"
})

client.connect()
.then(() => {
    console.log('Connected to PostgreSQL database');
})
.catch(err => {
    console.error('Error connecting to PostgreSQL database', err);
});
