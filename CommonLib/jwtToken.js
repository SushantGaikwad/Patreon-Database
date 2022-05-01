const jwt = require("jsonwebtoken");
const SECRETE_KEY = "PATREON_DATABASE_TEAM_13_AVS"

function GenerateToken(payload){
    let token = jwt.sign(payload,SECRETE_KEY);
    return token;
}

function verifyToken(token){
    let data = jwt.verify(token,SECRETE_KEY);
    return data;
}



module.exports = {
    GenerateToken,
    verifyToken
}