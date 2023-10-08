const mongoose = require("mongoose");

const habbitSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    time:{
        type:String,
    },
    goal:{
        type:Number,
        required:true
    },
    stats:{
        date:Date,
        status:{
            type:String,
            required:true,
            enum:["Done","NotDone","None"],
            default:"None"
        }
    }
})

const Habbit = mongoose.model("Habbit", habbitSchema);
module.exports = Habbit