const postModel = require('../models/post');
const commentModel = require('../models/comment');


exports.index = (req, res, next)=>{
    postModel.find()
    .then(posts=>res.render('./posts/posts', {posts}))
    .catch(err=>next(err));
};

exports.new = (req, res)=>{
    res.render('./posts/new');
};

exports.create = (req, res, next)=>{
    let post = new postModel(req.body);//create a new posts document
    post.author = req.session.user;
    post.save()//insert the document to the database
    .then(posts=> {
        req.flash('success', 'posts has been created successfully');
        res.redirect('/posts');
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
    Promise.all([postModel.findById(id).populate('author', 'firstName lastName'), commentModel.find({post: id}).populate('author', 'firstName lastName')])
    .then(results=>{
        let [post, comments] = results;
        console.log(comments);
        res.render('./posts/show', {post, comments});
    })
    .catch(err=>next(err));
};

exports.edit = (req, res, next)=>{
    let id = req.params.id;
    postModel.findById(id)
    .then(post=>{
        return res.render('./posts/edit', {post});
    })
    .catch(err=>next(err));
};

exports.update = (req, res, next)=>{
    console.log('update');
    let post = req.body;
    let id = req.params.id;
    console.log(post);
    console.log(id);
    postModel.findByIdAndUpdate(id, post, {useFindAndModify: false, runValidators: true})
    .then(post=>{
        console.log(post);
        req.flash('success', 'Post has been updated successfully');
        return res.redirect('/posts/'+id);
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
        res.redirect('/users/profile');
    })
    .catch(err=>next(err));
};