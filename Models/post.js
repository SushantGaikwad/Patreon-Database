const mongoose = require('mongoose')

const post = new mongoose.Schema({
<<<<<<< HEAD
    title: {type: String, required: true},
    description : {type: String, required: true},
    tags : [{type:mongoose.Types.ObjectId, ref: "tag"}],
    comments: [{type:mongoose.Types.ObjectId, ref:"comment"}],
    category: {type:mongoose.Types.ObjectId, ref:"category"}
=======
    userId: {type: mongoose.Types.ObjectId,ref: "user"},
    title: {type: String, required: true},
    description : {type: String, required: true},
    tags : [{type: String}],
    comments: [{type:mongoose.Types.ObjectId, ref:"comment"}],
    timestamp :{type: Date}
>>>>>>> ab7218c16bc14ff0568e5683ff2f7ffb503dd01b
})

module.exports = mongoose.model('post',post)