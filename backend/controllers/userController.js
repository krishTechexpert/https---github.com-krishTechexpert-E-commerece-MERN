const ErrorResponse = require('../utills/errorResponse')
const catchAsyncError = require('../middleware/catchAsyncError')
const User = require('../models/userModel')
const sendToken = require("../utills/jwtToken")
const sendEmail = require("../utills/sendEmail")
const crypto=require('crypto')
const cloudinary = require('cloudinary')

// Register user

const registerUser = catchAsyncError(async(req,res,next) => {
    const {name,email,password,avatar} = req.body;
    let myCloud=null;
    if(avatar){
         myCloud = await cloudinary.v2.uploader.upload(avatar,{
            folder: "avatars",
            width: 150,
            crop: "scale",
        });
        if(!myCloud){
            return next(new ErrorResponse(400,'something went to wrong'))
       }
    }
        
  
    const emailFound = await User.findOne({email})
    if(emailFound){
        return next(new ErrorResponse(302,'This email address has already registered with us'))
    }

    const checkAvatar = avatar ? {
        public_id:myCloud.public_id,
        url:myCloud.secure_url
    } : {

        public_id:null,
        url:null
    } 
    

    console.log("check avatar",checkAvatar)

    const user = await User.create({
        name,email,password,avatar:checkAvatar
          
    })
    console.log("new user",user)
    user.password=null;
    sendToken(user,201,res)


})

const loginUser = catchAsyncError(async (req,res,next) => {
    const {email,password} =req.body;

    // check if user not enter email and password
    if(!email || !password){
        return next(new ErrorResponse(401,'please enter email and password'))
    }

    const user = await User.findOne({email}).select("+password") // incluse passcode field when fetch user
    if(!user){
        return next(new ErrorResponse(401,'Invalid email or password'))
    }

    const isPasswordMatched= await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorResponse(400,'Invalid email or password'))
    }
    user.password=null;
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

// Reset Password

const resetPassword = catchAsyncError(async (req,res,next) => {

    // creating token hash
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()}
    })
    if(!user){
        return next(new ErrorResponse(404,'Reset password token is invalid or has been expired '))
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorResponse(404,'Password does not match '))
    }
    user.password=req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user,200,res)


})

// user profile
const userProfile = catchAsyncError(async (req,res,next) => {

    const user = await User.findById(req.user.id);
    res.status(200).json({
        success:true,
        user
    })
})

// user update password

const updatePassword = catchAsyncError(async (req,res,next) => {

    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched= await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched){
        return next(new ErrorResponse(400,'Old password is incorrect'))
    }
    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorResponse(404,'Password does not match '))
    }

    user.password = req.body.newPassword;
    await user.save()
    sendToken(user,200,res)

})


//  update user profile
const updateUserProfile = catchAsyncError(async (req,res,next) => {

    const {name,email,avatar}=req.body
    let myCloud=null;
    if(avatar){
        const user = await User.findById(req.user.id)
        const imageId = user.avatar.public_id;
        await cloudinary.v2.uploader.destroy(imageId)
         myCloud = await cloudinary.v2.uploader.upload(avatar,{
            folder: "avatars",
            width: 150,
            crop: "scale",
        });
        if(!myCloud){
            return next(new ErrorResponse(400,'something went to wrong'))
       }
    }
    if(!name || !email){
        return next(new ErrorResponse(401,'please enter name and email'))
    }


    const checkAvatar = avatar ? {
        public_id:myCloud.public_id,
        url:myCloud.secure_url
    } : {

        public_id:null,
        url:null
    } 

    const newUserData = {
        name,
        email,
        avatar:checkAvatar
    }

   
    // req.user.id = jab token verify ho jata hai toh y id mil ti hai 
    const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:false,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true,
        message:'user profile has updated successfully',
        user
    })

})

// get all users (admin want to see all users)

const getAllUser = catchAsyncError(async (req,res,next) => {
    const users = await User.find();
    res.status(200).json({
        success:true,
        users
    })
})

// get single user details (admin want to see  details of every single user)
const getSingleUserDetails = catchAsyncError(async (req,res,next) => {
    const user = await User.findById(req.params.id);
    if(!user){
        return next(new ErrorResponse(404,`user not found ${req.params.id}`))
    }
    res.status(200).json({
        success:true,
        user
    })
})


//  update user Role --- Admin
const updateUserRole = catchAsyncError(async (req,res,next) => {

    if(!req.body.name || !req.body.email || !req.body.role){
        return next(new ErrorResponse(401,'please enter the values for updated fields'))
    }

    const newUserData = {
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:false,
        useFindAndModify:false
    })
    if(!user){
        return next(new ErrorResponse(404,'user has not found'))
    }
    res.status(200).json({
        success:true,
        message:'user profile has updated successfully by admin'
    })

})

//  delete user --- Admin
const deleteUserByAdmin = catchAsyncError(async (req,res,next) => {

    const user = await User.findById(req.params.id);
    if(!user){
        return next(new ErrorResponse(404,`user has not found with ${req.params.id}`))
    }
    await user.deleteOne();
    res.status(200).json({success:true, message:'user deleted successfully by admin'})

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
    resetPassword,
    userProfile,
    updatePassword,
    updateUserProfile,
    getAllUser,
    getSingleUserDetails,
    updateUserRole,
    deleteUserByAdmin,
    logout
}