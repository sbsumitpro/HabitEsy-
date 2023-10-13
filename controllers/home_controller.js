const mongoose = require("mongoose");
const Habbit = require("../models/habbit");
const habbitStatus = require("../models/habbit_status");

module.exports.home= async(req,res)=>{
    habbits = await Habbit.find();
    return res.render("index",{
        title:"Home",
        habbits:habbits
})}

module.exports.create = async(req,res)=>{
    try{
        console.log("----t",req.body)
        const habbit = await Habbit.create({
            title:req.body.name,
            time:req.body.time,
            goal:req.body.goal
        })
        res.redirect("back");
    }catch(err){
        console.log("----Error", err);
    }
}

module.exports.destroyHabbit = async(req,res)=>{
    try{
        console.log(req.query)
        await Habbit.deleteOne({_id:req.query.id});
        console.log("Habbit deleted successfully");
        res.redirect("back");
    }catch(error){
        console.log("Error", err);
    }

}

module.exports.toggleStatus = async(req,res)=>{
    try{
        console.log("sdsd");
        console.log(req.query)
        // await habbitStatus.create({
        //     habbit:new mongoose.Types.ObjectId(req.query.habbit_id),
        //     date:req.query.date,
        //     stat:req.query.stat
        // })


    }catch(err){
        console.log("----Error", err);
    }
}