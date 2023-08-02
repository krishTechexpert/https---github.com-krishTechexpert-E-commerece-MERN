const express = require('express');
const app= express();
const  cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors');
const fileUpload = require('express-fileupload')

app.use(express.urlencoded({
    extended: true,
}));
// axios k sath withcredential: true kerna hoga and set below cors option tabi cookies 
//show hogi inside application cookies
// and will sent cookie on every request
const corsOpts = {
  origin: 'http://localhost:3000',
  credentials: true
  };
  app.use(cors(corsOpts));
app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())
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