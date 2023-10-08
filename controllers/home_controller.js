const Habbit = require("../models/habbit");

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
    }catch(err){
        console.log("----Error", err);
    }
}