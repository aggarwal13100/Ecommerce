const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncErrors");

// create order
exports.newOrder = catchAsyncError(async (req, res, next) => {
  // fetching details from the request body
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(200).json({
    success: true,
    order,
  });
});

// get Single Order

exports.getSingleOrder = catchAsyncError(
    async (req , res ,next) => {
        const orderId = req.params.id ;
        const order = await Order.findById(orderId).populate("user" , "name email");

  // order not found
  if (!order) {
    return next(new ErrorHandler("Order Not Found", 404));
  }

  res.status(200).json({
    success: true,
    order: order,
  });
});

// get order of logged in User

exports.myOrders = catchAsyncError(
    async (req , res ,next) => {
        console.log(`printing = ${req.user._id}`);
        const userId = req.user._id;
        const orders = await Order.find({user : userId});
        
        res.status(200).json({
            success : true ,
            order : orders,
        })

});

// get all Orders -- Admin

exports.getAllOrders = catchAsyncError(
    async (req , res ,next) => {
        const orders = await Order.find();
        let totalAmount=0;
        orders.forEach(order=>{
            totalAmount+=order.totalPrice;
        })
        res.status(200).json({
            success : true ,
            totalAmount,
            order : orders,
        })

    }
);

// 4:26:15

// update Order Status -- Admin
exports.updateOrder = catchAsyncError(
    async (req , res ,next) => {
        const order = await Order.findById(req.params.id);
        if(!order) {
            return next(new ErrorHandler("Order Not Found" , 404));
        }
        if(order.orderStatus==="Delivered")
        {
            return next(new ErrorHandler("you have already delivered this order",404));
        }

       order.orderItems.forEach(async i=>{
        await updateStock(i.product,i.quantity);
       });

       order.orderStatus = req.body.status;

       if(req.body.status==="Delivered")
       {
        order.deliveredAt =Date.now();
       }

       await order.save({validateBeforeSave : false});

        res.status(200).json({
            success : true ,
        })

    }
);


async function  updateStock(id,quantity){
    const product=await Product.findById(id);
    product.Stock-=quantity;
    product.save({validateBeforeSave:false});
}

// delete Order -- Admin





exports.deleteOrder = catchAsyncError(
    async (req , res ,next) => {
        const order = await Order.findById(req.params.id);
        if(!order) {
            return next(new ErrorHandler("Order Not Found" , 404));
        }
        await order.deleteOne();
        res.status(200).json({
            success : true ,
        })

    }
);



