const {validationResult} = require("express-validator");
const jwtService= require("../CommonLib/jwtToken");
const TokenModel = require("../Models/token");


function ValidationResult(req,res,next){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
}

function isValidToken(req,res,next){

    try {
        let token = req.headers.token;
        if(token){
            jwtService.verifyToken(token);
            let response = TokenModel.findOne({token});
            if(response){
                next();
            }
            else{
                res.json({status: "failed", message: "Token is not present is DB"});
            }
        }
        else{
            res.json({status: "failed", message: "Token is not present in header"});
        }
        
    } catch (error) {
        res.status(500).json(error);
    }

   
}

module.exports = {
    ValidationResult,
    isValidToken
}