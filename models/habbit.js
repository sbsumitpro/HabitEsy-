const mongoose = require("mongoose");

const habbitSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    time:{
        type:String,
    },
    goal:{
        type:Number,
        required:true
    }
})

const Habbit = mongoose.model("Habbit", habbitSchema);
module.exports = Habbit