const bcrypt = require("bcrypt");

function encryptPassword(plainPassword){
    const encryptPassword = bcrypt.hashSync(plainPassword,10);
    console.log(encryptPassword);
    return encryptPassword;
}

function decryptPassword(plainPassword,encryptPassword){
    const decryptPassword = bcrypt.compareSync(plainPassword,encryptPassword);
    return decryptPassword;
}


module.exports = {
    encryptPassword,
    decryptPassword
}