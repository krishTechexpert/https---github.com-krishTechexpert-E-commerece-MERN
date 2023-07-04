const Order=require("../models/orderModel")
const Product = require("../models/productModel")
const ErrorResponse = require('../utills/errorResponse')
const catchAsyncError = require('../middleware/catchAsyncError')

exports.newOrder = catchAsyncError(async(req,res,next) => {
    const { shippingInfo,orderItems,paymentInfo,itemPrice,taxPrice,shippingPrice,totalPrice}=req.body;

    const order = await Order.create({
        shippingInfo,orderItems,paymentInfo,itemPrice,taxPrice,shippingPrice,totalPrice,
        user:req.user._id,
        paidAt:Date.now()
    })
    res.status(201).json({
        success:true,
        order
    })
})

// get single order Details
exports.getSingleOrder = catchAsyncError(async(req,res,next) => {

    const order = await Order.findById(req.params.id)
    .populate({
        path: 'user',
        select:
          'name email role',
      }); // populate means order k sath jo Userid attache hai uska name and email d do
    if(!order){
        return next(new ErrorResponse(404,'order not found with this id'))
    }
    res.status(200).json({
        success:true,
        order
    })
})

// get logged in user orders
exports.myOrders = catchAsyncError(async(req,res,next) => {

    const order = await Order.find({user:req.user._id})
    
    res.status(200).json({
        success:true,
        order
    })
})

// get All orders by Admin
exports.getAllOrders = catchAsyncError(async(req,res,next) => {

    const orders = await Order.find()

    let totalAmount=0;

    orders.forEach((item) => {
        totalAmount+=item.totalPrice
    })


    res.status(200).json({
        success:true,
        totalAmount,
        orders
    })
})


// update order status by Admin
exports.updateOrder = catchAsyncError(async(req,res,next) => {

    const order = await Order.findById(req.params.id)
    if(!order){
        return next(new ErrorResponse(404,'order not found with this id'))
    }

    if(order.orderStatus === 'Delivered'){
        return next(new ErrorResponse(400,'you have already delivered this order'))
    }

    order.orderItems.forEach(async (item) => {
        await updateStock(item.product,item.quantity)
    })

    order.orderStatus = req.body.status;

    if(req.body.status === 'Delivered'){
        order.deliveredAt=Date.now()
    }

    await order.save({validateBeforeSave:false})

    res.status(200).json({
        success:true
    })
})


async function updateStock(productId,qty){
    const product  = await Product.findById(productId)
    product.stock = product.stock -qty;
    await product.save({validateBeforeSave:false})

}

// get delete order by Admin
exports.deleteOrder = catchAsyncError(async(req,res,next) => {

    const order = await Order.findById(req.params.id)
    if(!order){
        return next(new ErrorResponse(404,'order not found with this id'))
    }
    
    await order.deleteOne();
    res.status(200).json({success:true, message:'order deleted successfully'})

})