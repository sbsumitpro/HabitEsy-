const mongoose = require("mongoose");
const Habbit = require("../models/habbit");
const habbitStatuses = require("../models/habbit_status");
const ObjectId = mongoose.Types.ObjectId;

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
        let habbitStatus = await habbitStatuses.findOne({habbit:req.query.habbit_id, date:req.query.date})
        if (habbitStatus){
            habbitStatus.stat = req.query.stat;
            habbitStatus.save();

        }else{
            await habbitStatuses.create({
                habbit:new ObjectId(req.query.habbit_id),
                date:req.query.date,
                stat:req.query.stat
        
             })
        }
        // return res.status(200).json({
        //     message:"success",
        //     updated:true
        // })
        return res.redirect("back");


    }catch(err){
        console.log("----Error in toggling the status");
    }
}

module.exports.getAllStatus = async(req,res)=>{
    try{
        const {habbit_id} = req.params;
        // habbit_id = ObjectId(habbit_id)
        const data = await habbitStatuses.find({habbit:habbit_id}).select(["date","stat","-_id"])
        // console.log("datatype of date",typeof(data[0].date))
        resp = {}
        for (i=0; i<data.length;i++){
            let obj = data[i]
            resp[obj.date] = obj.stat
        }
        return res.status(200).json({ success: true, data: resp });
    }
    catch (err){ 
        console.log("Error in getting all status", err)
    }
}

module.exports.getStatCount = async(req,res)=>{
    try{
        const {habbit_id} = req.params;
        // habbit_id = ObjectId(habbit_id)
        const data = await habbitStatuses.find({habbit:habbit_id, stat:1});
        console.log(data.length)
        return res.status(200).json({success:true, data:data.length})
    }catch (err){
        console.log("Error in getting completed status count", err)
    }
}