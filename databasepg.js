const {Client} = require('pg');

const client = new Client({
    host: "localhost",
    user: "shubhamkumar",
    port: 5432,
    password: "shubham123",
    database: "shubhamkumar"
})

client.connect();

client.query(`Select * from book`, (err,res)=>{
if(!err){
    console.log(res.rows);
}else{
    console.log(err.message);
}
client.end();
})