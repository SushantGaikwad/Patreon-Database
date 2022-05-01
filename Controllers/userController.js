const UserModel = require("../Models/user.model");
const EncryptDecrypt = require("../EncryptDecrypt/encrypt-decrypt");

async function SignUp(request,response, next){
    
 try {
    let userDetails = request.body;
    console.log(userDetails);
    let encryptPassword = EncryptDecrypt.encryptPassword(userDetails.password);
    userDetails.password = encryptPassword;
    let UserResponse = await UserModel.insertMany([userDetails]);
    console.log(UserResponse);
    response.status(200).json({
        status: "Registration Successfull",
        payload: UserResponse
    })
 } catch (error) {
     response.status(500).json(error);
 }

}


module.exports = {
    SignUp
}