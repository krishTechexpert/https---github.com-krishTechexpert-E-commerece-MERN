const ErrorResponse = require('../utills/errorResponse')
const catchAsyncError = require('../middleware/catchAsyncError')
const User = require('../models/userModel')
const sendToken = require("../utills/jwtToken")
const sendEmail = require("../utills/sendEmail")

// Register user

const registerUser = catchAsyncError(async(req,res,next) => {
    const {name,email,password} = req.body;
    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:'user profile sample',
            url:'picurl'
        }
    })
    sendToken(user,201,res)
})

const loginUser = catchAsyncError(async (req,res,next) => {
    const {email,password} =req.body;

    // check if user not enter email and password
    if(!email || !password){
        return next(new ErrorResponse(401,'please enter email and password'))
    }

    const user = await User.findOne({email}).select("+password")
    if(!user){
        return next(new ErrorResponse(401,'Invalid email or password'))
    }

    const isPasswordMatched= await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorResponse(400,'Invalid email or password'))
    }
    sendToken(user,200,res)
})

// forgot password
const forgotPassword = catchAsyncError(async (req,res,next) => {
    const user = await User.findOne({email:req.body.email})
    if(!user){
        return next(new ErrorResponse(404,'user does not exits'))
    }
    // get reset password token
    const resetToken = user.generateResetPasswordToken();

    await user.save({validateBeforeSave:false})

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n please ignore it If you have not create`


    try{
        await sendEmail({
            email:user.email,
            subject:'Reset password Link | Flipkart',
            message
        })

        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`
        })

    }catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({validateBeforeSave:false})
        return next(new ErrorResponse(500,error.message))
    }
})



const logout = catchAsyncError(async (req,res,next) => {

    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })

    res.status(200).json({
        success:true,
        message:'user has logout successfully '
    })
})

module.exports={
    registerUser,
    loginUser,
    forgotPassword,
    logout
}