const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/Habbit_Tracker");

const db = mongoose.connection;

db.on("error", console.log.bind(console, "Error connecting to DB!"));

db.once("open",()=>{
    console.log("<=== Connected to MongoDb ===>>")
})