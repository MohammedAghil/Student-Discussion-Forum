const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title :{type:String, required:[true,'Title is required']},
    image: {type:String, required:false},
    category : {type:String, required:[true,'Category is required']},
    content : {type:String, required:[true,'Content is required']},
    author : {type:mongoose.Types.ObjectId, ref:'User', required:[true,'Author is required']},
},{ timestamps: true });

module.exports = mongoose.model('Post',postSchema);