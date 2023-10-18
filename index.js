const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const PORT = 5000
const db = require("./config/mongoose");

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.use(express.static("./assets"));

// Setup view engine
app.set("view engine", "ejs");
app.set("views","./views");

//setup routes
app.use("/", require("./routes/index_route"));

app.listen(PORT,(err)=>{
    console.log("Server started and listening to port", PORT);
})