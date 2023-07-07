const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncErrors");

// create order
exports.newOrder = catchAsyncError(
    async (req , res , next) => {
        // fetching details from the request body
        const {
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice ,
            taxPrice ,
            shippingPrice ,
            totalPrice,
        } = req.body;

        const order  = await Order.create({
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice ,
            taxPrice ,
            shippingPrice ,
            totalPrice,
            paidAt : Date.now(),
            user : req.user._id,
        });

        res.status(200).json({
            success : true ,
            order ,
        })
    }
)

// get Single Order 

exports.getSingleOrder = catchAsyncError(
    async (req , res ,next) => {
        const orderId = req.id ;
        const order = await Order.findById(orderId).populate("user" , "name email");

        // order not found
        if(!order) {
            return next(new ErrorHandler("Order Not Found" , 404));
        }
        
        res.status(200).json({
            success : true ,
            order : order,
        })

    }
)


// get order of logged in User

exports.myOrders = catchAsyncError(
    async (req , res ,next) => {
        const userId = req.user._id ;
        const order = await Order.find({user : userId});
        
        res.status(200).json({
            success : true ,
            order : order,
        })

    }
);

// get all Orders -- Admin
// 4:26:15

// update Order Status -- Admin

// delete Order -- Admin


