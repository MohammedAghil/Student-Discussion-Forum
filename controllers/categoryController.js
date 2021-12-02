const categoryModel = require('../models/category');

exports.create = (req, res, next)=>{
    let category = new categoryModel(req.body);//create a new posts document
    category.author = req.session.userId;
    category.save()//insert the document to the database
    .then(category=> {
        req.flash('success', 'Category has been created successfully');
        res.redirect('/users/admin');
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
    categoryModel.findByIdAndDelete(id, {useFindAndModify: false})
    .then(succ =>{
        req.flash('success', 'Category has been deleted successfully');
        res.redirect('/users/admin');})
    .catch(err=>next(err));
};


