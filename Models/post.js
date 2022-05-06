const mongoose = require('mongoose')

const post = new mongoose.Schema({
    title: {type: String, required: true},
    description : {type: String, required: true},
    tags : [{type:mongoose.Types.ObjectId, ref: "tag"}],
    comments: [{type:mongoose.Types.ObjectId, ref:"comment"}],
    category: {type:mongoose.Types.ObjectId, ref:"category"}
})

module.exports = mongoose.model('post',post)