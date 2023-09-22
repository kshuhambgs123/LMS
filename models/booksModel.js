const mongoose = require("mongoose");

const bookSchema =new mongoose.Schema({
    bookname: {type: String, require: true},
    //name: {type: String, require: true},
    description: {type: String, require: true},
    author: {type: String, require: true},
    image: {type: String, require: true},
    price: {type: Number, require: true},
});
// MODEL CREATED
module.exports = new mongoose.model("books", bookSchema);
// module.exports = BookModel;