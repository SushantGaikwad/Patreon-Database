const UserModel = require("../Models/user.model");
const TokenModel = require("../Models/token");
const EncryptDecrypt = require("../CommonLib/encrypt-decrypt");
const jwtService  = require("../CommonLib/jwtToken");

require("dotenv").config();


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
       if(!userDetails.profilePic){
       userDetails.profilePic = process.env.Profile_Pic;
       }
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
              message: "Login Successfull",
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
           response.status(500).json(error);
       }   
      }

      async function LoginSuccess (req,res){
        if (req.user) {
          let email = req.user.email
          const userDetail = await userModel.findOne({email})
           console.log(userDetail)
          if(userDetail){
           
            let obj = {
              firstName :userDetail.firstName,
              email
            }
            
            let JWTtoken = JWTService.GenerateToken(obj)
         
            res.status(200).json(
              {
                status : 200,
                message:"Success Login",
                token : JWTtoken,
                user: userDetail
              }
            )
      
          }
          else{
            let encryptedPassword = encryptDecrypt.encryptPassword(process.env.Default_Password)
            console.log(req.user);
            let userDetailObj = {
              name: req.user.given_name,
              email: req.user.email,
              password: encryptedPassword,
              profilePic: req.user._json.picture
            }
            await userModel.insertMany([userDetailObj])
            delete userDetailObj.password
         
            let JWTtoken = JWTService.GenerateToken(userDetailObj)
            res.status(200).json({
              message:"Registration Success",
              status : 200,
              token : JWTtoken,
              user: userDetail
            });
          }
      
        }
      }

     function FailureHandler (req,res){
        res.send("Some error occured while login to google")
     };

      module.exports = {
          SignUp,
          Login,
          LoginSuccess,
          FailureHandler
      }