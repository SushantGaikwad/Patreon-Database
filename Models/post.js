const mongoose = require('mongoose')

const post = new mongoose.Schema({
    userId: {type: mongoose.Types.ObjectId,ref: "user"},
    title: {type: String, required: true},
    description : {type: String, required: true},
    tags : [{type: String}],
    comments: [{type:mongoose.Types.ObjectId, ref:"comment"}],
})

module.exports = mongoose.model('post',post)