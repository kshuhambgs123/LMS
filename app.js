
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const bookRoute = require("./routes/booksRoutes");

const { verifyToken } = require('./middleware/auth'); // Import the verifyToken middleware

// Connection created
require("./connection/conn");

// create route 
// app.get("/api/v1",(req,res)=>{
//     res.send("Hello");
// });

/*
//Example protected route that requires authentication
app.get('/protected', verifyToken, (req, res) => {
    // If the middleware passed, the user is authenticated
    // You can access user information via req.user here
    res.json({ message: 'Authenticated route', user: req.user });
  });
*/

app.use(express.json());
app.use("/api/v1", bookRoute);
/*
// Define routes
app.use('/books', verifyToken, require('./routes/book'));
app.use('/users', verifyToken, require('./routes/user'));
app.use('/records', verifyToken, require('./routes/record'));
app.use('/payments', verifyToken, require('./routes/payment'));
*/



/*
// route on sservices page using http://localhost:1000/services   run npx nodemon app.js
app.get("/services",(req,res)=>{
    res.send("Services Page");
});
*/

app.listen(1000, () => {
    console.log("SERVER STARTED SUCCESSFULLY");
});

