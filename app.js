const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const mainRoutes = require('./routes/mainRoutes');
const postsRoutes = require('./routes/postsRoutes');
const userRoutes = require('./routes/userRoutes');
var bodyParser = require('body-parser');
const port = '3000';
const db_url = 'mongodb://localhost:27017/StudentDiscussionForum';
const host = 'localhost';
const app = express();
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(db_url).then(connected=>{
    console.log('Succesfully Connected to Database');
    app.listen(port,host,()=>{
        console.log('Server is running at '+host+':'+port);
    });
}).catch(err=>console.log(err));

app.use(session({
    secret: 'StudentDiscussionForum',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/StudentDiscussionForum'}),
    cookie: { secure: true, maxAge:60*60*15 }
  }));

app.use(flash());

app.use((req,res,next)=>{
    res.locals.user = req.session.user||null;
    res.locals.name = req.session.name||'Guest';

    res.locals.errorMessages = req.flash('errors');
    res.locals.successMessages = req.flash('sucess');
    next();
})


app.use('/',mainRoutes);
app.use('/posts',postsRoutes);
app.use('/users',userRoutes);

