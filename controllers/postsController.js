const postModel = require('../models/post');

exports.index = (req, res, next)=>{
    postModel.find()
    .then(posts=>res.render('./posts/posts', {posts}))
    .catch(err=>next(err));
};

exports.new = (req, res)=>{
    res.render('./posts/newpost');
};

exports.create = (req, res, next)=>{
    let post = new postModel(req.body);//create a new posts document
    post.author = req.session.user;
    post.save()//insert the document to the database
    .then(posts=> {
        req.flash('success', 'posts has been created successfully');
        res.redirect('/stories');
    })
    .catch(err=>{
        if(err.name === 'ValidationError' ) {
        req.flash('error', err.message);
        return res.redirect('/back');
        }
        next(err);
    });
    
};

exports.show = (req, res, next)=>{
    let id = req.params.id;
    postModel.findById(id).populate('author', 'firstName lastName')
    .then(post=>{
        if(post) {       
            console.log(post);
            return res.render('./posts/showpost', {post});
        } else {
            let err = new Error('Cannot find a posts with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};

exports.edit = (req, res, next)=>{
    let id = req.params.id;
    postModel.findById(id)
    .then(posts=>{
        return res.render('./posts/edit', {posts});
    })
    .catch(err=>next(err));
};

exports.update = (req, res, next)=>{
    let posts = req.body;
    let id = req.params.id;

    postModel.findByIdAndUpdate(id, posts, {useFindAndModify: false, runValidators: true})
    .then(posts=>{
        return res.redirect('/stories/'+id);
    })
    .catch(err=> {
        if(err.name === 'ValidationError') {
            req.flash('error', err.message);
            return res.redirect('/back');
        }
        next(err);
    });
};

exports.delete = (req, res, next)=>{
    let id = req.params.id;
    
    postModel.findByIdAndDelete(id, {useFindAndModify: false})
    .then(posts =>{
        res.redirect('/stories');
    })
    .catch(err=>next(err));
};