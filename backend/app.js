const express = require('express');
const app= express();
const  cookieParser = require('cookie-parser')

app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());
app.use(cookieParser())
const errorHandler = require('./middleware/error')

// routes imports 
const product = require('./routes/productRoute')
const user = require('./routes/userRoute');
app.use('/api/v1',product)
app.use('/api/v1',user)



// error middleware (should be put in the last middleware)
 app.use(errorHandler)

module.exports=app;