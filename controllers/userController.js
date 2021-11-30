const userModel = require('../models/user');

exports.register = (req,res,next)=>{
    console.log(req.body);
    let user = new userModel(req.body);
    console.log(user);
    user.save().then(succ=>{
        console.log('Saved to DB');
        res.redirect('/users/login');
    }).catch(err=>next(err));
}

exports.login= (req, res, next)=>{
    let email = req.body.email;
    let password =req.body.password;
    userModel.findOne ({ email: email})
    .then(user=>{
        if (!user){
            console.log('wrong email address');
           req.flash('error', 'wrong email address');  
           res.redirect('/users/login');
           } else {
           user.comparePassword(password)
           .then(result=>{
               if(result) {
                   req.session.user = user._id;
                   req.session.name = user.firstName;
                   req.flash('success', 'Welcome, logged in');
                   console.log('logged in');
                   res.redirect('/users/profile');
           } else {
               req.flash('error', 'wrong password');      
               res.redirect('/users/login');
           }
           });     
       }     
   })
   .catch(err => next(err));
};