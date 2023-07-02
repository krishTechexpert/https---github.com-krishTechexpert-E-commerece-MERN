const Product = require('../models/productModel')
const ErrorResponse = require('../utills/errorResponse')
const catchAsyncError = require('../middleware/catchAsyncError')
const ApiFeatures = require('../utills/apiFeatures')

// Create New product --- Admin Role

//A good option to avoid the use of try/catch block in async/await is to create 
//an higher-order function for error handling: such as catchAsyncError

exports.createProduct = catchAsyncError(async(req,res,next) => {

    req.body.user=req.user.id; // admin ko pata chl jye ki kis user ny product create kiya hai ..when there is more than two admin
    console.log(req.body)
    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
})  


exports.getAllProducts = catchAsyncError(async(req,res)=> {
    let resultPerPage=5;
    let countProduct = await Product.count();

    let apiFeature = new ApiFeatures(Product.find(),req.query)
    .Search() // option chain
    .Filter()
    .Pagination(resultPerPage)
    const products = await apiFeature.query;

    res.status(200).json({success:true, countProduct,products,})
})

// Update product -- Admin

exports.updateProduct = catchAsyncError(async(req,res,next)=> {
    let product = await Product.findById(req.params.id)
    if(!product){
        return next(new ErrorResponse(404,'product has not found'))
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true, //  if true, return the modified document rather than the original
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({success:true, product})
})

// Delete product --- Admin

exports.deleteProduct = catchAsyncError(async(req,res,next) => {
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorResponse(404,'product has not found'))
    }
    await product.deleteOne();
    res.status(200).json({success:true, message:'product deleted successfully'})

})

exports.getProductdetails = catchAsyncError(async(req,res,next) => {
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorResponse(404,'product has not found'))
    }
    res.status(200).json({success:true, product})
})