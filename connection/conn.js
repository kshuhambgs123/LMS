const mongoose = require("mongoose");
mongoose
.connect(
    "mongodb+srv://Shubham123:Shubham123@cluster0.w0cgnyj.mongodb.net/crudop?retryWrites=true&w=majority&appName=AtlasApp"
    )
    .then(()=>console.log("Connected"));