const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');
const morgan = require('morgan');
const flash = require('connect-flash');
const mainRoutes = require('./routes/mainRoutes');
const postsRoutes = require('./routes/postsRoutes');
const userRoutes = require('./routes/userRoutes');
const commentRoutes = require('./routes/commentRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const port = '3000';
const db_url = 'mongodb://localhost:27017/StudentDiscussionForum';
const host = 'localhost';
const app = express();
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(methodOverride('_method'));

mongoose.connect(db_url).then(connected=>{
    console.log('Succesfully Connected to Database');
    app.listen(port,host,()=>{
        console.log('Server is running at '+host+':'+port);
    });
}).catch(err=>console.log(err));

app.use(
    session({
        secret: "ajfeirf90aeu9eroejfoefj",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({mongoUrl: db_url}),
        cookie: {maxAge: 60*60*1000}
        })
);
app.use(flash());

app.use((req, res, next) => {
    res.locals.user = req.session.user||null;
    res.locals.name = req.session.name||null;
    res.locals.isAdmin = req.session.isAdmin||null;
    res.locals.errorMessages = req.flash('error');
    res.locals.successMessages = req.flash('success');
    next();
});


app.use('/',mainRoutes);
app.use('/posts',postsRoutes);
app.use('/users',userRoutes);
app.use('/comments',commentRoutes);
app.use('/categories',categoryRoutes);

app.use((req, res, next)=>{
    let err = new Error('The server cannot locate' +req.url);
        err.status = 404;
        next(err);
});

app.use((err, req, res, next)=>{
    console.log(err.stack);
    if (!err.status){
        err.status = 500;
        err.message = "Internal Server Error";
    }
 res.status(err.status);
 res.render('error', {error: err});
});