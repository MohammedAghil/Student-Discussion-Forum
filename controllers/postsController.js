const postModel = require('../models/post');

exports.index=(req, res,next)=>{
postModel.find()
.then(posts=>{
    console.log(posts);
    res.render('./posts/posts', {posts});
}).catch(err=>next(err));
}


exports.create = (req, res, next)=>{
    console.log('here');
    let connect = new postModel(req.body);//create a new post
    connect.author= req.session.user;
    connect.save()//insert the document to the database
    .then(connect=> {
        console.log('Saved');
        res.redirect('/users/profile');
    })
    .catch(err=>{
        if(err.name === 'ValidationError' ) {
            err.status = 400;
        }
        console.log(err);
        next(err);
    });
}
