const Product = require('../models/productModel')
const ErrorResponse = require('../utills/errorResponse')
const catchAsyncError = require('../middleware/catchAsyncError')
const ApiFeatures = require('../utills/apiFeatures')

// Create New product --- Admin Role

//A good option to avoid the use of try/catch block in async/await is to create 
//an higher-order function for error handling: such as catchAsyncError

exports.createProduct = catchAsyncError(async(req,res,next) => {

    req.body.user=req.user.id; // admin ko pata chl jye ki kis user ny product create kiya hai ..when there is more than two admin
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
    .Search()// option chain
    .Filter()

    let products = await apiFeature.query;

    const filteredProductCount=products.length;

    apiFeature.Pagination(resultPerPage);
    products = await apiFeature.query.clone();
    
    //here above we add .clone() to fixed below error
    //"message": "Query was already executed: Product.find({})"

    res.status(200).json({success:true, countProduct,resultPerPage,filteredProductCount,products,})
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


    // create new review and update review

exports.createProductReview = catchAsyncError(async(req,res,next) => {
    const {rating,comment,productId} = req.body;
    const review = {
        user:req.user.id,
        name:req.user.name,
        rating:Number(req.body.rating),
        comment
    }

    const product = await Product.findById(productId);
    const isReviewed =  product.reviews.find((item) => item.user.toString() === req.user.id.toString())
    
    if(isReviewed){
        // update review which you have given already reviewd
        product.reviews.map(item=> {
            if(item.user.toString() === req.user.id.toString()){
                item.rating=rating;
                item.comment=comment
            }
        })

    }else{
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length;

    }

    let avg=0;
    product.reviews.map(item=> {
        avg= avg + item.rating
    })
    product.ratings=avg/product.reviews.length;

    await product.save({validateBeforeSave:false})

    res.status(200).json({success:true, message:'product review done'})

})


// get All reviews for single product

exports.getProductReviews = catchAsyncError(async(req,res,next) => {
    const product = await Product.findById(req.query.id)
    if(!product){
        return next(new ErrorResponse(404,'Product has not found'))

    }
    res.status(200).json({success:true, reviews:product.reviews})

})

//delete reviews

exports.deleteReview = catchAsyncError(async(req,res,next) => {
    const product = await Product.findById(req.query.productId)
    console.log(product)
    if(!product){
        return next(new ErrorResponse(404,'Product has not found'))
    }
    const reviews = product.reviews.filter(rev => rev._id.toString() !== req.query.id.toString()) // review id req.query.id
    
    let avg=0;
    reviews.map(item=> {
        avg= avg + item.rating
    })
    const ratings=avg/reviews.length;
    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,ratings,numOfReviews
    },{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({success:true, reviews:reviews})

})