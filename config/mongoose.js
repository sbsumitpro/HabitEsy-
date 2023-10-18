const mongoose = require("mongoose");
require("dotenv").config()

mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;

db.on("error", console.log.bind(console, "Error connecting to DB!"));

db.once("open",()=>{
    console.log("<=== Connected to MongoDb ===>>")
})