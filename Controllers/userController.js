const UserModel = require("../Models/user.model");
const EncryptDecrypt = require("../CommonLib/encrypt-decrypt");
const jwtService  = require("../CommonLib/jwtToken");


async function SignUp(request,response, next){
    
 try {
    let userDetails = request.body;

    let UserRes = await UserModel.findOne({email:userDetails.email});
    if(UserRes){
   
                response.json({
                    Message: "This Email Id is Already Present in our Database. Please try Different Email Id"
                })
        
    }else{

    let encryptPassword = EncryptDecrypt.encryptPassword(userDetails.password);
    userDetails.password = encryptPassword;
    userDetails.profilePic = "https://c8.patreon.com/2/200/73417037";
    let UserResponse = await UserModel.insertMany([userDetails]);
    console.log(UserResponse);
    response.status(200).json({
        status: "Registration Successfull",
        payload: UserResponse
    })
}
 } catch (error) {
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
        let token = jwtService.GenerateToken(userData);
           response.status(200).json({
           status: "Login Successfull",
           token : token
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


module.exports = {
    SignUp,
    Login
}