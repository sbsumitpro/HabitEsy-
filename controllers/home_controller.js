const mongoose = require("mongoose");
const Habbit = require("../models/habbit");
const habbitStatuses = require("../models/habbit_status");
const ObjectId = mongoose.Types.ObjectId;

module.exports.home= async(req,res)=>{
    habbits = await Habbit.find();
    return res.render("index",{
        title:"Habitesy",
        habbits:habbits
})}

module.exports.create = async(req,res)=>{
    try{
        // adding new habbit to database
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
        // Deleting the selected habbit from habbit collection
        await Habbit.deleteOne({_id:req.query.id});
        // Deleting all the status associated with a habbit
        await habbitStatuses.deleteMany({habbit:req.query.id});
        console.log("Habbit deleted successfully");
        res.redirect("back");
    }catch(error){
        console.log("Error", err);
    }

}

module.exports.toggleStatus = async(req,res)=>{
    try{
        const {date, habbit_id, stat} = req.body
        // if the status is the default one then we are not storing that data in the database, hence all those data is deleted for memory optimization
        if(stat==0){
            await habbitStatuses.deleteOne({habbit:habbit_id, date:date});
            return res.status(200).json({
                message:"success",
                updated:true
            })
        }
        // Creating/ Updating the status value (0,1,2) in the database 
        let habbitStatus = await habbitStatuses.findOne({habbit:habbit_id, date:date})
        if (habbitStatus){
            habbitStatus.stat = stat;
            habbitStatus.save();

        }else{
            await habbitStatuses.create({
                habbit:new ObjectId(habbit_id),
                date:date,
                stat:stat
             })
        }
        return res.status(200).json({
            message:"success",
            updated:true
        })

    }catch(err){
        console.log("----Error in toggling the status");
    }
}
// This is for getting all the status details associated with  date and habbit to render the homepage
module.exports.getAllStatus = async(req,res)=>{
    try{
        const {habbit_id} = req.params;
        const data = await habbitStatuses.find({habbit:habbit_id}).select(["date","stat","-_id"])
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

// This is used to get the completion streak count and render it in the homepage
module.exports.getStatCount = async(req,res)=>{
    try{
        const {habbit_id} = req.params;
        const data = await habbitStatuses.find({habbit:habbit_id, stat:1});
        return res.status(200).json({success:true, data:data.length})
    }catch (err){
        console.log("Error in getting completed status count", err)
    }
}