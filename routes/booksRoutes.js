const router = require("express").Router(); // Routing in backend

//const { Router } = require("express");
// come out of connection then go into models/bookModel
const bookModel = require("../models/booksModel");

// post or fetch data with help of app/router


// POST REQ
// post req means crud op create(post create karna)
// async wait gives each time result
router.post("/add", async(req, res) => {
    try {
       // const data = req.body; // any data posted with frotend(i.e from console take data with help of req.body)
        const newBook = new bookModel(req.body); // we create a new book model
        // send data in db and it will be stored (use promises for any error or not as response after save data)
        await newBook.save().then(() => {
            res.status(200).json({ message: " Book Added Successfully" });
         });
    } catch(error){
        console.log(error);
    }
});

//GET REQUEST - to fetch available books from db
router.get("/getBooks", async(req,res)=> {
    let books;
    try{
        books = await bookModel.find();
        res.status(200).json({ books });
    } catch (error) {
        console.log(error);
    }
});

// GET REQ WITH ID
router.get("getBooks/:id", async(req,res)=>
{
    let book;
    const id = req.params.id;
    try{
        book = await bookModel.findById(id);
        res.status(200).json({book});
    } catch(error){
        console.log(error);
    }
});

// export the router
module.exports = router;