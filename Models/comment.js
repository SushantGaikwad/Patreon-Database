const mongoose = require('mongoose')

const comment = new mongoose.Schema({
    description: {type:String, required:true},
    postId: { type: mongoose.Types.ObjectId, ref: "post"}
});

module.exports = mongoose.model('comment',comment)