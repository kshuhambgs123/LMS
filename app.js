
const express = require("express");
// const db1 = require('./config/database')
// const db = require('./databasepg')
const app = express();
const bodyParser = require('body-parser'); 
// const bookController = require('./controllers/books.js')

const booksRouter = require('./routes/book')
const usersRouter = require('./routes/user')

//const bookRoute = require("./routes/book");
//const db = require('./databasepg');

// const { verifyToken } = require('./middleware/auth'); // Import the verifyToken middleware

app.use(bodyParser.urlencoded({extended:true})) // MIDDLEWARE FN.
app.use(bodyParser.json())

// GET REQ USER VISIT Homepage user get json response equal to info
// app.get('/',(req,res) => {
//     res.json({
//         info :'Node.js Express & Postgres CRUD REST API'
//     })
// })
// app.get('/books', async (req, res)=>{
//     try{
//         const result = await bookController.getAllBooks();
//         res.status(200).json(result);
//     }
//     catch(error){
//         throw error;
//     }
// })
// Use your book router
// app.use(booksRouter);
// app.use('/',booksRouter);
app.use('/books', booksRouter);
app.use('/users',usersRouter);
// app.post('/books', bookController.addBook);
// app.get('/user1',db1.getUser1)
// app.post('/user1',async (req, res) => {
//     const { title, completed } = req.body;
//     try {
//       const newTodo = await todosController.createTodo(title, completed);
//       res.json(newTodo);
//     } catch (error) {
//       console.error(error.message);
//     }
//   })
// app.delete('/user1/:id',db1.deleteUser1)
// app.put('/user1/:id',db1.updateUser1)



// Connection created
//require("./databasepg");

// create route 
// app.get("/api/v1",(req,res)=>{
//     res.send("Hello");
// });


//app.post('/books',db.getBooks)

/*
//Example protected route that requires authentication
app.get('/protected', verifyToken, (req, res) => {
    // If the middleware passed, the user is authenticated
    // You can access user information via req.user here
    res.json({ message: 'Authenticated route', user: req.user });
  });
*/

//app.use(express.json());
// app.use("/api/v1", bookRoute);


// Define routes
//app.use('/books', verifyToken, require('./routes/book'));
// app.use('/users', verifyToken, require('./routes/user'));
// app.use('/records', verifyToken, require('./routes/record'));
// app.use('/payments', verifyToken, require('./routes/payment'));




/*
// route on sservices page using http://localhost:1000/services   run npx nodemon app.js
app.get("/services",(req,res)=>{
    res.send("Services Page");
});
*/

const port = 1000;
const server = app.listen(port, () => {
    console.log("SERVER STARTED SUCCESSFULLY");
});

