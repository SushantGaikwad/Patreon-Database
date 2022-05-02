const {validationResult} = require("express-validator");
const jwtService= require("../CommonLib/jwtToken");


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
        jwtService.verifyToken(token);
        next();
    } catch (error) {
        res.status(500).json(error);
    }

   
}

module.exports = {
    ValidationResult,
    isValidToken
}