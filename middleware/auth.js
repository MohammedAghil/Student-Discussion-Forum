const postModel = require('../models/post');
const userModel = require('../models/user');

//check if user is a guest
exports.isGuest = (req, res, next)=>{
    if(!req.session.user){
        return next();
    }else {
         req.flash('error', 'You are logged in already');
         return res.redirect('/users/profile');
     }
};

exports.isAdmin = (req, res, next) =>{
    userModel.findById(req.session.user).then(user=>{
        if(user.role == 'admin') {
            return next();
        }else{
            req.flash('error', 'You are not an admin');
            let err= new Error('You are not authorized to view this page');
            err.status = '401';
            return next(err);
        }
    });
}

//check if user is authenticated
exports.isLoggedIn = (req, res, next) =>{
    if(req.session.user){
        return next();
    }else {
         req.flash('error', 'You need to log in first');
         return res.redirect('/users/login');
     }
};

//check if user is author of the story
exports.isAuthor = (req, res, next) =>{
    let id = req.params.id;
    postModel.findById(id)
    .then(post=>{
        if(post) {
            if(post.author == req.session.user || req.session.isAdmin) {
                return next();
            } else {
                let err = new Error('Unauthorized to access the resource');
                err.status = 401;
                return next(err);
            }
        } else {
            let err = new Error('Cannot find a connection with id ' + req.params.id);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err=>next(err));
};
