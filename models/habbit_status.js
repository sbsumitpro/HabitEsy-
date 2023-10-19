const mongoose = require("mongoose");

const habbit_statusSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    habbit:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Habbit"
    },
    date:String,
    stat:Number
})

const habbitStatus = mongoose.model("habbitStatus", habbit_statusSchema);

module.exports = habbitStatus;