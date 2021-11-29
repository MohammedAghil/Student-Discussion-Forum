const express = require('express');
const mongoose = require('mongoose');
const app = express();
const mainRoutes = require('./routes/mainRoutes');
const postsRoutes = require('./routes/postsRoutes');
const userRoutes = require('./routes/userRoutes');
const host = 'localhost';
const port = '3000';
const db_url = 'mongodb://localhost:27017/StudentDiscussionForum';
app.set('view engine','ejs');
app.use(express.static('public'));

mongoose.connect(db_url).then(connected=>{
    console.log('Succesfully Connected to Database');
    app.listen(port,host,()=>{
        console.log('Server is running at '+host+':'+port);
    });
}).catch(err=>console.log(err));
app.use('/',mainRoutes);
app.use('/posts',postsRoutes);
app.use('/users',userRoutes);

