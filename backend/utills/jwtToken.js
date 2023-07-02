// create token and save in cookie

const sendToken = async(user,statusCode,res) => {
    const token = await user.generateToken()
    
    // option for cookies 

    const options = {
        httpOnly:true,
        expires:new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000) // 1day expire
    }

    res.status(statusCode).cookie('token',token,options).json({
        success:true,
        token,
        user
    })
}

module.exports = sendToken;