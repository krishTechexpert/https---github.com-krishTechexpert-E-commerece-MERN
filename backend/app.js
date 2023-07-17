const express = require('express');
const app= express();
const  cookieParser = require('cookie-parser')
const cors = require('cors');
app.use(express.urlencoded({
    extended: true,
}));
const corsOpts = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
    ],
  
    allowedHeaders: [
      'Content-Type',
    ],
  };
  app.use(cors(corsOpts));
app.use(express.json());
app.use(cookieParser())
const errorHandler = require('./middleware/error')

// routes imports 
const product = require('./routes/productRoute')
const user = require('./routes/userRoute');
const order = require("./routes/orderRoute")
app.use('/api/v1',product)
app.use('/api/v1',user)
app.use('/api/v1',order)




// error middleware (should be put in the last middleware)
 app.use(errorHandler)

module.exports=app;