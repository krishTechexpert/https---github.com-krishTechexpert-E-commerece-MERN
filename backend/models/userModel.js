const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto=require('crypto') // inbuild package

const userSchema  = new mongoose.Schema({
    name:{
        type: String,
        required:[true,'please provide your name'],
        maxLengh:[30,'name can not be greater than 30 chracters'],
        minLength:[3,'required minimum 3 chracters'],
        trim:true
    },
    email:{
        type:String,
        required:[true,'please provide an email'],
        unique:true,
        trim:true,
        lowercase:true,
        validate:[validator.isEmail,'please provide a valid email']
        // validate(values){
        //     if(!validator.isEmail(values)){
        //         throw new Error('Invalid Email address')
        //     }
        // }
    },
    password:{
        type:String,
        required:[true,'please provide password'],
        trim: true,
        minlength:[6,'password is too short'],
        select:false // by default password not send when fetch user object
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:'user'
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
})

userSchema.pre('save',async function(next){
    const user=this;
    // only hash the password if it has been modified (or is new)
    if(user.isModified('password')){  //here password is the password field name
        user.password = await bcrypt.hash(user.password,10)
     }
    next();
})


//  To generate token
userSchema.methods.generateToken = async function() {
    // here this represents our user object
    const token = await jwt.sign({
        id:this._id
    },process.env.JWT_SECERT_KEY,{expiresIn:process.env.JWT_EXPIRETIME});
    return token;
}

// compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password)
}

// generate password reset token
userSchema.methods.generateResetPasswordToken = function(){
    //generating token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // hasing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;

}


module.exports= mongoose.model('User',userSchema)