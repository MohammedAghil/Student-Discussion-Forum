const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    category : {type:String, required:[true,'Category is required'],unique:true},
    author : {type:mongoose.Types.ObjectId, ref:'User', required:[true,'Author is required']}
});

module.exports = mongoose.model('Category',categorySchema);