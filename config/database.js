// config/database.js

const { response } = require('express');

const Pool = require('pg').Pool;
const pool = new Pool({
  dialect: 'postgres', // Use the PostgreSQL dialect
  host: 'localhost', // Your database host
  username: 'shubhamkumar', // Your database username
  password: 'shubham123', // Your database password
  database: 'shubhamkumar', // Your database name
  port:5432
});

module.export={
    pool
}
// crud operation with postgresql database

// const getUser1 = (req,res) => {
//     pool.query("SELECT * FROM user1 ORDER BY id DESC",(err,results) => {
//         if(err){
//             throw err;
//         }
//         res.status(200).json(results.rows) // 
//     })
// }

// const createUser1 = (req,res) => {
//     // const {name,email} = req
//     // console.log("name, email->",(name,email));
//     res.status(201).send(req)

//     // pool.query("INSERT INTO user1 (name,email) VALUES($1,$2) RETURNING *", [name, email],(err,results) => {
//     //     if(err){
//     //         throw err;
//     //     }
//     //     res.status(201).send(`User added with ID: ${results.rows[0].id}`)
//     // })
// } 


// const deleteUser1 = (req,res) => {
//     const id = parseInt(req.params.id)


//     pool.query(`DELETE FROM user1 WHERE id = $1`,[id],(err,results) => {
//         if(err){
//             throw err;
//         }
//         res.status(200).send(`User deleted with ID: ${id}`)
//     })
// } 

// const updateUser1 = (req,res) => {
//     const id = parseInt(req.params.id)
//     const {name,email} = req.body

//     pool.query(`Update user1 SET name=$1,email=$2 WHERE id = $3`,[name,email,id],(err,results) => {
//         if(err){
//             throw err;
//         }
//         res.status(200).send(`User modified with id: ${id}`)
//     })
// } 

// module.exports = {Pool, getUser1, createUser1, deleteUser1, updateUser1}; // export method

// /*
// const {Client} = require('pg');

// const client = new Client({
//     host: "localhost",
//     user: "shubhamkumar",
//     port: 5432,
//     password: "shubham123",
//     database: "shubhamkumar"
// })

// client.connect();

// client.query(`Select * from book`, (err,res)=>{
// if(!err){
//     console.log(res.rows);
// }else{
//     console.log(err.message);
// }
// client.end();
// })
// */