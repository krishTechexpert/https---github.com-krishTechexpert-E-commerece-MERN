const ErrorResponse = require('../utills/errorResponse')

/*Application level middleware app.use
Router level middleware router.use
Built-in middleware express.static,express.json,express.urlencoded
Error handling middleware app.use(err,req,res,next)
Thirdparty middleware bodyparser,cookieparser*/


const errorHandler = (err,req,res,next) => {

    err.statusCode = err.statusCode  || 500;
    err.message = err.message || 'Internal Server Error';

    // wrong 4 digit mongodb id error such as http://localhost:4000/api/v1/product/1234 to catch cast error
    if(err.name === 'CastError'){
        const message = `Resource not found. Invalid: ${err.path}`;
        err=new ErrorResponse(400,message)
    }


    res.status(err.statusCode).json({
        success:false,
        //message:err.stack  // this stack property comes from Error.captureStackTrace(this,this.constructor)
        message:err.message
    })

}

module.exports = errorHandler;