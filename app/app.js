const express = require('express');
const app = express();

const mainRoutes = require('./routes/mainRoutes');
const host = 'localhost';
const port = '3000';

app.set('view engine','ejs');
app.use('/',mainRoutes);
app.listen(port,host,()=>{
    console.log('Server is running at '+host+':'+port);
})
