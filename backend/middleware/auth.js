const catchAsyncError = require('./catchAsyncError')
const ErrorResponse = require("../utills/errorResponse")
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')


const isAuthenticatedUser = catchAsyncError(async (req,res,next) => {

    const {token} = req.cookies;
    if(!token){
        return next(new ErrorResponse(401,'please login to access this resource'))
    }
    const decodeData= await jwt.verify(token,process.env.JWT_SECERT_KEY)

     req.user = await User.findById(decodeData.id) // now we have successfully get user and passed with request further.
     next()
})

const authorizeRoles = (...roles) => {
    return (req,res,next) => {
         if(!roles.includes(req.user.role)) {
           return next(new ErrorResponse(403,`Role: ${req.user.role} is not allowed to access resource.`))
         }  
         next();
    }
}

module.exports = {
    isAuthenticatedUser,
    authorizeRoles
}