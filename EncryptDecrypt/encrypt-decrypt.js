const bcrypt = require("bcrypt");
function encryptPassword(plainPassword){
    const encryptPassword = bcrypt.hashSync(plainPassword,10);
    console.log(encryptPassword);
    return encryptPassword;
}


module.exports = {
    encryptPassword
}