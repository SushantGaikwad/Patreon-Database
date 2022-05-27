const UserModel = require("../Models/user.model");
const postModel = require("../Models/post");
const mongoose = require("mongoose");

require("dotenv").config();



  async function makePost(request,response){

    try{
        const body = request.body;      
        const header = request.headers;
    
        let obj = {
            title : body.title,
            description : body.description,
            tags : body.tags,
            userId: mongoose.Types.ObjectId(header.userid),
            timestamp: new Date()
        }

        let res = await postModel.insertMany([obj]);

        response.status(200).json({
            status : "Success",
            message: "Posted Successfully",
            post : res
        })
    }catch(err){
        response.status(400).json({
            status: "Error"
        })

    }
 
   }


  async function getAllPost(request,response){
    try{
        let userId = request.headers.userid;
        userId = mongoose.Types.ObjectId(userId);

        let res = await postModel.find({userId:userId});
        console.log(res);
        response.status(200).json({
            status : "Success",
            posts : res
        })
    }catch(err){
        response.status(400).json({
            Status: "Error"
        })
    }
       
   }

   async function search(req,res){
        const search = req.query.q;
        const response = await UserModel.find({name: {$regex : search, $options: '$i'}});
        res.send(response);
   }



async function getAllusers(req,res){
    // res.send(req.query.q);
    try {
        let username = req.query.q
        console.log(username)
        // username = mongoos.name(username)
        res = await UserModel.find({name:username})
        console.log(res)
        response.status(200).json({
            Status: "success",
            posts: res
        })
    } catch (error) {
        response.status(400).json({
            Status: "Error"
        })
    }
}


module.exports = {
    makePost,
    getAllPost,
    getAllusers,
    search,
}