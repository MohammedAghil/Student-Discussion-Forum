const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName:{type:String,required:[true,'First Name cannot be empty']},
    lastName: {type:String, required:[true,'Last Name cannot be empty']},
    email:{type:String,required:[true,'Email is required'], unique:true},
    role:{type:String,required:[true,'Role is required'], default:'user'},
    password:{type:String,required:[true,'Password is required']}
});
userSchema.pre('save',function(next){
    let user = this;
    if (!user.isModified('password'))
        return next();
    bcrypt.hash(user.password, 10)
        .then(hash => {
            user.password = hash;
            next();
        })
        .catch(err => next(error));
});

userSchema.methods.comparePassword = function(inputPassword) {
    console.log('here');
    let user = this;
    return bcrypt.compare(inputPassword, user.password);
  }
  
module.exports = mongoose.model('User',userSchema);

