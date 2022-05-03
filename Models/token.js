const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
    "token" : {type: String, required: true},
    "userId" : {type: mongoose.Types.ObjectId, required: true}
})

const Token = mongoose.model("token", TokenSchema);
module.exports = Token;