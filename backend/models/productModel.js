const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please provide product name'],
        trim:true
    },
    description:{
        type:String,
        required:[true,'please provide product description']
    },
    price:{
        type:Number,
        required:[true,'please provide product price'],
        maxLength:[8,'price can not greater than 8 digits']
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }],
    category:{
        type:String,
        required:[true,'please provide category name']
    },
    stock:{
        type:Number,
        required:[true,'please enter product stock'],
        maxLength:[4,'stock can not be greater than 4 digits'],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[{
        user:{
            type:mongoose.Schema.ObjectId,
            ref:"User",
            required:true
        },
        name:{
            type:String,
            required:true
        },
        rating:{
            type:Number,
            required:true
        },
        comment:{
            type:String,
            required:true
        }
    }],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Product',productSchema)