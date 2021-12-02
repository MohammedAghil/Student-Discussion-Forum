const userModel = require('../models/user');
const postModel = require('../models/post');

exports.admin = (req, res, next)=>{
    let id = req.session.user;
    Promise.all([userModel.findById(id), postModel.find()])
    .then(results=>{
        const [user, posts] = results;
        console.log(posts);
        if (user.role === 'admin'){
            res.render('./users/admin', {user, posts});
        }
        else {
            let err= new Error('You are not authorized to view this page');
            err.status = '401';
            next(err);
        }
    })
    .catch(err=>next(err));
};

exports.profile = (req, res, next)=>{
    let id = req.session.user;
    Promise.all([userModel.findById(id), postModel.find({author: id})])
    .then(results=>{
        const [user, posts] = results;
        console.log(posts);
        res.render('./users/profile', {user, posts});
    })
    .catch(err=>next(err));
};


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
                   console.log(req.session);
                   req.session.name = user.firstName;
                   if (user.role === 'admin'){
                        req.flash('success', 'Welcome, Admin ' + user.firstName);
                        req.session.isAdmin = true;
                        res.redirect('/users/admin');
                   }
                   else {
                   req.flash('success', 'Welcome, logged in');
                   console.log('logged in');
                   res.redirect('/users/profile');
                     }
           } else {
               req.flash('error', 'wrong password');      
               res.redirect('/users/login');
           }
           });     
       }     
   })
   .catch(err => next(err));
};

exports.logout = (req, res, next)=>{
    req.session.destroy(err=>{
        if(err) 
           return next(err);
       else
            res.redirect('/');  
    });
 };
