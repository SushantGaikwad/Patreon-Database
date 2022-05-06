const UserModel = require("../Models/user.model");
const TokenModel = require("../Models/token");
const EncryptDecrypt = require("../CommonLib/encrypt-decrypt");
const jwtService  = require("../CommonLib/jwtToken");

const postModel = require("../Models/post");
const mongoose = require("mongoose");
const { response } = require("express");


async function SignUp(request,response, next){
    
 try {
    let userDetails = request.body;

    let UserRes = await UserModel.findOne({email:userDetails.email});
    if(UserRes){
   
                response.json({
                    status: 201,
                    Message: "This Email Id is Already Present in our Database. Please try Different Email Id"
                })
        
    }else{

    let encryptPassword = EncryptDecrypt.encryptPassword(userDetails.password);
    userDetails.password = encryptPassword;
    userDetails.profilePic = "https://c8.patreon.com/2/200/73417037";
    let UserResponse = await UserModel.insertMany([userDetails]);
    delete userDetails.password;
    let JWTtoken = jwtService.GenerateToken(userDetails);

   await TokenModel.insertMany([{userId:UserResponse[0]._id, token:JWTtoken}]);

       response.status(200).json({
       status: 200,
       message: "Registration Successfull",
       token : JWTtoken
})
}
}catch (error) {
     console.log("This is Signup Error",request.body);
     response.status(500).json(error);
 }
 
}

async function signOut(req, res, next) {
    //remove token from DB
    const token = req.body.token;
    await TokenModel.deleteOne({ token });
    res.status(200).json({ status: "Success", message: "Token deleted successfully" });
}



async function Login(request,response, next){
    
    try {
       let userDetails = request.body;
       let UserRes = await UserModel.findOne({email:userDetails.email});
       if(UserRes){
       let res= EncryptDecrypt.decryptPassword(userDetails.password,UserRes.password);
       if(res){
        let userData = {
            "name" : UserRes.name,
            "email" : UserRes.email 
        }
        let JWTtoken = jwtService.GenerateToken(userData);

        let tokenRes = await TokenModel.insertMany([{userId:UserRes._id, token:JWTtoken}]);

           response.status(200).json({
           status: 200,
           status: "Login Successfull",
           token : JWTtoken,
           user: UserRes
       })
        }
        else{
            response.status(500).json({Message: "Wrong Password"});
        }
    }else{
        response.status(500).json({Message: "Email Id is Wrong or You are not registered with us"});
    }
    } catch (error) {
        response.status(500).json(error)
    }   
   }


//  async function createPost(req,res,next){
//      console.log(req.body)
//      req.body.authorId = mongoose.Types.ObjectId(req.body.authorId)
//      req.body.category = mongoose.Types.ObjectId(req.body.category)
//      let tagArr = []
//      req.body.tags.forEach(ele => {
//         tagArr.push(mongoose.Types.ObjectId(ele))
//      }) 
//      let response = await postModel.insertMany([req.body])

//      res.status(200).json(response)
//  }

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
   async function getUser(req,res){
       try {
           let username = req.body
           username = mongoose.Types.name

            res = await UserModel.find({username:username})
           console.log(res)
           res.status(200).json({
               status: "Success",
               posts : res
           })
           
       } catch (error) {
           console.log("Error")
           
       }
   }


module.exports = {
    SignUp,
    signOut,
    Login,
    makePost,
    getAllPost,
    getUser
}