const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const User = require("../models/userModel");

exports.createUser = catchAsyncErrors(
    async (req,res,next)=>{
        // console.log(req.body);
        const {name , email ,password,avatar} = req.body;
        User.create({name , email , password , avatar});

        res.status(200).json({
            success : true
        })
    }
)