const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    category: {String: true, required: true},
    admin: {type: Schema.Types.ObjectId, ref: 'User'},
},{timestamps: true});

module.exports = mongoose.model('Category', categorySchema);