const commentModel = require('../models/comment');

exports.create = (req, res, next)=>{
    let comment = new commentModel(req.body);//create a new posts document
    comment.author = req.session.user;
    let postId = req.body.post;
    console.log('POST ID: ',postId);
    comment.save()//insert the document to the database
    .then(posts=> {
        req.flash('success', 'Comment has been created successfully');
        res.redirect('/posts/'+postId);
    })
    .catch(err=>{
        if(err.name === 'ValidationError' ) {
        req.flash('error', err.message);
        return res.redirect('/back');
        }
        next(err);
    });
    
};

exports.delete = (req, res, next)=>{
    let id = req.params.id;
    let postId = req.body.post;
    commentModel.findByIdAndDelete(id, {useFindAndModify: false})
    .then(posts =>{
        res.redirect('/posts/'+postId);    })
    .catch(err=>next(err));
};

exports.update = (req, res, next)=>{
    console.log('update comment');
    let comment = req.body;
    let id = req.params.id;
    console.log(id);
    postId = req.body.post;
    commentModel.findByIdAndUpdate(id, comment, {useFindAndModify: false, runValidators: true})
    .then(comment=>{
        //console.log(post);
        req.flash('success', 'Comment has been updated successfully');
        return res.redirect('/posts/'+postId);
    })
    .catch(err=> {
        if(err.name === 'ValidationError') {
            req.flash('error', err.message);
            return res.redirect('/back');
        }
        next(err);
    });
};