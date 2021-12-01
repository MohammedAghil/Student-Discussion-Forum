const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    post: {type: Schema.Types.ObjectId, ref: 'Post', required: [true, 'Post is required']},
    content : {type:String, required:[true,'Content is required']},
    author : {type:mongoose.Types.ObjectId, ref:'User', required:[true,'Author is required']},
},{ timestamps: true });

module.exports = mongoose.model('Comment',commentSchema);